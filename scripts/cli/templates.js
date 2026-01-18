/**
 * Atomix CLI - Templates and Data
 * Stores component templates and token generation functions
 */

/**
 * Component templates for design system
 */
export const componentTemplates = {
  react: {
    component: (name, options = {}) => `import React, { forwardRef, memo } from 'react';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export interface ${name}Props {
  /**
   * Content to be rendered
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Color variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  
  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Glass effect options
   */
  glass?: boolean | object;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * ${name} component
 */
export const ${name} = memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    ({ 
      children, 
      className = '', 
      size = 'md', 
      variant = 'primary', 
      disabled = false, 
      glass,
      style,
      ...props 
    }, ref) => {
      
      const componentClass = [
        'c-${name.toLowerCase()}',
        \`c-${name.toLowerCase()}--\${size}\`,
        \`c-${name.toLowerCase()}--\${variant}\`,
        disabled && 'is-disabled',
        glass && \`c-${name.toLowerCase()}--glass\`,
        className
      ].filter(Boolean).join(' ');
      
      const content = (
        <div
          ref={ref}
          className={componentClass}
          aria-disabled={disabled}
          style={style}
          {...props}
        >
          {children}
        </div>
      );

      if (glass) {
        return (
          <AtomixGlass 
            className={\`c-${name.toLowerCase()}--glass\`} 
            {...(typeof glass === 'object' ? glass : {})}
          >
            {content}
          </AtomixGlass>
        );
      }

      return content;
    }
  )
);

${name}.displayName = '${name}';

export default ${name};`,

    index: (name) => `export { default as ${name} } from './${name}';
export type { ${name}Props } from './${name}';`,

    story: (name) => `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
    glass: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${name} Component',
    size: 'md',
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Glass: Story = {
  args: {
    ...Default.args,
    glass: true,
  },
};
`,

    test: (name) => `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders children correctly', () => {
    render(<${name}>Test Content</${name}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('applies size variant classes', () => {
    const { container } = render(<${name} size="lg">Content</${name}>);
    const element = container.firstChild;
    expect(element).toHaveClass('c-${name.toLowerCase()}--lg');
  });
  
  it('handles disabled state', () => {
    const { container } = render(<${name} disabled>Content</${name}>);
    const element = container.firstChild;
    expect(element).toHaveAttribute('aria-disabled', 'true');
    expect(element).toHaveClass('is-disabled');
  });
  
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<${name} ref={ref}>Content</${name}>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});`,

    scss: (name) => `// =============================================================================
// ${name.toUpperCase()}
// =============================================================================

.c-${name.toLowerCase()} {
  // Layout
  display: flex;
  align-items: center;
  justify-content: center;
  
  // Spacing
  padding: spacing(3) spacing(4);
  gap: spacing(2);
  
  // Theme
  background-color: var(--atomix-bg-surface);
  color: var(--atomix-text-primary);
  border: 1px solid var(--atomix-border-default);
  border-radius: radius('md');
  
  // Typography
  @include font-size('base');
  
  // Interactions
  transition: all 0.2s ease;
  
  // Themes
  &--primary {
    background-color: var(--atomix-primary);
    color: var(--atomix-primary-content);
    border-color: var(--atomix-primary-dark);
  }
  
  &--secondary {
    background-color: var(--atomix-secondary);
    color: var(--atomix-secondary-content);
    border-color: var(--atomix-secondary-dark);
  }
  
  // Sizes
  &--sm {
    padding: spacing(2) spacing(3);
    @include font-size('sm');
  }
  
  &--lg {
    padding: spacing(4) spacing(5);
    @include font-size('lg');
  }
  
  // State
  &.is-disabled {
    opacity: 0.6;
    pointer-events: none;
    cursor: not-allowed;
  }
  
  // Glass variant
  &--glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
`,

    scssModule: (name) => `` // Disabled/Empty as we prefer global SCSS
  }
};

