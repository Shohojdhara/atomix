import React from 'react';
import { InputProps } from '../../lib/types/components';
import { useInput } from '../../lib/composables/useInput';

/**
 * Input - A component for text input fields
 */
export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  className = '',
  disabled = false,
  required = false,
  readOnly = false,
  id,
  name,
  autoComplete,
  autoFocus = false,
  size = 'md',
  variant,
  invalid = false,
  valid = false,
  maxLength,
  minLength,
  pattern,
  min,
  max,
  step,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const { generateInputClass } = useInput({ 
    size, variant, disabled, invalid, valid
  });
  
  const inputClass = generateInputClass({ 
    className, size, variant, disabled, invalid, valid, type
  });
  
  return (
    <input
      type={type}
      className={inputClass}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      id={id}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      min={min}
      max={max}
      step={step}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={invalid}
    />
  );
};

export default Input; 