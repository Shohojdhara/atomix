/**
 * ThemeManager Integration Tests
 * 
 * Verifies integration between ThemeManager and createTheme system
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeManager } from './ThemeManager';
import { createTheme } from './createTheme';
import { generateCSSVariables, injectCSS, removeInjectedCSS } from './generateCSSVariables';
import * as utils from './utils';
import { isJSTheme } from './themeUtils';

// Mock generateCSSVariables module
vi.mock('./generateCSSVariables', () => ({
    generateCSSVariables: vi.fn(() => '--mock-css: 1;'),
    injectCSS: vi.fn(),
    removeInjectedCSS: vi.fn(),
}));

// Mock utils
vi.mock('./utils', () => ({
    isBrowser: vi.fn(() => true),
    isServer: vi.fn(() => false),
    loadThemeCSS: vi.fn(() => Promise.resolve()),
    removeThemeCSS: vi.fn(),
    removeAllThemeCSS: vi.fn(),
    applyThemeAttributes: vi.fn(),
    getCurrentThemeFromDOM: vi.fn(() => null),
    getSystemTheme: vi.fn(() => 'light'),
    isThemeLoaded: vi.fn(() => false),
    validateThemeMetadata: vi.fn(() => ({ valid: true, errors: [], warnings: [] })),
    isValidThemeName: vi.fn(() => true),
    createLocalStorageAdapter: vi.fn(() => ({
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        isAvailable: vi.fn(() => true),
    })),
}));

describe('ThemeManager Integration with JS Themes', () => {
    let themeManager: ThemeManager;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        if (themeManager) {
            themeManager.destroy();
        }
    });

    it('should allow setting a JS theme object directly', async () => {
        themeManager = new ThemeManager({
            defaultTheme: 'dummy',
            themes: { dummy: { name: 'dummy' } },
        });

        const jsTheme = createTheme({
            name: 'custom-js-theme',
            palette: { primary: { main: '#ff0000' } }
        });

        await themeManager.setTheme(jsTheme);

        expect(themeManager.getTheme()).toBe('custom-js-theme');
        expect(themeManager.getActiveTheme()).toBe(jsTheme);
        expect(generateCSSVariables).toHaveBeenCalledWith(jsTheme);
        expect(injectCSS).toHaveBeenCalled();
        expect(utils.applyThemeAttributes).toHaveBeenCalledWith('custom-js-theme', 'data-theme');
    });

    it('should initialize with a JS theme as defaultTheme', () => {
        const jsTheme = createTheme({
            name: 'default-js-theme',
            palette: { primary: { main: '#00ff00' } }
        });

        // Constructor shouldn't throw if defaultTheme is object, even if themes is empty
        themeManager = new ThemeManager({
            themes: {},
            defaultTheme: jsTheme,
        });

        expect(themeManager.getTheme()).toBe('default-js-theme');
        expect(themeManager.getActiveTheme()).toBe(jsTheme);
        // It initializes synchronously
        expect(generateCSSVariables).toHaveBeenCalledWith(jsTheme);
        expect(injectCSS).toHaveBeenCalled();
    });

    it('should switch between JS and CSS themes', async () => {
        const jsTheme = createTheme({ name: 'js-theme' });

        themeManager = new ThemeManager({
            themes: {
                'css-theme': { name: 'CSS Theme' },
            },
            defaultTheme: 'css-theme',
        });

        // Initial state: CSS theme
        expect(themeManager.getTheme()).toBe('css-theme');
        expect(themeManager.getActiveTheme()).toBeNull();

        // Switch to JS theme
        await themeManager.setTheme(jsTheme, { removePrevious: true });

        expect(themeManager.getTheme()).toBe('js-theme');
        expect(themeManager.getActiveTheme()).toBe(jsTheme);
        expect(injectCSS).toHaveBeenCalled();
        expect(utils.removeThemeCSS).toHaveBeenCalledWith('css-theme');

        // Switch back to CSS theme
        await themeManager.setTheme('css-theme', { removePrevious: true });

        expect(themeManager.getTheme()).toBe('css-theme');
        expect(themeManager.getActiveTheme()).toBeNull();
        expect(removeInjectedCSS).toHaveBeenCalled();
        expect(utils.loadThemeCSS).toHaveBeenCalledWith('css-theme', '/themes', false, null);
    });
});
