# Atomix Design System Themes

This directory contains all the themes for the Atomix Design System. Each theme is a collection of SCSS files that override or extend the base design system styles.

## Theme Structure

Each theme follows the same structure as the main design system:

```
theme-name/
├── 01-settings/
├── 02-tools/
├── 03-generic/
├── 04-elements/
├── 05-objects/
├── 06-components/
├── 99-utilities/
└── index.scss
```

## Available Themes

- **shaj-default** - The default theme for Atomix Design System
- **boomdevs** - A theme by the BoomDevs team
- **esrar** - A theme by the Esrar team
- **mashroom** - A theme by the Mashroom team
- **yabai** - A theme by the Yabai team

## How Themes Work

Themes work by importing and overriding the base design system styles. Each theme's `index.scss` file:

1. Imports local theme settings that override base settings
2. Imports and forwards base styles with local overrides
3. Combines theme-specific styles with the base design system

## Building Themes

Themes are automatically built when you run the main build command:

```bash
npm run build
```

This generates individual CSS files for each theme in the `dist/themes` directory:
- Expanded CSS for development
- Minified CSS for production

You can also build only the themes with:

```bash
npm run build:themes
```

## Using Themes

To use a theme in your project, import the corresponding CSS file:

```scss
// In your SCSS file
@import '~@shohojdhara/atomix/dist/themes/shaj-default.css';
```

Or in your JavaScript/TypeScript files:

```js
// Import the theme CSS
import '@shohojdhara/atomix/dist/themes/shaj-default.css';
```

## Creating New Themes

To create a new theme:

1. Create a new directory in `src/themes` with your theme name
2. Follow the same structure as existing themes
3. Create an `index.scss` file that imports and overrides base styles
4. Add your theme to the `themes.variants` array in `build.config.js`
5. Run the build process to generate the theme CSS files

## Theme Customization

Themes can customize any aspect of the design system by overriding variables, mixins, or component styles in their respective directories. For example, to customize button styles in your theme:

1. Create a `_buttons.scss` file in `themes/your-theme/06-components/`
2. Override the button styles as needed
3. Import and forward the file in `themes/your-theme/06-components/_index.scss`