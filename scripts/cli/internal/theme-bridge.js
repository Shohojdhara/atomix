/**
 * Atomix CLI Theme Bridge Generator
 * Automatically syncs design tokens with theme providers (Tailwind, CSS-in-JS, etc.)
 */

import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { filesystem } from './filesystem.js';
import { tokenProvider } from './tokens/token-provider.js';
import { AtomixCLIError } from '../utils/error.js';
import chalk from 'chalk';

/**
 * Theme provider types supported by Atomix
 */
export const THEME_PROVIDERS = {
  TAILWIND: 'tailwind',
  CSS_IN_JS: 'css-in-js',
  EMOTION: 'emotion',
  STYLED_COMPONENTS: 'styled-components',
  VANILLA_EXTRACT: 'vanilla-extract',
  CSS_VARIABLES: 'css-variables'
};

/**
 * Generates Tailwind theme configuration from design tokens
 * @param {Object} tokens - Design tokens object
 * @returns {string} Tailwind theme configuration
 */
export function generateTailwindTheme(tokens) {
  const themeConfig = [];
  
  // Colors
  if (tokens.colors) {
    themeConfig.push('  colors: {');
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // Handle nested color objects by expanding them
        themeConfig.push(`    ${key}: {`);
        Object.entries(value).forEach(([variant, variantValue]) => {
          themeConfig.push(`      ${variant}: '${variantValue}',`);
        });
        themeConfig.push('    },');
      } else {
        themeConfig.push(`    ${key}: '${value}',`);
      }
    });
    themeConfig.push('  },');
  }
  
  // Spacing
  if (tokens.spacing) {
    themeConfig.push('  spacing: {');
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      themeConfig.push(`    ${key}: '${value}',`);
    });
    themeConfig.push('  },');
  }
  
  // Typography
  if (tokens.typography) {
    if (tokens.typography.fontSize) {
      themeConfig.push('  fontSize: {');
      Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
        const size = typeof value === 'object' ? value.size : value;
        themeConfig.push(`    ${key}: '${size}',`);
      });
      themeConfig.push('  },');
    }
    
    if (tokens.typography.fontFamily) {
      themeConfig.push('  fontFamily: {');
      Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
        themeConfig.push(`    ${key}: [${JSON.stringify(value)}],`);
      });
      themeConfig.push('  },');
    }
  }
  
  // Breakpoints
  if (tokens.breakpoints) {
    themeConfig.push('  screens: {');
    Object.entries(tokens.breakpoints).forEach(([key, value]) => {
      themeConfig.push(`    ${key}: '${value}',`);
    });
    themeConfig.push('  },');
  }
  
  // Shadows
  if (tokens.shadows) {
    themeConfig.push('  boxShadow: {');
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      themeConfig.push(`    ${key}: '${value}',`);
    });
    themeConfig.push('  },');
  }
  
  // Border Radius
  if (tokens.radius) {
    themeConfig.push('  borderRadius: {');
    Object.entries(tokens.radius).forEach(([key, value]) => {
      themeConfig.push(`    ${key}: '${value}',`);
    });
    themeConfig.push('  },');
  }
  
  // Animation
  if (tokens.animation) {
    themeConfig.push('  animation: {');
    Object.entries(tokens.animation).forEach(([key, value]) => {
      if (typeof value === 'string') {
        themeConfig.push(`    ${key}: '${value}',`);
      }
    });
    themeConfig.push('  },');
    
    themeConfig.push('  keyframes: {');
    Object.entries(tokens.animation).forEach(([key, value]) => {
      if (typeof value === 'object' && value.keyframes) {
        themeConfig.push(`    ${key}: ${JSON.stringify(value.keyframes)},`);
      }
    });
    themeConfig.push('  },');
  }
  
  themeConfig.push('}');
  
  return `module.exports = {
  theme: {
${themeConfig.join('\n')}
};
`;
}

/**
 * Generates CSS-in-JS theme object from design tokens
 * @param {Object} tokens - Design tokens object
 * @param {string} provider - CSS-in-JS provider (emotion, styled-components, vanilla-extract)
 * @returns {string} Theme configuration
 */
