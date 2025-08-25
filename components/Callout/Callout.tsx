import React from 'react';
import { CalloutProps } from '../../lib/types/components';
import { useCallout } from '../../lib/composables/useCallout';
import { Icon } from '../Icon/Icon';

/**
 * Callout component for displaying important messages, notifications, or alerts
 */
export const Callout: React.FC<CalloutProps> = ({
  title,
  children,
  icon,
  variant = 'primary',
  onClose,
  actions,
  oneLine = false,
  toast = false,
  className,
  ...props
}) => {
  const { generateCalloutClass, handleClose } = useCallout({
    variant,
    oneLine,
    toast,
    className,
  });

  // Determine appropriate ARIA attributes based on variant
  const getAriaAttributes = () => {
    const baseAttributes: Record<string, string> = {
      role: 'region',
    };

    // For toast notifications or alerts, use appropriate role and live region
    if (toast) {
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

  return (
    <div
      className={generateCalloutClass({ variant, oneLine, toast, className })}
      {...getAriaAttributes()}
      {...props}
    >
      <div className="c-callout__content">
        {icon && <div className="c-callout__icon">{icon}</div>}
        <div className="c-callout__message">
          {title && <div className="c-callout__title">{title}</div>}
          {children && <div className="c-callout__text">{children}</div>}
        </div>
      </div>

      {actions && <div className="c-callout__actions">{actions}</div>}

      {onClose && (
        <button className="c-callout__close-btn" onClick={handleClose(onClose)} aria-label="Close">
          <Icon name="X" size="md" />
        </button>
      )}
    </div>
  );
};

Callout.displayName = 'Callout';

export type { CalloutProps };

export default Callout;
