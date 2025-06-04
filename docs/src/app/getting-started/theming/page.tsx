'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import Link from 'next/link'

export default function ThemingPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Theming</h1>
        <p>
          Atomix is designed to be highly customizable to match your brand's visual identity.
          This guide explains how to customize colors, typography, spacing, and other aspects of the design system.
        </p>

        <h2>Theme Architecture</h2>
        <p>
          Atomix uses a token-based theming system built on CSS custom properties (variables). This approach provides:
        </p>
        <ul>
          <li>Easy customization without rebuilding the library</li>
          <li>Runtime theme switching (light/dark mode)</li>
          <li>Consistent visual language across components</li>
          <li>Simplified maintenance through centralized design tokens</li>
        </ul>

        <h2>Default Themes</h2>
        <p>
          Atomix comes with two built-in themes:
        </p>
        <ul>
          <li><strong>Light theme</strong> - Default light color scheme</li>
          <li><strong>Dark theme</strong> - Dark color scheme that automatically applies when <code>data-theme="dark"</code> is set on the <code>html</code> element</li>
        </ul>

        <h2>Customizing with CSS Variables</h2>
        <p>
          The simplest way to customize Atomix is by overriding CSS variables. Create a CSS file with your customizations:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`:root {
  /* Primary colors */
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #2563eb;
  
  /* Neutral colors */
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
  
  /* Font settings */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  /* Border radius */
  --border-radius-sm: 0.125rem;
  --border-radius-md: 0.25rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 1rem;
  
  /* Spacing */
  --spacing-base: 0.25rem;
  
  /* Shadow */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Dark mode overrides */
html[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-primary-light: #93c5fd;
  --color-primary-dark: #3b82f6;
  
  /* Dark mode background colors */
  --color-background: #111827;
  --color-surface: #1f2937;
  
  /* Dark mode text colors */
  --color-text: #f9fafb;
  --color-text-secondary: #d1d5db;
}

/* Component-specific overrides */
.c-btn--primary {
  --btn-primary-background: var(--color-primary);
  --btn-primary-border: var(--color-primary-dark);
  --btn-primary-text: white;
}

.c-card {
  --card-border-radius: var(--border-radius-lg);
}`}</code>
        </pre>

        <p>
          Import this CSS file after the Atomix CSS to apply your customizations:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`// In your app entry file
import '@atomix/react/dist/atomix.css';
import './custom-theme.css'; // Your theme overrides`}</code>
        </pre>

        <h2>SCSS Customization</h2>
        <p>
          For more advanced customization, you can use SCSS variables. This approach requires you to compile Atomix from source.
        </p>

        <h3>Step 1: Install Dependencies</h3>
        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`npm install sass --save-dev`}</code>
        </pre>

        <h3>Step 2: Create a Custom SCSS File</h3>
        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`// custom-atomix.scss

// Override default variables
$color-primary: #ff6b00;
$color-primary-light: #ff8c3c;
$color-primary-dark: #e55d00;

$font-family-base: 'Roboto', sans-serif;
$font-family-heading: 'Montserrat', sans-serif;

$border-radius-md: 0.25rem;
$border-radius-lg: 0.5rem;

// Import Atomix SCSS
@import "~@atomix/react/scss/atomix";

// Additional custom styles
.c-btn {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.c-card {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}`}</code>
        </pre>

        <h3>Step 3: Compile and Import</h3>
        <p>Compile the SCSS file and import it in your application instead of the default CSS.</p>

        <h2>Theme Provider</h2>
        <p>
          Atomix includes a <code>ThemeProvider</code> component that manages theme switching:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`import React from 'react';
import { ThemeProvider } from '@atomix/react';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      {/* Your application */}
    </ThemeProvider>
  );
}

export default App;`}</code>
        </pre>

        <p>The <code>ThemeProvider</code> props include:</p>
        <ul>
          <li><code>defaultTheme</code>: Initial theme ('light' or 'dark')</li>
          <li><code>storageKey</code>: Key to store theme preference in localStorage</li>
          <li><code>disableTransitions</code>: Disable transitions during theme change</li>
        </ul>

        <h2>Creating Multiple Themes</h2>
        <p>
          You can create multiple theme variations by defining different sets of CSS variables:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`/* Default light theme */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  /* other variables */
}

/* Dark theme */
html[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-secondary: #a78bfa;
  /* other dark theme variables */
}

/* High contrast theme */
html[data-theme="high-contrast"] {
  --color-primary: #0047ab;
  --color-secondary: #800080;
  --color-text: #000000;
  --color-background: #ffffff;
  /* high contrast variables */
}

/* Fun theme */
html[data-theme="fun"] {
  --color-primary: #ff5757;
  --color-secondary: #ffbd59;
  --font-family-base: 'Comic Sans MS', cursive;
  /* fun theme variables */
}`}</code>
        </pre>

        <p>
          Then you can switch between themes using the <code>useTheme</code> hook:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`import React from 'react';
import { useTheme } from '@atomix/react';

function ThemeSwitcher() {
  const { setTheme } = useTheme();
  
  return (
    <div className="u-d-flex u-gap-2">
      <button
        className="c-btn c-btn--primary c-btn--sm"
        onClick={() => setTheme('light')}
      >
        Light
      </button>
      <button
        className="c-btn c-btn--primary c-btn--sm"
        onClick={() => setTheme('dark')}
      >
        Dark
      </button>
      <button
        className="c-btn c-btn--primary c-btn--sm"
        onClick={() => setTheme('high-contrast')}
      >
        High Contrast
      </button>
      <button
        className="c-btn c-btn--primary c-btn--sm"
        onClick={() => setTheme('fun')}
      >
        Fun
      </button>
    </div>
  );
}`}</code>
        </pre>

        <h2>Component-Specific Styling</h2>
        <p>
          Most Atomix components expose their own CSS variables for targeted customization:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`/* Button-specific styling */
.c-btn {
  --btn-border-radius: 0; /* Square buttons */
  --btn-font-weight: 500;
  --btn-padding-x: 1.5rem;
}

/* Primary button variant */
.c-btn--primary {
  --btn-primary-background: #ff5722;
  --btn-primary-border: #e64a19;
  --btn-primary-hover-background: #f4511e;
}

/* Card-specific styling */
.c-card {
  --card-border-radius: 1rem;
  --card-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  --card-background: #fafafa;
}`}</code>
        </pre>

        <h2>Typography Customization</h2>
        <p>
          Customize fonts by setting font variables and importing web fonts:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`/* In your HTML head */
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">

/* In your CSS */
:root {
  --font-family-base: 'Poppins', sans-serif;
  --font-family-heading: 'Playfair Display', serif;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}`}</code>
        </pre>

        <h2>Spacing System</h2>
        <p>
          Customize the spacing scale by modifying the base spacing unit:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`:root {
  --spacing-base: 0.25rem; /* 4px at default font size */
  
  /* These are automatically calculated based on spacing-base */
  --spacing-0: 0;
  --spacing-1: calc(var(--spacing-base) * 1); /* 0.25rem */
  --spacing-2: calc(var(--spacing-base) * 2); /* 0.5rem */
  --spacing-3: calc(var(--spacing-base) * 3); /* 0.75rem */
  --spacing-4: calc(var(--spacing-base) * 4); /* 1rem */
  --spacing-5: calc(var(--spacing-base) * 5); /* 1.25rem */
  --spacing-6: calc(var(--spacing-base) * 6); /* 1.5rem */
  /* ... and so on */
}`}</code>
        </pre>

        <h2>Advanced Theme Customization</h2>
        <p>
          For advanced use cases, you can create a complete theme configuration:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`// theme.js
export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    primaryDark: '#2563eb',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#4b5563',
  },
  typography: {
    fontFamily: {
      base: 'Inter, sans-serif',
      heading: 'Inter, sans-serif',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    fontSize: {
      base: '1rem',
      sm: '0.875rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  spacing: {
    base: '0.25rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    default: '0.2s ease-in-out',
  },
};

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: '#60a5fa',
    primaryLight: '#93c5fd',
    primaryDark: '#3b82f6',
    secondary: '#a78bfa',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
  },
  // Inherit other properties from light theme
  ...lightTheme,
};

// Function to apply theme to CSS variables
export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme.name;
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(\`--color-\${key}\`, value);
  });
  
  // Apply other theme properties...
}`}</code>
        </pre>

        <h2>Theming Resources</h2>
        <p>For more information on theming, check out these resources:</p>
        <ul>
          <li>
            <Link href="/design-tokens/colors" className="u-text-primary">
              Color System Documentation
            </Link>
          </li>
          <li>
            <Link href="/design-tokens/typography" className="u-text-primary">
              Typography System Documentation
            </Link>
          </li>
          <li>
            <Link href="/design-tokens/spacing" className="u-text-primary">
              Spacing System Documentation
            </Link>
          </li>
          <li>
            <Link href="/design-tokens/shadows" className="u-text-primary">
              Shadow System Documentation
            </Link>
          </li>
        </ul>
      </div>
    </DocsLayout>
  )
}