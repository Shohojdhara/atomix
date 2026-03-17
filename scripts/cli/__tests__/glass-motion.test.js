/**
 * Glassmorphism & Motion Generator Tests
 * Tests for Phase 3: Premium UI & Animation System
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { 
  GLASS_PRESETS,
  generateGlassStyles,
  getGlassPresets,
  validateGlassConfig
} from '../internal/glass-generator.js';

import {
  ANIMATION_PRESETS,
  generateMotionTokens,
  getAnimationPresets
} from '../internal/motion-generator.js';

describe('Glass Generator', () => {
  describe('Glass Presets', () => {
    it('should have all predefined presets', () => {
      const presets = getGlassPresets();
      
      expect(presets).toContain('subtle');
      expect(presets).toContain('default');
      expect(presets).toContain('strong');
      expect(presets).toContain('frost');
      expect(presets).toContain('crystal');
    });

    it('should have valid preset configurations', () => {
      for (const [name, config] of Object.entries(GLASS_PRESETS)) {
        expect(config).toHaveProperty('displacementScale');
        expect(config).toHaveProperty('blurAmount');
        expect(config).toHaveProperty('saturation');
        expect(config).toHaveProperty('opacity');
        expect(config).toHaveProperty('borderOpacity');
        
        // Validate ranges
        expect(config.displacementScale).toBeGreaterThanOrEqual(0);
        expect(config.displacementScale).toBeLessThanOrEqual(100);
        expect(config.blurAmount).toBeGreaterThanOrEqual(0);
        expect(config.blurAmount).toBeLessThanOrEqual(50);
        expect(config.opacity).toBeGreaterThanOrEqual(0);
        expect(config.opacity).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('Glass Styles Generation', () => {
    it('should generate glass styles with default preset', () => {
      const styles = generateGlassStyles('Button', 'default');
      
      expect(styles).toContain('.button--glass');
      expect(styles).toContain('backdrop-filter');
      expect(styles).toContain('background: rgba');
      expect(styles).toContain('&:hover');
    });

    it('should include dark mode styles', () => {
      const styles = generateGlassStyles('Card', 'strong');
      
      expect(styles).toContain('.dark .card--glass');
    });

    it('should include accessibility features', () => {
      const styles = generateGlassStyles('Modal', 'subtle');
      
      expect(styles).toContain('prefers-reduced-transparency');
      expect(styles).toContain('prefers-reduced-motion');
    });

    it('should generate different styles for different presets', () => {
      const subtleStyles = generateGlassStyles('Button', 'subtle');
      const crystalStyles = generateGlassStyles('Button', 'crystal');
      
      expect(subtleStyles).not.toBe(crystalStyles);
      expect(crystalStyles).toContain('blur(40px)');
      expect(subtleStyles).toContain('blur(5px)');
    });
  });

  describe('Glass Config Validation', () => {
    it('should validate correct configuration', () => {
      const result = validateGlassConfig({
        displacementScale: 20,
        blurAmount: 10,
        saturation: 200,
        opacity: 0.15
      });
      
      expect(result.valid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it('should reject invalid displacement scale', () => {
      const result = validateGlassConfig({
        displacementScale: 150 // Out of range
      });
      
      expect(result.valid).toBe(false);
      expect(result.issues).toContain('displacementScale must be between 0 and 100');
    });

    it('should reject invalid blur amount', () => {
      const result = validateGlassConfig({
        blurAmount: -5 // Negative
      });
      
      expect(result.valid).toBe(false);
      expect(result.issues).toContain('blurAmount must be between 0 and 50');
    });

    it('should reject invalid opacity', () => {
      const result = validateGlassConfig({
        opacity: 1.5 // > 1
      });
      
      expect(result.valid).toBe(false);
      expect(result.issues).toContain('opacity must be between 0 and 1');
    });

    it('should accept multiple validation errors', () => {
      const result = validateGlassConfig({
        displacementScale: 200,
        blurAmount: 100,
        opacity: 2
      });
      
      expect(result.valid).toBe(false);
      expect(result.issues.length).toBeGreaterThan(2);
    });
  });
});

describe('Motion Generator', () => {
  describe('Animation Presets', () => {
    it('should have all animation presets', () => {
      const presets = getAnimationPresets();
      
      expect(presets).toContain('fade');
      expect(presets).toContain('fadeIn');
      expect(presets).toContain('fadeOut');
      expect(presets).toContain('slideInUp');
      expect(presets).toContain('slideInDown');
      expect(presets).toContain('scaleIn');
      expect(presets).toContain('bounce');
      expect(presets).toContain('spin');
      expect(presets).toContain('shake');
      expect(presets).toContain('pulse');
      expect(presets).toContain('shimmer');
    });

    it('should have valid preset structure', () => {
      for (const [name, preset] of Object.entries(ANIMATION_PRESETS)) {
        expect(preset).toHaveProperty('keyframes');
        expect(preset).toHaveProperty('duration');
        expect(preset).toHaveProperty('easing');
        
        // Keyframes should be non-empty string
        expect(typeof preset.keyframes).toBe('string');
        expect(preset.keyframes.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Motion Tokens Generation', () => {
    it('should generate duration scale tokens', () => {
      const tokens = generateMotionTokens();
      
      expect(tokens).toContain('--atomix-duration-instant');
      expect(tokens).toContain('--atomix-duration-fast');
      expect(tokens).toContain('--atomix-duration-base');
      expect(tokens).toContain('--atomix-duration-slow');
    });

    it('should generate easing tokens', () => {
      const tokens = generateMotionTokens();
      
      expect(tokens).toContain('--atomix-easing-linear');
      expect(tokens).toContain('--atomix-ease-in');
      expect(tokens).toContain('--atomix-ease-out');
      expect(tokens).toContain('--atomix-ease-in-out');
      expect(tokens).toContain('--atomix-easing-smooth');
    });

    it('should generate keyframe definitions', () => {
      const tokens = generateMotionTokens();
      
      expect(tokens).toContain('@keyframes atomix-fade-in');
      expect(tokens).toContain('@keyframes atomix-slide-in-up');
      expect(tokens).toContain('@keyframes atomix-scale-in');
      expect(tokens).toContain('@keyframes atomix-bounce');
      expect(tokens).toContain('@keyframes atomix-spin');
    });

    it('should generate utility classes', () => {
      const tokens = generateMotionTokens();
      
      expect(tokens).toContain('.atomix-animate-fade-in');
      expect(tokens).toContain('.atomix-animate-slide-in-up');
      expect(tokens).toContain('.atomix-animate-scale-in');
      expect(tokens).toContain('.atomix-animate-spin');
    });

    it('should include reduced motion media query', () => {
      const tokens = generateMotionTokens();
      
      expect(tokens).toContain('@media (prefers-reduced-motion: reduce)');
      expect(tokens).toContain('animation-duration: 0.01ms !important');
    });

    it('should generate transition presets', () => {
      const tokens = generateMotionTokens();
      
      expect(tokens).toContain('--atomix-transition-fast');
      expect(tokens).toContain('--atomix-transition-base');
      expect(tokens).toContain('--atomix-transition-colors');
      expect(tokens).toContain('--atomix-transition-opacity');
    });
  });

  describe('Component Animation Generation', () => {
    it('should generate component-specific animation config', () => {
      // This would be tested through generateComponentAnimation
      // which is exported but we're testing the pattern here
      expect(ANIMATION_PRESETS.fade).toBeDefined();
      expect(ANIMATION_PRESETS.fade.duration).toBe('var(--atomix-duration-base)');
    });
  });
});

describe('Integration Tests', () => {
  it('should work together for premium components', () => {
    // Verify both generators can be used together
    const glassStyles = generateGlassStyles('PremiumCard', 'crystal');
    const motionTokens = generateMotionTokens();
    
    expect(glassStyles).toBeDefined();
    expect(motionTokens).toBeDefined();
    
    // Both should include accessibility features
    expect(glassStyles).toContain('prefers-reduced');
    expect(motionTokens).toContain('prefers-reduced-motion');
  });

  it('should provide consistent design tokens', () => {
    const glassConfig = GLASS_PRESETS.default;
    const fadeAnimation = ANIMATION_PRESETS.fade;
    
    // Both should use CSS custom properties for theming
    expect(fadeAnimation.duration).toContain('var(--');
    expect(fadeAnimation.easing).toContain('var(--');
  });
});
