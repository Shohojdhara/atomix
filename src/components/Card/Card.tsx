import React, { ReactNode } from 'react';
import { CARD } from '../../lib/constants/components';

export interface CardProps {
  /**
   * Card header content
   */
  header?: ReactNode;
  
  /**
   * Card image source URL
   */
  image?: string;
  
  /**
   * Alternative text for the image
   */
  imageAlt?: string;
  
  /**
   * Card title
   */
  title?: ReactNode;
  
  /**
   * Card text content
   */
  text?: ReactNode;
  
  /**
   * Card actions (buttons, links, etc.)
   */
  actions?: ReactNode;
  
  /**
   * Card icon
   */
  icon?: ReactNode;
  
  /**
   * Card footer content
   */
  footer?: ReactNode;
  
  /**
   * Row layout (horizontal card)
   */
  row?: boolean;
  
  /**
   * Flat style (no padding on image container)
   */
  flat?: boolean;
  
  /**
   * Active state
   */
  active?: boolean;
  
  /**
   * Additional className
   */
  className?: string;
  
  /**
   * Card content (body)
   */
  children?: ReactNode;
  
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Card: React.FC<CardProps> = ({
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
}) => {
  const cardClasses = [
    CARD.CLASSES.BASE,
    row ? CARD.CLASSES.ROW : '',
    flat ? CARD.CLASSES.FLAT : '',
    active ? CARD.CLASSES.ACTIVE : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
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
        {(title ) && (
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
};

export default Card; 