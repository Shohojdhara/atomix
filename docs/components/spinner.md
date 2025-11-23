# Spinner Component

The Spinner component provides loading indicators for various states and operations. It offers multiple animation styles, sizes, and can be used inline or as overlay loading states to communicate ongoing processes to users.

## Overview

Spinners are essential for indicating loading states and ongoing operations. The Atomix Spinner component provides smooth animations, multiple styles, and flexible positioning options while maintaining accessibility and performance.

## Props API

### SpinnerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ThemeColor` | `'primary'` | Color variant |
| `size` | `SpinnerSize` | `'md'` | Spinner size |
| `fullscreen` | `boolean` | `false` | Fullscreen overlay |
| `overlay` | `boolean` | `false` | Overlay on parent |
| `label` | `string` | `undefined` | Accessible label |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Enable glass morphism effect |
| `className` | `string` | `''` | Additional CSS classes |

### Size Options

- `xs` - Extra small (16px)
- `sm` - Small (20px)
- `md` - Medium (24px) - default
- `lg` - Large (32px)
- `xl` - Extra large (48px)

## Usage Examples

### Basic Spinners

```jsx
import React from 'react';
import { Spinner, Button, Card } from '@shohojdhara/atomix';

function BasicSpinners() {
  return (
    <div className="u-gap-6">
      <div className="u-gap-4">
        <h3 className="u-fw-semibold">Color Variants</h3>
        <div className="u-d-flex u-align-items-center u-gap-4">
          <Spinner variant="primary" />
          <Spinner variant="secondary" />
          <Spinner variant="success" />
          <Spinner variant="warning" />
          <Spinner variant="error" />
          <Spinner variant="info" />
        </div>
      </div>

      <div className="u-gap-4">
        <h3 className="u-fw-semibold">Sizes</h3>
        <div className="u-d-flex u-align-items-center u-gap-4">
          <Spinner size="xs" variant="primary" />
          <Spinner size="sm" variant="primary" />
          <Spinner size="md" variant="primary" />
          <Spinner size="lg" variant="primary" />
          <Spinner size="xl" variant="primary" />
        </div>
      </div>
    </div>
  );
}
```

### Loading Buttons

```jsx
function LoadingButtons() {
  const [loading, setLoading] = useState({});

  const handleAction = async (actionId) => {
    setLoading(prev => ({ ...prev, [actionId]: true }));
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(prev => ({ ...prev, [actionId]: false }));
  };

  return (
    <div className="u-d-flex u-flex-wrap u-gap-4">
      <Button 
        label={loading.save ? "Saving..." : "Save"}
        icon={loading.save ? <Spinner size="sm" /> : <Icon name="FloppyDisk" />}
        onClick={() => handleAction('save')}
        disabled={loading.save}
        variant="primary"
      />

      <Button 
        label={loading.delete ? "Deleting..." : "Delete"}
        icon={loading.delete ? <Spinner size="sm" /> : <Icon name="Trash" />}
        onClick={() => handleAction('delete')}
        disabled={loading.delete}
        variant="error"
      />

      <Button 
        label={loading.upload ? "Uploading..." : "Upload"}
        icon={loading.upload ? <Spinner size="sm" /> : <Icon name="Upload" />}
        onClick={() => handleAction('upload')}
        disabled={loading.upload}
        variant="secondary"
      />
    </div>
  );
}
```

### Card Loading States

