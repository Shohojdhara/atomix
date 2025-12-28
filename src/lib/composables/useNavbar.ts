import { useState } from 'react';
import { NavbarProps, NavProps, NavItemProps, NavDropdownProps } from '../types/components';
import { NAVBAR, NAV } from '../constants/components';
import React from 'react';
import { Icon } from '../../components/Icon/Icon';

/**
 * Navbar state and functionality
 * @param initialProps - Initial navbar properties
 * @returns Navbar state and methods
 */
export function useNavbar(initialProps?: Partial<NavbarProps>) {
  // Default navbar properties
  const defaultProps: Partial<NavbarProps> = {
    position: 'static',
    collapsible: true,
    backdrop: false,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    ariaLabel: 'Main navigation',
    ...initialProps,
  };

  // Local expanded state for when not controlled externally
  const [isExpanded, setIsExpanded] = useState(defaultProps.expanded || false);

  /**
   * Generate navbar class based on properties
   * @param props - Navbar properties
   * @returns Class string
   */
  const generateNavbarClass = (props: Partial<NavbarProps>): string => {
    const {
      position = defaultProps.position,
      variant,
      collapsible = defaultProps.collapsible,
      className = '',
    } = props;

    const positionClass = position !== 'static' ? `c-navbar--${position}` : '';
    const variantClass = variant ? `c-navbar--${variant}` : '';
    const collapsibleClass = collapsible ? 'c-navbar--collapsible' : '';

    return `c-navbar ${positionClass} ${variantClass} ${collapsibleClass} ${className}`.trim();
  };

  /**
   * Generate container style
   * @param width - Container width
   * @returns Style object
   */
  const generateContainerStyle = (width?: string) => {
    return width ? { maxWidth: width } : {};
  };

  /**
   * Generate collapse class based on expanded state
   * @param expanded - Whether the collapse is expanded
   * @returns Class string
   */
  const generateCollapseClass = (expanded: boolean): string => {
    return `c-navbar__collapse ${expanded ? 'is-expanded' : ''}`.trim();
  };

  /**
   * Toggle expanded state
   */
  const toggleExpanded = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);

    if (defaultProps.onToggle) {
      defaultProps.onToggle(newState);
    }
  };

  /**
   * Get current expanded state
   * @param controlled - External expanded value if controlled
   * @returns Current expanded state
   */
  const getExpandedState = (controlled?: boolean): boolean => {
    return typeof controlled !== 'undefined' ? controlled : isExpanded;
  };

  return {
    defaultProps,
    isExpanded,
    setIsExpanded,
    generateNavbarClass,
    generateContainerStyle,
    generateCollapseClass,
    toggleExpanded,
    getExpandedState,
  };
}

/**
 * Nav state and functionality
 * @param initialProps - Initial nav properties
 * @returns Nav state and methods
 */
