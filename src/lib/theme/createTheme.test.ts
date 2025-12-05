/**
 * createTheme Tests
 * 
 * Tests for the createTheme function and related utilities
 */

import { describe, it, expect } from 'vitest';
import { createTheme } from './createTheme';
import { generateCSSVariables } from './generateCSSVariables';
import { mergeTheme, extendTheme, createThemeVariants } from './composeTheme';
import { lighten, darken, alpha, getContrastText } from './themeUtils';

describe('createTheme', () => {
    it('should create a theme with default values', () => {
        const theme = createTheme();

        expect(theme).toBeDefined();
        expect(theme.__isJSTheme).toBe(true);
        expect(theme.palette).toBeDefined();
        expect(theme.typography).toBeDefined();
        expect(theme.spacing).toBeDefined();
        expect(theme.breakpoints).toBeDefined();
    });

    it('should create a theme with custom palette', () => {
        const theme = createTheme({
            palette: {
                primary: { main: '#FF0000' },
                secondary: { main: '#00FF00' },
            },
        });

        expect(theme.palette.primary.main).toBe('#FF0000');
        expect(theme.palette.secondary.main).toBe('#00FF00');
        expect(theme.palette.primary.light).toBeDefined();
        expect(theme.palette.primary.dark).toBeDefined();
        expect(theme.palette.primary.contrastText).toBeDefined();
    });

    it('should create a theme with custom typography', () => {
        const theme = createTheme({
            typography: {
                fontFamily: 'Arial, sans-serif',
                fontSize: 16,
            },
        });

        expect(theme.typography.fontFamily).toBe('Arial, sans-serif');
        expect(theme.typography.fontSize).toBe(16);
    });

    it('should create spacing function', () => {
        const theme = createTheme({ spacing: 8 });

        expect(theme.spacing(1)).toBe('8px');
        expect(theme.spacing(2)).toBe('16px');
        expect(theme.spacing(1, 2)).toBe('8px 16px');
    });

    it('should create breakpoints with helpers', () => {
        const theme = createTheme();

        expect(theme.breakpoints.up('sm')).toContain('min-width');
        expect(theme.breakpoints.down('md')).toContain('max-width');
        expect(theme.breakpoints.between('sm', 'lg')).toContain('min-width');
    });

    it('should merge multiple theme options', () => {
        const theme = createTheme(
            { palette: { primary: { main: '#000' } } },
            { palette: { secondary: { main: '#FFF' } } }
        );

        expect(theme.palette.primary.main).toBe('#000');
        expect(theme.palette.secondary.main).toBe('#FFF');
    });
});

