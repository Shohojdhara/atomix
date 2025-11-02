import React, { forwardRef } from 'react';
import { InputProps } from '../../lib/types/components';
import { useInput } from '../../lib/composables/useInput';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * Input - A component for text input fields
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      value,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      className = '',
      style,
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
      glass,
    },
    ref
  ) => {
    const { generateInputClass } = useInput({
      size,
      variant,
      disabled,
      invalid,
      valid,
    });

    const inputClass = generateInputClass({
      className: `${className} ${glass ? 'c-input--glass' : ''}`.trim(),
      size,
      variant,
      disabled,
      invalid,
      valid,
      type,
    });

    // Custom styles for glass effect
    const glassStyles = glass ? {} : {};

    const inputElement = (
      <input
        ref={ref}
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
        style={glass ? { ...glassStyles, ...style } : style}
      />
    );

    if (glass) {
      // Default glass settings for inputs
      const defaultGlassProps = {
        displacementScale: 60,
        blurAmount: 1,
        saturation: 180,
        aberrationIntensity: 0.2,
        cornerRadius: 12,
        mode: 'shader' as const,
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{inputElement}</AtomixGlass>;
    }

    return inputElement;
  }
);

Input.displayName = 'Input';

export type { InputProps };

export default Input;
