import React, { useState, useEffect, useRef, ReactNode, forwardRef } from 'react';
import { NavItemProps } from '../../../lib/types/components';
import { useNavItem } from '../../../lib/composables/useNavbar';
import useForkRef from '../../../lib/utils/useForkRef';

/**
 * NavItem component represents a single navigation item that can be a link, dropdown trigger, or mega menu trigger.
 *
 * @example
 * ```tsx
 * // Simple nav item
 * <NavItem href="/about" active>About</NavItem>
 *
 * // Dropdown nav item
 * <NavItem dropdown>
 *   Services
 *   <Menu>
 *     <MenuItem href="/web">Web Design</MenuItem>
 *     <MenuItem href="/mobile">Mobile Apps</MenuItem>
 *   </Menu>
 * </NavItem>
 *
 * // Mega menu nav item
 * <NavItem megaMenu>
 *   Products
 *   <MegaMenu>
 *     <MegaMenuColumn title="Web">
 *       <MegaMenuLink href="/websites">Websites</MegaMenuLink>
 *     </MegaMenuColumn>
 *   </MegaMenu>
 * </NavItem>
 * ```
 */
export const NavItem = forwardRef<HTMLLIElement, NavItemProps>(
  (
    {
      children,
      dropdown = false,
      megaMenu = false,
      active = false,
      href,
      onClick,
      className = '',
      disabled = false,
      'aria-expanded': ariaExpanded,
      LinkComponent,
    },
    ref
  ) => {
    const { generateNavItemClass, generateNavLinkClass, handleClick } = useNavItem({
      dropdown,
      megaMenu,
      active,
      disabled,
    });

    // State for tracking dropdown open state
    const [isActive, setIsActive] = useState(false);

    // Ref for detecting outside clicks
    const itemRef = useRef<any>(null);
    const combinedRef = useForkRef(ref as any, itemRef);

    // Toggle dropdown
    const handleDropdownToggle = (e: React.MouseEvent) => {
      if (dropdown || megaMenu) {
        e.preventDefault();
        setIsActive(!isActive);
      }
    };

    // Close dropdown on outside click (desktop only)
    useEffect(() => {
      if ((!dropdown && !megaMenu) || !isActive) return undefined;

      const handleOutsideClick = (e: MouseEvent) => {
        if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
          // Only handle desktop outside clicks
          const isMobile = window.innerWidth < 768; // MD breakpoint
          if (!isMobile) {
            setIsActive(false);
          }
        }
      };

      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [dropdown, megaMenu, isActive]);

    // Close dropdown on resize to desktop
    useEffect(() => {
      if (!dropdown && !megaMenu) return undefined;

      const handleResize = () => {
        const isMobile = window.innerWidth < 768; // MD breakpoint
        if (!isMobile && isActive) {
          setIsActive(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [dropdown, megaMenu, isActive]);

    const navItemClass =
      generateNavItemClass({
        dropdown,
        megaMenu,
        active,
        disabled,
        className,
      }) + (isActive ? ' is-active' : '');

    const navLinkClass = generateNavLinkClass(
      active,
      disabled,
      dropdown || megaMenu ? 'c-nav__dropdown-toggle' : ''
    );

    // For dropdown items, we need to determine content structure
    const getDropdownContent = (): ReactNode[] => {
      const childrenArray = React.Children.toArray(children);

      // For NavDropdown component, childrenArray will be [title, content]
      // For regular NavItem, it's just the content directly
      return childrenArray;
    };

    const childContent = getDropdownContent();

    // Use aria-expanded from props if provided, otherwise use local state
    const expanded = typeof ariaExpanded !== 'undefined' ? ariaExpanded : isActive;

    const linkProps = {
      ref: combinedRef,
      href: href || '#',
      to: href || '#',
      className: navLinkClass,
      onClick: dropdown || megaMenu ? handleDropdownToggle : handleClick(onClick),
      'aria-disabled': disabled,
      'aria-expanded': dropdown || megaMenu ? expanded : undefined,
      'aria-current': (active && !dropdown && !megaMenu
        ? 'page'
        : undefined) as React.AriaAttributes['aria-current'],
    };

    return (
      <li className={navItemClass} role="menuitem" aria-haspopup={dropdown || megaMenu}>
        {LinkComponent ? (
          (() => {
            const Component = LinkComponent as React.ComponentType<any>;
            return (
              <Component {...linkProps}>
                {dropdown || megaMenu ? childContent[0] : children}
              </Component>
            );
          })()
        ) : (
          <a {...linkProps}>{dropdown || megaMenu ? childContent[0] : children}</a>
        )}

        {(dropdown || megaMenu) && childContent.length > 1 && childContent[1]}
      </li>
    );
  }
);

export type { NavItemProps };

NavItem.displayName = 'NavItem';

export default NavItem;
