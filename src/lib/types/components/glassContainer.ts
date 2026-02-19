import React, { ReactNode } from 'react';
import { MousePosition, GlassSize } from './atomixGlass';
import { Size, BaseComponentProps } from './common';


// ============================================================================
// GLASS CONTAINER COMPONENT TYPES
// ============================================================================

/**
 * Glass container displacement modes
 */
export type GlassMode = 'standard' | 'polar' | 'prominent' | 'shader';


/**
 * Glass container component properties
 */
export interface GlassContainerProps extends BaseComponentProps {
  /**
   * Content to display inside the glass container
   */
  children: ReactNode;

  /**
   * Scale of the displacement effect (0-100)
   * @default 25
   */
  displacementScale?: number;

  /**
   * Amount of blur applied to the backdrop (0-50)
   * @default 12
   */
  blurAmount?: number;

  /**
   * Saturation level of the backdrop filter (0-300%)
   * @default 180
   */
  saturation?: number;

  /**
   * Intensity of chromatic aberration effect (0-10)
   * @default 2
   */
  aberrationIntensity?: number;

  /**
   * Elasticity of mouse interaction effects (0-1)
   * @default 0.15
   */
  elasticity?: number;

  /**
   * Border radius of the glass container
   * @default 999
   */
  cornerRadius?: number;

  /**
   * Padding inside the glass container
   * @default '24px 32px'
   */
  padding?: string;

  /**
   * Size configuration for the glass container
   * @default { width: 270, height: 69 }
   */
  glassSize?: GlassSize;

  /**
   * Displacement map mode
   * @default 'standard'
   */
  mode?: GlassMode;

  /**
   * Whether the container is over a light background
   * @default false
   */
  overLight?: boolean;

  /**
   * Active state of the container
   * @default false
   */
  active?: boolean;

  /**
   * Click handler for the glass container
   */
  onClick?: () => void;

  /**
   * Mouse enter handler
   */
  onMouseEnter?: () => void;

  /**
   * Mouse leave handler
   */
  onMouseLeave?: () => void;

  /**
   * Mouse down handler
   */
  onMouseDown?: () => void;

  /**
   * Mouse up handler
   */
  onMouseUp?: () => void;

  /**
   * External mouse container reference for tracking
   */
  mouseContainer?: React.RefObject<HTMLElement | null>;

  /**
   * External global mouse position
   */
  globalMousePos?: MousePosition;

  /**
   * External mouse offset from container center
   */
  mouseOffset?: MousePosition;

  /**
   * Custom CSS styles
   */
  style?: React.CSSProperties;
}
