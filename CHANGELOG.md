# Changelog

## 0.3.11

### Patch Changes

- 7dbaeb5: patchFix fs/promises module resolution error by removing server-side only functions (saveTheme, saveCSSFile, loadThemeFromConfig) from the browser bundle. This makes the library fully compatible with Next.js App Router and other browser environments. Breaking Change: Removed Node.js specific file-system utilities from main exports.

## [0.3.10] - 2026-01-06

### Fixed

- Fixed `Module not found: Can't resolve './lib/config/loader'` by bundling `loadAtomixConfig` instead of treating it as external.

## [0.3.9] - 2026-01-06

### Fixed

- Fixed `Module not found` error by replacing dynamic `require` with static import in `ThemeProvider`. This resolves build issues in external projects (e.g. Next.js).
  All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2025-12-03

### Added

#### Theme Manager System

- **Theme Manager Class**: Core theme management for vanilla JavaScript applications

  - Dynamic theme loading with CSS file management
  - Theme persistence using localStorage
  - Event system for theme changes (`themeChange`, `themeLoad`, `themeError`)
  - Theme preloading for faster switching
  - SSR-safe implementation
  - Comprehensive error handling

- **React Integration**:

  - `ThemeProvider` component for React applications
  - `useTheme` hook for accessing theme state
  - `ThemeContext` for context-based state management
  - Loading and error states
  - Automatic cleanup on unmount

- **TypeScript Support**:

  - Complete type definitions for all theme utilities
  - `ThemeMetadata`, `ThemeManagerConfig`, `ThemeChangeEvent` interfaces
  - Type-safe event system
  - Full IntelliSense support

- **Package Exports**:

  - `@shohojdhara/atomix/theme` - Theme manager utilities

- **Documentation**:

  - Comprehensive theme manager guide (`docs/THEME_MANAGER.md`)
  - React usage examples
  - Vanilla JavaScript examples
  - API reference
  - Migration guide
  - Troubleshooting section

- **Runtime Configuration**:
  - Added runtime section to `themes.config.js`
  - Support for CDN paths
  - Theme preloading configuration
  - Theme dependencies mapping

### Changed

- Updated `README.md` with theme manager usage examples
- Enhanced `themes.config.js` with runtime configuration options
- Updated `src/lib/index.ts` to export theme utilities

### Features

- 🎨 Dynamic theme switching without page reload
- 💾 Automatic theme persistence across sessions
- ⚡ Theme preloading for instant switching
- 🔒 Full TypeScript support
- ♿ SSR compatible (Next.js, Remix, etc.)
- 🎯 Works with React and vanilla JavaScript
- 📦 Zero breaking changes to existing API

## [0.2.9] - 2025-01-29

## [0.2.8] - 2025-01-28

## [0.2.7] - 2025-01-27

## [0.1.25] - 2025-07-02

### Fixed

- Fixed module parse error with undefined exports in ESM build
- Fixed Tooltip component export issue (previously exported as `Tooltip_Tooltip as Tooltip`)
- Added post-build script to ensure all components are properly exported

### Added

- Added support for direct component imports via `@shohojdhara/atomix/components/*`
- Added troubleshooting guide for common issues

## [0.1.18] - 2025-07-03

## [0.1.16] - 2025-07-02

### Added

- Initial release of Atomix Design System
- Core components library with React and vanilla JavaScript support
- Multiple module formats: ESM, CJS, and UMD
- Comprehensive styling with CSS variables and theming support

## [0.1.0] - 2023-06-09

### Added

- Initial public release
