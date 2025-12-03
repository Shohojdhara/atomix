import React, { forwardRef } from 'react';
import { SideMenuItemProps } from '../../../lib/types/components';
import { useSideMenuItem } from '../../../lib/composables/useSideMenu';
import { useSideMenuContext } from './SideMenu';

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
      LinkComponent: LinkComponentProp,
    },
    ref
  ) => {
    const { LinkComponent: LinkComponentFromContext } = useSideMenuContext();
    // Use LinkComponent from props first, then fall back to context
    const LinkComponent = LinkComponentProp ?? LinkComponentFromContext;
    
    const { generateSideMenuItemClass, handleClick } = useSideMenuItem({
      active,
      disabled,
      className,
    });

    const itemClass = generateSideMenuItemClass();

    // Render as link if href is provided
    if (href) {
      // When using a custom LinkComponent (e.g., Next.js Link, React Router Link)
      if (LinkComponent) {
        const Component = LinkComponent;
        
        // Build link props - support both 'href' (Next.js) and 'to' (React Router)
        // The Link component will use whichever prop it needs
        const linkProps: {
          ref?: React.Ref<HTMLAnchorElement>;
          className?: string;
          onClick?: (event: React.MouseEvent) => void;
          'aria-disabled'?: boolean;
          'aria-current'?: string;
          target?: string;
          rel?: string;
          tabIndex?: number;
          href?: string;
          to?: string;
        } = {
          ref: ref as React.Ref<HTMLAnchorElement>,
          className: itemClass,
          onClick: disabled
            ? (e: React.MouseEvent) => {
                e.preventDefault();
              }
            : onClick,
          'aria-disabled': disabled,
          'aria-current': active ? 'page' : undefined,
          target: target,
          rel: rel,
          tabIndex: disabled ? -1 : 0,
          // Support both Next.js (href) and React Router (to) Link components
          // Pass both props - the Link component will use whichever it needs
          ...(disabled ? {} : { href, to: href }),
        };
        
        return (
          <Component {...linkProps}>
            {icon && <span className="c-side-menu__link-icon">{icon}</span>}
            <span className="c-side-menu__link-text">{children}</span>
          </Component>
        );
      }
      
      // Regular anchor tag
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
      
      return (
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
