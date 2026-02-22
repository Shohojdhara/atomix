/**
 * Utility Functions Exports
 */

export {
  mergeClassNames,
  applyPartStyles,
  createCSSVarStyle,
  mergeComponentProps,
  getPartStyles,
  createPartProps,
  hasCustomization,
  createDebugAttrs,
  generateUUID,
  isYouTubeUrl,
  extractYouTubeId,
} from './componentUtils';

export type { MergePropsOptions } from './componentUtils';

export {
  createFontPreloadLink,
  preloadFonts,
  generateFontPreloadTags,
  DEFAULT_ATOMIX_FONTS,
} from './fontPreloader';

export type { FontPreloadConfig } from './fontPreloader';
