# Badge

The Badge component is a compact UI element used to display small pieces of information like status indicators, counters, labels, or categories. It provides a visual way to highlight important information or draw attention to specific content.

## Overview

Badges are versatile components that can be used standalone or attached to other elements. They support various colors, sizes, and can include icons to enhance their meaning. Badges are perfect for notification counts, status indicators, tags, and labels.

## Installation

The Badge component is included in the Atomix package. Import it in your React components:

```jsx
import { Badge } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the badge styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { Badge, Icon } from '@shohojdhara/atomix';

function NotificationExample() {
  return (
    <div>
      {/* Basic badge */}
      <Badge label="New" variant="primary" />

      {/* Badge with icon */}
      <Badge
        label="5"
        variant="error"
        icon={<Icon name="Bell" size="xs" />}
      />

      {/* Status badge */}
      <Badge label="Active" variant="success" />
    </div>
  );
}
```

### HTML/CSS

```
<!-- Basic badge -->
<span class="c-badge c-badge--primary c-badge--md">New</span>

<!-- Badge with icon -->
<span class="c-badge c-badge--error c-badge--md">
  <span class="c-badge__icon">
    <!-- Icon content -->
  </span>
  <span>5</span>
</span>

<!-- Status badge -->
<span class="c-badge c-badge--success c-badge--md">Active</span>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Text content of the badge |
| `variant` | `ThemeColor` | `'primary'` | Color variant of the badge |
| `size` | `Size` | `'md'` | Size of the badge (`'sm'`, `'md'`, `'lg'`) |
| `icon` | `ReactNode` | - | Optional icon element to display |
| `disabled` | `boolean` | `false` | Whether the badge is disabled |
| `className` | `string` | `''` | Additional CSS classes |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Glass morphism effect for the badge |
| `style` | `React.CSSProperties` | - | Custom style for the badge |

### Variant Options

The `variant` prop accepts the following theme color values:

#### Solid Variants
- `'primary'` - Primary brand color (default)
- `'secondary'` - Secondary color
- `'success'` - Green success color
- `'info'` - Blue informational color
- `'warning'` - Yellow/orange warning color
- `'error'` - Red error/danger color
- `'light'` - Light gray
- `'dark'` - Dark gray/black

### Size Options

- `'sm'` - Small badge (compact text and padding)
- `'md'` - Medium badge (default size)
- `'lg'` - Large badge (more prominent display)

## Examples

### Badge Variants

```jsx
// Status badges
<Badge label="Online" variant="success" />
<Badge label="Away" variant="warning" />
<Badge label="Offline" variant="error" />
<Badge label="Busy" variant="dark" />

// Information badges
<Badge label="New" variant="primary" />
<Badge label="Hot" variant="error" />
<Badge label="Sale" variant="warning" />
<Badge label="Featured" variant="info" />
```

### Badge Sizes

```jsx
<div className="badge-sizes">
  <Badge label="Small" variant="primary" size="sm" />
  <Badge label="Medium" variant="primary" size="md" />
  <Badge label="Large" variant="primary" size="lg" />
</div>
```

### Badges with Icons

```jsx
import { Icon } from '@shohojdhara/atomix';

// Notification badges
<Badge
  label="3"
  variant="error"
  icon={<Icon name="Mail" size="xs" />}
/>

<Badge
  label="12"
  variant="primary"
  icon={<Icon name="MessageCircle" size="xs" />}
/>

// Status badges with icons
<Badge
  label="Verified"
  variant="success"
  icon={<Icon name="CheckCircle" size="xs" />}
/>

<Badge
  label="Premium"
  variant="warning"
  icon={<Icon name="Star" size="xs" />}
/>
```

### Notification Badges

```jsx
function NotificationBadge({ count, max = 99 }) {
  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <div className="notification-container">
      <Icon name="Bell" size="md" />
      {count > 0 && (
        <Badge
          label={displayCount}
          variant="error"
          size="sm"
          className="notification-badge"
        />
      )}
    </div>
  );
}

// Usage
<NotificationBadge count={5} />
<NotificationBadge count={150} max={99} />
```

### Tag Badges

```jsx
function TagList({ tags }) {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Badge
          key={tag.id}
          label={tag.name}
          variant="light"
          size="sm"
        />
      ))}
    </div>
  );
}

