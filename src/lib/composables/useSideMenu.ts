import { useState, useEffect, useRef } from 'react';
import { SideMenuProps, SideMenuItemProps } from '../types/components';
import { SIDE_MENU } from '../constants/components';

/**
 * SideMenu state and functionality
 * @param initialProps - Initial side menu properties
 * @returns SideMenu state and methods
 */
export function useSideMenu(initialProps?: Partial<SideMenuProps>) {
  // Default side menu properties
  const defaultProps: Partial<SideMenuProps> = {
    collapsible: true,
    isOpen: false,
    ...initialProps,
  };

  // Local open state for when not controlled externally
  const [isOpenState, setIsOpenState] = useState(defaultProps.isOpen || false);

  // Refs for managing responsive behavior
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Update local state when external state changes
  useEffect(() => {
    if (typeof defaultProps.isOpen !== 'undefined') {
      setIsOpenState(defaultProps.isOpen);
    }
  }, [defaultProps.isOpen]);

  // Handle responsive behavior - auto-open on desktop, controlled on mobile
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // MD breakpoint

      if (!isMobile && defaultProps.collapsible) {
        // Auto-open on desktop
        if (typeof defaultProps.onToggle === 'function') {
          defaultProps.onToggle(true);
        } else {
          setIsOpenState(true);
        }

        // Reset wrapper height on desktop
        if (wrapperRef.current) {
          wrapperRef.current.style.height = 'auto';
        }
      } else if (isMobile && wrapperRef.current && innerRef.current) {
        // Set proper height for mobile animation
        const currentOpen =
          typeof defaultProps.isOpen !== 'undefined' ? defaultProps.isOpen : isOpenState;
        if (currentOpen) {
          wrapperRef.current.style.height = `${innerRef.current.scrollHeight}px`;
        } else {
          wrapperRef.current.style.height = '0px';
        }
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [defaultProps.collapsible, defaultProps.isOpen, defaultProps.onToggle, isOpenState]);

  // Update wrapper height when open state changes on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile && wrapperRef.current && innerRef.current && defaultProps.collapsible) {
      const currentOpen =
        typeof defaultProps.isOpen !== 'undefined' ? defaultProps.isOpen : isOpenState;

      if (currentOpen) {
        wrapperRef.current.style.height = `${innerRef.current.scrollHeight}px`;
      } else {
        wrapperRef.current.style.height = '0px';
      }
    }
  }, [defaultProps.isOpen, isOpenState, defaultProps.collapsible]);

  /**
   * Generate side menu class based on properties
   * @param props - Side menu properties
   * @returns Class string
   */
  const generateSideMenuClass = (props: Partial<SideMenuProps & { isOpen?: boolean }>): string => {
    const { className = '', isOpen = false } = props;

    const openClass = isOpen ? SIDE_MENU.CLASSES.IS_OPEN : '';

    return `${SIDE_MENU.CLASSES.BASE} ${openClass} ${className}`.trim();
  };

  /**
   * Generate wrapper class
   * @returns Class string
   */
  const generateWrapperClass = (): string => {
    return SIDE_MENU.CLASSES.WRAPPER;
  };

  /**
   * Handle toggle click
   */
  const handleToggle = () => {
    if (defaultProps.disabled) return;

    const newState =
      typeof defaultProps.isOpen !== 'undefined' ? !defaultProps.isOpen : !isOpenState;

    if (typeof defaultProps.onToggle === 'function') {
      // Controlled component
      defaultProps.onToggle(newState);
    } else {
      // Uncontrolled component
      setIsOpenState(newState);
    }
  };

  /**
   * Get current open state
   * @returns Current open state
   */
  const getCurrentOpenState = (): boolean => {
    return typeof defaultProps.isOpen !== 'undefined' ? defaultProps.isOpen : isOpenState;
  };

  return {
    defaultProps,
    isOpenState: getCurrentOpenState(),
    wrapperRef,
    innerRef,
    generateSideMenuClass,
    generateWrapperClass,
    handleToggle,
    getCurrentOpenState,
  };
}

/**
 * SideMenuItem state and functionality
 * @param initialProps - Initial side menu item properties
 * @returns SideMenuItem state and methods
 */
export function useSideMenuItem(initialProps?: Partial<SideMenuItemProps>) {
  // Default side menu item properties
  const defaultProps: Partial<SideMenuItemProps> = {
    active: false,
    disabled: false,
    ...initialProps,
  };

  /**
   * Generate side menu item class based on properties
   * @returns Class string
   */
  const generateSideMenuItemClass = (): string => {
    const {
      active = defaultProps.active,
      disabled = defaultProps.disabled,
      className = '',
    } = defaultProps;

    const activeClass = active ? SIDE_MENU.CLASSES.ACTIVE : '';
    const disabledClass = disabled ? SIDE_MENU.CLASSES.DISABLED : '';

    return `${SIDE_MENU.CLASSES.LINK} ${activeClass} ${disabledClass} ${className}`.trim();
  };

  /**
   * Handle side menu item click with disabled check
   * @param handler - Click handler function
   * @returns Function that respects disabled state
   */
  const handleClick = (handler?: (event: React.MouseEvent) => void) => {
    return (e: React.MouseEvent) => {
      if (defaultProps.disabled) {
        e.preventDefault();
        return;
      }

      if (handler) {
        handler(e);
      }
    };
  };

  return {
    defaultProps,
    generateSideMenuItemClass,
    handleClick,
  };
}
