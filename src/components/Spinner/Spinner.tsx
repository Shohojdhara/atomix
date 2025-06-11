import React from 'react';
import { SpinnerProps } from '../../lib/types/components';
import { useSpinner } from '../../lib/composables/useSpinner';
import { SPINNER } from '../../lib/constants/components';

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  fullscreen = false,
  className = '',
}) => {
  const { generateSpinnerClass } = useSpinner({ 
    size, variant, fullscreen 
  });
  
  const spinnerClass = generateSpinnerClass({ 
    size, variant, fullscreen, className 
  });
  
  return (
    <div className={spinnerClass} role="status">
      <span className={SPINNER.VISUALLY_HIDDEN}>Loading...</span>
    </div>
  );
};

export type { SpinnerProps  };

// Set display name for debugging
Spinner.displayName = 'Spinner';

// Default export (primary)
export default Spinner;

export { Spinner };