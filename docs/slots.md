# Slot System in Atomix

The Atomix library provides a powerful slot system that allows for complete customization of component rendering. This system gives developers full control over how each part of a component is rendered while maintaining the underlying functionality.

## Overview

The slot system allows you to:
- Customize the rendering of individual component parts
- Replace specific elements with your own components
- Inject custom logic at specific points in the component
- Maintain component functionality while changing appearance

## How It Works

Components supporting slots expose a `slots` prop that accepts an object with different slot names. Each slot can receive one of three options:

1. **children**: Static content to render in place of the default
2. **render**: A function that receives slot-specific props and returns JSX
3. **component**: A component type that will receive the slot props

## Slot Priority

The system follows a specific priority order when rendering:

1. `render` function (if provided)
2. `component` (if provided)
3. `children` (if provided)
4. Default/fallback content

## Available Slots

Different components offer different slots. For example, the Button component provides:

- `root`: The outermost element of the button
- `icon`: The icon element within the button
- `label`: The label/text element within the button
- `spinner`: The loading spinner element within the button

## Usage Examples

### Using Render Functions

```jsx
import { Button } from '@atomix/components';

const MyButton = () => (
  <Button
    label="Click me"
    slots={{
      root: {
        render: (props) => (
          <motion.button 
            {...props} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        )
      },
      label: {
        render: (props) => <span className="custom-label">{props.children}</span>
      }
    }}
  />
);
```

### Using Components

```jsx
import { Button } from '@atomix/components';

const CustomButtonWrapper = ({ className, children, ...props }) => (
  <button className={`${className} my-custom-button`} {...props}>
    <div className="button-glow" />
    {children}
  </button>
);

const MyButton = () => (
  <Button
    label="Click me"
    slots={{
      root: { 
        component: CustomButtonWrapper 
      }
    }}
  />
);
```

### Using Children

```jsx
import { Button } from '@atomix/components';

const MyButton = () => (
  <Button
    label="Click me"
    slots={{
      spinner: { 
        children: <div className="my-custom-spinner">Loading...</div>
      }
    }}
  />
);
```

## Slot Props

Each slot provides specific props relevant to its purpose:

### Button Root Slot Props
- `className`: The computed class names for the button
- `style`: The computed styles for the button
- `children`: The button's child elements
- `disabled`: Whether the button is disabled
- `loading`: Whether the button is in a loading state
- `onClick`: The click handler
- `type`: The button type attribute
- `aria-*`: Accessibility attributes

### Button Icon Slot Props
- `className`: The computed class names for the icon
- `style`: The computed styles for the icon
- `children`: The icon element
- `size`: The icon size

### Button Label Slot Props
- `className`: The computed class names for the label
- `style`: The computed styles for the label
- `children`: The label text/elements

### Button Spinner Slot Props
- `className`: The computed class names for the spinner
- `style`: The computed styles for the spinner
- `size`: The spinner size
- `variant`: The spinner variant