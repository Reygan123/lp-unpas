const baseStorageUrl = import.meta.env.VITE_APP_IMG_URL || 'http://127.0.0.1:8000/storage/';

export type VideoType = 'upload' | 'instagram' | 'youtube' | null;

export const getVideoType = (video: string | null | undefined): VideoType => {
  if (!video || video.trim() === '' || video === '-') return null;

  const trimmed = video.trim();

  if (/instagram\.com\/(reel|p|tv)\/([a-zA-Z0-9_-]+)/i.test(trimmed)) {
    return 'instagram';
  }

  if (/(youtube\.com|youtu\.be)/i.test(trimmed)) {
    return 'youtube';
  }

  if (
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed) ||
    !/^https?:\/\//i.test(trimmed) ||
    trimmed.includes('pengabdian-video') ||
    trimmed.includes('portofolio-video')
  ) {
    return 'upload';
  }

  return 'upload';
};

export const getVideoUrl = (video: string | null | undefined): string => {
  if (!video) return '';

  const trimmed = video.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const cleanBase = baseStorageUrl.endsWith('/') ? baseStorageUrl : `${baseStorageUrl}/`;
  const cleanPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  return `${cleanBase}${cleanPath}`;
};

export const getInstagramEmbedUrl = (url: string): string | null => {
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
  if (match && match[1]) {
    return `https://www.instagram.com/reel/${match[1]}/embed/`;
  }
  return null;
};

export const getYouTubeEmbedUrl = (urlOrId: string): string | null => {
  if (!urlOrId) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = urlOrId.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}`;
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId.trim())) {
    return `https://www.youtube.com/embed/${urlOrId.trim()}?autoplay=1&mute=1&loop=1&playlist=${urlOrId.trim()}`;
  }

  return null;
};