export function useNav(initialProps?: Partial<NavProps>) {
  // Default nav properties
  const defaultProps: Partial<NavProps> = {
    alignment: 'start',
    variant: 'default',
    ...initialProps,
  };

  /**
   * Generate nav class based on properties
   * @param props - Nav properties
   * @returns Class string
   */
  const generateNavClass = (props: Partial<NavProps>): string => {
    const {
      alignment = defaultProps.alignment,
      variant = defaultProps.variant,
      className = '',
    } = props;

    const alignmentClass = alignment !== 'start' ? `c-nav--${alignment}` : '';
    const variantClass = variant !== 'default' ? `c-nav--${variant}` : '';

    return `c-nav ${alignmentClass} ${variantClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateNavClass,
  };
}

/**
 * Nav item state and functionality
 * @param initialProps - Initial nav item properties
 * @returns Nav item state and methods
 */
export function useNavItem(initialProps?: Partial<NavItemProps & { megaMenu?: boolean }>) {
  // Default nav item properties
  const defaultProps: Partial<NavItemProps & { megaMenu?: boolean }> = {
    dropdown: false,
    megaMenu: false,
    active: false,
    ...initialProps,
  };

  /**
   * Generate nav item class based on properties
   * @param props - Nav item properties
   * @returns Class string
   */
  const generateNavItemClass = (props: Partial<NavItemProps & { megaMenu?: boolean }>): string => {
    const {
      dropdown = defaultProps.dropdown,
      megaMenu = defaultProps.megaMenu,
      active = defaultProps.active,
      disabled = defaultProps.disabled,
      className = '',
    } = props;

    // Apply dropdown class only for regular dropdowns, not mega menus
    const dropdownClass = dropdown && !megaMenu ? NAV.SELECTORS.DROPDOWN.replace('.', '') : '';
    // Add a custom class for mega menu items if needed
    const megaMenuClass = megaMenu ? 'c-nav__item--mega-menu' : '';
    const activeClass = active ? NAV.CLASSES.ACTIVE : '';
    const disabledClass = disabled ? NAV.CLASSES.DISABLED : '';

    return `c-nav__item ${dropdownClass} ${megaMenuClass} ${activeClass} ${disabledClass} ${className}`.trim();
  };

  /**
   * Generate nav link class based on properties
   * @param active - Whether link is active
   * @param disabled - Whether link is disabled
   * @param className - Additional class names
   * @returns Class string
   */
  const generateNavLinkClass = (active = false, disabled = false, className = ''): string => {
    const activeClass = active ? NAV.CLASSES.ACTIVE : '';
    const disabledClass = disabled ? 'c-nav__link--disabled' : '';

    return `c-nav__link ${activeClass} ${disabledClass} ${className}`.trim();
  };

  /**
   * Handle nav item click with disabled check
   * @param handler - Click handler function
   * @returns Function that respects disabled state
   */
  const handleClick = (handler?: () => void) => {
    return (e: React.MouseEvent) => {
      if (defaultProps.disabled || !handler) {
        e.preventDefault();
        return;
      }

      handler();
    };
  };

  return {
    defaultProps,
    generateNavItemClass,
    generateNavLinkClass,
    handleClick,
  };
}

/**
 * Nav dropdown state and functionality
 * @param initialProps - Initial dropdown properties
 * @returns Dropdown state and methods
 */
export function useNavDropdown(initialProps?: Partial<NavDropdownProps>) {
  // Default dropdown properties
  const defaultProps: Partial<NavDropdownProps> = {
    alignment: 'start',
    megaMenu: false,
    ...initialProps,
  };

  /**
   * Generate dropdown menu class based on properties
   * @param props - Dropdown properties
   * @returns Class string
   */
  const generateDropdownMenuClass = (props: Partial<NavDropdownProps>): string => {
    const {
      alignment = defaultProps.alignment,
      megaMenu = defaultProps.megaMenu,
      className = '',
    } = props;

    // Select the base class based on mega menu or regular dropdown
    const baseClass = megaMenu
      ? NAV.SELECTORS.MEGA_MENU.replace('.', '')
      : NAV.SELECTORS.DROPDOWN_MENU.replace('.', '');

    // Add alignment class if not default 'start'
    let alignmentClass = '';
    if (alignment === 'center') {
      alignmentClass = `${baseClass}--center`;
    } else if (alignment === 'end') {
      alignmentClass = `${baseClass}--end`;
    }

    return `${baseClass} ${alignmentClass} ${className}`.trim();
  };

  /**
   * Detect whether we're in a fixed-bottom navbar
   * @returns Boolean indicating if in fixed-bottom navbar
   */
  const isInFixedBottomNavbar = (): boolean => {
    // This would need to be called in the component itself
    // because it requires DOM access
    return document.querySelector('.c-navbar--fixed-bottom') !== null;
  };

  /**
   * Get the appropriate icon name based on navbar position
   * @param isMegaMenu - Whether it's a mega menu
   * @returns Icon name for the new Icon component
   */
  const getIconName = (isMegaMenu: boolean = false): string => {
    const isFixedBottom = isInFixedBottomNavbar();
    return isFixedBottom ? 'CaretUp' : 'CaretDown';
  };

  return {
    defaultProps,
    generateDropdownMenuClass,
    isInFixedBottomNavbar,
    getIconName,
  };
}
