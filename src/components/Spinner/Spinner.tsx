import React, { memo, forwardRef } from 'react';
import { SpinnerProps } from '../../lib/types/components';
import { useSpinner } from '../../lib/composables/useSpinner';
import { SPINNER } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export const Spinner = memo(
  forwardRef<HTMLDivElement, SpinnerProps>(
    (
      {
        size = 'md',
        variant = 'primary',
        fullscreen = false,
        className = '',
        style,
        glass,
        'aria-label': ariaLabel,
        role = 'status',
        'aria-live': ariaLive = 'polite',
        'aria-describe': ariaDescribe,
        ...rest
      },
      ref
    ) => {
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
        <div
          ref={ref}
          className={spinnerClass}
          style={style}
          role={role}
          aria-label={ariaLabel || 'Loading'}
          aria-live={ariaLive}
          aria-describe={ariaDescribe}
          {...rest}
        >
          <span className={SPINNER.VISUALLY_HIDDEN}>{ariaLabel || 'Loading content...'}</span>
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
  )
);

export type { SpinnerProps };

Spinner.displayName = 'Spinner';

export default Spinner;
