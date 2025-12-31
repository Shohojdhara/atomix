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
            throw new Error('loadAtomixConfig: Not available in browser environment. Config loading requires Node.js/SSR environment.');
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
 * Returns null in browser environments where file system access is not available.
 * 
 * This function is designed to work in Node.js environments only.
 * In browser builds, it will always return null without attempting to access Node.js modules.
 * 
 * @internal This function uses Node.js modules and should not be called in browser environments.
 */
export function resolveConfigPath(): string | null {
    // Early return for browser environments - prevents any Node.js module access
    // This check happens before any require() calls, preventing bundlers from analyzing them
    if (typeof window !== 'undefined' || typeof process === 'undefined' || !process.cwd) {
        return null;
    }

    // Only attempt to load Node.js modules in Node.js runtime
    // Use a lazy-loading pattern that prevents static analysis by bundlers
    try {
        // Create a function that only executes in Node.js runtime
        // Use string-based module names to prevent static analysis by bundlers
        const loadNodeModules = () => {
            // These requires are only executed at runtime in Node.js environments
            // They are marked as external in Rollup config and should not be bundled
            // Using string concatenation and computed property access to prevent static analysis
            if (typeof require === 'undefined') {
                return null;
            }
            
            // Use a try-catch wrapper to safely access require
            try {
                // Build module names dynamically to prevent static analysis
                const moduleNames: [string, string] = ['f' + 's', 'p' + 'a' + 't' + 'h'];
                // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
                const fs = require(moduleNames[0]);
                // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
                const path = require(moduleNames[1]);
                return { fs, path };
            } catch {
                return null;
            }
        };

        const modules = loadNodeModules();
        if (!modules) {
            return null;
        }

        const { fs, path } = modules;
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
    } catch (error) {
        // Silently fail in browser environments or when modules are unavailable
        return null;
    }

    return null;
}

export default loadAtomixConfig;