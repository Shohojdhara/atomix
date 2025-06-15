import React, { forwardRef } from 'react';
import { SideMenuListProps } from '../../../lib/types/components';

/**
 * SideMenuList component provides a container for side menu items.
 * 
 * @example
 * ```tsx
 * <SideMenuList>
 *   <SideMenuItem href="/" active>Home</SideMenuItem>
 *   <SideMenuItem href="/about">About</SideMenuItem>
 *   <SideMenuItem href="/contact">Contact</SideMenuItem>
 * </SideMenuList>
 * ```
 */
export const SideMenuList = forwardRef<HTMLUListElement, SideMenuListProps>(
  ({ children, className = '' }, ref) => {
    const listClass = `c-side-menu__list ${className}`.trim();

    return (
      <ul ref={ref} className={listClass} role="list">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <li key={index} className="c-side-menu__item" role="listitem">
                {child}
              </li>
            );
          }
          return child;
        })}
      </ul>
    );
  }
);

export type { SideMenuListProps };

SideMenuList.displayName = 'SideMenuList';

export default SideMenuList;