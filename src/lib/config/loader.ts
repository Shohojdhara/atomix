/**
 * Atomix Config Loader
 * 
 * Helper functions to load atomix.config.ts from external projects.
 * Now also supports atomix.config.js and atomix.config.json
 */

import type { AtomixConfig } from './types';

/**
 * Validate Atomix configuration structure
 * 
 * Performs basic validation to catch common configuration errors early.
 * Returns warnings for potential issues.
 * 
 * @param config - Configuration object to validate
 * @returns Array of validation warnings (empty if valid)
 * 
 * @example
 * ```typescript
 * import { loadAtomixConfig, validateConfig } from '@shohojdhara/atomix/config';
 * 
 * const config = loadAtomixConfig();
 * const warnings = validateConfig(config);
 * warnings.forEach(w => console.warn(w));
 * ```
 */
export function validateConfig(config: AtomixConfig): string[] {
    const warnings: string[] = [];

    // Check prefix format
    if (config.prefix) {
        if (!/^[a-zA-Z][a-zA-Z0-9-]*$/.test(config.prefix)) {
            warnings.push(
                `Invalid prefix "${config.prefix}". Prefix should start with a letter and contain only letters, numbers, and hyphens.\n` +
                'Example: "myapp", "brand-ui", "enterprise"'
            );
        }
        
        if (config.prefix.length < 2) {
            warnings.push(
                `Prefix "${config.prefix}" is too short. Use at least 2 characters for clarity.\n` +
                'Example: "app" instead of "a"'
            );
        }
    }

    // Check theme structure
    if (config.theme) {
        // Warn if both extend and tokens are provided
        if (config.theme.extend && config.theme.tokens) {
            warnings.push(
                'Both theme.extend and theme.tokens are defined. theme.tokens will take precedence and completely replace the default token system.\n' +
                'If you want to extend defaults, remove theme.tokens and use only theme.extend.'
            );
        }

        // Check extend structure
        if (config.theme.extend) {
            const extend = config.theme.extend;

            // Check for common typos in theme properties
            const validThemeKeys = [
                'colors', 'typography', 'spacing', 'borderRadius', 
                'shadows', 'zIndex', 'transitions', 'breakpoints'
            ];
            
            Object.keys(extend).forEach(key => {
                if (!validThemeKeys.includes(key)) {
                    warnings.push(
                        `Unknown theme property: "${key}"\n` +
                        `Valid properties: ${validThemeKeys.join(', ')}\n` +
                        'Did you mean one of these? Check for typos.'
                    );
                }
            });
        }
    }

    // Validate advanced features
    if (config.interactiveEffects) {
        const ie = config.interactiveEffects;
        
        // Validate vortex settings
        if (ie.vortex) {
            if (ie.vortex.strength && (ie.vortex.strength < 0 || ie.vortex.strength > 10)) {
                warnings.push('Vortex strength should be between 0 and 10 for optimal performance');
            }
            if (ie.vortex.radius && ie.vortex.radius < 0) {
                warnings.push('Vortex radius should be a positive number');
            }
            if (ie.vortex.decay && (ie.vortex.decay <= 0 || ie.vortex.decay > 1)) {
                warnings.push('Vortex decay should be between 0 and 1');
            }
        }
        
        // Validate chromatic aberration settings
        if (ie.chromaticAberration) {
            if (ie.chromaticAberration.redShift && Math.abs(ie.chromaticAberration.redShift) > 0.1) {
                warnings.push('Chromatic red shift value seems unusually high (>0.1), verify this is intended');
            }
            if (ie.chromaticAberration.blueShift && Math.abs(ie.chromaticAberration.blueShift) > 0.1) {
                warnings.push('Chromatic blue shift value seems unusually high (>0.1), verify this is intended');
            }
            if (ie.chromaticAberration.edgeThreshold && (ie.chromaticAberration.edgeThreshold < 0 || ie.chromaticAberration.edgeThreshold > 1)) {
                warnings.push('Chromatic edge threshold should be between 0 and 1');
            }
        }
        
        // Validate mouse interaction settings
        if (ie.mouseInteraction) {
            if (ie.mouseInteraction.sensitivity && ie.mouseInteraction.sensitivity < 0) {
                warnings.push('Mouse sensitivity should be a positive number');
            }
        }
        
        // Validate animation speed settings
        if (ie.animationSpeed) {
            if (ie.animationSpeed.base && ie.animationSpeed.base <= 0) {
                warnings.push('Animation base speed should be greater than 0');
            }
            if (ie.animationSpeed.timeMultiplier && ie.animationSpeed.timeMultiplier <= 0) {
                warnings.push('Animation time multiplier should be greater than 0');
            }
        }
    }
    
    // Validate optimization settings
    if (config.optimization) {
        const opt = config.optimization;
        
        // Validate responsive breakpoints
        if (opt.responsive && opt.responsive.breakpoints) {
            const breakpoints = opt.responsive.breakpoints;
            if (breakpoints.mobile && !isValidCSSLength(breakpoints.mobile)) {
                warnings.push('Mobile breakpoint value is not a valid CSS length');
            }
            if (breakpoints.tablet && !isValidCSSLength(breakpoints.tablet)) {
                warnings.push('Tablet breakpoint value is not a valid CSS length');
            }
            if (breakpoints.desktop && !isValidCSSLength(breakpoints.desktop)) {
                warnings.push('Desktop breakpoint value is not a valid CSS length');
            }
            if (breakpoints.wide && !isValidCSSLength(breakpoints.wide)) {
                warnings.push('Wide breakpoint value is not a valid CSS length');
            }
        }
        
        // Validate device scaling
        if (opt.responsive && opt.responsive.deviceScaling) {
            const scaling = opt.responsive.deviceScaling;
            if (scaling.mobile && (scaling.mobile <= 0 || scaling.mobile > 1)) {
                warnings.push('Mobile device scaling should be between 0 and 1');
            }
            if (scaling.tablet && (scaling.tablet <= 0 || scaling.tablet > 1)) {
                warnings.push('Tablet device scaling should be between 0 and 1');
            }
            if (scaling.desktop && (scaling.desktop <= 0 || scaling.desktop > 1)) {
                warnings.push('Desktop device scaling should be between 0 and 1');
            }
        }
        
        // Validate performance settings
        if (opt.performance) {
            if (opt.performance.fpsTarget && (opt.performance.fpsTarget <= 0 || opt.performance.fpsTarget > 240)) {
                warnings.push('FPS target should be a reasonable value (typically 30-120)');
            }
        }
        
        // Validate auto-scaling thresholds
        if (opt.autoScaling && opt.autoScaling.qualityThresholds) {
            const thresholds = opt.autoScaling.qualityThresholds;
            if (thresholds.lowEnd && (thresholds.lowEnd < 0 || thresholds.lowEnd > 1)) {
                warnings.push('Auto-scaling low-end threshold should be between 0 and 1');
            }
            if (thresholds.midRange && (thresholds.midRange < 0 || thresholds.midRange > 1)) {
                warnings.push('Auto-scaling mid-range threshold should be between 0 and 1');
            }
            if (thresholds.highEnd && (thresholds.highEnd < 0 || thresholds.highEnd > 1)) {
                warnings.push('Auto-scaling high-end threshold should be between 0 and 1');
            }
        }
    }
    
    // Validate visual polish settings
    if (config.visualPolish) {
        const vp = config.visualPolish;
        
        // Validate content aware blur settings
        if (vp.contentAwareBlur) {
            if (vp.contentAwareBlur.edgePreservation !== undefined && typeof vp.contentAwareBlur.edgePreservation !== 'boolean') {
                warnings.push('Content-aware blur edge preservation should be a boolean value');
            }
            if (vp.contentAwareBlur.depthDetection !== undefined && typeof vp.contentAwareBlur.depthDetection !== 'boolean') {
                warnings.push('Content-aware blur depth detection should be a boolean value');
            }
        }
        
        // Validate holographic effects settings
        if (vp.holographicEffects) {
            if (vp.holographicEffects.enabled !== undefined && typeof vp.holographicEffects.enabled !== 'boolean') {
                warnings.push('Holographic effects enabled should be a boolean value');
            }
            if (vp.holographicEffects.rainbowDiffraction !== undefined && typeof vp.holographicEffects.rainbowDiffraction !== 'boolean') {
                warnings.push('Holographic rainbow diffraction should be a boolean value');
            }
        }
    }

    // Validate AI settings
    if (config.ai) {
        if (config.ai.provider && !['openai', 'anthropic'].includes(config.ai.provider)) {
            warnings.push(`Unknown AI provider: "${config.ai.provider}". Supported: openai, anthropic`);
        }
        if (config.ai.temperature && (config.ai.temperature < 0 || config.ai.temperature > 1)) {
            warnings.push('AI temperature should be between 0 and 1');
        }
        if (config.ai.maxTokens && config.ai.maxTokens < 100) {
            warnings.push('AI maxTokens should typically be 100 or more');
        }
        if (config.ai.rateLimit) {
            if (config.ai.rateLimit.requests <= 0) {
                warnings.push('AI rate limit requests should be greater than 0');
            }
            if (config.ai.rateLimit.windowMs <= 0) {
                warnings.push('AI rate limit window should be greater than 0');
            }
        }
    }

    // Validate telemetry settings
    if (config.telemetry) {
        if (config.telemetry.path && !config.telemetry.path.endsWith('.json')) {
            warnings.push('Telemetry path should typically end with .json');
        }
    }

    return warnings;
}

