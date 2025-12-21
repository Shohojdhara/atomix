import React, { forwardRef } from 'react';
import { ProgressProps } from '../../lib/types/components';
import { useProgress } from '../../lib/composables/useProgress';
import { PROGRESS } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      variant = 'primary',
      size = 'md',
      className = '',
      style,
      disabled = false,
      ariaLabel = PROGRESS.DEFAULTS.ARIA_LABEL,
      glass,
    },
    ref
  ) => {
    const { progressValue, progressStyle, progressClasses } = useProgress({
      value,
      variant,
      size,
      className,
    });

    const progressContent = (
      <div
        ref={ref}
        className={progressClasses + (glass ? ' c-progress--glass' : '')}
        style={{ ...progressStyle, ...style }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressValue}
        aria-label={ariaLabel}
        aria-disabled={disabled}
      >
        <div className={PROGRESS.CLASSES.BAR}></div>
      </div>
    );

    if (glass) {
      const defaultGlassProps = {
        displacementScale: 30,
        blurAmount: 0.5,
        cornerRadius: 8,
        mode: 'shader' as const,
      };
      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
      return <AtomixGlass {...glassProps}>{progressContent}</AtomixGlass>;
    }

    return progressContent;
  }
);

Progress.displayName = 'Progress';

export type { ProgressProps };

export default Progress;
