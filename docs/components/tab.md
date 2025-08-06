# Tab Component

The Tab component provides a tabbed interface for organizing content into separate panels. Users can switch between different sections of content while maintaining context and state within each tab.

## Overview

Tabs are essential for organizing related content in a space-efficient manner. The Atomix Tab component supports various orientations, styles, and can handle dynamic content loading while maintaining accessibility and keyboard navigation.

## Props API

### TabProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | **required** | Array of tab definitions |
| `activeTab` | `string \| number` | `0` | Currently active tab |
| `onTabChange` | `(tabId: string \| number) => void` | `undefined` | Tab change callback |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab orientation |
| `variant` | `'default' \| 'pills' \| 'underline'` | `'default'` | Tab style variant |
| `size` | `Size` | `'md'` | Tab size |
| `disabled` | `boolean` | `false` | Disable all tabs |
| `className` | `string` | `''` | Additional CSS classes |

### TabItem Interface

```typescript
interface TabItem {
  id: string | number;           // Unique tab identifier
  label: string;                 // Tab label text
  content: ReactNode;            // Tab panel content
  icon?: ReactNode;              // Optional tab icon
  disabled?: boolean;            // Disable specific tab
  badge?: string | number;       // Badge content
}
```

## Usage Examples

### Basic Tabs

```jsx
import React, { useState } from 'react';
import { Tab, Card, Button } from '@shohojdhara/atomix';

function BasicTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="u-gap-4">
          <h3 className="u-fs-lg u-fw-semibold">Project Overview</h3>
          <p>This is the main overview of your project with key metrics and information.</p>
          <div className="u-d-grid u-grid-cols-3 u-gap-4">
            <Card>
              <div className="u-text-center">
                <div className="u-fs-2 u-fw-bold">1,234</div>
                <div className="u-fs-sm u-text-secondary">Total Users</div>
              </div>
            </Card>
            <Card>
              <div className="u-text-center">
                <div className="u-fs-2 u-fw-bold">5,678</div>
                <div className="u-fs-sm u-text-secondary">Page Views</div>
              </div>
            </Card>
            <Card>
              <div className="u-text-center">
                <div className="u-fs-2 u-fw-bold">98.5%</div>
                <div className="u-fs-sm u-text-secondary">Uptime</div>
              </div>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      content: (
        <div className="u-gap-4">
          <h3 className="u-fs-lg u-fw-semibold">Analytics Dashboard</h3>
          <p>Detailed analytics and performance metrics for your application.</p>
          <div className="u-h-64 u-bg-light u-rounded u-d-flex u-align-items-center u-justify-content-center">
            <span className="u-text-secondary">Chart placeholder</span>
          </div>
        </div>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      content: (
        <div className="u-gap-4">
          <h3 className="u-fs-lg u-fw-semibold">Project Settings</h3>
          <div className="u-gap-4">
            <FormGroup label="Project Name">
              <Input placeholder="Enter project name" />
            </FormGroup>
            <FormGroup label="Description">
              <Textarea placeholder="Project description" rows={3} />
            </FormGroup>
            <Button label="Save Changes" variant="primary" />
          </div>
        </div>
      )
    }
  ];

  return (
    <Tab 
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}
```

### Tabs with Icons and Badges

```jsx
function IconBadgeTabs() {
  const [activeTab, setActiveTab] = useState('messages');

  const tabs = [
    {
      id: 'messages',
      label: 'Messages',
      icon: <Icon name="ChatCircle" />,
      badge: 5,
      content: (
        <div className="u-gap-3">
          <h3 className="u-fw-semibold">Recent Messages</h3>
          <div className="u-gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="u-d-flex u-align-items-center u-gap-3 u-p-3 u-border u-rounded">
                <Avatar src={`/user-${i}.jpg`} size="sm" circle />
                <div className="u-flex-grow-1">
                  <div className="u-fw-medium">User {i}</div>
                  <div className="u-fs-sm u-text-secondary">Message content...</div>
                </div>
                <Badge label="New" variant="primary" size="sm" />
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Icon name="Bell" />,
      badge: 12,
      content: (
        <div className="u-gap-3">
          <h3 className="u-fw-semibold">Notifications</h3>
          <div className="u-gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="u-d-flex u-align-items-start u-gap-3 u-p-3 u-border u-rounded">
                <Icon name="Info" className="u-text-info u-mt-1" />
                <div className="u-flex-grow-1">
                  <div className="u-fw-medium">System Update</div>
                  <div className="u-fs-sm u-text-secondary">
                    New features have been added to your dashboard.
                  </div>
                  <div className="u-fs-xs u-text-secondary u-mt-1">2 hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: <Icon name="CheckSquare" />,
      badge: 3,
      content: (
        <div className="u-gap-3">
          <h3 className="u-fw-semibold">Pending Tasks</h3>
          <div className="u-gap-2">
            {['Review pull request', 'Update documentation', 'Fix bug in login'].map((task, i) => (
              <div key={i} className="u-d-flex u-align-items-center u-gap-3 u-p-3 u-border u-rounded">
                <Checkbox />
                <span className="u-flex-grow-1">{task}</span>
                <Badge label="High" variant="error" size="sm" />
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <Tab 
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      variant="pills"
    />
  );
}
```

