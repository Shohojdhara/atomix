# Badge Component

The Badge component provides small status indicators and labels for displaying counts, statuses, categories, or other brief information. Badges are perfect for notifications, tags, status indicators, and highlighting important information.

## Overview

Badges are versatile UI elements that help users quickly identify status, categorize content, or display numerical values. The Atomix Badge component supports various colors, sizes, and can include icons for enhanced visual communication.

## Props API

### BadgeProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Badge text content |
| `variant` | `ThemeColor` | `'primary'` | Color variant |
| `size` | `Size` | `'md'` | Badge size |
| `icon` | `ReactNode` | `undefined` | Optional icon |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Additional CSS classes |

### Variant Options

- **Theme Colors**: `primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `info`, `light`, `dark`

### Size Options

- `sm` - Small badge (compact)
- `md` - Medium badge (default)
- `lg` - Large badge (prominent)

## Usage Examples

### Basic Badges

```jsx
import React from 'react';
import { Badge } from '@shohojdhara/atomix';

function BasicBadges() {
  return (
    <div className="u-d-flex u-flex-wrap u-gap-3">
      {/* Color variants */}
      <Badge label="Primary" variant="primary" />
      <Badge label="Secondary" variant="secondary" />
      <Badge label="Success" variant="success" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Error" variant="error" />
      <Badge label="Info" variant="info" />
      <Badge label="Light" variant="light" />
      <Badge label="Dark" variant="dark" />
    </div>
  );
}
```

### Badge Sizes

```jsx
function BadgeSizes() {
  return (
    <div className="u-d-flex u-align-items-center u-gap-4">
      <Badge label="Small" variant="primary" size="sm" />
      <Badge label="Medium" variant="primary" size="md" />
      <Badge label="Large" variant="primary" size="lg" />
    </div>
  );
}
```

### Badges with Icons

```jsx
import { Icon } from '@shohojdhara/atomix';

