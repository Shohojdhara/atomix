import React, { memo } from 'react';
import { ListProps } from '../../lib/types/components';
import { LIST } from '../../lib/constants/components';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = memo(({ children, className = '', ...props }) => {
  return (
    <li className={`c-list__item ${className}`.trim()} {...props}>
      {children}
    </li>
  );
});

ListItem.displayName = 'ListItem';

type ListComponent = React.FC<ListProps> & {
  Item: typeof ListItem;
};

const ListComp: React.FC<ListProps> = memo(
  ({ children, variant = 'default', className = '', style, ...props }) => {
    // Generate CSS classes
    const listClasses = [LIST.BASE_CLASS, variant !== 'default' && `c-list--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    // Determine the HTML element based on variant
    const ListElement = ['number', 'text'].includes(variant) ? 'ol' : 'ul';

    return (
      <ListElement className={listClasses} style={style} {...props}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
             // Check if child is ListItem component
             if (child.type === ListItem || (child.type as any).displayName === 'ListItem') {
                return child;
             }

             // Legacy behavior: wrap content in ListItem
             return <ListItem>{child}</ListItem>;
          }
          // Wrap non-element children (text nodes etc)
          return <ListItem>{child}</ListItem>;
        })}
      </ListElement>
    );
  }
);

export const List = ListComp as ListComponent;

export type { ListProps };

List.displayName = 'List';
List.Item = ListItem;

export default List;
