# Toggle Component

The Toggle component provides a switch-like control for binary states. It's perfect for settings, preferences, and any on/off functionality, offering a more visual alternative to checkboxes with smooth animations and clear state indication.

## Overview

Toggles are intuitive controls that clearly communicate binary states through visual design. The Atomix Toggle component provides smooth animations, multiple sizes, and accessibility features while maintaining consistency with modern interface patterns.

## Props API

### ToggleProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Toggle state |
| `onChange` | `(checked: boolean) => void` | `undefined` | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `Size` | `'md'` | Toggle size |
| `label` | `string` | `undefined` | Toggle label |
| `description` | `string` | `undefined` | Additional description |
| `variant` | `ThemeColor` | `'primary'` | Color variant |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | `undefined` | Toggle ID |

## Usage Examples

### Basic Toggles

```jsx
import React, { useState } from 'react';
import { Toggle, Card } from '@shohojdhara/atomix';

function BasicToggles() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false
  });

  const handleToggle = (key) => (checked) => {
    setSettings(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="u-gap-6">
      <div className="u-gap-4">
        <h3 className="u-font-semibold">Basic Toggles</h3>
        <div className="u-gap-3">
          <Toggle 
            checked={settings.notifications}
            onChange={handleToggle('notifications')}
            label="Enable notifications"
          />
          
          <Toggle 
            checked={settings.darkMode}
            onChange={handleToggle('darkMode')}
            label="Dark mode"
            description="Switch to dark theme"
          />
          
          <Toggle 
            checked={settings.autoSave}
            onChange={handleToggle('autoSave')}
            label="Auto-save documents"
            description="Automatically save changes every 30 seconds"
          />
          
          <Toggle 
            checked={settings.analytics}
            onChange={handleToggle('analytics')}
            label="Share usage analytics"
            description="Help us improve by sharing anonymous usage data"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
```

### Toggle Sizes and Variants

```jsx
function ToggleSizesVariants() {
  const [toggleStates, setToggleStates] = useState({
    small: false,
    medium: true,
    large: false
  });

  const handleToggle = (key) => (checked) => {
    setToggleStates(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="u-gap-6">
      <div className="u-gap-4">
        <h3 className="u-font-semibold">Sizes</h3>
        <div className="u-gap-3">
          <div className="u-flex u-items-center u-gap-3">
            <Toggle 
              size="sm"
              checked={toggleStates.small}
              onChange={handleToggle('small')}
            />
            <span>Small toggle</span>
          </div>
          
          <div className="u-flex u-items-center u-gap-3">
            <Toggle 
              size="md"
              checked={toggleStates.medium}
              onChange={handleToggle('medium')}
            />
            <span>Medium toggle (default)</span>
          </div>
          
          <div className="u-flex u-items-center u-gap-3">
            <Toggle 
              size="lg"
              checked={toggleStates.large}
              onChange={handleToggle('large')}
            />
            <span>Large toggle</span>
          </div>
        </div>
      </div>

      <div className="u-gap-4">
        <h3 className="u-font-semibold">Color Variants</h3>
        <div className="u-grid u-grid-cols-2 u-gap-3">
          <Toggle checked variant="primary" label="Primary" />
          <Toggle checked variant="success" label="Success" />
          <Toggle checked variant="warning" label="Warning" />
          <Toggle checked variant="error" label="Error" />
          <Toggle checked variant="info" label="Info" />
          <Toggle checked variant="secondary" label="Secondary" />
        </div>
      </div>
    </div>
  );
}
```

### Settings Panel