// Token generation functions
export function generateColorTokens() {
  return `// Custom Color Tokens
// Generated by Atomix CLI
// =============================================================================

// Brand Colors
// Customize these to match your brand identity
$custom-primary-1: #fff9e6 !default;
$custom-primary-2: #fff4cc !default;
$custom-primary-3: #ffe699 !default;
$custom-primary-4: #ffd966 !default;
$custom-primary-5: #ffcc33 !default;
$custom-primary-6: #ffb800 !default; // Main brand color
$custom-primary-7: #e6a600 !default;
$custom-primary-8: #cc9400 !default;
$custom-primary-9: #b38200 !default;
$custom-primary-10: #997000 !default;

// Semantic Colors
$custom-success: #22c55e !default;
$custom-warning: #eab308 !default;
$custom-error: #ef4444 !default;
$custom-info: #3b82f6 !default;

// Neutral Colors
$custom-gray-1: #f9fafb !default;
$custom-gray-2: #f3f4f6 !default;
$custom-gray-3: #e5e7eb !default;
$custom-gray-4: #d1d5db !default;
$custom-gray-5: #9ca3af !default;
$custom-gray-6: #6b7280 !default;
$custom-gray-7: #4b5563 !default;
$custom-gray-8: #374151 !default;
$custom-gray-9: #1f2937 !default;
$custom-gray-10: #111827 !default;

// Background Colors
$custom-body-bg: #ffffff !default;
$custom-body-bg-dark: #1f2937 !default;

// Text Colors
$custom-body-color: $custom-gray-10 !default;
$custom-body-color-dark: #ffffff !default;

// Link Colors
$custom-link-color: $custom-primary-6 !default;
$custom-link-hover-color: $custom-primary-7 !default;

// Border Colors
$custom-border-color: $custom-gray-3 !default;
$custom-border-color-dark: $custom-gray-7 !default;

// Focus Colors
$custom-focus-color: $custom-primary-5 !default;
$custom-focus-color-dark: $custom-primary-4 !default;

// Export custom colors to override defaults
$primary: $custom-primary-6 !default;
$success: $custom-success !default;
$warning: $custom-warning !default;
$error: $custom-error !default;
$info: $custom-info !default;

// Dark mode overrides
$body-bg-dark: $custom-body-bg-dark !default;
$body-color-dark: $custom-body-color-dark !default;
$border-color-dark: $custom-border-color-dark !default;
`;
}

export function generateSpacingTokens() {
  return `// Custom Spacing Tokens
// Generated by Atomix CLI
// =============================================================================

// Base spacing unit (change this to scale all spacing)
$custom-spacing-base: 0.25rem !default; // 4px

// Spacing scale
$custom-spacing-0: 0 !default;
$custom-spacing-1: $custom-spacing-base !default; // 4px
$custom-spacing-2: calc($custom-spacing-base * 2) !default; // 8px
$custom-spacing-3: calc($custom-spacing-base * 3) !default; // 12px
$custom-spacing-4: calc($custom-spacing-base * 4) !default; // 16px
$custom-spacing-5: calc($custom-spacing-base * 5) !default; // 20px
$custom-spacing-6: calc($custom-spacing-base * 6) !default; // 24px
$custom-spacing-7: calc($custom-spacing-base * 7) !default; // 28px
$custom-spacing-8: calc($custom-spacing-base * 8) !default; // 32px
$custom-spacing-9: calc($custom-spacing-base * 9) !default; // 36px
$custom-spacing-10: calc($custom-spacing-base * 10) !default; // 40px
$custom-spacing-11: calc($custom-spacing-base * 11) !default; // 44px
$custom-spacing-12: calc($custom-spacing-base * 12) !default; // 48px
$custom-spacing-14: calc($custom-spacing-base * 14) !default; // 56px
$custom-spacing-16: calc($custom-spacing-base * 16) !default; // 64px
$custom-spacing-20: calc($custom-spacing-base * 20) !default; // 80px
$custom-spacing-24: calc($custom-spacing-base * 24) !default; // 96px
$custom-spacing-28: calc($custom-spacing-base * 28) !default; // 112px
$custom-spacing-32: calc($custom-spacing-base * 32) !default; // 128px
$custom-spacing-36: calc($custom-spacing-base * 36) !default; // 144px
$custom-spacing-40: calc($custom-spacing-base * 40) !default; // 160px
$custom-spacing-44: calc($custom-spacing-base * 44) !default; // 176px
$custom-spacing-48: calc($custom-spacing-base * 48) !default; // 192px
$custom-spacing-52: calc($custom-spacing-base * 52) !default; // 208px
$custom-spacing-56: calc($custom-spacing-base * 56) !default; // 224px
$custom-spacing-60: calc($custom-spacing-base * 60) !default; // 240px
$custom-spacing-64: calc($custom-spacing-base * 64) !default; // 256px

// Component-specific spacing
$custom-button-padding-x: $custom-spacing-4 !default;
$custom-button-padding-y: $custom-spacing-2 !default;
$custom-card-padding: $custom-spacing-6 !default;
$custom-modal-padding: $custom-spacing-8 !default;

// Layout spacing
$custom-container-padding: $custom-spacing-4 !default;
$custom-grid-gap: $custom-spacing-6 !default;
$custom-section-spacing: $custom-spacing-16 !default;

// Export to override defaults
$spacing-sizes: (
  0: $custom-spacing-0,
  1: $custom-spacing-1,
  2: $custom-spacing-2,
  3: $custom-spacing-3,
  4: $custom-spacing-4,
  5: $custom-spacing-5,
  6: $custom-spacing-6,
  7: $custom-spacing-7,
  8: $custom-spacing-8,
  9: $custom-spacing-9,
  10: $custom-spacing-10,
  12: $custom-spacing-12,
  16: $custom-spacing-16,
  20: $custom-spacing-20,
  24: $custom-spacing-24,
  32: $custom-spacing-32,
  40: $custom-spacing-40,
  48: $custom-spacing-48,
  56: $custom-spacing-56,
  64: $custom-spacing-64,
) !default;
`;
}

