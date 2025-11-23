# Atomix Component Reference

A comprehensive guide to all components in the Atomix design system. Each component provides both React and vanilla JavaScript implementations with consistent APIs and styling.

## 📚 Detailed Component Documentation

For in-depth documentation with complete examples, props, and usage patterns:

### Core Components
- **[Button Component](./components/button.md)** - Interactive buttons with variants, sizes, and states
- **[Badge Component](./components/badge.md)** - Status indicators and labels with icons and variants
- **[Card Component](./components/card.md)** - Flexible content containers with headers, actions, and layouts
- **[Avatar Components](./components/avatar.md)** - User profile images and avatar groups

### Form System
- **[Form Components](./components/form.md)** - Complete form system with validation and accessibility

### Interactive Components
- **[Modal Component](./components/modal.md)** - Dialog overlays for focused interactions
- **[Dropdown Component](./components/dropdown.md)** - Flexible menu system with various triggers and placements
- **[Accordion Component](./components/accordion.md)** - Collapsible content sections for space-efficient organization
- **[Tooltip Component](./components/tooltip.md)** - Contextual information on hover with rich content support
- **[Tabs Component](./components/tabs.md)** - Tabbed interfaces for organizing content into separate panels
- **[Toggle Component](./components/toggle.md)** - Switch-like controls for binary states and settings

### Navigation
- **[Navigation Components](./components/navigation.md)** - Navbar, Nav, Menu, SideMenu, and Breadcrumb

### Data Display
- **[DataTable Component](./components/datatable.md)** - Feature-rich tables with sorting, filtering, and pagination

### Feedback Components
- **[Progress Component](./components/progress.md)** - Visual feedback for ongoing processes and completion status
- **[Spinner Component](./components/spinner.md)** - Loading indicators for various states and operations

## Table of Contents

