# Avatar

The Avatar component displays user profile images, initials, or icons in a consistent circular or square format. It provides fallback mechanisms and supports various sizes and interactive states.

## Overview

The Avatar component is designed to represent users or entities in your application. It gracefully handles missing images by falling back to initials or a default user icon, ensuring a consistent visual experience.

## Installation

The Avatar component is included in the Atomix package. Import it in your React components:

```jsx
import { Avatar, AvatarGroup } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the avatar styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { Avatar } from '@shohojdhara/atomix';

function UserProfile() {
  return (
    <div>
      {/* Image avatar */}
      <Avatar src="https://example.com/user.jpg" alt="John Doe" />

      {/* Initials avatar */}
      <Avatar initials="JD" />

      {/* Icon avatar */}
      <Avatar icon={<Icon name="User" />} />
    </div>
  );
}
```

### HTML/CSS

```html
<!-- Image avatar -->
<div class="c-avatar c-avatar--md">
  <img src="https://example.com/user.jpg" alt="John Doe" class="c-avatar__image" />
</div>

<!-- Initials avatar -->
<div class="c-avatar c-avatar--md">
  <span class="c-avatar__initials">JD</span>
</div>

<!-- Icon avatar -->
<div class="c-avatar c-avatar--md">
  <span class="c-avatar__icon">
    <!-- Icon content -->
  </span>
</div>
```

## API Reference

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | URL of the avatar image |
| `alt` | `string` | `'Avatar'` | Alt text for the avatar image |
| `initials` | `string` | - | Text initials to display when no image is available |
| `icon` | `ReactNode` | - | Icon element to display as fallback |
| `size` | `AvatarSize` | `'md'` | Size of the avatar |
| `circle` | `boolean` | `false` | Whether to display as a circle |
| `disabled` | `boolean` | `false` | Whether the avatar is disabled |
| `onClick` | `(event: MouseEvent) => void` | - | Click event handler |
| `className` | `string` | `''` | Additional CSS classes |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Glass morphism effect for the avatar |
| `style` | `React.CSSProperties` | - | Custom style for the avatar |

### AvatarGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Child Avatar components |
| `max` | `number` | - | Maximum avatars to show before "+X" indicator |
| `stacked` | `boolean` | `false` | Whether to display avatars in stacked formation |
| `moreText` | `string` | `'+{count}'` | Custom text for the overflow indicator |
| `className` | `string` | `''` | Additional CSS classes |

### Size Options

- `'xs'` - Extra small (24px)
- `'sm'` - Small (32px)
- `'md'` - Medium (40px) - Default
- `'lg'` - Large (48px)
- `'xl'` - Extra large (56px)

## Examples

### Avatar Sizes

```jsx
<div className="avatar-sizes">
  <Avatar src="user.jpg" size="xs" />
  <Avatar src="user.jpg" size="sm" />
  <Avatar src="user.jpg" size="md" />
  <Avatar src="user.jpg" size="lg" />
  <Avatar src="user.jpg" size="xl" />
</div>
```

### Circular Avatars

```jsx
<div className="avatar-shapes">
  <Avatar src="user.jpg" size="md" />
  <Avatar src="user.jpg" size="md" circle />
</div>
```

### Fallback Mechanisms

```jsx
// Priority: Image → Initials → Icon → Default Icon
<div className="avatar-fallbacks">
  {/* Will show image */}
  <Avatar src="valid-image.jpg" initials="JD" />

  {/* Will show initials (broken image) */}
  <Avatar src="broken-image.jpg" initials="JD" />

  {/* Will show custom icon */}
  <Avatar icon={<Icon name="User" />} />

  {/* Will show default user icon */}
  <Avatar />
</div>
```

### Interactive Avatars

```jsx
function InteractiveAvatars() {
  const handleAvatarClick = (user) => {
    console log(`Clicked on ${user.name}'s avatar`);
  };

  return (
    <div>
      <Avatar
        src="user1.jpg"
        alt="John Doe"
        onClick={() => handleAvatarClick({ name: 'John Doe' })}
        circle
      />

      <Avatar
        initials="JS"
        onClick={() => handleAvatarClick({ name: 'Jane Smith' })}
        disabled
        circle
      />
    </div>
  );
}
```

### Avatar Groups

```jsx
import { Avatar, AvatarGroup } from '@shohojdhara/atomix';

