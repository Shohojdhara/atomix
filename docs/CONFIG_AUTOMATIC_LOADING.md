# Automatic Config Loading - Implementation Summary

**Date:** 2025-01-27  
**Feature:** Automatic loading of `atomix.config.ts` in theme system

---

## Overview

The Atomix theme system uses a **config-first approach**: it loads configuration from `atomix.config.ts` when using `createTheme()` or `<ThemeProvider>` without explicit themes. **Config file is required** - no backward compatibility fallbacks.

---

## What Was Implemented

### 1. Config Token Mapping (`configLoader.ts`)

**Fixed:** `flattenConfigTokens()` function to correctly map config structure to `DesignTokens` format.

**Supports:**
- ✅ Simple colors: `primary: '#7AFFD7'`
- ✅ Palette objects: `primary: { main: '#...', light: '#...', dark: '#...' }`
- ✅ Full color scales: `primary: { 1: '#...', 2: '#...', ..., 10: '#...' }`
- ✅ Spacing, typography, border radius, shadows, z-index, transitions

### 2. Automatic Config Loading in `createTheme()`

**Enhanced:** `createTheme()` function to automatically load from `atomix.config.ts` when no input is provided.

**Features:**
- ✅ Loads config when called without arguments (config file required)
- ✅ Automatically reads `prefix` from config
- ✅ Throws error if config file is not found
- ✅ Config-first approach (no backward compatibility)

**Usage:**
```typescript
// Automatic: Loads from atomix.config.ts
const css = createTheme();
injectTheme(css);

// Manual: Still works as before
const css = createTheme({ 'primary': '#7AFFD7' });
```

### 3. Enhanced `ThemeProvider`

**Enhanced:** `ThemeProvider` component to automatically load from `atomix.config.ts` when `defaultTheme` is not provided.

**Features:**
- ✅ Loads config when `defaultTheme` prop is not provided (config file required)
- ✅ Applies config tokens as DesignTokens
- ✅ Persists to localStorage if enabled
- ✅ Works in Node.js/SSR environments
- ✅ Throws error if config file is not found

**Usage:**
```tsx
// Automatic: Loads from atomix.config.ts
<ThemeProvider>
  <YourApp />
</ThemeProvider>

// Manual: Still works as before
<ThemeProvider defaultTheme={myTheme}>
  <YourApp />
</ThemeProvider>
```

### 4. Updated `ThemeApplicator`

**Enhanced:** `ThemeApplicator` class to use `createTheme()` instead of `generateCSSVariables()` directly.

**Benefits:**
- ✅ Benefits from automatic config loading
- ✅ Consistent behavior across the theme system
- ✅ Maintains backward compatibility

### 5. Documentation Updates

**Updated:**
- ✅ `docs/THEME_SYSTEM.md` - Added automatic config loading examples
- ✅ `docs/getting-started/theme-system.md` - Added quick start guide
- ✅ `atomix.config.ts` - Enhanced with comprehensive examples and documentation

### 6. Test Coverage

**Created:**
- ✅ `src/lib/theme/config/__tests__/configLoader.test.ts` - Tests for config loading
- ✅ `src/lib/theme/core/__tests__/createTheme.test.ts` - Tests for createTheme with config

---

## How It Works

### Config Loading Flow

1. **User calls `createTheme()` or uses `<ThemeProvider>` without explicit theme**
2. **System loads `atomix.config.ts` (required)**
   - In Node.js/SSR: Loads config file
   - In browser: Throws error (config loading requires Node.js/SSR)
3. **Config tokens are flattened to DesignTokens format**
4. **Tokens are merged with defaults**
5. **CSS is generated and applied**

### Environment Handling

- **Node.js/SSR:** Config loading works fully (config file required)
- **Browser:** Config loading throws error (not supported)
- **Build Time:** `generate-tokens.ts` script uses config for build-time generation

---

## Usage Examples

### Example 1: Zero-Configuration Setup

**Step 1:** Create `atomix.config.ts`:
```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: { main: '#7AFFD7' },
      },
    },
  },
});
```

**Step 2:** Use in your app:
```tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Example 2: With createTheme()

```typescript
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

// Automatically loads from atomix.config.ts
const css = createTheme();
injectTheme(css);
```

### Example 3: Custom Prefix

```typescript
// atomix.config.ts
export default defineConfig({
  prefix: 'myapp',
  theme: {
    extend: {
      colors: {
        primary: { main: '#7AFFD7' },
      },
    },
  },
});

// CSS variables will be --myapp-primary instead of --atomix-primary
```

---

## Files Modified

### Core Implementation
- `src/lib/theme/config/configLoader.ts` - Fixed token mapping
- `src/lib/theme/core/createTheme.ts` - Added automatic config loading
- `src/lib/theme/runtime/ThemeProvider.tsx` - Added automatic config loading
- `src/lib/theme/runtime/ThemeApplicator.ts` - Updated to use createTheme()

### Configuration
- `atomix.config.ts` - Enhanced documentation and examples

### Documentation
- `docs/THEME_SYSTEM.md` - Updated with automatic config loading
- `docs/getting-started/theme-system.md` - Updated quick start guide

### Tests
- `src/lib/theme/config/__tests__/configLoader.test.ts` - New test file
- `src/lib/theme/core/__tests__/createTheme.test.ts` - New test file

---

## Benefits

1. **Config-First Approach** - Clear requirement for config file
2. **Consistent API** - Same functions work with or without explicit input
3. **Explicit Errors** - Clear error messages when config is missing
4. **Type Safe** - Full TypeScript support with autocomplete
5. **No Hidden Fallbacks** - Predictable behavior

---

## Migration Guide

### For Existing Users

**Config file is now required** when using `createTheme()` or `<ThemeProvider>` without explicit themes:

```typescript
// This still works (explicit input)
const css = createTheme({ 'primary': '#7AFFD7' });

// This requires atomix.config.ts (config file required)
const css = createTheme();
```

### For New Users

**Config-first approach:** Create config file and use it:

```tsx
// 1. Create atomix.config.ts (required)
// 2. Use ThemeProvider without props
<ThemeProvider>
  <App />
</ThemeProvider>
```

---

## Testing

Run tests with:
```bash
npm test
```

Test files:
- `src/lib/theme/config/__tests__/configLoader.test.ts`
- `src/lib/theme/core/__tests__/createTheme.test.ts`

---

## Future Enhancements

Potential improvements:
- [ ] Config validation with helpful error messages
- [ ] Hot reloading of config in development
- [ ] Config schema validation
- [ ] Better browser environment detection
- [ ] Config caching for performance

---

## Related Documentation

- [Theme System Guide](../THEME_SYSTEM.md)
- [Getting Started](../getting-started/theme-system.md)
- [Configuration Reference](../api/README.md)


