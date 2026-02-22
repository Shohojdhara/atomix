import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { NavDropdownProps } from '../../../lib/types/components';
import { useNavDropdown } from '../../../lib/composables/useNavbar';
import { NavItem } from './NavItem';
import { Icon } from '../../Icon/Icon';

export const NavDropdown: React.FC<NavDropdownProps> = forwardRef<HTMLLIElement, NavDropdownProps>(
  (
    {
      title,
      children,
      alignment = 'start',
      megaMenu = false,
      className = '',
      style,
      disabled = false,
    },
    ref
  ) => {
    const { generateDropdownMenuClass, getIconName } = useNavDropdown({
      alignment,
      megaMenu,
    });

    const [isActive, setIsActive] = useState(false);
    const dropdownRef = useRef<HTMLElement>(null);

    const dropdownMenuClass = generateDropdownMenuClass({
      alignment,
      megaMenu,
      className,
    });

    // Get the appropriate icon name
    const iconName = getIconName(megaMenu);

    // Handle dropdown toggle
    const handleToggle = () => {
      if (disabled) return;
      setIsActive(!isActive);
    };

    // Handle click outside to close dropdown (desktop only)
    useEffect(() => {
      if (!isActive) return undefined;

      const handleClickOutside = (e: MouseEvent) => {
        const isMobile = window.innerWidth < 768; // MD breakpoint

        if (!isMobile && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsActive(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isActive]);

    // Handle Escape key to close dropdown
    useEffect(() => {
      if (!isActive) return undefined;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsActive(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isActive]);

    // Create the title element with the icon
    const titleWithIcon = (
      <>
        {title}
        <Icon name={iconName as any} size="sm" className="c-nav__icon" />
      </>
    );

    const MenuTag = megaMenu ? 'div' : 'ul';
    const menuContent = (
      <MenuTag className={dropdownMenuClass} ref={dropdownRef as any} aria-hidden={!isActive}>
        {children}
      </MenuTag>
    );

    return (
      <NavItem
        dropdown={!megaMenu}
        megaMenu={megaMenu}
        disabled={disabled}
        className={isActive ? 'is-active' : ''}
        href="#"
        onClick={handleToggle}
        aria-expanded={isActive}
        style={style}
      >
        {titleWithIcon}
        {menuContent}
      </NavItem>
    );
  }
);

export type { NavDropdownProps };

NavDropdown.displayName = 'NavDropdown';

export default NavDropdown;
