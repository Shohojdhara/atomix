import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { SideMenuProps } from '../../../lib/types/components';
import { useSideMenu } from '../../../lib/composables/useSideMenu';
import { SIDE_MENU } from '../../../lib/constants/components';
import { Icon } from '../../Icon';

/**
 * SideMenu component provides a collapsible navigation menu with title and menu items.
 * Automatically collapses on mobile devices and can be toggled via a header button.
 *
 * @example
 * ```tsx
 * <SideMenu title="Navigation">
 *   <SideMenuList>
 *     <SideMenuItem href="/" active>Home</SideMenuItem>
 *     <SideMenuItem href="/about">About</SideMenuItem>
 *     <SideMenuItem href="/contact">Contact</SideMenuItem>
 *   </SideMenuList>
 * </SideMenu>
 * ```
 */
export const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(
  (
    {
      title,
      children,
      isOpen,
      onToggle,
      collapsible = true,
      className = '',
      disabled = false,
      toggleIcon,
      id,
    },
    ref
  ) => {
    const {
      isOpenState,
      wrapperRef,
      innerRef,
      generateSideMenuClass,
      generateWrapperClass,
      handleToggle,
    } = useSideMenu({
      isOpen,
      onToggle,
      collapsible,
      disabled,
    });

    const sideMenuClass = generateSideMenuClass({ className, isOpen: isOpenState });
    const wrapperClass = generateWrapperClass();

    // Default toggle icon using Atomix Icon component
    const defaultToggleIcon = <Icon name="CaretRight" size="xs" />;

    return (
      <div ref={ref} className={sideMenuClass} id={id}>
        {title && collapsible && (
          <div
            className="c-side-menu__toggler"
            onClick={handleToggle}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-expanded={isOpenState}
            aria-controls={id ? `${id}-content` : undefined}
            aria-disabled={disabled}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                e.preventDefault();
                handleToggle();
              }
            }}
          >
            <span className="c-side-menu__title">{title}</span>
            <span className="c-side-menu__toggler-icon">{toggleIcon || defaultToggleIcon}</span>
          </div>
        )}

        {title && !collapsible && <h3 className="c-side-menu__title">{title}</h3>}

        <div
          ref={wrapperRef}
          className={wrapperClass}
          id={id ? `${id}-content` : undefined}
          aria-hidden={collapsible ? !isOpenState : false}
        >
          <div ref={innerRef} className="c-side-menu__inner">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

export type { SideMenuProps };

SideMenu.displayName = 'SideMenu';

export default SideMenu;
