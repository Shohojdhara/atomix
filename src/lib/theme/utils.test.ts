import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as utils from './utils';

describe('Theme Utils', () => {
    describe('buildThemePath', () => {
        it('should build correct path with default settings', () => {
            expect(utils.buildThemePath('my-theme')).toBe('/themes/my-theme.css');
        });

        it('should handle custom base path', () => {
            expect(utils.buildThemePath('my-theme', '/custom/path')).toBe('/custom/path/my-theme.css');
        });

        it('should handle trailing slash in base path', () => {
            expect(utils.buildThemePath('my-theme', '/custom/path/')).toBe('/custom/path/my-theme.css');
        });

        it('should handle minified option', () => {
            expect(utils.buildThemePath('my-theme', '/themes', true)).toBe('/themes/my-theme.min.css');
        });

        it('should use CDN path if provided', () => {
            expect(utils.buildThemePath('my-theme', '/themes', false, 'https://cdn.example.com')).toBe('https://cdn.example.com/my-theme.css');
        });
    });

    describe('isValidThemeName', () => {
        it('should return true for valid names', () => {
            expect(utils.isValidThemeName('theme-name')).toBe(true);
            expect(utils.isValidThemeName('theme123')).toBe(true);
            expect(utils.isValidThemeName('my-cool-theme')).toBe(true);
        });

        it('should return false for invalid names', () => {
            expect(utils.isValidThemeName('Theme Name')).toBe(false); // spaces/caps
            expect(utils.isValidThemeName('theme_name')).toBe(false); // underscore
            expect(utils.isValidThemeName('theme.name')).toBe(false); // dot
            expect(utils.isValidThemeName('')).toBe(false);
            expect(utils.isValidThemeName(null as any)).toBe(false);
        });
    });

    describe('validateThemeMetadata', () => {
        it('should validate correct metadata', () => {
            const metadata = {
                name: 'My Theme',
                description: 'A cool theme',
                version: '1.0.0',
                author: 'Me',
            };
            const result = utils.validateThemeMetadata(metadata);
            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
            expect(result.warnings).toHaveLength(0);
        });

        it('should return errors for missing required fields', () => {
            const metadata = {};
            const result = utils.validateThemeMetadata(metadata);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain('Theme must have a valid name');
        });

        it('should return warnings for missing optional fields', () => {
            const metadata = { name: 'My Theme' };
            const result = utils.validateThemeMetadata(metadata);
            expect(result.valid).toBe(true);
            expect(result.warnings).toContain('Theme should have a description');
            expect(result.warnings).toContain('Theme should have a version');
            expect(result.warnings).toContain('Theme should have an author');
        });
    });

    describe('DOM Operations', () => {
        beforeEach(() => {
            document.head.innerHTML = '';
            document.body.removeAttribute('data-theme');
            document.documentElement.removeAttribute('data-theme');
        });

        describe('loadThemeCSS', () => {
            it('should create link element', () => {
                // We can't easily wait for onload in JSDOM without manual triggering
                // So we just call it and check side effects immediately (ignoring the promise for a moment)
                // actually, we can't ignore the promise if we want to be clean.
                // But we can check if element exists.

                const promise = utils.loadThemeCSS('test-theme');

                const link = document.getElementById('atomix-theme-test-theme') as HTMLLinkElement;
                expect(link).not.toBeNull();
                expect(link.tagName).toBe('LINK');
                expect(link.getAttribute('href')).toBe('/themes/test-theme.css');
                expect(link.getAttribute('data-atomix-theme')).toBe('test-theme');

                // Manually trigger load to resolve promise
                link.onload?.(new Event('load'));

                return expect(promise).resolves.toBeUndefined();
            });

            it('should not create duplicate link', async () => {
                const link = document.createElement('link');
                link.id = 'atomix-theme-existing';
                document.head.appendChild(link);

                await utils.loadThemeCSS('existing');

                expect(document.querySelectorAll('#atomix-theme-existing')).toHaveLength(1);
            });
        });

        describe('removeThemeCSS', () => {
            it('should remove link element', () => {
                const link = document.createElement('link');
                link.id = 'atomix-theme-to-remove';
                document.head.appendChild(link);

                utils.removeThemeCSS('to-remove');

                expect(document.getElementById('atomix-theme-to-remove')).toBeNull();
            });
        });

        describe('applyThemeAttributes', () => {
            it('should apply attributes to body and html', () => {
                utils.applyThemeAttributes('new-theme');

                expect(document.body.getAttribute('data-theme')).toBe('new-theme');
                expect(document.documentElement.getAttribute('data-theme')).toBe('new-theme');
            });

            it('should use custom attribute name', () => {
                utils.applyThemeAttributes('new-theme', 'data-custom');

                expect(document.body.getAttribute('data-custom')).toBe('new-theme');
            });
        });
    });
});