export function generateCssInJsTheme(tokens, provider = 'emotion') {
  const lines = [];
  
  if (provider === 'vanilla-extract') {
    lines.push("import { createGlobalTheme } from '@vanilla-extract/css';\n");
    lines.push('export const theme = createGlobalTheme(\':root\', {');
  } else {
    lines.push('export const theme = {');
  }
  
  // Colors
  if (tokens.colors) {
    lines.push('  colors: {');
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // Expand nested color objects
        lines.push(`    ${key}: {`);
        Object.entries(value).forEach(([variant, variantValue]) => {
          lines.push(`      ${variant}: '${variantValue}',`);
        });
        lines.push('    },');
      } else {
        lines.push(`    ${key}: '${value}',`);
      }
    });
    lines.push('  },');
  }
  
  // Spacing
  if (tokens.spacing) {
    lines.push('  space: {');
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      lines.push(`    ${key}: '${value}',`);
    });
    lines.push('  },');
  }
  
  // Typography
  if (tokens.typography) {
    lines.push('  fonts: {');
    if (tokens.typography.fontFamily) {
      Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
        lines.push(`    ${key}: '${value}',`);
      });
    }
    lines.push('  },');
    
    if (tokens.typography.fontSize) {
      lines.push('  fontSizes: {');
      Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
        const size = typeof value === 'object' ? value.size : value;
        lines.push(`    ${key}: '${size}',`);
      });
      lines.push('  },');
    }
  }
  
  // Breakpoints
  if (tokens.breakpoints) {
    lines.push('  breakpoints: {');
    Object.entries(tokens.breakpoints).forEach(([key, value]) => {
      lines.push(`    ${key}: '${value}',`);
    });
    lines.push('  },');
  }
  
  // Shadows
  if (tokens.shadows) {
    lines.push('  shadows: {');
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      lines.push(`    ${key}: '${value}',`);
    });
    lines.push('  },');
  }
  
  // Border Radius
  if (tokens.radius) {
    lines.push('  radii: {');
    Object.entries(tokens.radius).forEach(([key, value]) => {
      lines.push(`    ${key}: '${value}',`);
    });
    lines.push('  },');
  }
  
  // Z-index
  if (tokens.zIndex) {
    lines.push('  zIndices: {');
    Object.entries(tokens.zIndex).forEach(([key, value]) => {
      lines.push(`    ${key}: ${value},`);
    });
    lines.push('  },');
  }
  
  lines.push('};');
  
  if (provider === 'vanilla-extract') {
    lines.push('\nexport type Theme = typeof theme;');
  }
  
  return lines.join('\n');
}

/**
 * Generates CSS custom properties from design tokens
 * @param {Object} tokens - Design tokens object
 * @param {Object} options - Generation options
 * @returns {string} CSS custom properties
 */
export function generateCssVariables(tokens, options = {}) {
  const { selector = ':root', prefix = 'atomix' } = options;
  const lines = [`${selector} {`];
  
  // Colors
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // Handle color variants (light/dark mode)
        if (value.base) {
          lines.push(`  --${prefix}-${key}: ${value.base};`);
        }
        if (value.light) {
          lines.push(`  --${prefix}-${key}-light: ${value.light};`);
        }
        if (value.dark) {
          lines.push(`  --${prefix}-${key}-dark: ${value.dark};`);
        }
      } else {
        lines.push(`  --${prefix}-${key}: ${value};`);
      }
    });
  }
  
  // Spacing
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      lines.push(`  --${prefix}-space-${key}: ${value};`);
    });
  }
  
  // Typography
  if (tokens.typography) {
    if (tokens.typography.fontFamily) {
      Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
        lines.push(`  --${prefix}-font-${key}: ${value};`);
      });
    }
    
    if (tokens.typography.fontSize) {
      Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
        const size = typeof value === 'object' ? value.size : value;
        lines.push(`  --${prefix}-text-${key}: ${size};`);
      });
    }
  }
  
  // Breakpoints
  if (tokens.breakpoints) {
    Object.entries(tokens.breakpoints).forEach(([key, value]) => {
      lines.push(`  --${prefix}-breakpoint-${key}: ${value};`);
    });
  }
  
  // Shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      lines.push(`  --${prefix}-shadow-${key}: ${value};`);
    });
  }
  
  // Border Radius
  if (tokens.radius) {
    Object.entries(tokens.radius).forEach(([key, value]) => {
      lines.push(`  --${prefix}-radius-${key}: ${value};`);
    });
  }
  
  // Z-index
  if (tokens.zIndex) {
    Object.entries(tokens.zIndex).forEach(([key, value]) => {
      lines.push(`  --${prefix}-z-${key}: ${value};`);
    });
  }
  
  // Motion
  if (tokens.motion) {
    if (tokens.motion.duration) {
      Object.entries(tokens.motion.duration).forEach(([key, value]) => {
        lines.push(`  --${prefix}-duration-${key}: ${value};`);
      });
    }
    
    if (tokens.motion.easing) {
      Object.entries(tokens.motion.easing).forEach(([key, value]) => {
        lines.push(`  --${prefix}-easing-${key}: ${value};`);
      });
    }
  }
  
  lines.push('}');
  
  return lines.join('\n');
}

