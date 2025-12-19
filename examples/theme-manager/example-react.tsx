/**
 * Theme Manager React Example
 * 
 * This example demonstrates how to use the Atomix Theme Manager in a React application.
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@shohojdhara/atomix';
import { ColorModeToggle } from '@shohojdhara/atomix';
import { Button } from '@shohojdhara/atomix';
import { Card } from '@shohojdhara/atomix';
import { Badge } from '@shohojdhara/atomix';

/**
 * Theme Switcher Component
 * 
 * Demonstrates using the useTheme hook to switch themes
 */
function ThemeSwitcher() {
    const { theme, setTheme, availableThemes, isLoading, error, preloadTheme } = useTheme();
    const [preloading, setPreloading] = useState<string | null>(null);

    const handleThemeChange = async (themeName: string) => {
        try {
            await setTheme(themeName);
        } catch (err) {
            console.error('Failed to set theme:', err);
        }
    };

    const handlePreload = async (themeName: string) => {
        setPreloading(themeName);
        try {
            await preloadTheme(themeName);
            console.log(`Theme "${themeName}" preloaded successfully`);
        } catch (err) {
            console.error('Failed to preload theme:', err);
        } finally {
            setPreloading(null);
        }
    };

    if (error) {
        return (
            <Card variant="outlined" className="error-card">
                <h3>Error Loading Theme</h3>
                <p>{error.message}</p>
            </Card>
        );
    }

    return (
        <Card>
            <h2>Theme Switcher</h2>

            <div style={{ marginBottom: '1rem' }}>
                <strong>Current Theme:</strong>{' '}
                <span aria-live="polite" aria-atomic="true">
                    {theme}
                </span>
                {isLoading && (
                    <Badge
                        variant="info"
                        style={{ marginLeft: '0.5rem' }}
                        aria-label="Loading theme"
                    >
                        Loading...
                    </Badge>
                )}
            </div>

            <div
                role="group"
                aria-label="Theme selection"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}
            >
                {availableThemes.map((t) => (
                    <Button
                        key={t.class}
                        variant={theme === t.class ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => handleThemeChange(t.class!)}
                        disabled={isLoading}
                        aria-pressed={theme === t.class}
                        aria-label={`Switch to ${t.name} theme`}
                    >
                        {t.name}
                    </Button>
                ))}
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--atomix-gray-3)' }}>
                <h3>Preload Themes</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--atomix-gray-7)' }}>
                    Preload themes for faster switching
                </p>
                <div
                    role="group"
                    aria-label="Theme preloading"
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                >
                    {availableThemes.map((t) => (
                        <Button
                            key={`preload-${t.class}`}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreload(t.class!)}
                            disabled={preloading === t.class}
                            aria-label={preloading === t.class ? `Preloading ${t.name} theme` : `Preload ${t.name} theme`}
                            aria-busy={preloading === t.class}
                        >
                            {preloading === t.class ? 'Preloading...' : `Preload ${t.name}`}
                        </Button>
                    ))}
                </div>
            </div>
        </Card>
    );
}

/**
 * Theme Info Component
 * 
 * Displays information about the current theme
 */
function ThemeInfo() {
    const { theme, availableThemes } = useTheme();

    const currentThemeMetadata = availableThemes.find(t => t.class === theme);

    if (!currentThemeMetadata) {
        return null;
    }

    return (
        <Card variant="filled">
            <h2>Current Theme Details</h2>

            <div style={{ display: 'grid', gap: '0.5rem' }}>
                <div>
                    <strong>Name:</strong> {currentThemeMetadata.name}
                </div>

                {currentThemeMetadata.description && (
                    <div>
                        <strong>Description:</strong> {currentThemeMetadata.description}
                    </div>
                )}

                {currentThemeMetadata.author && (
                    <div>
                        <strong>Author:</strong> {currentThemeMetadata.author}
                    </div>
                )}

                {currentThemeMetadata.version && (
                    <div>
                        <strong>Version:</strong> {currentThemeMetadata.version}
                    </div>
                )}

                {currentThemeMetadata.status && (
                    <div>
                        <strong>Status:</strong>{' '}
                        <Badge
                            variant={
                                currentThemeMetadata.status === 'stable' ? 'success' :
                                    currentThemeMetadata.status === 'beta' ? 'warning' :
                                        currentThemeMetadata.status === 'experimental' ? 'info' :
                                            'default'
                            }
                        >
                            {currentThemeMetadata.status}
                        </Badge>
                    </div>
                )}

                {currentThemeMetadata.tags && currentThemeMetadata.tags.length > 0 && (
                    <div>
                        <strong>Tags:</strong>{' '}
                        {currentThemeMetadata.tags.map(tag => (
                            <Badge key={tag} variant="secondary" style={{ marginRight: '0.25rem' }}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {currentThemeMetadata.supportsDarkMode && (
                    <div>
                        <strong>Dark Mode:</strong> Supported
                    </div>
                )}

                {currentThemeMetadata.features && currentThemeMetadata.features.length > 0 && (
                    <div>
                        <strong>Features:</strong>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                            {currentThemeMetadata.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Card>
    );
}

/**
 * Component Showcase
 * 
 * Shows how components look in the current theme
 */
function ComponentShowcase() {
    return (
        <Card>
            <h2>Component Showcase</h2>
            <p>See how components look in the current theme</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                <div>
                    <h3>Buttons</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="outline">Outline</Button>
                    </div>
                </div>

                <div>
                    <h3>Badges</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="danger">Danger</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="info">Info</Badge>
                    </div>
                </div>

                <div>
                    <h3>Cards</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <Card variant="outlined">
                            <h4>Outlined Card</h4>
                            <p>This is an outlined card</p>
                        </Card>
                        <Card variant="filled">
                            <h4>Filled Card</h4>
                            <p>This is a filled card</p>
                        </Card>
                        <Card variant="elevated">
                            <h4>Elevated Card</h4>
                            <p>This is an elevated card</p>
                        </Card>
                    </div>
                </div>
            </div>
        </Card>
    );
}

/**
 * Main App Component
 */
function AppContent() {
    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Atomix Theme Manager Example</h1>
                    <p>Demonstrating dynamic theme switching in React</p>
                </div>
                <ColorModeToggle />
            </header>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <ThemeSwitcher />
                <ThemeInfo />
                <ComponentShowcase />
            </div>

            <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--atomix-gray-3)', textAlign: 'center' }}>
                <p style={{ color: 'var(--atomix-gray-7)', fontSize: '0.875rem' }}>
                    Atomix Design System - Theme Manager Example
                </p>
            </footer>
        </div>
    );
}

/**
 * Root App with ThemeProvider
 */
export default function App() {
    return (
        <ThemeProvider
            defaultTheme=""
            basePath="/themes"
            enablePersistence={true}
            preload={[]}
            onThemeChange={(theme) => {
                console.log('Theme changed to:', theme);
            }}
            onError={(error, themeName) => {
                console.error(`Error loading theme "${themeName}":`, error);
            }}
        >
            <AppContent />
        </ThemeProvider>
    );
}
