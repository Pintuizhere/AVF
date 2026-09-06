"use client";

export default function InlineVideoPlayer({ url }) {
  if (!url) return null;

  const lowerUrl = url.toLowerCase();
  
  // YouTube
  if (lowerUrl.includes('youtube.com/watch?v=') || lowerUrl.includes('youtu.be/')) {
    let videoId = "";
    if (lowerUrl.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    
    if (videoId) {
      return (
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          className="w-full h-full object-cover bg-black absolute inset-0 z-50 border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      );
    }
  }
  
  // Vimeo
  if (lowerUrl.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    if (videoId) {
      return (
        <iframe 
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`}
          className="w-full h-full object-cover bg-black absolute inset-0 z-50 border-none"
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
        />
      );
    }
  }
  
  // Instagram
  if (lowerUrl.includes('instagram.com/p/') || lowerUrl.includes('instagram.com/reel/')) {
    let embedUrl = url.split('?')[0];
    if (!embedUrl.endsWith('/embed') && !embedUrl.endsWith('/embed/')) {
      embedUrl = embedUrl.endsWith('/') ? `${embedUrl}embed` : `${embedUrl}/embed`;
    }
    return (
      <iframe 
        src={embedUrl}
        className="w-full h-full object-cover bg-white absolute inset-0 z-50 border-none"
        frameBorder="0"
        scrolling="no"
        allowTransparency="true"
        allow="encrypted-media"
      />
    );
  }
  
  // Direct Video file fallback
  if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm')) {
    return (
      <video 
        src={url} 
        className="w-full h-full object-cover bg-black absolute inset-0 z-50" 
        controls 
        autoPlay 
      />
    );
  }

  // Fallback for unsupported links
  return (
    <div className="absolute inset-0 z-50 bg-neutral-900 flex flex-col items-center justify-center p-4 text-center">
      <p className="text-white text-xs font-bold mb-2">Cannot play inline.</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gold text-black font-bold uppercase tracking-widest text-[10px] rounded hover:bg-white transition-colors">
        Open in New Tab
      </a>
    </div>
  );
}
