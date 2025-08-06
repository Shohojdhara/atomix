# Tooltip Component

The Tooltip component provides contextual information that appears on hover or focus. It's perfect for explaining functionality, providing additional details, or offering helpful hints without cluttering the interface.

## Overview

Tooltips enhance user experience by providing just-in-time information. The Atomix Tooltip component offers flexible positioning, customizable content, and accessibility features to ensure information is available to all users.

## Props API

### TooltipProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | **required** | Tooltip content |
| `children` | `ReactNode` | **required** | Element that triggers tooltip |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | `'top'` | Tooltip position |
| `delay` | `number` | `500` | Delay before showing (ms) |
| `offset` | `number` | `8` | Distance from trigger (pixels) |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | `undefined` | Tooltip ID for accessibility |

## Usage Examples

### Basic Tooltip

```jsx
import React from 'react';
import { Tooltip, Button, Icon } from '@shohojdhara/atomix';

function BasicTooltips() {
  return (
    <div className="u-d-flex u-gap-4">
      <Tooltip content="This is a helpful tooltip">
        <Button label="Hover me" variant="primary" />
      </Tooltip>

      <Tooltip content="Click to save your changes" position="bottom">
        <Button 
          icon={<Icon name="FloppyDisk" />}
          iconOnly
          variant="success"
          aria-label="Save"
        />
      </Tooltip>

      <Tooltip content="Delete this item permanently" position="left">
        <Button 
          icon={<Icon name="Trash" />}
          iconOnly
          variant="error"
          aria-label="Delete"
        />
      </Tooltip>
    </div>
  );
}
```

### Tooltip Positions

```jsx
function TooltipPositions() {
  return (
    <div className="u-d-grid u-grid-cols-3 u-gap-8 u-place-items-center u-p-8">
      <div></div>
      <Tooltip content="Top tooltip" position="top">
        <Button label="Top" variant="outline-primary" />
      </Tooltip>
      <div></div>

      <Tooltip content="Left tooltip" position="left">
        <Button label="Left" variant="outline-primary" />
      </Tooltip>
      
      <Tooltip content="Auto positioning" position="auto">
        <Button label="Auto" variant="primary" />
      </Tooltip>
      
      <Tooltip content="Right tooltip" position="right">
        <Button label="Right" variant="outline-primary" />
      </Tooltip>

      <div></div>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button label="Bottom" variant="outline-primary" />
      </Tooltip>
      <div></div>
    </div>
  );
}
```

### Rich Content Tooltips

```jsx
function RichContentTooltips() {
  const userTooltip = (
    <div className="u-max-w-xs">
      <div className="u-d-flex u-align-items-center u-gap-3 u-mb-2">
        <Avatar src="/user-avatar.jpg" size="sm" circle />
        <div>
          <div className="u-fw-semibold">John Doe</div>
          <div className="u-fs-sm u-text-secondary">Software Engineer</div>
        </div>
      </div>
      <p className="u-fs-sm">
        Passionate about creating amazing user experiences and building scalable applications.
      </p>
    </div>
  );

  const statsTooltip = (
    <div className="u-gap-2">
      <div className="u-fw-semibold">Performance Stats</div>
      <div className="u-d-grid u-grid-cols-2 u-gap-4 u-fs-sm">
        <div>
          <div className="u-text-secondary">Response Time</div>
          <div className="u-fw-medium">245ms</div>
        </div>
        <div>
          <div className="u-text-secondary">Uptime</div>
          <div className="u-fw-medium">99.9%</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="u-d-flex u-gap-4">
      <Tooltip content={userTooltip} position="bottom">
        <Avatar src="/user-avatar.jpg" circle className="u-cursor-help" />
      </Tooltip>

      <Tooltip content={statsTooltip} position="bottom">
        <div className="u-d-flex u-align-items-center u-gap-2 u-cursor-help">
          <Icon name="ChartBar" />
          <span>Performance</span>
        </div>
      </Tooltip>
    </div>
  );
}
```

### Form Field Tooltips

