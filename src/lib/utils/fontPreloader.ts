/**
 * Font Preloading Utilities
 *
 * Provides utilities for preloading fonts to improve performance
 * and prevent Flash of Invisible Text (FOIT).
 */

export interface FontPreloadConfig {
  /**
   * Font family name
   */
  family: string;
  /**
   * Font file path (relative to public/assets/fonts or absolute URL)
   */
  path: string;
  /**
   * Font weight
   */
  weight?: string | number;
  /**
   * Font style
   */
  style?: 'normal' | 'italic';
  /**
   * Font format (woff2 is preferred)
   */
  format?: 'woff2' | 'woff';
  /**
   * Cross-origin setting
   */
  crossorigin?: 'anonymous' | 'use-credentials';
}

/**
 * Creates a preload link element for a font
 *
 * @param config - Font preload configuration
 * @returns HTML link element for preloading
 *
 * @example
 * ```tsx
 * const preloadLink = createFontPreloadLink({
 *   family: 'Nunito Sans',
 *   path: '/fonts/nunito-sans/nunito-sans-regular.woff2',
 *   weight: 400
 * });
 * document.head.appendChild(preloadLink);
 * ```
 */
export function createFontPreloadLink(config: FontPreloadConfig): HTMLLinkElement {
  const { path, format = 'woff2', crossorigin = 'anonymous' } = config;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.href = path;
  link.type = `font/${format}`;
  link.crossOrigin = crossorigin;

  return link;
}

/**
 * Preloads multiple fonts
 *
 * @param fonts - Array of font configurations to preload
 * @returns Array of created link elements
 *
 * @example
 * ```tsx
 * const links = preloadFonts([
 *   { family: 'Nunito Sans', path: '/fonts/nunito-sans/nunito-sans-regular.woff2', weight: 400 },
 *   { family: 'Nunito Sans', path: '/fonts/nunito-sans/nunito-sans-bold.woff2', weight: 700 },
 * ]);
 * links.forEach(link => document.head.appendChild(link));
 * ```
 */
export function preloadFonts(fonts: FontPreloadConfig[]): HTMLLinkElement[] {
  return fonts.map(createFontPreloadLink);
}

/**
 * Generates preload link HTML tags as strings
 * Useful for server-side rendering or static HTML generation
 *
 * @param fonts - Array of font configurations
 * @returns Array of HTML string representations
 *
 * @example
 * ```tsx
 * const htmlTags = generateFontPreloadTags([
 *   { family: 'Nunito Sans', path: '/fonts/nunito-sans/nunito-sans-regular.woff2' },
 * ]);
 * // Returns: ['<link rel="preload" as="font" href="/fonts/..." type="font/woff2" crossorigin="anonymous">']
 * ```
 */
export function generateFontPreloadTags(fonts: FontPreloadConfig[]): string[] {
  return fonts.map(config => {
    const { path, format = 'woff2', crossorigin = 'anonymous' } = config;

    return `<link rel="preload" as="font" href="${path}" type="font/${format}" crossorigin="${crossorigin}">`;
  });
}

/**
 * Default font configurations for Atomix Design System
 * These can be used as a starting point for font preloading
 */
export const DEFAULT_ATOMIX_FONTS: FontPreloadConfig[] = [
  {
    family: 'Nunito Sans',
    path: '/fonts/nunito-sans/nunito-sans-regular.woff2',
    weight: 400,
    style: 'normal',
    format: 'woff2',
  },
  {
    family: 'Nunito Sans',
    path: '/fonts/nunito-sans/nunito-sans-bold.woff2',
    weight: 700,
    style: 'normal',
    format: 'woff2',
  },
  {
    family: 'Nunito Sans',
    path: '/fonts/nunito-sans/nunito-sans-italic.woff2',
    weight: 400,
    style: 'italic',
    format: 'woff2',
  },
  {
    family: 'Nunito Sans',
    path: '/fonts/nunito-sans/nunito-sans-bold-italic.woff2',
    weight: 700,
    style: 'italic',
    format: 'woff2',
  },
];
