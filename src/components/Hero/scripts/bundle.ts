/**
 * Bundle file for Hero component
 * Used for global exports and browser usage
 */

import { Hero, initHeroes } from './index';
import {
  applyParallaxEffect,
  removeParallaxEffect,
  applyVideoBackground,
  initializeHeroesWithCustomBehavior,
} from './heroInteractions';

// Export for global use
export {
  Hero,
  initHeroes,
  applyParallaxEffect,
  removeParallaxEffect,
  applyVideoBackground,
  initializeHeroesWithCustomBehavior,
};

// Add to global namespace for direct browser usage
if (typeof window !== 'undefined') {
  (window as any).Atomix = (window as any).Atomix || {};
  (window as any).Atomix.Hero = Hero;
  (window as any).Atomix.initHeroes = initHeroes;
  (window as any).Atomix.applyParallaxEffect = applyParallaxEffect;
  (window as any).Atomix.removeParallaxEffect = removeParallaxEffect;
  (window as any).Atomix.applyVideoBackground = applyVideoBackground;
  (window as any).Atomix.initializeHeroesWithCustomBehavior = initializeHeroesWithCustomBehavior;
}
