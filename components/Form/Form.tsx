import React from 'react';
import { FormProps } from '../../lib/types/components';
import { useForm } from '../../lib/composables/useForm';

/**
 * Form - A component for creating form layouts
 */
export const Form: React.FC<FormProps> = ({
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
    disabled,
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

export type { FormProps };

Form.displayName = 'Form';

export default Form;
