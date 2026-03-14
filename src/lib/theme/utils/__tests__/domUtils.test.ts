/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isBrowser,
  isServer,
  getThemeLinkId,
  removeThemeCSS,
} from '../domUtils';
import { THEME_LINK_ID_PREFIX } from '../../constants/constants';

describe('DOM Utils', () => {
  describe('isBrowser', () => {
    it('should return true in a browser environment', () => {
      // With happy-dom environment, window and document are defined
      expect(isBrowser()).toBe(true);
    });
  });

  describe('isServer', () => {
    it('should return false in a browser environment', () => {
      expect(isServer()).toBe(false);
    });
  });

  describe('getThemeLinkId', () => {
    it('should correctly format theme link ID', () => {
      const themeName = 'dark-theme';
      expect(getThemeLinkId(themeName)).toBe(`${THEME_LINK_ID_PREFIX}${themeName}`);
    });
  });

  describe('removeThemeCSS', () => {
    beforeEach(() => {
      // Clear document body before each test
      document.body.innerHTML = '';
      document.head.innerHTML = '';
      vi.restoreAllMocks();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should do nothing if on server', () => {
      // Mock window to be undefined to simulate server
      const originalWindow = global.window;
      // @ts-ignore
      delete (global as any).window;

      const getElementByIdSpy = vi.spyOn(document, 'getElementById');
      removeThemeCSS('test-theme');

      expect(getElementByIdSpy).not.toHaveBeenCalled();

      // Restore window
      global.window = originalWindow;
    });

    it('should remove element found by direct ID', () => {
      const linkId = 'my-custom-theme-link';
      const link = document.createElement('link');
      link.id = linkId;
      document.head.appendChild(link);

      const removeSpy = vi.spyOn(link, 'remove');

      removeThemeCSS(linkId);

      expect(removeSpy).toHaveBeenCalled();
      expect(document.getElementById(linkId)).toBeNull();
    });

    it('should remove element found by generated theme link ID', () => {
      const themeName = 'dark';
      const expectedLinkId = getThemeLinkId(themeName);

      const link = document.createElement('link');
      link.id = expectedLinkId;
      document.head.appendChild(link);

      const removeSpy = vi.spyOn(link, 'remove');

      // Pass the theme name, not the link ID directly
      removeThemeCSS(themeName);

      expect(removeSpy).toHaveBeenCalled();
      expect(document.getElementById(expectedLinkId)).toBeNull();
    });

    it('should do nothing if element is not found', () => {
      // No element added to DOM
      const getElementByIdSpy = vi.spyOn(document, 'getElementById');

      removeThemeCSS('non-existent-theme');

      expect(getElementByIdSpy).toHaveBeenCalledTimes(2); // Once for direct ID, once for generated ID
    });
  });
});
