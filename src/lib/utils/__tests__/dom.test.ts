import { describe, it, expect, beforeEach } from 'vitest';
import { hasClass, addClass, removeClass, toggleClass } from '../dom';

describe('dom utils', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('hasClass', () => {
    it('should return true if element has class', () => {
      element.className = 'test-class';
      expect(hasClass(element, 'test-class')).toBe(true);
    });

    it('should return false if element does not have class', () => {
      element.className = 'other-class';
      expect(hasClass(element, 'test-class')).toBe(false);
    });

    it('should return false if element has no classes', () => {
      expect(hasClass(element, 'test-class')).toBe(false);
    });
  });

  describe('addClass', () => {
    it('should add class if not present', () => {
      addClass(element, 'new-class');
      expect(element.classList.contains('new-class')).toBe(true);
    });

    it('should not add duplicate class', () => {
      element.className = 'existing-class';
      addClass(element, 'existing-class');
      expect(element.className).toBe('existing-class');
      expect(element.classList.length).toBe(1);
    });

    it('should preserve existing classes', () => {
      element.className = 'existing-class';
      addClass(element, 'new-class');
      expect(element.classList.contains('existing-class')).toBe(true);
      expect(element.classList.contains('new-class')).toBe(true);
    });
  });

  describe('removeClass', () => {
    it('should remove existing class', () => {
      element.className = 'test-class';
      removeClass(element, 'test-class');
      expect(element.classList.contains('test-class')).toBe(false);
    });

    it('should do nothing if class does not exist', () => {
      element.className = 'other-class';
      removeClass(element, 'test-class');
      expect(element.className).toBe('other-class');
    });

    it('should preserve other classes', () => {
      element.className = 'keep-me remove-me';
      removeClass(element, 'remove-me');
      expect(element.classList.contains('keep-me')).toBe(true);
      expect(element.classList.contains('remove-me')).toBe(false);
    });
  });

  describe('toggleClass', () => {
    it('should add class if not present', () => {
      toggleClass(element, 'test-class');
      expect(element.classList.contains('test-class')).toBe(true);
    });

    it('should remove class if present', () => {
      element.className = 'test-class';
      toggleClass(element, 'test-class');
      expect(element.classList.contains('test-class')).toBe(false);
    });

    it('should add class if force is true', () => {
      toggleClass(element, 'test-class', true);
      expect(element.classList.contains('test-class')).toBe(true);

      // Should stay added if already present
      toggleClass(element, 'test-class', true);
      expect(element.classList.contains('test-class')).toBe(true);
    });

    it('should remove class if force is false', () => {
      element.className = 'test-class';
      toggleClass(element, 'test-class', false);
      expect(element.classList.contains('test-class')).toBe(false);

      // Should stay removed if not present
      toggleClass(element, 'test-class', false);
      expect(element.classList.contains('test-class')).toBe(false);
    });
  });
});
