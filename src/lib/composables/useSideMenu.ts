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
    collapsibleDesktop: false,
    defaultCollapsedDesktop: false,
    isOpen: false,
    ...initialProps,
  };

  // Local open state for when not controlled externally
  const [isOpenState, setIsOpenState] = useState(
    defaultProps.defaultCollapsedDesktop !== undefined 
      ? !defaultProps.defaultCollapsedDesktop 
      : (defaultProps.isOpen || false)
  );

  // Refs for managing responsive behavior
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  // Update local state when external state changes
  useEffect(() => {
    if (typeof defaultProps.isOpen !== 'undefined') {
      setIsOpenState(defaultProps.isOpen);
    } else if (defaultProps.defaultCollapsedDesktop !== undefined) {
      setIsOpenState(!defaultProps.defaultCollapsedDesktop);
    }
  }, [defaultProps.isOpen, defaultProps.defaultCollapsedDesktop]);

  // Set initial height on mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const shouldCollapse = isMobile ? defaultProps.collapsible : defaultProps.collapsibleDesktop;
    const currentOpen = typeof defaultProps.isOpen !== 'undefined' ? defaultProps.isOpen : isOpenState;

    if (shouldCollapse && wrapperRef.current && innerRef.current) {
      // Use setTimeout to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        if (wrapperRef.current && innerRef.current) {
          if (currentOpen) {
            wrapperRef.current.style.height = `${innerRef.current.scrollHeight}px`;
          } else {
            wrapperRef.current.style.height = '0px';
          }
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    } else if (!shouldCollapse && wrapperRef.current) {
      wrapperRef.current.style.height = 'auto';
    }
    return undefined;
  }, []); // Only run on mount

  // Handle responsive behavior - vertical collapse for both mobile and desktop
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // MD breakpoint
      const shouldCollapse = isMobile ? defaultProps.collapsible : defaultProps.collapsibleDesktop;

      if (!shouldCollapse) {
        // Not collapsible - always show content
        if (wrapperRef.current) {
          wrapperRef.current.style.height = 'auto';
        }
      } else if (wrapperRef.current && innerRef.current) {
        // Set proper height for vertical animation (both mobile and desktop)
        const currentOpen =
          typeof defaultProps.isOpen !== 'undefined' ? defaultProps.isOpen : isOpenState;
        
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          if (wrapperRef.current && innerRef.current) {
            if (currentOpen) {
              wrapperRef.current.style.height = `${innerRef.current.scrollHeight}px`;
            } else {
              wrapperRef.current.style.height = '0px';
            }
          }
        });
      }
    };

    // Initial call with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(handleResize, 0);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    defaultProps.collapsible,
    defaultProps.collapsibleDesktop,
    defaultProps.isOpen,
    defaultProps.onToggle,
    isOpenState,
  ]);

  // Update wrapper height when open state changes (both mobile and desktop)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const shouldCollapse = isMobile ? defaultProps.collapsible : defaultProps.collapsibleDesktop;

    if (shouldCollapse && wrapperRef.current && innerRef.current) {
      const currentOpen =
        typeof defaultProps.isOpen !== 'undefined' ? defaultProps.isOpen : isOpenState;

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (wrapperRef.current && innerRef.current) {
          if (currentOpen) {
            wrapperRef.current.style.height = `${innerRef.current.scrollHeight}px`;
          } else {
            wrapperRef.current.style.height = '0px';
          }
        }
      });
    } else if (!shouldCollapse && wrapperRef.current) {
      // Not collapsible - always show content
      wrapperRef.current.style.height = 'auto';
    }
  }, [defaultProps.isOpen, isOpenState, defaultProps.collapsible, defaultProps.collapsibleDesktop]);

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
   * Handle toggle click (mobile)
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
   * Handle desktop collapse toggle (uses same toggle as mobile)
   */
  const handleDesktopCollapse = () => {
    handleToggle();
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
    sideMenuRef,
    generateSideMenuClass,
    generateWrapperClass,
    handleToggle,
    handleDesktopCollapse,
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
