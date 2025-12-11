/**
 * Next.js Theme Usage Example
 * 
 * This example demonstrates how to use createTheme in a Next.js application.
 * It shows:
 * 1. Creating a custom theme with createTheme
 * 2. Setting up ThemeProvider in Next.js App Router
 * 3. Generating and injecting CSS variables
 * 4. Using the theme in components
 */

'use client';

import React from 'react';
import { createTheme } from '@shohojdhara/atomix/theme';
import { ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';
import { generateCSSVariables } from '@shohojdhara/atomix/theme';
import type { Theme } from '@shohojdhara/atomix/theme';

// ============================================================================
// Step 1: Create Your Custom Theme
// ============================================================================

/**
 * Create a custom theme using createTheme
 * You can customize palette, typography, spacing, breakpoints, etc.
 */
const customTheme = createTheme({
    // Theme metadata
    name: 'My Custom Theme',
    version: '1.0.0',
    description: 'A beautiful custom theme for my Next.js app',
    
    // Color palette
    palette: {
        primary: {
            main: '#7AFFD7', // Your brand primary color
            // light and dark will be auto-generated if not provided
        },
        secondary: {
            main: '#FF5733', // Your brand secondary color
        },
        error: {
            main: '#F44336',
        },
        success: {
            main: '#4CAF50',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
            subtle: '#FAFAFA',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
    },
    
    // Typography
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 16,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.3,
        },
        // ... other typography settings
    },
    
    // Spacing (base unit in pixels)
    spacing: 8, // Each spacing unit = 8px
    
    // Breakpoints
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    
    // Border radius
    borderRadius: {
        base: '0.5rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
    },
    
    // Custom properties
    custom: {
        // Add any custom theme properties here
        gradient: 'linear-gradient(135deg, #7AFFD7 0%, #FF5733 100%)',
    },
});

// ============================================================================
// Step 2: Create Theme Variants (Optional)
// ============================================================================

/**
 * You can create multiple theme variants (light/dark, etc.)
 */
const darkTheme = createTheme({
    name: 'Dark Theme',
    palette: {
        primary: {
            main: '#7AFFD7',
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
            subtle: '#2A2A2A',
        },
        text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.6)',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
    },
});

// ============================================================================
// Step 3: Theme Provider Component for Next.js App Router
// ============================================================================

/**
 * Theme Provider Wrapper Component
 * Use this in your app/layout.tsx or app/page.tsx
 */
export function AppThemeProvider({ children }: { children: React.ReactNode }) {
    // Register your themes in the ThemeProvider
    const themes = {
        'custom-theme': {
            name: customTheme.name,
            class: 'custom-theme',
            version: customTheme.version,
            description: customTheme.description,
        },
        'dark-theme': {
            name: darkTheme.name,
            class: 'dark-theme',
            version: darkTheme.version,
        },
    };

    return (
        <ThemeProvider
            themes={themes}
            defaultTheme={customTheme} // Pass the theme object directly
            enablePersistence={true}
            storageKey="my-app-theme"
            onThemeChange={(theme) => {
                console.log('Theme changed to:', theme);
            }}
        >
            {children}
        </ThemeProvider>
    );
}

// ============================================================================
// Step 4: CSS Variables Injection (for App Router)
// ============================================================================

/**
 * Component to inject CSS variables into the document
 * Use this in your app/layout.tsx
 */
export function ThemeCSSVariables({ theme }: { theme: Theme }) {
    React.useEffect(() => {
        // Generate CSS variables from theme
        const css = generateCSSVariables(theme, {
            selector: ':root',
            prefix: 'atomix',
        });

        // Create or update style element
        let styleElement = document.getElementById('theme-css-variables');
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'theme-css-variables';
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = css;

        // Cleanup on unmount
        return () => {
            if (styleElement && styleElement.parentNode) {
                styleElement.parentNode.removeChild(styleElement);
            }
        };
    }, [theme]);

    return null;
}

// ============================================================================
// Step 5: Using Theme in Components
// ============================================================================

/**
 * Example component using the theme
 */
export function ThemedButton({ children }: { children: React.ReactNode }) {
    const { activeTheme } = useTheme();

    if (!activeTheme) {
        return <button>{children}</button>;
    }

    const styles: React.CSSProperties = {
        backgroundColor: activeTheme.palette.primary.main,
        color: activeTheme.palette.primary.contrastText,
        padding: activeTheme.spacing(2, 4), // 16px 32px (spacing * 2, spacing * 4)
        borderRadius: activeTheme.borderRadius.md,
        border: 'none',
        cursor: 'pointer',
        fontFamily: activeTheme.typography.fontFamily,
        fontSize: activeTheme.typography.fontSize,
        fontWeight: activeTheme.typography.fontWeightMedium,
        transition: `all ${activeTheme.transitions.duration.standard}ms ${activeTheme.transitions.easing.easeInOut}`,
    };

    return (
        <button style={styles}>
            {children}
        </button>
    );
}

/**
 * Example component using CSS variables
 */