/**
 * Helper function to validate CSS length values
 */
function isValidCSSLength(value: string): boolean {
    // Basic validation for CSS length values
    const cssLengthRegex = /^(\d+(\.\d+)?)(px|em|rem|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc|ex|ch)?$/;
    return cssLengthRegex.test(value);
}

/**
 * Load Atomix configuration from project root
 * 
 * Attempts to load atomix.config.ts, atomix.config.js, or atomix.config.json from the current working directory.
 * Falls back to default config if file doesn't exist.
 * 
 * @param options - Loader options
 * @returns Loaded configuration or default
 * 
 * @example
 * ```typescript
 * import { loadAtomixConfig } from '@shohojdhara/atomix/config';
 * import { createTheme } from '@shohojdhara/atomix/theme';
 * 
 * const config = loadAtomixConfig();
 * const theme = createTheme(config.theme?.tokens || {});
 * ```
 */
export function loadAtomixConfig(
    options: {
        /** Custom config path (default: 'atomix.config.ts') */
        configPath?: string;
        /** Whether to throw error if config not found (default: false) */
        required?: boolean;
    } = {}
): AtomixConfig {
    const { configPath, required = false } = options;

    // Default config
    const defaultConfig: AtomixConfig = {
        prefix: 'atomix',
        theme: {
            extend: {},
        },
    };

    // In browser environments, config loading is not supported
    if (typeof window !== 'undefined') {
        if (required) {
            throw new Error(
                'Config loading requires Node.js file system access.\n' +
                '\n' +
                'Solutions:\n' +
                '1. Provide tokens explicitly to createTheme():\n' +
                '   const css = createTheme({ "--brand-primary": "#6366f1" });\n' +
                '\n' +
                '2. Use SSR framework (Next.js, Remix, Astro)\n' +
                '\n' +
                '3. Load config on server and pass to client\n' +
                '\n' +
                'See examples/config-examples/browser-only.config.ts'
            );
        }
        return defaultConfig;
    }

    // If a specific config path is provided, try to load it directly
    if (configPath) {
        return loadConfigAtPath(configPath, required, defaultConfig);
    }

    // Otherwise, try standard locations in order of preference
    const possiblePaths = [
        'atomix.config.ts',
        'atomix.config.js',
        'atomix.config.json'
    ];

    for (const path of possiblePaths) {
        const config = loadConfigAtPath(path, false, defaultConfig);
        // If we found a valid config, return it
        if (JSON.stringify(config) !== JSON.stringify(defaultConfig)) {
            return config;
        }
    }

    // If no config file was found or all contained only defaults, return default config
    if (required) {
        throw new Error(
            `No Atomix configuration file found in project root.\n` +
            '\n' +
            'Expected one of:\n' +
            '  - atomix.config.ts (recommended)\n' +
            '  - atomix.config.js\n' +
            '  - atomix.config.json\n' +
            '\n' +
            'Quick Fix:\n' +
            '1. Create a config file in your project root:\n' +
            '   touch atomix.config.ts\n' +
            '\n' +
            '2. Add basic configuration:\n' +
            '   import { defineConfig } from "@shohojdhara/atomix/config";\n' +
            '   export default defineConfig({ prefix: "myapp" });\n' +
            '\n' +
            '3. Or copy an example:\n' +
            '   cp node_modules/@shohojdhara/atomix/examples/config-examples/standard.config.ts ./atomix.config.ts'
        );
    }
    
    return defaultConfig;
}

