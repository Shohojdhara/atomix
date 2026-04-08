/**
 * Theme Switching Examples
 * 
 * Comprehensive examples showing different ways to implement theme switching.
 */

import React from 'react';
import {
  // Utilities
  switchTheme,
  toggleTheme,
  initializeTheme,
  getSystemTheme,
  getCurrentTheme,
  listenToSystemTheme,
  
  // Color utilities
  isAccessible,
  getContrastText,
  lighten,
  darken,
  
  // React hook
  useThemeSwitcher,
  
  // Pre-built component
  ThemeToggle,
} from '@shohojdhara/atomix/theme';

// ============================================================================
// Example 1: Simple Icon Toggle (Recommended)
// ============================================================================

export function SimpleExample() {
  return (
    <header>
      <h1>My App</h1>
      {/* Just drop this in - it handles everything! */}
      <ThemeToggle />
    </header>
  );
}

// ============================================================================
// Example 2: Button with Label
// ============================================================================

export function ButtonWithLabelExample() {
  return (
    <ThemeToggle
      variant="button"
      showLabel={true}
      lightLabel="Light Mode"
      darkLabel="Dark Mode"
    />
  );
}

// ============================================================================
// Example 3: Switch/Toggle Style
// ============================================================================

export function SwitchExample() {
  return <ThemeToggle variant="switch" />;
}

// ============================================================================
// Example 4: Custom Render
// ============================================================================

export function CustomRenderExample() {
  return (
    <ThemeToggle
      render={({ isDark, toggle }) => (
        <button onClick={toggle} style={{ padding: '10px 20px' }}>
          {isDark ? '🌙 Switch to Light' : '☀️ Switch to Dark'}
        </button>
      )}
    />
  );
}

// ============================================================================
// Example 5: Using the Hook Directly
// ============================================================================

export function HookExample() {
  const { mode, isDark, toggle, setMode } = useThemeSwitcher({
    enableTransition: true,
    transitionDuration: 300,
  });

  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={toggle}>Toggle Theme</button>
      <button onClick={() => setMode('light')}>Force Light</button>
      <button onClick={() => setMode('dark')}>Force Dark</button>
    </div>
  );
}

// ============================================================================
// Example 6: Sync with System Preference
// ============================================================================

export function SystemSyncExample() {
  const { mode, resetToSystem } = useThemeSwitcher({
    syncWithSystem: true, // Auto-updates when system changes
  });

  return (
    <div>
      <p>Theme: {mode} (synced with system)</p>
      <button onClick={resetToSystem}>Reset to System</button>
    </div>
  );
}

// ============================================================================
// Example 7: Initialize Theme at App Startup
// ============================================================================

export function AppInitializationExample() {
  React.useEffect(() => {
    // Call once at app startup
    const theme = initializeTheme({
      storageKey: 'my-app-theme',
      enableTransition: true,
    });
    
    console.log('Initialized theme:', theme);
  }, []);

  return <div>Your app content</div>;
}

// ============================================================================
// Example 8: Listen for System Changes Manually
// ============================================================================

export function ManualSystemListenerExample() {
  React.useEffect(() => {
    const cleanup = listenToSystemTheme((mode) => {
      console.log('System theme changed to:', mode);
      switchTheme(mode);
    });

    // Clean up on unmount
    return cleanup;
  }, []);

  return <div>Listening for system changes...</div>;
}

// ============================================================================
// Example 9: Check Color Accessibility
// ============================================================================

export function AccessibilityCheckExample() {
  const textColor = '#ffffff';
  const bgColor = '#3b82f6';
  
  const passes = isAccessible(textColor, bgColor, 'small');
  const contrastText = getContrastText(bgColor);
  
  return (
    <div>
      <p>Is accessible: {passes ? '✅ Yes' : '❌ No'}</p>
      <p>Suggested text color: {contrastText}</p>
      
      <div style={{ backgroundColor: bgColor, color: textColor, padding: '20px' }}>
        Sample text
      </div>
    </div>
  );
}

// ============================================================================
// Example 10: Manipulate Colors
// ============================================================================

export function ColorManipulationExample() {
  const baseColor = '#3b82f6';
  const lighter = lighten(baseColor, 20);
  const darker = darken(baseColor, 20);
  
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ backgroundColor: baseColor, padding: '20px' }}>Base</div>
      <div style={{ backgroundColor: lighter, padding: '20px' }}>Lighter</div>
      <div style={{ backgroundColor: darker, padding: '20px' }}>Darker</div>
    </div>
  );
}

// ============================================================================
// Example 11: Complete App Setup
// ============================================================================

export function CompleteAppExample() {
  return (
    <div className="app">
      {/* Header with theme toggle */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1rem 2rem',
      }}>
        <h1>My Application</h1>
        
        {/* Multiple toggle styles */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Theme:</span>
          <ThemeToggle variant="icon" />
          <ThemeToggle variant="button" showLabel />
          <ThemeToggle variant="switch" />
        </div>
      </header>
      
      {/* Main content */}
      <main style={{ padding: '2rem' }}>
        <p>Your themed content here...</p>
      </main>
    </div>
  );
}

// ============================================================================
// Example 12: Advanced - Custom Theme Provider Wrapper
// ============================================================================

interface MyAppProps {
  children: React.ReactNode;
}

export function MyAppProvider({ children }: MyAppProps) {
  // Initialize theme on mount
  React.useEffect(() => {
    initializeTheme({
      storageKey: 'myapp-theme',
      enableTransition: true,
      transitionDuration: 300,
    });
  }, []);

  // Optional: Listen for system changes
  React.useEffect(() => {
    const cleanup = listenToSystemTheme((mode) => {
      // Only auto-switch if user hasn't manually chosen
      const saved = getCurrentTheme('myapp-theme');
      if (!saved || saved === 'system') {
        switchTheme(mode, { storageKey: 'myapp-theme' });
      }
    });
    
    return cleanup;
  }, []);

  return <>{children}</>;
}

// Usage:
// function App() {
//   return (
//     <MyAppProvider>
//       <YourComponents />
//     </MyAppProvider>
//   );
// }

// ============================================================================
// Example 13: Next.js Specific Setup
// ============================================================================

// pages/_app.tsx (Next.js)
/*
import type { AppProps } from 'next/app';
import { initializeTheme } from '@shohojdhara/atomix/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  // Initialize theme on client side
  React.useEffect(() => {
    initializeTheme();
  }, []);

  return <Component {...pageProps} />;
}
*/

// ============================================================================
// Example 14: Gatsby Specific Setup
// ============================================================================

// gatsby-browser.js (Gatsby)
/*
import { initializeTheme } from '@shohojdhara/atomix/theme';

export const onInitialClientRender = () => {
  initializeTheme();
};
*/

// ============================================================================
// Example 15: Vanilla JavaScript
// ============================================================================

// index.js (Vanilla JS)
/*
import { initializeTheme, toggleTheme } from '@shohojdhara/atomix/theme';

// Initialize
initializeTheme();

// Add toggle button
const button = document.createElement('button');
button.textContent = 'Toggle Theme';
button.onclick = () => toggleTheme();
document.body.appendChild(button);
*/
