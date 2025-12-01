import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';
import { ThemeContext } from './ThemeContext';
import type { ThemeContextValue } from './types';

describe('useTheme', () => {
    const mockSetTheme = vi.fn(() => Promise.resolve());
    const mockPreloadTheme = vi.fn(() => Promise.resolve());
    const mockIsThemeLoaded = vi.fn(() => true);

    const mockContextValue: ThemeContextValue = {
        theme: 'default-theme',
        setTheme: mockSetTheme,
        availableThemes: [{ name: 'Default', class: 'default-theme' }],
        isLoading: false,
        error: null,
        isThemeLoaded: mockIsThemeLoaded,
        preloadTheme: mockPreloadTheme,
        themeManager: {} as any, // We don't need the actual manager for this test
    };

    it('should throw error when used outside ThemeProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => {
            renderHook(() => useTheme());
        }).toThrow('useTheme must be used within a ThemeProvider');

        consoleSpy.mockRestore();
    });

    it('should return theme context values', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ThemeContext.Provider value={mockContextValue}>
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.theme).toBe('default-theme');
        expect(result.current.availableThemes).toHaveLength(1);
        expect(result.current.isLoading).toBe(false);
    });

    it('should call onChange callback when provided', async () => {
        const onChangeSpy = vi.fn();

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ThemeContext.Provider value={mockContextValue}>
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme({ onChange: onChangeSpy }), { wrapper });

        await act(async () => {
            await result.current.setTheme('new-theme');
        });

        expect(mockSetTheme).toHaveBeenCalledWith('new-theme');
        expect(onChangeSpy).toHaveBeenCalledWith('new-theme');
    });
});
