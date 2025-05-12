import { Hero } from './index';
import { HERO } from '../../../lib/constants/components';

/**
 * Apply parallax effect to hero background
 * @param hero - Hero element
 * @param intensity - Parallax effect intensity (0-1)
 */
export function applyParallaxEffect(hero: HTMLElement, intensity: number = 0.5): void {
  if (!hero) return;
  
  // Ensure intensity is between 0 and 1
  const safeIntensity = Math.max(0, Math.min(1, intensity));
  
  // Add parallax class
  hero.classList.add('c-hero--parallax');
  
  // Handle scroll event
  const handleScroll = (): void => {
    const scrollPosition = window.pageYOffset;
    const offset = scrollPosition * safeIntensity;
    
    // Apply transform
    hero.style.backgroundPositionY = `calc(50% + ${offset}px)`;
  };
  
  // Add event listener
  window.addEventListener('scroll', handleScroll);
  
  // Store the handler for cleanup
  (hero as any)._parallaxHandler = handleScroll;
  
  // Initial call
  handleScroll();
}

/**
 * Remove parallax effect from hero
 * @param hero - Hero element
 */
export function removeParallaxEffect(hero: HTMLElement): void {
  if (!hero) return;
  
  // Remove class
  hero.classList.remove('c-hero--parallax');
  
  // Remove style
  hero.style.backgroundPositionY = '';
  
  // Remove event listener
  if ((hero as any)._parallaxHandler) {
    window.removeEventListener('scroll', (hero as any)._parallaxHandler);
    delete (hero as any)._parallaxHandler;
  }
}

/**
 * Apply video background to hero
 * @param hero - Hero element
 * @param videoUrl - URL of the video
 * @param options - Video options
 */
export function applyVideoBackground(
  hero: HTMLElement, 
  videoUrl: string,
  options: {
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    posterUrl?: string;
  } = {}
): void {
  if (!hero) return;
  
  // Default options
  const { 
    autoplay = true, 
    loop = true, 
    muted = true,
    posterUrl
  } = options;
  
  // Create video element
  const video = document.createElement('video');
  video.className = 'c-hero__video';
  video.autoplay = autoplay;
  video.loop = loop;
  video.muted = muted;
  video.setAttribute('playsinline', '');
  
  if (posterUrl) {
    video.poster = posterUrl;
  }
  
  // Add source
  const source = document.createElement('source');
  source.src = videoUrl;
  source.type = `video/${videoUrl.split('.').pop() || 'mp4'}`;
  
  video.appendChild(source);
  
  // Add to hero
  hero.appendChild(video);
}

/**
 * Initialize hero with custom behavior
 * @param selector - CSS selector for hero elements
 */
export function initializeHeroesWithCustomBehavior(selector = HERO.SELECTORS.HERO): Hero[] {
  const heroes = Hero.initializeAll(selector);
  
  // Apply custom behaviors based on data attributes
  heroes.forEach(heroInstance => {
    const element = heroInstance['element'] as HTMLElement;
    
    // Apply parallax if data attribute is present
    if (element.dataset.parallax === 'true') {
      const intensity = parseFloat(element.dataset.parallaxIntensity || '0.5');
      applyParallaxEffect(element, intensity);
    }
    
    // Apply video background if data attribute is present
    if (element.dataset.videoBackground) {
      applyVideoBackground(element, element.dataset.videoBackground, {
        autoplay: element.dataset.videoAutoplay !== 'false',
        loop: element.dataset.videoLoop !== 'false',
        muted: element.dataset.videoMuted !== 'false',
        posterUrl: element.dataset.videoPoster
      });
    }
  });
  
  return heroes;
} 