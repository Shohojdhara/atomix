# Tabs Component

The Tabs component provides a tabbed interface for organizing content into separate panels. Users can switch between different sections of content while maintaining context and state within each tab.

## Overview

Tabs are essential for organizing related content in a space-efficient manner. The Atomix Tabs component supports various styles, can handle dynamic content loading, and maintains accessibility and keyboard navigation.

## Props API

### TabsProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabsItemProps[]` | **required** | Array of tab item definitions |
| `activeIndex` | `number` | `0` | Currently active tab index |
| `onTabChange` | `(index: number) => void` | `undefined` | Tab change callback |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | `undefined` | Custom style object |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Enable glass morphism effect |

### TabsItemProps Interface

```typescript
interface TabsItemProps {
  label: string;                 // Tab label text
  content: ReactNode;            // Tab panel content
  isActive?: boolean;            // Whether the tab is initially active
  className?: string;            // Additional CSS class for the tab
}
```

## Usage Examples

### Basic Tabs

```jsx
import React from 'react';
import { Tabs } from '@shohojdhara/atomix';

function BasicTabs() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const tabItems = [
    {
      label: 'Overview',
      content: (
        <div className="u-p-4">
          <h3 className="u-fs-lg u-fw-semibold">Project Overview</h3>
          <p>This is the main overview of your project with key metrics and information.</p>
        </div>
      )
    },
    {
      label: 'Analytics',
      content: (
        <div className="u-p-4">
          <h3 className="u-fs-lg u-fw-semibold">Analytics Dashboard</h3>
          <p>Detailed analytics and performance metrics for your application.</p>
        </div>
      )
    },
    {
      label: 'Settings',
      content: (
        <div className="u-p-4">
          <h3 className="u-fs-lg u-fw-semibold">Project Settings</h3>
          <p>Configure your project settings here.</p>
        </div>
      )
    }
  ];

  return (
    <Tabs 
      items={tabItems}
      activeIndex={activeIndex}
      onTabChange={setActiveIndex}
    />
  );
}
```

### Tabs with Initial Active Tab

```jsx
function TabsWithActiveTab() {
  const tabItems = [
    {
      label: 'Tab 1',
      content: <p>This is the content for Tab 1. Default tab content.</p>
    },
    {
      label: 'Tab 2',
      isActive: true,  // This tab will be active initially
      content: <p>This is the content for Tab 2. It's initially active.</p>
    },
    {
      label: 'Tab 3',
      content: <p>This is the content for Tab 3. Another unique content section.</p>
    }
  ];

  return (
    <Tabs 
      items={tabItems}
      activeIndex={1}  // Or use activeIndex prop
    />
  );
}
```

### Controlled Tabs

```jsx
function ControlledTabs() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    console.log(`Switched to tab ${index}`);
  };

  const tabItems = [
    {
      label: 'Home',
      content: <div className="u-p-4">Home content</div>
    },
    {
      label: 'About',
      content: <div className="u-p-4">About content</div>
    },
    {
      label: 'Contact',
      content: <div className="u-p-4">Contact content</div>
    }
  ];

  return (
    <Tabs 
      items={tabItems}
      activeIndex={activeIndex}
      onTabChange={handleTabChange}
    />
  );
}
```

### Glass Effect Tabs

```jsx
function GlassTabs() {
  const tabItems = [
    {
      label: 'Glass Tab 1',
      content: <p>This is the content for Glass Tab 1 with glass morphism effect.</p>
    },
    {
      label: 'Glass Tab 2',
      content: <p>This is the content for Glass Tab 2 with glass morphism effect.</p>
    },
    {
      label: 'Glass Tab 3',
      content: <p>This is the content for Glass Tab 3 with glass morphism effect.</p>
    }
  ];

  return (
    <Tabs 
      items={tabItems}
      glass={true}
    />
  );
}
```

### Custom Glass Configuration

```jsx
function CustomGlassTabs() {
  const tabItems = [
    {
      label: 'Custom Glass Tab 1',
      content: <p>Content with custom glass settings.</p>
    },
    {
      label: 'Custom Glass Tab 2',
      content: <p>More content with custom glass settings.</p>
    },
    {
      label: 'Custom Glass Tab 3',
      content: <p>Even more content with custom glass settings.</p>
    }
  ];

  return (
    <Tabs 
      items={tabItems}
      glass={{
        displacementScale: 80,
        blurAmount: 1.5,
        saturation: 180,
        cornerRadius: 12,
        mode: 'shader',
      }}
    />
  );
}
```

### Dynamic Tabs

```jsx
function DynamicTabs() {
  const [tabItems, setTabItems] = React.useState([
    {
      label: 'Tab 1',
      content: <div className="u-p-4">Content for Tab 1</div>
    }
  ]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [tabCounter, setTabCounter] = React.useState(1);

  const addTab = () => {
    const newTab = {
      label: `Tab ${tabCounter + 1}`,
      content: (
        <div className="u-p-4">
          <h3>Content for Tab {tabCounter + 1}</h3>
          <p>This is dynamically generated content.</p>
        </div>
      )
    };
    
    setTabItems(prev => [...prev, newTab]);
    setTabCounter(prev => prev + 1);
    setActiveIndex(tabItems.length);
  };

  const removeTab = (index: number) => {
    setTabItems(prev => {
      const newTabs = prev.filter((_, i) => i !== index);
      if (activeIndex >= newTabs.length) {
        setActiveIndex(newTabs.length - 1);
      }
      return newTabs;
    });
  };

  return (
    <div className="u-gap-4">
      <div className="u-d-flex u-justify-content-between u-align-items-center">
        <h3 className="u-fs-lg u-fw-semibold">Dynamic Tabs</h3>
        <Button 
          label="Add Tab"
          variant="primary"
          onClick={addTab}
        />
      </div>
      
      <Tabs 
        items={tabItems}
        activeIndex={activeIndex}
        onTabChange={setActiveIndex}
      />
    </div>
  );
}
```

