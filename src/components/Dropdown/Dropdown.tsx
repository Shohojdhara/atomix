import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { DROPDOWN } from '../../lib/constants/components';
import { useDropdown } from '../../lib/composables/useDropdown';
import { Icon } from '../Icon';
import type { 
  DropdownProps, 
  DropdownItemProps, 
  DropdownDividerProps, 
  DropdownHeaderProps 
} from '../../lib/types/components';

// Create context to share dropdown state
const DropdownContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  dropdownId: string;
  triggerType: 'click' | 'hover';
}>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: { current: null },
  dropdownId: '',
  triggerType: 'click'
});

/**
 * DropdownTrigger component to wrap the element that triggers the dropdown
 */
const DropdownTrigger: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, setIsOpen, triggerRef, dropdownId, triggerType } = React.useContext(DropdownContext);

  // Handle trigger events
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // Create trigger props with proper typing for event handlers
  type TriggerProps = {
    ref: React.RefObject<HTMLElement>;
    'aria-haspopup': 'true';
    'aria-expanded': boolean;
    'aria-controls': string;
    className: string;
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };

  const triggerProps: TriggerProps = {
    ref: triggerRef,
    'aria-haspopup': 'true',
    'aria-expanded': isOpen,
    'aria-controls': dropdownId,
    className: 'c-dropdown__toggle',
  };

  if (triggerType === 'click') {
    triggerProps.onClick = handleClick;
  } else if (triggerType === 'hover') {
    triggerProps.onMouseEnter = handleMouseEnter;
    triggerProps.onMouseLeave = handleMouseLeave;
  }

  // Handle different types of children
  if (React.isValidElement(children)) {
    // If it's a valid React element, clone it with additional props
    return React.cloneElement(children, {
      ...children.props,
      ...triggerProps,
      className: `${children.props.className || ''} ${triggerProps.className}`.trim()
    });
  } else {
    // If it's not a valid React element, wrap it in a button
    return (
      <button type="button" {...triggerProps}>
        {children}
      </button>
    );
  }
};

/**
 * DropdownItem component for menu items
 */
export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  href,
  active = false,
  disabled = false,
  icon,
  onClick,
  className = '',
  ...props
}) => {
  const { setIsOpen } = React.useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
    }

    setIsOpen(false);
  };

  const classes = `c-dropdown__menu-item ${active ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''} ${className}`;

  if (href && !disabled) {
    return (
      <li>
        <a 
          href={href} 
          className={classes}
          onClick={(e) => handleClick(e as React.MouseEvent<HTMLAnchorElement>)}
          role="menuitem"
          {...props}
        >
          {icon && <span className="c-dropdown__menu-item-icon">{icon}</span>}
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button 
        type="button"
        className={classes}
        onClick={handleClick}
        disabled={disabled}
        role="menuitem"
        {...props}
      >
        {icon && <span className="c-dropdown__menu-item-icon">{icon}</span>}
        {children}
      </button>
    </li>
  );
};

/**
 * DropdownDivider component for separating groups of items
 */
export const DropdownDivider: React.FC<DropdownDividerProps> = ({ className = '' }) => {
  return <li className={`c-dropdown__divider ${className}`} />;
};

/**
 * DropdownHeader component for section headers
 */
export const DropdownHeader: React.FC<DropdownHeaderProps> = ({ children, className = '' }) => {
  return (
    <li className={`c-dropdown__header ${className}`}>
      {children}
    </li>
  );
};

/**
 * Dropdown component for displaying floating dropdown menus
 */
export const Dropdown: React.FC<DropdownProps> = ({
  children,
  menu,
  placement = 'bottom-start',
  trigger = 'click',
  className = '',
  offset = DROPDOWN.DEFAULTS.OFFSET,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  maxHeight,
  minWidth = DROPDOWN.DEFAULTS.MIN_WIDTH,
  variant,
  id,
  ...props
}) => {
  const {
    isOpen,
    setIsOpen,
    triggerRef,
    menuRef,
    dropdownId,
    currentPlacement,
    updatePosition
  } = useDropdown({
    placement,
    trigger,
    offset,
    defaultOpen,
    isOpen: controlledIsOpen,
    onOpenChange,
    closeOnClickOutside,
    closeOnEscape,
    id
  });

  // Add variant class if provided
  const variantClass = variant ? `c-dropdown--${variant}` : '';
  const triggerClass = trigger === 'click' ? 'c-dropdown--onclick' : '';

  // Handle hover events for the dropdown menu
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsOpen(false);
    }
  };

  // Helper function to extract numeric value from CSS size
  const extractSizeValue = (size: string): string => {
    return size.toString().replace('px', '').replace('rem', '');
  };

  // Apply utility classes for maxHeight and minWidth
  const menuClasses = [
    'c-dropdown__menu-inner',
    maxHeight ? `u-mh-${extractSizeValue(maxHeight)}` : '',
    minWidth !== DROPDOWN.DEFAULTS.MIN_WIDTH ? `u-mw-${extractSizeValue(minWidth)}` : '',
  ].filter(Boolean).join(' ');

  // Check if children already have a toggle icon; if not, add the CaretDown icon
  const hasToggleIcon = React.isValidElement(children) && 
    React.Children.toArray(children.props.children).some(child => {
      if (!React.isValidElement(child)) return false;

      // Check if it's an Icon component
      if (child.type === Icon) {
        return child.props.className?.includes('c-dropdown__toggle-icon');
      }

      // Check if it's any element with the toggle icon class
      return child.props.className?.includes('c-dropdown__toggle-icon');
    });

  const childrenWithIcon = React.isValidElement(children) 
    ? (hasToggleIcon 
        ? children 
        : React.cloneElement(children, {
            ...children.props,
            children: (
              <>
                {children.props.children}
                <Icon 
                  name="CaretDown" 
                  size="sm" 
                  className="c-dropdown__toggle-icon" 
                  alt="Toggle dropdown"
                />
              </>
            )
          })
      ) 
    : (
      // If children is not a valid React element, wrap it with a button
      <button className="c-btn c-btn--primary">
        {children}
        <Icon 
          name="CaretDown" 
          size="sm" 
          className="c-dropdown__toggle-icon" 
          alt="Toggle dropdown"
        />
      </button>
    );

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, triggerRef, dropdownId, triggerType: trigger }}
    >
      <div 
        className={`c-dropdown ${variantClass} ${triggerClass} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <DropdownTrigger>
          {childrenWithIcon}
        </DropdownTrigger>

        {typeof document !== 'undefined' && (
          <div
            ref={menuRef as React.RefObject<HTMLDivElement>}
            className={`c-dropdown__menu-wrapper c-dropdown__menu-wrapper--${currentPlacement} ${isOpen ? DROPDOWN.CLASSES.IS_OPEN : ''}`}
            id={dropdownId}
            role="menu"
            aria-orientation="vertical"
            aria-hidden={!isOpen}
          >
            <div className={menuClasses}>
              <ul className="c-dropdown__menu">
                {menu}
              </ul>
            </div>
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
}; 