export function generateTypographyTokens() {
  return `// Custom Typography Tokens
// Generated by Atomix CLI
// =============================================================================

// Font Families
$custom-font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !default;
$custom-font-family-serif: Georgia, "Times New Roman", Times, serif !default;
$custom-font-family-mono: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default;

// Font Size Scale
$custom-font-size-xs: 0.75rem !default; // 12px
$custom-font-size-sm: 0.875rem !default; // 14px
$custom-font-size-base: 1rem !default; // 16px
$custom-font-size-lg: 1.125rem !default; // 18px
$custom-font-size-xl: 1.25rem !default; // 20px
$custom-font-size-2xl: 1.5rem !default; // 24px
$custom-font-size-3xl: 1.875rem !default; // 30px
$custom-font-size-4xl: 2.25rem !default; // 36px
$custom-font-size-5xl: 3rem !default; // 48px
$custom-font-size-6xl: 3.75rem !default; // 60px
$custom-font-size-7xl: 4.5rem !default; // 72px
$custom-font-size-8xl: 6rem !default; // 96px

// Line Heights
$custom-line-height-tight: 1.2 !default;
$custom-line-height-base: 1.5 !default;
$custom-line-height-relaxed: 1.75 !default;
$custom-line-height-loose: 2 !default;

// Font Weights
$custom-font-weight-light: 300 !default;
$custom-font-weight-normal: 400 !default;
$custom-font-weight-medium: 500 !default;
$custom-font-weight-semibold: 600 !default;
$custom-font-weight-bold: 700 !default;
$custom-font-weight-heavy: 800 !default;
$custom-font-weight-black: 900 !default;

// Letter Spacing
$custom-letter-spacing-tight: -0.05em !default;
$custom-letter-spacing-normal: 0 !default;
$custom-letter-spacing-wide: 0.025em !default;
$custom-letter-spacing-wider: 0.05em !default;
$custom-letter-spacing-widest: 0.1em !default;

// Heading Sizes
$custom-h1-font-size: $custom-font-size-5xl !default;
$custom-h2-font-size: $custom-font-size-4xl !default;
$custom-h3-font-size: $custom-font-size-3xl !default;
$custom-h4-font-size: $custom-font-size-2xl !default;
$custom-h5-font-size: $custom-font-size-xl !default;
$custom-h6-font-size: $custom-font-size-lg !default;

// Export to override defaults
$font-family-base: $custom-font-family-sans !default;
$font-family-monospace: $custom-font-family-mono !default;
$font-size-base: $custom-font-size-base !default;
$font-size-sm: $custom-font-size-sm !default;
$font-size-lg: $custom-font-size-lg !default;
$line-height-base: $custom-line-height-base !default;
$font-weight-base: $custom-font-weight-normal !default;

// Heading overrides
$h1-font-size: $custom-h1-font-size !default;
$h2-font-size: $custom-h2-font-size !default;
$h3-font-size: $custom-h3-font-size !default;
$h4-font-size: $custom-h4-font-size !default;
$h5-font-size: $custom-h5-font-size !default;
$h6-font-size: $custom-h6-font-size !default;
`;
}

