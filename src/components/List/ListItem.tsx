import React, { forwardRef } from 'react';
import { LIST } from '../../lib/constants/components';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <li ref={ref} className={`${LIST.ITEM_CLASS} ${className}`.trim()} {...props}>
        {children}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