```jsx
function FormFieldTooltips() {
  return (
    <Form className="u-max-w-md u-gap-4">
      <FormGroup
        label={
          <div className="u-d-flex u-align-items-center u-gap-2">
            Password
            <Tooltip
              content="Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters"
              position="right"
            >
              <Icon name="Question" className="u-text-secondary u-cursor-help" />
            </Tooltip>
          </div>
        }
        required
      >
        <Input type="password" placeholder="Enter password" />
      </FormGroup>

      <FormGroup 
        label={
          <div className="u-d-flex u-align-items-center u-gap-2">
            API Key
            <Tooltip
              content={
                <div className="u-gap-2">
                  <div>Find your API key in the developer settings.</div>
                  <div className="u-fs-xs u-text-secondary">
                    Keep this key secure and don't share it publicly.
                  </div>
                </div>
              }
              position="right"
            >
              <Icon name="Info" className="u-text-info u-cursor-help" />
            </Tooltip>
          </div>
        }
      >
        <Input placeholder="Enter API key" />
      </FormGroup>

      <FormGroup 
        label={
          <div className="u-d-flex u-align-items-center u-gap-2">
            Webhook URL
            <Tooltip
              content="This URL will receive POST requests when events occur"
              position="right"
            >
              <Icon name="Question" className="u-text-secondary u-cursor-help" />
            </Tooltip>
          </div>
        }
      >
        <Input type="url" placeholder="https://your-site.com/webhook" />
      </FormGroup>
    </Form>
  );
}
```

### Interactive Tooltips

```jsx
function InteractiveTooltips() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const advancedTooltip = (
    <div className="u-gap-3">
      <div className="u-fw-semibold">Advanced Settings</div>
      <div className="u-gap-2">
        <label className="u-d-flex u-align-items-center u-gap-2">
          <input type="checkbox" />
          <span className="u-fs-sm">Enable debug mode</span>
        </label>
        <label className="u-d-flex u-align-items-center u-gap-2">
          <input type="checkbox" />
          <span className="u-fs-sm">Auto-save changes</span>
        </label>
      </div>
      <Button 
        label="Apply" 
        variant="primary" 
        size="sm"
        onClick={() => setShowAdvanced(false)}
      />
    </div>
  );

  return (
    <div className="u-gap-4">
      <div className="u-d-flex u-align-items-center u-gap-4">
        <span>Hover delay examples:</span>
        
        <Tooltip content="Instant tooltip" delay={0}>
          <Button label="No delay" variant="outline-primary" size="sm" />
        </Tooltip>
        
        <Tooltip content="Quick tooltip" delay={200}>
          <Button label="200ms" variant="outline-primary" size="sm" />
        </Tooltip>
        
        <Tooltip content="Standard tooltip" delay={500}>
          <Button label="500ms" variant="outline-primary" size="sm" />
        </Tooltip>
        
        <Tooltip content="Slow tooltip" delay={1000}>
          <Button label="1000ms" variant="outline-primary" size="sm" />
        </Tooltip>
      </div>

      <div className="u-d-flex u-align-items-center u-gap-4">
        <span>Interactive content:</span>
        
        <Tooltip 
          content={advancedTooltip}
          position="bottom"
          className="interactive-tooltip"
        >
          <Button 
            label="Advanced" 
            variant="secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
          />
        </Tooltip>
      </div>
    </div>
  );
}
```

### Status Tooltips

