import React, { forwardRef, memo } from 'react';
import { TextareaProps } from '../../lib/types/components';
import { useTextarea } from '../../lib/composables/useTextarea';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * Textarea - A component for multiline text input
 */
export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
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
      glass,
    },
    ref
  ) => {
    const { generateTextareaClass } = useTextarea({
      size,
      variant,
      disabled,
      invalid,
      valid,
    });

    const textareaClass = generateTextareaClass({
      className: `${className} ${glass ? 'c-input--glass' : ''}`.trim(),
      size,
      variant,
      disabled,
      invalid,
      valid,
    });

    // Custom styles for glass effect
    const glassStyles = glass ? {} : {};

    const textareaElement = (
      <textarea
        ref={ref}
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
        style={glass ? { ...glassStyles, ...style } : style}
      />
    );

    if (glass) {
      // Default glass settings for textareas
      const defaultGlassProps = {
        displacementScale: 60,
        blurAmount: 1,
        saturation: 180,
        aberrationIntensity: 1,
        cornerRadius: 8,
        mode: 'shader' as const,
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{textareaElement}</AtomixGlass>;
    }

    return textareaElement;
  }
  )
);

Textarea.displayName = 'Textarea';

export type { TextareaProps };

export default Textarea;
