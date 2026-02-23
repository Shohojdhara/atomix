import React, { memo } from 'react';
import { ListProps } from '../../lib/types/components';
import { LIST } from '../../lib/constants/components';
import { ListItem } from './ListItem';

export type { ListProps };

export type ListComponent = React.FC<ListProps> & {
  Item: typeof ListItem;
};

export const List: ListComponent = memo(
  ({ children, variant = 'default', className = '', style, ...props }: ListProps) => {
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
            // Check if child is a ListItem
            if (child.type === ListItem) {
              return child;
            }
            // Legacy behavior: wrap in li
            return <li className="c-list__item">{child}</li>;
          }
          return <li className="c-list__item">{child}</li>;
        })}
      </ListElement>
    );
  }
) as unknown as ListComponent;

List.displayName = 'List';
List.Item = ListItem;

export default List;
