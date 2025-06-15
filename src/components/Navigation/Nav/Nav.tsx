import React, { forwardRef } from 'react';
import { NavProps } from '../../../lib/types/components';
import { useNav } from '../../../lib/composables/useNavbar';

/**
 * Nav component provides a container for navigation items with proper alignment and accessibility.
 *
 * @example
 * ```tsx
 * <Nav alignment="center">
 *   <NavItem href="/">Home</NavItem>
 *   <NavItem href="/about">About</NavItem>
 *   <NavDropdown title="Services">
 *     <MenuItem href="/web">Web Design</MenuItem>
 *     <MenuItem href="/mobile">Mobile Apps</MenuItem>
 *   </NavDropdown>
 * </Nav>
 * ```
 */
export const Nav = forwardRef<HTMLUListElement, NavProps>(
  (
    { children, alignment = 'start', variant = 'default', className = '', disabled = false },
    ref
  ) => {
    const { generateNavClass } = useNav({ alignment, variant });

    const navClass = generateNavClass({ alignment, variant, className });

    return (
      <ul ref={ref} className={navClass} role="menubar" aria-orientation="horizontal">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            // Pass disabled prop down to all children if Nav is disabled
            return React.cloneElement(child, {
              ...child.props,
              disabled: disabled ? true : child.props.disabled,
            });
          }
          return child;
        })}
      </ul>
    );
  }
);

export type { NavProps };

Nav.displayName = 'Nav';

export default Nav;
