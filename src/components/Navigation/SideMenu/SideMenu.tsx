import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { SideMenuProps } from '../../../lib/types/components';
import { useSideMenu } from '../../../lib/composables/useSideMenu';
import { SIDE_MENU } from '../../../lib/constants/components';
import { Icon } from '../../Icon';
import { AtomixGlass } from '../../AtomixGlass/AtomixGlass';
import { log } from 'console';

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
      style,
      disabled = false,
      toggleIcon,
      id,
      glass,
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

    const sideMenuContent = (
      <>
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
      </>
    );

    if (glass) {
      const defaultGlassProps = {
        displacementScale: 70,
        blurAmount: 2,
        cornerRadius: 12,
        mode: 'shader' as const,
      };
      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
      return (
        <AtomixGlass {...glassProps}>
          <div ref={ref} className={sideMenuClass + ' c-side-menu--glass'} id={id} style={style}>
            {sideMenuContent}
          </div>
        </AtomixGlass>
      );
    }

    return (
      <div ref={ref} className={sideMenuClass} id={id} style={style}>
        {sideMenuContent}
      </div>
    );
  }
);

export type { SideMenuProps };

SideMenu.displayName = 'SideMenu';

export default SideMenu;
