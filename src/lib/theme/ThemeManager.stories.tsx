import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ThemeMetadata, ThemeProvider, useTheme } from './index';
import { themesConfig } from '../../themes/themes.config';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { ColorModeToggle } from '../../components/ColorModeToggle/ColorModeToggle';

/**
 * Theme Manager
 * 
 * The Atomix Theme Manager provides dynamic theme switching capabilities
 * for both React and vanilla JavaScript applications.
 * 
 * ## Features
 * - Dynamic theme loading
 * - Theme persistence
 * - Preloading support
 * - SSR compatible
 * - Event system
 */
const meta = {
    title: 'Utilities/Theme Manager',
    parameters: {
        docs: {
            description: {
                component: 'Dynamic theme management system for Atomix Design System. Supports theme switching, persistence, and preloading.',
            },
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Theme Switcher Component
 */
function ThemeSwitcher() {
    const { theme, setTheme, availableThemes, isLoading, error } = useTheme();

    if (error) {
        return (
            <div style={{ padding: '1rem', background: 'var(--atomix-red-1)', border: '1px solid var(--atomix-red-4)', borderRadius: '8px' }}>
                <strong>Error:</strong> {error.message}
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
                <strong>Current Theme:</strong> {theme}
                {isLoading && <span style={{ marginLeft: '0.5rem', color: 'var(--atomix-primary-6)' }}>Loading...</span>}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {availableThemes.map((t) => (
                    <Button
                        key={t.class}
                        variant={theme === t.class ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setTheme(t.class!)}
                        disabled={isLoading}
                        aria-label={`Switch to ${t.name} theme`}
                        aria-pressed={theme === t.class}
                    >
                        {t.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}

/**
 * Theme Info Display
 */
function ThemeInfo() {
    const { theme, availableThemes } = useTheme();
    const currentThemeMetadata = availableThemes.find(t => t.class === theme);

    if (!currentThemeMetadata) {
        return null;
    }

    return (
        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem' }}>
            <div><strong>Name:</strong> {currentThemeMetadata.name}</div>
            {currentThemeMetadata.description && (
                <div><strong>Description:</strong> {currentThemeMetadata.description}</div>
            )}
            {currentThemeMetadata.author && (
                <div><strong>Author:</strong> {currentThemeMetadata.author}</div>
            )}
            {currentThemeMetadata.version && (
                <div><strong>Version:</strong> {currentThemeMetadata.version}</div>
            )}
            {currentThemeMetadata.status && (
                <div><strong>Status:</strong> {currentThemeMetadata.status}</div>
            )}
        </div>
    );
}

/**
 * Basic Theme Switching
 * 
 * Demonstrates basic theme switching functionality with the ThemeProvider and useTheme hook.
 */
export const BasicThemeSwitching: Story = {
    render: () => (
        <ThemeProvider
            themes={themesConfig.metadata as Record<string, ThemeMetadata>}
            defaultTheme="shaj-default"
            enablePersistence={false}
        >
            <div style={{ padding: '2rem' }}>
                <h2>Theme Switcher</h2>
                <p>Click a button to switch themes</p>
                <ThemeSwitcher />
            </div>
        </ThemeProvider>
    ),
};

/**
 * With Persistence
 * 
 * Theme manager with localStorage persistence enabled.
 * The selected theme will be remembered across page reloads.
 */
export const WithPersistence: Story = {
    render: () => (
        <ThemeProvider
            themes={themesConfig.metadata as Record<string, ThemeMetadata>}
            defaultTheme="shaj-default"
            enablePersistence={true}
            storageKey="storybook-theme-demo"
        >
            <div style={{ padding: '2rem' }}>
                <h2>Theme Switcher with Persistence</h2>
                <p>Your theme selection will be saved to localStorage</p>
                <ThemeSwitcher />
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--atomix-gray-1)', borderRadius: '8px' }}>
                    <small>
                        <strong>Note:</strong> Reload the page to see persistence in action.
                        The theme will be restored from localStorage.
                    </small>
                </div>
            </div>
        </ThemeProvider>
    ),
};

/**
 * Theme Info Display
 * 
 * Shows detailed information about the current theme.
 */
export const ThemeInfoDisplay: Story = {
    render: () => (
        <ThemeProvider
            themes={themesConfig.metadata as Record<string, ThemeMetadata>}
            defaultTheme="shaj-default"
        >
            <div style={{ padding: '2rem', display: 'grid', gap: '1.5rem' }}>
                <Card>
                    <h2>Theme Switcher</h2>
                    <ThemeSwitcher />
                </Card>

                <Card>
                    <h2>Current Theme Details</h2>
                    <ThemeInfo />
                </Card>
            </div>
        </ThemeProvider>
    ),
};

/**
 * With Preloading
 * 
 * Demonstrates theme preloading for faster switching.
 */
export const WithPreloading: Story = {
    render: () => {
        function PreloadDemo() {
            const { preloadTheme, availableThemes } = useTheme();
            const [preloading, setPreloading] = useState<string | null>(null);
            const [preloaded, setPreloaded] = useState<Set<string>>(new Set());

            const handlePreload = async (themeName: string) => {
                setPreloading(themeName);
                try {
                    await preloadTheme(themeName);
                    setPreloaded(prev => new Set([...prev, themeName]));
                } catch (error) {
                    console.error('Failed to preload theme:', error);
                } finally {
                    setPreloading(null);
                }
            };

            return (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <Card>
                        <h2>Theme Switcher</h2>
                        <ThemeSwitcher />
                    </Card>

                    <Card>
                        <h2>Preload Themes</h2>
                        <p style={{ fontSize: '0.875rem', color: 'var(--atomix-gray-7)' }}>
                            Preload themes for instant switching
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                            {availableThemes.map((t) => (
                                <Button
                                    key={t.class}
                                    variant={preloaded.has(t.class!) ? 'success' : 'outline'}
                                    size="sm"
                                    onClick={() => handlePreload(t.class!)}
                                    disabled={preloading === t.class}
                                >
                                    {preloading === t.class ? 'Preloading...' :
                                        preloaded.has(t.class!) ? `✓ ${t.name}` :
                                            `Preload ${t.name}`}
                                </Button>
                            ))}
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <ThemeProvider
                themes={themesConfig.metadata as Record<string, ThemeMetadata>}
                defaultTheme="shaj-default"
                preload={['shaj-default']}
            >
                <div style={{ padding: '2rem' }}>
                    <PreloadDemo />
                </div>
            </ThemeProvider>
        );
    },
};

/**
 * With Color Mode Toggle
 * 
 * Demonstrates integration with the ColorModeToggle component.
 */
export const WithColorModeToggle: Story = {
    render: () => (
        <ThemeProvider
            themes={themesConfig.metadata as Record<string, ThemeMetadata>}
            defaultTheme="shaj-default"
        >
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>Theme & Color Mode Controls</h2>
                    <ColorModeToggle />
                </div>

                <Card>
                    <ThemeSwitcher />
                </Card>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--atomix-gray-1)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>
                        <strong>Tip:</strong> Use the moon/sun icon to toggle between light and dark modes.
                        Each theme supports both color modes.
                    </p>
                </div>
            </div>
        </ThemeProvider>
    ),
};

/**
 * Component Showcase
 * 
 * Shows how different components look in the current theme.
 */
export const ComponentShowcase: Story = {
    render: () => (
        <ThemeProvider
            themes={themesConfig.metadata as Record<string, ThemeMetadata>}
            defaultTheme="shaj-default"
        >
            <div style={{ padding: '2rem', display: 'grid', gap: '1.5rem' }}>
                <Card>
                    <h2>Theme Switcher</h2>
                    <ThemeSwitcher />
                </Card>

                <Card>
                    <h2>Component Showcase</h2>
                    <p>See how components look in the current theme</p>

                    <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
                        <div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Buttons</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="success">Success</Button>
                                <Button variant="outline">Outline</Button>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Cards</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                <Card style={{ padding: '1rem' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Card 1</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem' }}>Content here</p>
                                </Card>
                                <Card style={{ padding: '1rem' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Card 2</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem' }}>Content here</p>
                                </Card>
                                <Card style={{ padding: '1rem' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Card 3</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem' }}>Content here</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </ThemeProvider>
    ),
};

/**
 * Error Handling
 * 
 * Demonstrates error handling when theme loading fails.
 */
export const ErrorHandling: Story = {
    render: () => {
        function ErrorDemo() {
            const { setTheme, error } = useTheme();
            const [customError, setCustomError] = useState<string | null>(null);

            const handleInvalidTheme = async () => {
                try {
                    await setTheme('non-existent-theme');
                } catch (err) {
                    setCustomError(err instanceof Error ? err.message : 'Unknown error');
                }
            };

            return (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <Card>
                        <h2>Theme Switcher</h2>
                        <ThemeSwitcher />
                    </Card>

                    <Card>
                        <h2>Error Handling Demo</h2>
                        <p style={{ fontSize: '0.875rem', color: 'var(--atomix-gray-7)' }}>
                            Click the button below to trigger an error by trying to load a non-existent theme
                        </p>
                        <Button variant="outline" onClick={handleInvalidTheme}>
                            Try Invalid Theme
                        </Button>

                        {(error || customError) && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: 'var(--atomix-red-1)',
                                border: '1px solid var(--atomix-red-4)',
                                borderRadius: '8px',
                                color: 'var(--atomix-red-9)'
                            }}>
                                <strong>Error:</strong> {error?.message || customError}
                            </div>
                        )}
                    </Card>
                </div>
            );
        }

        return (
            <ThemeProvider
                themes={themesConfig.metadata as Record<string, ThemeMetadata>}
                defaultTheme="shaj-default"
                onError={(error, themeName) => {
                    console.error(`Failed to load theme "${themeName}":`, error);
                }}
            >
                <div style={{ padding: '2rem' }}>
                    <ErrorDemo />
                </div>
            </ThemeProvider>
        );
    },
};

/**
 * Custom Callbacks
 * 
 * Demonstrates using custom callbacks for theme changes.
 */
export const CustomCallbacks: Story = {
    render: () => {
        function CallbackDemo() {
            const [log, setLog] = useState<string[]>([]);

            const addLog = (message: string) => {
                setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
            };

            return (
                <ThemeProvider
                    themes={themesConfig.metadata as Record<string, ThemeMetadata>}
                    defaultTheme="shaj-default"
                    onThemeChange={(theme) => {
                        addLog(`Theme changed to: ${theme}`);
                    }}
                    onError={(error, themeName) => {
                        addLog(`Error loading theme "${themeName}": ${error.message}`);
                    }}
                >
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <Card>
                            <h2>Theme Switcher</h2>
                            <ThemeSwitcher />
                        </Card>

                        <Card>
                            <h2>Event Log</h2>
                            <div style={{
                                maxHeight: '200px',
                                overflowY: 'auto',
                                padding: '1rem',
                                background: 'var(--atomix-gray-1)',
                                borderRadius: '8px',
                                fontFamily: 'monospace',
                                fontSize: '0.75rem'
                            }}>
                                {log.length === 0 ? (
                                    <div style={{ color: 'var(--atomix-gray-6)' }}>No events yet. Switch themes to see logs.</div>
                                ) : (
                                    log.map((entry, index) => (
                                        <div key={index} style={{ marginBottom: '0.25rem' }}>
                                            {entry}
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    </div>
                </ThemeProvider>
            );
        }

        return (
            <div style={{ padding: '2rem' }}>
                <CallbackDemo />
            </div>
        );
    },
};
