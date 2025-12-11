/**
 * Theme Manager Utility Functions
 * 
 * Helper functions for theme operations including CSS loading, DOM manipulation,
 * and theme validation.
 */

import type { ThemeMetadata, ThemeValidationResult } from './types';

/**
 * Check if code is running in a browser environment
 */
export const isBrowser = (): boolean => {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Check if code is running on the server (SSR)
 */
export const isServer = (): boolean => {
    return !isBrowser();
};

/**
 * Generate a unique ID for theme link elements
 */
export const getThemeLinkId = (themeName: string): string => {
    return `atomix-theme-${themeName}`;
};

/**
 * Build the CSS file path for a theme
 * 
 * @param themeName - Name of the theme
 * @param basePath - Base path for theme files
 * @param useMinified - Whether to use minified CSS
 * @param cdnPath - Optional CDN path
 * @returns Full path to the theme CSS file
 */
export const buildThemePath = (
    themeName: string,
    basePath: string = '/themes',
    useMinified: boolean = false,
    cdnPath: string | null = null
): string => {
    // Validate theme name to prevent path injection
    if (!isValidThemeName(themeName)) {
        throw new Error(`Invalid theme name: "${themeName}". Theme names must be lowercase alphanumeric with hyphens.`);
    }

    const extension = useMinified ? '.min.css' : '.css';
    const fileName = `${themeName}${extension}`;

    if (cdnPath) {
        // Validate CDN path doesn't contain dangerous characters
        const cleanCdnPath = cdnPath.replace(/[<>"']/g, '');
        return `${cleanCdnPath}/${fileName}`;
    }

    // Ensure basePath doesn't end with slash and fileName doesn't start with slash
    // Also sanitize basePath to prevent path injection
    const cleanBasePath = basePath.replace(/\/$/, '').replace(/[<>"']/g, '');
    const cleanFileName = fileName.replace(/^\//, '');

    return `${cleanBasePath}/${cleanFileName}`;
};



/**
 * Load theme CSS from a full path
 * 
 * @param fullPath - Full path to the CSS file
 * @param linkId - ID for the link element
 * @returns Promise that resolves when CSS is loaded
 */
export const loadThemeCSS = (
    fullPath: string,
    linkId: string
): Promise<void> => {
    if (isServer()) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        // Check if theme is already loaded
        const existingLink = document.getElementById(linkId);
        if (existingLink) {
            resolve();
            return;
        }

        // Create link element
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = fullPath;

        // Add data attribute for tracking
        link.setAttribute('data-atomix-theme', 'true');

        // Handle load success
        link.onload = () => {
            resolve();
        };

        // Handle load error
        link.onerror = () => {
            // Remove failed link element
            link.remove();
            reject(new Error(`Failed to load theme CSS: ${fullPath}`));
        };

        // Append to head
        document.head.appendChild(link);
    });
};

/**
 * Remove theme CSS from the DOM
 * 
 * @param themeNameOrLinkId - Name of the theme or link ID to remove
 */
export const removeThemeCSS = (themeNameOrLinkId: string): void => {
    if (isServer()) {
        return;
    }

    // Try as link ID first, then as theme name
    let link = document.getElementById(themeNameOrLinkId);
    if (!link) {
        const linkId = getThemeLinkId(themeNameOrLinkId);
        link = document.getElementById(linkId);
    }

    if (link) {
        link.remove();
    }
};

/**
 * Remove all theme CSS files from the DOM
 */
export const removeAllThemeCSS = (): void => {
    if (isServer()) {
        return;
    }

    const themeLinks = document.querySelectorAll('link[data-atomix-theme]');
    themeLinks.forEach(link => link.remove());
};

/**
 * Apply theme data attributes to the document
 * 
 * @param dataAttribute - Data attribute name (default: 'data-theme')
 * @param themeName - Name of the theme
 */
export const applyThemeAttributes = (
    dataAttribute: string,
    themeName: string
): void => {
    if (isServer()) {
        return;
    }

    // Set data attribute on body
    document.body.setAttribute(dataAttribute, themeName);

    // Also set on documentElement for broader compatibility
    document.documentElement.setAttribute(dataAttribute, themeName);
};

/**
 * Remove theme data attributes from the document
 * 
 * @param dataAttribute - Data attribute name (default: 'data-theme')
 */
export const removeThemeAttributes = (
    dataAttribute: string = 'data-theme'
): void => {
    if (isServer()) {
        return;
    }

    document.body.removeAttribute(dataAttribute);
    document.documentElement.removeAttribute(dataAttribute);
};

/**
 * Get the current theme from data attributes
 * 
 * @param dataAttribute - Data attribute name (default: 'data-theme')
 * @returns Current theme name or null
 */
export const getCurrentThemeFromDOM = (
    dataAttribute: string = 'data-theme'
): string | null => {
    if (isServer()) {
        return null;
    }

    return document.body.getAttribute(dataAttribute) ||
        document.documentElement.getAttribute(dataAttribute);
};

/**
 * Detect system theme preference
 * 
 * @returns 'dark' if system prefers dark mode, 'light' otherwise
 */
export const getSystemTheme = (): 'light' | 'dark' => {
    if (isServer()) {
        return 'light';
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
};

/**
 * Check if a theme is currently loaded in the DOM
 * 
 * @param themeName - Name of the theme to check
 * @returns True if theme CSS is loaded
 */
export const isThemeLoaded = (themeName: string): boolean => {
    if (isServer()) {
        return false;
    }

    const linkId = getThemeLinkId(themeName);
    return document.getElementById(linkId) !== null;
};

/**
 * Validate theme metadata
 * 
 * @param metadata - Theme metadata to validate
 * @returns Validation result with errors and warnings
 */
export const validateThemeMetadata = (
    metadata: unknown
): ThemeValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!metadata || typeof metadata !== 'object') {
        errors.push('Theme metadata must be an object');
        return { valid: false, errors, warnings };
    }

    const theme = metadata as Partial<ThemeMetadata>;

    // Required fields
    if (!theme.name || typeof theme.name !== 'string') {
        errors.push('Theme must have a valid name');
    }

    // Optional but recommended fields
    if (!theme.description) {
        warnings.push('Theme should have a description');
    }

    if (!theme.version) {
        warnings.push('Theme should have a version');
    }

    if (!theme.author) {
        warnings.push('Theme should have an author');
    }

    // Validate status if provided
    if (theme.status) {
        const validStatuses = ['stable', 'beta', 'experimental', 'deprecated'];
        if (!validStatuses.includes(theme.status)) {
            errors.push(`Invalid status: ${theme.status}. Must be one of: ${validStatuses.join(', ')}`);
        }
    }

    // Validate color if provided
    if (theme.color && typeof theme.color !== 'string') {
        errors.push('Theme color must be a string');
    }

    // Validate a11y if provided
    if (theme.a11y) {
        if (typeof theme.a11y !== 'object') {
            errors.push('Theme a11y must be an object');
        } else {
            if (theme.a11y.contrastTarget !== undefined) {
                if (typeof theme.a11y.contrastTarget !== 'number' || theme.a11y.contrastTarget < 0) {
                    errors.push('Theme a11y.contrastTarget must be a positive number');
                }
            }
            if (theme.a11y.modes !== undefined) {
                if (!Array.isArray(theme.a11y.modes)) {
                    errors.push('Theme a11y.modes must be an array');
                }
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
};

/**
 * Validate theme name format
 * 
 * @param themeName - Theme name to validate
 * @returns True if valid
 */
export const isValidThemeName = (themeName: string): boolean => {
    if (!themeName || typeof themeName !== 'string') {
        return false;
    }

    // Theme names should be lowercase alphanumeric with hyphens
    const validPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    return validPattern.test(themeName);
};

/**
 * Create a storage adapter for localStorage
 */
export const createLocalStorageAdapter = () => {
    return {
        getItem: (key: string): string | null => {
            if (isServer()) return null;
            try {
                return localStorage.getItem(key);
            } catch {
                return null;
            }
        },
        setItem: (key: string, value: string): void => {
            if (isServer()) return;
            try {
                localStorage.setItem(key, value);
            } catch {
                // Silently fail if localStorage is not available
            }
        },
        removeItem: (key: string): void => {
            if (isServer()) return;
            try {
                localStorage.removeItem(key);
            } catch {
                // Silently fail
            }
        },
        isAvailable: (): boolean => {
            if (isServer()) return false;
            try {
                const test = '__atomix_storage_test__';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch {
                return false;
            }
        },
    };
};

/**
 * Debounce function for performance optimization
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
};
