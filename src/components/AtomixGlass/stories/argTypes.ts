/**
 * argTypes.ts
 *
 * Shared argType definitions for AtomixGlass Storybook stories.
 * Provides consistent control configurations across all story files.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import type { ArgTypeDefinition, ArgTypeCategory } from './types';

/**
 * Base argTypes that are common to all AtomixGlass stories
 */
export const baseArgTypes = {
  // Content category
  children: {
    control: 'text',
    description: 'Content to display inside the glass effect',
    table: {
      category: 'Content' as ArgTypeCategory,
      defaultValue: { summary: '-' },
    },
  },

  // Visual category
  displacementScale: {
    control: { type: 'range', min: 0, max: 100, step: 1 },
    description: 'Displacement scale for the glass effect (default: 70)',
    table: {
      category: 'Visual' as ArgTypeCategory,
      defaultValue: { summary: '70' },
    },
  },
  blurAmount: {
    control: { type: 'range', min: 0, max: 10, step: 0.5 },
    description: 'Blur amount for the backdrop (default: 0.0625)',
    table: {
      category: 'Visual' as ArgTypeCategory,
      defaultValue: { summary: '0.0625' },
    },
  },
  saturation: {
    control: { type: 'range', min: 100, max: 300, step: 5 },
    description: 'Saturation percentage for the backdrop (default: 140)',
    table: {
      category: 'Visual' as ArgTypeCategory,
      defaultValue: { summary: '140' },
    },
  },
  aberrationIntensity: {
    control: { type: 'range', min: 0, max: 10, step: 0.1 },
    description: 'Chromatic aberration intensity (default: 2)',
    table: {
      category: 'Visual' as ArgTypeCategory,
      defaultValue: { summary: '2' },
    },
  },
  elasticity: {
    control: { type: 'range', min: 0, max: 1, step: 0.01 },
    description: 'Elasticity factor for mouse interactions (default: 0.15)',
    table: {
      category: 'Visual' as ArgTypeCategory,
      defaultValue: { summary: '0.15' },
    },
  },
  borderRadius: {
    control: { type: 'range', min: 0, max: 50, step: 1 },
    description: 'Corner radius in pixels (default: 20)',
    table: {
      category: 'Visual' as ArgTypeCategory,
      defaultValue: { summary: '20' },
    },
  },
  overLight: {
    control: {
      type: 'select',
      labels: {
        false: 'false (Dark Background)',
        true: 'true (Light Background)',
        auto: 'auto (Auto-detect)',
      },
    },
    options: [false, true, 'auto'],
    description: 'OverLight configuration mode',
    table: {
      category: 'Visual' as ArgTypeCategory,
      defaultValue: { summary: '"auto"' },
      type: { summary: 'boolean | "auto"' },
    },
  },
  mode: {
    control: { type: 'inline-radio', options: ['standard', 'polar', 'prominent', 'shader'] },
    description: 'Glass effect mode (default: "standard")',
    table: {
      category: 'Visual' as ArgTypeCategory,
      defaultValue: { summary: '"standard"' },
    },
  },

  // Style category
  padding: {
    control: { type: 'text' },
    description: 'Padding for the glass component',
    table: {
      category: 'Style' as ArgTypeCategory,
      defaultValue: { summary: '0' },
    },
  },
  height: {
    control: { type: 'text' },
    description: 'Height of the glass component',
    table: {
      category: 'Style' as ArgTypeCategory,
      defaultValue: { summary: 'undefined' },
    },
  },
  width: {
    control: { type: 'text' },
    description: 'Width of the glass component',
    table: {
      category: 'Style' as ArgTypeCategory,
      defaultValue: { summary: 'undefined' },
    },
  },
  className: {
    control: 'text',
    description: 'Additional CSS class names',
    table: {
      category: 'Style' as ArgTypeCategory,
      defaultValue: { summary: '-' },
    },
  },
  style: {
    control: 'object',
    description: 'CSS style object',
    table: {
      category: 'Style' as ArgTypeCategory,
      defaultValue: { summary: '{}' },
    },
  },

  // Interaction category
  onClick: {
    action: 'clicked',
    description: 'Click event handler',
    table: {
      category: 'Interaction' as ArgTypeCategory,
      defaultValue: { summary: '-' },
    },
  },

  // Performance category
  devicePreset: {
    control: { type: 'inline-radio', options: ['performance', 'balanced', 'quality'] },
    description: 'Device preset for responsive optimization (default: "balanced")',
    table: {
      category: 'Performance' as ArgTypeCategory,
      defaultValue: { summary: '"balanced"' },
    },
  },
  disableResponsiveBreakpoints: {
    control: 'boolean',
    description: 'Disable responsive breakpoint system (default: false)',
    table: {
      category: 'Performance' as ArgTypeCategory,
      defaultValue: { summary: 'false' },
    },
  },

  // Animation category (Phase 1)
  withTimeAnimation: {
    control: 'boolean',
    description: 'Enable time-based animation (Phase 1, default: true)',
    table: {
      category: 'Animation' as ArgTypeCategory,
      defaultValue: { summary: 'true' },
    },
  },
  animationSpeed: {
    control: { type: 'range', min: 0, max: 3, step: 0.1 },
    description: 'Animation speed multiplier (Phase 1, default: 1.0)',
    table: {
      category: 'Animation' as ArgTypeCategory,
      defaultValue: { summary: '1.0' },
    },
  },
  withMultiLayerDistortion: {
    control: 'boolean',
    description: 'Enable multi-layer distortion using FBM (Phase 1, default: false)',
    table: {
      category: 'Animation' as ArgTypeCategory,
      defaultValue: { summary: 'false' },
    },
  },
  distortionOctaves: {
    control: { type: 'range', min: 1, max: 8, step: 1 },
    description: 'Number of octaves for FBM distortion (Phase 1, default: 5)',
    table: {
      category: 'Animation' as ArgTypeCategory,
      defaultValue: { summary: '5' },
    },
  },
  distortionLacunarity: {
    control: { type: 'range', min: 1, max: 4, step: 0.1 },
    description: 'Lacunarity for FBM distortion (Phase 1, default: 2.0)',
    table: {
      category: 'Animation' as ArgTypeCategory,
      defaultValue: { summary: '2.0' },
    },
  },
  distortionGain: {
    control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
    description: 'Gain for FBM distortion (Phase 1, default: 0.5)',
    table: {
      category: 'Animation' as ArgTypeCategory,
      defaultValue: { summary: '0.5' },
    },
  },
  distortionQuality: {
    control: { type: 'select', options: ['low', 'medium', 'high', 'ultra'] },
    description: 'Quality preset for FBM distortion (Phase 1, default: "high")',
    table: {
      category: 'Animation' as ArgTypeCategory,
      defaultValue: { summary: '"high"' },
    },
  },

  // Debug category
  debugPerformance: {
    control: 'boolean',
    description: 'Enable performance monitoring dashboard (development only)',
    table: {
      category: 'Debug' as ArgTypeCategory,
      defaultValue: { summary: 'false' },
    },
  },
  debugBorderRadius: {
    control: 'boolean',
    description: 'Debug mode for corner radius extraction',
    table: {
      category: 'Debug' as ArgTypeCategory,
      defaultValue: { summary: 'false' },
    },
  },

  // Accessibility category
  'aria-label': {
    control: 'text',
    description: 'ARIA label for accessibility',
    table: {
      category: 'Accessibility' as ArgTypeCategory,
      defaultValue: { summary: '-' },
    },
  },
  'aria-describedby': {
    control: 'text',
    description: 'ARIA describedby attribute for additional description',
    table: {
      category: 'Accessibility' as ArgTypeCategory,
      defaultValue: { summary: '-' },
    },
  },
  role: {
    control: 'text',
    description: 'ARIA role attribute',
    table: {
      category: 'Accessibility' as ArgTypeCategory,
      defaultValue: { summary: 'undefined' },
    },
  },
  tabIndex: {
    control: 'number',
    description: 'Tab index for keyboard navigation',
    table: {
      category: 'Accessibility' as ArgTypeCategory,
      defaultValue: { summary: '0' },
    },
  },
  reducedMotion: {
    control: 'boolean',
    description: 'Override for reduced motion preference (default: false)',
    table: {
      category: 'Accessibility' as ArgTypeCategory,
      defaultValue: { summary: 'false' },
    },
  },
  highContrast: {
    control: 'boolean',
    description: 'Override for high contrast preference (default: false)',
    table: {
      category: 'Accessibility' as ArgTypeCategory,
      defaultValue: { summary: 'false' },
    },
  },
  withoutEffects: {
    control: 'boolean',
    description: 'Disable all visual effects (default: false)',
    table: {
      category: 'Accessibility' as ArgTypeCategory,
      defaultValue: { summary: 'false' },
    },
  },
} satisfies Record<string, ArgTypeDefinition>;

