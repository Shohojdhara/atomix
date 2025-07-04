import React, { useRef, useState, useCallback, createContext, useContext, useEffect } from 'react';
import { DROPDOWN } from '../../lib/constants/components';
import type {
  DropdownProps,
  DropdownItemProps,
  DropdownDividerProps,
  DropdownHeaderProps,
} from '../../lib/types/components';

// Context type definition
export type DropdownContextType = {
  isOpen: boolean;
  close: () => void;
  id: string;
  trigger: string;
};

// Create context for dropdown state management
const DropdownContext = createContext<DropdownContextType>({
  isOpen: false,
  close: () => {},
  id: '',
  trigger: 'click',
});

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
  LinkComponent,
  ...props
}) => {
  const { close } = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
    }

    // Always close the dropdown when an item is clicked
    close();
  };

  const itemClasses = [
    'c-dropdown__menu-item',
    active ? 'is-active' : '',
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const linkProps = {
    href,
    className: itemClasses,
    onClick: handleClick,
    role: 'menuitem',
    tabIndex: 0,
    ...props,
  };

  if (href && !disabled) {
    return (
      <li>
        {LinkComponent ? (
          <LinkComponent {...linkProps}>
            {icon && <span className="c-dropdown__menu-item-icon">{icon}</span>}
            {children}
          </LinkComponent>
        ) : (
          <a {...linkProps}>
            {icon && <span className="c-dropdown__menu-item-icon">{icon}</span>}
            {children}
          </a>
        )}
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={itemClasses}
        onClick={handleClick}
        disabled={disabled}
        role="menuitem"
        tabIndex={0}
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
  return <li className={`c-dropdown__divider ${className}`} role="separator" />;
};

/**
 * DropdownHeader component for section headers
 */
export const DropdownHeader: React.FC<DropdownHeaderProps> = ({ children, className = '' }) => {
  return <li className={`c-dropdown__header ${className}`}>{children}</li>;
};

/**
 * Dropdown component for creating dropdown menus
 */
export const Dropdown: React.FC<DropdownProps> = ({
  children,
  menu,
  placement = 'bottom-start',
  trigger = 'click',
  offset = DROPDOWN.DEFAULTS.OFFSET,
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  maxHeight,
  minWidth = DROPDOWN.DEFAULTS.MIN_WIDTH,
  variant,
  className = '',
  ...props
}) => {
  // Set up controlled vs uncontrolled state
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Create refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Generate unique ID
  const dropdownId = useRef(`dropdown-${Math.random().toString(36).substring(2, 9)}`).current;

  // State change handlers
  const setIsOpen = useCallback(
    (nextIsOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledIsOpen(nextIsOpen);
      }
      if (onOpenChange) {
        onOpenChange(nextIsOpen);
      }
    },
    [isControlled, onOpenChange]
  );

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to the toggle button after closing
    setTimeout(() => {
      toggleRef.current?.focus();
    }, 0);
  }, [setIsOpen]);

  // Click outside handler
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return undefined;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, close]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, close]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!menuRef.current) return;

    const focusableItems = menuRef.current.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([disabled])'
    );
    if (!focusableItems.length) return;

    const currentIndex = Array.from(focusableItems).findIndex(
      item => item === document.activeElement
    );

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < focusableItems.length - 1) {
          focusableItems[currentIndex + 1].focus();
        } else {
          focusableItems[0].focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          focusableItems[currentIndex - 1].focus();
        } else {
          focusableItems[focusableItems.length - 1].focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        focusableItems[0].focus();
        break;

      case 'End':
        e.preventDefault();
        focusableItems[focusableItems.length - 1].focus();
        break;
    }
  }, []);

  // Event handlers
  const handleToggleClick = useCallback(
    (e: React.MouseEvent) => {
      if (trigger === 'click') {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }
    },
    [trigger, toggle]
  );

  const handleToggleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') && !isOpen) {
        e.preventDefault();
        setIsOpen(true);

        // Only focus the first menu item when using keyboard navigation
        if (e.key === 'ArrowDown' && menuRef.current) {
          setTimeout(() => {
            const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
            firstItem?.focus();
          }, 100);
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    },
    [isOpen, setIsOpen, close]
  );

  // Hover handlers for trigger="hover"
  const handleHoverOpen = useCallback(() => {
    if (trigger === 'hover') {
      setIsOpen(true);
    }
  }, [trigger, setIsOpen]);

  // Build class names
  const dropdownClasses = [
    'c-dropdown',
    trigger === 'click' ? 'c-dropdown--onclick' : '',
    variant ? `c-dropdown--${variant}` : '',
    isOpen ? 'is-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Menu styles
  const menuStyleProps: React.CSSProperties = {};
  if (maxHeight) menuStyleProps.maxHeight = maxHeight;
  if (minWidth !== undefined) {
    menuStyleProps.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
  }

  return (
    <div
      ref={dropdownRef}
      className={dropdownClasses}
      onMouseEnter={trigger === 'hover' ? handleHoverOpen : undefined}
      {...props}
    >
      <div
        ref={toggleRef}
        className="c-dropdown__toggle"
        onClick={handleToggleClick}
        onKeyDown={handleToggleKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        tabIndex={0}
      >
        {children}
      </div>

      <div
        ref={menuRef}
        id={dropdownId}
        className={`c-dropdown__menu-wrapper c-dropdown__menu-wrapper--${placement} ${isOpen ? 'is-open' : ''}`}
        role="menu"
        aria-orientation="vertical"
        aria-hidden={!isOpen}
        onKeyDown={handleKeyDown}
      >
        <div className="c-dropdown__menu-inner" style={menuStyleProps}>
          <DropdownContext.Provider value={{ isOpen, close, id: dropdownId, trigger }}>
            <ul className="c-dropdown__menu">{menu}</ul>
          </DropdownContext.Provider>
        </div>
      </div>
    </div>
  );
};

export type { DropdownProps, DropdownItemProps, DropdownDividerProps, DropdownHeaderProps };

Dropdown.displayName = 'Dropdown';

export default Dropdown;
