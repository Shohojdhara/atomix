import React, {
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
  memo,
  forwardRef,
  ReactNode,
} from 'react';
import { DROPDOWN } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type {
  DropdownProps,
  DropdownItemProps,
  DropdownDividerProps,
  DropdownHeaderProps,
  AtomixGlassProps,
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

// Compound Components

export const DropdownMenu = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ children, className = '', ...props }, ref) => {
    const { glass } = useContext(DropdownStyleContext); // We need to access glass prop here?
    // Wait, the original code wrapped <ul> in Context Provider.
    // And applied glass wrapper around <ul>.
    // If we use Compound Component, DropdownMenu should be the list.

    return (
      <ul
        ref={ref}
        className={`c-dropdown__menu ${glass ? 'c-dropdown__menu--glass' : ''} ${className}`.trim()}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
DropdownMenu.displayName = 'DropdownMenu';

export const DropdownTrigger = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', onClick, onKeyDown, ...props }, ref) => {
    // We need to inject the trigger logic here.
    // But triggers are usually handled by the parent Dropdown in the original code.
    // The original code wraps children in `c-dropdown__toggle` div.

    // Ideally, DropdownTrigger allows user to customize the trigger element.
    // For backward compat, Dropdown wraps `children` (legacy) in `c-dropdown__toggle`.

    // If we use <Dropdown.Trigger><Button/></Dropdown.Trigger>, we want the Button to be the trigger.

    return (
      <div
        ref={ref}
        className={`c-dropdown__toggle ${className}`.trim()}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownTrigger.displayName = 'DropdownTrigger';

/**
 * DropdownItem component for menu items
 */
export const DropdownItem: React.FC<DropdownItemProps> = memo(
  ({
    children,
    href,
    target,
    active = false,
    disabled = false,
    icon,
    onClick,
    className = '',
    linkComponent,
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
      to: href,
      target,
      className: itemClasses,
      onClick: handleClick,
      role: 'menuitem',
      tabIndex: 0,
      ...props,
    };

    if (href && !disabled) {
      return (
        <li>
          {linkComponent ? (
            (() => {
              const Component = linkComponent as React.ComponentType<any>;
              return (
                <Component {...linkProps}>
                  {icon && <span className="c-dropdown__menu-item-icon">{icon}</span>}
                  {children}
                </Component>
              );
            })()
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
  }
);
DropdownItem.displayName = 'DropdownItem';

/**
 * DropdownDivider component for separating groups of items
 */
export const DropdownDivider: React.FC<DropdownDividerProps> = memo(({ className = '' }) => {
  return <li className={`c-dropdown__divider ${className}`} role="separator" />;
});
DropdownDivider.displayName = 'DropdownDivider';

/**
 * DropdownHeader component for section headers
 */
export const DropdownHeader: React.FC<DropdownHeaderProps> = memo(
  ({ children, className = '' }) => {
    return <li className={`c-dropdown__header ${className}`}>{children}</li>;
  }
);
DropdownHeader.displayName = 'DropdownHeader';

// Helper context to pass glass prop to DropdownMenu
const DropdownStyleContext = createContext<{ glass?: AtomixGlassProps | boolean }>({});

/**
 * Dropdown component for creating dropdown menus
 */
type DropdownComponent = React.FC<DropdownProps> & {
  Trigger: typeof DropdownTrigger;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
  Divider: typeof DropdownDivider;
  Header: typeof DropdownHeader;
};

export const Dropdown: DropdownComponent = memo(function DropdownBase({
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
  style,
  glass,
  ...props
}: DropdownProps) {
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
          focusableItems[currentIndex + 1]?.focus();
        } else {
          focusableItems[0]?.focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          focusableItems[currentIndex - 1]?.focus();
        } else {
          focusableItems[focusableItems.length - 1]?.focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        focusableItems[0]?.focus();
        break;

      case 'End':
        e.preventDefault();
        focusableItems[focusableItems.length - 1]?.focus();
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
    glass ? 'c-dropdown--glass' : '',
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

  // Determine content structure
  // Legacy: menu prop + children as trigger
  // Compound: children contains Trigger and Menu

  const hasCompoundComponents = React.Children.toArray(children).some(
    child =>
      React.isValidElement(child) &&
      ['DropdownTrigger', 'DropdownMenu'].includes((child.type as any).displayName)
  );

  let triggerContent: ReactNode;
  let menuContentNode: ReactNode;

  if (hasCompoundComponents) {
    // Find Trigger and Menu in children
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        if ((child.type as any).displayName === 'DropdownTrigger') {
          triggerContent = React.cloneElement(child, {
            ref: toggleRef,
            onClick: (e: React.MouseEvent) => {
              handleToggleClick(e);
              (child.props as any).onClick?.(e);
            },
            onKeyDown: (e: React.KeyboardEvent) => {
              handleToggleKeyDown(e);
              (child.props as any).onKeyDown?.(e);
            },
            'aria-haspopup': 'menu',
            'aria-expanded': isOpen,
            'aria-controls': dropdownId,
            tabIndex: 0,
          } as any);
        } else if ((child.type as any).displayName === 'DropdownMenu') {
          menuContentNode = child;
        }
      }
    });
  } else {
    // Legacy mode
    triggerContent = (
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
    );
    menuContentNode = (
      <ul className={`c-dropdown__menu ${glass ? 'c-dropdown__menu--glass' : ''}`}>{menu}</ul>
    );
  }

  const menuContent = (
    <div className="c-dropdown__menu-inner" style={menuStyleProps}>
      <DropdownStyleContext.Provider value={{ glass }}>
        <DropdownContext.Provider value={{ isOpen, close, id: dropdownId, trigger }}>
          {menuContentNode}
        </DropdownContext.Provider>
      </DropdownStyleContext.Provider>
    </div>
  );

  return (
    <div
      ref={dropdownRef}
      className={dropdownClasses}
      style={style}
      onMouseEnter={trigger === 'hover' ? handleHoverOpen : undefined}
      {...props}
    >
      {triggerContent}

      <div
        ref={menuRef}
        id={dropdownId}
        className={`c-dropdown__menu-wrapper c-dropdown__menu-wrapper--${placement} ${isOpen ? 'is-open' : ''} ${glass ? 'is-glass' : ''}`}
        role="menu"
        aria-orientation="vertical"
        aria-hidden={!isOpen}
        onKeyDown={handleKeyDown}
      >
        {glass
          ? // Default glass settings for dropdowns
            (() => {
              const defaultGlassProps = {
                displacementScale: 20,
                elasticity: 0,
              };

              const glassProps =
                glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

              return <AtomixGlass {...glassProps}>{menuContent}</AtomixGlass>;
            })()
          : menuContent}
      </div>
    </div>
  );
}) as unknown as DropdownComponent;

export type { DropdownProps, DropdownItemProps, DropdownDividerProps, DropdownHeaderProps };

Dropdown.displayName = 'Dropdown';
Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;

export default Dropdown;
