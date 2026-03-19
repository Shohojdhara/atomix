/**
 * types.ts
 *
 * Shared type definitions for AtomixGlass Storybook stories.
 * Provides consistent TypeScript types across all story files.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import type { StoryObj, Meta } from '@storybook/react';
import type { ComponentType, ReactNode } from 'react';
import type AtomixGlass from '../AtomixGlass';

/**
 * Type helper for story props without children requirement
 * Used to create flexible story configurations
 */
export type AtomixGlassStoryProps = Omit<React.ComponentProps<typeof AtomixGlass>, 'children'> & {
  children?: ReactNode;
};

/**
 * Story configuration object for reusable story setups
 */
export interface StoryConfig {
  /** Story title/description */
  description?: string;
  /** Layout mode: centered, fullscreen, or padded */
  layout?: 'centered' | 'fullscreen' | 'padded';
  /** Background image URL or index */
  backgroundImage?: string;
  /** Enable overlay */
  overlay?: boolean;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Custom CSS class names */
  className?: string;
}

/**
 * ArgType category definitions for organized controls panel
 */
export type ArgTypeCategory =
  | 'Content'
  | 'Visual'
  | 'Interaction'
  | 'Style'
  | 'Performance'
  | 'Animation'
  | 'Debug'
  | 'Accessibility'
  | 'Events';

/**
 * Enhanced argType definition with category support
 */
export interface ArgTypeDefinition {
  control: Record<string, unknown>;
  description: string;
  table: {
    category?: ArgTypeCategory;
    defaultValue?: { summary: string };
    type?: { summary: string };
  };
  options?: string[];
  action?: string;
}

/**
 * Background image item for story wrappers
 */
export interface BackgroundImageItem {
  url: string;
  label: string;
  tag: 'dark' | 'colorful' | 'light' | 'nature' | 'abstract';
}

/**
 * Error boundary props for story error handling
 */
export interface StoryErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Preset configuration for quick story setup
 */
export interface GlassPreset {
  name: string;
  description: string;
  args: Partial<AtomixGlassStoryProps>;
}

/**
 * Performance metrics for monitoring story rendering
 */
export interface PerformanceMetrics {
  renderTime: number;
  fps?: number;
  memoryUsage?: number;
  timestamp: number;
}

/**
 * Story decorator function type
 */
export type StoryDecorator<T = unknown> = (
  Story: ComponentType,
  context: { args?: T; globals?: Record<string, unknown> }
) => ReactNode;

/**
 * Helper type for creating typed story objects
 */
export type TypedStory<T extends ComponentType = typeof AtomixGlass> = StoryObj<Meta<T>>;

/**
 * Validation result for story configurations
 */
export interface StoryValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
