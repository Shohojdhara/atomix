# Progress Component

The Progress component provides visual feedback for ongoing processes, loading states, and completion status. It supports various styles, animations, and can display both determinate and indeterminate progress states.

## Overview

Progress indicators are essential for communicating system status and keeping users informed during operations. The Atomix Progress component offers flexible styling, smooth animations, and accessibility features for creating engaging progress experiences.

## Props API

### ProgressProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | **required** | Progress value (0-100) |
| `max` | `number` | `100` | Maximum value |
| `variant` | `ThemeColor` | `'primary'` | Color variant |
| `size` | `Size` | `'md'` | Progress bar size |
| `indeterminate` | `boolean` | `false` | Indeterminate/loading state |
| `striped` | `boolean` | `false` | Striped pattern |
| `animated` | `boolean` | `false` | Animated stripes |
| `showLabel` | `boolean` | `false` | Show percentage label |
| `label` | `string` | `undefined` | Custom label text |
| `className` | `string` | `''` | Additional CSS classes |

## Usage Examples

### Basic Progress Bars

```jsx
import React, { useState, useEffect } from 'react';
import { Progress, Button, Card } from '@shohojdhara/atomix';

function BasicProgress() {
  const [progress, setProgress] = useState(0);

  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="u-gap-6">
      <div className="u-gap-4">
        <h3 className="u-fw-semibold">Color Variants</h3>
        <Progress value={25} variant="primary" showLabel />
        <Progress value={50} variant="success" showLabel />
        <Progress value={75} variant="warning" showLabel />
        <Progress value={90} variant="error" showLabel />
        <Progress value={60} variant="info" showLabel />
      </div>

      <div className="u-gap-4">
        <h3 className="u-fw-semibold">Animated Progress</h3>
        <Progress value={progress} variant="primary" showLabel />
        <Button 
          label="Start Progress" 
          onClick={startProgress}
          variant="primary"
        />
      </div>
    </div>
  );
}
```

### Progress Sizes

```jsx
function ProgressSizes() {
  return (
    <div className="u-gap-4">
      <div>
        <label className="u-d-block u-fs-sm u-fw-medium u-mb-2">Small</label>
        <Progress value={30} size="sm" variant="primary" />
      </div>
      
      <div>
        <label className="u-d-block u-fs-sm u-fw-medium u-mb-2">Medium (Default)</label>
        <Progress value={60} size="md" variant="primary" />
      </div>
      
      <div>
        <label className="u-d-block u-fs-sm u-fw-medium u-mb-2">Large</label>
        <Progress value={80} size="lg" variant="primary" />
      </div>
    </div>
  );
}
```

### Striped and Animated Progress

```jsx
function StripedProgress() {
  return (
    <div className="u-gap-4">
      <div>
        <label className="u-d-block u-fs-sm u-fw-medium u-mb-2">Striped</label>
        <Progress value={45} variant="primary" striped />
      </div>
      
      <div>
        <label className="u-d-block u-fs-sm u-fw-medium u-mb-2">Animated Stripes</label>
        <Progress value={65} variant="success" striped animated />
      </div>
      
      <div>
        <label className="u-d-block u-fs-sm u-fw-medium u-mb-2">Indeterminate</label>
        <Progress indeterminate variant="info" />
      </div>
    </div>
  );
}
```

### File Upload Progress

