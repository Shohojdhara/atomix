import { ElementType, forwardRef } from 'react';
import { useButton } from '../../lib/composables/useButton';
import { ButtonProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export type ButtonAsProp = {
  as?: ElementType;
  to?: string;
  href?: string;
  [key: string]: any;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonAsProp>(
  (
    {
      label,
      children,
      onClick,
      variant = 'primary',
      size = 'md',
      disabled = false,
      icon,
      iconOnly = false,
      rounded = false,
      className = '',
      as: Component = 'button',
      glass,
      style,
      ...props
    },
    ref
  ) => {
    const { generateButtonClass, handleClick } = useButton({
      variant,
      size,
      disabled,
      rounded,
      glass,
    });

    const buttonClass = generateButtonClass({
      variant,
      size,
      disabled,
      rounded,
      iconOnly,
      glass,
      className,
    });

    // Custom styles for glass effect
    const glassStyles = glass ? {} : {};

    // Handle the case when the button is rendered as a link or another component
    const buttonProps = {
      ref,
      className: buttonClass,
      onClick: handleClick(onClick),
      disabled,
      'aria-disabled': disabled,
      style: glass ? { ...glassStyles, ...style } : style,
      ...props,
    };

    const buttonContent = (
      <>
        {icon && <span className="c-btn__icon">{icon}</span>}
        {!iconOnly && <span className="c-btn__label">{label || children}</span>}
      </>
    );

    if (glass) {
      // Default glass settings for buttons
      const defaultGlassProps = {
        displacementScale: 5,
        blurAmount: 0,
        saturation: 200,
        aberrationIntensity: 1,
        cornerRadius: 12,
        overLight: false,
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
);

Button.displayName = 'Button';

export type { ButtonProps };

export default Button;
