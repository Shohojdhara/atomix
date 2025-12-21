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
} from '@shohojdhara/atomix/theme';

// Note: Advanced features like ComponentOverrideManager, WhiteLabelManager, and ThemeAnalytics
// are documented but not yet implemented. This example focuses on core theme features.

// Example: Enhanced Theme System Usage
const EnhancedThemeExample: React.FC = () => {
  const { theme, setTheme, availableThemes } = useTheme();
  const [rtlEnabled, setRTLEnabled] = useState(false);

  // Create RTL manager
  const rtlManager = React.useMemo(() => {
    return new RTLManager({
      enabled: rtlEnabled,
      direction: rtlEnabled ? 'rtl' : 'ltr',
      autoDetect: true,
      locale: 'en',
    });
  }, [rtlEnabled]);

  // Note: Component Override Manager and White Label Manager are not yet implemented
  // These features are documented but will be added in future releases

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
                setTheme(themeMetadata.class || themeMetadata.name);
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

      {/* Note: Advanced Features */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>Advanced Features</h2>
        <p>Component Overrides, White Label, and Analytics features are documented but not yet implemented.</p>
        <p>These features will be added in future releases. For now, this example demonstrates:</p>
        <ul>
          <li>Theme switching</li>
          <li>RTL support</li>
          <li>CSS variable usage</li>
        </ul>
      </div>
    </div>
  );
};

// Main App
const App: React.FC = () => {
  return (
    <ThemeProvider
      defaultTheme=""
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
