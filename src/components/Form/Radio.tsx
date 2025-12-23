import React, { memo } from 'react';
import { RadioProps } from '../../lib/types/components';
import { useRadio } from '../../lib/composables/useRadio';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * Radio - A component for radio button inputs
 */
export const Radio: React.FC<RadioProps> = memo(({
  label,
  checked = false,
  onChange,
  className = '',
  style,
  disabled = false,
  required = false,
  id,
  name,
  value,
  invalid = false,
  valid = false,
  ariaLabel,
  ariaDescribedBy,
  glass,
}) => {
  const { generateRadioClass } = useRadio({
    disabled,
    invalid,
    valid,
  });

  const radioClass = generateRadioClass({
    className: `${className} ${glass ? 'c-radio--glass' : ''}`.trim(),
    disabled,
    invalid,
    valid,
  });

  const radioContent = (
    <div className={radioClass} style={style}>
      <input
        type="radio"
        className="c-radio__input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        id={id}
        name={name}
        value={value}
        aria-label={!label ? ariaLabel : undefined}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid}
      />
      {label && (
        <label className="c-radio__label" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );

  if (glass) {
    // Default glass settings for radio buttons
    const defaultGlassProps = {
      displacementScale: 40,
      blurAmount: 1,
      saturation: 160,
      aberrationIntensity: 0.3,
      cornerRadius: 6,
      mode: 'shader' as const,
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return <AtomixGlass {...glassProps}>{radioContent}</AtomixGlass>;
  }

  return radioContent;
});

export type { RadioProps };

Radio.displayName = 'Radio';

export default Radio;
