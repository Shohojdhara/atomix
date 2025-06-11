import React from 'react';
import { FormGroupProps } from '../../lib/types/components';
import { useFormGroup } from '../../lib/composables/useFormGroup';

/**
 * FormGroup - A component for grouping form controls with labels and help text
 */
const FormGroup: React.FC<FormGroupProps> = ({
  children,
  label,
  helperText,
  htmlFor,
  className = '',
  disabled = false,
  required = false,
  invalid = false,
  valid = false,
  size = 'md',
}) => {
  const { generateFormGroupClass } = useFormGroup({ 
    size, disabled, invalid, valid 
  });
  
  const formGroupClass = generateFormGroupClass({ 
    className, disabled, invalid, valid, size 
  });
  
  return (
    <div className={formGroupClass}>
      {label && (
        <label 
          className="c-form-group__label" 
          htmlFor={htmlFor}
        >
          {label}
          {required && <span className="c-form-group__required">*</span>}
        </label>
      )}
      <div className="c-form-group__field">
        {children}
      </div>
      {helperText && (
        <div className="c-form-group__helper">
          {helperText}
        </div>
      )}
    </div>
  );
};

export type { FormGroupProps  };

// Set display name for debugging
FormGroup.displayName = 'FormGroup';

// Default export (primary)
export default FormGroup;

// Named export for compatibility
export { FormGroup };