import React, { forwardRef, Ref } from 'react';
import { CARD } from '../../lib/constants/components';
import { CardProps } from '../../lib/types/components';

 const Card = forwardRef<HTMLDivElement, CardProps>(({
  header,
  image,
  imageAlt = '',
  title,
  text,
  actions,
  icon,
  footer,
  row = false,
  flat = false,
  active = false,
  className = '',
  children,
  onClick,
  ...rest
}, ref) => {
  const cardClasses = [
    CARD.CLASSES.BASE,
    row ? CARD.CLASSES.ROW : '',
    flat ? CARD.CLASSES.FLAT : '',
    active ? CARD.CLASSES.ACTIVE : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      {...rest}
    >
      {(image || icon || header) && (
        <div className={CARD.SELECTORS.HEADER.substring(1)}>
            {header}
            {image && (
              <img
                src={image}
                alt={imageAlt}
                className={CARD.SELECTORS.IMAGE.substring(1)}
              />
            )}

            {icon && (
              <div className={CARD.SELECTORS.ICON.substring(1)}>
                {icon}
              </div>
            )}
        </div>
      )}

      <div className={CARD.SELECTORS.BODY.substring(1)}>
        {title && (
          <h3 className={CARD.SELECTORS.TITLE.substring(1)}>
            {title}
          </h3>
        )}

        {text && (
          <p className={CARD.SELECTORS.TEXT.substring(1)}>
            {text}
          </p>
        )}

        {children}
      </div>

      {actions && (
        <div className={CARD.SELECTORS.ACTIONS.substring(1)}>
          {actions}
        </div>
      )}

      {footer && (
        <div className={CARD.SELECTORS.FOOTER.substring(1)}>
          {footer}
        </div>
      )}
    </div>
  );
});


export type { CardProps  };

// Set display name for debugging
Card.displayName = 'Badge';

// Default export (primary)
export default Card;

// Named export for compatibility
export { Card };