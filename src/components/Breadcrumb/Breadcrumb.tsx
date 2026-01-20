import React, { ReactNode, memo } from 'react';
import { BREADCRUMB } from '../../lib/constants/components';

export interface BreadcrumbItem {
  /**
   * Text to display
   */
  label: string;

  /**
   * URL for the breadcrumb item
   */
  href?: string;

  /**
   * Whether this item is active (current page)
   */
  active?: boolean;

  /**
   * Optional icon to display before the label
   */
  icon?: ReactNode;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Custom style for the breadcrumb item
   */
  style?: React.CSSProperties;

  /**
   * Additional className
   */
  className?: string;
}

export interface BreadcrumbProps {
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Custom divider character or element
   */
  divider?: ReactNode;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Aria label for the navigation
   */
  'aria-label'?: string;

  /**
   * Optional custom link component
   */
  LinkComponent?: React.ElementType;

  /**
   * Custom style for the breadcrumb
   */
  style?: React.CSSProperties;
}
export const Breadcrumb: React.FC<BreadcrumbProps> = memo(({
  items,
  divider,
  className = '',
  'aria-label': ariaLabel = 'Breadcrumb',
  LinkComponent,
  style,
}) => {
  const breadcrumbClasses = [BREADCRUMB.CLASSES.BASE, className].filter(Boolean).join(' ');

  return (
    <nav aria-label={ariaLabel} style={style}>
      <ol className={breadcrumbClasses}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const itemClasses = [
            BREADCRUMB.CLASSES.ITEM,
            item.active || isLast ? BREADCRUMB.CLASSES.ACTIVE : '',
          ]
            .filter(Boolean)
            .join(' ');

          const linkContent = (
            <>
              {item.icon && <span className="c-breadcrumb__icon">{item.icon}</span>}
              {item.label}
            </>
          );

          const linkProps = {
            href: item.href,
            className: BREADCRUMB.CLASSES.LINK,
            onClick: item.onClick,
            style: item.style,
          };

          return (
            <li key={index} className={itemClasses} style={item.style}>
              {item.href && !item.active ? (
                LinkComponent ? (
                  (() => {
                    const Component = LinkComponent as React.ComponentType<any>;
                    return (
                      <Component {...(linkProps as React.ComponentProps<React.ElementType>)}>
                        {linkContent}
                      </Component>
                    );
                  })()
                ) : (
                  <a {...(linkProps as React.ComponentProps<'a'>)}>{linkContent}</a>
                )
              ) : (
                <span className={BREADCRUMB.CLASSES.LINK}>{linkContent}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
