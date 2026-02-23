import React, { ReactNode, memo, forwardRef, Children, cloneElement, isValidElement } from 'react';
import { BREADCRUMB } from '../../lib/constants/components';

// Legacy Item Interface
export interface BreadcrumbItemData {
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

// Compound Component Props
export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
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
   * Optional click handler for the link
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;

  /**
   * Optional custom link component
   */
  linkAs?: React.ElementType;

  /**
   * Link props to pass to the underlying anchor or LinkComponent
   */
  linkProps?: Record<string, any>;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    {
      children,
      href,
      active,
      icon,
      onClick,
      className = '',
      style,
      linkAs: LinkComponent,
      linkProps = {},
      ...props
    },
    ref
  ) => {
    const itemClasses = [BREADCRUMB.CLASSES.ITEM, active ? BREADCRUMB.CLASSES.ACTIVE : '', className]
      .filter(Boolean)
      .join(' ');

    const linkContent = (
      <>
        {icon && <span className="c-breadcrumb__icon">{icon}</span>}
        {children}
      </>
    );

    const commonLinkProps = {
      className: BREADCRUMB.CLASSES.LINK,
      onClick: onClick as any,
      style,
      ...linkProps,
    };

    return (
      <li ref={ref} className={itemClasses} style={style} {...props}>
        {href && !active ? (
          LinkComponent ? (
            React.createElement(LinkComponent as any, { href, ...commonLinkProps }, linkContent)
          ) : (
            <a href={href} {...(commonLinkProps as React.HTMLAttributes<HTMLAnchorElement>)}>
              {linkContent}
            </a>
          )
        ) : (
          <span className={BREADCRUMB.CLASSES.LINK}>{linkContent}</span>
        )}
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbProps {
  /**
   * Array of breadcrumb items (Legacy)
   */
  items?: BreadcrumbItemData[];

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

  /**
   * Children (Compound)
   */
  children?: ReactNode;
}

type BreadcrumbComponent = React.FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
};

const BreadcrumbComp: React.FC<BreadcrumbProps> = memo(
  ({
    items,
    divider,
    className = '',
    'aria-label': ariaLabel = 'Breadcrumb',
    LinkComponent,
    style,
    children,
  }) => {
    const breadcrumbClasses = [BREADCRUMB.CLASSES.BASE, className].filter(Boolean).join(' ');

    let content: ReactNode;

    if (items && items.length > 0) {
      // Legacy rendering
      content = items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <BreadcrumbItem
            key={index}
            href={item.href}
            active={item.active || isLast}
            icon={item.icon}
            onClick={item.onClick as any}
            className={item.className}
            style={item.style}
            linkAs={LinkComponent}
          >
            {item.label}
          </BreadcrumbItem>
        );
      });
    } else {
      // Compound rendering
      const childrenCount = Children.count(children);
      content = Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const isLast = index === childrenCount - 1;
          const childProps = child.props as any;

          return cloneElement(child, {
            active: childProps.active ?? (isLast ? true : undefined),
            linkAs: childProps.linkAs ?? LinkComponent,
          } as any);
        }
        return child;
      });
    }

    return (
      <nav aria-label={ariaLabel} style={style}>
        <ol className={breadcrumbClasses}>
          {content}
        </ol>
      </nav>
    );
  }
);

export const Breadcrumb = BreadcrumbComp as BreadcrumbComponent;

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