// Usage
<TagList tags={[
  { id: 1, name: 'React' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'CSS' }
]} />
```

### Status Indicators

```jsx
function UserStatus({ user }) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      online: { variant: 'success', label: 'Online' },
      away: { variant: 'warning', label: 'Away' },
      busy: { variant: 'error', label: 'Busy' },
      offline: { variant: 'dark', label: 'Offline' }
    };

    return statusConfig[status] || statusConfig.offline;
  };

  const status = getStatusBadge(user.status);

  return (
    <div className="user-status">
      <Avatar src={user.avatar} circle />
      <div className="user-info">
        <span className="user-name">{user.name}</span>
        <Badge
          label={status.label}
          variant={status.variant}
          size="sm"
        />
      </div>
    </div>
  );
}
```

### Interactive Badges

```jsx
function InteractiveBadges() {
  const [selectedTags, setSelectedTags] = useState([]);
  const availableTags = ['JavaScript', 'React', 'Vue', 'Angular'];

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="interactive-badges">
      {availableTags.map(tag => (
        <Badge
          key={tag}
          label={tag}
          variant={selectedTags.includes(tag) ? 'primary' : 'light'}
          className="cursor-pointer"
          onClick={() => toggleTag(tag)}
        />
      ))}
    </div>
  );
}
```

### Badge with Removable Items

```jsx
function RemovableBadge({ label, onRemove, ...props }) {
  return (
    <Badge
      label={
        <div className="removable-badge-content">
          <span>{label}</span>
          <button
            className="remove-button"
            onClick={onRemove}
            aria-label={`Remove ${label}`}
          >
            <Icon name="X" size="xs" />
          </button>
        </div>
      }
      {...props}
    />
  );
}

function TagEditor() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="tag-editor">
      {tags.map(tag => (
        <RemovableBadge
          key={tag}
          label={tag}
          variant="primary"
          onRemove={() => removeTag(tag)}
        />
      ))}
    </div>
  );
}
```

## Accessibility

The Badge component follows accessibility best practices:

### ARIA Support

- `aria-disabled` is applied when the badge is disabled
- Proper color contrast is maintained for all variants
- Text content is accessible to screen readers

### Best Practices

1. **Use meaningful text**: Make badge content descriptive
   ```jsx
   // Good
   <Badge label="3 unread messages" variant="error" />

   // Avoid
   <Badge label="3" variant="error" />
   ```

2. **Don't rely solely on color** to convey information:
   ```jsx
   // Good - uses both color and text
   <Badge label="Error" variant="error" />

   // Good - uses icon for additional context
   <Badge
     label="Warning"
     variant="warning"
     icon={<Icon name="AlertTriangle" />}
   />
   ```

3. **Provide context for screen readers**:
   ```jsx
   <div>
     <span>Notifications</span>
     <Badge
       label="5"
       variant="error"
       aria-label="5 unread notifications"
     />
   </div>
   ```

## Styling

### CSS Custom Properties

The Badge component uses CSS custom properties for theming:

```css
:root {
  /* Badge structure */
  --atomix-badge-padding-x: 0.5rem;
  --atomix-badge-padding-y: 0.25rem;
  --atomix-badge-border-radius: var(--atomix-border-radius);
  --atomix-badge-font-weight: 500;
  --atomix-badge-line-height: 1;

  /* Badge sizes */
  --atomix-badge-sm-padding-x: 0.375rem;
  --atomix-badge-sm-padding-y: 0.125rem;
  --atomix-badge-sm-font-size: 0.75rem;

  --atomix-badge-md-padding-x: 0.5rem;
  --atomix-badge-md-padding-y: 0.25rem;
  --atomix-badge-md-font-size: 0.875rem;

  --atomix-badge-lg-padding-x: 0.75rem;
  --atomix-badge-lg-padding-y: 0.375rem;
  --atomix-badge-lg-font-size: 1rem;

  /* Badge colors - Primary variant */
  --atomix-badge-primary-color: var(--atomix-white);
  --atomix-badge-primary-bg: var(--atomix-primary);

  /* Badge colors - Success variant */
  --atomix-badge-success-color: var(--atomix-white);
  --atomix-badge-success-bg: var(--atomix-success);

  /* Badge colors - Error variant */
  --atomix-badge-error-color: var(--atomix-white);
  --atomix-badge-error-bg: var(--atomix-error);

  /* Badge colors - Warning variant */
  --atomix-badge-warning-color: var(--atomix-dark);
  --atomix-badge-warning-bg: var(--atomix-warning);

  /* Badge colors - Light variant */
  --atomix-badge-light-color: var(--atomix-dark);
  --atomix-badge-light-bg: var(--atomix-light);
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base badge class */
.c-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: var(--atomix-badge-padding-y) var(--atomix-badge-padding-x);
  font-size: var(--atomix-badge-font-size);
  font-weight: var(--atomix-badge-font-weight);
  line-height: var(--atomix-badge-line-height);
  border-radius: var(--atomix-badge-border-radius);
  white-space: nowrap;
}

