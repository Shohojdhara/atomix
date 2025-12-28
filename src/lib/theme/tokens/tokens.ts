/**
 * Design Tokens
 * 
 * Simple flat structure for design tokens.
 * All tokens match the actual CSS variables used in Atomix.
 * Based on docs/tokes-list.md
 */

/**
 * Design tokens interface
 * 
 * Flat structure - no nesting complexity.
 * Keys use kebab-case format matching CSS variable names (without --atomix- prefix).
 */
export interface DesignTokens {
  // ============================================================================
  // Colors - Base
  // ============================================================================
  'primary': string;
  'secondary': string;
  'success': string;
  'info': string;
  'warning': string;
  'error': string;
  'light': string;
  'dark': string;

  // RGB versions
  'primary-rgb': string;
  'secondary-rgb': string;
  'success-rgb': string;
  'info-rgb': string;
  'warning-rgb': string;
  'error-rgb': string;
  'light-rgb': string;
  'dark-rgb': string;

  // ============================================================================
  // Colors - Gray Scale
  // ============================================================================
  'gray-1': string;
  'gray-2': string;
  'gray-3': string;
  'gray-4': string;
  'gray-5': string;
  'gray-6': string;
  'gray-7': string;
  'gray-8': string;
  'gray-9': string;
  'gray-10': string;

  // ============================================================================
  // Colors - Primary Scale
  // ============================================================================
  'primary-1': string;
  'primary-2': string;
  'primary-3': string;
  'primary-4': string;
  'primary-5': string;
  'primary-6': string;
  'primary-7': string;
  'primary-8': string;
  'primary-9': string;
  'primary-10': string;

  // ============================================================================
  // Colors - Red Scale
  // ============================================================================
  'red-1': string;
  'red-2': string;
  'red-3': string;
  'red-4': string;
  'red-5': string;
  'red-6': string;
  'red-7': string;
  'red-8': string;
  'red-9': string;
  'red-10': string;

  // ============================================================================
  // Colors - Green Scale
  // ============================================================================
  'green-1': string;
  'green-2': string;
  'green-3': string;
  'green-4': string;
  'green-5': string;
  'green-6': string;
  'green-7': string;
  'green-8': string;
  'green-9': string;
  'green-10': string;

  // ============================================================================
  // Colors - Blue Scale
  // ============================================================================
  'blue-1': string;
  'blue-2': string;
  'blue-3': string;
  'blue-4': string;
  'blue-5': string;
  'blue-6': string;
  'blue-7': string;
  'blue-8': string;
  'blue-9': string;
  'blue-10': string;

  // ============================================================================
  // Colors - Yellow Scale
  // ============================================================================
  'yellow-1': string;
  'yellow-2': string;
  'yellow-3': string;
  'yellow-4': string;
  'yellow-5': string;
  'yellow-6': string;
  'yellow-7': string;
  'yellow-8': string;
  'yellow-9': string;
  'yellow-10': string;

  // ============================================================================
  // Colors - Text Emphasis
  // ============================================================================
  'primary-text-emphasis': string;
  'secondary-text-emphasis': string;
  'tertiary-text-emphasis': string;
  'disabled-text-emphasis': string;
  'invert-text-emphasis': string;
  'brand-text-emphasis': string;
  'error-text-emphasis': string;
  'success-text-emphasis': string;
  'warning-text-emphasis': string;
  'info-text-emphasis': string;
  'light-text-emphasis': string;
  'dark-text-emphasis': string;

  // ============================================================================
  // Colors - Background Subtle
  // ============================================================================
  'primary-bg-subtle': string;
  'secondary-bg-subtle': string;
  'tertiary-bg-subtle': string;
  'invert-bg-subtle': string;
  'brand-bg-subtle': string;
  'error-bg-subtle': string;
  'success-bg-subtle': string;
  'warning-bg-subtle': string;
  'info-bg-subtle': string;
  'light-bg-subtle': string;
  'dark-bg-subtle': string;

  // ============================================================================
  // Colors - Border Subtle
  // ============================================================================
  'primary-border-subtle': string;
  'secondary-border-subtle': string;
  'success-border-subtle': string;
  'error-border-subtle': string;
  'warning-border-subtle': string;
  'info-border-subtle': string;
  'brand-border-subtle': string;
  'light-border-subtle': string;
  'dark-border-subtle': string;

  // ============================================================================
  // Colors - Hover States
  // ============================================================================
  'primary-hover': string;
  'secondary-hover': string;
  'light-hover': string;
  'dark-hover': string;
  'error-hover': string;
  'success-hover': string;
  'warning-hover': string;
  'info-hover': string;

