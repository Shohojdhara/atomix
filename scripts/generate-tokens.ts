#!/usr/bin/env node

/**
 * Token Generator for Atomix
 * 
 * This script loads atomix.config.ts and generates SCSS and CSS tokens.
 * It provides a Tailwind-like experience by allowing central token configuration.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loadThemeConfig } from '../src/lib/theme/config/loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Convert a key to kebab-case
 */
function toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate SCSS variables from tokens
 * 
 * Generates SCSS variables that can override base settings.
 * Uses !default flag so they only apply if not already defined.
 * 
 * Maps atomix.config.ts structure to actual SCSS variable names used in the system.
 * Example: colors.primary.main -> $primary-6 (main color is typically step 6)
 */
function generateSCSS(tokens: any, prefix = 'atomix-'): string {
    let scss = '// AUTO-GENERATED - DO NOT EDIT MANUALLY\n';
    scss += '// Generated from atomix.config.ts\n';
    scss += '// These tokens can override base SCSS variables when defined in config\n\n';

    // Map common token paths to SCSS variable names
    const tokenMappings: Record<string, string> = {
        // Color mappings
        'colors-primary-main': 'primary-6',
        'colors-primary-light': 'primary-3',
        'colors-primary-dark': 'primary-9',
        'colors-secondary-main': 'secondary-6',
        'colors-error-main': 'red-6',
        'colors-success-main': 'green-6',
        'colors-warning-main': 'yellow-6',
        'colors-info-main': 'blue-6',
    };

    function mapTokenToSCSSVar(key: string, value: any): string {
        // Check if we have a direct mapping
        const normalizedKey = key.toLowerCase().replace(/_/g, '-');
        if (tokenMappings[normalizedKey]) {
            return `$${tokenMappings[normalizedKey]}: ${value} !default;\n`;
        }

        // For other tokens, use the prefix pattern
        return `$${prefix}${normalizedKey}: ${value} !default;\n`;
    }

    function processTokens(obj: any, currentPrefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            const newPrefix = currentPrefix ? `${currentPrefix}-${toKebabCase(key)}` : toKebabCase(key);

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // Handle color scale objects (1-10)
                if (key === 'primary' || key === 'secondary' || key === 'red' || key === 'green' || key === 'blue' || key === 'yellow' || key === 'gray') {
                    const colorValue = value as Record<string | number, any>;
                    // Generate color scale variables (primary-1 through primary-10)
                    for (let i = 1; i <= 10; i++) {
                        if (colorValue[i]) {
                            scss += `$${key}-${i}: ${colorValue[i]} !default;\n`;
                        }
                    }
                    // Also handle main/light/dark if present
                    if (typeof colorValue.main === 'string') {
                        scss += `$${key}-6: ${colorValue.main} !default; // main maps to step 6\n`;
                    }
                    if (typeof colorValue.light === 'string') {
                        scss += `$${key}-3: ${colorValue.light} !default; // light maps to step 3\n`;
                    }
                    if (typeof colorValue.dark === 'string') {
                        scss += `$${key}-9: ${colorValue.dark} !default; // dark maps to step 9\n`;
                    }
                } else {
                    // Recursively process nested objects
                    processTokens(value, newPrefix);
                }
            } else if (typeof value === 'string' || typeof value === 'number') {
                // Use mapping function for better variable names
                scss += mapTokenToSCSSVar(newPrefix, value);
            }
        }
    }

    processTokens(tokens);
    return scss;
}

/**
 * Generate CSS variables from tokens
 */
function generateCSS(tokens: any, prefix = 'atomix-'): string {
    let css = '/* AUTO-GENERATED - DO NOT EDIT MANUALLY */\n\n:root {\n';

    function processTokens(obj: any, currentPrefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            const newPrefix = currentPrefix ? `${currentPrefix}-${toKebabCase(key)}` : toKebabCase(key);

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                processTokens(value, newPrefix);
            } else {
                css += `  --${prefix}${newPrefix}: ${value};\n`;
            }
        }
    }

    processTokens(tokens);
    css += '}\n';
    return css;
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Generating Atomix design tokens...');

    try {
        const configPath = path.resolve(process.cwd(), 'atomix.config.ts');

        // In ESM Node environments, use dynamic import
        // We add a cache buster and convert to file URL for broad compatibility
        const configUrl = `file://${configPath}?update=${Date.now()}`;

        console.log(`📖 Loading configuration from: ${configPath}`);
        const configModule = await import(configUrl);
        const rawConfig = configModule.default || configModule;

        // Get prefix from config (default: 'atomix')
        const prefix = rawConfig.prefix || 'atomix';
        const prefixWithDash = prefix.endsWith('-') ? prefix : `${prefix}-`;

        const tokens = rawConfig.theme?.tokens || {};
        const extend = rawConfig.theme?.extend || {};

        // Merge tokens (simplified for now)
        const finalTokens = { ...tokens, ...extend };

        // Define directories first (before using them)
        const scssDir = path.join(__dirname, '../src/styles/00-tokens');
        const cssDir = path.join(__dirname, '../src/styles/03-generic');

        // NOTE: We no longer generate _settings.config.scss from atomix.config.ts
        // The SCSS build should work independently with its own default prefix.
        // If you want to override the prefix, edit _settings.config.scss directly.
        // This keeps SCSS builds independent of the TypeScript config.

        const scssContent = generateSCSS(finalTokens, prefixWithDash);
        const cssContent = generateCSS(finalTokens, prefixWithDash);

        // Ensure directories exist
        await fs.mkdir(scssDir, { recursive: true });
        await fs.mkdir(cssDir, { recursive: true });

        // Write files
        await fs.writeFile(path.join(scssDir, '_generated-tokens.scss'), scssContent);
        await fs.writeFile(path.join(cssDir, '_generated-root.css'), cssContent);

        console.log(`✅ SCSS tokens generated at: ${path.relative(process.cwd(), path.join(scssDir, '_generated-tokens.scss'))}`);
        console.log(`✅ CSS tokens generated at: ${path.relative(process.cwd(), path.join(cssDir, '_generated-root.css'))}`);
        console.log(`   Using prefix: ${prefixWithDash}`);
        console.log(`   Note: SCSS builds work independently - tokens are optional overrides`);

    } catch (error: any) {
        console.error('❌ Error generating tokens:', error.message);
        process.exit(1);
    }
}

main();
