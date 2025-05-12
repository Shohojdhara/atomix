import React, { ReactNode, forwardRef } from 'react';
import Card, { CardProps } from './Card';
import useCard from './useCard';

export interface ElevationCardProps extends CardProps {
  /**
   * CSS class for elevation effect
   */
  elevationClass?: string;
}

export const ElevationCard: React.FC<ElevationCardProps> = ({
  elevationClass = 'is-elevated',
  className = '',
  children,
  onClick,
  ...props
}) => {
  const { getCardProps } = useCard({
    elevationEffect: true,
    elevationClass,
    clickable: !!onClick,
    onClick: onClick as (event: React.MouseEvent) => void,
    focusEffect: true
  });
  
  const cardProps = getCardProps();
  
  return (
    <div
      className={`${className} ${cardProps.className}`}
      ref={cardProps.ref}
      tabIndex={cardProps.tabIndex}
      role={cardProps.role}
      onMouseEnter={cardProps.onMouseEnter}
      onMouseLeave={cardProps.onMouseLeave}
      onFocus={cardProps.onFocus}
      onBlur={cardProps.onBlur}
      onClick={cardProps.onClick as unknown as React.MouseEventHandler<HTMLDivElement>}
      onKeyDown={cardProps.onKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>}
    >
      <Card 
        {...props}
        className=""
        onClick={undefined}
      >
        {children}
      </Card>
    </div>
  );
};

export default ElevationCard; 