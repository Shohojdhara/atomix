/**
 * Browser-Only Configuration Example
 * 
 * ⚠️ IMPORTANT: Config file loading requires Node.js!
 * 
 * This example shows how to use Atomix in browser-only environments
 * where you cannot load atomix.config.ts automatically.
 * 
 * SCENARIOS WHERE THIS APPLIES:
 * - Pure client-side React apps (no SSR)
 * - CodePen, JSFiddle, or other online editors
 * - Static HTML pages without build tools
 * - Browser extensions
 * 
 * SOLUTION: Provide tokens explicitly instead of relying on config file
 */

import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

// ============================================================================
// OPTION 1: Define Tokens Inline
// ============================================================================

const customTokens = {
  // Colors
  '--brand-primary': '#6366f1',
  '--brand-primary-light': '#a5b4fc',
  '--brand-primary-dark': '#4338ca',
  
  '--brand-secondary': '#ec4899',
  '--brand-success': '#22c55e',
  '--brand-error': '#ef4444',
  
  // Spacing
  '--brand-spacing-4': '1rem',
  '--brand-spacing-8': '2rem',
  
  // Typography
  '--brand-font-family-sans': 'Inter, system-ui, sans-serif',
  '--brand-font-size-base': '1rem',
  
  // Add more tokens as needed...
};

// Generate and inject theme
const css = createTheme(customTokens);
injectTheme(css, 'brand-theme');

// ============================================================================
// OPTION 2: Import from JSON File (if using bundler)
// ============================================================================

/*
// tokens.json
{
  "--brand-primary": "#6366f1",
  "--brand-spacing-4": "1rem"
}

// In your app:
import tokens from './tokens.json';
const css = createTheme(tokens);
injectTheme(css);
*/

// ============================================================================
// OPTION 3: Load Config Manually (SSR → Client Hydration)
// ============================================================================

/*
// On server (Node.js):
import { loadConfig } from '@shohojdhara/atomix/config';
const config = loadConfig();

// Pass config to client via props/window
window.__ATOMIX_CONFIG__ = config;

// On client (browser):
const config = window.__ATOMIX_CONFIG__;
const css = createTheme(config.theme?.tokens || {});
injectTheme(css);
*/

// ============================================================================
// OPTION 4: Use ThemeProvider with Inline Tokens
// ============================================================================

/*
import { ThemeProvider } from '@shohojdhara/atomix/theme';

const tokens = {
  '--brand-primary': '#6366f1',
  // ... more tokens
};

function App() {
  return (
    <ThemeProvider defaultTheme={tokens}>
      <YourComponents />
    </ThemeProvider>
  );
}
*/

// ============================================================================
// COMPARISON: Node.js vs Browser
// ============================================================================

/*
NODE.JS / SSR (Automatic):
✅ Can use atomix.config.ts
✅ Auto-loads configuration
✅ Simple code:

   import { createTheme } from '@shohojdhara/atomix/theme';
   const css = createTheme(); // ← Magic happens here

BROWSER ONLY (Manual):
❌ Cannot load atomix.config.ts
❌ Must provide tokens explicitly
✅ Still works, just more code:

   const css = createTheme({ '--brand-primary': '#6366f1' });
*/

export { customTokens };

/**
 * Best Practices for Browser-Only Usage:
 * 
 * 1. ✅ Keep token definitions in a separate file for reusability
 * 2. ✅ Use TypeScript for type safety
 * 3. ✅ Document which tokens you're using
 * 4. ✅ Consider migrating to SSR if possible for better DX
 * 5. ❌ Don't try to use fs.readFileSync in browser
 * 6. ❌ Don't expect automatic config loading
 * 
 * Migration Path:
 * If you later add SSR (Next.js, Remix, etc.), you can:
 * 1. Create atomix.config.ts
 * 2. Replace manual tokens with: createTheme()
 * 3. Everything else stays the same!
 */
