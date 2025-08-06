# Avatar Components

The Avatar components provide flexible user profile image display with fallback options and group functionality. The system includes Avatar for individual profile images and AvatarGroup for displaying multiple avatars in a compact layout.

## Overview

Avatars are essential for representing users in applications. They provide visual identity and help users quickly identify people in lists, comments, team members, and other contexts. The Atomix Avatar components handle image loading, fallbacks, and various display options.

## Components

### Avatar
Individual user profile image with fallback options

### AvatarGroup
Display multiple avatars in a stacked or inline layout

## Avatar Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Avatar image URL |
| `alt` | `string` | `'Avatar'` | Alt text for image |
| `initials` | `string` | `undefined` | Fallback initials |
| `icon` | `ReactNode` | `undefined` | Fallback icon |
| `size` | `AvatarSize` | `'md'` | Avatar size |
| `circle` | `boolean` | `false` | Circular avatar |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `(event: MouseEvent) => void` | `undefined` | Click handler |
| `className` | `string` | `''` | Additional CSS classes |

### Size Options

- `xs` - Extra small (24px)
- `sm` - Small (32px)
- `md` - Medium (40px) - default
- `lg` - Large (48px)
- `xl` - Extra large (64px)

## Usage Examples

### Basic Avatar

```jsx
import React from 'react';
import { Avatar } from '@shohojdhara/atomix';

function BasicAvatars() {
  return (
    <div className="u-d-flex u-align-items-center u-gap-4">
      {/* Avatar with image */}
      <Avatar 
        src="/user-avatar.jpg" 
        alt="John Doe"
        size="md"
      />
      
      {/* Avatar with initials fallback */}
      <Avatar 
        src="/broken-image.jpg" 
        alt="Jane Smith"
        initials="JS"
        size="md"
      />
      
      {/* Avatar with icon fallback */}
      <Avatar 
        alt="Guest User"
        icon={<Icon name="User" />}
        size="md"
      />
      
      {/* Circular avatar */}
      <Avatar 
        src="/user-avatar.jpg" 
        alt="John Doe"
        circle
        size="md"
      />
    </div>
  );
}
```

### Avatar Sizes

```jsx
function AvatarSizes() {
  const user = {
    src: "/user-avatar.jpg",
    alt: "John Doe",
    initials: "JD"
  };

  return (
    <div className="u-d-flex u-align-items-center u-gap-4">
      <Avatar {...user} size="xs" />
      <Avatar {...user} size="sm" />
      <Avatar {...user} size="md" />
      <Avatar {...user} size="lg" />
      <Avatar {...user} size="xl" />
    </div>
  );
}
```

### Interactive Avatars

```jsx
function InteractiveAvatars() {
  const handleAvatarClick = (user) => {
    console.log('Avatar clicked:', user.name);
  };

  const users = [
    { id: 1, name: 'John Doe', avatar: '/john.jpg', initials: 'JD' },
    { id: 2, name: 'Jane Smith', avatar: '/jane.jpg', initials: 'JS' },
    { id: 3, name: 'Bob Johnson', avatar: '/bob.jpg', initials: 'BJ' }
  ];

  return (
    <div className="u-d-flex u-gap-3">
      {users.map(user => (
        <Avatar
          key={user.id}
          src={user.avatar}
          alt={user.name}
          initials={user.initials}
          circle
          onClick={() => handleAvatarClick(user)}
          className="u-cursor-pointer u-hover:opacity-80 u-transition-opacity"
        />
      ))}
    </div>
  );
}
```

### Avatar with Status

```jsx
import { Badge } from '@shohojdhara/atomix';

function AvatarWithStatus() {
  return (
    <div className="u-d-relative u-d-inline-block">
      <Avatar 
        src="/user-avatar.jpg" 
        alt="John Doe"
        circle
        size="lg"
      />
      <Badge 
        label=""
        variant="success"
        className="u-d-absolute u-d-bottom-1 u-d-right-1 u-w-4 u-h-4 u-rounded-full u-border-2 u-border-white"
      />
    </div>
  );
}
```

## AvatarGroup Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Avatar components |
| `max` | `number` | `undefined` | Max avatars before showing "+X" |
| `stacked` | `boolean` | `false` | Stacked layout |
| `moreText` | `string` | `undefined` | Custom text for overflow indicator |
| `className` | `string` | `''` | Additional CSS classes |

### Usage