/* Size modifiers */
.c-badge--sm {
  padding: var(--atomix-badge-sm-padding-y) var(--atomix-badge-sm-padding-x);
  font-size: var(--atomix-badge-sm-font-size);
}

.c-badge--md {
  padding: var(--atomix-badge-md-padding-y) var(--atomix-badge-md-padding-x);
  font-size: var(--atomix-badge-md-font-size);
}

.c-badge--lg {
  padding: var(--atomix-badge-lg-padding-y) var(--atomix-badge-lg-padding-x);
  font-size: var(--atomix-badge-lg-font-size);
}

/* Variant modifiers */
.c-badge--primary {
  color: var(--atomix-badge-primary-color);
  background-color: var(--atomix-badge-primary-bg);
}

.c-badge--success {
  color: var(--atomix-badge-success-color);
  background-color: var(--atomix-badge-success-bg);
}

.c-badge--error {
  color: var(--atomix-badge-error-color);
  background-color: var(--atomix-badge-error-bg);
}

.c-badge--warning {
  color: var(--atomix-badge-warning-color);
  background-color: var(--atomix-badge-warning-bg);
}

.c-badge--light {
  color: var(--atomix-badge-light-color);
  background-color: var(--atomix-badge-light-bg);
}

/* Elements */
.c-badge__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* States */
.c-badge:disabled,
.c-badge[aria-disabled="true"] {
  opacity: 0.5;
}

/* Interactive badges */
.c-badge.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.c-badge.cursor-pointer:hover {
  opacity: 0.8;
}
```

### Customization Examples

```
/* Custom badge variant */
.c-badge--custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Pill-shaped badges */
.c-badge--pill {
  border-radius: 2rem;
}

/* Outline badges */
.c-badge--outline-primary {
  background: transparent;
  border: 1px solid var(--atomix-primary);
  color: var(--atomix-primary);
}

/* Notification badge positioning */
.notification-container {
  position: relative;
  display: inline-block;
}

.notification-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Tag list styling */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Removable badge styling */
.removable-badge-content {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.remove-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  margin-left: 0.25rem;
}