### Vertical Tabs

```jsx
function VerticalTabs() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <Icon name="User" />,
      content: (
        <div className="u-gap-4">
          <h3 className="u-fs-lg u-fw-semibold">Profile Settings</h3>
          <div className="u-d-grid u-grid-cols-1 u-md-grid-cols-2 u-gap-4">
            <FormGroup label="First Name">
              <Input placeholder="John" />
            </FormGroup>
            <FormGroup label="Last Name">
              <Input placeholder="Doe" />
            </FormGroup>
            <FormGroup label="Email">
              <Input type="email" placeholder="john@example.com" />
            </FormGroup>
            <FormGroup label="Phone">
              <Input type="tel" placeholder="+1 (555) 123-4567" />
            </FormGroup>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Icon name="Shield" />,
      content: (
        <div className="u-gap-4">
          <h3 className="u-fs-lg u-fw-semibold">Security Settings</h3>
          <div className="u-gap-4">
            <div className="u-d-flex u-justify-content-between u-align-items-center u-p-3 u-border u-rounded">
              <div>
                <div className="u-fw-medium">Two-factor authentication</div>
                <div className="u-fs-sm u-text-secondary">Add an extra layer of security</div>
              </div>
              <Toggle checked />
            </div>
            <div className="u-d-flex u-justify-content-between u-align-items-center u-p-3 u-border u-rounded">
              <div>
                <div className="u-fw-medium">Login notifications</div>
                <div className="u-fs-sm u-text-secondary">Get notified of new logins</div>
              </div>
              <Toggle />
            </div>
            <Button label="Change Password" variant="outline-primary" />
          </div>
        </div>
      )
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: <Icon name="CreditCard" />,
      content: (
        <div className="u-gap-4">
          <h3 className="u-fs-lg u-fw-semibold">Billing Information</h3>
          <Card>
            <div className="u-gap-3">
              <div className="u-d-flex u-justify-content-between">
                <span>Current Plan</span>
                <span className="u-fw-semibold">Pro Plan</span>
              </div>
              <div className="u-d-flex u-justify-content-between">
                <span>Monthly Cost</span>
                <span className="u-fw-semibold">$29/month</span>
              </div>
              <div className="u-d-flex u-justify-content-between">
                <span>Next Billing</span>
                <span>March 15, 2024</span>
              </div>
            </div>
          </Card>
          <Button label="Manage Subscription" variant="primary" />
        </div>
      )
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <Icon name="Gear" />,
      content: (
        <div className="u-gap-4">
          <h3 className="u-fs-lg u-fw-semibold">Preferences</h3>
          <div className="u-gap-4">
            <FormGroup label="Language">
              <Select 
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' }
                ]}
                value="en"
              />
            </FormGroup>
            <FormGroup label="Timezone">
              <Select 
                options={[
                  { value: 'utc', label: 'UTC' },
                  { value: 'est', label: 'Eastern Time' },
                  { value: 'pst', label: 'Pacific Time' }
                ]}
                value="est"
              />
            </FormGroup>
            <div className="u-gap-2">
              <Checkbox label="Email notifications" checked />
              <Checkbox label="Push notifications" />
              <Checkbox label="SMS notifications" />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="u-mw-100 u-mx-auto">
      <Tab 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        orientation="vertical"
      />
    </div>
  );
}
```

### Dynamic Tabs