export function generateShadowTokens() {
  return `// Custom Box Shadow Tokens
// Generated by Atomix CLI
// =============================================================================

// Shadow Colors
$custom-shadow-color: rgba(0, 0, 0, 0.1) !default;
$custom-shadow-color-dark: rgba(0, 0, 0, 0.2) !default;

// Shadow Sizes
$custom-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !default;
$custom-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !default;
$custom-shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !default;
$custom-shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !default;
$custom-shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !default;
$custom-shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !default;
$custom-shadow-2xl: 0 35px 60px -15px rgba(0, 0, 0, 0.3) !default;
$custom-shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06) !default;
$custom-shadow-none: none !default;

// Component-specific shadows
$custom-button-shadow: $custom-shadow-sm !default;
$custom-button-shadow-hover: $custom-shadow-md !default;
$custom-card-shadow: $custom-shadow-base !default;
$custom-dropdown-shadow: $custom-shadow-lg !default;
$custom-modal-shadow: $custom-shadow-xl !default;
$custom-popover-shadow: $custom-shadow-lg !default;
$custom-tooltip-shadow: $custom-shadow-md !default;

// Dark mode shadows
$custom-shadow-xs-dark: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !default;
$custom-shadow-sm-dark: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3) !default;
$custom-shadow-base-dark: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3) !default;
$custom-shadow-lg-dark: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4) !default;
$custom-shadow-xl-dark: 0 25px 50px -12px rgba(0, 0, 0, 0.6) !default;

// Export to override defaults
$box-shadow: $custom-shadow-base !default;
$box-shadow-xs: $custom-shadow-xs !default;
$box-shadow-sm: $custom-shadow-sm !default;
$box-shadow-lg: $custom-shadow-lg !default;
$box-shadow-xl: $custom-shadow-xl !default;
$box-shadow-inset: $custom-shadow-inner !default;

// Dark mode exports
$box-shadow-dark: $custom-shadow-base-dark !default;
$box-shadow-xs-dark: $custom-shadow-xs-dark !default;
$box-shadow-sm-dark: $custom-shadow-sm-dark !default;
$box-shadow-lg-dark: $custom-shadow-lg-dark !default;
$box-shadow-xl-dark: $custom-shadow-xl-dark !default;
`;
}

