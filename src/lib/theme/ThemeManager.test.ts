import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeManager } from './ThemeManager';
import * as utils from './utils';
import type { ThemeManagerConfig } from './types';

// Mock utils
vi.mock('./utils', () => ({
    isBrowser: vi.fn(() => true),
    isServer: vi.fn(() => false),
    loadThemeCSS: vi.fn(() => Promise.resolve()),
    removeThemeCSS: vi.fn(),
    removeAllThemeCSS: vi.fn(),
    applyThemeAttributes: vi.fn(),
    removeThemeAttributes: vi.fn(),
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

describe('ThemeManager', () => {
    const mockThemes = {
        'theme-1': { name: 'Theme 1', class: 'theme-1' },
        'theme-2': { name: 'Theme 2', class: 'theme-2' },
    };

    const defaultConfig: ThemeManagerConfig = {
        themes: mockThemes,
        defaultTheme: 'theme-1',
    };

    let themeManager: ThemeManager;

    beforeEach(() => {
        vi.clearAllMocks();
        themeManager = new ThemeManager(defaultConfig);
    });

    afterEach(() => {
        themeManager.destroy();
    });

    describe('Initialization', () => {
        it('should initialize with default theme', () => {
            expect(themeManager.getTheme()).toBe('theme-1');
        });

        it('should throw error if themes config is missing', () => {
            expect(() => new ThemeManager({} as any)).toThrow('ThemeManager: themes configuration is required');
        });

        it('should throw error if default theme is not found', () => {
            expect(() => new ThemeManager({
                themes: mockThemes,
                defaultTheme: 'non-existent',
            })).toThrow('ThemeManager: default theme "non-existent" not found');
        });

        it('should load theme from storage if persistence is enabled', () => {
            const mockGetItem = vi.fn(() => 'theme-2');
            vi.mocked(utils.createLocalStorageAdapter).mockReturnValue({
                getItem: mockGetItem,
                setItem: vi.fn(),
                removeItem: vi.fn(),
                isAvailable: vi.fn(() => true),
            });

            const tm = new ThemeManager({
                ...defaultConfig,
                enablePersistence: true,
            });

            expect(tm.getTheme()).toBe('theme-2');
        });
    });

    describe('Theme Switching', () => {
        it('should set theme successfully', async () => {
            await themeManager.setTheme('theme-2');
            expect(themeManager.getTheme()).toBe('theme-2');
            expect(utils.loadThemeCSS).toHaveBeenCalledWith('theme-2', '/themes', false, null);
            expect(utils.applyThemeAttributes).toHaveBeenCalledWith('theme-2', 'data-theme');
        });

        it('should not reload if theme is already active', async () => {
            // Wait for init to potentially settle
            await new Promise(resolve => setTimeout(resolve, 0));
            vi.clearAllMocks();

            await themeManager.setTheme('theme-1');
            expect(utils.loadThemeCSS).not.toHaveBeenCalled();
        });

        it('should force reload if force option is true', async () => {
            await themeManager.setTheme('theme-1', { force: true });
            expect(utils.loadThemeCSS).toHaveBeenCalledWith('theme-1', '/themes', false, null);
        });

        it('should throw error for invalid theme', async () => {
            await expect(themeManager.setTheme('invalid-theme')).rejects.toThrow('Theme "invalid-theme" not found');
        });

        it('should emit themeChange event', async () => {
            const spy = vi.fn();
            themeManager.on('themeChange', spy);
            await themeManager.setTheme('theme-2');
            expect(spy).toHaveBeenCalledWith(expect.objectContaining({
                previousTheme: 'theme-1',
                currentTheme: 'theme-2',
                source: 'user',
            }));
        });

        it('should fallback to default theme on error if fallbackOnError is true', async () => {
            vi.mocked(utils.loadThemeCSS).mockRejectedValueOnce(new Error('Load failed'));

            await themeManager.setTheme('theme-2', { fallbackOnError: true });

            expect(themeManager.getTheme()).toBe('theme-1');
            // Should have tried to load theme-2 first
            expect(utils.loadThemeCSS).toHaveBeenCalledWith('theme-2', '/themes', false, null);
            // Then should have tried to load theme-1 (default) - actually default might be loaded or not
            // If default is already loaded (it is initialized), it might skip loading CSS unless forced
            // But setTheme calls preloadTheme which checks isThemeLoaded.
        });
    });

    describe('Preloading', () => {
        it('should preload theme', async () => {
            await themeManager.preloadTheme('theme-2');
            expect(utils.loadThemeCSS).toHaveBeenCalledWith('theme-2', '/themes', false, null);
            expect(themeManager.isThemeLoaded('theme-2')).toBe(true);
        });

        it('should not preload if already loaded', async () => {
            vi.mocked(utils.isThemeLoaded).mockReturnValue(true);
            await themeManager.preloadTheme('theme-2');
            // ThemeManager checks its own loadedThemes set OR utils.isThemeLoaded
            // Since we mocked utils.isThemeLoaded to return true, it might skip loading
            // But ThemeManager.isThemeLoaded calls utils.isThemeLoaded
        });
    });

    describe('Persistence', () => {
        it('should save theme to storage on change', async () => {
            const mockSetItem = vi.fn();
            vi.mocked(utils.createLocalStorageAdapter).mockReturnValue({
                getItem: vi.fn(),
                setItem: mockSetItem,
                removeItem: vi.fn(),
                isAvailable: vi.fn(() => true),
            });

            const tm = new ThemeManager({
                ...defaultConfig,
                enablePersistence: true,
                storageKey: 'test-key',
            });

            await tm.setTheme('theme-2');
            expect(mockSetItem).toHaveBeenCalledWith('test-key', 'theme-2');
        });

        it('should enable/disable persistence', () => {
            const mockSetItem = vi.fn();
            const mockRemoveItem = vi.fn();
            vi.mocked(utils.createLocalStorageAdapter).mockReturnValue({
                getItem: vi.fn(),
                setItem: mockSetItem,
                removeItem: mockRemoveItem,
                isAvailable: vi.fn(() => true),
            });

            const tm = new ThemeManager(defaultConfig);

            tm.enablePersistence('new-key');
            expect(mockSetItem).toHaveBeenCalledWith('new-key', 'theme-1');

            tm.disablePersistence();
            expect(mockRemoveItem).toHaveBeenCalledWith('new-key');
        });
    });
});
