import React, { forwardRef, useCallback, useMemo } from 'react';
import { CARD } from '../../lib/constants/components';
import { CardProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export const Card = React.memo(
  forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>(
    (
      {
        // Variants
        size = 'md',
        variant = '',
        appearance = 'filled',
        elevation = 'none',
        hoverable = false,
        hoverElevation = 'md',
        // Layout
        row = false,
        flat = false,
        // States
        active = false,
        disabled = false,
        loading = false,
        selected = false,
        interactive = false,
        // Content
        header,
        image,
        imageAlt = '',
        title,
        text,
        actions,
        icon,
        footer,
        children,
        // Interaction
        onClick,
        onHover,
        onFocus,
        href,
        target,
        // Custom Link
        LinkComponent,
        // Glass
        glass,
        // Accessibility
        role,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        tabIndex,
        // Styling
        className = '',
        style,
        ...rest
      },
      ref
    ) => {
      // Determine if card is clickable/interactive
      const isClickable = Boolean(onClick || href || interactive);
      const isDisabled = disabled || loading;

      // Build CSS classes using BEM methodology
      const cardClasses = useMemo(
        () =>
          [
            CARD.CLASSES.BASE,
            // Size modifiers
            size === 'sm' ? CARD.CLASSES.SM : '',
            size === 'md' ? CARD.CLASSES.MD : '',
            size === 'lg' ? CARD.CLASSES.LG : '',
            // Variant modifiers (will be handled in SCSS with @each)
            variant ? `c-card--${variant}` : '',
            // Appearance modifiers
            appearance === 'filled' ? CARD.CLASSES.FILLED : '',
            appearance === 'outlined' ? CARD.CLASSES.OUTLINED : '',
            appearance === 'ghost' ? CARD.CLASSES.GHOST : '',
            appearance === 'elevated' ? CARD.CLASSES.ELEVATED : '',
            // Elevation modifiers
            elevation === 'none' ? CARD.CLASSES.ELEVATION_NONE : '',
            elevation === 'sm' ? CARD.CLASSES.ELEVATION_SM : '',
            elevation === 'md' ? CARD.CLASSES.ELEVATION_MD : '',
            elevation === 'lg' ? CARD.CLASSES.ELEVATION_LG : '',
            elevation === 'xl' ? CARD.CLASSES.ELEVATION_XL : '',
            // Hoverable modifier
            hoverable ? 'c-card--hoverable' : '',
            hoverable && hoverElevation ? `c-card--hover-elevation-${hoverElevation}` : '',
            // Layout modifiers
            row ? CARD.CLASSES.ROW : '',
            flat ? CARD.CLASSES.FLAT : '',
            // State modifiers
            active ? CARD.CLASSES.ACTIVE : '',
            disabled ? CARD.CLASSES.DISABLED : '',
            loading ? CARD.CLASSES.LOADING : '',
            selected ? CARD.CLASSES.SELECTED : '',
            interactive || isClickable ? CARD.CLASSES.INTERACTIVE : '',
            glass ? CARD.CLASSES.GLASS : '',
            className,
          ]
            .filter(Boolean)
            .join(' '),
        [
          size,
          variant,
          appearance,
          elevation,
          hoverable,
          hoverElevation,
          row,
          flat,
          active,
          disabled,
          loading,
          selected,
          interactive,
          isClickable,
          glass,
          className,
        ]
      );

      // Determine ARIA role
      const cardRole = useMemo(() => {
        if (role) return role;
        if (href) return 'link';
        if (isClickable) return 'button';
        return 'article';
      }, [role, href, isClickable]);

      // Handle click events
      const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        },
        [isDisabled, onClick]
      );

      // Handle keyboard events for accessibility
      const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }

          // Enter or Space activates clickable cards
          if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            if (onClick) {
              onClick(event as unknown as React.MouseEvent<HTMLDivElement | HTMLAnchorElement>);
            }
            // If href is provided, the anchor will handle navigation
          }
        },
        [isDisabled, isClickable, onClick]
      );

      // Handle hover events
      const handleMouseEnter = useCallback(
        (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
          if (!isDisabled) {
            onHover?.(event);
          }
        },
        [isDisabled, onHover]
      );

      // Handle focus events
      const handleFocusEvent = useCallback(
        (event: React.FocusEvent<HTMLDivElement | HTMLAnchorElement>) => {
          if (!isDisabled) {
            onFocus?.(event);
          }
        },
        [isDisabled, onFocus]
      );

      // Determine tab index
      const effectiveTabIndex = useMemo(() => {
        if (tabIndex !== undefined) return tabIndex;
        if (isDisabled) return -1;
        if (isClickable) return 0;
        return undefined;
      }, [tabIndex, isDisabled, isClickable]);

      // Card content structure
      const cardContent = useMemo(
        () => (
          <>
            {loading && (
              <div className="c-card__loading" aria-label="Loading">
                <div className="c-card__spinner" />
              </div>
            )}

            {(image || icon || header) && (
              <div className={CARD.SELECTORS.HEADER.substring(1)}>
                {header}
                {image && (
                  <img
                    src={image}
                    alt={imageAlt}
                    className={CARD.SELECTORS.IMAGE.substring(1)}
                    loading="lazy"
                  />
                )}
                {icon && <div className={CARD.SELECTORS.ICON.substring(1)}>{icon}</div>}
              </div>
            )}

            <div className={CARD.SELECTORS.BODY.substring(1)}>
              {title && <h3 className={CARD.SELECTORS.TITLE.substring(1)}>{title}</h3>}
              {text && <p className={CARD.SELECTORS.TEXT.substring(1)}>{text}</p>}
              {children}
            </div>

            {actions && <div className={CARD.SELECTORS.ACTIONS.substring(1)}>{actions}</div>}

            {footer && <div className={CARD.SELECTORS.FOOTER.substring(1)}>{footer}</div>}
          </>
        ),
        [loading, image, imageAlt, icon, header, title, text, children, actions, footer]
      );

      // Common props for both div and anchor
      const commonProps = {
        // ref is applied individually to ensure correct typing for polymorphic behavior
        className: cardClasses,
        style,
        role: cardRole,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': isDisabled ? true : undefined,
        tabIndex: effectiveTabIndex,
        onClick: isClickable ? handleClick : undefined,
        onKeyDown: isClickable ? handleKeyDown : undefined,
        onMouseEnter: onHover ? handleMouseEnter : undefined,
        onFocus: onFocus ? handleFocusEvent : undefined,
        ...rest,
      };

      // Render as anchor if href is provided
      if (href && !isDisabled) {
        let anchorElement: React.ReactElement;

        if (LinkComponent) {
          const LinkComp = LinkComponent as React.ComponentType<any>;
          anchorElement = (
            <LinkComp
              {...commonProps}
              ref={ref as React.Ref<HTMLAnchorElement>}
              href={href}
              to={href}
              target={target}
              rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              {cardContent}
            </LinkComp>
          );
        } else {
          anchorElement = (
            <a
              {...commonProps}
              ref={ref as React.Ref<HTMLAnchorElement>}
              href={href}
              target={target}
              rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              {cardContent}
            </a>
          );
        }

        if (glass) {
          const glassProps = glass === true ? {} : glass;
          return <AtomixGlass {...{ ...glassProps, elasticity: 0 }}>{anchorElement}</AtomixGlass>;
        }

        return anchorElement;
      }

      // Render as div
      const divElement = (
        <div {...commonProps} ref={ref as React.Ref<HTMLDivElement>}>
          {cardContent}
        </div>
      );

      if (glass) {
        const glassProps = glass === true ? {} : glass;
        return <AtomixGlass {...{ ...glassProps, elasticity: 0 }}>{divElement}</AtomixGlass>;
      }

      return divElement;
    }
  )
);