```jsx
function AvatarGroupExamples() {
  const teamMembers = [
    { name: 'John Doe', avatar: '/john.jpg', initials: 'JD' },
    { name: 'Jane Smith', avatar: '/jane.jpg', initials: 'JS' },
    { name: 'Bob Johnson', avatar: '/bob.jpg', initials: 'BJ' },
    { name: 'Alice Brown', avatar: '/alice.jpg', initials: 'AB' },
    { name: 'Charlie Wilson', avatar: '/charlie.jpg', initials: 'CW' }
  ];

  return (
    <div className="u-gap-6">
      {/* Basic avatar group */}
      <AvatarGroup>
        {teamMembers.slice(0, 3).map(member => (
          <Avatar
            key={member.name}
            src={member.avatar}
            alt={member.name}
            initials={member.initials}
            circle
          />
        ))}
      </AvatarGroup>

      {/* Stacked avatar group */}
      <AvatarGroup stacked>
        {teamMembers.slice(0, 4).map(member => (
          <Avatar
            key={member.name}
            src={member.avatar}
            alt={member.name}
            initials={member.initials}
            circle
          />
        ))}
      </AvatarGroup>

      {/* Avatar group with max limit */}
      <AvatarGroup max={3}>
        {teamMembers.map(member => (
          <Avatar
            key={member.name}
            src={member.avatar}
            alt={member.name}
            initials={member.initials}
            circle
          />
        ))}
      </AvatarGroup>

      {/* Avatar group with custom more text */}
      <AvatarGroup max={2} moreText="others">
        {teamMembers.map(member => (
          <Avatar
            key={member.name}
            src={member.avatar}
            alt={member.name}
            initials={member.initials}
            circle
          />
        ))}
      </AvatarGroup>
    </div>
  );
}
```

### Team Member List

```jsx
function TeamMemberList() {
  const team = [
    { 
      id: 1, 
      name: 'John Doe', 
      role: 'Frontend Developer',
      avatar: '/john.jpg',
      initials: 'JD',
      status: 'online'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      role: 'UI/UX Designer',
      avatar: '/jane.jpg',
      initials: 'JS',
      status: 'away'
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      role: 'Backend Developer',
      avatar: '/bob.jpg',
      initials: 'BJ',
      status: 'offline'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'success';
      case 'away': return 'warning';
      case 'offline': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="u-gap-4">
      {team.map(member => (
        <div key={member.id} className="u-d-flex u-align-items-center u-gap-3">
          <div className="u-d-relative">
            <Avatar 
              src={member.avatar}
              alt={member.name}
              initials={member.initials}
              circle
              size="md"
            />
            <div 
              className={`u-d-absolute u-d-bottom-1 u-d-right-1 u-w-3 u-h-3 u-rounded-full u-border-2 u-border-white u-bg-${getStatusColor(member.status)}`}
            />
          </div>
          <div>
            <div className="u-fw-medium">{member.name}</div>
            <div className="u-fs-sm u-text-secondary">{member.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Avatar Dropdown

```jsx
import { Dropdown, MenuItem } from '@shohojdhara/atomix';

function AvatarDropdown({ user }) {
  return (
    <Dropdown
      trigger="click"
      placement="bottom-end"
      menu={
        <div>
          <MenuItem href="/profile" icon={<Icon name="User" />}>
            View Profile
          </MenuItem>
          <MenuItem href="/settings" icon={<Icon name="Gear" />}>
            Settings
          </MenuItem>
          <MenuItem href="/help" icon={<Icon name="Question" />}>
            Help
          </MenuItem>
          <DropdownDivider />
          <MenuItem onClick={handleLogout} icon={<Icon name="SignOut" />}>
            Sign Out
          </MenuItem>
        </div>
      }
    >
      <Avatar 
        src={user.avatar}
        alt={user.name}
        initials={user.initials}
        circle
        className="u-cursor-pointer u-hover:opacity-80"
      />
    </Dropdown>
  );
}
```

## Vanilla JavaScript Usage

```javascript
// Basic avatar
const avatar = new Atomix.Avatar('.my-avatar', {
  src: '/user-avatar.jpg',
  alt: 'John Doe',
  initials: 'JD',
  size: 'md',
  circle: true,
  onClick: () => {
    console.log('Avatar clicked');
  }
});

// Avatar group
const avatarGroup = new Atomix.AvatarGroup('.avatar-group', {
  max: 3,
  stacked: true
});

// Initialize from data attributes
Atomix.Avatar.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic avatar -->
<div 
  class="c-avatar c-avatar--md c-avatar--circle" 
  data-atomix="avatar"
  data-src="/user-avatar.jpg"
  data-alt="John Doe"
  data-initials="JD">
  <img src="/user-avatar.jpg" alt="John Doe" class="c-avatar__image">
</div>

<!-- Avatar with fallback -->
<div 
  class="c-avatar c-avatar--md" 
  data-atomix="avatar"
  data-initials="JS">
  <span class="c-avatar__initials">JS</span>
</div>

<!-- Avatar group -->
<div 
  class="c-avatar-group c-avatar-group--stacked" 
  data-atomix="avatar-group"
  data-max="3">
  <div class="c-avatar c-avatar--sm c-avatar--circle">
    <img src="/user1.jpg" alt="User 1" class="c-avatar__image">
  </div>
  <div class="c-avatar c-avatar--sm c-avatar--circle">
    <img src="/user2.jpg" alt="User 2" class="c-avatar__image">
  </div>
  <div class="c-avatar c-avatar--sm c-avatar--circle">
    <span class="c-avatar__initials">+2</span>
  </div>
</div>
```

## Styling

### CSS Classes

```css
/* Base avatar */
.c-avatar {
  /* Base avatar styles */
}