```jsx
function DynamicTabs() {
  const [tabs, setTabs] = useState([
    {
      id: 'tab-1',
      label: 'Tab 1',
      content: <div className="u-p-4">Content for Tab 1</div>
    }
  ]);
  const [activeTab, setActiveTab] = useState('tab-1');
  const [tabCounter, setTabCounter] = useState(1);

  const addTab = () => {
    const newTabId = `tab-${tabCounter + 1}`;
    const newTab = {
      id: newTabId,
      label: `Tab ${tabCounter + 1}`,
      content: (
        <div className="u-p-4">
          <h3>Content for Tab {tabCounter + 1}</h3>
          <p>This is dynamically generated content.</p>
          <Button 
            label="Remove This Tab"
            variant="error"
            onClick={() => removeTab(newTabId)}
          />
        </div>
      )
    };
    
    setTabs(prev => [...prev, newTab]);
    setTabCounter(prev => prev + 1);
    setActiveTab(newTabId);
  };

  const removeTab = (tabId) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId);
      if (activeTab === tabId && newTabs.length > 0) {
        setActiveTab(newTabs[0].id);
      }
      return newTabs;
    });
  };

  // Add close button to each tab
  const tabsWithClose = tabs.map(tab => ({
    ...tab,
    label: (
      <div className="u-d-flex u-align-items-center u-gap-2">
        <span>{tab.label}</span>
        {tabs.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeTab(tab.id);
            }}
            className="u-text-secondary u-hover-text-dark"
          >
            <Icon name="X" size="sm" />
          </button>
        )}
      </div>
    )
  }));

  return (
    <div className="u-gap-4">
      <div className="u-d-flex u-justify-content-between u-align-items-center">
        <h3 className="u-fs-lg u-fw-semibold">Dynamic Tabs</h3>
        <Button 
          label="Add Tab"
          icon={<Icon name="Plus" />}
          variant="primary"
          onClick={addTab}
        />
      </div>
      
      <Tab 
        tabs={tabsWithClose}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="underline"
      />
    </div>
  );
}
```

### Lazy Loading Tabs

```jsx
function LazyLoadingTabs() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loadedTabs, setLoadedTabs] = useState(new Set(['dashboard']));

  const loadTabContent = (tabId) => {
    if (!loadedTabs.has(tabId)) {
      setLoadedTabs(prev => new Set([...prev, tabId]));
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    loadTabContent(tabId);
  };

  const LazyContent = ({ tabId, children }) => {
    if (!loadedTabs.has(tabId)) {
      return (
        <div className="u-d-flex u-align-items-center u-justify-content-center u-h-32">
          <Spinner size="lg" />
        </div>
      );
    }
    return children;
  };

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      content: (
        <LazyContent tabId="dashboard">
          <div className="u-gap-4">
            <h3 className="u-fs-lg u-fw-semibold">Dashboard</h3>
            <p>Welcome to your dashboard! This content loads immediately.</p>
          </div>
        </LazyContent>
      )
    },
    {
      id: 'reports',
      label: 'Reports',
      content: (
        <LazyContent tabId="reports">
          <div className="u-gap-4">
            <h3 className="u-fs-lg u-fw-semibold">Reports</h3>
            <p>This content was loaded when you first clicked this tab.</p>
            <div className="u-d-grid u-grid-cols-2 u-gap-4">
              <Card>
                <div className="u-text-center">
                  <div className="u-fs-xl u-fw-bold">$12,345</div>
                  <div className="u-fs-sm u-text-secondary">Revenue</div>
                </div>
              </Card>
              <Card>
                <div className="u-text-center">
                  <div className="u-fs-xl u-fw-bold">1,234</div>
                  <div className="u-fs-sm u-text-secondary">Orders</div>
                </div>
              </Card>
            </div>
          </div>
        </LazyContent>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      content: (
        <LazyContent tabId="analytics">
          <div className="u-gap-4">
            <h3 className="u-fs-lg u-fw-semibold">Analytics</h3>
            <p>Heavy analytics content loaded on demand.</p>
            <div className="u-h-64 u-bg-light u-rounded u-d-flex u-align-items-center u-justify-content-center">
              <span className="u-text-secondary">Complex chart would be here</span>
            </div>
          </div>
        </LazyContent>
      )
    }
  ];

  return (
    <Tab 
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      variant="pills"
    />
  );
}
```

## Vanilla JavaScript Usage

```javascript
// Basic tabs
const tabs = new Atomix.Tab('.my-tabs', {
  tabs: [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' }
  ],
  activeTab: 'tab1',
  onTabChange: (tabId) => {
    console.log('Tab changed to:', tabId);
  }
});

// Change active tab programmatically
tabs.setActiveTab('tab2');

// Add new tab
tabs.addTab({
  id: 'tab3',
  label: 'Tab 3',
  content: 'Content 3'
});

// Remove tab
tabs.removeTab('tab2');

// Initialize from data attributes
Atomix.Tab.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Tab container -->
<div class="c-tab" data-atomix="tab" data-variant="default">
  <!-- Tab navigation -->
  <div class="c-tab__nav">
    <button class="c-tab__button c-tab__button--active" data-tab="tab1">
      Tab 1
    </button>
    <button class="c-tab__button" data-tab="tab2">
      Tab 2
    </button>
    <button class="c-tab__button" data-tab="tab3">
      Tab 3
    </button>
  </div>
  
  <!-- Tab panels -->
  <div class="c-tab__panels">
    <div class="c-tab__panel c-tab__panel--active" data-panel="tab1">
      <p>Content for Tab 1</p>
    </div>
    <div class="c-tab__panel" data-panel="tab2">
      <p>Content for Tab 2</p>
    </div>
    <div class="c-tab__panel" data-panel="tab3">
      <p>Content for Tab 3</p>
    </div>
  </div>
</div>
```

