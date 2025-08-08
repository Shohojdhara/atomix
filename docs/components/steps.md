# Steps

The Steps component displays a sequence of steps in a process, allowing users to visualize progress through multi-step workflows, wizards, or any sequential interface. It provides clear visual indicators for completed, current, and upcoming steps.

## Overview

The Steps component creates a visual representation of a multi-step process with customizable step indicators, labels, and progress visualization. It supports both horizontal and vertical layouts and can be used for various scenarios like form wizards, onboarding flows, and progress tracking.

## Installation

The Steps component is included in the Atomix package. Import it in your React components:

```jsx
import { Steps } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the steps styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { Steps } from '@shohojdhara/atomix';

function MyComponent() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { number: 1, text: 'Account Information' },
    { number: 2, text: 'Personal Details' },
    { number: 3, text: 'Verification' },
    { number: 4, text: 'Complete' }
  ];

  return (
    <Steps
      items={steps}
      activeIndex={currentStep}
      onStepChange={setCurrentStep}
    />
  );
}
```

### HTML/CSS

```html
<!-- Horizontal steps -->
<div class="c-steps">
  <div class="c-steps__step c-steps__step--completed">
    <div class="c-steps__step-indicator">
      <span class="c-steps__step-number">1</span>
    </div>
    <div class="c-steps__step-content">
      <span class="c-steps__step-text">Account Information</span>
    </div>
  </div>
  
  <div class="c-steps__connector c-steps__connector--completed"></div>
  
  <div class="c-steps__step c-steps__step--active">
    <div class="c-steps__step-indicator">
      <span class="c-steps__step-number">2</span>
    </div>
    <div class="c-steps__step-content">
      <span class="c-steps__step-text">Personal Details</span>
    </div>
  </div>
  
  <div class="c-steps__connector"></div>
  
  <div class="c-steps__step">
    <div class="c-steps__step-indicator">
      <span class="c-steps__step-number">3</span>
    </div>
    <div class="c-steps__step-content">
      <span class="c-steps__step-text">Verification</span>
    </div>
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `StepItem[]` | - | **Required.** Array of step items |
| `activeIndex` | `number` | `0` | Current active step index (0-based) |
| `vertical` | `boolean` | `false` | Whether to display steps vertically |
| `onStepChange` | `(index: number) => void` | - | Callback when active step changes |
| `className` | `string` | `''` | Additional CSS classes |

### StepItem Interface

```typescript
interface StepItem {
  /**
   * The number for the step (can be number, string, or React component)
   */
  number: number | string | ReactNode;

  /**
   * The text label for the step
   */
  text: string;

