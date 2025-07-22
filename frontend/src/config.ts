// 代理服务器配置
export const PROXY_CONFIG = {
  useProxy: false, // 在开发环境中默认关闭代理
  
  // 代理服务器地址（通过环境变量配置）
  proxyBaseUrl: import.meta.env.VITE_PROXY_BASE_URL,
  
  // 可以通过环境变量覆盖
  getProxyUrl: () => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return import.meta.env.VITE_LOCAL_BASE_URL;
    }
    return PROXY_CONFIG.proxyBaseUrl;
  },
  
  // 检测是否需要使用代理（简单的地理位置检测）
  shouldUseProxy: () => {
    // 可以根据需要添加更复杂的检测逻辑
    // 例如：检测用户IP地理位置、测试维基百科可访问性等
    if (typeof window !== 'undefined') {
      // 本地开发环境可以通过URL参数控制
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('useProxy') === 'true') {
        return true;
      }
      if (urlParams.get('useProxy') === 'false') {
        return false;
      }
    }
    
    // 如果没有配置代理服务器，则不使用代理
    if (!PROXY_CONFIG.proxyBaseUrl && !import.meta.env.VITE_LOCAL_BASE_URL) {
      return false;
    }
    
    return PROXY_CONFIG.useProxy;
  }
};

// 构建API URL的辅助函数
export function buildApiUrl(language: string, useProxy?: boolean): string {
  const shouldProxy = useProxy ?? PROXY_CONFIG.shouldUseProxy();
  
  if (shouldProxy) {
    // 使用代理服务器
    return `${PROXY_CONFIG.getProxyUrl()}/api/wikipedia/${language}?`;
  } else {
    // 使用原始维基百科API
    let langCode = language;
    if (language === 'zh-yue') {
      langCode = 'zh-yue';
    } else if (language.startsWith('zh-')) {
      langCode = 'zh';
    } else if (language.includes('-')) {
      langCode = language.split('-')[0];
    }
    return `https://${langCode}.wikipedia.org/w/api.php?`;
  }
}

// 图片代理函数
export function getProxiedImageUrl(originalUrl: string, useProxy?: boolean): string {
  const shouldProxy = useProxy ?? PROXY_CONFIG.shouldUseProxy();
  
  if (shouldProxy && originalUrl.includes('upload.wikimedia.org')) {
    // 使用自定义 wikipedia-proxy-server 进行图片代理
    // 该服务器已增加了对图片的代理支持
    const proxyBaseUrl = PROXY_CONFIG.getProxyUrl();
    
    if (proxyBaseUrl) {
      // 解析原始 Wikimedia URL 来提取项目和路径
      // URL 格式: https://upload.wikimedia.org/wikipedia/{project}/{path}
      const urlMatch = originalUrl.match(/https:\/\/upload\.wikimedia\.org\/wikipedia\/([^/]+)\/(.+)/);
      
      if (urlMatch) {
        const [, project, imagePath] = urlMatch;
        // 使用 wikipedia-proxy-server 的图片代理端点
        return `${proxyBaseUrl}/api/images/${project}/${imagePath}`;
      }
    }
    
    // 如果代理服务器不可用或URL格式不匹配，回退到原始URL
    return originalUrl;
  }
  
  return originalUrl;
}

// 页面URL代理函数
export function getProxiedPageUrl(originalUrl: string, useProxy?: boolean): string {
  const shouldProxy = useProxy ?? PROXY_CONFIG.shouldUseProxy();
  
  if (shouldProxy && originalUrl.includes('.wikipedia.org')) {
    // 多种代理策略，按优先级尝试
    
    // 策略1: 如果后端代理支持页面代理，使用后端代理
    // return `${PROXY_CONFIG.getProxyUrl()}/page?url=${encodeURIComponent(originalUrl)}`;
    
    // 策略2: 使用通用网页代理服务 (例如：croxyproxy)
    // 注意：这些服务可能不稳定，并且可能有使用限制
    // return `https://www.croxyproxy.com/go/${encodeURIComponent(originalUrl)}`;
    
    // 策略3: 替换为不同的维基百科镜像或CDN（如果存在）
    // 某些地区可能有维基百科的镜像站点
    
    // 策略4: 在应用内提示用户或提供备选链接
    // 当前策略：保持原始链接，但添加一个提示
    // 实际部署时可能需要根据具体情况调整
    
    return originalUrl; // 暂时保持原始链接
  }
  
  return originalUrl;
}

// 导出配置对象
export default PROXY_CONFIG;
