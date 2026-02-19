import { describe, it, expect } from 'vitest';
import { ThemeValidator } from '../ThemeValidator';
import { createTestThemeObject } from '../../test/testTheme';
import { Theme } from '../../types';

describe('ThemeValidator', () => {
    const validator = new ThemeValidator();

    it('should validate a valid theme', () => {
        const theme = createTestThemeObject();
        const result = validator.validate(theme);

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should report errors for invalid theme', () => {
        const theme = createTestThemeObject();
        // @ts-ignore
        theme.palette.primary.main = 'invalid-color';

        const result = validator.validate(theme);

        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
        const invalidColorError = result.errors.find(e => e.includes('Invalid color value'));
        expect(invalidColorError).toBeDefined();
    });

    it('should report warnings for accessibility issues', () => {
        const theme = createTestThemeObject();
        // Create a low contrast situation
        theme.palette.primary.main = '#ffffff';
        theme.palette.primary.contrastText = '#ffffff';

        const result = validator.validate(theme);

        // It might be valid but have warnings or a11y issues
        expect(result.a11yIssues.length).toBeGreaterThan(0);
        const contrastIssue = result.a11yIssues.find(i => i.type === 'contrast');
        expect(contrastIssue).toBeDefined();
    });
});