export function ThemedCard({ children }: { children: React.ReactNode }) {
    const styles: React.CSSProperties = {
        backgroundColor: 'var(--atomix-background-paper)',
        color: 'var(--atomix-text-primary)',
        padding: 'var(--atomix-spacing-4)',
        borderRadius: 'var(--atomix-border-radius-md)',
        boxShadow: 'var(--atomix-box-shadow-md)',
    };

    return (
        <div style={styles}>
            {children}
        </div>
    );
}

/**
 * Example component with theme switching
 */
export function ThemeSwitcher() {
    const { theme, setTheme, availableThemes } = useTheme();

    const handleThemeChange = async (themeName: string) => {
        try {
            await setTheme(themeName);
        } catch (error) {
            console.error('Failed to change theme:', error);
        }
    };

    return (
        <div>
            <label htmlFor="theme-select">Select Theme: </label>
            <select
                id="theme-select"
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
            >
                {availableThemes.map((t) => (
                    <option key={t.name} value={t.name}>
                        {t.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

// ============================================================================
// Step 6: Complete App Example
// ============================================================================

/**
 * Complete example page component
 */
export default function ExamplePage() {
    const { activeTheme } = useTheme();

    return (
        <div>
            {/* Inject CSS variables if theme is available */}
            {activeTheme && <ThemeCSSVariables theme={activeTheme} />}
            
            <ThemeSwitcher />
            
            <div style={{ padding: '2rem' }}>
                <h1 style={{ 
                    color: activeTheme?.palette.primary.main || '#000',
                    marginBottom: '1rem'
                }}>
                    My Themed App
                </h1>
                
                <ThemedButton>Click Me</ThemedButton>
                
                <ThemedCard style={{ marginTop: '1rem' }}>
                    <h2>Card Title</h2>
                    <p>This card uses CSS variables from the theme.</p>
                </ThemedCard>
            </div>
        </div>
    );
}

// ============================================================================
// Step 7: Next.js App Router Setup (app/layout.tsx example)
// ============================================================================

/**
 * Example app/layout.tsx structure:
 * 
 * ```tsx
 * import { AppThemeProvider } from './examples/nextjs-theme-usage';
 * 
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <AppThemeProvider>
 *           {children}
 *         </AppThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

// ============================================================================
// Step 8: Using Theme with CSS Modules (Alternative Approach)
// ============================================================================

/**
 * Example using theme values in CSS modules
 * 
 * In your component.module.css:
 * 
 * ```css
 * .button {
 *   background-color: var(--atomix-primary-main);
 *   color: var(--atomix-primary-contrast-text);
 *   padding: var(--atomix-spacing-2) var(--atomix-spacing-4);
 *   border-radius: var(--atomix-border-radius-md);
 *   font-family: var(--atomix-body-font-family);
 * }
 * 
 * .button:hover {
 *   background-color: var(--atomix-primary-dark);
 *   transition: all var(--atomix-transition-duration-standard) var(--atomix-transition-easing-ease-in-out);
 * }
 * ```
 */

// ============================================================================
// Step 9: Server-Side Theme (Optional - for SSR)
// ============================================================================

/**
 * For server-side rendering, you can generate CSS variables on the server
 * and inject them in the initial HTML
 */
export function generateThemeCSS(theme: Theme): string {
    return generateCSSVariables(theme, {
        selector: ':root',
        prefix: 'atomix',
    });
}

/**
 * Example usage in a Server Component:
 * 
 * ```tsx
 * import { generateThemeCSS } from './examples/nextjs-theme-usage';
 * 
 * export default async function RootLayout({ children }) {
 *   const themeCSS = generateThemeCSS(customTheme);
 *   
 *   return (
 *     <html>
 *       <head>
 *         <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
 *       </head>
 *       <body>
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

// ============================================================================
// Step 10: Advanced Usage - Merging Multiple Themes
// ============================================================================

/**
 * You can merge multiple theme configurations
 */
const baseTheme = createTheme({
    palette: {
        primary: { main: '#7AFFD7' },
    },
});

const extendedTheme = createTheme(
    baseTheme, // Base theme
    {
        // Override or extend
        palette: {
            secondary: { main: '#FF5733' },
        },
        custom: {
            customProperty: 'value',
        },
    }
);

// ============================================================================
// Step 11: Using Theme Utilities
// ============================================================================

/**
 * Example using theme utilities for responsive design
 */
export function ResponsiveComponent() {
    const { activeTheme } = useTheme();

    if (!activeTheme) return null;

    // Use breakpoints
    const mobileStyles: React.CSSProperties = {
        padding: activeTheme.spacing(2),
    };

    const desktopStyles: React.CSSProperties = {
        padding: activeTheme.spacing(4),
    };

    return (
        <div>
            {/* Use media queries with breakpoints */}
            <style>{`
                @media ${activeTheme.breakpoints.up('md')} {
                    .responsive {
                        padding: ${activeTheme.spacing(4)};
                    }
                }
            `}</style>
            <div className="responsive" style={mobileStyles}>
                Responsive Content
            </div>
        </div>
    );
}