/* Size modifiers */
.c-avatar--xs { /* Extra small */ }
.c-avatar--sm { /* Small */ }
.c-avatar--md { /* Medium (default) */ }
.c-avatar--lg { /* Large */ }
.c-avatar--xl { /* Extra large */ }

/* Shape modifiers */
.c-avatar--circle { /* Circular avatar */ }

/* State modifiers */
.is-disabled { /* Disabled state */ }

/* Elements */
.c-avatar__image { /* Image element */ }
.c-avatar__initials { /* Initials text */ }
.c-avatar__icon { /* Icon container */ }

/* Avatar group */
.c-avatar-group { /* Base group */ }
.c-avatar-group--stacked { /* Stacked layout */ }
.c-avatar-group__more { /* More indicator */ }
```

### Custom Styling

```css
/* Custom avatar variant */
.c-avatar--bordered {
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-50);
}

/* Hover effects */
.c-avatar--interactive {
  cursor: pointer;
  transition: all 0.2s ease;
}

.c-avatar--interactive:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Status indicators */
.c-avatar--status::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  border: 2px solid white;
}

.c-avatar--status-online::after {
  background-color: var(--color-success);
}

.c-avatar--status-away::after {
  background-color: var(--color-warning);
}

.c-avatar--status-offline::after {
  background-color: var(--color-secondary);
}
```

## Accessibility

### ARIA Attributes

- `role="img"` - Identifies avatar as image
- `aria-label` - Provides accessible description
- `alt` attribute - Image alternative text
- `tabindex="0"` - Makes clickable avatars focusable

### Keyboard Navigation

- **Tab** - Navigate to clickable avatars
- **Enter/Space** - Activate clickable avatars

### Screen Reader Support

- Avatar images include descriptive alt text
- Initials are announced as text
- Interactive avatars are identified as buttons
- Group context is preserved

## Best Practices

### Do's ✅

- Always provide meaningful alt text
- Use initials as fallback for missing images
- Keep avatar sizes consistent within contexts
- Provide visual feedback for interactive avatars
- Use appropriate sizes for the context

```jsx
// Good: Proper fallbacks and accessibility
<Avatar 
  src="/user-avatar.jpg"
  alt="John Doe - Software Engineer"
  initials="JD"
  circle
  onClick={handleProfileClick}
/>
```

### Don'ts ❌

- Don't use avatars without fallbacks
- Don't make avatars too small to be recognizable
- Don't use low-quality or pixelated images
- Don't forget to handle image loading errors

```jsx
// Bad: No fallback or accessibility
<Avatar src="/user-avatar.jpg" />
```

## Common Patterns

### User Profile Header

```jsx
function UserProfileHeader({ user }) {
  return (
    <div className="u-d-flex u-align-items-center u-gap-4">
      <Avatar 
        src={user.avatar}
        alt={user.name}
        initials={user.initials}
        size="xl"
        circle
      />
      <div>
        <h1 className="u-fs-2xl u-fw-bold">{user.name}</h1>
        <p className="u-fs-sm u-text-secondary">{user.title}</p>
        <div className="u-d-flex u-align-items-center u-gap-2 u-mt-2">
          <Badge label={user.status} variant="success" />
          <span className="u-fs-sm u-text-secondary">
            Last seen {user.lastSeen}
          </span>
        </div>
      </div>
    </div>
  );
}
```

### Comment System

```jsx
function Comment({ comment }) {
  return (
    <div className="u-d-flex u-gap-3">
      <Avatar 
        src={comment.author.avatar}
        alt={comment.author.name}
        initials={comment.author.initials}
        circle
        size="sm"
      />
      <div className="u-flex-1">
        <div className="u-d-flex u-align-items-center u-gap-2">
          <span className="u-fw-medium">{comment.author.name}</span>
          <span className="u-fs-sm u-text-secondary">{comment.timestamp}</span>
        </div>
        <p className="u-mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
```

### Team Collaboration

```jsx
function ProjectTeam({ project }) {
  return (
    <Card>
      <div className="u-d-flex u-justify-content-between">
        <div>
          <h3 className="u-fw-semibold">{project.name}</h3>
          <p className="u-fs-sm u-text-secondary">{project.description}</p>
        </div>
        <AvatarGroup max={4} stacked>
          {project.team.map(member => (
            <Avatar
              key={member.id}
              src={member.avatar}
              alt={member.name}
              initials={member.initials}
              circle
              size="sm"
            />
          ))}
        </AvatarGroup>
      </div>
    </Card>
  );
}
```

## Related Components

- **Badge** - Status indicators
- **Icon** - Fallback icons
- **Dropdown** - Avatar menus
- **Card** - Profile containers
- **Button** - Interactive avatars

## Performance Considerations

- Use appropriate image sizes and formats
- Implement lazy loading for avatar lists
- Cache avatar images when possible
- Optimize initials rendering for large lists

```jsx
// Lazy loading example
function LazyAvatar({ src, ...props }) {
  return (
    <Avatar 
      src={src}
      loading="lazy"
      {...props}
    />
  );
}
```

## Browser Support

Avatar components support all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Image loading and error handling work across all supported browsers.
