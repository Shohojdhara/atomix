/**
 * Component Type Templates
 * Templates for generating TypeScript type definitions
 */

/**
 * Generates TypeScript type definitions for a component
 */
export const typesTemplate = (name: string): string => `import { ReactNode, HTMLAttributes, AriaAttributes } from 'react';

/**
 * Size variants for components
 */
export type ${name}Size = 'sm' | 'md' | 'lg';

/**
 * Color variants for components
 */
export type ${name}Variant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

/**
 * Glass effect configuration
 */
export interface GlassConfig {
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  elasticity?: number;
}

/**
 * Props for the ${name} component
 */
export interface ${name}Props extends HTMLAttributes<HTMLDivElement>, AriaAttributes {
  /** Content to be rendered inside the component */
  children?: ReactNode;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Size variant */
  size?: ${name}Size;
  
  /** Color variant */
  variant?: ${name}Variant;
  
  /** Whether the component is disabled */
  disabled?: boolean;
  
  /** Whether to apply glass morphism effect */
  glass?: boolean | GlassConfig;
  
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Hover handler */
  onHover?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  
  /** State change handler */
  onStateChange?: (state: ${name}State) => void;
}

/**
 * State interface for ${name} component
 */
export interface ${name}State {
  isOpen?: boolean;
  isActive?: boolean;
  isSelected?: boolean;
}
`;

/**
 * Generates constants file for a component
 */
export const constantsTemplate = (name: string): string => `/**
 * ${name} Component Constants
 */

export const ${name.toUpperCase()} = {
  /** Base CSS class name */
  BASE_CLASS: 'c-${name.toLowerCase()}',
  
  /** Class name prefixes */
  PREFIX: 'c-${name.toLowerCase()}--',
  
  /** Element prefixes */
  ELEMENT_PREFIX: '${name.toLowerCase()}__',
  
  /** Available sizes */
  SIZES: ['sm', 'md', 'lg'] as const,
  
  /** Available variants */
  VARIANTS: ['primary', 'secondary', 'success', 'error', 'warning'] as const,
  
  /** Default props */
  DEFAULTS: {
    SIZE: 'md' as const,
    VARIANT: 'primary' as const,
    DISABLED: false,
    GLASS: false,
  },
  
  /** CSS class names */
  CLASSES: {
    LOADING: 'is-loading',
    DISABLED: 'is-disabled',
    ACTIVE: 'is-active',
    SELECTED: 'is-selected',
    OPEN: 'is-open',
    CLOSED: 'is-closed',
    FOCUS: 'has-focus',
    GLASS: 'has-glass',
  },
  
  /** Data attributes */
  DATA: {
    STATE: 'data-state',
    DISABLED: 'aria-disabled',
    LOADING: 'aria-busy',
  },
} as const;

export type ${name}Sizes = typeof ${name.toUpperCase()}.SIZES[number];
export type ${name}Variants = typeof ${name.toUpperCase()}.VARIANTS[number];
`;

/**
 * All type templates
 */
export const componentTypeTemplates = {
  types: typesTemplate,
  constants: constantsTemplate,
};

/**
 * Type for component type templates object
 */
export type ComponentTypeTemplates = typeof componentTypeTemplates;
