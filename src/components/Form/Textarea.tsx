import React from 'react';
import { TextareaProps } from '../../lib/types/components';
import { useTextarea } from '../../lib/composables/useTextarea';

/**
 * Textarea - A component for multiline text input
 */
const Textarea: React.FC<TextareaProps> = ({
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
  rows = 4,
  cols,
  maxLength,
  minLength,
  size = 'md',
  variant,
  invalid = false,
  valid = false,
  autoFocus = false,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const { generateTextareaClass } = useTextarea({ 
    size, variant, disabled, invalid, valid
  });
  
  const textareaClass = generateTextareaClass({ 
    className, size, variant, disabled, invalid, valid
  });
  
  return (
    <textarea
      className={textareaClass}
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
      rows={rows}
      cols={cols}
      maxLength={maxLength}
      minLength={minLength}
      autoFocus={autoFocus}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={invalid}
    />
  );
};

export type { TextareaProps  };

// Set display name for debugging
Textarea.displayName = 'Textarea';

// Default export (primary)
export default Textarea;

// Named export for compatibility
export { Textarea };