export function generateRadiusTokens() {
  return `// Custom Border Radius Tokens
// Generated by Atomix CLI
// =============================================================================

// Base radius unit
$custom-radius-base: 0.25rem !default; // 4px

// Radius Scale
$custom-radius-none: 0 !default;
$custom-radius-sm: calc($custom-radius-base * 0.5) !default; // 2px
$custom-radius-base: $custom-radius-base !default; // 4px
$custom-radius-md: calc($custom-radius-base * 1.5) !default; // 6px
$custom-radius-lg: calc($custom-radius-base * 2) !default; // 8px
$custom-radius-xl: calc($custom-radius-base * 3) !default; // 12px
$custom-radius-2xl: calc($custom-radius-base * 4) !default; // 16px
$custom-radius-3xl: calc($custom-radius-base * 6) !default; // 24px
$custom-radius-4xl: calc($custom-radius-base * 8) !default; // 32px
$custom-radius-full: 9999px !default; // Fully rounded

// Component-specific radius
$custom-button-radius: $custom-radius-md !default;
$custom-button-radius-sm: $custom-radius-sm !default;
$custom-button-radius-lg: $custom-radius-lg !default;
$custom-card-radius: $custom-radius-lg !default;
$custom-input-radius: $custom-radius-md !default;
$custom-badge-radius: $custom-radius-full !default;
$custom-chip-radius: $custom-radius-full !default;
$custom-tooltip-radius: $custom-radius-md !default;
$custom-modal-radius: $custom-radius-xl !default;
$custom-dropdown-radius: $custom-radius-lg !default;

// Export to override defaults
$border-radius: $custom-radius-md !default;
$border-radius-sm: $custom-radius-sm !default;
$border-radius-lg: $custom-radius-lg !default;
$border-radius-xl: $custom-radius-xl !default;
$border-radius-xxl: $custom-radius-2xl !default;
$border-radius-3xl: $custom-radius-3xl !default;
$border-radius-4xl: $custom-radius-4xl !default;
$border-radius-pill: $custom-radius-full !default;

// Component radius exports
$btn-border-radius: $custom-button-radius !default;
$btn-border-radius-sm: $custom-button-radius-sm !default;
$btn-border-radius-lg: $custom-button-radius-lg !default;
$card-border-radius: $custom-card-radius !default;
$input-border-radius: $custom-input-radius !default;
$badge-border-radius: $custom-badge-radius !default;
`;
}

export function generateAnimationTokens() {
  return `// Custom Animation Tokens
// Generated by Atomix CLI
// =============================================================================

// Transition Durations
$custom-duration-instant: 0s !default;
$custom-duration-fast: 0.15s !default;
$custom-duration-base: 0.3s !default;
$custom-duration-slow: 0.5s !default;
$custom-duration-slower: 0.7s !default;
$custom-duration-slowest: 1s !default;

// Easing Functions
$custom-ease-linear: linear !default;
$custom-ease-in: cubic-bezier(0.4, 0, 1, 1) !default;
$custom-ease-out: cubic-bezier(0, 0, 0.2, 1) !default;
$custom-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) !default;
$custom-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55) !default;
$custom-ease-smooth: cubic-bezier(0.23, 1, 0.32, 1) !default;

// Transition Properties
$custom-transition-all: all $custom-duration-base $custom-ease-smooth !default;
$custom-transition-colors: background-color $custom-duration-base $custom-ease-smooth, 
                          border-color $custom-duration-base $custom-ease-smooth, 
                          color $custom-duration-base $custom-ease-smooth, 
                          fill $custom-duration-base $custom-ease-smooth, 
                          stroke $custom-duration-base $custom-ease-smooth !default;
$custom-transition-opacity: opacity $custom-duration-base $custom-ease-smooth !default;
$custom-transition-shadow: box-shadow $custom-duration-base $custom-ease-smooth !default;
$custom-transition-transform: transform $custom-duration-base $custom-ease-smooth !default;

// Component-specific transitions
$custom-button-transition: $custom-transition-colors, $custom-transition-shadow, $custom-transition-transform !default;
$custom-link-transition: $custom-transition-colors, text-decoration-color $custom-duration-base $custom-ease-smooth !default;
$custom-input-transition: $custom-transition-colors, $custom-transition-shadow !default;
$custom-card-transition: $custom-transition-shadow, $custom-transition-transform !default;
$custom-modal-transition: $custom-transition-opacity, $custom-transition-transform !default;
$custom-dropdown-transition: $custom-transition-opacity, $custom-transition-transform !default;

// Animation Keyframes (examples)
@keyframes custom-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes custom-slide-in-up {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes custom-scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes custom-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Export to override defaults
$transition-fast: $custom-transition-all !default;
$transition-base: $custom-transition-all !default;
$transition-slow: all $custom-duration-slow $custom-ease-smooth !default;

// Duration exports
$transition-duration-fast: $custom-duration-fast !default;
$transition-duration-base: $custom-duration-base !default;
$transition-duration-slow: $custom-duration-slow !default;

// Easing exports
$easing-base: $custom-ease-smooth !default;
$easing-ease-in-out: $custom-ease-in-out !default;
$easing-ease-out: $custom-ease-out !default;
$easing-ease-in: $custom-ease-in !default;
`;
}