  // ============================================================================
  // Colors - Gradients
  // ============================================================================
  'primary-gradient': string;
  'secondary-gradient': string;
  'light-gradient': string;
  'dark-gradient': string;
  'success-gradient': string;
  'info-gradient': string;
  'warning-gradient': string;
  'error-gradient': string;
  'gradient': string;

  // ============================================================================
  // Typography - Fonts
  // ============================================================================
  'font-sans-serif': string;
  'font-monospace': string;
  'body-font-family': string;
  'body-font-size': string;
  'body-font-weight': string;
  'body-line-height': string;
  'body-color': string;
  'body-bg': string;
  'heading-color': string;

  // ============================================================================
  // Typography - Font Sizes
  // ============================================================================
  'font-size-xl': string;
  'font-size-2xl': string;
  'display-1': string;

  // ============================================================================
  // Typography - Font Weights
  // ============================================================================
  'font-weight-light': string;
  'font-weight-normal': string;
  'font-weight-medium': string;
  'font-weight-semibold': string;
  'font-weight-bold': string;
  'font-weight-heavy': string;
  'font-weight-black': string;

  // ============================================================================
  // Typography - Line Heights
  // ============================================================================
  'line-height-base': string;
  'line-height-sm': string;
  'line-height-lg': string;

  // ============================================================================
  // Typography - Letter Spacing
  // ============================================================================
  'letter-spacing-h1': string;
  'letter-spacing-h2': string;
  'letter-spacing-h3': string;
  'letter-spacing-h4': string;
  'letter-spacing-h5': string;
  'letter-spacing-h6': string;

  // ============================================================================
  // Links
  // ============================================================================
  'link-color': string;
  'link-color-rgb': string;
  'link-decoration': string;
  'link-hover-color': string;
  'link-hover-color-rgb': string;

  // ============================================================================
  // Highlight & Code
  // ============================================================================
  'highlight-bg': string;
  'code-color': string;

  // ============================================================================
  // Borders
  // ============================================================================
  'border-width': string;
  'border-style': string;
  'border-color': string;
  'border-color-translucent': string;
  'border-radius': string;
  'border-radius-sm': string;
  'border-radius-lg': string;
  'border-radius-xl': string;
  'border-radius-xxl': string;
  'border-radius-2xl': string;
  'border-radius-3xl': string;
  'border-radius-4xl': string;
  'border-radius-pill': string;

  // ============================================================================
  // Shadows
  // ============================================================================
  'box-shadow': string;
  'box-shadow-xs': string;
  'box-shadow-sm': string;
  'box-shadow-lg': string;
  'box-shadow-xl': string;
  'box-shadow-inset': string;

  // ============================================================================
  // Focus Ring
  // ============================================================================
  'focus-border-color': string;
  'focus-ring-width': string;
  'focus-ring-offset': string;
  'focus-ring-opacity': string;

  // ============================================================================
  // Form Validation
  // ============================================================================
  'form-valid-color': string;
  'form-valid-border-color': string;
  'form-invalid-color': string;
  'form-invalid-border-color': string;

  // ============================================================================
  // Spacing
  // ============================================================================
  'spacing-0': string;
  'spacing-1': string;
  'spacing-px-6': string;
  'spacing-2': string;
  'spacing-px-10': string;
  'spacing-3': string;
  'spacing-px-14': string;
  'spacing-4': string;
  'spacing-5': string;
  'spacing-px-22': string;
  'spacing-6': string;
  'spacing-7': string;
  'spacing-px-30': string;
  'spacing-8': string;
  'spacing-9': string;
  'spacing-10': string;
  'spacing-11': string;
  'spacing-12': string;
  'spacing-14': string;
  'spacing-16': string;
  'spacing-20': string;
  'spacing-24': string;
  'spacing-28': string;
  'spacing-32': string;
  'spacing-36': string;
  'spacing-40': string;
  'spacing-44': string;
  'spacing-48': string;
  'spacing-52': string;
  'spacing-56': string;
  'spacing-60': string;
  'spacing-64': string;
  'spacing-72': string;
  'spacing-80': string;
  'spacing-90': string;
  'spacing-200': string;

  // ============================================================================
  // Transitions
  // ============================================================================
  'transition-duration-fast': string;
  'transition-duration-base': string;
  'transition-duration-slow': string;
  'transition-duration-slower': string;
  'easing-base': string;
  'easing-ease-in-out': string;
  'easing-ease-out': string;
  'easing-ease-in': string;
  'easing-ease-linear': string;
  'transition-fast': string;
  'transition-base': string;
  'transition-slow': string;

