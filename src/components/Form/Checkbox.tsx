import React from 'react';
import { CheckboxProps } from '../../lib/types/components';
import { useCheckbox } from '../../lib/composables/useCheckbox';

/**
 * Checkbox - A component for checkbox inputs
 */
 const Checkbox: React.FC<CheckboxProps> = ({
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
  indeterminate = false,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const { generateCheckboxClass, checkboxRef } = useCheckbox({
    indeterminate, disabled, invalid, valid
  });
  
  const checkboxClass = generateCheckboxClass({
    className, disabled, invalid, valid, indeterminate
  });
  
  return (
    <div className={checkboxClass}>
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
};


export type { CheckboxProps  };

// Set display name for debugging
Checkbox.displayName = 'Checkbox';

// Default export (primary)
export default Checkbox;

// Named export for compatibility
export { Checkbox };