/**
 * Helper function to load config from a specific path
 */
function loadConfigAtPath(path: string, required: boolean, defaultConfig: AtomixConfig): AtomixConfig {
    try {
        // Use dynamic import for ESM compatibility
        const configModule = require(path);
        const config = configModule.default || configModule;
        
        // Validate it's an AtomixConfig
        if (config && typeof config === 'object') {
            return config as AtomixConfig;
        }
        
        throw new Error('Invalid config format');
    } catch (error: any) {
        if (required) {
            throw new Error(`Failed to load config from ${path}: ${error.message}`);
        }
        
        // Return default config if not required
        return defaultConfig;
    }
}

/**
 * Resolve config path
 * 
 * Finds atomix.config.ts in the project, checking common locations.
 * Returns null in browser environments where file system access is not available.
 * 
 * This function is designed to help tools identify if a config exists without loading it.
 * 
 * @param configPath - Optional custom path to check
 * @returns Absolute path to config file or null if not found
 */
export function resolveConfigPath(configPath?: string): string | null {
    // In browser environments, config resolution is not possible
    if (typeof window !== 'undefined') {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { existsSync } = require('fs') as typeof import('fs');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { join } = require('path') as typeof import('path');

    // If a specific config path is provided, check if it exists
    if (configPath) {
        const absPath = join(process.cwd(), configPath);
        if (existsSync(absPath)) {
            return absPath;
        }
        return null;
    }

    // Otherwise, check standard locations
    const possiblePaths = [
        join(process.cwd(), 'atomix.config.ts'),
        join(process.cwd(), 'atomix.config.js'),
        join(process.cwd(), 'atomix.config.json')
    ];

    for (const path of possiblePaths) {
        if (existsSync(path)) {
            return path;
        }
    }

    return null;
}