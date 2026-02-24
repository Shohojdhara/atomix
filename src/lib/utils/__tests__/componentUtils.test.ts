import { describe, it, expect } from 'vitest';
import {
  mergeClassNames,
  applyPartStyles,
  createCSSVarStyle,
  mergeComponentProps,
  isYouTubeUrl,
  extractYouTubeId,
} from '../componentUtils';

describe('componentUtils', () => {
  describe('mergeClassNames', () => {
    it('should merge multiple class names', () => {
      const result = mergeClassNames('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should filter out falsy values', () => {
      const result = mergeClassNames('class1', undefined, null, false, '', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle empty input', () => {
      const result = mergeClassNames();
      expect(result).toBe('');
    });

    it('should handle all falsy values', () => {
      const result = mergeClassNames(undefined, null, false, '');
      expect(result).toBe('');
    });
  });

  describe('applyPartStyles', () => {
    it('should merge className', () => {
      const baseProps = { className: 'base' };
      const partStyles = { className: 'custom' };
      const result = applyPartStyles(baseProps, partStyles);
      expect(result.className).toBe('base custom');
    });

    it('should merge style objects', () => {
      const baseProps = { style: { color: 'red' } };
      const partStyles = { style: { fontSize: '16px' } };
      const result = applyPartStyles(baseProps, partStyles);
      expect(result.style).toEqual({ color: 'red', fontSize: '16px' });
    });

    it('should handle undefined partStyles', () => {
      const baseProps = { className: 'base', style: { color: 'red' } };
      const result = applyPartStyles(baseProps, undefined);
      expect(result).toEqual(baseProps);
    });

    it('should preserve other props', () => {
      const baseProps = { className: 'base', id: 'test', 'data-test': 'value' };
      const partStyles = { className: 'custom' };
      const result = applyPartStyles(baseProps, partStyles);
      expect(result).toEqual({
        className: 'base custom',
        id: 'test',
        'data-test': 'value',
        style: {},
      });
    });
  });

  describe('createCSSVarStyle', () => {
    it('should create style object from CSS variables', () => {
      const cssVars = {
        '--atomix-button-bg': '#FF0000',
        '--atomix-button-border-radius': '20px',
      };
      const result = createCSSVarStyle(cssVars);
      expect(result).toEqual({
        '--atomix-button-bg': '#FF0000',
        '--atomix-button-border-radius': '20px',
      });
    });

    it('should merge with base style', () => {
      const cssVars = {
        '--atomix-button-bg': '#FF0000',
      };
      const baseStyle = { marginTop: '10px' };
      const result = createCSSVarStyle(cssVars, baseStyle);
      expect(result).toEqual({
        '--atomix-button-bg': '#FF0000',
        marginTop: '10px',
      });
    });

    it('should handle numeric values', () => {
      const cssVars = {
        '--atomix-button-padding-x': 16,
        '--atomix-button-padding-y': 8,
      };
      const result = createCSSVarStyle(cssVars);
      expect(result).toEqual({
        '--atomix-button-padding-x': '16px',
        '--atomix-button-padding-y': '8px',
      });
    });

    it('should handle empty cssVars', () => {
      const result = createCSSVarStyle(undefined);
      expect(result).toEqual({});
    });
  });

  describe('mergeComponentProps', () => {
    it('should merge className', () => {
      const baseProps = { className: 'base' };
      const customization = { className: 'custom' };
      const result = mergeComponentProps(baseProps, customization);
      expect(result.className).toBe('base custom');
    });

    it('should merge style with CSS variables', () => {
      const baseProps = { style: { color: 'red' } };
      const customization = {
        style: { fontSize: '16px' },
        cssVars: { '--atomix-button-bg': '#FF0000' },
      };
      const result = mergeComponentProps(baseProps, customization);
      expect(result.style).toEqual({
        color: 'red',
        fontSize: '16px',
        '--atomix-button-bg': '#FF0000',
      });
    });

    it('should preserve other props', () => {
      const baseProps = { className: 'base', id: 'test', onClick: () => {} };
      const customization = { className: 'custom' };
      const result = mergeComponentProps(baseProps, customization);
      expect(result.id).toBe('test');
      expect(result.onClick).toBeDefined();
    });

    it('should handle empty customization', () => {
      const baseProps = { className: 'base', style: { color: 'red' } };
      const result = mergeComponentProps(baseProps, {});
      expect(result).toEqual(baseProps);
    });
  });

  describe('isYouTubeUrl', () => {
    it('should return true for standard YouTube URLs', () => {
      expect(isYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
      expect(isYouTubeUrl('http://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
      expect(isYouTubeUrl('www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
      expect(isYouTubeUrl('youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    });

    it('should return true for shortened YouTube URLs', () => {
      expect(isYouTubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
      expect(isYouTubeUrl('http://youtu.be/dQw4w9WgXcQ')).toBe(true);
      expect(isYouTubeUrl('youtu.be/dQw4w9WgXcQ')).toBe(true);
    });

    it('should return true for embed YouTube URLs', () => {
      expect(isYouTubeUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(true);
    });

    it('should return false for non-YouTube URLs', () => {
      expect(isYouTubeUrl('https://vimeo.com/12345')).toBe(false);
      expect(isYouTubeUrl('https://google.com')).toBe(false);
      expect(isYouTubeUrl('random string')).toBe(false);
      expect(isYouTubeUrl('')).toBe(false);
    });
  });

  describe('extractYouTubeId', () => {
    it('should extract ID from standard YouTube URLs', () => {
      expect(extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('should extract ID from shortened YouTube URLs', () => {
      expect(extractYouTubeId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('should extract ID from embed YouTube URLs', () => {
      expect(extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('should extract ID with additional query parameters', () => {
      expect(extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be')).toBe(
        'dQw4w9WgXcQ'
      );
    });

    it('should return null for non-YouTube URLs', () => {
      expect(extractYouTubeId('https://vimeo.com/12345')).toBe(null);
      expect(extractYouTubeId('https://google.com')).toBe(null);
      expect(extractYouTubeId('')).toBe(null);
    });
  });
});
