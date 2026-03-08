import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

interface YouTubePlayerProps {
  youtubeId?: string;
  title: string;
  onBack: () => void;
  autoplay?: boolean;
  tmdbId?: string;
  mediaType?: string;
  season?: number;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
  youtubeId, 
  title, 
  onBack,
  autoplay = true 
}) => {
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

  // Show controls on mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    
    // Clear existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    
    // Hide controls after 3 seconds of no movement
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Show controls on click
  const handleClick = () => {
    setShowControls(true);
    
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  if (!youtubeId) {
    return (
      <div className="relative w-full bg-black flex items-center justify-center" style={{ aspectRatio: '16 / 9' }}>
        <p className="text-white">No video available</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&modestbranding=1&controls=0&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=1&playsinline=1`;

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ aspectRatio: '16 / 9' }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* YouTube Iframe */}
      <iframe
        className="absolute inset-0 w-full h-full"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      {/* Back Button Overlay with Fade Effect */}
      <div 
        className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBack();
        }}
        className={`absolute top-4 left-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-black/80 hover:border-white/40 transition-all shadow-xl pointer-events-auto transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          zIndex: 9999,
          marginTop: 'max(0.5rem, env(safe-area-inset-top))',
          marginLeft: 'max(0.5rem, env(safe-area-inset-left))'
        }}
      >
        <ChevronLeft size={24} className="text-white" strokeWidth={2} />
      </button>

      {/* Title Overlay */}
      {title && (
        <div 
          className={`absolute top-4 right-4 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-white text-xs font-medium truncate max-w-[200px] block">{title}</span>
        </div>
      )}
    </div>
  );
};