```jsx
function StatusTooltips() {
  const servers = [
    { name: 'Web Server', status: 'online', uptime: '99.9%', lastCheck: '2 min ago' },
    { name: 'Database', status: 'warning', uptime: '98.5%', lastCheck: '1 min ago' },
    { name: 'Cache Server', status: 'offline', uptime: '0%', lastCheck: '5 min ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'offline': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusTooltip = (server) => (
    <div className="u-gap-2">
      <div className="u-fw-semibold">{server.name}</div>
      <div className="u-d-grid u-grid-cols-2 u-gap-4 u-fs-sm">
        <div>
          <div className="u-text-secondary">Status</div>
          <div className={`u-fw-medium u-text-capitalize ${getStatusColor(server.status)}`}>
            {server.status}
          </div>
        </div>
        <div>
          <div className="u-text-secondary">Uptime</div>
          <div className="u-fw-medium">{server.uptime}</div>
        </div>
      </div>
      <div className="u-fs-xs u-text-secondary">
        Last checked: {server.lastCheck}
      </div>
    </div>
  );

  return (
    <div className="u-gap-3">
      <h3 className="u-fw-semibold">Server Status</h3>
      <div className="u-gap-2">
        {servers.map((server, index) => (
          <div key={index} className="u-d-flex u-align-items-center u-gap-3 u-p-3 u-border u-rounded">
            <Tooltip content={getStatusTooltip(server)} position="right">
              <div className={`u-w-3 u-h-3 u-rounded-circle u-cursor-help ${
                server.status === 'online' ? 'u-bg-success' :
                server.status === 'warning' ? 'u-bg-warning' : 'u-bg-error'
              }`} />
            </Tooltip>
            <span className="u-fw-medium">{server.name}</span>
            <span className={`u-fs-sm u-text-capitalize ${getStatusColor(server.status)}`}>
              {server.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Disabled Tooltips

```jsx
function DisabledTooltips() {
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);

  return (
    <div className="u-gap-4">
      <div className="u-d-flex u-align-items-center u-gap-3">
        <Checkbox 
          label="Enable tooltips"
          checked={tooltipsEnabled}
          onChange={(e) => setTooltipsEnabled(e.target.checked)}
        />
      </div>

      <div className="u-d-flex u-gap-4">
        <Tooltip 
          content="This tooltip can be disabled"
          disabled={!tooltipsEnabled}
        >
          <Button label="Conditional Tooltip" variant="primary" />
        </Tooltip>

        <Tooltip 
          content="This tooltip is always disabled"
          disabled
        >
          <Button label="Always Disabled" variant="secondary" />
        </Tooltip>

        <Tooltip content="This tooltip is always enabled">
          <Button label="Always Enabled" variant="success" />
        </Tooltip>
      </div>
    </div>
  );
}
```

## Vanilla JavaScript Usage

```javascript
// Basic tooltip
const tooltip = new Atomix.Tooltip('.my-element', {
  content: 'This is a tooltip',
  position: 'top',
  delay: 500
});

// Tooltip with custom content
const richTooltip = new Atomix.Tooltip('.rich-element', {
  content: '<div><strong>Rich Content</strong><br>With HTML</div>',
  position: 'bottom',
  delay: 200
});

// Show/hide programmatically
tooltip.show();
tooltip.hide();

// Initialize from data attributes
Atomix.Tooltip.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic tooltip -->
<button 
  class="c-button" 
  data-atomix="tooltip"
  data-tooltip-content="This is a tooltip"
  data-tooltip-position="top">
  Hover me
</button>

<!-- Tooltip with custom delay -->
<span 
  data-atomix="tooltip"
  data-tooltip-content="Quick tooltip"
  data-tooltip-delay="200"
  data-tooltip-position="bottom">
  Quick hover
</span>

<!-- Rich content tooltip -->
<div 
  data-atomix="tooltip"
  data-tooltip-content="<strong>Bold text</strong><br>Line break"
  data-tooltip-position="right">
  Rich content
</div>
```

## Styling

### CSS Classes

```css
/* Base tooltip */
.c-tooltip {
  /* Tooltip container */
}

.c-tooltip__content {
  /* Tooltip content box */
}

.c-tooltip__arrow {
  /* Tooltip arrow/pointer */
}

/* Position modifiers */
.c-tooltip--top { /* Top position */ }
.c-tooltip--bottom { /* Bottom position */ }
.c-tooltip--left { /* Left position */ }
.c-tooltip--right { /* Right position */ }

/* State modifiers */
.c-tooltip--visible { /* Visible state */ }
.c-tooltip--hidden { /* Hidden state */ }
```

### Custom Styling

```css
/* Custom tooltip theme */
.c-tooltip--dark .c-tooltip__content {
  background-color: #1f2937;
  color: white;
  border: none;
}

.c-tooltip--dark .c-tooltip__arrow {
  border-color: #1f2937;
}

/* Animated entrance */
.c-tooltip__content {
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.2s ease;
}

.c-tooltip--visible .c-tooltip__content {
  opacity: 1;
  transform: scale(1);
}

