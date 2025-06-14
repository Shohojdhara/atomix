import React, { RefObject } from 'react';
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
    clickable: Boolean(onClick),
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

export type { ElevationCardProps };

ElevationCard.displayName = 'ElevationCard';  

export default ElevationCard;