/**
 * Theme System Constants
 * 
 * Centralized constants for the theme system to avoid magic numbers and strings.
 */

/**
 * Default storage key for theme persistence
 */
export const DEFAULT_STORAGE_KEY = 'atomix-theme';

/**
 * Default data attribute name for theme
 */
export const DEFAULT_DATA_ATTRIBUTE = 'data-theme';

/**
 * Default base path for theme CSS files
 */
export const DEFAULT_BASE_PATH = '/themes';

/**
 * Default style ID for injected JS theme CSS
 */
export const DEFAULT_STYLE_ID = 'atomix-js-theme-styles';

/**
 * Default engine cache configuration
 */
export const DEFAULT_ENGINE_CACHE_CONFIG = {
  maxSize: 10,
  ttl: 0, // No expiration by default
} as const;

/**
 * Theme link ID prefix
 */
export const THEME_LINK_ID_PREFIX = 'atomix-theme-';

/**
 * CSS file extensions
 */
export const CSS_EXTENSIONS = {
  expanded: '.css',
  compressed: '.min.css',
} as const;

/**
 * Default Atomix config file path
 */
export const DEFAULT_ATOMIX_CONFIG_PATH = 'atomix.config.ts';

/**
 * Default config file path (relative)
 */
export const DEFAULT_CONFIG_RELATIVE_PATH = '../../../../atomix.config';

/**
 * Validation thresholds
 */
export const VALIDATION_THRESHOLDS = {
  /** Minimum contrast ratio for accessibility (WCAG AA) */
  MIN_CONTRAST_RATIO: 4.5,
  /** Critical contrast ratio threshold (below this is error) */
  CRITICAL_CONTRAST_RATIO: 3.0,
  /** Minimum font size for accessibility (px) */
  MIN_FONT_SIZE: 12,
  /** Maximum transition duration (ms) */
  MAX_TRANSITION_DURATION: 10000,
  /** Maximum z-index value */
  MAX_Z_INDEX: 10000,
  /** Maximum border radius (px) */
  MAX_BORDER_RADIUS: 1000,
  /** Maximum custom property depth */
  MAX_CUSTOM_PROPERTY_DEPTH: 10,
} as const;

/**
 * Default theme metadata
 */
export const DEFAULT_THEME_METADATA = {
  status: 'stable' as const,
  supportsDarkMode: false,
} as const;

/**
 * RTL locales (right-to-left languages)
 */
export const RTL_LOCALES = [
  'ar', // Arabic
  'he', // Hebrew
  'fa', // Persian/Farsi
  'ur', // Urdu
  'yi', // Yiddish
  'ku', // Kurdish
  'sd', // Sindhi
] as const;

/**
 * Default RTL configuration
 */
export const DEFAULT_RTL_CONFIG = {
  enabled: false,
  direction: 'ltr' as const,
  dataAttribute: 'data-direction',
  autoDetect: false,
} as const;

/**
 * Analytics default configuration
 */
export const DEFAULT_ANALYTICS_CONFIG = {
  enabled: true,
  trackPerformance: true,
  trackErrors: true,
  bufferSize: 100,
  flushInterval: 5000, // 5 seconds
} as const;

/**
 * Logger default configuration
 */
export const DEFAULT_LOGGER_CONFIG = {
  level: (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') ? 1 : 2, // WARN in prod, INFO in dev
  enableConsole: true,
} as const;

/**
 * Environment-specific defaults
 */
export const ENV_DEFAULTS = {
  development: {
    useMinified: false,
    lazy: false,
    enableSourceMaps: true,
  },
  production: {
    useMinified: true,
    lazy: true,
    enableSourceMaps: false,
  },
  test: {
    enablePersistence: false,
    preload: [],
  },
} as const;

/**
 * Integration default class names
 */
export const DEFAULT_INTEGRATION_CLASS_NAMES = {
  theme: 'data-theme',
  colorMode: 'data-atomix-color-mode',
} as const;

/**
 * Integration default CSS variables
 */
export const DEFAULT_INTEGRATION_CSS_VARIABLES = {
  colorMode: '--storybook-color-mode',
} as const;

/**
 * Build default output directory
 */
export const DEFAULT_BUILD_OUTPUT_DIR = 'themes';

/**
 * Build default SASS configuration
 */
export const DEFAULT_SASS_CONFIG = {
  style: 'expanded' as const,
  sourceMap: true,
  loadPaths: ['src'] as string[],
};
