import { useState, useCallback, useRef } from "react";
import { useLocalization } from "./useLocalization";
import type { WikiArticle } from "../components/WikiCard";
import { getProxiedImageUrl, getProxiedPageUrl } from "../config";

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
};

export function useWikiArticles() {
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState<WikiArticle[]>([]);
  const { currentLanguage } = useLocalization();
  const loadingRef = useRef(false);

  const fetchArticles = useCallback(async (forBuffer = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      // 使用动态API URL获取方法
      const apiUrl = currentLanguage.getApiUrl();
      
      const response = await fetch(
        apiUrl +
          new URLSearchParams({
            action: "query",
            format: "json",
            generator: "random",
            grnnamespace: "0",
            prop: "extracts|info|pageimages",
            inprop: "url|varianttitles",
            grnlimit: "20",
            exintro: "1",
            exlimit: "max",
            exsentences: "5",
            explaintext: "1",
            piprop: "thumbnail",
            pithumbsize: "800",
            origin: "*",
            variant: currentLanguage.id,
          })
      );

      if (!response.ok) {
        throw new Error(`获取文章失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // 检查API响应是否包含错误
      if (data.error) {
        throw new Error(`维基百科API错误: ${data.error.info || data.error.code}`);
      }

      if (!data.query || !data.query.pages) {
        throw new Error('维基百科API返回数据格式异常');
      }

      const newArticles = (Object.values(data.query.pages) as {
        title: string;
        extract: string; 
        pageid: number;
        thumbnail?: { source: string; width: number; height: number };
        canonicalurl: string;
        varianttitles?: Record<string, string>;
      }[])
        .map(
          (page): WikiArticle => ({
            title: page.title,
            displaytitle: page.varianttitles ? page.varianttitles[currentLanguage.id] : page.title,
            extract: page.extract,
            pageid: page.pageid,
            thumbnail: page.thumbnail ? {
              ...page.thumbnail,
              source: getProxiedImageUrl(page.thumbnail.source)
            } : undefined,
            url: getProxiedPageUrl(page.canonicalurl),
          })
        )
        .filter(
          (article) =>
            article.thumbnail &&
            article.thumbnail.source &&
            article.url &&
            article.extract
        );

      // 预加载图片
      await Promise.allSettled(
        newArticles
          .filter((article) => article.thumbnail)
          .map((article) => preloadImage(article.thumbnail!.source))
      );

      if (forBuffer) {
        setBuffer(newArticles);
      } else {
        setArticles((prev) => {
          // 避免重复文章
          const existingIds = new Set(prev.map(article => article.pageid));
          const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.pageid));
          return [...prev, ...uniqueNewArticles];
        });
        fetchArticles(true);
      }
    } catch (error) {
      console.error("获取文章时出错:", error);
      
      // 如果是网络错误或CORS错误，可能需要启用代理
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('可能需要启用代理服务器以访问维基百科API');
        console.warn('请在URL中添加 ?useProxy=true 参数来测试代理功能');
      }
      
      // 确保在错误情况下也能继续工作，提供一些默认数据或重试机制
      // 这样即使单次请求失败，用户仍然可以继续滚动
    } finally {
      // 确保无论成功还是失败都重置loading状态
      loadingRef.current = false;
      setLoading(false);
    }
  }, [currentLanguage]);

  const getMoreArticles = useCallback(() => {
    if (buffer.length > 0) {
      setArticles((prev) => {
        // 避免重复文章
        const existingIds = new Set(prev.map(article => article.pageid));
        const uniqueBufferArticles = buffer.filter(article => !existingIds.has(article.pageid));
        return [...prev, ...uniqueBufferArticles];
      });
      setBuffer([]);
      // 异步获取更多文章到缓冲区，不阻塞当前操作
      fetchArticles(true);
    } else {
      // 直接获取新文章
      fetchArticles(false);
    }
  }, [buffer, fetchArticles]);

  return { 
    articles, 
    loading, 
    fetchArticles, 
    getMoreArticles 
  };
}
