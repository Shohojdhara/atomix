import { AtomixGlassProps } from './atomixGlass';
import { Size, ThemeColor, BaseComponentProps } from './common';


/**
 * Spinner component properties
 */
export interface SpinnerProps extends BaseComponentProps {
  /**
   * Spinner color variant
   * @default 'primary'
   */
  variant?: ThemeColor;

  /**
   * Spinner size
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the spinner should be displayed fullscreen
   */
  fullscreen?: boolean;

  /**
   * Accessible label for screen readers
   * @default 'Loading'
   */
  'aria-label'?: string;

  /**
   * ARIA role for the spinner
   * @default 'status'
   */
  role?: 'status' | 'alert';

  /**
   * Glass morphism effect for the spinner
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}
