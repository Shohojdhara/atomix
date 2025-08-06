# List Component

The List component provides a flexible way to display ordered and unordered lists with various styling options. It supports different variants, custom styling, and can be grouped using the ListGroup component for enhanced presentation.

## Overview

Lists are fundamental components for displaying collections of related items. The Atomix List component offers multiple variants including default bullets, dashes, numbers, and text-based lists, making it suitable for various content types and design requirements.

## Props API

### ListProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | List items content |
| `items` | `ReactNode[]` | `undefined` | Array of items to render |
| `variant` | `ListVariant` | `'default'` | List style variant |
| `size` | `Size` | `'md'` | List size |
| `ordered` | `boolean` | `false` | Whether the list is ordered |
| `inline` | `boolean` | `false` | Display list items inline |
| `className` | `string` | `''` | Additional CSS classes |

### ListGroupProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | List components to group |
| `variant` | `Variant` | `'default'` | Group styling variant |
| `size` | `Size` | `'md'` | Group size |
| `className` | `string` | `''` | Additional CSS classes |

### Variant Options

- `default` - Standard bullet points
- `dash` - Dash-style bullets
- `number` - Numbered list (1, 2, 3...)
- `text` - Alphabetical list (a, b, c...)

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { List } from '@shohojdhara/atomix';

function BasicLists() {
  return (
    <div className="u-gap-4">
      {/* Default list */}
      <List>
        <span>First item</span>
        <span>Second item</span>
        <span>Third item</span>
      </List>
      
      {/* Using items prop */}
      <List items={['Item 1', 'Item 2', 'Item 3']} />
    </div>
  );
}
```

### List Variants

```jsx
function ListVariants() {
  const items = ['First item', 'Second item', 'Third item'];

  return (
    <div className="u-gap-6">
      {/* Default bullet list */}
      <div>
        <h3>Default List</h3>
        <List variant="default" items={items} />
      </div>
      
      {/* Dash list */}
      <div>
        <h3>Dash List</h3>
        <List variant="dash" items={items} />
      </div>
      
      {/* Numbered list */}
      <div>
        <h3>Numbered List</h3>
        <List variant="number" items={items} />
      </div>
      
      {/* Alphabetical list */}
      <div>
        <h3>Alphabetical List</h3>
        <List variant="text" items={items} />
      </div>
    </div>
  );
}
```

### Complex List Items

```jsx
import { Icon, Badge } from '@shohojdhara/atomix';

function ComplexListItems() {
  return (
    <List variant="dash">
      <div className="u-d-flex u-align-items-center u-gap-2">
        <Icon name="CheckCircle" color="#22c55e" size="sm" />
        <span>Completed task</span>
        <Badge label="Done" variant="success" size="sm" />
      </div>
      
      <div className="u-d-flex u-align-items-center u-gap-2">
        <Icon name="Clock" color="#f59e0b" size="sm" />
        <span>In progress task</span>
        <Badge label="Working" variant="warning" size="sm" />
      </div>
      
      <div className="u-d-flex u-align-items-center u-gap-2">
        <Icon name="Circle" color="#6b7280" size="sm" />
        <span>Pending task</span>
        <Badge label="Todo" variant="secondary" size="sm" />
      </div>
    </List>
  );
}
```

### Nested Lists

```jsx
function NestedLists() {
  return (
    <List variant="number">
      <div>
        <span>Frontend Development</span>
        <List variant="dash" className="u-mt-2">
          <span>React components</span>
          <span>CSS styling</span>
          <span>JavaScript logic</span>
        </List>
      </div>
      
      <div>
        <span>Backend Development</span>
        <List variant="dash" className="u-mt-2">
          <span>API endpoints</span>
          <span>Database design</span>
          <span>Authentication</span>
        </List>
      </div>
      
      <div>
        <span>Testing</span>
        <List variant="dash" className="u-mt-2">
          <span>Unit tests</span>
          <span>Integration tests</span>
          <span>E2E tests</span>
        </List>
      </div>
    </List>
  );
}
```

### List Group

```jsx
import { ListGroup } from '@shohojdhara/atomix';

