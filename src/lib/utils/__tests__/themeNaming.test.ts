import { describe, it, expect, afterEach } from 'vitest';
import { ThemeNaming } from '../themeNaming';

describe('ThemeNaming', () => {
  afterEach(() => {
    // Reset prefix to default after each test
    ThemeNaming.setPrefix('atomix');
  });

  describe('setPrefix / getPrefix', () => {
    it('should have default prefix "atomix"', () => {
      expect(ThemeNaming.getPrefix()).toBe('atomix');
    });

    it('should update prefix', () => {
      ThemeNaming.setPrefix('custom');
      expect(ThemeNaming.getPrefix()).toBe('custom');
    });
  });

  describe('camelToKebab', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(ThemeNaming.camelToKebab('camelCase')).toBe('camel-case');
    });

    it('should handle PascalCase', () => {
      expect(ThemeNaming.camelToKebab('PascalCase')).toBe('pascal-case');
    });

    it('should handle simple strings', () => {
      expect(ThemeNaming.camelToKebab('simple')).toBe('simple');
    });

    it('should handle empty string', () => {
      expect(ThemeNaming.camelToKebab('')).toBe('');
    });
  });

  describe('kebabToCamel', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(ThemeNaming.kebabToCamel('kebab-case')).toBe('kebabCase');
    });

    it('should handle simple strings', () => {
      expect(ThemeNaming.kebabToCamel('simple')).toBe('simple');
    });

    it('should handle empty string', () => {
      expect(ThemeNaming.kebabToCamel('')).toBe('');
    });
  });

  describe('cssVar', () => {
    it('should create CSS variable with default prefix', () => {
      expect(ThemeNaming.cssVar('tokenName')).toBe('--atomix-token-name');
    });

    it('should create CSS variable with custom prefix', () => {
      ThemeNaming.setPrefix('custom');
      expect(ThemeNaming.cssVar('tokenName')).toBe('--custom-token-name');
    });
  });

  describe('bemClass', () => {
    it('should create block class', () => {
      expect(ThemeNaming.bemClass('block')).toBe('c-block');
    });

    it('should create block element class', () => {
      expect(ThemeNaming.bemClass('block', 'element')).toBe('c-block__element');
    });

    it('should create block modifier class', () => {
      expect(ThemeNaming.bemClass('block', undefined, 'mod')).toBe('c-block--mod');
    });

    it('should create block element modifier class', () => {
      expect(ThemeNaming.bemClass('block', 'element', 'mod')).toBe('c-block__element--mod');
    });
  });

  describe('variantClass', () => {
    it('should create variant class', () => {
      expect(ThemeNaming.variantClass('button', 'primary')).toBe('c-button--primary');
    });
  });

  describe('sizeClass', () => {
    it('should create size class', () => {
      expect(ThemeNaming.sizeClass('button', 'lg')).toBe('c-button--lg');
    });
  });

  describe('stateClass', () => {
    it('should create state class', () => {
      expect(ThemeNaming.stateClass('input', 'disabled')).toBe('c-input--disabled');
    });
  });

  describe('utilityClass', () => {
    it('should create utility class', () => {
      expect(ThemeNaming.utilityClass('flex')).toBe('u-flex');
    });
  });

  describe('layoutClass', () => {
    it('should create layout class', () => {
      expect(ThemeNaming.layoutClass('grid')).toBe('l-grid');
    });
  });

  describe('objectClass', () => {
    it('should create object class', () => {
      expect(ThemeNaming.objectClass('container')).toBe('o-container');
    });
  });
});