  /**
   * Optional custom content for the step
   */
  content?: ReactNode;
}
```

## Examples

### Basic Step Wizard

```jsx
function StepWizard() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { number: 1, text: 'Personal Info' },
    { number: 2, text: 'Address' },
    { number: 3, text: 'Payment' },
    { number: 4, text: 'Review' }
  ];

  const nextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="step-wizard">
      <Steps
        items={steps}
        activeIndex={activeStep}
        onStepChange={setActiveStep}
      />
      
      <div className="step-content">
        {activeStep === 0 && <PersonalInfoForm />}
        {activeStep === 1 && <AddressForm />}
        {activeStep === 2 && <PaymentForm />}
        {activeStep === 3 && <ReviewForm />}
      </div>

      <div className="step-navigation">
        <button 
          onClick={prevStep}
          disabled={activeStep === 0}
          className="btn btn--secondary"
        >
          Previous
        </button>
        <button 
          onClick={nextStep}
          disabled={activeStep === steps.length - 1}
          className="btn btn--primary"
        >
          {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
}
```

### Vertical Steps

```jsx
function VerticalSteps() {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    { 
      number: '✓', 
      text: 'Order Placed',
      content: <span className="step-time">Today at 2:30 PM</span>
    },
    { 
      number: '✓', 
      text: 'Processing',
      content: <span className="step-time">Today at 3:15 PM</span>
    },
    { 
      number: 3, 
      text: 'Shipped',
      content: <span className="step-time">Expected in 2-3 hours</span>
    },
    { 
      number: 4, 
      text: 'Delivered',
      content: <span className="step-time">Expected tomorrow</span>
    }
  ];

  return (
    <div className="order-tracking">
      <h3>Order Status</h3>
      <Steps
        items={steps}
        activeIndex={currentStep}
        vertical={true}
      />
    </div>
  );
}
```

### Custom Step Icons

```jsx
function CustomIconSteps() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { 
      number: <Icon name="User" />, 
      text: 'Account Setup' 
    },
    { 
      number: <Icon name="CreditCard" />, 
      text: 'Billing' 
    },
    { 
      number: <Icon name="Settings" />, 
      text: 'Configuration' 
    },
    { 
      number: <Icon name="CheckCircle" />, 
      text: 'Complete' 
    }
  ];

  return (
    <div className="onboarding-steps">
      <h2>Setup Your Account</h2>
      <Steps
        items={steps}
        activeIndex={activeStep}
        onStepChange={setActiveStep}
        className="onboarding-steps__container"
      />
    </div>
  );
}
```

### Interactive Steps

```jsx
function InteractiveSteps() {
  const [completedSteps, setCompletedSteps] = useState(new Set([0]));
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { number: 1, text: 'Choose Plan' },
    { number: 2, text: 'Account Details' },
    { number: 3, text: 'Payment Info' },
    { number: 4, text: 'Confirmation' }
  ];

  const handleStepClick = (index) => {
    // Only allow clicking on completed steps or the next step
    if (completedSteps.has(index) || index === Math.min(...completedSteps) + 1) {
      setActiveStep(index);
    }
  };

  const completeStep = () => {
    setCompletedSteps(prev => new Set([...prev, activeStep]));
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // Modify step numbers to show completion
  const stepsWithStatus = steps.map((step, index) => ({
    ...step,
    number: completedSteps.has(index) ? '✓' : step.number
  }));

  return (
    <div className="interactive-wizard">
      <Steps
        items={stepsWithStatus}
        activeIndex={activeStep}
        onStepChange={handleStepClick}
      />
      
      <div className="step-content">
        <h3>Step {activeStep + 1}: {steps[activeStep].text}</h3>
        <p>Complete this step to continue...</p>
        
        <button 
          onClick={completeStep}
          className="btn btn--primary"
          disabled={completedSteps.has(activeStep)}
        >
          {completedSteps.has(activeStep) ? 'Completed' : 'Complete Step'}
        </button>
      </div>
    </div>
  );
}
```

### Progress Steps

```jsx
function ProgressSteps() {
  const [progress, setProgress] = useState(40);

  const steps = [
    { number: 1, text: 'Start' },
    { number: 2, text: 'In Progress' },
    { number: 3, text: 'Review' },
    { number: 4, text: 'Complete' }
  ];

  // Calculate active step based on progress
  const activeStep = Math.floor((progress / 100) * steps.length);

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <h3>Project Progress</h3>
        <span className="progress-percent">{progress}% Complete</span>
      </div>
      
      <Steps
        items={steps}
        activeIndex={activeStep}
      />
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="progress-controls">
        <button 
          onClick={() => setProgress(prev => Math.max(0, prev - 25))}
          className="btn btn--secondary btn--sm"
        >
          Decrease
        </button>
        <button 
          onClick={() => setProgress(prev => Math.min(100, prev + 25))}
          className="btn btn--primary btn--sm"
        >
          Increase
        </button>
      </div>
    </div>
  );
}
```

### Form Wizard with Validation

```jsx
function FormWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: { name: '', email: '' },
    address: { street: '', city: '' },
    preferences: { newsletter: false }
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, text: 'Personal Information' },
    { number: 2, text: 'Address Details' },
    { number: 3, text: 'Preferences' },
    { number: 4, text: 'Review & Submit' }
  ];

  const validateStep = (stepIndex) => {
    const stepErrors = {};
    
    switch (stepIndex) {
      case 0:
        if (!formData.personal.name) stepErrors.name = 'Name is required';
        if (!formData.personal.email) stepErrors.email = 'Email is required';
        break;
      case 1:
        if (!formData.address.street) stepErrors.street = 'Street is required';
        if (!formData.address.city) stepErrors.city = 'City is required';
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleStepClick = (index) => {
    // Allow clicking previous steps
    if (index < activeStep) {
      setActiveStep(index);
    }
  };

  return (
    <div className="form-wizard">
      <Steps
        items={steps}
        activeIndex={activeStep}
        onStepChange={handleStepClick}
      />
      
      <div className="wizard-content">
        {activeStep === 0 && (
          <PersonalInfoStep 
            data={formData.personal}
            errors={errors}
            onChange={(data) => setFormData(prev => ({ ...prev, personal: data }))}
          />
        )}
        {activeStep === 1 && (
          <AddressStep 
            data={formData.address}
            errors={errors}
            onChange={(data) => setFormData(prev => ({ ...prev, address: data }))}
          />
        )}
        {activeStep === 2 && (
          <PreferencesStep 
            data={formData.preferences}
            onChange={(data) => setFormData(prev => ({ ...prev, preferences: data }))}
          />
        )}
        {activeStep === 3 && (
          <ReviewStep data={formData} />
        )}
      </div>

      <div className="wizard-navigation">
        <button 
          onClick={() => setActiveStep(prev => prev - 1)}
          disabled={activeStep === 0}
          className="btn btn--secondary"
        >
          Previous
        </button>
        
        {activeStep < steps.length - 1 ? (
          <button onClick={handleNext} className="btn btn--primary">
            Next
          </button>
        ) : (
          <button className="btn btn--success">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
```

### Mini Steps Indicator

```jsx
function MiniSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, text: 'Basic' },
    { number: 2, text: 'Details' },
    { number: 3, text: 'Review' }
  ];

  return (
    <div className="mini-steps-container">
      <Steps
        items={steps}
        activeIndex={currentStep}
        className="mini-steps"
      />
      
      <div className="step-indicator-text">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].text}
      </div>
    </div>
  );
}
```

## Accessibility

The Steps component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus through clickable steps
- **Enter/Space**: Activates focused step (when clickable)
- **Arrow Keys**: Navigate between steps (optional)

### ARIA Attributes

- `role="progressbar"` for progress indication
- `aria-current="step"` for the current step
- `aria-label` for step context
- `aria-describedby` linking steps to descriptions

### Screen Reader Support

```jsx
function AccessibleSteps() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { number: 1, text: 'Personal Information' },
    { number: 2, text: 'Payment Details' },
    { number: 3, text: 'Confirmation' }
  ];

  return (
    <div>
      <div 
        role="progressbar" 
        aria-valuenow={activeStep + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={`Step ${activeStep + 1} of ${steps.length}: ${steps[activeStep].text}`}
      >
        <Steps
          items={steps}
          activeIndex={activeStep}
          onStepChange={setActiveStep}
        />
      </div>
      
      <div aria-live="polite" className="sr-only">
        Current step: {steps[activeStep].text}
      </div>
    </div>
  );
}
```

### Best Practices

1. **Provide clear step labels** that describe each step's purpose
2. **Use semantic HTML** and appropriate ARIA roles
3. **Announce step changes** to screen readers
4. **Ensure sufficient color contrast** for all step states
5. **Make interactive steps keyboard accessible**

## Styling

### CSS Custom Properties

The Steps component uses CSS custom properties for theming:

```css
:root {
  /* Step indicator */
  --atomix-steps-indicator-size: 2rem;
  --atomix-steps-indicator-bg: var(--atomix-white);
  --atomix-steps-indicator-border: 2px solid var(--atomix-gray-300);
  --atomix-steps-indicator-color: var(--atomix-gray-600);
  --atomix-steps-indicator-font-size: 0.875rem;

  /* Active step */
  --atomix-steps-active-bg: var(--atomix-primary);
  --atomix-steps-active-color: var(--atomix-white);
  --atomix-steps-active-border: 2px solid var(--atomix-primary);

  /* Completed step */
  --atomix-steps-completed-bg: var(--atomix-success);
  --atomix-steps-completed-color: var(--atomix-white);
  --atomix-steps-completed-border: 2px solid var(--atomix-success);

  /* Connector line */
  --atomix-steps-connector-width: 2px;
  --atomix-steps-connector-color: var(--atomix-gray-300);
  --atomix-steps-connector-completed-color: var(--atomix-success);

  /* Step text */
  --atomix-steps-text-color: var(--atomix-gray-600);
  --atomix-steps-text-active-color: var(--atomix-primary);
  --atomix-steps-text-font-size: 0.875rem;
  --atomix-steps-text-font-weight: 500;

  /* Spacing */
  --atomix-steps-gap: 1rem;
  --atomix-steps-vertical-gap: 1.5rem;
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base steps container */
.c-steps {
  display: flex;
  align-items: flex-start;
}

/* Vertical layout */
.c-steps--vertical {
  flex-direction: column;
}

.c-steps--vertical .c-steps__step {
  flex-direction: row;
  align-items: flex-start;
}

/* Individual step */
.c-steps__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

/* Step indicator */
.c-steps__step-indicator {
  width: var(--atomix-steps-indicator-size);
  height: var(--atomix-steps-indicator-size);
  border-radius: 50%;
  background: var(--atomix-steps-indicator-bg);
  border: var(--atomix-steps-indicator-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--atomix-steps-indicator-font-size);
  font-weight: 600;
  color: var(--atomix-steps-indicator-color);
  position: relative;
  z-index: 1;
}

/* Step number */
.c-steps__step-number {
  line-height: 1;
}

/* Step content */
.c-steps__step-content {
  margin-top: 0.5rem;
  text-align: center;
}

.c-steps--vertical .c-steps__step-content {
  margin-top: 0;
  margin-left: 1rem;
  text-align: left;
}

/* Step text */
.c-steps__step-text {
  display: block;
  font-size: var(--atomix-steps-text-font-size);
  font-weight: var(--atomix-steps-text-font-weight);
  color: var(--atomix-steps-text-color);
}

/* Step states */
.c-steps__step--active .c-steps__step-indicator {
  background: var(--atomix-steps-active-bg);
  border-color: var(--atomix-steps-active-border);
  color: var(--atomix-steps-active-color);
}

.c-steps__step--active .c-steps__step-text {
  color: var(--atomix-steps-text-active-color);
}

.c-steps__step--completed .c-steps__step-indicator {
  background: var(--atomix-steps-completed-bg);
  border-color: var(--atomix-steps-completed-border);
  color: var(--atomix-steps-completed-color);
}

/* Clickable steps */
.c-steps__step--clickable {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.c-steps__step--clickable:hover {
  opacity: 0.8;
}

.c-steps__step--clickable:focus {
  outline: 2px solid var(--atomix-focus-ring-color);
  outline-offset: 2px;
}

/* Connector lines */
.c-steps__connector {
  height: var(--atomix-steps-connector-width);
  background: var(--atomix-steps-connector-color);
  flex: 1;
  margin: 0 var(--atomix-steps-gap);
  align-self: center;
  position: relative;
  top: calc(var(--atomix-steps-indicator-size) / 2 - var(--atomix-steps-connector-width) / 2);
}

.c-steps__connector--completed {
  background: var(--atomix-steps-connector-completed-color);
}

/* Vertical connectors */
.c-steps--vertical .c-steps__connector {
  width: var(--atomix-steps-connector-width);
  height: var(--atomix-steps-vertical-gap);
  margin: var(--atomix-steps-gap) 0;
  top: 0;
  left: calc(var(--atomix-steps-indicator-size) / 2 - var(--atomix-steps-connector-width) / 2);
}
```

### Customization Examples

```css
/* Large steps variant */
.c-steps--large {
  --atomix-steps-indicator-size: 3rem;
  --atomix-steps-indicator-font-size: 1.125rem;
  --atomix-steps-text-font-size: 1rem;
}

/* Compact steps */
.c-steps--compact {
  --atomix-steps-indicator-size: 1.5rem;
  --atomix-steps-indicator-font-size: 0.75rem;
  --atomix-steps-text-font-size: 0.75rem;
  --atomix-steps-gap: 0.5rem;
}

/* Colorful theme */
.c-steps--colorful .c-steps__step:nth-child(1) .c-steps__step--active .c-steps__step-indicator {
  background: #ef4444;
  border-color: #ef4444;
}

.c-steps--colorful .c-steps__step:nth-child(3) .c-steps__step--active .c-steps__step-indicator {
  background: #10b981;
  border-color: #10b981;
}

.c-steps--colorful .c-steps__step:nth-child(5) .c-steps__step--active .c-steps__step-indicator {
  background: #8b5cf6;
  border-color: #8b5cf6;
}

/* Rounded rectangle indicators */
.c-steps--rounded .c-steps__step-indicator {
  border-radius: 0.5rem;
}

/* Custom connector style */
.c-steps--dashed .c-steps__connector {
  background: none;
  border-top: 2px dashed var(--atomix-steps-connector-color);
}

/* Minimal style */
.c-steps--minimal .c-steps__step-indicator {
  border: none;
  background: var(--atomix-gray-200);
  font-size: 0;
}

.c-steps--minimal .c-steps__step--active .c-steps__step-indicator {
  background: var(--atomix-primary);
}

.c-steps--minimal .c-steps__step--completed .c-steps__step-indicator {
  background: var(--atomix-success);
}
```

## Common Patterns

### Registration Wizard

```jsx
function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});

  const steps = [
    { number: 1, text: 'Account' },
    { number: 2, text: 'Profile' },
    { number: 3, text: 'Preferences' },
    { number: 4, text: 'Complete' }
  ];

  return (
    <div className="registration-wizard">
      <div className="wizard-header">
        <h1>Create Your Account</h1>
        <Steps 
          items={steps} 
          activeIndex={currentStep}
          className="registration-steps"
        />
      </div>
      
      <div className="wizard-body">
        {/* Step content based on currentStep */}
      </div>
    </div>
  );
}
```

### Order Tracking

```jsx
function OrderTracking({ order }) {
  const getStepStatus = (stepIndex, orderStatus) => {
    const statusMap = {
      'placed': 0,
      'confirmed': 1,
      'shipped': 2,
      'delivered': 3
    };
    return statusMap[orderStatus] >= stepIndex;
  };

  const steps = [
    { 
      number: getStepStatus(0, order.status) ? '✓' : 1, 
      text: 'Order Placed',
      content: order.placedAt 
    },
    { 
      number: getStepStatus(1, order.status) ? '✓' : 2, 
      text: 'Confirmed',
      content: order.confirmedAt 
    },
    { 
      number: getStepStatus(2, order.status) ? '✓' : 3, 
      text: 'Shipped',
      content: order.shippedAt || 'Pending'
    },
    { 
      number: getStepStatus(3, order.status) ? '✓' : 4, 
      text: 'Delivered',
      content: order.deliveredAt || 'Pending'
    }
  ];

  const activeIndex = Math.max(0, steps.findIndex(step => 
    step.content === 'Pending'
  ) - 1);

  return (
    <div className="order-tracking">
      <h2>Order #{order.id}</h2>
      <Steps 
        items={steps}
        activeIndex={activeIndex}
        vertical={true}
        className="tracking-steps"
      />
    </div>
  );
}
```

### Onboarding Flow

```jsx
function OnboardingFlow() {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { number: <Icon name="User" />, text: 'Profile Setup' },
    { number: <Icon name="Settings" />, text: 'Preferences' },
    { number: <Icon name="Users" />, text: 'Connect Friends' },
    { number: <Icon name="CheckCircle" />, text: 'Get Started' }
  ];

  const completeStep = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex < steps.length - 1) {
      setActiveStep(stepIndex + 1);
    }
  };

  return (
    <div className="onboarding-flow">
      <div className="onboarding-header">
        <h1>Welcome! Let's get you set up</h1>
        <Steps 
          items={steps}
          activeIndex={activeStep}
          className="onboarding-progress"
        />
      </div>
      
      <div className="onboarding-content">
        {/* Step-specific content */}
      </div>
    </div>
  );
}
```

## Performance Considerations

1. **Minimize re-renders**: Use `useMemo` for step calculations
2. **Event handling**: Debounce rapid step changes
3. **Large step counts**: Consider virtualization for many steps
4. **Animation**: Use CSS transitions over JavaScript animations

```jsx
// Optimized steps with memoization
const OptimizedSteps = memo(({ items, activeIndex, ...props }) => {
  const processedSteps = useMemo(() => {
    return items.map((item, index) => ({
      ...item,
      isActive: index === activeIndex,
      isCompleted: index < activeIndex
    }));
  }, [items, activeIndex]);

  return (
    <Steps 
      items={processedSteps}
      activeIndex={activeIndex}
      {...props}
    />
  );
});
```

## Integration Examples

### With Form Libraries

```jsx
// React Hook Form integration
import { useForm, useFormState } from 'react-hook-form';

