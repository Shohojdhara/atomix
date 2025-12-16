/**
 * Enhanced Theme System Example
 * 
 * Demonstrates all the new features:
 * - RTL Support
 * - Component Overrides
 * - White Labeling
 * - Analytics and Monitoring
 */

import React, { useState } from 'react';
import { 
  ThemeProvider, 
  useTheme,
  createTheme,
  RTLManager,
  createRTLManager,
  ComponentOverrideManager,
  createComponentOverrideManager,
  WhiteLabelManager,
  createWhiteLabelManager,
  ThemeAnalytics,
  createThemeAnalytics,
} from '../src/lib/theme';

// Create analytics instance
const analytics = createThemeAnalytics({
  enabled: true,
  trackPerformance: true,
  trackErrors: true,
  onEvent: (event) => {
    console.log('Theme Event:', event);
  },
  onPerformance: (metric) => {
    console.log('Performance Metric:', metric);
  },
});

// Example: Enhanced Theme System Usage
const EnhancedThemeExample: React.FC = () => {
  const { theme, setTheme, availableThemes } = useTheme();
  const [rtlEnabled, setRTLEnabled] = useState(false);

  // Create RTL manager
  const rtlManager = React.useMemo(() => {
    return createRTLManager({
      enabled: rtlEnabled,
      autoDetect: true,
      locale: 'en',
    });
  }, [rtlEnabled]);

  // Create component override manager
  const overrideManager = React.useMemo(() => {
    const manager = createComponentOverrideManager();
    
    // Add some example overrides
    manager.addOverride('Button', {
      styleOverrides: {
        borderRadius: '8px',
        padding: '12px 24px',
      },
      cssVariableOverrides: {
        'button-primary-bg': 'var(--atomix-primary)',
        'button-primary-text': 'var(--atomix-primary-contrast-text)',
      },
    });

    return manager;
  }, []);

  // Create white label manager
  const whiteLabelManager = React.useMemo(() => {
    const manager = createWhiteLabelManager();
    
    manager.configure({
      brand: {
        name: 'My Brand',
        primaryColor: '#7AFFD7',
        secondaryColor: '#FF5733',
        logo: '/logo.png',
        fonts: {
          primary: 'Inter, sans-serif',
        },
      },
      themeOverrides: {
        palette: {
          primary: { main: '#7AFFD7' },
        },
      },
    });

    return manager;
  }, []);

  // Toggle RTL
  const toggleRTL = () => {
    const newState = !rtlEnabled;
    setRTLEnabled(newState);
    rtlManager.setDirection(newState ? 'rtl' : 'ltr');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'var(--atomix-font-family, Inter, sans-serif)' }}>
      <h1>Enhanced Theme System Demo</h1>

      {/* Theme Switcher */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>Theme Switcher</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {availableThemes.map((themeMetadata) => (
            <button
              key={themeMetadata.class || themeMetadata.name}
              onClick={() => {
                const startTime = performance.now();
                setTheme(themeMetadata.class || themeMetadata.name).then(() => {
                  const loadTime = performance.now() - startTime;
                  analytics.trackThemeSwitch(theme || 'none', themeMetadata.class || themeMetadata.name, loadTime);
                });
              }}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: theme === (themeMetadata.class || themeMetadata.name) ? '#007bff' : 'white',
                color: theme === (themeMetadata.class || themeMetadata.name) ? 'white' : 'black',
                cursor: 'pointer',
              }}
            >
              {themeMetadata.name}
            </button>
          ))}
        </div>
        <p>Current Theme: {theme}</p>
      </div>

      {/* RTL Controls */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>RTL Support</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={toggleRTL}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: rtlEnabled ? '#28a745' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {rtlEnabled ? 'Disable RTL' : 'Enable RTL'}
          </button>
          <span>Current Direction: {rtlManager.getDirection()}</span>
          <span>RTL Enabled: {rtlEnabled ? 'Yes' : 'No'}</span>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ textAlign: rtlManager.getDirection() === 'rtl' ? 'right' : 'left' }}>
            This text will align based on the current direction setting.
            {rtlManager.getDirection() === 'rtl' && ' (RTL Mode Active)'}
          </p>
        </div>
      </div>

      {/* Component Overrides */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>Component Overrides</h2>
        <p>Component overrides are configured. Check console for details.</p>
        <button
          onClick={() => {
            const overrides = overrideManager.getAllOverrides();
            console.log('Component Overrides:', overrides);
            const cssVars = overrideManager.getAllCSSVariables();
            console.log('CSS Variables:', cssVars);
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Log Overrides
        </button>
      </div>

      {/* White Label */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>White Label</h2>
        <p>White label configuration is active. Brand: {whiteLabelManager.getConfig()?.brand.name}</p>
        <button
          onClick={() => {
            const config = whiteLabelManager.exportConfig();
            console.log('White Label Config:', config);
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Export Config
        </button>
      </div>

      {/* Analytics */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>Analytics</h2>
        <button
          onClick={() => {
            const events = analytics.getEvents();
            const metrics = analytics.getMetrics();
            console.log('All Events:', events);
            console.log('All Metrics:', metrics);
            
            const avgLoadTime = analytics.getAverageMetric('theme_load_time');
            console.log('Average Load Time:', avgLoadTime, 'ms');
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          View Analytics
        </button>
      </div>
    </div>
  );
};

// Main App
const App: React.FC = () => {
  return (
    <ThemeProvider 
      defaultTheme="shaj-default"
      basePath="/themes"
      rtl={{
        enabled: false,
        autoDetect: true,
      }}
    >
      <EnhancedThemeExample />
    </ThemeProvider>
  );
};

export default App;