function ListGroupExample() {
  return (
    <div className="u-gap-6">
      {/* Basic list group */}
      <div>
        <h3>Project Tasks</h3>
        <ListGroup>
          <List variant="dash">
            <span>Design wireframes</span>
            <span>Create mockups</span>
            <span>User testing</span>
          </List>
          
          <List variant="dash">
            <span>Setup development environment</span>
            <span>Create component library</span>
            <span>Implement features</span>
          </List>
          
          <List variant="dash">
            <span>Write documentation</span>
            <span>Deploy to production</span>
            <span>Monitor performance</span>
          </List>
        </ListGroup>
      </div>
      
      {/* Mixed variant list group */}
      <div>
        <h3>Mixed Variants</h3>
        <ListGroup>
          <List variant="number">
            <span>First priority items</span>
            <span>Second priority items</span>
          </List>
          
          <List variant="dash">
            <span>Additional considerations</span>
            <span>Nice to have features</span>
          </List>
        </ListGroup>
      </div>
    </div>
  );
}
```

### Interactive Lists

```jsx
function InteractiveList() {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (index) => {
    setSelectedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const items = [
    'Learn React fundamentals',
    'Build a portfolio project',
    'Practice with TypeScript',
    'Deploy to production'
  ];

  return (
    <List variant="dash">
      {items.map((item, index) => (
        <div 
          key={index}
          className={`u-d-flex u-align-items-center u-gap-2 u-cursor-pointer ${
            selectedItems.includes(index) ? 'u-text-success' : ''
          }`}
          onClick={() => toggleItem(index)}
        >
          <Icon 
            name={selectedItems.includes(index) ? "CheckSquare" : "Square"} 
            size="sm"
            color={selectedItems.includes(index) ? "#22c55e" : "currentColor"}
          />
          <span className={selectedItems.includes(index) ? 'u-text-decoration-line-through' : ''}>
            {item}
          </span>
        </div>
      ))}
    </List>
  );
}
```

### Inline Lists

```jsx
function InlineLists() {
  const tags = ['React', 'TypeScript', 'CSS', 'JavaScript'];
  const breadcrumbs = ['Home', 'Products', 'Category', 'Item'];

  return (
    <div className="u-gap-4">
      {/* Tag list */}
      <div>
        <h4>Technologies:</h4>
        <List variant="dash" inline>
          {tags.map(tag => (
            <Badge key={tag} label={tag} variant="primary" />
          ))}
        </List>
      </div>
      
      {/* Breadcrumb-style list */}
      <div>
        <h4>Navigation:</h4>
        <List variant="default" inline className="u-text-secondary">
          {breadcrumbs.map((item, index) => (
            <span key={item}>
              {item}
              {index < breadcrumbs.length - 1 && ' / '}
            </span>
          ))}
        </List>
      </div>
    </div>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Basic list
const list = new Atomix.List('.my-list', {
  items: ['Item 1', 'Item 2', 'Item 3'],
  variant: 'dash'
});

// Numbered list
const numberedList = new Atomix.List('.numbered-list', {
  items: ['First step', 'Second step', 'Third step'],
  variant: 'number'
});

// List group
const listGroup = new Atomix.ListGroup('.list-group', {
  lists: [
    { items: ['Group 1 Item 1', 'Group 1 Item 2'], variant: 'dash' },
    { items: ['Group 2 Item 1', 'Group 2 Item 2'], variant: 'number' }
  ]
});

// Initialize from data attributes
Atomix.List.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic list -->
<ul
  class="c-list"
  data-atomix="list"
  data-variant="default">
  <li class="c-list__item">First item</li>
  <li class="c-list__item">Second item</li>
  <li class="c-list__item">Third item</li>
</ul>

<!-- Dash variant list -->
<ul
  class="c-list c-list--dash"
  data-atomix="list"
  data-variant="dash">
  <li class="c-list__item">Dash item 1</li>
  <li class="c-list__item">Dash item 2</li>
  <li class="c-list__item">Dash item 3</li>
</ul>

<!-- Numbered list -->
<ol
  class="c-list c-list--number"
  data-atomix="list"
  data-variant="number">
  <li class="c-list__item">First step</li>
  <li class="c-list__item">Second step</li>
  <li class="c-list__item">Third step</li>
</ol>

<!-- List group -->
<div class="c-list-group" data-atomix="list-group">
  <ul class="c-list c-list--dash">
    <li class="c-list__item">Group 1 Item 1</li>
    <li class="c-list__item">Group 1 Item 2</li>
  </ul>
  <ul class="c-list c-list--dash">
    <li class="c-list__item">Group 2 Item 1</li>
    <li class="c-list__item">Group 2 Item 2</li>
  </ul>
</div>
```

## Styling

### CSS Classes

The List component uses the following CSS class structure:

```css
/* Base list */
.c-list {
  padding-left: var(--list-padding-left);
}

.c-list__item {
  color: var(--list-color);
  font-size: var(--list-font-size);
  font-weight: var(--list-font-weight);
}

.c-list__item + .c-list__item {
  margin-top: var(--list-item-gap);
}

/* Variant modifiers */
.c-list--dash {
  padding-left: 0;
  list-style: none;
}

.c-list--dash .c-list__item {
  position: relative;
  padding-left: var(--list-padding-left);
}

.c-list--dash .c-list__item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: var(--list-item-dash-width);
  height: var(--list-item-dash-height);
  background: var(--list-color);
  transform: translateY(-50%);
}

.c-list--number {
  list-style-type: decimal;
}

.c-list--text {
  list-style-type: lower-alpha;
}

/* List group */
.c-list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  width: 100%;
  max-width: var(--list-group-width);
  background: var(--list-group-bg);
}

.c-list-group__item {
  padding: var(--list-group-item-padding-y) var(--list-group-item-padding-x);
  font-size: var(--list-group-item-font-size);
  color: var(--list-group-item-color);
  border-bottom: var(--list-group-item-border-width) solid var(--list-group-item-border-color);
  background: var(--list-group-item-bg);
}
```

### Custom Styling

```css
/* Custom list variant */
.c-list--custom {
  --list-color: #6366f1;
  --list-item-gap: 8px;
}

.c-list--custom.c-list--dash .c-list__item::before {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 2px;
}

/* Compact list */
.c-list--compact {
  --list-item-gap: 2px;
  --list-font-size: 0.875rem;
  --list-padding-left: 16px;
}

/* Spaced list */
.c-list--spaced {
  --list-item-gap: 12px;
}

/* Custom dash style */
.c-list--arrow.c-list--dash .c-list__item::before {
  content: '→';
  background: none;
  width: auto;
  height: auto;
  color: var(--list-color);
  font-size: 0.875rem;
  transform: translateY(-50%);
}

/* List group variants */
.c-list-group--bordered {
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-md);
}