function IconBadges() {
  return (
    <div className="u-d-flex u-flex-wrap u-gap-3">
      <Badge 
        label="Online" 
        variant="success" 
        icon={<Icon name="Circle" />} 
      />
      
      <Badge 
        label="Verified" 
        variant="info" 
        icon={<Icon name="CheckCircle" />} 
      />
      
      <Badge 
        label="Premium" 
        variant="warning" 
        icon={<Icon name="Crown" />} 
      />
      
      <Badge 
        label="Alert" 
        variant="error" 
        icon={<Icon name="Warning" />} 
      />
    </div>
  );
}
```

### Status Indicators

```jsx
function StatusIndicators() {
  const users = [
    { name: 'John Doe', status: 'online', role: 'admin' },
    { name: 'Jane Smith', status: 'away', role: 'user' },
    { name: 'Bob Johnson', status: 'offline', role: 'moderator' }
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'online': return 'success';
      case 'away': return 'warning';
      case 'offline': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRoleVariant = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'moderator': return 'info';
      case 'user': return 'light';
      default: return 'light';
    }
  };

  return (
    <div className="u-gap-3">
      {users.map((user, index) => (
        <div key={index} className="u-d-flex u-align-items-center u-gap-3">
          <Avatar src={`/user-${index + 1}.jpg`} alt={user.name} circle size="sm" />
          <span className="u-fw-medium">{user.name}</span>
          <Badge 
            label={user.status} 
            variant={getStatusVariant(user.status)}
            size="sm"
          />
          <Badge 
            label={user.role} 
            variant={getRoleVariant(user.role)}
            size="sm"
          />
        </div>
      ))}
    </div>
  );
}
```

### Notification Badges

```jsx
function NotificationBadges() {
  const [notifications, setNotifications] = useState({
    messages: 5,
    alerts: 2,
    updates: 12
  });

  return (
    <div className="u-d-flex u-gap-6">
      <div className="u-position-relative">
        <Button 
          icon={<Icon name="ChatCircle" />}
          iconOnly
          variant="link"
          aria-label="Messages"
        />
        {notifications.messages > 0 && (
          <Badge 
            label={notifications.messages.toString()}
            variant="error"
            size="sm"
            className="u-position-absolute u-top-n2 u-end-n2"
          />
        )}
      </div>

      <div className="u-position-relative">
        <Button 
          icon={<Icon name="Bell" />}
          iconOnly
          variant="link"
          aria-label="Notifications"
        />
        {notifications.alerts > 0 && (
          <Badge 
            label={notifications.alerts.toString()}
            variant="warning"
            size="sm"
            className="u-position-absolute u-top-n2 u-end-n2"
          />
        )}
      </div>

      <div className="u-position-relative">
        <Button 
          icon={<Icon name="Download" />}
          iconOnly
          variant="link"
          aria-label="Updates"
        />
        {notifications.updates > 0 && (
          <Badge 
            label={notifications.updates > 99 ? '99+' : notifications.updates.toString()}
            variant="info"
            size="sm"
            className="u-position-absolute u-top-n2 u-end-n2"
          />
        )}
      </div>
    </div>
  );
}
```

### Product Tags

```jsx
function ProductTags() {
  const product = {
    name: "Premium Headphones",
    tags: ["New", "Best Seller", "Premium", "Wireless"],
    category: "Electronics",
    inStock: true
  };

  return (
    <Card>
      <div className="u-gap-4">
        <div className="u-d-flex u-align-items-start u-justify-content-between">
          <h3 className="u-fs-lg u-fw-semibold">{product.name}</h3>
          <Badge 
            label={product.inStock ? "In Stock" : "Out of Stock"}
            variant={product.inStock ? "success" : "error"}
            size="sm"
          />
        </div>
        
        <div className="u-d-flex u-flex-wrap u-gap-2">
          <Badge label={product.category} variant="info" size="sm" />
          {product.tags.map((tag, index) => (
            <Badge 
              key={index}
              label={tag}
              variant="light"
              size="sm"
            />
          ))}
        </div>
        
        <Button label="Add to Cart" variant="primary" />
      </div>
    </Card>
  );
}
```

### Interactive Badges

```jsx
function InteractiveBadges() {
  const [selectedTags, setSelectedTags] = useState(['react', 'javascript']);
  
  const availableTags = [
    'react', 'javascript', 'typescript', 'css', 'html',
    'node.js', 'python', 'design', 'ui/ux'
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="u-gap-4">
      <h3 className="u-fw-semibold">Select your skills:</h3>
      <div className="u-d-flex u-flex-wrap u-gap-2">
        {availableTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className="u-focus-outline-none u-focus-ring-2 u-focus-ring-primary u-rounded"
          >
            <Badge 
              label={tag}
              variant={selectedTags.includes(tag) ? "primary" : "light"}
              className="u-cursor-pointer u-hover-opacity-80 u-transition-opacity"
            />
          </button>
        ))}
      </div>
      
      <div className="u-fs-sm u-text-secondary">
        Selected: {selectedTags.length} skills
      </div>
    </div>
  );
}
```

### Progress Badges

```jsx
function ProgressBadges() {
  const tasks = [
    { name: 'Design Review', progress: 100, status: 'completed' },
    { name: 'Development', progress: 75, status: 'in-progress' },
    { name: 'Testing', progress: 30, status: 'in-progress' },
    { name: 'Deployment', progress: 0, status: 'pending' }
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="u-gap-3">
      <h3 className="u-fw-semibold">Project Progress</h3>
      {tasks.map((task, index) => (
        <div key={index} className="u-d-flex u-align-items-center u-justify-content-between u-p-3 u-border u-rounded">
          <span className="u-fw-medium">{task.name}</span>
          <div className="u-d-flex u-align-items-center u-gap-3">
            <Badge 
              label={`${task.progress}%`}
              variant="light"
              size="sm"
            />
            <Badge 
              label={task.status.replace('-', ' ')}
              variant={getStatusVariant(task.status)}
              size="sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Vanilla JavaScript Usage

```javascript
// Basic badge
const badge = new Atomix.Badge('.my-badge', {
  label: 'New',
  variant: 'success',
  size: 'md'
});

// Badge with icon
const iconBadge = new Atomix.Badge('.icon-badge', {
  label: 'Verified',
  variant: 'info',
  icon: 'CheckCircle'
});

// Initialize from data attributes
Atomix.Badge.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic badge -->
<span 
  class="c-badge c-badge--primary" 
  data-atomix="badge"
  data-label="Primary"
  data-variant="primary">
  Primary
</span>

<!-- Badge with icon -->
<span 
  class="c-badge c-badge--success" 
  data-atomix="badge"
  data-label="Online"
  data-variant="success"
  data-icon="Circle">
  <i class="ph ph-circle c-badge__icon"></i>
  Online
</span>

<!-- Size variants -->
<span class="c-badge c-badge--primary c-badge--sm">Small</span>
<span class="c-badge c-badge--primary c-badge--md">Medium</span>
<span class="c-badge c-badge--primary c-badge--lg">Large</span>
```

## Styling

### CSS Classes

```css
/* Base badge */
.c-badge {
  /* Base badge styles */
}

/* Size modifiers */
.c-badge--sm { /* Small badge */ }
.c-badge--md { /* Medium badge (default) */ }
.c-badge--lg { /* Large badge */ }

/* Variant modifiers */
.c-badge--primary { /* Primary variant */ }
.c-badge--secondary { /* Secondary variant */ }
.c-badge--success { /* Success variant */ }
.c-badge--warning { /* Warning variant */ }
.c-badge--error { /* Error variant */ }
.c-badge--info { /* Info variant */ }
.c-badge--light { /* Light variant */ }
.c-badge--dark { /* Dark variant */ }

/* State modifiers */
.c-badge--disabled { /* Disabled state */ }

/* Elements */
.c-badge__icon { /* Icon element */ }
.c-badge__label { /* Label text */ }
```

### Custom Styling

```css
/* Custom badge variant */
.c-badge--gradient {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
}

/* Pulsing animation for notifications */
.c-badge--pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Rounded badge */
.c-badge--rounded {
  border-radius: 50px;
}

/* Outline badge */
.c-badge--outline {
  background: transparent;
  border: 1px solid currentColor;
}

/* Dot badge (no text) */
.c-badge--dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  padding: 0;
  min-width: auto;
}
```

## Accessibility

### ARIA Attributes

- `role="status"` - For status indicators
- `aria-label` - Provides accessible description
- `aria-hidden="true"` - For decorative badges

### Screen Reader Support

- Badge content is announced by screen readers
- Status badges use appropriate ARIA roles
- Icon badges include accessible labels

## Best Practices

### Do's ✅

- Use consistent colors for similar types of information
- Keep badge text short and meaningful
- Use appropriate variants for different contexts
- Provide accessible labels for icon-only badges

```jsx
// Good: Clear, consistent usage
<div className="u-d-flex u-align-items-center u-gap-2">
  <span>User Status:</span>
  <Badge label="Active" variant="success" />
</div>

// Good: Accessible notification badge
<div className="u-position-relative">
  <Button icon={<Icon name="Bell" />} aria-label="Notifications" />
  <Badge 
    label="3"
    variant="error"
    className="u-position-absolute u-top-n1 u-end-n1"
    aria-label="3 unread notifications"
  />
</div>
```

### Don'ts ❌

- Don't use too many different badge colors in one interface
- Don't make badge text too long
- Don't rely solely on color to convey meaning
- Don't use badges for primary actions

```jsx
// Bad: Too many colors, unclear meaning
<div>
  <Badge label="Something" variant="primary" />
  <Badge label="Another thing" variant="warning" />
  <Badge label="More stuff" variant="info" />
  <Badge label="Even more" variant="success" />
</div>

// Bad: Text too long
<Badge label="This is way too much text for a badge component" />
```

## Common Patterns

### User Profile Badges

```jsx
function UserProfileBadges({ user }) {
  return (
    <div className="u-d-flex u-align-items-center u-gap-3">
      <Avatar src={user.avatar} alt={user.name} circle />
      <div>
        <div className="u-d-flex u-align-items-center u-gap-2">
          <span className="u-fw-medium">{user.name}</span>
          {user.verified && (
            <Badge 
              label="Verified" 
              variant="info" 
              icon={<Icon name="CheckCircle" />}
              size="sm"
            />
          )}
          {user.premium && (
            <Badge 
              label="Premium" 
              variant="warning" 
              icon={<Icon name="Crown" />}
              size="sm"
            />
          )}
        </div>
        <div className="u-fs-sm u-text-secondary">{user.title}</div>
      </div>
    </div>
  );
}
```

### Content Categories

```jsx
function ContentCategories({ articles }) {
  return (
    <div className="u-d-grid u-gap-4">
      {articles.map(article => (
        <Card key={article.id}>
          <div className="u-d-flex u-justify-content-between u-align-items-start u-mb-3">
            <h3 className="u-fw-semibold">{article.title}</h3>
            <Badge 
              label={article.category}
              variant="light"
              size="sm"
            />
          </div>
          <p className="u-text-secondary u-mb-3">{article.excerpt}</p>
          <div className="u-d-flex u-flex-wrap u-gap-1">
            {article.tags.map(tag => (
              <Badge 
                key={tag}
                label={tag}
                variant="secondary"
                size="sm"
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### Shopping Cart Badge

```jsx
function ShoppingCartBadge({ itemCount }) {
  return (
    <div className="u-position-relative">
      <Button 
        icon={<Icon name="ShoppingCart" />}
        iconOnly
        variant="link"
        aria-label={`Shopping cart with ${itemCount} items`}
      />
      {itemCount > 0 && (
        <Badge 
          label={itemCount > 99 ? '99+' : itemCount.toString()}
          variant="error"
          size="sm"
          className="u-position-absolute u-top-n2 u-end-n2 u-min-w-5 u-h-5 u-d-flex u-align-items-center u-justify-content-center"
        />
      )}
    </div>
  );
}
```

## Related Components

- **Button** - Often used with badges for notifications
- **Avatar** - Badges can indicate user status
- **Card** - Badges for categorization and status
- **Icon** - Used within badges for visual enhancement
- **Tooltip** - Can provide additional context for badges

## Performance Considerations

- Badges are lightweight and have minimal performance impact
- Use CSS for animations rather than JavaScript when possible
- Consider using CSS custom properties for dynamic colors
- Batch badge updates when displaying many items

## Browser Support

The Badge component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

All styling and animations work across supported browsers.