```jsx
function CardLoadingStates() {
  const [loadingStates, setLoadingStates] = useState({
    users: false,
    analytics: false,
    reports: false
  });

  const loadData = (cardType) => {
    setLoadingStates(prev => ({ ...prev, [cardType]: true }));
    
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [cardType]: false }));
    }, 3000);
  };

  return (
    <div className="u-d-grid u-grid-cols-1 u-md-grid-cols-3 u-gap-4">
      <Card>
        <div className="u-position-relative u-min-h-32">
          {loadingStates.users ? (
            <div className="u-position-absolute u-inset-0 u-d-flex u-align-items-center u-justify-content-center">
              <div className="u-text-center">
                <Spinner variant="primary" size="lg" />
                <div className="u-mt-2 u-fs-sm u-text-secondary">Loading users...</div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="u-fw-semibold u-mb-3">Users</h3>
              <div className="u-fs-2 u-fw-bold">1,234</div>
              <div className="u-fs-sm u-text-secondary">Active users</div>
              <Button
                label="Refresh"
                size="sm"
                variant="link"
                onClick={() => loadData('users')}
                className="u-mt-2"
              />
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="u-position-relative u-min-h-32">
          {loadingStates.analytics ? (
            <div className="u-position-absolute u-inset-0 u-d-flex u-align-items-center u-justify-content-center">
              <Spinner variant="success" size="lg" label="Loading analytics data" />
            </div>
          ) : (
            <div>
              <h3 className="u-fw-semibold u-mb-3">Analytics</h3>
              <div className="u-fs-2 u-fw-bold">5,678</div>
              <div className="u-fs-sm u-text-secondary">Page views</div>
              <Button
                label="Refresh"
                size="sm"
                variant="link"
                onClick={() => loadData('analytics')}
                className="u-mt-2"
              />
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="u-position-relative u-min-h-32">
          {loadingStates.reports ? (
            <div className="u-position-absolute u-inset-0 u-d-flex u-align-items-center u-justify-content-center u-bg-white u-opacity-75">
              <div className="u-text-center">
                <Spinner variant="info" />
                <div className="u-mt-2 u-fs-sm u-text-secondary">Generating report...</div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="u-fw-semibold u-mb-3">Reports</h3>
              <div className="u-fs-2 u-fw-bold">42</div>
              <div className="u-fs-sm u-text-secondary">Generated today</div>
              <Button
                label="Generate"
                size="sm"
                variant="link"
                onClick={() => loadData('reports')}
                className="u-mt-2"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
```

### Fullscreen Loading

```jsx
function FullscreenLoading() {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const simulateFullscreenLoad = () => {
    setShowFullscreen(true);
    
    setTimeout(() => {
      setShowFullscreen(false);
    }, 3000);
  };

  return (
    <div className="u-gap-4">
      <Button 
        label="Show Fullscreen Loading"
        onClick={simulateFullscreenLoad}
        variant="primary"
      />

      {showFullscreen && (
        <Spinner 
          fullscreen 
          variant="primary" 
          size="xl"
          label="Loading application..."
        />
      )}
    </div>
  );
}
```

### Data Loading States

```jsx
function DataLoadingStates() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure
      if (Math.random() > 0.3) {
        setData([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
        ]);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="u-gap-4">
      <div className="u-d-flex u-gap-3">
        <Button 
          label="Fetch Data"
          onClick={fetchData}
          disabled={loading}
          variant="primary"
        />
        <Button 
          label="Clear"
          onClick={() => {
            setData(null);
            setError(null);
          }}
          variant="secondary"
        />
      </div>

      <Card>
        <div className="u-min-h-48">
          {loading ? (
            <div className="u-d-flex u-align-items-center u-justify-content-center u-h-100">
              <div className="u-text-center">
                <Spinner variant="primary" size="lg" />
                <div className="u-mt-3 u-text-secondary">Fetching data...</div>
              </div>
            </div>
          ) : error ? (
            <div className="u-d-flex u-align-items-center u-justify-content-center u-h-100 u-text-center">
              <div>
                <Icon name="Warning" className="u-text-error u-fs-2 u-mb-2" />
                <div className="u-text-error u-fw-medium">Error loading data</div>
                <div className="u-fs-sm u-text-secondary u-mt-1">{error}</div>
              </div>
            </div>
          ) : data ? (
            <div>
              <h3 className="u-fw-semibold u-mb-3">User Data</h3>
              <div className="u-gap-2">
                {data.map(user => (
                  <div key={user.id} className="u-d-flex u-align-items-center u-gap-3 u-p-2 u-border u-rounded">
                    <Avatar initials={user.name.split(' ').map(n => n[0]).join('')} size="sm" circle />
                    <div>
                      <div className="u-fw-medium">{user.name}</div>
                      <div className="u-fs-sm u-text-secondary">{user.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="u-d-flex u-align-items-center u-justify-content-center u-h-100 u-text-secondary">
              No data loaded. Click "Fetch Data" to load.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
```

### Inline Spinners

