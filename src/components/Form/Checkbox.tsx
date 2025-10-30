import React from 'react';
import { CheckboxProps } from '../../lib/types/components';
import { useCheckbox } from '../../lib/composables/useCheckbox';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * Checkbox - A component for checkbox inputs
 */
export const Checkbox: React.FC<CheckboxProps> = ({
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
  indeterminate = false,
  ariaLabel,
  ariaDescribedBy,
  glass,
}) => {
  const { generateCheckboxClass, checkboxRef } = useCheckbox({
    indeterminate,
    disabled,
    invalid,
    valid,
  });

  const checkboxClass = generateCheckboxClass({
    className: `${className} ${glass ? 'c-checkbox--glass' : ''}`.trim(),
    disabled,
    invalid,
    valid,
    indeterminate,
  });

  const checkboxContent = (
    <div className={checkboxClass} style={style}>
      <input
        ref={checkboxRef}
        type="checkbox"
        className="c-checkbox__input"
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
        <label className="c-checkbox__label" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );

  if (glass) {
    // Default glass settings for checkboxes
    const defaultGlassProps = {
      displacementScale: 40,
      blurAmount: 1,
      saturation: 160,
      aberrationIntensity: 0.3,
      cornerRadius: 6,
      mode: 'shader' as const,
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return (
      <AtomixGlass {...glassProps}>
        {checkboxContent}
      </AtomixGlass>
    );
  }

  return checkboxContent;
};

export type { CheckboxProps };

Checkbox.displayName = 'Checkbox';

export default Checkbox;
