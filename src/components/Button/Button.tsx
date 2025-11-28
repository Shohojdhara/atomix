import React, { ElementType, forwardRef, useCallback, useMemo } from 'react';
import { useButton } from '../../lib/composables/useButton';
import { ButtonProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { Spinner } from '../Spinner/Spinner';
import { BUTTON } from '../../lib/constants/components';

export type ButtonAsProp = {
  as?: ElementType;
  to?: string;
  href?: string;
  [key: string]: any;
};

export const Button = React.memo(
  forwardRef<HTMLButtonElement, ButtonProps & ButtonAsProp>(
    (
      {
        label,
        children,
        onClick,
        variant = 'primary',
        size = 'md',
        disabled = false,
        loading = false,
        loadingText,
        icon,
        iconPosition = 'start',
        iconOnly = false,
        rounded = false,
        fullWidth = false,
        block = false,
        active = false,
        selected = false,
        type = 'button',
        className = '',
        as: Component = 'button',
        glass,
        onHover,
        onFocus,
        onBlur,
        ariaLabel,
        ariaDescribedBy,
        ariaExpanded,
        ariaControls,
        tabIndex,
        style,
        ...props
      },
      ref
    ) => {
      const isDisabled = disabled || loading;

      const { generateButtonClass, handleClick } = useButton({
        variant,
        size,
        disabled: isDisabled,
        rounded,
        glass,
        loading,
        fullWidth,
        block,
        active,
        selected,
      });

      const buttonClass = useMemo(
        () =>
          generateButtonClass({
            variant,
            size,
            disabled: isDisabled,
            rounded,
            iconOnly,
            glass,
            loading,
            fullWidth,
            block,
            active,
            selected,
            className,
          }),
        [variant, size, isDisabled, rounded, iconOnly, glass, loading, fullWidth, block, active, selected, className, generateButtonClass]
      );

      // Handle click with loading check
      const handleClickEvent = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        },
        [isDisabled, onClick]
      );

      // Handle hover
      const handleMouseEnter = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          if (!isDisabled) {
            onHover?.(event);
          }
        },
        [isDisabled, onHover]
      );

      // Handle focus
      const handleFocusEvent = useCallback(
        (event: React.FocusEvent<HTMLButtonElement>) => {
          if (!isDisabled) {
            onFocus?.(event);
          }
        },
        [isDisabled, onFocus]
      );

      // Handle blur
      const handleBlurEvent = useCallback(
        (event: React.FocusEvent<HTMLButtonElement>) => {
          if (!isDisabled) {
            onBlur?.(event);
          }
        },
        [isDisabled, onBlur]
      );

      // Determine button text
      const buttonText = useMemo(() => {
        if (loading && loadingText) return loadingText;
        if (loading && !loadingText) return label || children;
        return label || children;
      }, [loading, loadingText, label, children]);

      // Determine spinner size based on button size
      const spinnerSize = useMemo(() => {
        if (size === 'sm') return 'sm';
        if (size === 'lg') return 'md';
        return 'sm';
      }, [size]);

      // Button content with icon positioning
      const buttonContent = useMemo(() => {
        const iconElement = icon && !loading && (
          <span className={BUTTON.ICON_CLASS} aria-hidden="true">
            {icon}
          </span>
        );

        const spinnerElement = loading && (
          <span className={BUTTON.SPINNER_CLASS} aria-hidden="true">
            <Spinner
              size={spinnerSize}
              variant={
                variant === 'link' || (typeof variant === 'string' && variant.startsWith('outline-'))
                  ? 'primary'
                  : (variant === 'danger' ? 'error' : (variant as any))
              }
            />
          </span>
        );

        const labelElement = !iconOnly && buttonText && (
          <span className={BUTTON.LABEL_CLASS}>{buttonText}</span>
        );

        if (iconPosition === 'end') {
          return (
            <>
              {labelElement}
              {spinnerElement}
              {iconElement}
            </>
          );
        }

        return (
          <>
            {spinnerElement}
            {iconElement}
            {labelElement}
          </>
        );
      }, [icon, iconPosition, iconOnly, buttonText, loading, spinnerSize, variant]);

      // Button props
      const buttonProps = useMemo(
        () => ({
          ref,
          className: buttonClass,
          type: Component === 'button' ? type : undefined,
          onClick: handleClickEvent,
          onMouseEnter: onHover ? handleMouseEnter : undefined,
          onFocus: onFocus ? handleFocusEvent : undefined,
          onBlur: onBlur ? handleBlurEvent : undefined,
          disabled: isDisabled && Component === 'button',
          'aria-disabled': isDisabled,
          'aria-busy': loading,
          'aria-label': ariaLabel || (iconOnly ? label || children : undefined),
          'aria-describedby': ariaDescribedBy,
          'aria-expanded': ariaExpanded,
          'aria-controls': ariaControls,
          tabIndex: tabIndex !== undefined ? tabIndex : (isDisabled ? -1 : 0),
          style,
          ...props,
        }),
        [
          ref,
          buttonClass,
          Component,
          type,
          handleClickEvent,
          handleMouseEnter,
          handleFocusEvent,
          handleBlurEvent,
          isDisabled,
          loading,
          ariaLabel,
          iconOnly,
          label,
          children,
          ariaDescribedBy,
          ariaExpanded,
          ariaControls,
          tabIndex,
          style,
          props,
        ]
      );

      if (glass) {
        // Default glass settings for buttons
        const defaultGlassProps = {
          displacementScale: 20,
          blurAmount: 0,
          saturation: 200,
          elasticity: 0,
        };

        const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

        return (
          <AtomixGlass {...glassProps}>
            <Component {...buttonProps}>{buttonContent}</Component>
          </AtomixGlass>
        );
      }

      return <Component {...buttonProps}>{buttonContent}</Component>;
    }
  )
);

Button.displayName = 'Button';

export type { ButtonProps };

export default Button;
