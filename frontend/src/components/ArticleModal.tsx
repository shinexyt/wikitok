import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Share2 } from 'lucide-react';
import type { WikiArticle } from './WikiCard';
import { useLocalization } from '../hooks/useLocalization';

interface ArticleModalProps {
  article: WikiArticle;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  const [fullContent, setFullContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { currentLanguage } = useLocalization();

  useEffect(() => {
    if (isOpen && article) {
      fetchFullContent();
    }
  }, [isOpen, article]);

  const fetchFullContent = async () => {
    setLoading(true);
    setError('');
    try {
      const apiUrl = currentLanguage.getApiUrl();
      const response = await fetch(
        apiUrl + 
        new URLSearchParams({
          action: 'query',
          format: 'json',
          pageids: article.pageid.toString(),
          prop: 'extracts',
          exintro: '0', // 获取完整内容，不仅仅是摘要
          explaintext: '1',
          exsectionformat: 'plain',
          origin: '*'
        })
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.info || 'API Error');
      }

      const page = data.query?.pages?.[article.pageid];
      if (page?.extract) {
        setFullContent(page.extract);
      } else {
        setError('Article content not available');
      }
    } catch (err) {
      console.error('Error fetching full content:', err);
      setError('Failed to load article content');
    }
    setLoading(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.displaytitle,
          text: article.extract || '',
          url: article.url
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(article.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleExternalLink = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl h-[90vh] flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white pr-8">{article.displaytitle}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-white/70 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Share article"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleExternalLink}
              className="p-2 text-white/70 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Open in Wikipedia"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {article.thumbnail && (
            <div className="mb-4">
              <img
                src={article.thumbnail.source}
                alt={article.displaytitle}
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </div>
          )}

          {loading && (
            <div className="text-center text-white/70 py-8">
              <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
              Loading full article...
            </div>
          )}

          {error && (
            <div className="text-center text-red-400 py-8">
              <p className="mb-4">{error}</p>
              <button
                onClick={handleExternalLink}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Open in Wikipedia →
              </button>
            </div>
          )}

          {!loading && !error && fullContent && (
            <div className="text-white/90 leading-relaxed">
              {fullContent.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          )}

          {!loading && !error && !fullContent && (
            <div className="text-white/70">
              <p className="mb-4">{article.extract}</p>
              <button
                onClick={handleExternalLink}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Read full article on Wikipedia →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Background overlay to close modal */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
};

export default ArticleModal;