Card.displayName = 'Card';

// Card subcomponents for structured content
export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Header title
   */
  title?: React.ReactNode;
  /**
   * Header subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Action element (e.g., button) to display in header
   */
  action?: React.ReactNode;
  /**
   * Icon to display in header
   */
  icon?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, icon, children, className = '', ...props }, ref) => {
    const headerClasses = `${CARD.SELECTORS.HEADER.substring(1)} ${className}`.trim();

    return (
      <div ref={ref} className={headerClasses} {...props}>
        {icon && <div className={CARD.SELECTORS.ICON.substring(1)}>{icon}</div>}
        {(title || subtitle) && (
          <div>
            {title && <h3 className={CARD.SELECTORS.TITLE.substring(1)}>{title}</h3>}
            {subtitle && <p className={CARD.SELECTORS.TEXT.substring(1)}>{subtitle}</p>}
          </div>
        )}
        {action && <div className={CARD.SELECTORS.ACTIONS.substring(1)}>{action}</div>}
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Make body scrollable
   */
  scrollable?: boolean;
  /**
   * Maximum height for scrollable body
   */
  maxHeight?: string | number;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ scrollable = false, maxHeight, children, className = '', style, ...props }, ref) => {
    const bodyClasses =
      `${CARD.SELECTORS.BODY.substring(1)} ${scrollable ? 'c-card__body--scrollable' : ''} ${className}`.trim();
    const bodyStyle: React.CSSProperties = {
      ...style,
      ...(scrollable && maxHeight
        ? {
            maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
            overflowY: 'auto',
          }
        : {}),
    };

    return (
      <div ref={ref} className={bodyClasses} style={bodyStyle} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Footer alignment
   */
  align?: 'start' | 'center' | 'end' | 'between';
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align, children, className = '', style, ...props }, ref) => {
    const footerClasses =
      `${CARD.SELECTORS.FOOTER.substring(1)} ${align ? `c-card__footer--align-${align}` : ''} ${className}`.trim();

    return (
      <div ref={ref} className={footerClasses} style={style} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Attach subcomponents to Card
(Card as any).Header = CardHeader;
(Card as any).Body = CardBody;
(Card as any).Footer = CardFooter;

export type { CardProps };

export default Card;
