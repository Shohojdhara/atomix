import type { ProgressParts } from '../partProps';
import { Size, ThemeColor, BaseComponentProps } from './common';
import type { ProgressCSSVariable } from '../../constants/cssVariables';
import { AtomixGlassProps } from './atomixGlass';
import type { SlotProps, ProgressRootSlotProps, ProgressBarSlotProps } from '../../patterns/slots';


/**
 * Progress component properties
 */
export interface ProgressProps extends BaseComponentProps {
  /**
   * Progress value (0-100)
   */
  value: number;

  /**
   * Progress bar color variant
   */
  variant?: ThemeColor;

  /**
   * Progress bar size
   */
  size?: Size;

  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;

  /**
   * Glass morphism effect for the progress bar
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Part-based styling for granular customization
   * @example
   * parts={{
   *   root: { className: 'custom-progress', style: { height: '12px' } },
   *   bar: { style: { background: 'linear-gradient(...)' } }
   * }}
   */
  parts?: ProgressParts;

  /**
   * CSS variable overrides for runtime customization
   * @example
   * cssVars={{
   *   '--atomix-progress-bg': '#E0E0E0',
   *   '--atomix-progress-bar-bg': '#7AFFD7'
   * }}
   */
  cssVars?: Partial<Record<ProgressCSSVariable, string | number>>;

  /**
   * Slot-based customization for complete control
   * @example
   * slots={{
   *   root: { render: (props) => <motion.div {...props} /> },
   *   bar: { component: CustomBar }
   * }}
   */
  slots?: {
    root?: SlotProps<ProgressRootSlotProps>;
    bar?: SlotProps<ProgressBarSlotProps>;
  };
}
