import React from 'react';
import { ListGroupProps as ListGroupPropsType } from '../../lib/types/components';
import { LIST_GROUP } from '../../lib/constants/components';
import { List } from './List';

export type ListGroupProps = ListGroupPropsType;

export const ListGroup: React.FC<ListGroupProps> = ({
  children,
  className = '',
  style,
  variant = 'default',
}) => {
  // Generate CSS classes
  const listGroupClasses = [LIST_GROUP.BASE_CLASS, className].filter(Boolean).join(' ');

  // Get valid List children
  const validLists = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === List
  ) as React.ReactElement[];

  return (
    <div className={listGroupClasses} style={style}>
      {validLists.map((child, index) => {
        const childProps = child.props as any;
        return React.cloneElement(child as React.ReactElement<any>, {
          key: index,
          variant: childProps?.variant ?? variant,
        });
      })}
    </div>
  );
};

ListGroup.displayName = 'ListGroup';

export default ListGroup;
