import React, { memo, forwardRef } from 'react';
import { CalloutProps } from '../../lib/types/components';
import { useCallout } from '../../lib/composables/useCallout';
import { Icon } from '../Icon/Icon';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

// Subcomponents
export const CalloutIcon = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-callout__icon ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
CalloutIcon.displayName = 'CalloutIcon';

export const CalloutMessage = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-callout__message ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
CalloutMessage.displayName = 'CalloutMessage';

export const CalloutTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-callout__title ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
CalloutTitle.displayName = 'CalloutTitle';

export const CalloutText = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-callout__text ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
CalloutText.displayName = 'CalloutText';

export const CalloutActions = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-callout__actions ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
CalloutActions.displayName = 'CalloutActions';

export interface CalloutCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const CalloutCloseButton = forwardRef<HTMLButtonElement, CalloutCloseButtonProps>(
  ({ onClick, className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`c-callout__close-btn ${className}`.trim()}
      onClick={onClick}
      aria-label="Close"
      {...props}
    >
      <Icon name="X" size="md" />
    </button>
  )
);
CalloutCloseButton.displayName = 'CalloutCloseButton';

// Wrapper for content (icon + message)
export const CalloutContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-callout__content ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
CalloutContent.displayName = 'CalloutContent';

/**
 * Callout component for displaying important messages, notifications, or alerts
 */
type CalloutComponent = React.FC<CalloutProps> & {
  Icon: typeof CalloutIcon;
  Message: typeof CalloutMessage;
  Title: typeof CalloutTitle;
  Text: typeof CalloutText;
  Actions: typeof CalloutActions;
  CloseButton: typeof CalloutCloseButton;
  Content: typeof CalloutContent;
};

export const Callout: CalloutComponent = memo(
  ({
    title,
    children,
    icon,
    variant = 'primary',
    onClose,
    actions,
    compact = false,
    isToast = false,
    glass,
    className,
    style,
    ...props
  }: CalloutProps) => {
    const { generateCalloutClass, handleClose } = useCallout({
      variant,
      compact,
      isToast,
      glass,
      className,
      style,
    });

    // Determine appropriate ARIA attributes based on variant
    const getAriaAttributes = () => {
      const baseAttributes: Record<string, string> = {
        role: 'region',
      };

      // For toast notifications or alerts, use appropriate role and live region
      if (isToast) {
        baseAttributes.role = 'alert';
        baseAttributes['aria-live'] = 'polite';
      } else if (['warning', 'error'].includes(variant)) {
        baseAttributes.role = 'alert';
        baseAttributes['aria-live'] = 'assertive';
      } else if (['info', 'success'].includes(variant)) {
        baseAttributes.role = 'status';
        baseAttributes['aria-live'] = 'polite';
      }

      return baseAttributes;
    };

    // Check for compound usage
    const hasCompoundComponents = React.Children.toArray(children).some((child) =>
      React.isValidElement(child) &&
      [
        'CalloutIcon',
        'CalloutMessage',
        'CalloutTitle',
        'CalloutText',
        'CalloutActions',
        'CalloutContent',
      ].includes((child.type as any).displayName)
    );

    const calloutContent = hasCompoundComponents ? (
      children
    ) : (
      <>
        <div className="c-callout__content">
          {icon && <div className="c-callout__icon">{icon}</div>}
          <div className="c-callout__message">
            {title && <div className="c-callout__title">{title}</div>}
            {children && <div className="c-callout__text">{children}</div>}
          </div>
        </div>

        {actions && <div className="c-callout__actions">{actions}</div>}

        {onClose && (
          <button
            className="c-callout__close-btn"
            onClick={handleClose(onClose)}
            aria-label="Close"
          >
            <Icon name="X" size="md" />
          </button>
        )}
      </>
    );

    if (glass) {
      // Default glass settings for callouts
      const defaultGlassProps = {
        displacementScale: 30,
        cornerRadius: 8,
        elasticity: 0,
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return (
        <div
          className={generateCalloutClass({ variant, compact, isToast, glass, className })}
          {...getAriaAttributes()}
          {...props}
          style={style}
        >
          <AtomixGlass {...glassProps}>
            <div
              className="c-callout__glass-content"
              style={{ borderRadius: glassProps.cornerRadius }}
            >
              {calloutContent}
            </div>
          </AtomixGlass>
        </div>
      );
    }

    return (
      <div
        className={generateCalloutClass({ variant, compact, isToast, glass, className })}
        {...getAriaAttributes()}
        {...props}
        style={style}
      >
        {calloutContent}
      </div>
    );
  }
) as unknown as CalloutComponent;

Callout.displayName = 'Callout';

// Attach subcomponents
Callout.Icon = CalloutIcon;
Callout.Message = CalloutMessage;
Callout.Title = CalloutTitle;
Callout.Text = CalloutText;
Callout.Actions = CalloutActions;
Callout.CloseButton = CalloutCloseButton;
Callout.Content = CalloutContent;

export type { CalloutProps };

export default Callout;
