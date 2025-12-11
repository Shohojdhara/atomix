/**
 * Simple Next.js Theme Usage Example
 * 
 * A minimal example showing how to use createTheme in Next.js
 */

'use client';

import React, { useEffect } from 'react';
import createTheme, { ThemeProvider, useTheme } from '@shohojdhara/atomix';

// ============================================================================
// 1. Create your theme
// ============================================================================

const myTheme = createTheme({
    name: 'My Theme',
    palette: {
        primary: { main: '#7AFFD7' },
        secondary: { main: '#FF5733' },
        background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 16,
    },
    spacing: 8,
});

// ============================================================================
// 2. Inject CSS variables
// ============================================================================

function ThemeStyles({ theme }: { theme: Theme }) {
    useEffect(() => {
        const css = generateCSSVariables(theme);
        let style = document.getElementById('theme-vars');
        if (!style) {
            style = document.createElement('style');
            style.id = 'theme-vars';
            document.head.appendChild(style);
        }
        style.textContent = css;
    }, [theme]);

    return null;
}

// ============================================================================
// 3. Use in your app
// ============================================================================

export default function App() {
    return (
        <ThemeProvider
            themes={{
                'my-theme': {
                    name: myTheme.name,
                    class: 'my-theme',
                },
            }}
            defaultTheme={myTheme}
        >
            <AppContent />
        </ThemeProvider>
    );
}

function AppContent() {
    const { activeTheme } = useTheme();

    if (!activeTheme) return <div>Loading theme...</div>;

    return (
        <>
            <ThemeStyles theme={activeTheme} />
            <div style={{
                padding: activeTheme.spacing(4),
                backgroundColor: activeTheme.palette.background.default,
                color: activeTheme.palette.text.primary,
            }}>
                <h1 style={{ color: activeTheme.palette.primary.main }}>
                    Hello, Themed World!
                </h1>
                <button style={{
                    backgroundColor: activeTheme.palette.primary.main,
                    color: activeTheme.palette.primary.contrastText,
                    padding: activeTheme.spacing(2, 4),
                    borderRadius: activeTheme.borderRadius.md,
                    border: 'none',
                    cursor: 'pointer',
                }}>
                    Themed Button
                </button>
            </div>
        </>
    );
}
