import React, { memo } from 'react';
import { SpinnerProps } from '../../lib/types/components';
import { useSpinner } from '../../lib/composables/useSpinner';
import { SPINNER } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export const Spinner: React.FC<SpinnerProps> = memo(
  ({
    size = 'md',
    variant = 'primary',
    fullscreen = false,
    className = '',
    style,
    glass,
    'aria-label': ariaLabel,
    role = 'status',
  }) => {
    const { generateSpinnerClass } = useSpinner({
      size,
      variant,
      fullscreen,
    });

    const spinnerClass = generateSpinnerClass({
      size,
      variant,
      fullscreen,
      className: `${className} ${glass ? 'c-spinner--glass' : ''}`.trim(),
    });

    const spinnerContent = (
      <div className={spinnerClass} style={style} role={role} aria-label={ariaLabel || 'Loading'}>
        <span className={SPINNER.VISUALLY_HIDDEN}>{ariaLabel || 'Loading...'}</span>
      </div>
    );

    if (glass) {
      const defaultGlassProps = {
        displacementScale: 20,
        blurAmount: 1,
        borderRadius: 999,
        mode: 'shader' as const,
      };
      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
      return <AtomixGlass {...glassProps}>{spinnerContent}</AtomixGlass>;
    }

    return spinnerContent;
  }
);

export type { SpinnerProps };

Spinner.displayName = 'Spinner';

export default Spinner;