## Styling

### CSS Classes

The component uses BEM methodology:

```css
/* Base tabs container */
.c-tabs { }

/* Tab navigation */
.c-tabs__nav { }
.c-tabs__nav-item { }
.c-tabs__nav-btn { }
.c-tabs__nav-btn.is-active { }

/* Tab panels */
.c-tabs__panels { }
.c-tabs__panel { }
.c-tabs__panel.is-active { }
.c-tabs__panel-body { }
```

### Custom Styling

```css
/* Custom tab theme */
.c-tabs__nav-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.c-tabs__nav-btn.is-active {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Animated tab transitions */
.c-tabs__panel {
  transition: height 0.3s ease, opacity 0.3s ease;
}
```

## Accessibility

### ARIA Attributes

- `role="tablist"` - Identifies tab navigation (on `<ul>`)
- `role="tab"` - Identifies individual tabs
- `role="tabpanel"` - Identifies tab content panels
- `aria-selected` - Indicates active tab
- `aria-controls` - Links tab to its panel
- `aria-labelledby` - Links panel to its tab

### Keyboard Navigation

- **Tab** - Move focus between tabs
- **Arrow keys** - Navigate between tabs (left/right for horizontal, up/down for vertical)
- **Enter/Space** - Activate focused tab
- **Home/End** - Jump to first/last tab

### Screen Reader Support

- Tab structure is properly announced
- Active tab state is communicated
- Panel content is associated with tabs
- Tab navigation is keyboard accessible

## Best Practices

### Do's ✅

- Use clear, descriptive tab labels
- Keep tab content related and organized
- Provide visual feedback for active states
- Handle loading states for dynamic content
- Use consistent tab ordering

```jsx
// Good: Clear, organized tabs
<Tabs 
  items={[
    { label: 'Overview', content: <Overview /> },
    { label: 'Details', content: <Details /> },
    { label: 'Settings', content: <Settings /> }
  ]}
  activeIndex={activeIndex}
  onTabChange={setActiveIndex}
/>
```

### Don'ts ❌

- Don't use too many tabs in one interface
- Don't put unrelated content in tabs
- Don't forget to handle empty states
- Don't make tab labels too long

```jsx
// Bad: Too many tabs, unclear organization
<Tabs 
  items={[
    { label: 'Very Long Tab Label That Takes Too Much Space', content: <Content1 /> },
    { label: 'Another Long Label', content: <Content2 /> },
    // ... 10 more tabs
  ]}
/>
```

## Common Patterns

### Settings Interface

```jsx
function SettingsInterface() {
  const settingsTabs = [
    {
      label: 'General',
      content: <GeneralSettings />
    },
    {
      label: 'Security',
      content: <SecuritySettings />
    },
    {
      label: 'Notifications',
      content: <NotificationSettings />
    }
  ];

  return (
    <Card>
      <Tabs 
        items={settingsTabs}
      />
    </Card>
  );
}
```

### Product Details

```jsx
function ProductDetails({ product }) {
  const productTabs = [
    {
      label: 'Description',
      content: <ProductDescription product={product} />
    },
    {
      label: 'Specifications',
      content: <ProductSpecs product={product} />
    },
    {
      label: 'Reviews',
      content: <ProductReviews product={product} />
    }
  ];

  return (
    <Tabs 
      items={productTabs}
    />
  );
}
```

## Performance Considerations

- Use lazy loading for heavy tab content
- Implement proper cleanup for tab components
- Consider virtualization for many tabs
- Optimize tab switching animations

```jsx
// Lazy loading tab content
const LazyTabContent = React.lazy(() => import('./TabContent'));

function OptimizedTabs() {
  const tabItems = [
    {
      label: 'Heavy Content',
      content: (
        <React.Suspense fallback={<Spinner />}>
          <LazyTabContent />
        </React.Suspense>
      )
    }
  ];

  return <Tabs items={tabItems} />;
}
```

## Browser Support

The Tabs component supports all modern browsers:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

All features including keyboard navigation work across supported browsers.

## Related Components

- **[Button](./button.md)** - Can be used for tab-like navigation
- **[Badge](./badge.md)** - Can be used to show notifications on tabs
- **[Icon](./icon.md)** - Can be used in tab labels
- **[Card](./card.md)** - Can be used as tab content containers
- **[Accordion](./accordion.md)** - Alternative content organization

## Migration Guide

### From Tab to Tabs

If you were using an older version with `Tab` component:

**Before:**
```jsx
import { Tab } from '@shohojdhara/atomix';

<Tab 
  tabs={tabItems}
  activeTab={activeTab}
  onTabChange={handleChange}
/>
```

**After:**
```jsx
import { Tabs } from '@shohojdhara/atomix';

<Tabs 
  items={tabItems}
  activeIndex={activeIndex}
  onTabChange={handleChange}
/>
```

**Key Changes:**
- Component name: `Tab` → `Tabs`
- Prop name: `tabs` → `items`
- Prop name: `activeTab` → `activeIndex`
- Callback parameter: `tabId` → `index` (number)

