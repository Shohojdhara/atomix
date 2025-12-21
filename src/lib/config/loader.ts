/**
 * Atomix Config Loader
 * 
 * Helper functions to load atomix.config.ts from external projects.
 * Similar to how Tailwind loads tailwind.config.js
 */

import type { AtomixConfig } from './index';

/**
 * Load Atomix configuration from project root
 * 
 * Attempts to load atomix.config.ts from the current working directory.
 * Falls back to default config if file doesn't exist.
 * 
 * @param options - Loader options
 * @returns Loaded configuration or default
 * 
 * @example
 * ```typescript
 * import { loadAtomixConfig } from '@shohojdhara/atomix/config';
 * 
 * const config = loadAtomixConfig();
 * const theme = createThemeFromConfig(config);
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
    const { configPath = 'atomix.config.ts', required = false } = options;

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
            throw new Error('Config loading not supported in browser environment');
        }
        return defaultConfig;
    }

    // Try to load config file
    try {
        // Use dynamic import for ESM compatibility
        const configModule = require(configPath);
        const config = configModule.default || configModule;
        
        // Validate it's an AtomixConfig
        if (config && typeof config === 'object') {
            return config as AtomixConfig;
        }
        
        throw new Error('Invalid config format');
    } catch (error: any) {
        if (required) {
            throw new Error(`Failed to load config from ${configPath}: ${error.message}`);
        }
        
        // Return default config if not required
        return defaultConfig;
    }
}

/**
 * Resolve config path
 * 
 * Finds atomix.config.ts in the project, checking common locations.
 */
export function resolveConfigPath(): string | null {
    if (typeof process === 'undefined' || !process.cwd) {
        return null;
    }

    const fs = require('fs');
    const path = require('path');
    
    const cwd = process.cwd();
    const possiblePaths = [
        path.join(cwd, 'atomix.config.ts'),
        path.join(cwd, 'atomix.config.js'),
        path.join(cwd, 'atomix.config.mjs'),
    ];

    for (const configPath of possiblePaths) {
        if (fs.existsSync(configPath)) {
            return configPath;
        }
    }

    return null;
}

export default loadAtomixConfig;

