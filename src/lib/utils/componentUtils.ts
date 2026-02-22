/**
 * Component Utilities
 *
 * Helper functions for component development with the new customization system
 */

import React from 'react';
import type { PartStyleProps } from '../types/partProps';
import { cssVarsToStyle } from '../theme/adapters/cssVariableMapper';

/**
 * Merge multiple class names
 */
export function mergeClassNames(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Apply part styles to element props
 */
export function applyPartStyles<T extends { className?: string; style?: React.CSSProperties }>(
  baseProps: T,
  partStyles?: PartStyleProps
): T {
  if (!partStyles) return baseProps;

  return {
    ...baseProps,
    className: mergeClassNames(baseProps.className, partStyles.className),
    style: { ...baseProps.style, ...partStyles.style },
  };
}

/**
 * Create style object from CSS variables
 */
export function createCSSVarStyle(
  cssVars?: Record<string, string | number>,
  baseStyle?: React.CSSProperties
): React.CSSProperties {
  if (!cssVars) return baseStyle || {};

  const varStyle = cssVarsToStyle(cssVars);
  return { ...varStyle, ...baseStyle };
}

/**
 * Merge component props with customization
 */
export interface MergePropsOptions {
  className?: string;
  style?: React.CSSProperties;
  cssVars?: Record<string, string | number>;
  parts?: Record<string, PartStyleProps>;
}

export function mergeComponentProps<T extends { className?: string; style?: React.CSSProperties }>(
  baseProps: T,
  customization: MergePropsOptions
): T {
  const { className, style, cssVars, parts } = customization;

  // Merge CSS variables into style
  const cssVarStyle = cssVars ? cssVarsToStyle(cssVars) : {};

  return {
    ...baseProps,
    className: mergeClassNames(baseProps.className, className),
    style: {
      ...cssVarStyle,
      ...baseProps.style,
      ...style,
    },
  };
}

/**
 * Get part styles from parts object
 */
export function getPartStyles(
  parts: Record<string, PartStyleProps> | undefined,
  partName: string
): PartStyleProps | undefined {
  return parts?.[partName];
}

/**
 * Create element props with part styles
 */
export function createPartProps<T extends { className?: string; style?: React.CSSProperties }>(
  baseClassName: string,
  partStyles?: PartStyleProps,
  additionalProps?: Partial<T>
): T {
  return {
    ...additionalProps,
    className: mergeClassNames(baseClassName, partStyles?.className),
    style: { ...partStyles?.style, ...(additionalProps as any)?.style },
  } as T;
}

/**
 * Check if component has customization
 */
export function hasCustomization(props: { parts?: any; cssVars?: any; slots?: any }): boolean {
  return Boolean(props.parts || props.cssVars || props.slots);
}

/**
 * Create data attributes for debugging
 */
export function createDebugAttrs(componentName: string, variant?: string): Record<string, string> {
  if (typeof process === 'undefined' || process.env?.NODE_ENV !== 'development') return {};

  return {
    'data-component': componentName,
    ...(variant && { 'data-variant': variant }),
  };
}

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Check if a URL is a YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
}

/**
 * Extract YouTube video ID from URL
 */
export function extractYouTubeId(url: string): string | null {
  if (!isYouTubeUrl(url)) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