## Styling

### CSS Classes

```css
/* Base tab */
.c-tab {
  /* Tab container */
}

/* Tab navigation */
.c-tab__nav {
  /* Tab button container */
}

.c-tab__button {
  /* Tab button */
}

.c-tab__button--active {
  /* Active tab button */
}

.c-tab__button--disabled {
  /* Disabled tab button */
}

/* Tab panels */
.c-tab__panels {
  /* Panel container */
}

.c-tab__panel {
  /* Tab panel */
}

.c-tab__panel--active {
  /* Active panel */
}

/* Variants */
.c-tab--pills { /* Pills variant */ }
.c-tab--underline { /* Underline variant */ }
.c-tab--vertical { /* Vertical orientation */ }

/* Sizes */
.c-tab--sm { /* Small tabs */ }
.c-tab--md { /* Medium tabs */ }
.c-tab--lg { /* Large tabs */ }
```

### Custom Styling

```css
/* Custom tab theme */
.c-tab--custom .c-tab__button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.c-tab--custom .c-tab__button--active {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Animated tab transitions */
.c-tab__panel {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.c-tab__panel--active {
  opacity: 1;
  transform: translateY(0);
}

/* Custom badge styling */
.c-tab__badge {
  background-color: var(--color-error);
  color: white;
  border-radius: 50%;
  padding: 0.125rem 0.375rem;
  font-size: 0.75rem;
  margin-left: 0.5rem;
}
```

## Accessibility

### ARIA Attributes

- `role="tablist"` - Identifies tab navigation
- `role="tab"` - Identifies individual tabs
- `role="tabpanel"` - Identifies tab content panels
- `aria-selected` - Indicates active tab
- `aria-controls` - Links tab to its panel
- `aria-labelledby` - Links panel to its tab

### Keyboard Navigation

- **Tab** - Move focus between tabs
- **Arrow keys** - Navigate between tabs
- **Enter/Space** - Activate focused tab
- **Home/End** - Jump to first/last tab

### Screen Reader Support

- Tab structure is properly announced
- Active tab state is communicated
- Panel content is associated with tabs
- Disabled tabs are identified

## Best Practices

### Do's ✅

- Use clear, descriptive tab labels
- Keep tab content related and organized
- Provide visual feedback for active states
- Handle loading states for dynamic content
- Use consistent tab ordering

```jsx
// Good: Clear, organized tabs
<Tab 
  tabs={[
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'details', label: 'Details', content: <Details /> },
    { id: 'settings', label: 'Settings', content: <Settings /> }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### Don'ts ❌

- Don't use too many tabs in one interface
- Don't put unrelated content in tabs
- Don't forget to handle empty states
- Don't make tab labels too long

```jsx
// Bad: Too many tabs, unclear organization
<Tab 
  tabs={[
    { id: 'tab1', label: 'Very Long Tab Label That Takes Too Much Space', content: <Content1 /> },
    { id: 'tab2', label: 'Another Long Label', content: <Content2 /> },
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
      id: 'general',
      label: 'General',
      icon: <Icon name="Gear" />,
      content: <GeneralSettings />
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Icon name="Shield" />,
      content: <SecuritySettings />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Icon name="Bell" />,
      badge: hasUnreadNotifications ? '!' : undefined,
      content: <NotificationSettings />
    }
  ];

  return (
    <Card>
      <Tab 
        tabs={settingsTabs}
        orientation="vertical"
        variant="pills"
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
      id: 'description',
      label: 'Description',
      content: <ProductDescription product={product} />
    },
    {
      id: 'specifications',
      label: 'Specifications',
      content: <ProductSpecs product={product} />
    },
    {
      id: 'reviews',
      label: 'Reviews',
      badge: product.reviewCount,
      content: <ProductReviews product={product} />
    }
  ];

  return (
    <Tab 
      tabs={productTabs}
      variant="underline"
    />
  );
}
```

## Related Components

- **Button** - Tab navigation buttons
- **Badge** - Tab notification badges
- **Icon** - Tab icons
- **Card** - Tab content containers
- **Accordion** - Alternative content organization

## Performance Considerations

- Use lazy loading for heavy tab content
- Implement proper cleanup for tab components
- Consider virtualization for many tabs
- Optimize tab switching animations

```jsx
// Lazy loading tab content
const LazyTabContent = React.lazy(() => import('./TabContent'));

function OptimizedTab() {
  return (
    <Tab 
      tabs={[
        {
          id: 'heavy',
          label: 'Heavy Content',
          content: (
            <Suspense fallback={<Spinner />}>
              <LazyTabContent />
            </Suspense>
          )
        }
      ]}
    />
  );
}
```

## Browser Support

The Tab component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

All features including keyboard navigation work across supported browsers.
