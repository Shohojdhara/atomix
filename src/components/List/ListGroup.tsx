import React, { Children, cloneElement, isValidElement } from 'react';
import { ListGroupProps, ListProps } from '../../lib/types/components';
import { LIST_GROUP } from '../../lib/constants/components';
import { List } from './List';

export const ListGroup: React.FC<ListGroupProps> = ({
  children,
  className = '',
  variant = 'default',
  
}) => {
  // Generate CSS classes
  const listGroupClasses = [
    LIST_GROUP.BASE_CLASS,
    className,
  ].filter(Boolean).join(' ');

  // Get valid List children
  const listChildren = Children.toArray(children).filter(
    child => isValidElement(child) && child.type === List
  );

  return (
    <div className={listGroupClasses}>
      {listChildren.map((child, index) => {
        if (isValidElement<ListProps>(child)) {
          // Clone the List element to ensure proper styling
          return cloneElement(child, {
            key: index,
            variant: (child.props.variant || variant) as ListProps['variant'],
            ...child.props,
          });
        }
        return null;
      })}
    </div>
  );
};

export default ListGroup;