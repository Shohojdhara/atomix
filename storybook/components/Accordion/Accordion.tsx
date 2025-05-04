import React, { ReactNode, useEffect } from 'react';
import { ACCORDION } from '../../lib/constants/components';
import { useAccordion } from '../../lib/composables/useAccordion';
import { AccordionProps as AccordionPropsType } from '../../lib/types/components';

export type AccordionProps = AccordionPropsType;

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  iconPosition = 'right',
  icon,
  className = '',
}) => {
  const {
    state,
    toggle,
    updatePanelHeight,
    panelRef,
    contentRef,
    generateClassNames,
    generateHeaderClassNames
  } = useAccordion({ defaultOpen, disabled, iconPosition });

  // Handle window resize to adjust panel height
  useEffect(() => {
    const handleResize = () => {
      if (state.isOpen) {
        updatePanelHeight();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.isOpen, updatePanelHeight]);

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
        className={generateHeaderClassNames()}
        onClick={toggle}
        aria-expanded={state.isOpen}
        disabled={disabled}
      >
        <span className="c-accordion__title">{title}</span>
        {icon || defaultIcon}
      </button>
      <div className={ACCORDION.SELECTORS.PANEL.replace('.', '')} ref={panelRef}>
        <div className={ACCORDION.SELECTORS.BODY.replace('.', '')} ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
}; 