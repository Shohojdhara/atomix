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
 */
function generateSCSS(tokens: any, prefix = 'atomix-'): string {
    let scss = '// AUTO-GENERATED - DO NOT EDIT MANUALLY\n\n';

    function processTokens(obj: any, currentPrefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            const newPrefix = currentPrefix ? `${currentPrefix}-${toKebabCase(key)}` : toKebabCase(key);

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                processTokens(value, newPrefix);
            } else {
                scss += `$${prefix}${newPrefix}: ${value} !default;\n`;
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

        const tokens = rawConfig.theme?.tokens || {};
        const extend = rawConfig.theme?.extend || {};

        // Merge tokens (simplified for now)
        const finalTokens = { ...tokens, ...extend };

        if (Object.keys(finalTokens).length === 0) {
            console.log('⚠️  No tokens found in configuration. Skipping generation.');
            return;
        }

        const scssContent = generateSCSS(finalTokens);
        const cssContent = generateCSS(finalTokens);

        // Ensure directories exist
        const scssDir = path.join(__dirname, '../src/styles/00-tokens');
        const cssDir = path.join(__dirname, '../src/styles/03-generic');

        await fs.mkdir(scssDir, { recursive: true });
        await fs.mkdir(cssDir, { recursive: true });

        // Write files
        await fs.writeFile(path.join(scssDir, '_generated-tokens.scss'), scssContent);
        await fs.writeFile(path.join(cssDir, '_generated-root.css'), cssContent);

        console.log(`✅ SCSS tokens generated at: ${path.relative(process.cwd(), path.join(scssDir, '_generated-tokens.scss'))}`);
        console.log(`✅ CSS tokens generated at: ${path.relative(process.cwd(), path.join(cssDir, '_generated-root.css'))}`);

    } catch (error: any) {
        console.error('❌ Error generating tokens:', error.message);
        process.exit(1);
    }
}

main();