.remove-button:hover {
  opacity: 0.7;
}
```

## Common Patterns

### Notification System

```jsx
function NotificationCenter() {
  const notifications = {
    messages: 5,
    alerts: 2,
    updates: 12
  };

  return (
    <div className="notification-center">
      <div className="notification-item">
        <Icon name="Mail" />
        <span>Messages</span>
        {notifications.messages > 0 && (
          <Badge
            label={notifications.messages.toString()}
            variant="primary"
            size="sm"
          />
        )}
      </div>

      <div className="notification-item">
        <Icon name="AlertCircle" />
        <span>Alerts</span>
        {notifications.alerts > 0 && (
          <Badge
            label={notifications.alerts.toString()}
            variant="error"
            size="sm"
          />
        )}
      </div>

      <div className="notification-item">
        <Icon name="Download" />
        <span>Updates</span>
        {notifications.updates > 0 && (
          <Badge
            label={notifications.updates.toString()}
            variant="info"
            size="sm"
          />
        )}
      </div>
    </div>
  );
}
```

### Product Categories

```jsx
function ProductCard({ product }) {
  return (
    <Card
      image={product.image}
      title={product.name}
      text={product.description}
      header={
        <div className="product-badges">
          {product.isNew && <Badge label="New" variant="primary" size="sm" />}
          {product.onSale && <Badge label="Sale" variant="error" size="sm" />}
          {product.isFeatured && <Badge label="Featured" variant="warning" size="sm" />}
        </div>
      }
      footer={
        <div className="product-categories">
          {product.categories.map(category => (
            <Badge
              key={category}
              label={category}
              variant="light"
              size="sm"
            />
          ))}
        </div>
      }
    />
  );
}
```

### User Roles

```jsx
function UserList({ users }) {
  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { variant: 'error', label: 'Admin' },
      moderator: { variant: 'warning', label: 'Moderator' },
      member: { variant: 'primary', label: 'Member' },
      guest: { variant: 'light', label: 'Guest' }
    };

    return roleConfig[role] || roleConfig.guest;
  };

  return (
    <div className="user-list">
      {users.map(user => {
        const roleBadge = getRoleBadge(user.role);

        return (
          <div key={user.id} className="user-item">
            <Avatar src={user.avatar} circle />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <Badge
                label={roleBadge.label}
                variant={roleBadge.variant}
                size="sm"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### Priority Labels

```jsx
function TaskItem({ task }) {
  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { variant: 'error', label: 'High Priority' },
      medium: { variant: 'warning', label: 'Medium Priority' },
      low: { variant: 'success', label: 'Low Priority' }
    };

    return priorityConfig[priority];
  };

  const priorityBadge = getPriorityBadge(task.priority);

  return (
    <div className="task-item">
      <div className="task-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="task-meta">
        <Badge
          label={priorityBadge.label}
          variant={priorityBadge.variant}
          size="sm"
        />
        <Badge
          label={task.status}
          variant="light"
          size="sm"
        />
      </div>
    </div>
  );
}
```

## Performance Considerations

1. **Minimize re-renders**: Use stable references for badge props
2. **Optimize icon usage**: Use consistent icon libraries and sizes
3. **Consider badge count limits**: Display "99+" for large numbers

```jsx
// Optimized notification badge
const NotificationBadge = memo(({ count, icon, label }) => {
  const displayCount = useMemo(() => {
    return count > 99 ? '99+' : count.toString();
  }, [count]);

  return (
    <Badge
      label={displayCount}
      variant="error"
      icon={icon}
      aria-label={`${count} ${label}`}
    />
  );
});
```

## Integration Examples

### With Navigation

```jsx
function Navigation() {
  const { notifications, messages } = useNotifications();

  return (
    <nav className="main-navigation">
      <Link to="/dashboard" className="nav-item">
        Dashboard
      </Link>

      <Link to="/messages" className="nav-item">
        Messages
        {messages > 0 && (
          <Badge label={messages.toString()} variant="primary" size="sm" />
        )}
      </Link>

      <Link to="/notifications" className="nav-item">
        Notifications
        {notifications > 0 && (
          <Badge label={notifications.toString()} variant="error" size="sm" />
        )}
      </Link>
    </nav>
  );
}
```

### With Forms

```jsx
function FormFieldWithValidation({ label, error, required, children }) {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && (
          <Badge label="Required" variant="error" size="sm" />
        )}
      </label>
      {children}
      {error && (
        <div className="form-error">
          <Badge
            label={error}
            variant="error"
            size="sm"
            icon={<Icon name="AlertCircle" size="xs" />}
          />
        </div>
      )}
    </div>
  );
}
```

## Browser Support

The Badge component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Icon](./icon.mdx)** - Often used within badges
- **[Avatar](./avatar.mdx)** - Commonly paired with status badges
- **[Button](./button.mdx)** - Can contain badges for notifications
- **[Card](./card.mdx)** - Often contains category badges
- **[Navigation](./navigation.mdx)** - Frequently uses notification badges

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x (deprecated)
<Badge
  text="New"
  color="primary"
  small={true}
/>

// v2.x (current)
<Badge
  label="New"
  variant="primary"
  size="sm"
/>
```

### From Custom Implementation

```jsx
// Before (custom implementation)
<span className="custom-badge badge-primary">New</span>

// After (Atomix Badge)
<Badge label="New" variant="primary" />
```
