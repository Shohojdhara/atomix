import React, { ReactNode, useId } from 'react';
import { ACCORDION } from '../../lib/constants/components';
import { useAccordion } from '../../lib/composables/useAccordion';
import { BaseComponentProps, IconPosition } from '../../lib/types/components';

/**
 * Accordion component for showing/hiding content panels
 */
export interface AccordionProps extends BaseComponentProps {
  /**
   * Title of the accordion
   */
  title: string;

  /**
   * Content to be shown when accordion is expanded
   */
  children: ReactNode;

  /**
   * Whether the accordion is initially open
   */
  defaultOpen?: boolean;

  /**
   * Position of the icon (right or left)
   */
  iconPosition?: IconPosition;

  /**
   * Custom icon for the accordion
   */
  icon?: ReactNode;

  /**
   * Controlled open state (overrides defaultOpen)
   */
  isOpen?: boolean;

  /**
   * Callback when open state changes (for controlled mode)
   */
  onOpenChange?: (open: boolean) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  isOpen: controlledOpen,
  onOpenChange,
  disabled = false,
  iconPosition = 'right',
  icon,
  className = '',
}) => {
  // Generate unique IDs for accessibility
  const instanceId = useId();
  const buttonId = `accordion-header-${instanceId}`;
  const panelId = `accordion-panel-${instanceId}`;

  // Use composable hook for logic/state
  const {
    state,
    toggle,
    updatePanelHeight,
    panelRef,
    contentRef,
    generateClassNames,
    generateHeaderClassNames,
  } = useAccordion({
    defaultOpen,
    disabled,
    iconPosition,
    isOpen: controlledOpen,
    onOpenChange,
  });

  // Default icon
  const defaultIcon = (
    <i className="c-accordion__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </i>
  );

  return (
    <div className={generateClassNames(className)}>
      <button
        id={buttonId}
        className={generateHeaderClassNames()}
        onClick={toggle}
        aria-expanded={state.isOpen}
        aria-controls={panelId}
        disabled={disabled}
        type="button"
      >
        <span className="c-accordion__title">{title}</span>
        {icon || defaultIcon}
      </button>
      <div
        id={panelId}
        className={ACCORDION.SELECTORS.PANEL.replace('.', '')}
        ref={panelRef}
        role="region"
        aria-labelledby={buttonId}
      >
        <div className={ACCORDION.SELECTORS.BODY.replace('.', '')} ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Set display name for debugging
Accordion.displayName = 'Accordion';

// Export as default
export default Accordion;