.c-list-group--flush .c-list-group__item {
  border-left: 0;
  border-right: 0;
  border-radius: 0;
}

.c-list-group--horizontal {
  flex-direction: row;
}

.c-list-group--horizontal .c-list-group__item {
  border-bottom: 0;
  border-right: var(--list-group-item-border-width) solid var(--list-group-item-border-color);
}
```

## Accessibility

The List component includes comprehensive accessibility features:

### Semantic HTML

- Uses proper `<ul>`, `<ol>`, and `<li>` elements
- Maintains semantic meaning for screen readers
- Preserves list structure and relationships

### ARIA Attributes

- `role="list"` - Applied when list styling is removed
- `role="listitem"` - Applied to custom list items
- Proper heading structure for list groups

### Keyboard Navigation

- **Tab** - Moves focus through interactive list items
- **Arrow keys** - Navigate between items in interactive lists
- **Enter/Space** - Activates interactive list items

### Screen Reader Support

- List structure is properly announced
- Item count and position are communicated
- Nested lists maintain proper hierarchy

## Best Practices

### Do's ✅

- Use appropriate list variants for content type
- Keep list items concise and scannable
- Use consistent formatting within lists
- Group related lists with ListGroup
- Provide proper semantic structure

```jsx
// Good: Appropriate variant for content
<List variant="number">
  <span>Install dependencies</span>
  <span>Configure environment</span>
  <span>Run development server</span>
</List>

// Good: Consistent item structure
<List variant="dash">
  <div className="u-d-flex u-align-items-center u-gap-2">
    <Icon name="CheckCircle" size="sm" />
    <span>Task completed</span>
  </div>
  <div className="u-d-flex u-align-items-center u-gap-2">
    <Icon name="Clock" size="sm" />
    <span>Task in progress</span>
  </div>
</List>
```

### Don'ts ❌

- Don't mix different content types in the same list
- Don't use lists for non-list content
- Don't create overly long lists without grouping
- Don't ignore semantic meaning

```jsx
// Bad: Mixed content types
<List>
  <span>Text item</span>
  <Button label="Button item" />
  <img src="/image.jpg" alt="Image item" />
</List>

// Bad: Non-list content
<List>
  <div>This is a paragraph of text that doesn't belong in a list.</div>
