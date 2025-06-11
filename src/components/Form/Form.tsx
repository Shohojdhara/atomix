import React from 'react';
import { FormProps } from '../../lib/types/components';
import { useForm } from '../../lib/composables/useForm';

/**
 * Form - A component for creating form layouts
 */
const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  onReset,
  className = '',
  disabled = false,
  id,
  method = 'post',
  encType,
  noValidate = false,
  autoComplete = 'on',
}) => {
  const { generateFormClass, handleSubmit, handleReset } = useForm({ 
    disabled 
  });
  
  const formClass = generateFormClass({ className, disabled });
  
  return (
    <form
      id={id}
      className={formClass}
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleReset(onReset)}
      method={method}
      encType={encType}
      noValidate={noValidate}
      autoComplete={autoComplete}
    >
      {children}
    </form>
  );
};

export type { FormProps  };

// Set display name for debugging
Form.displayName = 'Form';

// Default export (primary)
export default Form;

// Named export for compatibility
export { Form };