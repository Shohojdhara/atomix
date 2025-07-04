import React, { ReactNode } from 'react';
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
  ariaLabel?: string;

  /**
   * Optional custom link component
   */
  LinkComponent?: React.ElementType;
}
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  divider,
  className = '',
  ariaLabel = 'Breadcrumb',
  LinkComponent,
}) => {
  const breadcrumbClasses = [BREADCRUMB.CLASSES.BASE, className].filter(Boolean).join(' ');

  return (
    <nav aria-label={ariaLabel}>
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
          };

          return (
            <li key={index} className={itemClasses}>
              {item.href && !item.active ? (
                LinkComponent ? (
                  <LinkComponent {...linkProps}>{linkContent}</LinkComponent>
                ) : (
                  <a {...linkProps}>{linkContent}</a>
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
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