describe('CSS Variable Generation', () => {
    it('should generate CSS variables from theme', () => {
        const theme = createTheme({
            palette: {
                primary: { main: '#7AFFD7' },
            },
        });

        const css = generateCSSVariables(theme);

        expect(css).toContain('--atomix-primary');
        expect(css).toContain('#7AFFD7');
        expect(css).toContain(':root');
    });

    it('should generate CSS variables with custom selector', () => {
        const theme = createTheme();
        const css = generateCSSVariables(theme, { selector: '.my-theme' });

        expect(css).toContain('.my-theme');
    });

    it('should generate CSS variables with custom prefix', () => {
        const theme = createTheme();
        const css = generateCSSVariables(theme, { prefix: 'custom' });

        expect(css).toContain('--custom-primary');
    });

    describe('Border Radius Variables', () => {
        it('should generate all border radius variables', () => {
            const theme = createTheme();
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-border-radius');
            expect(css).toContain('--atomix-border-radius-sm');
            expect(css).toContain('--atomix-border-radius-lg');
            expect(css).toContain('--atomix-border-radius-xl');
            expect(css).toContain('--atomix-border-radius-xxl');
            expect(css).toContain('--atomix-border-radius-2xl');
            expect(css).toContain('--atomix-border-radius-3xl');
            expect(css).toContain('--atomix-border-radius-4xl');
            expect(css).toContain('--atomix-border-radius-pill');
        });

        it('should use custom border radius values', () => {
            const theme = createTheme({
                borderRadius: {
                    base: '1rem',
                    sm: '0.5rem',
                    lg: '1.5rem',
                },
            });
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-border-radius: 1rem');
            expect(css).toContain('--atomix-border-radius-sm: 0.5rem');
            expect(css).toContain('--atomix-border-radius-lg: 1.5rem');
        });

        it('should accept numeric border radius values', () => {
            const theme = createTheme({
                borderRadius: {
                    base: 8,
                    sm: 4,
                },
            });
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-border-radius: 8px');
            expect(css).toContain('--atomix-border-radius-sm: 4px');
        });
    });

    describe('Color Palette Scales', () => {
        it('should generate primary color scale (1-10)', () => {
            const theme = createTheme({
                palette: {
                    primary: { main: '#7AFFD7' },
                },
            });
            const css = generateCSSVariables(theme);

            for (let i = 1; i <= 10; i++) {
                expect(css).toContain(`--atomix-primary-${i}`);
            }
        });

        it('should generate secondary color scale (1-10)', () => {
            const theme = createTheme({
                palette: {
                    secondary: { main: '#FF5733' },
                },
            });
            const css = generateCSSVariables(theme);

            for (let i = 1; i <= 10; i++) {
                expect(css).toContain(`--atomix-secondary-${i}`);
            }
        });

        it('should generate gray color scale (1-10)', () => {
            const theme = createTheme({
                palette: {
                    text: {
                        primary: '#000000',
                        secondary: '#666666',
                        disabled: '#999999',
                    },
                },
            });
            const css = generateCSSVariables(theme);

            for (let i = 1; i <= 10; i++) {
                expect(css).toContain(`--atomix-gray-${i}`);
            }
        });

        it('should generate semantic color scales (red, green, blue, yellow)', () => {
            const theme = createTheme({
                palette: {
                    error: { main: '#F44336' },
                    success: { main: '#4CAF50' },
                    info: { main: '#2196F3' },
                    warning: { main: '#FF9800' },
                },
            });
            const css = generateCSSVariables(theme);

            // Red scale from error
            for (let i = 1; i <= 10; i++) {
                expect(css).toContain(`--atomix-red-${i}`);
            }

            // Green scale from success
            for (let i = 1; i <= 10; i++) {
                expect(css).toContain(`--atomix-green-${i}`);
            }

            // Blue scale from info
            for (let i = 1; i <= 10; i++) {
                expect(css).toContain(`--atomix-blue-${i}`);
            }

            // Yellow scale from warning
            for (let i = 1; i <= 10; i++) {
                expect(css).toContain(`--atomix-yellow-${i}`);
            }
        });

        it('should generate color scale step 6 as the main color', () => {
            const theme = createTheme({
                palette: {
                    primary: { main: '#7AFFD7' },
                },
            });
            const css = generateCSSVariables(theme);

            // Step 6 should be the main color
            expect(css).toMatch(/--atomix-primary-6:\s*#7AFFD7/i);
        });
    });

    describe('Typography Variables', () => {
        it('should generate root font size variable', () => {
            const theme = createTheme({
                typography: {
                    fontSize: 16,
                },
            });
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-root-font-size');
            expect(css).toContain('16px');
        });

        it('should generate extended font size scale', () => {
            const theme = createTheme({
                typography: {
                    fontSize: 16,
                },
            });
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-font-size-xs');
            expect(css).toContain('--atomix-font-size-sm');
            expect(css).toContain('--atomix-font-size-md');
            expect(css).toContain('--atomix-font-size-lg');
            expect(css).toContain('--atomix-font-size-xl');
            expect(css).toContain('--atomix-font-size-2xl');
        });

        it('should calculate font sizes correctly from base', () => {
            const theme = createTheme({
                typography: {
                    fontSize: 16,
                },
            });
            const css = generateCSSVariables(theme);

            // xs = 0.75 * 16 = 12px
            expect(css).toMatch(/--atomix-font-size-xs:\s*12px/);
            // sm = 0.875 * 16 = 14px
            expect(css).toMatch(/--atomix-font-size-sm:\s*14px/);
            // md = 1 * 16 = 16px
            expect(css).toMatch(/--atomix-font-size-md:\s*16px/);
            // lg = 1.125 * 16 = 18px
            expect(css).toMatch(/--atomix-font-size-lg:\s*18px/);
            // xl = 1.5 * 16 = 24px
            expect(css).toMatch(/--atomix-font-size-xl:\s*24px/);
            // 2xl = 2 * 16 = 32px
            expect(css).toMatch(/--atomix-font-size-2xl:\s*32px/);
        });
    });

    describe('Link Variables', () => {
        it('should generate link decoration variables', () => {
            const theme = createTheme({
                palette: {
                    primary: { main: '#7AFFD7' },
                },
            });
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-link-decoration');
            expect(css).toContain('--atomix-link-hover-decoration');
        });

        it('should set default link decoration values', () => {
            const theme = createTheme({
                palette: {
                    primary: { main: '#7AFFD7' },
                },
            });
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-link-decoration: underline');
            expect(css).toContain('--atomix-link-hover-decoration: none');
        });
    });

    describe('Code and Highlight Variables', () => {
        it('should generate highlight background variable', () => {
            const theme = createTheme();
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-highlight-bg');
        });

        it('should generate code color variable', () => {
            const theme = createTheme({
                palette: {
                    text: {
                        primary: '#000000',
                        secondary: '#666666',
                        disabled: '#999999',
                    },
                },
            });
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-code-color');
            // Should use text secondary color (value may vary based on theme defaults)
            expect(css).toMatch(/--atomix-code-color:\s*[^;]+/);
        });

        it('should use warning color for highlight background when available', () => {
            const theme = createTheme({
                palette: {
                    warning: { main: '#FF9800' },
                },
            });
            const css = generateCSSVariables(theme);

            expect(css).toContain('--atomix-highlight-bg');
            // Should contain rgba with warning color
            expect(css).toMatch(/--atomix-highlight-bg:\s*rgba\(/);
        });
    });

    describe('Variable Format and Structure', () => {
        it('should generate valid CSS variable syntax', () => {
            const theme = createTheme();
            const css = generateCSSVariables(theme);

            // Check for valid CSS variable format: --name: value;
            const variablePattern = /--[\w-]+:\s*[^;]+;/g;
            const matches = css.match(variablePattern);
            expect(matches).toBeTruthy();
            expect(matches!.length).toBeGreaterThan(0);
        });

        it('should include all variable categories', () => {
            const theme = createTheme({
                palette: {
                    primary: { main: '#7AFFD7' },
                    secondary: { main: '#FF5733' },
                    error: { main: '#F44336' },
                    success: { main: '#4CAF50' },
                    info: { main: '#2196F3' },
                    warning: { main: '#FF9800' },
                },
                typography: {
                    fontSize: 16,
                },
            });
            const css = generateCSSVariables(theme);

            // Check for variables from each category
            expect(css).toContain('--atomix-primary'); // Palette
            expect(css).toContain('--atomix-body-font-family'); // Typography
            expect(css).toContain('--atomix-box-shadow'); // Shadows
            expect(css).toContain('--atomix-transition-duration'); // Transitions
            expect(css).toContain('--atomix-z-modal'); // Z-index
            expect(css).toContain('--atomix-breakpoint-sm'); // Breakpoints
            expect(css).toContain('--atomix-spacing-4'); // Spacing
            expect(css).toContain('--atomix-border-width'); // Borders
            expect(css).toContain('--atomix-border-radius'); // Border radius
            expect(css).toContain('--atomix-focus-ring-width'); // Focus ring
        });

        it('should not duplicate variables', () => {
            const theme = createTheme();
            const css = generateCSSVariables(theme);

            // Extract all variable names
            const variableNames = css.match(/--([\w-]+):/g) || [];
            const uniqueNames = new Set(variableNames);

            // Should have same count (no duplicates)
            expect(variableNames.length).toBe(uniqueNames.size);
        });
    });
});

describe('Theme Composition', () => {
    it('should merge themes', () => {
        const merged = mergeTheme(
            { palette: { primary: { main: '#000' } } },
            { palette: { secondary: { main: '#FFF' } } }
        );

        const primary = merged.palette?.primary;
        const secondary = merged.palette?.secondary;
        
        expect(primary && typeof primary === 'object' ? primary.main : primary).toBe('#000');
        expect(secondary && typeof secondary === 'object' ? secondary.main : secondary).toBe('#FFF');
    });

    it('should extend theme', () => {
        const base = createTheme({ palette: { primary: { main: '#000' } } });
        const extended = extendTheme(base, {
            palette: { secondary: { main: '#FFF' } },
        });

        expect(extended.palette.primary.main).toBe('#000');
        expect(extended.palette.secondary.main).toBe('#FFF');
    });

    it('should create theme variants', () => {
        const { light, dark } = createThemeVariants({
            palette: { primary: { main: '#7AFFD7' } },
        });

        expect(light).toBeDefined();
        expect(dark).toBeDefined();
        expect(dark.palette.background.default).toBe('#121212');
    });
});

describe('Theme Utilities', () => {
    it('should lighten color', () => {
        const lightened = lighten('#000000', 0.5);
        expect(lightened).not.toBe('#000000');
        expect(lightened).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should darken color', () => {
        const darkened = darken('#FFFFFF', 0.5);
        expect(darkened).not.toBe('#FFFFFF');
        expect(darkened).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should add alpha to color', () => {
        const withAlpha = alpha('#FF0000', 0.5);
        expect(withAlpha).toContain('rgba');
        expect(withAlpha).toContain('0.5');
    });

    it('should get contrast text', () => {
        const whiteContrast = getContrastText('#000000');
        const blackContrast = getContrastText('#FFFFFF');

        expect(whiteContrast).toBe('#FFFFFF');
        expect(blackContrast).toBe('#000000');
    });
});