/* Custom arrow styles */
.c-tooltip__arrow {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Large tooltip variant */
.c-tooltip--large .c-tooltip__content {
  max-width: 320px;
  padding: 1rem;
  font-size: 0.875rem;
}
```

## Accessibility

### ARIA Attributes

- `role="tooltip"` - Identifies tooltip content
- `aria-describedby` - Links trigger to tooltip
- `aria-hidden` - Hides tooltip when not visible
- `id` - Unique identifier for tooltip

### Keyboard Navigation

- **Escape** - Hides visible tooltip
- **Focus** - Shows tooltip on keyboard focus
- **Blur** - Hides tooltip when focus leaves

### Screen Reader Support

- Tooltip content is announced when trigger receives focus
- Proper ARIA relationships are maintained
- Tooltip content is accessible via keyboard navigation

## Best Practices

### Do's ✅

- Keep tooltip content concise and helpful
- Use consistent positioning within sections
- Provide tooltips for icon-only buttons
- Ensure tooltips don't cover important content
- Use appropriate delays for different contexts

```jsx
// Good: Helpful, concise tooltip
<Tooltip content="Save your changes">
  <Button icon={<Icon name="FloppyDisk" />} iconOnly />
</Tooltip>

// Good: Informative form help
<Tooltip content="Password must be at least 8 characters">
  <Icon name="Question" className="u-text-secondary" />
</Tooltip>
```

### Don'ts ❌

- Don't put essential information only in tooltips
- Don't use tooltips for complex interactions
- Don't make tooltip content too long
- Don't use tooltips on mobile-only interfaces

```jsx
// Bad: Essential action in tooltip only
<Tooltip content="Click here to save your work">
  <div>Some content</div>
</Tooltip>

// Bad: Too much content
<Tooltip content="This is way too much content for a tooltip. It should be brief and to the point, not a long explanation that takes up too much space.">
  <Button label="Help" />
</Tooltip>
```

## Common Patterns

### Help Icons

```jsx
function HelpIcons() {
  return (
    <div className="u-gap-4">
      <FormGroup
        label={
          <div className="u-d-flex u-align-items-center u-gap-2">
            Username
            <Tooltip content="Choose a unique username between 3-20 characters">
              <Icon name="Question" className="u-text-secondary u-cursor-help" />
            </Tooltip>
          </div>
        }
      >
        <Input placeholder="Enter username" />
      </FormGroup>

      <FormGroup
        label={
          <div className="u-d-flex u-align-items-center u-gap-2">
            Email
            <Tooltip content="We'll use this email for account notifications">
              <Icon name="Info" className="u-text-info u-cursor-help" />
            </Tooltip>
          </div>
        }
      >
        <Input type="email" placeholder="Enter email" />
      </FormGroup>
    </div>
  );
}
```

### Action Confirmations

```jsx
function ActionConfirmations() {
  return (
    <div className="u-d-flex u-gap-2">
      <Tooltip content="Save your current progress">
        <Button 
          icon={<Icon name="FloppyDisk" />}
          iconOnly
          variant="success"
          aria-label="Save"
        />
      </Tooltip>

      <Tooltip content="Undo the last action">
        <Button 
          icon={<Icon name="ArrowCounterClockwise" />}
          iconOnly
          variant="secondary"
          aria-label="Undo"
        />
      </Tooltip>

      <Tooltip content="Permanently delete this item">
        <Button 
          icon={<Icon name="Trash" />}
          iconOnly
          variant="error"
          aria-label="Delete"
        />
      </Tooltip>
    </div>
  );
}
```

### Data Visualization

```jsx
function DataVisualization() {
  const data = [
    { label: 'Sales', value: 1250, change: '+12%' },
    { label: 'Users', value: 3400, change: '+8%' },
    { label: 'Revenue', value: 8900, change: '-2%' }
  ];

  return (
    <div className="u-d-grid u-grid-cols-3 u-gap-4">
      {data.map((item, index) => (
        <Tooltip
          key={index}
          content={
            <div className="u-gap-1">
              <div className="u-fw-semibold">{item.label}</div>
              <div>Current: {item.value.toLocaleString()}</div>
              <div className={item.change.startsWith('+') ? 'u-text-success' : 'u-text-error'}>
                Change: {item.change}
              </div>
            </div>
          }
          position="top"
        >
          <Card className="u-text-center u-cursor-help">
            <div className="u-fs-2 u-fw-bold">{item.value.toLocaleString()}</div>
            <div className="u-fs-sm u-text-secondary">{item.label}</div>
          </Card>
        </Tooltip>
      ))}
    </div>
  );
}
```

## Related Components

- **Popover** - For more complex interactive content
- **Modal** - For detailed information or forms
- **Dropdown** - For actionable menu items
- **Icon** - Often used as tooltip triggers
- **Button** - Frequently enhanced with tooltips

## Performance Considerations

- Tooltips are lightweight and have minimal performance impact
- Use CSS transitions for smooth animations
- Avoid complex content in tooltips for better performance
- Consider lazy loading for tooltips with rich content

## Browser Support

The Tooltip component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Positioning and animations work across all supported browsers.