/**
 * Minimal argTypes for simple stories (excludes advanced features)
 */
export const minimalArgTypes = {
  children: baseArgTypes.children,
  displacementScale: baseArgTypes.displacementScale,
  blurAmount: baseArgTypes.blurAmount,
  saturation: baseArgTypes.saturation,
  aberrationIntensity: baseArgTypes.aberrationIntensity,
  borderRadius: baseArgTypes.borderRadius,
  mode: baseArgTypes.mode,
  padding: baseArgTypes.padding,
  className: baseArgTypes.className,
  onClick: baseArgTypes.onClick,
} satisfies Record<string, ArgTypeDefinition>;

/**
 * Advanced argTypes for playground and testing stories (includes all features)
 */
export const advancedArgTypes = {
  ...baseArgTypes,
  globalMousePosition: {
    control: 'object',
    description: 'External global mouse position { x: number; y: number }',
    table: {
      category: 'Interaction' as ArgTypeCategory,
      defaultValue: { summary: 'undefined' },
    },
  },
  mouseOffset: {
    control: 'object',
    description: 'External mouse offset { x: number; y: number }',
    table: {
      category: 'Interaction' as ArgTypeCategory,
      defaultValue: { summary: 'undefined' },
    },
  },
  mouseContainer: {
    control: false,
    description: 'React ref object for mouse container element',
    table: {
      category: 'Interaction' as ArgTypeCategory,
      defaultValue: { summary: 'undefined' },
    },
  },
} satisfies Record<string, ArgTypeDefinition>;

/**
 * Helper function to pick specific argType categories
 */
export function pickArgTypeCategories<T extends Record<string, ArgTypeDefinition>>(
  argTypes: T,
  categories: ArgTypeCategory[]
): Partial<T> {
  const result: Partial<T> = {};
  Object.entries(argTypes).forEach(([key, value]) => {
    if (value.table?.category && categories.includes(value.table.category)) {
      result[key as keyof T] = value;
    }
  });
  return result;
}

/**
 * Helper function to exclude specific argType categories
 */
export function excludeArgTypeCategories<T extends Record<string, ArgTypeDefinition>>(
  argTypes: T,
  categories: ArgTypeCategory[]
): Partial<T> {
  const result: Partial<T> = {};
  Object.entries(argTypes).forEach(([key, value]) => {
    if (value.table?.category && !categories.includes(value.table.category)) {
      result[key as keyof T] = value;
    }
  });
  return result;
}
