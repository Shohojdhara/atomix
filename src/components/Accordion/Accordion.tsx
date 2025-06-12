import React, { ReactNode, useId } from 'react';
import { ACCORDION } from '../../lib/constants/components';
import { useAccordion } from '../../lib/composables/useAccordion';
import { AccordionProps as AccordionPropsType } from '../../lib/types/components';

/**
 * Accordion component for showing/hiding content panels
 * @see AccordionProps in types/components.ts
 */
export type AccordionProps = AccordionPropsType & { 
  /**
   * Controlled open state (overrides defaultOpen)
   */
  isOpen?: boolean;
  /**
   * Callback when open state changes (for controlled mode)
   */
  onOpenChange?: (open: boolean) => void;
};

const Accordion: React.FC<AccordionProps> = ({
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
    generateHeaderClassNames
  } = useAccordion({
    defaultOpen,
    disabled,
    iconPosition,
    isOpen: controlledOpen,
    onOpenChange
  });

  // Default icon
  const defaultIcon = (
    <i className="c-accordion__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

// Default export (primary)
export default Accordion;

// Named export for compatibility
export { Accordion };