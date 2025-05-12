import React, { ReactNode } from 'react';
import useCard from './useCard';

export interface FlipCardProps {
  /**
   * Front side content
   */
  front: ReactNode;
  
  /**
   * Back side content
   */
  back: ReactNode;
  
  /**
   * Flip trigger: 'click' or 'hover'
   */
  trigger?: 'click' | 'hover';
  
  /**
   * Additional className
   */
  className?: string;
  
  /**
   * Card height
   */
  height?: string | number;
  
  /**
   * Card width
   */
  width?: string | number;
  
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  trigger = 'click',
  className = '',
  height = '300px',
  width = '100%',
  onClick
}) => {
  const { 
    cardRef, 
    frontRef, 
    backRef, 
    getCardProps 
  } = useCard({
    flipEffect: true,
    flipTrigger: trigger,
    clickable: !!onClick,
    onClick: onClick as (event: React.MouseEvent) => void
  });
  
  const cardProps = getCardProps();
  
  const cardStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
    position: 'relative'
  };
  
  const sideStyle: React.CSSProperties = {
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  };
  
  return (
    <div
      {...cardProps}
      style={cardStyle}
      className={`flip-card ${className} ${cardProps.className}`}
      onClick={cardProps.onClick as unknown as React.MouseEventHandler<HTMLDivElement>}
      onKeyDown={cardProps.onKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>}
    >
      <div 
        ref={frontRef} 
        className="flip-card-front"
        style={sideStyle}
      >
        {front}
      </div>
      <div 
        ref={backRef} 
        className="flip-card-back"
        style={sideStyle}
      >
        {back}
      </div>
    </div>
  );
};

export default FlipCard; 