function TeamAvatars() {
  return (
    <div className="team-section">
      {/* Basic avatar group */}
      <AvatarGroup>
        <Avatar src="user1.jpg" circle />
        <Avatar src="user2.jpg" circle />
        <Avatar src="user3.jpg" circle />
        <Avatar initials="AB" circle />
      </AvatarGroup>

      {/* Stacked avatar group */}
      <AvatarGroup stacked>
        <Avatar src="user1.jpg" circle />
        <Avatar src="user2.jpg" circle />
        <Avatar src="user3.jpg" circle />
        <Avatar src="user4.jpg" circle />
      </AvatarGroup>

      {/* Avatar group with max limit */}
      <AvatarGroup max={3}>
        <Avatar src="user1.jpg" circle />
        <Avatar src="user2.jpg" circle />
        <Avatar src="user3.jpg" circle />
        <Avatar src="user4.jpg" circle />
        <Avatar src="user5.jpg" circle />
        <Avatar src="user6.jpg" circle />
      </AvatarGroup>
    </div>
  );
}
```

### Custom Avatar Content

```jsx
// Avatar with status indicator
function AvatarWithStatus({ user, status }) {
  return (
    <div className="avatar-with-status">
      <Avatar src={user.avatar} circle />
      <span className={`status-indicator status-indicator--${status}`} />
    </div>
  );
}

