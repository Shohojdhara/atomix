import React, { forwardRef } from 'react';
import { NavProps } from '../../../lib/types/components';
import { useNav } from '../../../lib/composables/useNavbar';
import { AtomixGlass } from '../../AtomixGlass/AtomixGlass';

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
    { children, alignment = 'start', variant = 'default', className = '', disabled = false, glass },
    ref
  ) => {
    const { generateNavClass } = useNav({ alignment, variant });

    const navClass = generateNavClass({ alignment, variant, className });

    const navContent = (
      <ul ref={ref} className={navClass + (glass ? ' c-nav--glass' : '')} role="menubar" aria-orientation="horizontal">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            const childProps = child.props as any;
            return React.cloneElement(child as React.ReactElement<any>, {
              ...childProps,
              disabled: disabled ? true : childProps?.disabled,
            });
          }
          return child;
        })}
      </ul>
    );

    if (glass) {
      const defaultGlassProps = {
        displacementScale: 60,
        blurAmount: 1.5,
        cornerRadius: 8,
        mode: 'shader' as const,
      };
      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
      return <AtomixGlass {...glassProps}>{navContent}</AtomixGlass>;
    }

    return navContent;
  }
);

export type { NavProps };

Nav.displayName = 'Nav';

export default Nav;
