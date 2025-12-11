/**
 * Theme Configuration Validator
 * 
 * Validates theme configuration structure and values
 */

import type {
  ThemeConfig,
  ThemeDefinition,
  CSSThemeDefinition,
  JSThemeDefinition,
  ConfigValidationResult,
} from './types';

/**
 * Validate theme configuration
 * 
 * @param config - Configuration to validate
 * @returns Validation result with errors and warnings
 */
export function validateConfig(config: any): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate top-level structure
  if (!config || typeof config !== 'object') {
    errors.push('Configuration must be an object');
    return { valid: false, errors, warnings };
  }

  // Validate themes
  if (!config.themes || typeof config.themes !== 'object') {
    errors.push('Configuration must have a "themes" object');
  } else {
    const themeErrors = validateThemes(config.themes);
    errors.push(...themeErrors.errors);
    warnings.push(...themeErrors.warnings);
  }

  // Validate build config
  if (config.build) {
    const buildErrors = validateBuildConfig(config.build);
    errors.push(...buildErrors.errors);
    warnings.push(...buildErrors.warnings);
  } else {
    warnings.push('No build configuration provided, using defaults');
  }

  // Validate runtime config
  if (config.runtime) {
    const runtimeErrors = validateRuntimeConfig(config.runtime);
    errors.push(...runtimeErrors.errors);
    warnings.push(...runtimeErrors.warnings);
  } else {
    warnings.push('No runtime configuration provided, using defaults');
  }

  // Validate integration config
  if (config.integration) {
    const integrationErrors = validateIntegrationConfig(config.integration);
    errors.push(...integrationErrors.errors);
    warnings.push(...integrationErrors.warnings);
  } else {
    warnings.push('No integration configuration provided, using defaults');
  }

  // Validate dependencies
  if (config.dependencies) {
    const depErrors = validateDependencies(config.dependencies, config.themes || {});
    errors.push(...depErrors.errors);
    warnings.push(...depErrors.warnings);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate themes object
 */
function validateThemes(themes: Record<string, any>): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (Object.keys(themes).length === 0) {
    warnings.push('No themes defined in configuration');
  }

  for (const [themeId, theme] of Object.entries(themes)) {
    // Validate theme ID
    if (!themeId || typeof themeId !== 'string') {
      errors.push(`Invalid theme ID: ${themeId}`);
      continue;
    }

    // Validate theme object
    if (!theme || typeof theme !== 'object') {
      errors.push(`Theme "${themeId}" must be an object`);
      continue;
    }

    // Validate theme type
    if (!theme.type || (theme.type !== 'css' && theme.type !== 'js')) {
      errors.push(`Theme "${themeId}" must have type "css" or "js"`);
      continue;
    }

    // Validate required fields
    if (!theme.name || typeof theme.name !== 'string') {
      errors.push(`Theme "${themeId}" must have a "name" string`);
    }

    // Validate CSS theme
    if (theme.type === 'css') {
      const cssErrors = validateCSSTheme(themeId, theme);
      errors.push(...cssErrors.errors);
      warnings.push(...cssErrors.warnings);
    }

    // Validate JS theme
    if (theme.type === 'js') {
      const jsErrors = validateJSTheme(themeId, theme);
      errors.push(...jsErrors.errors);
      warnings.push(...jsErrors.warnings);
    }

    // Validate metadata
    if (theme.version && !isValidSemver(theme.version)) {
      warnings.push(`Theme "${themeId}" has invalid version format: ${theme.version}`);
    }

    if (theme.status && !['stable', 'beta', 'experimental', 'deprecated'].includes(theme.status)) {
      warnings.push(`Theme "${themeId}" has invalid status: ${theme.status}`);
    }

    // Validate color format
    if (theme.color && !isValidColor(theme.color)) {
      warnings.push(`Theme "${themeId}" has invalid color format: ${theme.color}`);
    }

    // Validate accessibility
    if (theme.a11y) {
      if (theme.a11y.contrastTarget && (theme.a11y.contrastTarget < 1 || theme.a11y.contrastTarget > 21)) {
        warnings.push(`Theme "${themeId}" has invalid contrast target: ${theme.a11y.contrastTarget}`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate CSS theme
 */
function validateCSSTheme(themeId: string, theme: any): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // CSS themes don't require createTheme function
  // But can have optional cssPath

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate JS theme
 */
function validateJSTheme(themeId: string, theme: any): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // JS themes must have createTheme function
  if (!theme.createTheme || typeof theme.createTheme !== 'function') {
    errors.push(`JS theme "${themeId}" must have a "createTheme" function`);
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate build configuration
 */
function validateBuildConfig(build: any): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!build.output || typeof build.output !== 'object') {
    errors.push('Build config must have an "output" object');
  } else {
    if (!build.output.directory || typeof build.output.directory !== 'string') {
      errors.push('Build output must have a "directory" string');
    }
    if (!build.output.formats || typeof build.output.formats !== 'object') {
      errors.push('Build output must have a "formats" object');
    }
  }

  if (!build.sass || typeof build.sass !== 'object') {
    errors.push('Build config must have a "sass" object');
  } else {
    if (build.sass.style && !['expanded', 'compressed', 'compact', 'nested'].includes(build.sass.style)) {
      warnings.push(`Invalid Sass style: ${build.sass.style}`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate runtime configuration
 */
function validateRuntimeConfig(runtime: any): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (runtime.basePath && typeof runtime.basePath !== 'string') {
    errors.push('Runtime basePath must be a string');
  }

  if (runtime.defaultTheme && typeof runtime.defaultTheme !== 'string') {
    errors.push('Runtime defaultTheme must be a string');
  }

  if (runtime.preload && !Array.isArray(runtime.preload)) {
    errors.push('Runtime preload must be an array');
  }

  if (runtime.storageKey && typeof runtime.storageKey !== 'string') {
    errors.push('Runtime storageKey must be a string');
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate integration configuration
 */
function validateIntegrationConfig(integration: any): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!integration.classNames || typeof integration.classNames !== 'object') {
    errors.push('Integration config must have a "classNames" object');
  } else {
    if (!integration.classNames.theme || typeof integration.classNames.theme !== 'string') {
      errors.push('Integration classNames must have a "theme" string');
    }
    if (!integration.classNames.colorMode || typeof integration.classNames.colorMode !== 'string') {
      errors.push('Integration classNames must have a "colorMode" string');
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate dependencies
 */
function validateDependencies(
  dependencies: Record<string, string[]>,
  themes: Record<string, any>
): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [themeId, deps] of Object.entries(dependencies)) {
    // Check if theme exists
    if (!themes[themeId]) {
      warnings.push(`Dependencies defined for non-existent theme: ${themeId}`);
      continue;
    }

    // Validate dependencies array
    if (!Array.isArray(deps)) {
      errors.push(`Dependencies for "${themeId}" must be an array`);
      continue;
    }

    // Check if all dependencies exist
    for (const dep of deps) {
      if (!themes[dep]) {
        errors.push(`Theme "${themeId}" depends on non-existent theme: ${dep}`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Check if string is valid semver
 */
function isValidSemver(version: string): boolean {
  const semverRegex = /^\d+\.\d+\.\d+(-[\w.]+)?(\+[\w.]+)?$/;
  return semverRegex.test(version);
}

/**
 * Check if string is valid color
 */
function isValidColor(color: string): boolean {
  // Hex color
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) {
    return true;
  }
  // RGB/RGBA
  if (/^rgba?\(/.test(color)) {
    return true;
  }
  // HSL/HSLA
  if (/^hsla?\(/.test(color)) {
    return true;
  }
  // Named colors (basic check)
  const namedColors = [
    'black', 'white', 'red', 'green', 'blue', 'yellow', 'cyan', 'magenta',
    'transparent', 'currentColor',
  ];
  if (namedColors.includes(color.toLowerCase())) {
    return true;
  }
  return false;
}
