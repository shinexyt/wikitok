import React, { useState, useEffect } from 'react';
import { PROXY_CONFIG } from './config';

interface ProxyIndicatorProps {
  className?: string;
}

export const ProxyIndicator: React.FC<ProxyIndicatorProps> = ({ className = "" }) => {
  const [isUsingProxy, setIsUsingProxy] = useState(false);
  const [proxyUrl, setProxyUrl] = useState('');

  useEffect(() => {
    const usingProxy = PROXY_CONFIG.shouldUseProxy();
    setIsUsingProxy(usingProxy);
    if (usingProxy) {
      setProxyUrl(PROXY_CONFIG.getProxyUrl());
    }
  }, []);

  const toggleProxy = () => {
    const newProxyState = !isUsingProxy;
    const url = new URL(window.location.href);
    url.searchParams.set('useProxy', newProxyState.toString());
    window.location.href = url.toString();
  };

  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      <div className="flex items-center gap-1">
        <div 
          className={`w-2 h-2 rounded-full ${
            isUsingProxy ? 'bg-green-500' : 'bg-gray-500'
          }`}
          title={isUsingProxy ? '使用代理服务器' : '直接访问维基百科'}
        />
        <span className="text-white/70">
          {isUsingProxy ? '代理' : '直连'}
        </span>
      </div>
      
      <button
        onClick={toggleProxy}
        className="text-white/50 hover:text-white/80 underline"
        title={isUsingProxy ? '切换到直连模式' : '切换到代理模式'}
      >
        切换
      </button>

    </div>
  );
};

export default ProxyIndicator;