- [Basic Components](#basic-components)
- [Layout Components](#layout-components)
- [Form Components](#form-components)
- [Navigation Components](#navigation-components)
- [Interactive Components](#interactive-components)
- [Data Display Components](#data-display-components)
- [Specialized Components](#specialized-components)
- [Utility Components](#utility-components)

## Basic Components

### Button
**Purpose**: Interactive element for user actions  
**Props**: `label`, `variant`, `size`, `icon`, `iconOnly`, `rounded`, `disabled`, `onClick`  
**Variants**: `primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `info`, `link`  
**Sizes**: `sm`, `md`, `lg`

```jsx
// React
import { Button } from '@shohojdhara/atomix';
<Button variant="primary" size="md" onClick={handleClick}>Click me</Button>

// Vanilla JS
const button = new Atomix.Button('.my-button', {
  variant: 'primary',
  onClick: handleClick
});
```

### Badge
**Purpose**: Small status indicators and labels  
**Props**: `label`, `variant`, `size`, `icon`  
**Variants**: All theme colors  
**Sizes**: `sm`, `md`, `lg`

```jsx
// React
import { Badge } from '@shohojdhara/atomix';
<Badge variant="success" label="Active" />

// Vanilla JS
const badge = new Atomix.Badge('.my-badge', {
  variant: 'success',
  label: 'Active'
});
```

### Icon
**Purpose**: Display icons from Phosphor Icons library  
**Props**: `name`, `size`, `color`, `weight`  
**Sizes**: `xs`, `sm`, `md`, `lg`, `xl`

```jsx
// React
import { Icon } from '@shohojdhara/atomix';
<Icon name="Heart" size="md" />
```

### Spinner
**Purpose**: Loading indicators  
**Props**: `variant`, `size`, `fullscreen`  
**Variants**: All theme colors  
**Sizes**: `sm`, `md`, `lg`

```jsx
// React
import { Spinner } from '@shohojdhara/atomix';
<Spinner variant="primary" size="md" />

// Vanilla JS
const spinner = new Atomix.Spinner('.my-spinner', {
  variant: 'primary'
});
```

## Layout Components

### Card
**Purpose**: Flexible content containers  
**Props**: `header`, `image`, `title`, `text`, `actions`, `footer`, `row`, `flat`, `active`

```jsx
// React
import { Card } from '@shohojdhara/atomix';
<Card 
  title="Card Title"
  text="Card content"
  actions={<Button>Action</Button>}
/>

// Vanilla JS
const card = new Atomix.Card('.my-card', {
  title: 'Card Title',
  text: 'Card content'
});
```

### Hero
**Purpose**: Large promotional sections  
**Props**: `title`, `subtitle`, `text`, `imageSrc`, `alignment`, `backgroundImageSrc`, `actions`

```jsx
// React
import { Hero } from '@shohojdhara/atomix';
<Hero 
  title="Welcome to Atomix"
  subtitle="Modern Design System"
  alignment="center"
  actions={<Button>Get Started</Button>}
/>
```

### River
**Purpose**: Content sections with alternating image layouts  
**Props**: `sections`, `alignment`, `imagePosition`

### SectionIntro
**Purpose**: Section headers with title and description  
**Props**: `title`, `subtitle`, `description`, `alignment`

## Form Components

### Form
**Purpose**: Form container with validation  
**Props**: `onSubmit`, `onReset`, `method`, `noValidate`

### FormGroup
**Purpose**: Form field wrapper with label and validation  
**Props**: `label`, `helperText`, `required`, `invalid`, `valid`

### Input
**Purpose**: Text input fields  
**Props**: `type`, `value`, `onChange`, `placeholder`, `required`, `invalid`, `valid`

```jsx
// React
import { Input, FormGroup } from '@shohojdhara/atomix';
<FormGroup label="Email" required>
  <Input 
    type="email" 
    placeholder="Enter your email"
    value={email}
    onChange={handleEmailChange}
  />
</FormGroup>
```

### Select
**Purpose**: Dropdown selection  
**Props**: `options`, `value`, `onChange`, `multiple`, `placeholder`

### Checkbox
**Purpose**: Boolean input  
**Props**: `label`, `checked`, `onChange`, `indeterminate`

### Radio
**Purpose**: Single selection from group  
**Props**: `label`, `checked`, `onChange`, `name`, `value`

### Textarea
**Purpose**: Multi-line text input  
**Props**: `value`, `onChange`, `rows`, `placeholder`

## Navigation Components

### Navbar
**Purpose**: Main site navigation  
**Props**: `brand`, `variant`, `position`, `collapsible`, `expanded`

### Nav
**Purpose**: Navigation lists  
**Props**: `alignment`, `variant`

### Menu
**Purpose**: Menu containers  
**Props**: `children`

### SideMenu
**Purpose**: Sidebar navigation  
**Props**: `title`, `isOpen`, `onToggle`, `collapsible`

### Breadcrumb
**Purpose**: Navigation hierarchy  
**Props**: `items`, `divider`, `ariaLabel`

```jsx
// React
import { Breadcrumb } from '@shohojdhara/atomix';
const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current Page', active: true }
];
<Breadcrumb items={items} />
```

## Interactive Components

### Accordion
**Purpose**: Collapsible content sections  
**Props**: `title`, `defaultOpen`, `iconPosition`, `icon`

```jsx
// React
import { Accordion } from '@shohojdhara/atomix';
<Accordion title="Section Title" defaultOpen>
  <p>Collapsible content here</p>
</Accordion>
```

### Dropdown
**Purpose**: Dropdown menus  
**Props**: `menu`, `trigger`, `placement`, `isOpen`, `onOpenChange`

### Modal
**Purpose**: Dialog overlays  
**Props**: `isOpen`, `onOpenChange`, `title`, `size`, `backdrop`, `keyboard`

```jsx
// React
import { Modal } from '@shohojdhara/atomix';
<Modal 
  isOpen={isOpen} 
  onOpenChange={setIsOpen}
  title="Modal Title"
  size="md"
>
  <p>Modal content</p>
</Modal>
```

### Popover
**Purpose**: Contextual overlays  
**Props**: `content`, `position`, `trigger`, `delay`, `offset`

### Tooltip
**Purpose**: Hover information  
**Props**: `content`, `position`, `delay`

### Tab
**Purpose**: Tabbed interfaces  
**Props**: `tabs`, `activeTab`, `onTabChange`

### Toggle
**Purpose**: Switch controls  
**Props**: `checked`, `onChange`, `label`, `size`

## Data Display Components

### Avatar
**Purpose**: User profile images  
**Props**: `src`, `alt`, `initials`, `icon`, `size`, `circle`

```jsx
// React
import { Avatar } from '@shohojdhara/atomix';
<Avatar src="/user.jpg" alt="User" size="md" circle />
```

### AvatarGroup
**Purpose**: Multiple avatar display  
**Props**: `max`, `stacked`, `moreText`

### List
**Purpose**: Ordered and unordered lists  
**Props**: `items`, `variant`, `size`, `ordered`, `inline`

### ListGroup
**Purpose**: Styled list containers  
**Props**: `variant`, `size`

### DataTable
**Purpose**: Data tables with sorting and filtering  
**Props**: `data`, `columns`, `sortable`, `filterable`, `paginated`

### Pagination
**Purpose**: Page navigation  
**Props**: `currentPage`, `totalPages`, `onPageChange`, `siblingCount`

### Progress
**Purpose**: Progress indicators  
**Props**: `value`, `variant`, `size`

### Rating
**Purpose**: Star ratings  
**Props**: `value`, `maxValue`, `allowHalf`, `readOnly`, `onChange`

## Specialized Components

### PhotoViewer
**Purpose**: Image gallery viewer  
**Props**: `images`, `startIndex`, `enableKeyboardNavigation`, `thumbnailPosition`

### Messages
**Purpose**: Chat/messaging interface  
**Props**: `messages`, `otherAvatar`, `selfAvatar`, `onSendMessage`

### Todo
**Purpose**: Task management  
**Props**: `items`, `onAddTodo`, `onToggleTodo`, `onDeleteTodo`

### Countdown
**Purpose**: Timer and countdown display  
**Props**: `targetDate`, `format`, `onComplete`

### DatePicker
**Purpose**: Date selection  
**Props**: `value`, `onChange`, `format`, `minDate`, `maxDate`

### Upload
**Purpose**: File upload interface  
**Props**: `onUpload`, `accept`, `multiple`, `maxSize`

### Steps
**Purpose**: Step-by-step processes  
**Props**: `steps`, `currentStep`, `onStepChange`

### Testimonial
**Purpose**: Customer testimonials  
**Props**: `quote`, `author`, `avatar`, `company`

### ProductReview
**Purpose**: Product review display  
**Props**: `rating`, `title`, `content`, `author`, `date`

## Utility Components

### ColorModeToggle
**Purpose**: Dark/light mode switcher  
**Props**: `mode`, `onModeChange`

### EdgePanel
**Purpose**: Side panels and drawers  
**Props**: `position`, `mode`, `isOpen`, `onOpenChange`, `backdrop`

### Callout
**Purpose**: Highlighted information blocks  
**Props**: `title`, `variant`, `icon`, `onClose`, `actions`

```jsx
// React
import { Callout } from '@shohojdhara/atomix';
<Callout 
  variant="info" 
  title="Information"
  icon={<Icon name="Info" />}
>
  Important information here
</Callout>
```

## Common Props

Most components share these common props:

- **className**: Additional CSS classes
- **disabled**: Disable the component
- **size**: Component size (`sm`, `md`, `lg`)
- **variant**: Color/style variant
- **children**: Child elements

## Accessibility Features

All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

## Styling

Components use BEM methodology with ITCSS architecture:
- **Components**: `.c-component-name`
- **Elements**: `.c-component-name__element`
- **Modifiers**: `.c-component-name--modifier`

## Best Practices

1. **Use semantic HTML** - Components render appropriate HTML elements
2. **Provide labels** - Always include accessible labels
3. **Handle loading states** - Use Spinner for async operations
4. **Validate forms** - Use FormGroup validation features
5. **Test with keyboard** - Ensure keyboard navigation works
6. **Check contrast** - Verify color combinations meet WCAG standards

## Getting Help

- Check component stories in Storybook for examples
- Review the implementation guide for setup instructions
- See the theme system guide for customization options
