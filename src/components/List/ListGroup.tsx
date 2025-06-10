import React from 'react';
import classNames from 'classnames';
import { ListGroupProps } from '../../lib/types/components';
import { LIST_GROUP } from '../../lib/constants/components';
import { List } from './List';

export const ListGroup: React.FC<ListGroupProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  // Generate CSS classes
  const listGroupClasses = classNames(LIST_GROUP.BASE_CLASS, className);

  // Get valid List children
  const validLists = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === List
  ) as React.ReactElement[];

  return (
    <div className={listGroupClasses}>
      {validLists.map((child, index) => {
        return React.cloneElement(child, {
          key: index,
          variant: (child.props as any).variant ?? variant,
        });
      })}
    </div>
  );
};

ListGroup.displayName = 'ListGroup';

export default ListGroup;
