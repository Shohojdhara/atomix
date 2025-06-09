import React from 'react';
import Card from './Card';
import { useCard } from '../../lib/composables/useCard';
import { ElevationCardProps } from '../../lib/types/components';

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
    <Card 
      {...props}
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
      {children}
    </Card>
  );
};

export default ElevationCard;