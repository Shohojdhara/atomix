import React, { ReactNode, useId, memo } from 'react';
import { ACCORDION } from '../../lib/constants/components';
import { useAccordion } from '../../lib/composables/useAccordion';
import type {
  AccordionProps as AccordionPropsType,
  AtomixGlassProps,
} from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export type AccordionProps = AccordionPropsType;

export const Accordion: React.FC<AccordionProps> = memo(
  ({
    title,
    children,
    defaultOpen = false,
    isOpen: controlledOpen,
    onOpenChange,
    onOpen,
    onClose,
    disabled = false,
    iconPosition = 'right',
    icon,
    className = '',
    style,
    glass,
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
      onOpen,
      onClose,
    });

    // Default icon
    const defaultIcon = (
      <i className="c-accordion__icon" aria-hidden="true">
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
          aria-hidden="true"
          focusable="false"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </i>
    );

    const accordionContent = (
      <div
        className={generateClassNames(className) + (glass ? ' c-accordion--glass' : '')}
        style={style}
      >
        <button
          id={buttonId}
          className={generateHeaderClassNames()}
          onClick={toggle}
          aria-expanded={state.isOpen}
          aria-controls={panelId}
          aria-disabled={disabled}
          disabled={disabled}
          type="button"
        >
          <span className="c-accordion__title">{title}</span>
          {icon || defaultIcon}
        </button>
        <div
          id={panelId}
          className={ACCORDION.SELECTORS.PANEL.replace('.', '')}
          ref={panelRef as React.RefObject<HTMLDivElement>}
          role="region"
          aria-labelledby={buttonId}
        >
          <div
            className={ACCORDION.SELECTORS.BODY.replace('.', '')}
            ref={contentRef as React.RefObject<HTMLDivElement>}
          >
            {children}
          </div>
        </div>
      </div>
    );

    if (glass) {
      // Default glass settings for accordions
      const defaultGlassProps = {
        displacementScale: 20,
        elasticity: 0,
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{accordionContent}</AtomixGlass>;
    }

    return accordionContent;
  }
);

// Set display name for debugging
Accordion.displayName = 'Accordion';

// Export as default
export default Accordion;
