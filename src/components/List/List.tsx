import React from 'react';
import { ListProps } from '../../lib/types/components';
import { LIST } from '../../lib/constants/components';

const List: React.FC<ListProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  // Generate CSS classes
  const listClasses = [
    LIST.BASE_CLASS,
    variant !== 'default' && `c-list--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  // Determine the HTML element based on variant
  const ListElement = ['number', 'text'].includes(variant) ? 'ol' : 'ul';

  return (
    <ListElement className={listClasses} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return <li className="c-list__item">{child}</li>;
        }
        return <li className="c-list__item">{child}</li>;
      })}
    </ListElement>
  );
};



export type { ListProps  };

// Set display name for debugging
List.displayName = 'List';

// Default export (primary)
export default List;

// Named export for compatibility
export { List };