import { describe, it, expect } from 'vitest';
import {
  createFontPreloadLink,
  preloadFonts,
  generateFontPreloadTags,
  type FontPreloadConfig,
} from '../fontPreloader';

describe('fontPreloader', () => {
  describe('createFontPreloadLink', () => {
    it('should create a link element with correct attributes', () => {
      const config: FontPreloadConfig = {
        family: 'Test Font',
        path: '/fonts/test.woff2',
        weight: 400,
        style: 'normal',
      };

      const link = createFontPreloadLink(config);

      expect(link).toBeInstanceOf(HTMLLinkElement);
      expect(link.rel).toBe('preload');
      expect(link.as).toBe('font');
      expect(link.href).toContain('/fonts/test.woff2');
      expect(link.type).toBe('font/woff2');
      expect(link.crossOrigin).toBe('anonymous');
    });

    it('should use default values for optional properties', () => {
      const config: FontPreloadConfig = {
        family: 'Test Font',
        path: '/fonts/test.woff2',
      };

      const link = createFontPreloadLink(config);

      expect(link.type).toBe('font/woff2');
      expect(link.crossOrigin).toBe('anonymous');
    });

    it('should respect custom format and crossorigin', () => {
      const config: FontPreloadConfig = {
        family: 'Test Font',
        path: '/fonts/test.woff',
        format: 'woff',
        crossorigin: 'use-credentials',
      };

      const link = createFontPreloadLink(config);

      expect(link.type).toBe('font/woff');
      expect(link.crossOrigin).toBe('use-credentials');
    });
  });

  describe('preloadFonts', () => {
    it('should create multiple link elements', () => {
      const configs: FontPreloadConfig[] = [
        { family: 'Font 1', path: '/f1.woff2' },
        { family: 'Font 2', path: '/f2.woff2' },
      ];

      const links = preloadFonts(configs);

      expect(links).toHaveLength(2);
      expect(links[0]).toBeInstanceOf(HTMLLinkElement);
      expect(links[1]).toBeInstanceOf(HTMLLinkElement);
      expect(links[0].href).toContain('/f1.woff2');
      expect(links[1].href).toContain('/f2.woff2');
    });
  });

  describe('generateFontPreloadTags', () => {
    it('should generate HTML strings for preload links', () => {
      const configs: FontPreloadConfig[] = [
        { family: 'Font 1', path: '/f1.woff2' },
      ];

      const tags = generateFontPreloadTags(configs);

      expect(tags).toHaveLength(1);
      expect(tags[0]).toContain('<link rel="preload" as="font"');
      expect(tags[0]).toContain('href="/f1.woff2"');
      expect(tags[0]).toContain('type="font/woff2"');
      expect(tags[0]).toContain('crossorigin="anonymous"');
    });

    it('should handle multiple configurations', () => {
      const configs: FontPreloadConfig[] = [
        { family: 'Font 1', path: '/f1.woff2' },
        { family: 'Font 2', path: '/f2.woff', format: 'woff' },
      ];

      const tags = generateFontPreloadTags(configs);

      expect(tags).toHaveLength(2);
      expect(tags[0]).toContain('href="/f1.woff2"');
      expect(tags[1]).toContain('href="/f2.woff"');
      expect(tags[1]).toContain('type="font/woff"');
    });
  });
});
