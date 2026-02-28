import React, { forwardRef } from 'react';
import { FooterLinkProps } from '../../lib/types/components';

/**
 * FooterLink component provides styled links for use within footer sections.
 *
 * @example
 * ```tsx
 * <FooterLink href="/about" icon={<InfoIcon />} external>
 *   About Us
 * </FooterLink>
 * ```
 */
export const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  (
    {
      href,
      icon,
      external = false,
      active = false,
      disabled = false,
      onClick,
      children,
      className = '',
      linkComponent,
      ...props
    },
    ref
  ) => {
    const linkClass = [
      'c-footer__link',
      active && 'c-footer__link--active',
      disabled && 'c-footer__link--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const sharedProps = {
      className: linkClass,
      onClick: disabled ? undefined : onClick,
      'aria-disabled': disabled,
      ...(external && {
        target: '_blank' as const,
        rel: 'noopener noreferrer',
      }),
      ...props,
    };

    const linkContent = (
      <>
        {icon && <span className="c-footer__link-icon">{icon}</span>}
        <span className="c-footer__link-text">{children}</span>
        {external && <span className="c-footer__link-external">↗</span>}
      </>
    );

    if (linkComponent) {
      const Component = linkComponent as React.ComponentType<any>;
      return (
        <Component ref={ref} {...(href && !disabled ? { href, to: href } : {})} {...sharedProps}>
          {linkContent}
        </Component>
      );
    }

    return (
      <a ref={ref} href={disabled ? undefined : href} {...sharedProps}>
        {linkContent}
      </a>
    );
  }
);

FooterLink.displayName = 'FooterLink';

export default FooterLink;
