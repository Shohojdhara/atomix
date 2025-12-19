/**
 * Font System Usage Examples
 * Demonstrates how to use the Atomix font system with different themes
 */

import React, { useEffect } from 'react';
import {
  ThemeProvider,
  useTheme,
  loadThemeFonts,
  preloadThemeFonts,
  getFontFallbackStack
} from '@shohojdhara/atomix/theme';

// Example 1: Basic font loading with theme switching
function FontLoadingExample() {
  const { theme, setTheme, availableThemes } = useTheme();

  useEffect(() => {
    // Preload fonts for better performance
    preloadThemeFonts(theme);

    // Load all theme fonts
    loadThemeFonts(theme).catch(console.error);
  }, [theme]);

  return (
    <div>
      <h2>Font Loading Example</h2>
      <p>Current theme: {theme}</p>

      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {availableThemes.map(t => (
          <option key={t.class || t.name} value={t.class || t.name}>{t.name}</option>
        ))}
      </select>

      <div style={{
        fontFamily: getFontFallbackStack(theme, 'primary'),
        marginTop: '1rem'
      }}>
        <h3>Primary Font Sample</h3>
        <p>This text uses the primary font for the {theme} theme.</p>
      </div>

      <div style={{
        fontFamily: getFontFallbackStack(theme, 'monospace'),
        marginTop: '1rem'
      }}>
        <h4>Monospace Font Sample</h4>
        <code>console.log('This is monospace text');</code>
      </div>
    </div>
  );
}

// Example 2: Theme-specific typography showcase
function TypographyShowcase() {
  const { theme } = useTheme();

  const getThemeDescription = (themeId: string) => {
    switch (themeId) {
      default:
        return 'Default typography configuration';
    }
  };

  return (
    <div className={`atomix-theme-${theme}`}>
      <h1>Typography Showcase</h1>
      <p className="theme-description">{getThemeDescription(theme)}</p>

      <div className="typography-samples">
        <h1>Heading 1 - Display Text</h1>
        <h2>Heading 2 - Section Title</h2>
        <h3>Heading 3 - Subsection</h3>
        <h4>Heading 4 - Component Title</h4>
        <h5>Heading 5 - Small Title</h5>
        <h6>Heading 6 - Caption</h6>

        <p className="body-large">
          Large body text for important content and introductions.
        </p>

        <p className="body-base">
          Regular body text for general content and descriptions. This is the most
          commonly used text size throughout the interface.
        </p>

        <p className="body-small">
          Small body text for secondary information and captions.
        </p>

        <code className="code-sample">
          const example = 'Monospace text for code samples';
        </code>
      </div>
    </div>
  );
}

// Example 3: Performance-optimized font loading
function OptimizedFontLoading() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let mounted = true;

    const loadFonts = async () => {
      try {
        setLoadingError(null);

        // Preload critical fonts first
        preloadThemeFonts(theme);

        // Load all fonts with error handling
        await loadThemeFonts(theme);

        if (mounted) {
          setFontsLoaded(true);
        }
      } catch (error) {
        if (mounted) {
          setLoadingError(error instanceof Error ? error.message : 'Font loading failed');
        }
      }
    };

    loadFonts();

    return () => {
      mounted = false;
    };
  }, [theme]);

  return (
    <div>
      <h2>Font Loading Status</h2>

      {loadingError && (
        <div className="error-message">
          Error loading fonts: {loadingError}
        </div>
      )}

      <div className="loading-status">
        <p>Theme: {theme}</p>
        <p>Fonts loaded: {fontsLoaded ? '✅ Yes' : '⏳ Loading...'}</p>
      </div>

      <div
        className="font-sample"
        style={{
          opacity: fontsLoaded ? 1 : 0.5,
          transition: 'opacity 0.3s ease'
        }}
      >
        <h3>Sample Text</h3>
        <p>This text will appear with proper fonts once loading is complete.</p>
      </div>
    </div>
  );
}

// Main App component
export default function FontSystemExample() {
  return (
    <ThemeProvider
      defaultTheme=""
    >
      <div className="font-system-examples">
        <h1>Atomix Font System Examples</h1>

        <section>
          <FontLoadingExample />
        </section>

        <section>
          <TypographyShowcase />
        </section>

        <section>
          <OptimizedFontLoading />
        </section>
      </div>
    </ThemeProvider>
  );
}

// CSS for the examples
const styles = `
.font-system-examples {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.font-system-examples section {
  margin-bottom: 3rem;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.typography-samples {
  margin-top: 2rem;
}

.typography-samples > * {
  margin-bottom: 1rem;
}

.body-large {
  font-size: 1.125rem;
  line-height: 1.6;
}

.body-base {
  font-size: 1rem;
  line-height: 1.5;
}

.body-small {
  font-size: 0.875rem;
  line-height: 1.4;
}

.code-sample {
  display: block;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-family: var(--font-family-monospace, monospace);
}

.error-message {
  padding: 1rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
}

.loading-status {
  padding: 1rem;
  background: #f0f8ff;
  border-radius: 4px;
  margin: 1rem 0;
}

.font-sample {
  padding: 1rem;
  border: 1px dashed #ccc;
  border-radius: 4px;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
