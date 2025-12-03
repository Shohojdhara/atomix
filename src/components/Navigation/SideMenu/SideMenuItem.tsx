import React, { forwardRef } from 'react';
import { SideMenuItemProps } from '../../../lib/types/components';
import { useSideMenuItem } from '../../../lib/composables/useSideMenu';

/**
 * SideMenuItem component represents a single navigation item in a side menu.
 * Can be rendered as a link or button with active and disabled states.
 *
 * @example
 * ```tsx
 * // As a link
 * <SideMenuItem href="/about" active>About</SideMenuItem>
 *
 * // As a button
 * <SideMenuItem onClick={() => console.log('clicked')}>
 *   Click me
 * </SideMenuItem>
 *
 * // With icon
 * <SideMenuItem href="/settings" icon={<Icon name="Settings" />}>
 *   Settings
 * </SideMenuItem>
 *
 * // Disabled
 * <SideMenuItem href="/disabled" disabled>
 *   Disabled Item
 * </SideMenuItem>
 * ```
 */
export const SideMenuItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, SideMenuItemProps>(
  (
    {
      children,
      href,
      onClick,
      active = false,
      disabled = false,
      icon,
      className = '',
      target,
      rel,
      LinkComponent,
    },
    ref
  ) => {
    const { generateSideMenuItemClass, handleClick } = useSideMenuItem({
      active,
      disabled,
      className,
    });

    const itemClass = generateSideMenuItemClass();

    const linkProps = {
      ref: ref as React.Ref<HTMLAnchorElement>,
      href: disabled ? undefined : href,
      className: itemClass,
      onClick: handleClick(onClick),
      'aria-disabled': disabled,
      'aria-current': (active ? 'page' : undefined) as React.AriaAttributes['aria-current'],
      target: target,
      rel: rel,
      tabIndex: disabled ? -1 : 0,
    };

    // Render as link if href is provided
    if (href) {
      return LinkComponent ? (
        (() => {
          const Component = LinkComponent as React.ComponentType<any>;
          return (
            <Component {...linkProps}>
              {icon && <span className="c-side-menu__link-icon">{icon}</span>}
              <span className="c-side-menu__link-text">{children}</span>
            </Component>
          );
        })()
      ) : (
        <a {...linkProps}>
          {icon && <span className="c-side-menu__link-icon">{icon}</span>}
          <span className="c-side-menu__link-text">{children}</span>
        </a>
      );
    }

    // Render as button if no href
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={itemClass}
        onClick={handleClick(onClick)}
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        tabIndex={disabled ? -1 : 0}
      >
        {icon && <span className="c-side-menu__link-icon">{icon}</span>}
        <span className="c-side-menu__link-text">{children}</span>
      </button>
    );
  }
);

export type { SideMenuItemProps };

SideMenuItem.displayName = 'SideMenuItem';

export default SideMenuItem;