```jsx
function InlineSpinners() {
  const [inlineLoading, setInlineLoading] = useState({});

  const toggleLoading = (key) => {
    setInlineLoading(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="u-gap-4">
      <div className="u-d-flex u-align-items-center u-gap-2">
        <span>Processing your request</span>
        {inlineLoading.request && <Spinner size="sm" variant="primary" />}
        <Button 
          label={inlineLoading.request ? "Stop" : "Start"}
          size="sm"
          variant="link"
          onClick={() => toggleLoading('request')}
        />
      </div>

      <div className="u-d-flex u-align-items-center u-gap-2">
        <span>Syncing data</span>
        {inlineLoading.sync && <Spinner size="sm" variant="success" />}
        <Button 
          label={inlineLoading.sync ? "Stop" : "Start"}
          size="sm"
          variant="link"
          onClick={() => toggleLoading('sync')}
        />
      </div>

      <div className="u-d-flex u-align-items-center u-gap-2">
        <span>Uploading files</span>
        {inlineLoading.upload && <Spinner size="sm" variant="info" />}
        <Button 
          label={inlineLoading.upload ? "Stop" : "Start"}
          size="sm"
          variant="link"
          onClick={() => toggleLoading('upload')}
        />
      </div>
    </div>
  );
}
```

### Form Submission Loading

```jsx
function FormSubmissionLoading() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitting(false);
    setSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="u-gap-4">
        <h3 className="u-fs-lg u-fw-semibold">Contact Form</h3>
        
        <FormGroup label="Name">
          <Input placeholder="Your name" disabled={submitting} />
        </FormGroup>
        
        <FormGroup label="Email">
          <Input type="email" placeholder="your@email.com" disabled={submitting} />
        </FormGroup>
        
        <FormGroup label="Message">
          <Textarea placeholder="Your message..." rows={4} disabled={submitting} />
        </FormGroup>
        
        <div className="u-d-flex u-align-items-center u-gap-3">
          <Button 
            type="submit"
            label={submitting ? "Submitting..." : "Submit"}
            icon={submitting ? <Spinner size="sm" /> : undefined}
            disabled={submitting}
            variant="primary"
          />
          
          {submitted && (
            <div className="u-d-flex u-align-items-center u-gap-2 u-text-success">
              <Icon name="CheckCircle" />
              <span>Form submitted successfully!</span>
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
```

## Vanilla JavaScript Usage

```javascript
// Basic spinner
const spinner = new Atomix.Spinner('.my-spinner', {
  variant: 'primary',
  size: 'md'
});

// Show/hide spinner
spinner.show();
spinner.hide();

// Fullscreen spinner
const fullscreenSpinner = new Atomix.Spinner(document.body, {
  fullscreen: true,
  variant: 'primary',
  size: 'xl',
  label: 'Loading...'
});

// Overlay spinner
const overlaySpinner = new Atomix.Spinner('.container', {
  overlay: true,
  variant: 'info'
});

// Initialize from data attributes
Atomix.Spinner.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic spinner -->
<div 
  class="c-spinner" 
  data-atomix="spinner"
  data-variant="primary"
  data-size="md">
</div>

<!-- Spinner with label -->
<div 
  class="c-spinner" 
  data-atomix="spinner"
  data-variant="success"
  data-label="Loading data...">
</div>

<!-- Fullscreen spinner -->
<div 
  class="c-spinner c-spinner--fullscreen" 
  data-atomix="spinner"
  data-fullscreen="true"
  data-variant="primary"
  data-size="xl">
</div>
```

## Styling

### CSS Classes

```css
/* Base spinner */
.c-spinner {
  /* Spinner container */
}

.c-spinner__icon {
  /* Spinner animation element */
}

.c-spinner__label {
  /* Spinner label text */
}

/* Size modifiers */
.c-spinner--xs { /* Extra small */ }
.c-spinner--sm { /* Small */ }
.c-spinner--md { /* Medium */ }
.c-spinner--lg { /* Large */ }
.c-spinner--xl { /* Extra large */ }

/* Variant modifiers */
.c-spinner--primary { /* Primary color */ }
.c-spinner--success { /* Success color */ }
.c-spinner--warning { /* Warning color */ }
.c-spinner--error { /* Error color */ }

/* Layout modifiers */
.c-spinner--fullscreen { /* Fullscreen overlay */ }
.c-spinner--overlay { /* Overlay on parent */ }
```

### Custom Styling

```css
/* Custom spinner animation */
.c-spinner--pulse .c-spinner__icon {
  animation: spinnerPulse 1.5s ease-in-out infinite;
}

@keyframes spinnerPulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

/* Gradient spinner */
.c-spinner--gradient .c-spinner__icon {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
}

/* Custom overlay styling */
.c-spinner--overlay {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
}

/* Bouncing dots spinner */
.c-spinner--dots .c-spinner__icon {
  display: flex;
  gap: 0.25rem;
}

.c-spinner--dots .c-spinner__icon::before,
.c-spinner--dots .c-spinner__icon::after {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  background: currentColor;
  border-radius: 50%;
  animation: spinnerBounce 1.4s ease-in-out infinite both;
}

.c-spinner--dots .c-spinner__icon::after {
  animation-delay: 0.16s;
}

@keyframes spinnerBounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
```

