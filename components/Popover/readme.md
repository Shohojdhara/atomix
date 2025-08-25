# Popover Component

The Popover component displays floating content next to a trigger element. It's fully implemented with both React and vanilla JavaScript support, following the Atomix design system standards.

## Features

- Separate trigger and content components with a context-based system
- Support for both click and hover interactions
- Five positioning options (top, bottom, left, right, auto) with intelligent positioning
- Automatic repositioning based on available space
- Fully accessible with proper ARIA attributes
- Both controlled and uncontrolled usage modes
- Simple API for customization
- Automatic handling of window resize and scrolling
- Vanilla JS implementation for non-React projects

## React Usage

### Basic usage:

```jsx
import { Popover, PopoverTrigger } from './components/Popover';

<Popover content={<div>Popover content</div>} position="top">
  <PopoverTrigger>
    <button className="c-btn">Open Popover</button>
  </PopoverTrigger>
</Popover>
```

### Controlled usage:

```jsx
const [isOpen, setIsOpen] = useState(false);

<Popover 
  content={<div>Controlled popover</div>}
  isOpen={isOpen}
  onOpenChange={setIsOpen}
>
  <PopoverTrigger>
    <button className="c-btn">Toggle Popover</button>
  </PopoverTrigger>
</Popover>
```

### Auto-position usage:

```jsx
<Popover 
  content={<div>This popover will position itself optimally</div>}
  position="auto"
>
  <PopoverTrigger>
    <button className="c-btn">Auto-positioning Popover</button>
  </PopoverTrigger>
</Popover>
```

## Vanilla JavaScript Usage

The Popover component can also be used with HTML and vanilla JavaScript:

```html
<!-- Popover trigger -->
<button data-popover-id="my-popover" data-popover-trigger="click">
  Open Popover
</button>

<!-- Popover content -->
<div id="my-popover" class="js-atomix-popover" data-popover-position="auto">
  <div class="c-popover__content">
    <div class="c-popover__content-inner">
      Popover content goes here
    </div>
  </div>
</div>
```

### JavaScript Initialization:

The popovers are automatically initialized on page load, but you can also initialize them manually:

```js
import { initPopovers } from './components/Popover/scripts';

// Initialize all popovers
initPopovers();

// Or create a specific popover instance
import Popover from './components/Popover/scripts';

const element = document.getElementById('my-popover');
const popover = new Popover(element, {
  position: 'auto',
  trigger: 'click',
  offset: 12,
  delay: 0
});

// Control programmatically
popover.open();
popover.close();
popover.toggle();
popover.destroy(); // Clean up event listeners
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| position | 'top', 'bottom', 'left', 'right', 'auto' | 'top' | The position of the popover relative to the trigger |
| trigger | 'click', 'hover' | 'click' | How the popover is triggered |
| offset | number | 12 | Offset from the trigger element (in pixels) |
| delay | number | 0 | Delay before showing the popover (in milliseconds) |
| defaultOpen | boolean | false | Whether the popover should be open initially (React only) |
| isOpen | boolean | undefined | Controlled state of the popover (React only) |
| onOpenChange | function | undefined | Callback when the popover open state changes (React only) |
| closeOnClickOutside | boolean | true | Whether to close the popover when clicking outside (React only) |
| closeOnEscape | boolean | true | Whether to close the popover when pressing escape key (React only) |
