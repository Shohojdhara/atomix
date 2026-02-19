import { AtomixGlassProps } from './atomixGlass';
import { Size, ThemeColor, BaseComponentProps } from './common';


/**
 * Rating component properties
 */
export interface RatingProps extends BaseComponentProps {
  /**
   * The rating value (0-5)
   */
  value?: number;

  /**
   * Default value for uncontrolled mode
   */
  defaultValue?: number;

  /**
   * Maximum possible rating value
   */
  maxValue?: number;

  /**
   * Whether to allow half-star ratings
   */
  allowHalf?: boolean;

  /**
   * Whether the rating is read-only
   */
  readOnly?: boolean;

  /**
   * Size variant
   */
  size?: Size;

  /**
   * Color variant
   */
  variant?: ThemeColor;

  /**
   * Optional callback when rating changes
   */
  onChange?: (value: number) => void;

  /**
   * Optional label for the rating component (for accessibility)
   */
  label?: string;

  /**
   * ID for the rating component (for accessibility)
   */
  id?: string;

  /**
   * Whether to use the vanilla JS implementation
   */
  useVanillaJS?: boolean;

  /**
   * Glass morphism effect for the rating component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}