function MultiStepForm() {
  const { control, trigger, getValues } = useForm({
    mode: 'onChange'
  });
  const { isValid } = useFormState({ control });
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { number: 1, text: 'Personal Info' },
    { number: 2, text: 'Contact Details' },
    { number: 3, text: 'Review' }
  ];

  const nextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div>
      <Steps items={steps} activeIndex={currentStep} />
      {/* Form steps content */}
    </div>
  );
}
```

### With React Router

```jsx
import { useNavigate, useParams } from 'react-router-dom';

function RoutedWizard() {
  const navigate = useNavigate();
  const { step = '0' } = useParams();
  const currentStep = parseInt(step);

  const steps = [
    { number: 1, text: 'Setup' },
    { number: 2, text: 'Configure' },
    { number: 3, text: 'Complete' }
  ];

  const handleStepChange = (stepIndex) => {
    navigate(`/wizard/${stepIndex}`);
  };

  return (
    <Steps 
      items={steps}
      activeIndex={currentStep}
      onStepChange={handleStepChange}
    />
  );
}
```

## Browser Support

The Steps component supports all modern browsers:

- Chrome 60+
- Firefox 55+  
- Safari 12+
- Edge 79+

For older browser support, ensure you have appropriate polyfills for:
- Flexbox layout
- CSS custom properties
- Modern JavaScript features

## Related Components

- **[Progress](./progress.md)** - For linear progress indication
- **[Breadcrumb](./breadcrumb.md)