  // ============================================================================
  // Z-Index
  // ============================================================================
  'z-n1': string;
  'z-0': string;
  'z-1': string;
  'z-2': string;
  'z-3': string;
  'z-4': string;
  'z-5': string;
  'z-dropdown': string;
  'z-sticky': string;
  'z-fixed': string;
  'z-modal': string;
  'z-popover': string;
  'z-tooltip': string;
  'z-drawer': string;

  // ============================================================================
  // Breakpoints
  // ============================================================================
  'breakpoint-xs': string;
  'breakpoint-sm': string;
  'breakpoint-md': string;
  'breakpoint-lg': string;
  'breakpoint-xl': string;
  'breakpoint-xxl': string;

  // ============================================================================
  // Custom tokens (allow any additional tokens)
  // ============================================================================
  [key: string]: string | undefined;
}

/**
 * Default design tokens
 * 
 * Based on Atomix default theme values from docs/tokes-list.md (light mode)
 */
export const defaultTokens: DesignTokens = {
  // Colors - Base
  'primary': '#7c3aed',
  'secondary': '#f3f4f6',
  'success': '#22c55e',
  'info': '#3b82f6',
  'warning': '#eab308',
  'error': '#ef4444',
  'light': '#f9fafb',
  'dark': '#1f2937',

  // RGB versions
  'primary-rgb': '124, 58, 237',
  'secondary-rgb': '243, 244, 246',
  'success-rgb': '34, 197, 94',
  'info-rgb': '59, 130, 246',
  'warning-rgb': '234, 179, 8',
  'error-rgb': '239, 68, 68',
  'light-rgb': '249, 250, 251',
  'dark-rgb': '31, 41, 55',

  // Gray Scale
  'gray-1': '#f9fafb',
  'gray-2': '#f3f4f6',
  'gray-3': '#e5e7eb',
  'gray-4': '#d1d5db',
  'gray-5': '#9ca3af',
  'gray-6': '#6b7280',
  'gray-7': '#4b5563',
  'gray-8': '#374151',
  'gray-9': '#1f2937',
  'gray-10': '#111827',

  // Primary Scale
  'primary-1': '#f2e8fd',
  'primary-2': '#e4d0fa',
  'primary-3': '#d0b2f5',
  'primary-4': '#b88cef',
  'primary-5': '#9c63e9',
  'primary-6': '#7c3aed',
  'primary-7': '#6425ca',
  'primary-8': '#501ba6',
  'primary-9': '#3c1583',
  'primary-10': '#2a0e60',

  // Red Scale
  'red-1': '#fef2f2',
  'red-2': '#fee2e2',
  'red-3': '#fecaca',
  'red-4': '#fca5a5',
  'red-5': '#f87171',
  'red-6': '#ef4444',
  'red-7': '#dc2626',
  'red-8': '#b91c1c',
  'red-9': '#991b1b',
  'red-10': '#7f1d1d',

  // Green Scale
  'green-1': '#f0fdf4',
  'green-2': '#dcfce7',
  'green-3': '#bbf7d0',
  'green-4': '#86efac',
  'green-5': '#4ade80',
  'green-6': '#22c55e',
  'green-7': '#16a34a',
  'green-8': '#15803d',
  'green-9': '#166534',
  'green-10': '#14532d',

  // Blue Scale
  'blue-1': '#eff6ff',
  'blue-2': '#dbeafe',
  'blue-3': '#bfdbfe',
  'blue-4': '#93c5fd',
  'blue-5': '#60a5fa',
  'blue-6': '#3b82f6',
  'blue-7': '#2563eb',
  'blue-8': '#1d4ed8',
  'blue-9': '#1e40af',
  'blue-10': '#1e3a8a',

  // Yellow Scale
  'yellow-1': '#fefce8',
  'yellow-2': '#fef9c3',
  'yellow-3': '#fef08a',
  'yellow-4': '#fde047',
  'yellow-5': '#facc15',
  'yellow-6': '#eab308',
  'yellow-7': '#ca8a04',
  'yellow-8': '#a16207',
  'yellow-9': '#854d0e',
  'yellow-10': '#713f12',

  // Text Emphasis
  'primary-text-emphasis': '#111827',
  'secondary-text-emphasis': '#374151',
  'tertiary-text-emphasis': '#6b7280',
  'disabled-text-emphasis': '#9ca3af',
  'invert-text-emphasis': '#111827',
  'brand-text-emphasis': '#7c3aed',
  'error-text-emphasis': '#ef4444',
  'success-text-emphasis': '#22c55e',
  'warning-text-emphasis': '#eab308',
  'info-text-emphasis': '#3b82f6',
  'light-text-emphasis': '#f9fafb',
  'dark-text-emphasis': '#1f2937',

  // Background Subtle
  'primary-bg-subtle': '#ffffff',
  'secondary-bg-subtle': '#e5e7eb',
  'tertiary-bg-subtle': '#d1d5db',
  'invert-bg-subtle': '#111827',
  'brand-bg-subtle': '#e4d0fa',
  'error-bg-subtle': '#fee2e2',
  'success-bg-subtle': '#dcfce7',
  'warning-bg-subtle': '#fef9c3',
  'info-bg-subtle': '#dbeafe',
  'light-bg-subtle': '#f3f4f6',
  'dark-bg-subtle': '#1f2937',

  // Border Subtle
  'primary-border-subtle': '#e5e7eb',
  'secondary-border-subtle': '#111827',
  'success-border-subtle': '#22c55e',
  'error-border-subtle': '#ef4444',
  'warning-border-subtle': '#eab308',
  'info-border-subtle': '#3b82f6',
  'brand-border-subtle': '#7c3aed',
  'light-border-subtle': '#f9fafb',
  'dark-border-subtle': '#1f2937',

  // Hover States
  'primary-hover': '#7c3aed',
  'secondary-hover': '#e5e7eb',
  'light-hover': '#f3f4f6',
  'dark-hover': '#4b5563',
  'error-hover': '#b91c1c',
  'success-hover': '#15803d',
  'warning-hover': '#a16207',
  'info-hover': '#1d4ed8',

  // Gradients
  'primary-gradient': 'linear-gradient(135deg, #e4d0fa, #d0b2f5, #b88cef)',
  'secondary-gradient': 'linear-gradient(135deg, #f3f4f6, #e5e7eb, #d1d5db)',
  'light-gradient': 'linear-gradient(135deg, #f9fafb, #f3f4f6, #e5e7eb)',
  'dark-gradient': 'linear-gradient(135deg, #4b5563, #1f2937, #000000)',
  'success-gradient': 'linear-gradient(135deg, #dcfce7, #86efac, #4ade80)',
  'info-gradient': 'linear-gradient(135deg, #dbeafe, #bfdbfe, #60a5fa)',
  'warning-gradient': 'linear-gradient(135deg, #fef9c3, #fef08a, #facc15)',
  'error-gradient': 'linear-gradient(135deg, #fef2f2, #fee2e2, #fecaca)',
  'gradient': 'linear-gradient(135deg, #f9fafb, #f3f4f6, #e5e7eb)',

  // Typography - Fonts
  'font-sans-serif': '"Roboto", sans-serif',
  'font-monospace': 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  'body-font-family': '"Roboto", sans-serif',
  'body-font-size': '1rem',
  'body-font-weight': '400',
  'body-line-height': '1.2',
  'body-color': '#111827',
  'body-bg': '#ffffff',
  'heading-color': '#111827',

  // Typography - Font Sizes
  'font-size-xl': '1.5rem',
  'font-size-2xl': '2rem',
  'display-1': '4rem',

  // Typography - Font Weights
  'font-weight-light': '300',
  'font-weight-normal': '400',
  'font-weight-medium': '500',
  'font-weight-semibold': '600',
  'font-weight-bold': '700',
  'font-weight-heavy': '800',
  'font-weight-black': '900',

  // Typography - Line Heights
  'line-height-base': '1.2',
  'line-height-sm': '1.43',
  'line-height-lg': '1.56',

  // Typography - Letter Spacing
  'letter-spacing-h1': '-1px',
  'letter-spacing-h2': '-1px',
  'letter-spacing-h3': '-1px',
  'letter-spacing-h4': '-0.5px',
  'letter-spacing-h5': '-0.5px',
  'letter-spacing-h6': '-0.5px',

  // Links
  'link-color': '#7c3aed',
  'link-color-rgb': '124, 58, 237',
  'link-decoration': 'none',
  'link-hover-color': 'rgb(85.3674418605, 18.2930232558, 200.2069767442)',
  'link-hover-color-rgb': '85.3674418605, 18.2930232558, 200.2069767442',

  // Highlight & Code
  'highlight-bg': '#fef08a',
  'code-color': '#f87171',

  // Borders
  'border-width': '1px',
  'border-style': 'solid',
  'border-color': '#e5e7eb',
  'border-color-translucent': 'rgba(229, 231, 235, 0.175)',
  'border-radius': '0.5rem',
  'border-radius-sm': '0.25rem',
  'border-radius-lg': '0.625rem',
  'border-radius-xl': '0.75rem',
  'border-radius-xxl': '1rem',
  'border-radius-2xl': 'var(--atomix-border-radius-xxl)',
  'border-radius-3xl': '1.5rem',
  'border-radius-4xl': '2rem',
  'border-radius-pill': '50rem',

  // Shadows
  'box-shadow': '0 8px 16px rgba(0, 0, 0, 0.15)',
  'box-shadow-xs': '0px 1px 2px 0px rgba(45, 54, 67, 0.04), 0px 2px 4px 0px rgba(45, 54, 67, 0.08)',
  'box-shadow-sm': '0 2px 4px rgba(0, 0, 0, 0.075)',
  'box-shadow-lg': '0 16px 48px rgba(0, 0, 0, 0.175)',
  'box-shadow-xl': '0px 16px 64px -8px rgba(45, 54, 67, 0.14)',
  'box-shadow-inset': 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',

  // Focus Ring
  'focus-border-color': '#9c63e9',
  'focus-ring-width': '3px',
  'focus-ring-offset': '2px',
  'focus-ring-opacity': '0.25',

  // Form Validation
  'form-valid-color': '#22c55e',
  'form-valid-border-color': '#22c55e',
  'form-invalid-color': '#ef4444',
  'form-invalid-border-color': '#ef4444',

  // Spacing
  'spacing-0': '0rem',
  'spacing-1': '0.25rem',
  'spacing-px-6': '0.375rem',
  'spacing-2': '0.5rem',
  'spacing-px-10': '0.625rem',
  'spacing-3': '0.75rem',
  'spacing-px-14': '0.875rem',
  'spacing-4': '1rem',
  'spacing-5': '1.25rem',
  'spacing-px-22': '1.375rem',
  'spacing-6': '1.5rem',
  'spacing-7': '1.75rem',
  'spacing-px-30': '1.875rem',
  'spacing-8': '2rem',
  'spacing-9': '2.25rem',
  'spacing-10': '2.5rem',
  'spacing-11': '2.75rem',
  'spacing-12': '3rem',
  'spacing-14': '3.5rem',
  'spacing-16': '4rem',
  'spacing-20': '5rem',
  'spacing-24': '6rem',
  'spacing-28': '7rem',
  'spacing-32': '8rem',
  'spacing-36': '9rem',
  'spacing-40': '10rem',
  'spacing-44': '11rem',
  'spacing-48': '12rem',
  'spacing-52': '13rem',
  'spacing-56': '14rem',
  'spacing-60': '15rem',
  'spacing-64': '16rem',
  'spacing-72': '18rem',
  'spacing-80': '20rem',
  'spacing-90': '22.5rem',
  'spacing-200': '50rem',

  // Transitions
  'transition-duration-fast': '0.15s',
  'transition-duration-base': '0.3s',
  'transition-duration-slow': '0.5s',
  'transition-duration-slower': '0.7s',
  'easing-base': 'cubic-bezier(0.23, 1, 0.32, 1)',
  'easing-ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'easing-ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'easing-ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'easing-ease-linear': 'linear',
  'transition-fast': 'all 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
  'transition-base': 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
  'transition-slow': 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',

  // Z-Index
  'z-n1': '-1',
  'z-0': '0',
  'z-1': '1',
  'z-2': '2',
  'z-3': '3',
  'z-4': '4',
  'z-5': '5',
  'z-dropdown': '1000',
  'z-sticky': '1020',
  'z-fixed': '1030',
  'z-modal': '1040',
  'z-popover': '1050',
  'z-tooltip': '1060',
  'z-drawer': '1070',

  // Breakpoints
  'breakpoint-xs': '0',
  'breakpoint-sm': '576px',
  'breakpoint-md': '768px',
  'breakpoint-lg': '992px',
  'breakpoint-xl': '1200px',
  'breakpoint-xxl': '1440px',
};

/**
 * Create tokens from defaults and overrides
 * 
 * @param overrides - Partial tokens to override defaults
 * @returns Complete DesignTokens object
 * 
 * @example
 * ```typescript
 * const tokens = createTokens({
 *   'primary': '#7c3aed',
 *   'spacing-4': '1rem',
 * });
 * ```
 */
export function createTokens(overrides?: Partial<DesignTokens>): DesignTokens {
  return { ...defaultTokens, ...overrides };
}
