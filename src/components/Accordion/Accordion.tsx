import React, { useState, useRef, useEffect, ReactNode } from 'react';

export interface AccordionProps {
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
   * Whether the accordion is disabled
   */
  disabled?: boolean;
  /**
   * Position of the icon (right or left)
   */
  iconPosition?: 'right' | 'left';
  /**
   * Custom icon for the accordion
   */
  icon?: ReactNode;
  /**
   * Additional CSS class names
   */
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  iconPosition = 'right',
  icon,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current && contentRef.current) {
      if (isOpen) {
        panelRef.current.style.setProperty('--panel-height', `${contentRef.current.clientHeight}px`);
      } else {
        panelRef.current.style.setProperty('--panel-height', '0px');
      }
    }
  }, [isOpen]);

  // Handle window resize to adjust panel height
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && panelRef.current && contentRef.current) {
        panelRef.current.style.setProperty('--panel-height', `${contentRef.current.clientHeight}px`);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleAccordion = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const defaultIcon = (
    <i className="c-accordion__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </i>
  );

  const headerIconPositionClass = iconPosition === 'left' ? 'c-accordion__header--icon-left' : '';
  const openClass = isOpen ? 'is-open' : '';
  const disabledClass = disabled ? 'is-disabled' : '';
  const baseClass = `c-accordion ${openClass} ${disabledClass} ${className}`;

  return (
    <div className={baseClass}>
      <button
        className={`c-accordion__header ${headerIconPositionClass}`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span className="c-accordion__title">{title}</span>
        {icon || defaultIcon}
      </button>
      <div className="c-accordion__panel" ref={panelRef}>
        <div className="c-accordion__body" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
}; 