/**
 * Syncs design tokens to Tailwind config
 * @param {string} tokenPath - Path to design tokens file
 * @param {string} outputPath - Path to output Tailwind config
 * @param {Object} options - Sync options
 * @returns {Promise<Object>} Result with created files
 */
export async function syncToTailwind(tokenPath, outputPath, options = {}) {
  try {
    const tokens = await tokenProvider.loadTokens(tokenPath);
    const tailwindConfig = generateTailwindTheme(tokens);
    
    await filesystem.writeFile(outputPath, tailwindConfig, 'utf8');
    
    return {
      success: true,
      created: [outputPath],
      tokensSynced: Object.keys(tokens).length
    };
  } catch (error) {
    throw new AtomixCLIError(
      `Failed to sync to Tailwind: ${error.message}`,
      'TAILWIND_SYNC_FAILED',
      [
        'Verify design tokens file exists and is valid',
        'Check output path is writable',
        'Ensure tokens follow expected structure'
      ]
    );
  }
}

/**
 * Syncs design tokens to CSS-in-JS theme
 * @param {string} tokenPath - Path to design tokens file
 * @param {string} outputPath - Path to output theme file
 * @param {string} provider - CSS-in-JS provider
 * @param {Object} options - Sync options
 * @returns {Promise<Object>} Result with created files
 */
export async function syncToCssInJs(tokenPath, outputPath, provider = 'emotion', options = {}) {
  try {
    const tokens = await tokenProvider.loadTokens(tokenPath);
    const themeContent = generateCssInJsTheme(tokens, provider);
    
    await filesystem.writeFile(outputPath, themeContent, 'utf8');
    
    return {
      success: true,
      created: [outputPath],
      tokensSynced: Object.keys(tokens).length,
      provider
    };
  } catch (error) {
    throw new AtomixCLIError(
      `Failed to sync to CSS-in-JS: ${error.message}`,
      'CSS_IN_JS_SYNC_FAILED',
      [
        'Verify design tokens file exists',
        'Check provider is supported (emotion, styled-components, vanilla-extract)',
        'Ensure output directory is writable'
      ]
    );
  }
}

/**
 * Syncs design tokens to CSS variables
 * @param {string} tokenPath - Path to design tokens file
 * @param {string} outputPath - Path to output CSS file
 * @param {Object} options - Sync options
 * @returns {Promise<Object>} Result with created files
 */
export async function syncToCssVariables(tokenPath, outputPath, options = {}) {
  try {
    const tokens = await tokenProvider.loadTokens(tokenPath);
    const cssContent = generateCssVariables(tokens, options);
    
    await filesystem.writeFile(outputPath, cssContent, 'utf8');
    
    return {
      success: true,
      created: [outputPath],
      tokensSynced: Object.keys(tokens).length
    };
  } catch (error) {
    throw new AtomixCLIError(
      `Failed to sync to CSS variables: ${error.message}`,
      'CSS_VARIABLES_SYNC_FAILED',
      [
        'Verify design tokens file exists',
        'Check output path is writable',
        'Ensure tokens have valid values'
      ]
    );
  }
}

/**
 * Creates a complete theme package with all formats
 * @param {string} tokenPath - Path to design tokens file
 * @param {string} outputDir - Output directory for theme files
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} Result with all created files
 */
export async function createThemePackage(tokenPath, outputDir, options = {}) {
  const results = {
    success: true,
    created: [],
    tokensSynced: 0,
    formats: []
  };
  
  try {
    const tokens = await tokenProvider.loadTokens(tokenPath);
    results.tokensSynced = Object.keys(tokens).length;
    
    // Ensure output directory exists
    await filesystem.createDirectory(outputDir);
    
    // Generate Tailwind config
    if (options.formats?.includes('tailwind') || !options.formats) {
      const tailwindPath = join(outputDir, 'tailwind.theme.js');
      const tailwindResult = await syncToTailwind(tokenPath, tailwindPath);
      results.created.push(...tailwindResult.created);
      results.formats.push('tailwind');
    }
    
    // Generate CSS-in-JS theme
    if (options.formats?.includes('css-in-js') || !options.formats) {
      const themePath = join(outputDir, 'theme.ts');
      const themeResult = await syncToCssInJs(tokenPath, themePath, 'emotion');
      results.created.push(...themeResult.created);
      results.formats.push('css-in-js');
    }
    
    // Generate CSS variables
    if (options.formats?.includes('css-variables') || !options.formats) {
      const cssPath = join(outputDir, 'variables.css');
      const cssResult = await syncToCssVariables(tokenPath, cssPath, options);
      results.created.push(...cssResult.created);
      results.formats.push('css-variables');
    }
    
    // Generate TypeScript types
    if (options.typescript !== false) {
      const typesPath = join(outputDir, 'theme.types.ts');
      const typesContent = generateTypeScriptTypes(tokens);
      await filesystem.writeFile(typesPath, typesContent, 'utf8');
      results.created.push(typesPath);
      results.formats.push('typescript');
    }
    
    return results;
  } catch (error) {
    throw new AtomixCLIError(
      `Failed to create theme package: ${error.message}`,
      'THEME_PACKAGE_CREATION_FAILED',
      [
        'Verify design tokens file exists and is valid',
        'Check output directory is writable',
        'Ensure all required dependencies are installed'
      ]
    );
  }
}