## Glass Effect

Spinner supports the glass morphism effect for modern, translucent UI designs.

### Basic Glass Effect

```jsx
function GlassSpinner() {
  return (
    <Spinner 
      variant="primary" 
      glass={true}
      label="Loading..."
    />
  );
}
```

### Custom Glass Configuration

```jsx
function CustomGlassSpinner() {
  return (
    <Spinner 
      variant="primary" 
      size="lg"
      glass={{
        blurAmount: 20,
        saturation: 180,
        cornerRadius: 16,
        displacementScale: 50,
      }}
      label="Processing..."
    />
  );
}
```

### Glass Spinner Overlay

```jsx
function GlassSpinnerOverlay() {
  return (
    <div style={{ position: 'relative', minHeight: '200px' }}>
      <div>Content that will be covered</div>
      <Spinner 
        variant="primary" 
        overlay
        glass={true}
        label="Loading content..."
      />
    </div>
  );
}
```

## Accessibility

### ARIA Attributes

- `role="status"` - Identifies loading status
- `aria-label` - Provides accessible description
- `aria-live="polite"` - Announces status changes
- `aria-hidden="true"` - Hides decorative spinners

### Screen Reader Support

- Loading state is announced to screen readers
- Custom labels are read when provided
- Status changes are communicated
- Decorative spinners are hidden from assistive technology

## Best Practices

### Do's ✅

- Provide meaningful labels for context
- Use appropriate sizes for the container
- Show spinners for operations longer than 1 second
- Use consistent spinner styles throughout the app
- Handle loading states gracefully

```jsx
// Good: Clear context and appropriate sizing
<div className="u-d-flex u-align-items-center u-gap-2">
  <Spinner size="sm" variant="primary" />
  <span>Saving your changes...</span>
</div>
```

### Don'ts ❌

- Don't use spinners for very quick operations
- Don't forget to provide loading context
- Don't use too many different spinner styles
- Don't make spinners too small to see

```jsx
// Bad: No context, unclear purpose
<Spinner />
```

## Common Patterns

### Loading Overlay

```jsx
function LoadingOverlay({ loading, children }) {
  return (
    <div className="u-position-relative">
      {children}
      {loading && (
        <div className="u-position-absolute u-inset-0 u-bg-white u-opacity-75 u-d-flex u-align-items-center u-justify-content-center">
          <Spinner variant="primary" size="lg" />
        </div>
      )}
    </div>
  );
}
```

### Conditional Loading

```jsx
function ConditionalLoading({ loading, error, data, onRetry }) {
  if (loading) {
    return (
      <div className="u-text-center u-py-8">
        <Spinner variant="primary" size="lg" />
        <div className="u-mt-3 u-text-secondary">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="u-text-center u-py-8">
        <Icon name="Warning" className="u-text-error u-fs-2 u-mb-2" />
        <div className="u-text-error u-fw-medium">Error loading data</div>
        <Button label="Retry" onClick={onRetry} className="u-mt-3" />
      </div>
    );
  }

  return <div>{data}</div>;
}
```

### Progressive Loading

```jsx
function ProgressiveLoading() {
  const [stage, setStage] = useState(0);
  
  const stages = [
    'Initializing...',
    'Loading data...',
    'Processing...',
    'Finalizing...'
  ];

  useEffect(() => {
    if (stage < stages.length - 1) {
      const timer = setTimeout(() => setStage(s => s + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="u-text-center u-py-8">
      <Spinner variant="primary" size="lg" />
      <div className="u-mt-3 u-text-secondary">{stages[stage]}</div>
    </div>
  );
}
```

## Related Components

- **Button** - Loading button states
- **Progress** - For determinate loading
- **Modal** - Loading overlays
- **Card** - Loading card states
- **Icon** - Alternative loading indicators

## Performance Considerations

- Use CSS animations for smooth performance
- Avoid too many simultaneous spinners
- Consider using requestAnimationFrame for complex animations
- Optimize spinner SVGs for file size

```jsx
// Optimized spinner with reduced re-renders
const OptimizedSpinner = React.memo(({ variant, size }) => {
  return <Spinner variant={variant} size={size} />;
});
```

## Browser Support

The Spinner component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

All animations work smoothly across supported browsers.
