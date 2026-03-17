/**
 * SCSS Component Templates
 * Templates for generating SCSS styles following ITCSS methodology
 */

/**
 * Generates a complete SCSS component file following ITCSS and BEM
 */
export const scssComponentTemplate = (name: string): string => {
  const componentName = name.toLowerCase();

  return `@use '../01-settings/settings.config' as config;
@use '../01-settings/settings.${componentName}' as ${componentName};
@use '../01-settings/settings.colors' as colors;
@use '../01-settings/settings.design-tokens' as color-maps;
@use '../01-settings/settings.border-radius' as border-radius;
@use '../02-tools/tools.border-radius' as *;
@use '../02-tools/tools.rem' as *;
@use '../02-tools/tools.background' as *;
@use '../02-tools/tools.color-functions' as *;

.c-${componentName} {
  $root: &;

  // Component CSS Custom Properties
  --#{config.$prefix}${componentName}-padding-x: #{${componentName}.$${componentName}-padding-x};
  --#{config.$prefix}${componentName}-padding-y: #{${componentName}.$${componentName}-padding-y};
  --#{config.$prefix}${componentName}-gap: #{${componentName}.$${componentName}-gap};
  --#{config.$prefix}${componentName}-font-family: #{${componentName}.$${componentName}-font-family};
  --#{config.$prefix}${componentName}-font-size: #{${componentName}.$${componentName}-font-size};
  --#{config.$prefix}${componentName}-font-weight: #{${componentName}.$${componentName}-font-weight};
  --#{config.$prefix}${componentName}-line-height: #{${componentName}.$${componentName}-line-height};
  --#{config.$prefix}${componentName}-color: #{${componentName}.$${componentName}-color};
  --#{config.$prefix}${componentName}-bg: #{${componentName}.$${componentName}-bg};
  --#{config.$prefix}${componentName}-border-width: #{${componentName}.$${componentName}-border-width};
  --#{config.$prefix}${componentName}-border-color: #{${componentName}.$${componentName}-border-color};
  --#{config.$prefix}${componentName}-border-radius: #{${componentName}.$${componentName}-border-radius};
  --#{config.$prefix}${componentName}-transition: #{${componentName}.$${componentName}-transition};
  --#{config.$prefix}${componentName}-disabled-opacity: #{${componentName}.$${componentName}-disabled-opacity};

  // Base component styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--#{config.$prefix}${componentName}-gap);
  padding: var(--#{config.$prefix}${componentName}-padding-y) var(--#{config.$prefix}${componentName}-padding-x);
  font-family: var(--#{config.$prefix}${componentName}-font-family);
  font-size: var(--#{config.$prefix}${componentName}-font-size);
  font-weight: var(--#{config.$prefix}${componentName}-font-weight);
  line-height: var(--#{config.$prefix}${componentName}-line-height);
  color: var(--#{config.$prefix}${componentName}-color);
  background: var(--#{config.$prefix}${componentName}-bg);
  border: var(--#{config.$prefix}${componentName}-border-width) solid var(--#{config.$prefix}${componentName}-border-color);
  border-radius: var(--#{config.$prefix}${componentName}-border-radius);
  transition: var(--#{config.$prefix}${componentName}-transition);
  cursor: pointer;

  // Size variants
  &--sm {
    --#{config.$prefix}${componentName}-padding-x: #{${componentName}.$${componentName}-sm-padding-x};
    --#{config.$prefix}${componentName}-padding-y: #{${componentName}.$${componentName}-sm-padding-y};
    --#{config.$prefix}${componentName}-font-size: #{${componentName}.$${componentName}-sm-font-size};
  }

  &--lg {
    --#{config.$prefix}${componentName}-padding-x: #{${componentName}.$${componentName}-lg-padding-x};
    --#{config.$prefix}${componentName}-padding-y: #{${componentName}.$${componentName}-lg-padding-y};
    --#{config.$prefix}${componentName}-font-size: #{${componentName}.$${componentName}-lg-font-size};
  }

  // Color variants
  &--primary {
    --#{config.$prefix}${componentName}-color: #{${componentName}.$${componentName}-primary-color};
    --#{config.$prefix}${componentName}-bg: #{${componentName}.$${componentName}-primary-bg};
    --#{config.$prefix}${componentName}-border-color: #{${componentName}.$${componentName}-primary-border};
  }

  &--secondary {
    --#{config.$prefix}${componentName}-color: #{${componentName}.$${componentName}-secondary-color};
    --#{config.$prefix}${componentName}-bg: #{${componentName}.$${componentName}-secondary-bg};
    --#{config.$prefix}${componentName}-border-color: #{${componentName}.$${componentName}-secondary-border};
  }

  // Interactive states
  &:hover {
    @if ${componentName}.$${componentName}-enable-hover {
      background: tint(var(--#{config.$prefix}${componentName}-bg), 10%);
      border-color: tint(var(--#{config.$prefix}${componentName}-border-color), 15%);
    }
  }

  &:focus {
    outline: 2px solid var(--atomix-focus-color);
    outline-offset: 2px;
  }

  &:active {
    background: shade(var(--#{config.$prefix}${componentName}-bg), 10%);
  }

  // Disabled state
  &.is-disabled,
  &[aria-disabled="true"] {
    opacity: var(--#{config.$prefix}${componentName}-disabled-opacity);
    cursor: not-allowed;
    pointer-events: none;
  }

  // Glass variant (auto-generated from glass-generator)
  &--glass {
    background: var(--#{config.$prefix}${componentName}-glass-bg, rgba(255, 255, 255, 0.1));
    backdrop-filter: var(--#{config.$prefix}${componentName}-glass-backdrop, blur(10px) saturate(200%));
    border-color: var(--#{config.$prefix}${componentName}-glass-border, rgba(255, 255, 255, 0.2));
    
    @media (prefers-reduced-transparency: reduce) {
      background: var(--#{config.$prefix}${componentName}-glass-fallback, rgba(255, 255, 255, 0.8));
      backdrop-filter: none;
    }
    
    &:hover:not(:disabled) {
      background: var(--#{config.$prefix}${componentName}-glass-hover, rgba(255, 255, 255, 0.15));
    }
  }

  // Animation variants (auto-generated from motion-generator)
  &--animate-fade-in {
    animation: atomix-fade-in var(--atomix-duration-base) var(--atomix-easing-smooth);
  }
  
  &--animate-slide-in-up {
    animation: atomix-slide-in-up var(--atomix-duration-slow) var(--atomix-easing-smooth);
  }
  
  &--animate-scale-in {
    animation: atomix-scale-in var(--atomix-duration-base) var(--atomix-easing-smooth);
  }
  
  &--animate-pulse {
    animation: atomix-pulse 2s var(--atomix-easing-smooth) infinite;
  }
  
  &--animate-shimmer {
    animation: atomix-shimmer 2s linear infinite;
    background: linear-gradient(
      90deg,
      var(--atomix-color-neutral-100) 0%,
      var(--atomix-color-neutral-200) 50%,
      var(--atomix-color-neutral-100) 100%
    );
    background-size: 200% 100%;
  }

  // Motion preferences - reduced motion
  @media (prefers-reduced-motion: reduce) {
    &,
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  // Data states
  &[data-state="open"] {
    // Open state styles
  }

  &[data-state="closed"] {
    // Closed state styles
  }
}
`;
};