/**
 * Generates TypeScript type definitions for theme
 * @param {Object} tokens - Design tokens object
 * @returns {string} TypeScript type definitions
 */
export function generateTypeScriptTypes(tokens) {
  const lines = [
    '/**',
    ' * Atomix Theme Type Definitions',
    ' * Auto-generated from design tokens',
    ' */\n',
    'export interface AtomixTheme {',
  ];
  
  if (tokens.colors) {
    lines.push('  colors: {');
    Object.keys(tokens.colors).forEach(key => {
      lines.push(`    ${key}: string;`);
    });
    lines.push('  };');
  }
  
  if (tokens.spacing) {
    lines.push('  space: {');
    Object.keys(tokens.spacing).forEach(key => {
      lines.push(`    ${key}: string;`);
    });
    lines.push('  };');
  }
  
  if (tokens.typography) {
    lines.push('  fonts: {');
    if (tokens.typography.fontFamily) {
      Object.keys(tokens.typography.fontFamily).forEach(key => {
        lines.push(`    ${key}: string;`);
      });
    }
    lines.push('  };');
    
    lines.push('  fontSizes: {');
    if (tokens.typography.fontSize) {
      Object.keys(tokens.typography.fontSize).forEach(key => {
        lines.push(`    ${key}: string;`);
      });
    }
    lines.push('  };');
  }
  
  if (tokens.breakpoints) {
    lines.push('  breakpoints: {');
    Object.keys(tokens.breakpoints).forEach(key => {
      lines.push(`    ${key}: string;`);
    });
    lines.push('  };');
  }
  
  if (tokens.shadows) {
    lines.push('  shadows: {');
    Object.keys(tokens.shadows).forEach(key => {
      lines.push(`    ${key}: string;`);
    });
    lines.push('  };');
  }
  
  if (tokens.radius) {
    lines.push('  radii: {');
    Object.keys(tokens.radius).forEach(key => {
      lines.push(`    ${key}: string;`);
    });
    lines.push('  };');
  }
  
  if (tokens.zIndex) {
    lines.push('  zIndices: {');
    Object.keys(tokens.zIndex).forEach(key => {
      lines.push(`    ${key}: number;`);
    });
    lines.push('  };');
  }
  
  lines.push('}\n');
  lines.push('export type ThemeColor = keyof AtomixTheme[\'colors\'];');
  lines.push('export type ThemeSpacing = keyof AtomixTheme[\'space\'];');
  lines.push('export type ThemeFontSize = keyof AtomixTheme[\'fontSizes\'];');
  
  return lines.join('\n');
}

/**
 * Validates theme synchronization
 * @param {string} tokenPath - Path to design tokens
 * @param {string} themePath - Path to generated theme
 * @param {string} provider - Theme provider type
 * @returns {Promise<Object>} Validation result
 */
export async function validateThemeSync(tokenPath, themePath, provider) {
  try {
    const tokens = await tokenProvider.loadTokens(tokenPath);
    const themeContent = await filesystem.readFile(themePath, 'utf8');
    
    const issues = [];
    let valid = true;
    
    // Check if all token keys are present in theme
    for (const category of Object.keys(tokens)) {
      const tokenKeys = Object.keys(tokens[category]);
      const missingKeys = tokenKeys.filter(key => !themeContent.includes(key));
      
      if (missingKeys.length > 0) {
        valid = false;
        issues.push({
          severity: 'warning',
          message: `Missing tokens in theme: ${missingKeys.join(', ')}`,
          category
        });
      }
    }
    
    // Provider-specific validation
    if (provider === 'tailwind') {
      if (!themeContent.includes('module.exports')) {
        valid = false;
        issues.push({
          severity: 'error',
          message: 'Tailwind config must use CommonJS exports'
        });
      }
    }
    
    if (provider === 'css-variables') {
      if (!themeContent.includes(':root')) {
        valid = false;
        issues.push({
          severity: 'error',
          message: 'CSS variables must be defined in :root selector'
        });
      }
    }
    
    return {
      valid,
      issues,
      tokensChecked: Object.keys(tokens).length
    };
  } catch (error) {
    return {
      valid: false,
      issues: [{
        severity: 'error',
        message: `Validation failed: ${error.message}`
      }]
    };
  }
}