```jsx
function FileUploadProgress() {
  const [uploads, setUploads] = useState([]);

  const simulateUpload = (fileName) => {
    const uploadId = Date.now();
    const newUpload = {
      id: uploadId,
      fileName,
      progress: 0,
      status: 'uploading'
    };

    setUploads(prev => [...prev, newUpload]);

    const interval = setInterval(() => {
      setUploads(prev => prev.map(upload => {
        if (upload.id === uploadId) {
          const newProgress = upload.progress + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...upload, progress: 100, status: 'completed' };
          }
          return { ...upload, progress: newProgress };
        }
        return upload;
      }));
    }, 300);
  };

  const removeUpload = (id) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  return (
    <div className="u-gap-4">
      <div className="u-d-flex u-gap-3">
        <Button 
          label="Upload Document.pdf"
          onClick={() => simulateUpload('Document.pdf')}
          variant="primary"
        />
        <Button 
          label="Upload Image.jpg"
          onClick={() => simulateUpload('Image.jpg')}
          variant="secondary"
        />
      </div>

      <div className="u-gap-3">
        {uploads.map(upload => (
          <Card key={upload.id} className="u-p-4">
            <div className="u-d-flex u-align-items-center u-justify-content-between u-mb-2">
              <div className="u-d-flex u-align-items-center u-gap-3">
                <Icon name="File" />
                <span className="u-fw-medium">{upload.fileName}</span>
              </div>
              <div className="u-d-flex u-align-items-center u-gap-2">
                {upload.status === 'completed' ? (
                  <Badge label="Completed" variant="success" size="sm" />
                ) : (
                  <Badge label="Uploading" variant="info" size="sm" />
                )}
                <Button 
                  icon={<Icon name="X" />}
                  iconOnly
                  variant="link"
                  size="sm"
                  onClick={() => removeUpload(upload.id)}
                />
              </div>
            </div>
            
            <Progress 
              value={upload.progress}
              variant={upload.status === 'completed' ? 'success' : 'primary'}
              showLabel
              size="sm"
            />
            
            <div className="u-fs-sm u-text-secondary u-mt-1">
              {upload.status === 'completed' 
                ? 'Upload completed' 
                : `${Math.round(upload.progress)}% uploaded`
              }
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

### Multi-step Process

```jsx
function MultiStepProcess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepProgress, setStepProgress] = useState({});
  
  const steps = [
    { id: 1, name: 'Account Setup', description: 'Create your account' },
    { id: 2, name: 'Profile Information', description: 'Add your details' },
    { id: 3, name: 'Preferences', description: 'Set your preferences' },
    { id: 4, name: 'Verification', description: 'Verify your email' }
  ];

  const totalSteps = steps.length;
  const overallProgress = ((currentStep - 1) / totalSteps) * 100 + 
    ((stepProgress[currentStep] || 0) / totalSteps);

  const simulateStepProgress = () => {
    const interval = setInterval(() => {
      setStepProgress(prev => {
        const current = prev[currentStep] || 0;
        if (current >= 100) {
          clearInterval(interval);
          if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
          }
          return prev;
        }
        return { ...prev, [currentStep]: current + 10 };
      });
    }, 200);
  };

  return (
    <div className="u-mw-100 u-mx-auto u-gap-6">
      <div>
        <h3 className="u-fs-lg u-fw-semibold u-mb-2">Setup Progress</h3>
        <Progress 
          value={overallProgress}
          variant="primary"
          size="lg"
          showLabel
        />
        <div className="u-fs-sm u-text-secondary u-mt-1">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      <div className="u-gap-3">
        {steps.map(step => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep || 
            (step.id === currentStep && (stepProgress[step.id] || 0) >= 100);
          const progress = stepProgress[step.id] || 0;

          return (
            <div key={step.id} className="u-d-flex u-align-items-center u-gap-4 u-p-3 u-border u-rounded">
              <div className={`u-w-8 u-h-8 u-rounded-circle u-d-flex u-align-items-center u-justify-content-center u-fs-sm u-fw-medium ${
                isCompleted ? 'bg-green-500 text-white' :
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {isCompleted ? <Icon name="Check" size="sm" /> : step.id}
              </div>
              
              <div className="u-flex-grow-1">
                <div className="u-fw-medium">{step.name}</div>
                <div className="u-fs-sm u-text-secondary">{step.description}</div>

                {isActive && progress > 0 && progress < 100 && (
                  <div className="u-mt-2">
                    <Progress 
                      value={progress}
                      variant="primary"
                      size="sm"
                      showLabel
                    />
                  </div>
                )}
              </div>
              
              {isActive && progress < 100 && (
                <Button 
                  label="Start"
                  size="sm"
                  onClick={simulateStepProgress}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### Skill Progress Bars

```jsx
function SkillProgress() {
  const skills = [
    { name: 'JavaScript', level: 90, color: 'warning' },
    { name: 'React', level: 85, color: 'info' },
    { name: 'TypeScript', level: 75, color: 'primary' },
    { name: 'Node.js', level: 70, color: 'success' },
    { name: 'Python', level: 60, color: 'secondary' },
    { name: 'GraphQL', level: 45, color: 'error' }
  ];

  return (
    <Card>
      <div className="u-gap-4">
        <h3 className="u-fs-lg u-fw-semibold">Technical Skills</h3>
        <div className="u-gap-4">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-1">
                <span className="u-fw-medium">{skill.name}</span>
                <span className="u-fs-sm u-text-secondary">{skill.level}%</span>
              </div>
              <Progress 
                value={skill.level}
                variant={skill.color}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
```

### Dashboard Metrics

```jsx
function DashboardMetrics() {
  const metrics = [
    {
      title: 'Storage Used',
      value: 75,
      max: 100,
      unit: 'GB',
      variant: 'primary',
      description: '75 GB of 100 GB used'
    },
    {
      title: 'CPU Usage',
      value: 45,
      max: 100,
      unit: '%',
      variant: 'success',
      description: 'Normal usage'
    },
    {
      title: 'Memory',
      value: 85,
      max: 100,
      unit: '%',
      variant: 'warning',
      description: 'High usage detected'
    },
    {
      title: 'Bandwidth',
      value: 95,
      max: 100,
      unit: '%',
      variant: 'error',
      description: 'Approaching limit'
    }
  ];

  return (
    <div className="u-d-grid u-grid-cols-1 u-md-grid-cols-2 u-gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <div className="u-gap-3">
            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <h4 className="u-fw-semibold">{metric.title}</h4>
              <span className="u-fs-2 u-fw-bold">
                {metric.value}{metric.unit}
              </span>
            </div>
            
            <Progress 
              value={metric.value}
              variant={metric.variant}
              showLabel
            />
            
            <div className="u-fs-sm u-text-secondary">
              {metric.description}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

## Vanilla JavaScript Usage

```javascript
// Basic progress bar
const progress = new Atomix.Progress('.my-progress', {
  value: 50,
  variant: 'primary',
  showLabel: true
});

// Update progress value
progress.setValue(75);

// Indeterminate progress
const loadingProgress = new Atomix.Progress('.loading-progress', {
  indeterminate: true,
  variant: 'info'
});

// Animated progress
const animatedProgress = new Atomix.Progress('.animated-progress', {
  value: 60,
  striped: true,
  animated: true
});

// Initialize from data attributes
Atomix.Progress.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic progress bar -->
<div 
  class="c-progress" 
  data-atomix="progress"
  data-value="50"
  data-variant="primary"
  data-show-label="true">
  <div class="c-progress__bar" style="width: 50%">
    <span class="c-progress__label">50%</span>
  </div>
</div>

<!-- Striped animated progress -->
<div 
  class="c-progress c-progress--striped c-progress--animated" 
  data-atomix="progress"
  data-value="75"
  data-variant="success">
  <div class="c-progress__bar c-progress__bar--success" style="width: 75%"></div>
</div>

<!-- Indeterminate progress -->
<div 
  class="c-progress c-progress--indeterminate" 
  data-atomix="progress"
  data-variant="info">
  <div class="c-progress__bar c-progress__bar--info"></div>
</div>
```

## Styling

### CSS Classes

```css
/* Base progress */
.c-progress {
  /* Progress container */
}

.c-progress__bar {
  /* Progress bar */
}

.c-progress__label {
  /* Progress label */
}

/* Size modifiers */
.c-progress--sm { /* Small progress */ }
.c-progress--md { /* Medium progress */ }
.c-progress--lg { /* Large progress */ }

/* Variant modifiers */
.c-progress--primary { /* Primary variant */ }
.c-progress--success { /* Success variant */ }
.c-progress--warning { /* Warning variant */ }
.c-progress--error { /* Error variant */ }

/* State modifiers */
.c-progress--striped { /* Striped pattern */ }
.c-progress--animated { /* Animated stripes */ }
.c-progress--indeterminate { /* Indeterminate state */ }
```

### Custom Styling

```css
/* Custom progress theme */
.c-progress--gradient .c-progress__bar {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

/* Rounded progress bar */
.c-progress--rounded {
  border-radius: 50px;
}

.c-progress--rounded .c-progress__bar {
  border-radius: 50px;
}

/* Glowing effect */
.c-progress--glow .c-progress__bar {
  box-shadow: 0 0 10px currentColor;
}

/* Custom animations */
@keyframes progressPulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

.c-progress--pulse .c-progress__bar {
  animation: progressPulse 2s infinite;
}
```

## Accessibility

### ARIA Attributes

- `role="progressbar"` - Identifies progress element
- `aria-valuenow` - Current progress value
- `aria-valuemin` - Minimum value (usually 0)
- `aria-valuemax` - Maximum value
- `aria-label` - Accessible description

### Screen Reader Support

- Progress value is announced
- Label text is read by screen readers
- Indeterminate state is communicated
- Value changes are announced

## Best Practices

### Do's ✅

- Provide clear labels for progress context
- Use appropriate colors for different states
- Show percentage or descriptive text
- Handle edge cases (0%, 100%)
- Use indeterminate for unknown duration

```jsx
// Good: Clear context and appropriate styling
<div className="u-gap-2">
  <div className="u-d-flex u-justify-content-between">
    <span>Uploading document...</span>
    <span>75%</span>
  </div>
  <Progress 
    value={75} 
    variant="primary" 
    aria-label="Document upload progress"
  />
</div>
```

### Don'ts ❌

- Don't use progress bars without context
- Don't forget to handle loading states
- Don't use inappropriate colors for states
- Don't make progress bars too small to see

```jsx
// Bad: No context, unclear purpose
<Progress value={50} />
```

## Common Patterns

### Loading States

```jsx
function LoadingStates() {
  const [loading, setLoading] = useState(false);
  
  const handleLoad = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading(false);
  };

  return (
    <div className="u-gap-4">
      <Button 
        label={loading ? "Loading..." : "Start Process"}
        onClick={handleLoad}
        disabled={loading}
      />
      
      {loading && (
        <Progress 
          indeterminate 
          variant="primary"
          label="Processing your request..."
        />
      )}
    </div>
  );
}
```

### Form Validation Progress

```jsx
function FormValidationProgress() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validationRules = [
    { field: 'name', valid: formData.name.length >= 2 },
    { field: 'email', valid: formData.email.includes('@') },
    { field: 'password', valid: formData.password.length >= 8 },
    { field: 'confirmPassword', valid: formData.password === formData.confirmPassword }
  ];

  const validFields = validationRules.filter(rule => rule.valid).length;
  const progress = (validFields / validationRules.length) * 100;

  return (
    <div className="u-gap-4">
      <div>
        <div className="u-d-flex u-justify-content-between u-mb-2">
          <span className="u-fw-medium">Form Completion</span>
          <span className="u-fs-sm">{validFields}/{validationRules.length} fields</span>
        </div>
        <Progress 
          value={progress}
          variant={progress === 100 ? 'success' : 'primary'}
          showLabel
        />
      </div>
      
      {/* Form fields would go here */}
    </div>
  );
}
```

## Related Components

- **Spinner** - For indeterminate loading
- **Badge** - For status indicators
- **Button** - For triggering progress
- **Card** - For progress containers
- **Icon** - For progress states

## Performance Considerations

- Use CSS animations for smooth progress
- Debounce rapid progress updates
- Consider using requestAnimationFrame for smooth animations
- Optimize for mobile touch performance

```jsx
// Smooth progress animation
function SmoothProgress({ targetValue }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const animate = () => {
      setCurrentValue(prev => {
        const diff = targetValue - prev;
        if (Math.abs(diff) < 0.1) return targetValue;
        return prev + diff * 0.1;
      });
    };

    const interval = setInterval(animate, 16); // 60fps
    return () => clearInterval(interval);
  }, [targetValue]);

  return <Progress value={currentValue} />;
}
```

## Browser Support

The Progress component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

All animations and transitions work across supported browsers.
