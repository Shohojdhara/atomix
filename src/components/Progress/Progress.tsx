import React, { forwardRef } from 'react';
import { ProgressProps } from '../../lib/types/components';
import { useProgress } from '../../lib/composables/useProgress';
import { PROGRESS } from '../../lib/constants/components';

const Progress = forwardRef<HTMLDivElement, ProgressProps>((
  {
    value,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ariaLabel = PROGRESS.DEFAULTS.ARIA_LABEL,
  }, 
  ref
) => {
  const { progressValue, progressStyle, progressClasses } = useProgress({
    value,
    variant,
    size,
    className
  });

  return (
    <div
      ref={ref}
      className={progressClasses}
      style={progressStyle}
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
});

export type { ProgressProps  };

// Set display name for debugging
Progress.displayName = 'Progress';

// Default export (primary)
export default Progress;

// Named export for compatibility
export { Progress };
