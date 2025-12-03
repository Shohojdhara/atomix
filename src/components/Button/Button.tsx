import React, { ElementType, forwardRef, useCallback, useMemo } from 'react';
import { useButton } from '../../lib/composables/useButton';
import { ButtonProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { Spinner } from '../Spinner/Spinner';
import { Icon, type PhosphorIconsType } from '../Icon/Icon';
import { BUTTON } from '../../lib/constants/components';

export type ButtonAsProp = {
  as?: ElementType;
  to?: string;
  href?: string;
  [key: string]: any;
};

export const Button = React.memo(
  forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & ButtonAsProp>(
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
        iconName,
        iconSize = 'sm',
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
        href,
        target,
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

      // Determine if we should render as a link
      const shouldRenderAsLink = Boolean(href && !isDisabled);

      // Resolve icon element - support both icon (ReactNode) and iconName (string)
      const iconElement = useMemo(() => {
        if (loading) return null;
        if (iconName) {
          return <Icon name={iconName as PhosphorIconsType} size={iconSize} />;
        }
        return icon;
      }, [icon, iconName, iconSize, loading]);

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
        (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event as React.MouseEvent<HTMLButtonElement>);
        },
        [isDisabled, onClick]
      );

      // Handle hover
      const handleMouseEnter = useCallback(
        (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
          if (!isDisabled) {
            onHover?.(event as React.MouseEvent<HTMLButtonElement>);
          }
        },
        [isDisabled, onHover]
      );

      // Handle focus
      const handleFocusEvent = useCallback(
        (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
          if (!isDisabled) {
            onFocus?.(event as React.FocusEvent<HTMLButtonElement>);
          }
        },
        [isDisabled, onFocus]
      );

      // Handle blur
      const handleBlurEvent = useCallback(
        (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
          if (!isDisabled) {
            onBlur?.(event as React.FocusEvent<HTMLButtonElement>);
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
        const iconSpan = iconElement && (
          <span className={BUTTON.ICON_CLASS} aria-hidden="true">
            {iconElement}
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
              {iconSpan}
            </>
          );
        }

        return (
          <>
            {spinnerElement}
            {iconSpan}
            {labelElement}
          </>
        );
      }, [iconElement, iconPosition, iconOnly, buttonText, loading, spinnerSize, variant]);

      // Button props
      const buttonProps = useMemo(
        () => ({
          ref,
          className: buttonClass,
          type: Component === 'button' && !shouldRenderAsLink ? type : undefined,
          onClick: handleClickEvent,
          onMouseEnter: onHover ? handleMouseEnter : undefined,
          onFocus: onFocus ? handleFocusEvent : undefined,
          onBlur: onBlur ? handleBlurEvent : undefined,
          disabled: isDisabled && Component === 'button' && !shouldRenderAsLink,
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

      // Render as anchor if href is provided
      if (shouldRenderAsLink) {
        const { ref: _, ...buttonPropsWithoutRef } = buttonProps;
        const anchorButtonProps = {
          ...buttonPropsWithoutRef,
          type: undefined, 
          disabled: undefined,
        };
        const anchorElement = (
          <a {...anchorButtonProps} ref={ref as React.Ref<HTMLAnchorElement>} href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
            {buttonContent}
          </a>
        );

        if (glass) {
          const defaultGlassProps = {
            displacementScale: 20,
            blurAmount: 0,
            saturation: 200,
            elasticity: 0,
          };
          const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
          return <AtomixGlass {...glassProps}>{anchorElement}</AtomixGlass>;
        }

        return anchorElement;
      }

      // Default button rendering
      if (glass) {
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
