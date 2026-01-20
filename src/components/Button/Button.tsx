import React, { ElementType, forwardRef, useCallback } from 'react';
import { useButton } from '../../lib/composables/useButton';
import { ButtonProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { Spinner } from '../Spinner/Spinner';
import { Icon, type PhosphorIconsType } from '../Icon/Icon';
import { BUTTON, THEME_NAMING } from '../../lib/constants/components';
import { ThemeNaming } from '../../lib/utils/themeNaming';

export type ButtonAsProp = {
  as?: ElementType;
  to?: string;
  href?: string;
  LinkComponent?: React.ComponentType<any>;
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
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-expanded': ariaExpanded,
        'aria-controls': ariaControls,
        tabIndex,
        style,
        LinkComponent,
        ...props
      },
      ref
    ) => {
      const isDisabled = disabled || loading;

      // Determine if we should render as a link
      const shouldRenderAsLink = Boolean(href && !isDisabled);

      // Resolve icon element - support both icon (ReactNode) and iconName (string)
      const iconElement = iconName ? <Icon name={iconName as PhosphorIconsType} size={iconSize} /> : icon;

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

      const buttonClass = [
        BUTTON.BASE_CLASS,
        ThemeNaming.variantClass(THEME_NAMING.BUTTON_PREFIX, variant),
        size !== 'md' ? ThemeNaming.sizeClass(THEME_NAMING.BUTTON_PREFIX, size) : '',
        iconOnly ? ThemeNaming.stateClass(THEME_NAMING.BUTTON_PREFIX, THEME_NAMING.ICON_ELEMENT) : '',
        rounded ? ThemeNaming.stateClass(THEME_NAMING.BUTTON_PREFIX, 'rounded') : '',
        isDisabled ? ThemeNaming.stateClass(THEME_NAMING.BUTTON_PREFIX, 'disabled') : '',
        glass ? ThemeNaming.stateClass(THEME_NAMING.BUTTON_PREFIX, 'glass') : '',
        loading ? BUTTON.CLASSES.LOADING : '',
        fullWidth ? BUTTON.CLASSES.FULL_WIDTH : '',
        block ? BUTTON.CLASSES.BLOCK : '',
        active ? BUTTON.CLASSES.ACTIVE : '',
        selected ? BUTTON.CLASSES.SELECTED : '',
        className,
      ]
        .filter(Boolean)
        .join(' ');

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
      const buttonText = loading && loadingText ? loadingText : label || children;

      // Determine spinner size based on button size
      const spinnerSize = size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm';

      // Button content with icon positioning
      const buttonContent = (
        <>
          {loading && (
            <span className={ThemeNaming.bemClass(THEME_NAMING.BUTTON_PREFIX, THEME_NAMING.SPINNER_ELEMENT)} aria-hidden="true">
              <Spinner
                size={spinnerSize}
                variant={
                  variant === 'link' || (typeof variant === 'string' && variant.startsWith('outline-'))
                    ? 'primary'
                    : (variant === 'danger' ? 'error' : (variant as any))
                }
              />
            </span>
          )}
          {iconElement && !loading && (
            <span className={ThemeNaming.bemClass(THEME_NAMING.BUTTON_PREFIX, THEME_NAMING.ICON_ELEMENT)} aria-hidden="true">
              {iconElement}
            </span>
          )}
          {!iconOnly && buttonText && (
            <span className={ThemeNaming.bemClass(THEME_NAMING.BUTTON_PREFIX, THEME_NAMING.LABEL_ELEMENT)}>{buttonText}</span>
          )}
        </>
      );

      // Button props
      const buttonProps = {
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
      };

      // Default glass props
      const defaultGlassProps = {
        displacementScale: 20,
        blurAmount: 0,
        saturation: 200,
        elasticity: 0,
      };
      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      // Render as anchor if href is provided
      if (shouldRenderAsLink) {
        const { ref: _, ...buttonPropsWithoutRef } = buttonProps;
        const anchorButtonProps = {
          ...buttonPropsWithoutRef,
          type: undefined,
          disabled: undefined,
        };

        // Use custom LinkComponent if provided (e.g., Next.js Link)
        if (LinkComponent) {
          const LinkComp = LinkComponent as React.ComponentType<any>;
          const linkProps = {
            ...anchorButtonProps,
            ref: ref as React.Ref<HTMLAnchorElement>,
            href,
            target,
            rel: target === '_blank' ? 'noopener noreferrer' : undefined,
          };

          const linkElement = (
            <LinkComp {...linkProps}>
              {buttonContent}
            </LinkComp>
          );

          return glass ? <AtomixGlass {...glassProps}>{linkElement}</AtomixGlass> : linkElement;
        }

        // Fallback to regular anchor tag
        const anchorElement = (
          <a {...anchorButtonProps} ref={ref as React.Ref<HTMLAnchorElement>} href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
            {buttonContent}
          </a>
        );

        return glass ? <AtomixGlass {...glassProps}>{anchorElement}</AtomixGlass> : anchorElement;
      }

      // Default button rendering
      const buttonElement = (
        <Component {...buttonProps}>{buttonContent}</Component>
      );

      return glass ? <AtomixGlass {...glassProps}>{buttonElement}</AtomixGlass> : buttonElement;
    }
  )
);

Button.displayName = 'Button';

export type { ButtonProps };

export default Button;
