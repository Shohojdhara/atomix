import React, { forwardRef, Ref } from 'react';
import { CARD } from '../../lib/constants/components';
import { CardProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
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
      styles,
      glass,
      ...rest
    },
    ref
  ) => {
    const cardClasses = [
      CARD.CLASSES.BASE,
      row ? CARD.CLASSES.ROW : '',
      flat ? CARD.CLASSES.FLAT : '',
      active ? CARD.CLASSES.ACTIVE : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    
    const cardContent = (
      <>
        {(image || icon || header) && (
          <div className={CARD.SELECTORS.HEADER.substring(1)}>
            {header}
            {image && (
              <img src={image} alt={imageAlt} className={CARD.SELECTORS.IMAGE.substring(1)} />
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
    );

    if (glass) {
      const glassProps = glass === true ? {} : glass;
      return (
        <div ref={ref} className={cardClasses + ' c-card--glass'} onClick={onClick} {...rest} style={{ ...styles}}><AtomixGlass {...{...glassProps, cornerRadius: 10}}><div className="c-card__glass-content">{cardContent}</div></AtomixGlass></div>
      );
    }

    return (
      <div ref={ref} className={cardClasses} onClick={onClick} {...rest} style={{ ...styles}}>
        {cardContent}
      </div>
    );
  }
);

export type { CardProps };

Card.displayName = 'Card';

export default Card;
