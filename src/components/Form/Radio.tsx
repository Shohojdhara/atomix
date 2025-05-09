import React from 'react';
import { RadioProps } from '../../lib/types/components';
import { useRadio } from '../../lib/composables/useRadio';

/**
 * Radio - A component for radio button inputs
 */
export const Radio: React.FC<RadioProps> = ({
  label,
  checked = false,
  onChange,
  className = '',
  disabled = false,
  required = false,
  id,
  name,
  value,
  invalid = false,
  valid = false,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const { generateRadioClass } = useRadio({
    disabled, invalid, valid
  });
  
  const radioClass = generateRadioClass({
    className, disabled, invalid, valid
  });
  
  return (
    <div className={radioClass}>
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
};

export default Radio; 