</List>
```

## Common Patterns

### Feature Lists

```jsx
function FeatureList() {
  const features = [
    'Responsive design',
    'Dark mode support',
    'Accessibility compliant',
    'TypeScript support',
    'Comprehensive documentation'
  ];

  return (
    <div>
      <h3>Key Features</h3>
      <List variant="dash">
        {features.map(feature => (
          <div key={feature} className="u-d-flex u-align-items-center u-gap-2">
            <Icon name="CheckCircle" color="#22c55e" size="sm" />
            <span>{feature}</span>
          </div>
        ))}
      </List>
    </div>
  );
}
```

### Step-by-Step Instructions

```jsx
function InstructionList() {
  const steps = [
    'Clone the repository to your local machine',
    'Install dependencies using npm or yarn',
    'Configure environment variables',
    'Start the development server',
    'Open your browser and navigate to localhost:3000'
  ];

  return (
    <div>
      <h3>Getting Started</h3>
      <List variant="number">
        {steps.map(step => (
          <span key={step}>{step}</span>
        ))}
      </List>
    </div>
  );
}
```

### Navigation Lists

```jsx
function NavigationList() {
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: 'Gauge' },
    { label: 'Projects', href: '/projects', icon: 'Folder' },
    { label: 'Team', href: '/team', icon: 'Users' },
    { label: 'Settings', href: '/settings', icon: 'Gear' }
  ];

  return (
    <List variant="dash">
      {navItems.map(item => (
        <a
          key={item.label}
          href={item.href}
          className="u-d-flex u-align-items-center u-gap-3 u-text-decoration-none u-p-2 u-rounded hover:u-bg-gray-100"
        >
          <Icon name={item.icon} size="sm" />
          <span>{item.label}</span>
        </a>
      ))}
    </List>
  );
}
```

### Categorized Lists

```jsx
function CategorizedLists() {
  const categories = [
    {
      title: 'Frontend',
      items: ['React', 'Vue', 'Angular', 'Svelte']
    },
    {
      title: 'Backend',
      items: ['Node.js', 'Python', 'PHP', 'Ruby']
    },
    {
      title: 'Database',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL']
    }
  ];

  return (
    <ListGroup>
      {categories.map(category => (
        <div key={category.title}>
          <h4 className="u-mb-2">{category.title}</h4>
          <List variant="dash">
            {category.items.map(item => (
              <span key={item}>{item}</span>
            ))}
          </List>
        </div>
      ))}
    </ListGroup>
  );
}
```

### Status Lists

```jsx
function StatusList() {
  const tasks = [
    { name: 'Design review', status: 'completed' },
    { name: 'Development', status: 'in-progress' },
    { name: 'Testing', status: 'pending' },
    { name: 'Deployment', status: 'pending' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return { icon: 'CheckCircle', color: '#22c55e' };
      case 'in-progress': return { icon: 'Clock', color: '#f59e0b' };
      case 'pending': return { icon: 'Circle', color: '#6b7280' };
      default: return { icon: 'Circle', color: '#6b7280' };
    }
  };

  return (
    <List variant="dash">
      {tasks.map(task => {
        const { icon, color } = getStatusIcon(task.status);
        return (
          <div key={task.name} className="u-d-flex u-align-items-center u-gap-2">
            <Icon name={icon} color={color} size="sm" />
            <span>{task.name}</span>
            <Badge
              label={task.status.replace('-', ' ')}
              variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'secondary'}
              size="sm"
            />
          </div>
        );
      })}
    </List>
  );
}
```

## Related Components

- **Icon** - Used for list item icons
- **Badge** - Used for status indicators in lists
- **Button** - Can be used in interactive list items
- **Card** - Alternative for structured content
- **Navigation** - For navigation-specific lists

## Browser Support

The List component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Considerations

- Lists are lightweight and have minimal performance impact
- Use React.memo for list items that don't change frequently
- Consider virtualization for very long lists (100+ items)
- Optimize icon rendering for better performance

```jsx
// Optimized list item with memoization
const OptimizedListItem = React.memo(({ children, icon }) => {
  return (
    <div className="u-d-flex u-align-items-center u-gap-2">
      {icon && <Icon name={icon} size="sm" />}
      <span>{children}</span>
    </div>
  );
});

// Usage in large lists
function LargeList({ items }) {
  return (
    <List variant="dash">
      {items.map((item, index) => (
        <OptimizedListItem key={item.id || index} icon={item.icon}>
          {item.text}
        </OptimizedListItem>
      ))}
    </List>
  );
}
```

## Migration Guide

### From HTML Lists

```html
<!-- Before: Plain HTML -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<!-- After: Atomix List -->
<List items={['Item 1', 'Item 2', 'Item 3']} />
```

### From Custom List Components

```jsx
// Before: Custom implementation
function CustomList({ items }) {
  return (
    <div className="custom-list">
      {items.map(item => (
        <div key={item} className="custom-list-item">
          • {item}
        </div>
      ))}
    </div>
  );
}

// After: Atomix List
function AtomixList({ items }) {
  return <List variant="dash" items={items} />;
}
```
