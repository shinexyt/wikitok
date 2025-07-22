import { useState, useCallback, useRef } from "react";
import { useLocalization } from "./useLocalization";
import type { WikiArticle } from "../components/WikiCard";
import { getProxiedImageUrl, getProxiedPageUrl } from "../config";

// 用于持久化已获取的文章ID，避免重复
const FETCHED_ARTICLES_KEY = 'wikitok_fetched_articles';
const MAX_STORED_ARTICLES = 1000; // 最多存储1000个已获取的文章ID

// 获取已存储的文章ID集合（按语言分别存储）
function getStoredArticleIds(languageId: string): Set<number> {
  try {
    const key = `${FETCHED_ARTICLES_KEY}_${languageId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const ids = JSON.parse(stored);
      return new Set(Array.isArray(ids) ? ids : []);
    }
  } catch (error) {
    console.warn('无法从localStorage读取已获取的文章ID:', error);
  }
  return new Set();
}

// 存储已获取的文章ID（按语言分别存储）
function storeArticleIds(ids: Set<number>, languageId: string) {
  try {
    const key = `${FETCHED_ARTICLES_KEY}_${languageId}`;
    const idsArray = Array.from(ids);
    // 如果超过最大存储数量，保留最新的一半
    if (idsArray.length > MAX_STORED_ARTICLES) {
      const trimmedIds = idsArray.slice(-Math.floor(MAX_STORED_ARTICLES / 2));
      localStorage.setItem(key, JSON.stringify(trimmedIds));
    } else {
      localStorage.setItem(key, JSON.stringify(idsArray));
    }
  } catch (error) {
    console.warn('无法将文章ID存储到localStorage:', error);
  }
}

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
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLocalization();
  const loadingRef = useRef(false);
  const storedArticleIds = useRef(getStoredArticleIds(currentLanguage.id));

  const fetchArticles = useCallback(async (forBuffer = false, retryCount = 0) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    
    const MAX_RETRIES = 2; // 减少重试次数，避免无限循环
    const MIN_UNIQUE_ARTICLES = 10; // 每次至少要获取10篇新文章
    
    try {
      // 使用动态API URL获取方法
      const apiUrl = currentLanguage.getApiUrl();
      
      // 增加获取数量以提高获得唯一文章的概率
      const fetchLimit = Math.max(30, MIN_UNIQUE_ARTICLES * 2);
      
      const response = await fetch(
        apiUrl +
          new URLSearchParams({
            action: "query",
            format: "json",
            generator: "random",
            grnnamespace: "0",
            prop: "extracts|info|pageimages",
            inprop: "url|varianttitles",
            grnlimit: fetchLimit.toString(),
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

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('CORS_ERROR: 维基百科API返回了HTML而不是JSON，可能是CORS限制');
      }

      const data = await response.json();
      
      // 检查API响应是否包含错误
      if (data.error) {
        throw new Error(`维基百科API错误: ${data.error.info || data.error.code}`);
      }

      if (!data.query || !data.query.pages) {
        throw new Error('维基百科API返回数据格式异常');
      }

      const allFetchedIds = new Set([
        ...storedArticleIds.current,
        ...articles.map(article => article.pageid),
        ...buffer.map(article => article.pageid)
      ]);

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
            article.extract &&
            !allFetchedIds.has(article.pageid) // 过滤掉已获取的文章
        );

      // 如果获取的唯一文章太少且还有重试次数，则重试
      if (newArticles.length < MIN_UNIQUE_ARTICLES && retryCount < MAX_RETRIES) {
        console.log(`获取的唯一文章数量过少 (${newArticles.length}/${MIN_UNIQUE_ARTICLES})，进行第 ${retryCount + 1} 次重试...`);
        loadingRef.current = false;
        setLoading(false);
        // 短暂延迟后重试，避免过于频繁的请求
        setTimeout(() => {
          fetchArticles(forBuffer, retryCount + 1);
        }, 1000);
        return;
      }

      // 预加载图片
      await Promise.allSettled(
        newArticles
          .filter((article) => article.thumbnail)
          .map((article) => preloadImage(article.thumbnail!.source))
      );

      // 更新已获取文章ID的持久化存储
      const newIds = new Set(newArticles.map(article => article.pageid));
      newIds.forEach(id => storedArticleIds.current.add(id));
      storeArticleIds(storedArticleIds.current, currentLanguage.id);

      if (forBuffer) {
        setBuffer(newArticles);
      } else {
        setArticles((prev) => {
          // 再次确保不添加重复文章（双重保险）
          const existingIds = new Set(prev.map(article => article.pageid));
          const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.pageid));
          return [...prev, ...uniqueNewArticles];
        });
        // 异步为缓冲区获取更多文章
        if (newArticles.length > 0) {
          setTimeout(() => fetchArticles(true), 2000);
        }
      }
      
      console.log(`成功获取 ${newArticles.length} 篇新文章`);
      
      // 成功后重置错误计数
      if (retryCount > 0) {
        console.log('请求恢复正常');
      }
      
      // 清除错误状态
      setError(null);
      
    } catch (error) {
      console.error("获取文章时出错:", error);
      
      // 如果是CORS错误，提供更明确的指导
      if (error instanceof Error && (
        error.message.includes('CORS') || 
        error.message.includes('<!doctype') ||
        error.message.includes('Unexpected token')
      )) {
        const corsError = '🚫 无法连接到维基百科API，可能是网络限制导致的。\n\n💡 解决方案：\n• 刷新页面重试\n• 使用代理: 在URL添加 ?useProxy=true\n• 检查网络连接';
        setError(corsError);
        
        console.warn('🚫 检测到CORS错误 - 无法直接访问维基百科API');
        console.warn('💡 解决方案：');
        console.warn('1. 使用代理服务器: 在URL添加 ?useProxy=true');
        console.warn('2. 配置本地代理服务器: 参见 README.md');
        console.warn('3. 部署到支持代理的环境');
        
        // 在CORS错误时不要无限重试
        if (retryCount === 0) {
          console.warn('⚠️ 由于CORS限制，将停止尝试获取新文章');
          console.warn('🔧 请参考项目README配置代理服务器');
        }
      } else {
        // 其他类型的错误可以重试
        if (retryCount < MAX_RETRIES) {
          console.log(`网络错误，${3000 * (retryCount + 1)}ms 后进行第 ${retryCount + 1} 次重试...`);
          setTimeout(() => {
            loadingRef.current = false;
            setLoading(false);
            fetchArticles(forBuffer, retryCount + 1);
          }, 3000 * (retryCount + 1));
          return;
        } else {
          setError('网络连接失败，请检查网络设置后重试。');
        }
      }
    } finally {
      // 确保无论成功还是失败都重置loading状态
      loadingRef.current = false;
      setLoading(false);
    }
  }, [currentLanguage, articles, buffer]);

  const getMoreArticles = useCallback(() => {
    if (buffer.length > 0) {
      setArticles((prev) => {
        // 避免重复文章，检查所有已知的文章ID
        const allExistingIds = new Set([
          ...prev.map(article => article.pageid),
          ...Array.from(storedArticleIds.current)
        ]);
        const uniqueBufferArticles = buffer.filter(article => !allExistingIds.has(article.pageid));
        return [...prev, ...uniqueBufferArticles];
      });
      setBuffer([]);
      // 异步获取更多文章到缓冲区，不阻塞当前操作
      setTimeout(() => fetchArticles(true), 500);
    } else {
      // 直接获取新文章
      fetchArticles(false);
    }
  }, [buffer, fetchArticles]);

  // 清空缓存的功能，用于语言切换时重新开始
  const clearCache = useCallback(() => {
    storedArticleIds.current.clear();
    storeArticleIds(storedArticleIds.current, currentLanguage.id);
    setArticles([]);
    setBuffer([]);
  }, [currentLanguage.id]);

  return { 
    articles, 
    loading, 
    error,
    fetchArticles, 
    getMoreArticles,
    clearCache
  };
}
