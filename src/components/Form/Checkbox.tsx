import React, { memo, forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { CheckboxProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

const CHECKBOX_CLASSES = {
  BASE: 'c-checkbox',
  INVALID: 'is-error',
  VALID: 'is-valid',
  DISABLED: 'is-disabled',
  MIXED: 'c-checkbox--mixed',
};

export const Checkbox = React.memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    (
      {
        label,
        checked,
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
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        onClick,
        glass,
        ...props
      },
      ref
    ) => {
      // Local ref to handle indeterminate state
      const localRef = useRef<HTMLInputElement>(null);

      // Merge refs
      useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

      // Handle indeterminate
      useEffect(() => {
        if (localRef.current) {
          localRef.current.indeterminate = Boolean(indeterminate);
        }
      }, [indeterminate]);

      // Generate classes
      let validationClass = '';
      if (invalid) {
        validationClass = CHECKBOX_CLASSES.INVALID;
      } else if (valid) {
        validationClass = CHECKBOX_CLASSES.VALID;
      }

      const disabledClass = disabled ? CHECKBOX_CLASSES.DISABLED : '';
      const indeterminateClass = indeterminate ? CHECKBOX_CLASSES.MIXED : '';
      const glassClass = glass ? 'c-checkbox--glass' : '';

      const checkboxClass =
        `${CHECKBOX_CLASSES.BASE} ${validationClass} ${disabledClass} ${indeterminateClass} ${glassClass} ${className}`.trim();

      const inputElement = (
        <input
          ref={localRef}
          type="checkbox"
          className="c-checkbox__input"
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          disabled={disabled}
          required={required}
          id={id}
          name={name}
          value={value}
          aria-label={!label ? ariaLabel : undefined}
          aria-describedby={ariaDescribedBy}
          aria-invalid={invalid}
          {...props}
        />
      );

      let content: React.ReactNode;

      if (id && label) {
        content = (
          <div className={checkboxClass} style={style}>
            {inputElement}
            <label className="c-checkbox__label" htmlFor={id}>
              {label}
            </label>
          </div>
        );
      } else if (label) {
        // Wrap input in label for accessibility when no ID is provided
        content = (
          <label className={checkboxClass} style={style}>
            {inputElement}
            <span className="c-checkbox__label">{label}</span>
          </label>
        );
      } else {
        // No label
        content = (
          <div className={checkboxClass} style={style}>
            {inputElement}
          </div>
        );
      }

      if (glass) {
        const defaultGlassProps = {
          displacementScale: 40,
          blurAmount: 1,
          saturation: 160,
          aberrationIntensity: 0.3,
          borderRadius: 6,
          mode: 'shader' as const,
        };
        const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
        return <AtomixGlass {...glassProps}>{content}</AtomixGlass>;
      }

      return content;
    }
  )
);

Checkbox.displayName = 'Checkbox';

export type { CheckboxProps };

export default Checkbox;
