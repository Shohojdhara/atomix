import React, { ReactNode, useId, memo, forwardRef } from 'react';
import { ACCORDION } from '../../lib/constants/components';
import { useAccordion } from '../../lib/composables/useAccordion';
import type {
  AccordionProps as AccordionPropsType,
  AtomixGlassProps,
} from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export type AccordionProps = AccordionPropsType;

// Default icon
const DefaultIcon = () => (
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

export interface AccordionHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isOpen?: boolean;
}

export const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  (
    { title, icon, iconPosition = 'right', isOpen, children, className = '', ...props },
    ref
  ) => {
    // Determine icon to render. Explicit check for undefined to allow null/false to hide icon.
    const iconElement = icon === undefined ? <DefaultIcon /> : icon;

    return (
      <button
        ref={ref}
        type="button"
        className={className} // Parent injects the class names
        {...props}
      >
        {title && <span className="c-accordion__title">{title}</span>}
        {children}
        {iconElement}
      </button>
    );
  }
);
AccordionHeader.displayName = 'AccordionHeader';

export interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  panelRef?: React.RefObject<HTMLDivElement>;
  contentRef?: React.RefObject<HTMLDivElement>;
}

// Helper to merge refs
function mergeRefs<T = any>(...refs: (React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

export const AccordionBody = forwardRef<HTMLDivElement, AccordionBodyProps>(
  ({ children, className = '', panelRef, contentRef, ...props }, ref) => {
    const mergedPanelRef = React.useMemo(() => mergeRefs(ref, panelRef), [ref, panelRef]);

    return (
      <div
        ref={mergedPanelRef}
        className={className} // Parent injects class names
        role="region"
        {...props}
      >
        <div
          className={ACCORDION.SELECTORS.BODY.replace('.', '')}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
    );
  }
);
AccordionBody.displayName = 'AccordionBody';

type AccordionComponent = React.FC<AccordionProps> & {
  Header: typeof AccordionHeader;
  Body: typeof AccordionBody;
};

const AccordionImpl = memo(
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
  }: AccordionProps) => {
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

    const headerClassNames = generateHeaderClassNames();
    const panelClassNames = ACCORDION.SELECTORS.PANEL.replace('.', '');

    // Check for compound usage
    const hasCompoundComponents = React.Children.toArray(children).some((child) =>
      React.isValidElement(child) &&
      ['AccordionHeader', 'AccordionBody'].includes((child.type as any).displayName)
    );

    const content = (
      <div
        className={generateClassNames(className) + (glass ? ' c-accordion--glass' : '')}
        style={style}
      >
        {hasCompoundComponents ? (
          React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              if ((child.type as any).displayName === 'AccordionHeader') {
                return React.cloneElement(child, {
                  id: buttonId,
                  className: `${headerClassNames} ${(child.props as any).className || ''}`.trim(),
                  onClick: (e: React.MouseEvent) => {
                    toggle();
                    (child.props as any).onClick?.(e);
                  },
                  'aria-expanded': state.isOpen,
                  'aria-controls': panelId,
                  'aria-disabled': disabled,
                  disabled: disabled,
                  iconPosition: (child.props as any).iconPosition || iconPosition,
                } as any);
              }
              if ((child.type as any).displayName === 'AccordionBody') {
                return React.cloneElement(child, {
                  id: panelId,
                  className: `${panelClassNames} ${(child.props as any).className || ''}`.trim(),
                  'aria-labelledby': buttonId,
                  panelRef: panelRef,
                  contentRef: contentRef,
                } as any);
              }
            }
            return child;
          })
        ) : (
          <>
            <AccordionHeader
              id={buttonId}
              className={headerClassNames}
              onClick={toggle}
              aria-expanded={state.isOpen}
              aria-controls={panelId}
              aria-disabled={disabled}
              disabled={disabled}
              title={title}
              icon={icon}
              iconPosition={iconPosition}
            />
            <AccordionBody
              id={panelId}
              className={panelClassNames}
              aria-labelledby={buttonId}
              panelRef={panelRef as React.RefObject<HTMLDivElement>}
              contentRef={contentRef as React.RefObject<HTMLDivElement>}
            >
              {children}
            </AccordionBody>
          </>
        )}
      </div>
    );

    if (glass) {
      // Default glass settings for accordions
      const defaultGlassProps = {
        displacementScale: 20,
        elasticity: 0,
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{content}</AtomixGlass>;
    }

    return content;
  }
);

AccordionImpl.displayName = 'Accordion';

// Attach subcomponents
const AccordionWithSubcomponents = AccordionImpl as unknown as AccordionComponent;
AccordionWithSubcomponents.Header = AccordionHeader;
AccordionWithSubcomponents.Body = AccordionBody;

export const Accordion = AccordionWithSubcomponents;
export default Accordion as unknown as AccordionComponent;
