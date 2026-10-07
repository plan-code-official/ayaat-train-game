import celebrationRobots from '../Celebration/assets/celbr.png';
import fireworksSoundUrl from '../Celebration/fireworks.mp3';
import panelArt from '../assets/results-panel-empty.png';
import celebrationTitle from '../ResultsPanel/assets/good.png';
import exitButtonImage from '../assets/Exit1.png';
import retryButtonImage from '../assets/start_transparent.png';

// Keep references in memory to prevent garbage collection of decoded images/audio
const inMemoryCache = {
  images: [],
  audios: []
};

let hasPreloaded = false;

/**
 * Preloads all visual and audio assets for both the Celebration screen and Results Panel.
 * Downloads and decodes assets in the background so they appear instantly without delay or blank frames.
 */
export function preloadCelebrationAndResults() {
  if (hasPreloaded || typeof window === 'undefined') return;
  hasPreloaded = true;

  const images = [
    { url: celebrationRobots, label: 'celebration-robots' },
    { url: panelArt, label: 'results-panel-art' },
    { url: celebrationTitle, label: 'celebration-title' },
    { url: exitButtonImage, label: 'exit-button' },
    { url: retryButtonImage, label: 'retry-button' }
  ];

  // 1. Preload & decode images
  images.forEach(({ url, label }) => {
    try {
      if (!url) return;

      // Add HTML link preload tag if not present
      if (document.head && !document.querySelector(`link[rel="preload"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      }

      // Instantiate Image object and decode off-thread
      const img = new Image();
      img.src = url;
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {
          // Fallback handled silently
        });
      }
      inMemoryCache.images.push(img);
    } catch (err) {
      console.warn(`[AssetPreloader] Warning preloading ${label}:`, err);
    }
  });

  // 2. Preload fireworks audio
  try {
    if (fireworksSoundUrl) {
      if (document.head && !document.querySelector(`link[rel="preload"][href="${fireworksSoundUrl}"]`)) {
        const audioLink = document.createElement('link');
        audioLink.rel = 'preload';
        audioLink.as = 'fetch';
        audioLink.crossOrigin = 'anonymous';
        audioLink.href = fireworksSoundUrl;
        document.head.appendChild(audioLink);
      }

      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = fireworksSoundUrl;
      audio.load();
      inMemoryCache.audios.push(audio);
    }
  } catch (err) {
    console.warn('[AssetPreloader] Warning preloading audio:', err);
  }
}

// Auto-run preloading when this module is imported in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', preloadCelebrationAndResults, { once: true });
  } else {
    // If DOM is already loaded or interactive, queue in next idle frame
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(preloadCelebrationAndResults);
    } else {
      setTimeout(preloadCelebrationAndResults, 50);
    }
  }
}