```jsx
function SettingsPanel() {
  const [userSettings, setUserSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    weeklyDigest: true,
    autoBackup: true,
    cloudSync: false,
    offlineMode: false,
    betaFeatures: false
  });

  const handleSettingChange = (key) => (checked) => {
    setUserSettings(prev => ({ ...prev, [key]: checked }));
  };

  const settingsGroups = [
    {
      title: 'Notifications',
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email notifications',
          description: 'Receive notifications via email'
        },
        {
          key: 'pushNotifications',
          label: 'Push notifications',
          description: 'Receive push notifications on your device'
        },
        {
          key: 'smsNotifications',
          label: 'SMS notifications',
          description: 'Receive important updates via SMS'
        },
        {
          key: 'marketingEmails',
          label: 'Marketing emails',
          description: 'Receive promotional content and updates'
        },
        {
          key: 'securityAlerts',
          label: 'Security alerts',
          description: 'Get notified about security-related events'
        }
      ]
    },
    {
      title: 'Data & Sync',
      settings: [
        {
          key: 'autoBackup',
          label: 'Automatic backup',
          description: 'Automatically backup your data daily'
        },
        {
          key: 'cloudSync',
          label: 'Cloud synchronization',
          description: 'Sync data across all your devices'
        },
        {
          key: 'offlineMode',
          label: 'Offline mode',
          description: 'Enable offline functionality'
        }
      ]
    },
    {
      title: 'Advanced',
      settings: [
        {
          key: 'betaFeatures',
          label: 'Beta features',
          description: 'Enable experimental features (may be unstable)'
        }
      ]
    }
  ];

  return (
    <div className="u-mw-100 u-mx-auto u-gap-6">
      <h2 className="u-text-2 u-font-bold">Settings</h2>
      
      {settingsGroups.map((group, groupIndex) => (
        <Card key={groupIndex}>
          <div className="u-gap-4">
            <h3 className="u-text-lg u-font-semibold">{group.title}</h3>
            <div className="u-gap-4">
              {group.settings.map((setting) => (
                <div key={setting.key} className="u-flex u-items-start u-justify-between">
                  <div className="u-flex-grow-1 u-me-4">
                    <div className="u-font-medium">{setting.label}</div>
                    <div className="u-text-sm u-text-secondary u-mt-1">
                      {setting.description}
                    </div>
                  </div>
                  <Toggle 
                    checked={userSettings[setting.key]}
                    onChange={handleSettingChange(setting.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### Feature Toggles

```jsx
function FeatureToggles() {
  const [features, setFeatures] = useState({
    newDashboard: false,
    advancedAnalytics: true,
    aiAssistant: false,
    darkTheme: true,
    experimentalUI: false
  });

  const handleFeatureToggle = (featureKey) => (checked) => {
    setFeatures(prev => ({ ...prev, [featureKey]: checked }));
  };

  const featureList = [
    {
      key: 'newDashboard',
      name: 'New Dashboard',
      description: 'Try our redesigned dashboard with improved navigation',
      badge: 'Beta',
      badgeVariant: 'info'
    },
    {
      key: 'advancedAnalytics',
      name: 'Advanced Analytics',
      description: 'Access detailed analytics and reporting features',
      badge: 'Pro',
      badgeVariant: 'warning'
    },
    {
      key: 'aiAssistant',
      name: 'AI Assistant',
      description: 'Get help from our AI-powered assistant',
      badge: 'New',
      badgeVariant: 'success'
    },
    {
      key: 'darkTheme',
      name: 'Dark Theme',
      description: 'Switch to a dark color scheme'
    },
    {
      key: 'experimentalUI',
      name: 'Experimental UI',
      description: 'Preview upcoming interface changes',
      badge: 'Experimental',
      badgeVariant: 'error'
    }
  ];

  return (
    <Card>
      <div className="u-gap-4">
        <div className="u-flex u-items-center u-justify-between">
          <h3 className="u-text-lg u-font-semibold">Feature Toggles</h3>
          <Badge label={`${Object.values(features).filter(Boolean).length} enabled`} variant="primary" />
        </div>
        
        <div className="u-gap-4">
          {featureList.map((feature) => (
            <div key={feature.key} className="u-flex u-items-start u-justify-between u-p-3 u-border u-rounded">
              <div className="u-flex-grow-1 u-me-4">
                <div className="u-flex u-items-center u-gap-2">
                  <span className="u-font-medium">{feature.name}</span>
                  {feature.badge && (
                    <Badge 
                      label={feature.badge} 
                      variant={feature.badgeVariant}
                      size="sm"
                    />
                  )}
                </div>
                <div className="u-text-sm u-text-secondary u-mt-1">
                  {feature.description}
                </div>
              </div>
              <Toggle 
                checked={features[feature.key]}
                onChange={handleFeatureToggle(feature.key)}
                variant={features[feature.key] ? 'success' : 'secondary'}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
```

### Permission Toggles

```jsx
function PermissionToggles() {
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    location: true,
    notifications: true,
    contacts: false,
    calendar: false,
    photos: true
  });

  const handlePermissionChange = (permission) => (checked) => {
    setPermissions(prev => ({ ...prev, [permission]: checked }));
  };

  const permissionList = [
    {
      key: 'camera',
      name: 'Camera',
      description: 'Allow access to camera for photos and video calls',
      icon: 'Camera',
      sensitive: true
    },
    {
      key: 'microphone',
      name: 'Microphone',
      description: 'Allow access to microphone for voice calls and recordings',
      icon: 'Microphone',
      sensitive: true
    },
    {
      key: 'location',
      name: 'Location',
      description: 'Allow access to your location for location-based features',
      icon: 'MapPin',
      sensitive: true
    },
    {
      key: 'notifications',
      name: 'Notifications',
      description: 'Show notifications for important updates',
      icon: 'Bell',
      sensitive: false
    },
    {
      key: 'contacts',
      name: 'Contacts',
      description: 'Access your contacts to find friends and colleagues',
      icon: 'AddressBook',
      sensitive: true
    },
    {
      key: 'calendar',
      name: 'Calendar',
      description: 'Access your calendar to schedule meetings',
      icon: 'Calendar',
      sensitive: false
    },
    {
      key: 'photos',
      name: 'Photos',
      description: 'Access your photo library to share images',
      icon: 'Image',
      sensitive: true
    }
  ];

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">App Permissions</h3>
          <div className="text-sm text-gray-600">
            {Object.values(permissions).filter(Boolean).length} of {permissionList.length} enabled
          </div>
        </div>
        
        <div className="space-y-3">
          {permissionList.map((permission) => (
            <div key={permission.key} className="flex items-center justify-between p-3 border rounded">
              <div className="u-flex u-items-center u-gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  permissions[permission.key] 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <Icon name={permission.icon} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{permission.name}</span>
                    {permission.sensitive && (
                      <Badge label="Sensitive" variant="warning" size="sm" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {permission.description}
                  </div>
                </div>
              </div>
              <Toggle 
                checked={permissions[permission.key]}
                onChange={handlePermissionChange(permission.key)}
                variant={permissions[permission.key] ? 'success' : 'secondary'}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
```

### Controlled Toggle Group

```jsx
function ControlledToggleGroup() {
  const [masterToggle, setMasterToggle] = useState(false);
  const [childToggles, setChildToggles] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false
  });

  const handleMasterToggle = (checked) => {
    setMasterToggle(checked);
    setChildToggles({
      option1: checked,
      option2: checked,
      option3: checked,
      option4: checked
    });
  };

  const handleChildToggle = (key) => (checked) => {
    const newChildToggles = { ...childToggles, [key]: checked };
    setChildToggles(newChildToggles);
    
    // Update master toggle based on child states
    const allEnabled = Object.values(newChildToggles).every(Boolean);
    const anyEnabled = Object.values(newChildToggles).some(Boolean);
    
    setMasterToggle(allEnabled);
  };

  const allChildrenEnabled = Object.values(childToggles).every(Boolean);
  const someChildrenEnabled = Object.values(childToggles).some(Boolean);

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
          <div>
            <div className="font-semibold">Enable All Features</div>
            <div className="text-sm text-gray-600">
              {allChildrenEnabled ? 'All features enabled' : 
               someChildrenEnabled ? 'Some features enabled' : 'No features enabled'}
            </div>
          </div>
          <Toggle 
            checked={masterToggle}
            onChange={handleMasterToggle}
            variant="primary"
            size="lg"
          />
        </div>
        
        <div className="space-y-3 pl-4">
          <div className="flex items-center justify-between">
            <span>Feature Option 1</span>
            <Toggle 
              checked={childToggles.option1}
              onChange={handleChildToggle('option1')}
              variant="secondary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Feature Option 2</span>
            <Toggle 
              checked={childToggles.option2}
              onChange={handleChildToggle('option2')}
              variant="secondary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Feature Option 3</span>
            <Toggle 
              checked={childToggles.option3}
              onChange={handleChildToggle('option3')}
              variant="secondary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Feature Option 4</span>
            <Toggle 
              checked={childToggles.option4}
              onChange={handleChildToggle('option4')}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
```

## Vanilla JavaScript Usage

```javascript
// Basic toggle
const toggle = new Atomix.Toggle('.my-toggle', {
  checked: false,
  onChange: (checked) => {
    console.log('Toggle changed:', checked);
  }
});

// Toggle with label
const labeledToggle = new Atomix.Toggle('.labeled-toggle', {
  label: 'Enable notifications',
  checked: true,
  variant: 'success'
});

// Get/set toggle state
const isChecked = toggle.isChecked();
toggle.setChecked(true);

// Initialize from data attributes
Atomix.Toggle.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic toggle -->
<div 
  class="c-toggle" 
  data-atomix="toggle"
  data-checked="false"
  data-variant="primary">
  <input type="checkbox" class="c-toggle__input">
  <span class="c-toggle__slider"></span>
</div>

<!-- Toggle with label -->
<label class="c-toggle c-toggle--labeled" data-atomix="toggle">
  <input type="checkbox" class="c-toggle__input" checked>
  <span class="c-toggle__slider"></span>
  <span class="c-toggle__label">Enable notifications</span>
</label>

<!-- Toggle with description -->
<div class="c-toggle-group">
  <label class="c-toggle" data-atomix="toggle">
    <input type="checkbox" class="c-toggle__input">
    <span class="c-toggle__slider"></span>
  </label>
  <div class="c-toggle__content">
    <div class="c-toggle__label">Dark mode</div>
    <div class="c-toggle__description">Switch to dark theme</div>
  </div>
</div>
```

## Styling

### CSS Classes

```css
/* Base toggle */
.c-toggle {
  /* Toggle container */
}

.c-toggle__input {
  /* Hidden checkbox input */
}

.c-toggle__slider {
  /* Toggle slider track */
}

.c-toggle__thumb {
  /* Toggle thumb/handle */
}

.c-toggle__label {
  /* Toggle label text */
}

.c-toggle__description {
  /* Toggle description text */
}

/* Size modifiers */
.c-toggle--sm { /* Small toggle */ }
.c-toggle--md { /* Medium toggle */ }
.c-toggle--lg { /* Large toggle */ }

/* Variant modifiers */
.c-toggle--primary { /* Primary color */ }
.c-toggle--success { /* Success color */ }
.c-toggle--warning { /* Warning color */ }
.c-toggle--error { /* Error color */ }

/* State modifiers */
.c-toggle--checked { /* Checked state */ }
.c-toggle--disabled { /* Disabled state */ }
```

### Custom Styling

```css
/* Custom toggle theme */
.c-toggle--custom {
  --toggle-bg: #e5e7eb;
  --toggle-bg-checked: #3b82f6;
  --toggle-thumb: #ffffff;
  --toggle-thumb-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Animated toggle */
.c-toggle__slider {
  transition: all 0.3s ease;
}

.c-toggle__thumb {
  transition: transform 0.3s ease;
}

.c-toggle--checked .c-toggle__thumb {
  transform: translateX(100%);
}

/* iOS-style toggle */
.c-toggle--ios .c-toggle__slider {
  border-radius: 50px;
  height: 32px;
  width: 52px;
}

.c-toggle--ios .c-toggle__thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin: 2px;
}

/* Material Design toggle */
.c-toggle--material .c-toggle__slider {
  border-radius: 14px;
  height: 14px;
  width: 36px;
}

.c-toggle--material .c-toggle__thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: -3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

## Accessibility

### ARIA Attributes

- `role="switch"` - Identifies toggle as switch
- `aria-checked` - Indicates checked state
- `aria-labelledby` - Links to label element
- `aria-describedby` - Links to description
- `tabindex="0"` - Makes toggle keyboard focusable

### Keyboard Navigation

- **Space** - Toggle the switch
- **Enter** - Toggle the switch
- **Tab** - Move focus to/from toggle

### Screen Reader Support

- Toggle state is announced
- Label and description are read
- State changes are communicated
- Proper switch semantics are used

## Best Practices

### Do's ✅

- Use clear, descriptive labels
- Provide immediate visual feedback
- Group related toggles logically
- Use consistent toggle styles
- Provide descriptions for complex settings

```jsx
// Good: Clear label and helpful description
<Toggle 
  checked={autoSave}
  onChange={setAutoSave}
  label="Auto-save documents"
  description="Automatically save changes every 30 seconds"
/>
```

### Don'ts ❌

- Don't use toggles for actions (use buttons instead)
- Don't make toggles too small to interact with
- Don't use too many different toggle styles
- Don't forget to handle disabled states

```jsx
// Bad: Using toggle for action instead of state
<Toggle label="Save Document" onChange={saveDocument} />

// Good: Use button for actions
<Button label="Save Document" onClick={saveDocument} />
```

## Common Patterns

### Settings Form

```jsx
function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: false,
    darkMode: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <Toggle
            key={key}
            checked={value}
            onChange={(checked) => setSettings(prev => ({ ...prev, [key]: checked }))}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
          />
        ))}
      </div>
      <Button type="submit" label="Save Settings" variant="primary" />
    </form>
  );
}
```

### Feature Flag Management

```jsx
function FeatureFlagManager({ flags, onFlagChange }) {
  return (
    <div className="space-y-3">
      {flags.map(flag => (
        <div key={flag.key} className="flex items-center justify-between p-3 border rounded">
          <div>
            <div className="font-medium">{flag.name}</div>
            <div className="text-sm text-gray-600">{flag.description}</div>
          </div>
          <Toggle
            checked={flag.enabled}
            onChange={(checked) => onFlagChange(flag.key, checked)}
            variant={flag.enabled ? 'success' : 'secondary'}
          />
        </div>
      ))}
    </div>
  );
}
```

## Related Components

- **Checkbox** - Alternative for boolean inputs
- **Radio** - For single selection from groups
- **Button** - For actions vs. state changes
- **FormGroup** - For form organization
- **Badge** - For status indicators

## Performance Considerations

- Use CSS transitions for smooth animations
- Debounce rapid toggle changes if needed
- Consider using React.memo for toggle lists
- Optimize for touch interactions on mobile

```jsx
// Optimized toggle with debounced changes
function DebouncedToggle({ onChange, delay = 300, ...props }) {
  const debouncedOnChange = useMemo(
    () => debounce(onChange, delay),
    [onChange, delay]
  );

  return <Toggle {...props} onChange={debouncedOnChange} />;
}
```

## Browser Support

The Toggle component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

All animations and interactions work across supported browsers.
