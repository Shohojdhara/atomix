import React from 'react';
import { SpinnerProps } from '../../lib/types/components';
import { useSpinner } from '../../lib/composables/useSpinner';
import { SPINNER } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  fullscreen = false,
  className = '',
  style,
  glass,
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
    <div className={spinnerClass} style={style} role="status">
      <span className={SPINNER.VISUALLY_HIDDEN}>Loading...</span>
    </div>
  );

  if (glass) {
    const defaultGlassProps = {
      displacementScale: 20,
      blurAmount: 1,
      cornerRadius: 999,
      mode: 'shader' as const,
    };
    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
    return <AtomixGlass {...glassProps}>{spinnerContent}</AtomixGlass>;
  }

  return spinnerContent;
};

export type { SpinnerProps };

Spinner.displayName = 'Spinner';

export default Spinner;