/**
 * Generates SCSS settings file for a component
 */
export const scssSettingsTemplate = (name: string): string => {
  const componentName = name.toLowerCase();

  return `// ${name} Component Settings
// Located in src/styles/01-settings/_settings.${componentName}.scss

@use 'sass:map';
@use 'settings.colors' as *;
@use 'settings.spacing' as spacing;
@use 'settings.border-radius' as *;
@use 'settings.typography' as *;
@use '../02-tools/tools.color-functions' as *;

// Component-specific variables
$${componentName}-padding-x: map.get(spacing.$spacing-sizes, 3) !default;
$${componentName}-padding-y: map.get(spacing.$spacing-sizes, 2) !default;
$${componentName}-gap: map.get(spacing.$spacing-sizes, 2) !default;
$${componentName}-font-family: $font-family-base !default;
$${componentName}-font-size: $font-size-base !default;
$${componentName}-font-weight: $font-weight-normal !default;
$${componentName}-line-height: $line-height-base !default;
$${componentName}-color: $text-primary !default;
$${componentName}-bg: $surface !default;
$${componentName}-border-width: 1px !default;
$${componentName}-border-color: $border-default !default;
$${componentName}-border-radius: $border-radius-md !default;
$${componentName}-transition: all 0.2s ease !default;
$${componentName}-disabled-opacity: 0.6 !default;
$${componentName}-enable-hover: true !default;

// Size variants
$${componentName}-sm-padding-x: map.get(spacing.$spacing-sizes, 2) !default;
$${componentName}-sm-padding-y: map.get(spacing.$spacing-sizes, 1) !default;
$${componentName}-sm-font-size: $font-size-sm !default;

$${componentName}-lg-padding-x: map.get(spacing.$spacing-sizes, 4) !default;
$${componentName}-lg-padding-y: map.get(spacing.$spacing-sizes, 3) !default;
$${componentName}-lg-font-size: $font-size-lg !default;

// Color variants
$${componentName}-primary-bg: $primary !default;
$${componentName}-primary-color: color-contrast($primary) !default;
$${componentName}-primary-border: shade($primary, 10%) !default;

$${componentName}-secondary-bg: $secondary !default;
$${componentName}-secondary-color: color-contrast($secondary) !default;
$${componentName}-secondary-border: shade($secondary, 10%) !default;

// Glass variant
$${componentName}-glass-bg: rgba(255, 255, 255, 0.1) !default;
$${componentName}-glass-border: rgba(255, 255, 255, 0.2) !default;
$${componentName}-glass-backdrop: blur(10px) !default;
`;
};

/**
 * Combines both component and settings templates
 */
export const scssTemplate = (name: string) => {
  return {
    component: scssComponentTemplate(name),
    settings: scssSettingsTemplate(name),
  };
};

/**
 * All SCSS component templates
 */
export const scssComponentTemplates = {
  component: scssComponentTemplate,
  settings: scssSettingsTemplate,
  full: scssTemplate,
};

/**
 * Type for SCSS component templates object
 */
export type ScssComponentTemplates = typeof scssComponentTemplates;
