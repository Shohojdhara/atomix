/**
 * @vitest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useComponentCustomization } from '../useComponentCustomization';

describe('useComponentCustomization', () => {
  describe('CSS Variables', () => {
    it('should merge component cssVars', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {
          cssVars: {
            '--atomix-button-bg': '#FF0000',
            '--atomix-button-border-radius': '20px',
          },
        })
      );

      expect(result.current.cssVars).toEqual({
        '--atomix-button-bg': '#FF0000',
        '--atomix-button-border-radius': '20px',
      });
    });

    it('should handle empty cssVars', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {})
      );

      expect(result.current.cssVars).toEqual({});
    });

    it('should preserve cssVar types', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {
          cssVars: {
            '--atomix-button-padding-x': 16,
            '--atomix-button-border-radius': '20px',
          },
        })
      );

      expect(result.current.cssVars).toEqual({
        '--atomix-button-padding-x': 16,
        '--atomix-button-border-radius': '20px',
      });
    });
  });

  describe('Part Styling', () => {
    it('should merge component parts', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {
          parts: {
            root: {
              className: 'custom-root',
              style: { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
            },
            icon: {
              style: { fontSize: '18px' },
            },
          },
        })
      );

      expect(result.current.parts).toEqual({
        root: {
          className: 'custom-root',
          style: { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
        },
        icon: {
          style: { fontSize: '18px' },
        },
      });
    });

    it('should handle empty parts', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {})
      );

      expect(result.current.parts).toEqual({});
    });
  });

  describe('ClassName and Style', () => {
    it('should merge className', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {
          className: 'custom-button',
        })
      );

      expect(result.current.className).toBe('custom-button');
    });

    it('should merge style', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {
          style: { marginTop: '10px' },
        })
      );

      expect(result.current.style).toEqual({ marginTop: '10px' });
    });

    it('should handle both className and style', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {
          className: 'custom-button',
          style: { marginTop: '10px' },
        })
      );

      expect(result.current.className).toBe('custom-button');
      expect(result.current.style).toEqual({ marginTop: '10px' });
    });
  });

  describe('Combined Customization', () => {
    it('should merge all customization options', () => {
      const { result } = renderHook(() =>
        useComponentCustomization('Button', {
          cssVars: {
            '--atomix-button-bg': '#FF0000',
          },
          parts: {
            root: {
              className: 'custom-root',
            },
          },
          className: 'custom-button',
          style: { marginTop: '10px' },
        })
      );

      expect(result.current.cssVars).toEqual({
        '--atomix-button-bg': '#FF0000',
      });
      expect(result.current.parts).toEqual({
        root: {
          className: 'custom-root',
        },
      });
      expect(result.current.className).toBe('custom-button');
      expect(result.current.style).toEqual({ marginTop: '10px' });
    });
  });
});