// Avatar with badge
function AvatarWithBadge({ user, badgeCount }) {
  return (
    <div className="avatar-with-badge">
      <Avatar src={user.avatar} circle />
      {badgeCount > 0 && (
        <span className="avatar-badge">{badgeCount}</span>
      )}
    </div>
  );
}
```

## Accessibility

The Avatar component follows accessibility best practices:

### ARIA Support

- `role="button"` is applied when `onClick` is provided
- `tabIndex` is set appropriately for interactive avatars
- `aria-disabled` is set when the avatar is disabled

### Keyboard Support

When interactive (with `onClick` prop):
- **Enter/Space**: Activates the avatar
- **Tab**: Moves focus to the avatar
- **Shift + Tab**: Moves focus away from the avatar

### Best Practices

1. **Always provide alt text** for image avatars:
   ```jsx
   <Avatar src="user.jpg" alt="John Doe's profile picture" />
   ```

2. **Use meaningful initials**:
   ```jsx
   <Avatar initials="JD" alt="John Doe" />
   ```

3. **Consider screen reader users** with descriptive content:
   ```jsx
   <Avatar
     src="user.jpg"
     alt="John Doe, Senior Developer"
     onClick={() => viewProfile(user)}
   />
   ```

## Styling

### CSS Custom Properties

The Avatar component uses CSS custom properties for theming:

```css
:root {
  /* Avatar sizes */
  --atomix-avatar-xs-size: 1.5rem;
  --atomix-avatar-sm-size: 2rem;
  --atomix-avatar-md-size: 2.5rem;
  --atomix-avatar-lg-size: 3rem;
  --atomix-avatar-xl-size: 3.5rem;

  /* Avatar styling */
  --atomix-avatar-border-radius: var(--atomix-border-radius);
  --atomix-avatar-bg: var(--atomix-gray-200);
  --atomix-avatar-color: var(--atomix-gray-600);
  --atomix-avatar-border: 1px solid var(--atomix-border-color);

  /* Avatar font sizes for initials */
  --atomix-avatar-xs-font-size: 0.75rem;
  --atomix-avatar-sm-font-size: 0.875rem;
  --atomix-avatar-md-font-size: 1rem;
  --atomix-avatar-lg-font-size: 1.125rem;
  --atomix-avatar-xl-font-size: 1.25rem;
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base avatar class */
.c-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Size modifiers */
.c-avatar--xs { width: var(--atomix-avatar-xs-size); height: var(--atomix-avatar-xs-size); }
.c-avatar--sm { width: var(--atomix-avatar-sm-size); height: var(--atomix-avatar-sm-size); }
.c-avatar--md { width: var(--atomix-avatar-md-size); height: var(--atomix-avatar-md-size); }
.c-avatar--lg { width: var(--atomix-avatar-lg-size); height: var(--atomix-avatar-lg-size); }
.c-avatar--xl { width: var(--atomix-avatar-xl-size); height: var(--atomix-avatar-xl-size); }

/* Shape modifiers */
.c-avatar--circle { border-radius: 50%; }

/* Elements */
.c-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.c-avatar__initials {
  font-weight: 500;
  text-transform: uppercase;
}

.c-avatar__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* States */
.c-avatar:hover {
  cursor: pointer;
}

.c-avatar.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Avatar Group */
.c-avatar-group {
  display: flex;
  align-items: center;
}

.c-avatar-group .c-avatar:not(:first-child) {
  margin-left: -0.5rem;
}

.c-avatar-group--stacked .c-avatar:not(:first-child) {
  margin-left: -0.75rem;
}
```

### Customization Examples

```css
/* Custom avatar colors */
.c-avatar--custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Custom hover effects */
.c-avatar--interactive:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Custom status indicator */
.avatar-with-status {
  position: relative;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
}

.status-indicator--online { background-color: #10b981; }
.status-indicator--away { background-color: #f59e0b; }
.status-indicator--offline { background-color: #6b7280; }
```

## Common Patterns

### User Profile Card

```jsx
function UserProfileCard({ user }) {
  return (
    <div className="profile-card">
      <Avatar
        src={user.avatar}
        alt={`${user.name}'s profile picture`}
        size="lg"
        circle
      />
      <div className="profile-info">
        <h3>{user.name}</h3>
        <p>{user.role}</p>
      </div>
    </div>
  );
}
```

### Comment System

```jsx
function Comment({ comment }) {
  return (
    <div className="comment">
      <Avatar
        src={comment.author.avatar}
        alt={comment.author.name}
        size="sm"
        circle
      />
      <div className="comment-content">
        <strong>{comment.author.name}</strong>
        <p>{comment.text}</p>
        <time>{comment.timestamp}</time>
      </div>
    </div>
  );
}
```

### Team Member List

```jsx
function TeamMemberList({ members }) {
  return (
    <div className="team-list">
      <h2>Team Members</h2>
      <AvatarGroup max={5} stacked>
        {members.map(member => (
          <Avatar
            key={member.id}
            src={member.avatar}
            alt={member.name}
            circle
            onClick={() => viewMemberProfile(member)}
          />
        ))}
      </AvatarGroup>
      <span className="team-count">{members.length} members</span>
    </div>
  );
}
```

### Upload Avatar

```jsx
function AvatarUpload({ currentAvatar, onUpload }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="avatar-upload">
      <Avatar
        src={currentAvatar}
        size="lg"
        circle
        onClick={handleClick}
        className="avatar-upload__preview"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleClick} className="avatar-upload__button">
        Change Avatar
      </button>
    </div>
  );
}
```

## Performance Considerations

1. **Image optimization**: Use appropriate image sizes and formats
2. **Lazy loading**: Consider lazy loading for avatar images in long lists
3. **Caching**: Implement proper caching strategies for avatar images
4. **Fallback performance**: Initials render faster than icons

```jsx
// Optimized avatar list with lazy loading
function AvatarList({ users }) {
  return (
    <div className="avatar-list">
      {users.map((user, index) => (
        <Avatar
          key={user.id}
          src={user.avatar}
          alt={user.name}
          loading={index > 10 ? "lazy" : "eager"} // Lazy load after first 10
          circle
        />
      ))}
    </div>
  );
}
```

## Integration Examples

### With React Router

```jsx
import { Link } from 'react-router-dom';

function UserAvatar({ user }) {
  return (
    <Link to={`/users/${user.id}`} className="user-link">
      <Avatar
        src={user.avatar}
        alt={user.name}
        circle
      />
    </Link>
  );
}
```

### With Tooltip

```jsx
import { Tooltip } from '@shohojdhara/atomix';

function TooltipAvatar({ user }) {
  return (
    <Tooltip content={`${user.name} - ${user.role}`}>
      <Avatar
        src={user.avatar}
        alt={user.name}
        circle
      />
    </Tooltip>
  );
}
```

### With Modal

```jsx
function ModalAvatar({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Avatar
        src={user.avatar}
        alt={user.name}
        onClick={() => setShowModal(true)}
        circle
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserProfileModal user={user} />
        </Modal>
      )}
    </>
  );
}
```

## Browser Support

The Avatar component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Icon](./icon.mdx)** - Used as fallback content
- **[Badge](./badge.mdx)** - Often combined with avatars
- **[Tooltip](./tooltip.mdx)** - For additional user information
- **[Card](./card.mdx)** - Common container for avatar content
- **[Button](./button.mdx)** - For interactive avatar functionality

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x (deprecated)
<Avatar
  image="user.jpg"
  name="John Doe"
  round={true}
  onClick={handleClick}
/>

// v2.x (current)
<Avatar
  src="user.jpg"
  alt="John Doe"
  circle={true}
  onClick={handleClick}
/>
```

### From Custom Implementation

```jsx
// Before (custom implementation)
<div className="user-avatar">
  <img src="user.jpg" alt="User" className="avatar-img" />
</div>

// After (Atomix Avatar)
<Avatar src="user.jpg" alt="User" circle />
```
