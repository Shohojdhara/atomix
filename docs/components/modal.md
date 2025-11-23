# Modal Component

The Modal component creates overlay dialogs for displaying content that requires user attention or interaction. It provides a flexible, accessible way to show forms, confirmations, images, or any other content in a focused overlay.

## Overview

Modals are used to focus user attention on a specific task or piece of content without navigating away from the current page. They're ideal for forms, confirmations, alerts, image viewers, and other interactive content that needs to interrupt the user's workflow.

## Props API

### ModalProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether the modal is open |
| `onOpenChange` | `(isOpen: boolean) => void` | `undefined` | Callback when open state changes |
| `onOpen` | `() => void` | `undefined` | Callback when modal opens |
| `onClose` | `() => void` | `undefined` | Callback when modal closes |
| `title` | `ReactNode` | `undefined` | Modal title in header |
| `subtitle` | `ReactNode` | `undefined` | Modal subtitle in header |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal size |
| `backdrop` | `boolean` | `true` | Close when backdrop is clicked |
| `keyboard` | `boolean` | `true` | Close when escape key is pressed |
| `closeButton` | `boolean` | `true` | Show close button in header |
| `footer` | `ReactNode` | `undefined` | Footer content |
| `children` | `ReactNode` | `undefined` | Modal body content |
| `className` | `string` | `''` | Additional CSS classes |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Glass morphism effect for the modal |
| `style` | `React.CSSProperties` | `undefined` | Custom style for the modal |

## Usage Examples

### Basic Modal

```jsx
import React, { useState } from 'react';
import { Modal, Button } from '@shohojdhara/atomix';

function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        label="Open Modal" 
        onClick={() => setIsOpen(true)} 
      />
      
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Basic Modal"
        subtitle="This is a simple modal example"
      >
        <p>This is the modal content. You can put any content here.</p>
      </Modal>
    </>
  );
}
```

### Confirmation Modal

```jsx
function ConfirmationModal({ isOpen, onConfirm, onCancel, title, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onCancel}
      title={title}
      size="sm"
      footer={
        <div className="u-d-flex u-gap-3 u-justify-content-end">
          <Button 
            label="Cancel" 
            variant="secondary" 
            onClick={onCancel} 
          />
          <Button 
            label="Confirm" 
            variant="error" 
            onClick={onConfirm} 
          />
        </div>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}

// Usage
function DeleteButton({ onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    onDelete();
    setShowConfirm(false);
  };

  return (
    <>
      <Button 
        label="Delete" 
        variant="error" 
        onClick={() => setShowConfirm(true)} 
      />
      
      <ConfirmationModal
        isOpen={showConfirm}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </>
  );
}
```

### Form Modal

```jsx
import { Form, FormGroup, Input, Textarea } from '@shohojdhara/atomix';

function FormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      title="Contact Us"
      subtitle="Send us a message"
      size="md"
      footer={
        <div className="u-d-flex u-gap-3 u-justify-content-end">
          <Button 
            label="Cancel" 
            variant="secondary" 
            onClick={onClose} 
          />
          <Button 
            label="Send Message" 
            variant="primary" 
            type="submit"
            form="contact-form"
          />
        </div>
      }
    >
      <Form id="contact-form" onSubmit={handleSubmit}>
        <div className="u-gap-4">
          <FormGroup label="Name" required>
            <Input 
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Your name"
              required
            />
          </FormGroup>

          <FormGroup label="Email" required>
            <Input 
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="your@email.com"
              required
            />
          </FormGroup>

          <FormGroup label="Message" required>
            <Textarea 
              value={formData.message}
              onChange={handleChange('message')}
              placeholder="Your message..."
              rows={4}
              required
            />
          </FormGroup>
        </div>
      </Form>
    </Modal>
  );
}
```

### Image Modal

```jsx
function ImageModal({ isOpen, onClose, imageSrc, imageAlt, title }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      title={title}
      size="lg"
      className="image-modal"
    >
      <div className="u-text-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="u-max-w-full u-h-auto u-rounded"
        />
      </div>
    </Modal>
  );
}

// Usage with image gallery
function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="u-d-grid u-grid-cols-3 u-gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.thumbnail}
            alt={image.alt}
            className="u-cursor-pointer u-rounded u-hover-opacity-80"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src}
        imageAlt={selectedImage?.alt}
        title={selectedImage?.title}
      />
    </>
  );
}
```

### Multi-step Modal

```jsx
function MultiStepModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div>Step 1: Basic Information</div>;
      case 2:
        return <div>Step 2: Preferences</div>;
      case 3:
        return <div>Step 3: Confirmation</div>;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      title={`Setup Wizard - Step ${currentStep} of ${totalSteps}`}
      size="md"
      footer={
        <div className="u-d-flex u-justify-content-between u-w-100">
          <Button
            label="Previous"
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 1}
          />
          <div className="u-d-flex u-gap-2">
            <Button 
              label="Cancel" 
              variant="link" 
              onClick={handleClose} 
            />
            <Button 
              label={currentStep === totalSteps ? "Finish" : "Next"}
              variant="primary"
              onClick={currentStep === totalSteps ? handleClose : nextStep}
            />
          </div>
        </div>
      }
    >
      <div className="u-gap-4">
        {/* Progress indicator */}
        <div className="u-d-flex u-justify-content-between u-mb-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i + 1 <= currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {renderStepContent()}
      </div>
    </Modal>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Basic modal
const modal = new Atomix.Modal('.my-modal', {
  title: 'Modal Title',
  size: 'md',
  backdrop: true,
  keyboard: true,
  onOpen: () => console.log('Modal opened'),
  onClose: () => console.log('Modal closed')
});

// Open/close programmatically
modal.open();
modal.close();

// Initialize from data attributes
Atomix.Modal.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Modal trigger -->
<button 
  class="c-button c-button--primary" 
  data-modal-target="#example-modal">
  Open Modal
</button>

<!-- Modal -->
<div 
  id="example-modal"
  class="c-modal" 
  data-atomix="modal"
  data-size="md"
  data-backdrop="true"
  data-keyboard="true">
  
  <div class="c-modal__dialog">
    <div class="c-modal__content">
      <div class="c-modal__header">
        <h2 class="c-modal__title">Modal Title</h2>
        <button class="c-modal__close" aria-label="Close">
          <i class="ph ph-x"></i>
        </button>
      </div>
      
      <div class="c-modal__body">
        <p>Modal content goes here.</p>
      </div>
      
      <div class="c-modal__footer">
        <button class="c-button c-button--secondary" data-modal-close>
          Cancel
        </button>
        <button class="c-button c-button--primary">
          Save
        </button>
      </div>
    </div>
  </div>
  
  <div class="c-modal__backdrop"></div>
</div>
```

## Styling

### CSS Classes

```css
/* Base modal */
.c-modal {
  /* Modal overlay styles */
}

/* Size modifiers */
.c-modal--sm { /* Small modal */ }
.c-modal--md { /* Medium modal (default) */ }
.c-modal--lg { /* Large modal */ }
.c-modal--xl { /* Extra large modal */ }

/* State modifiers */
.c-modal--open { /* Open state */ }
.c-modal--closing { /* Closing animation */ }

/* Elements */
.c-modal__dialog { /* Modal dialog container */ }
.c-modal__content { /* Modal content wrapper */ }
.c-modal__header { /* Header section */ }
.c-modal__title { /* Title element */ }
.c-modal__subtitle { /* Subtitle element */ }
.c-modal__close { /* Close button */ }
.c-modal__body { /* Body content */ }
.c-modal__footer { /* Footer section */ }
.c-modal__backdrop { /* Background overlay */ }
```

### Custom Styling

```css
/* Custom modal variant */
.c-modal--success .c-modal__header {
  background-color: var(--color-success-50);
  border-bottom: 1px solid var(--color-success-200);
}

/* Full-screen modal */
.c-modal--fullscreen .c-modal__dialog {
  width: 100vw;
  height: 100vh;
  max-width: none;
  margin: 0;
}

/* Animated entrance */
.c-modal--open .c-modal__dialog {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Glass Effect

Modal supports the glass morphism effect for modern, translucent dialog designs.

### Basic Glass Effect

```jsx
function GlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Open Glass Modal" onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Glass Modal"
        glass={true}
      >
        <p>This modal has a glass morphism effect applied.</p>
      </Modal>
    </>
  );
}
```

### Custom Glass Configuration

```jsx
function CustomGlassModal() {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Custom Glass Modal"
      glass={{
        blurAmount: 20,
        saturation: 200,
        cornerRadius: 16,
        displacementScale: 60,
        mode: 'shader',
      }}
    >
      <p>Modal with custom glass settings.</p>
    </Modal>
  );
}
```

## Accessibility

### ARIA Attributes

- `role="dialog"` - Identifies the modal as a dialog
- `aria-modal="true"` - Indicates modal behavior
- `aria-labelledby` - References the modal title
- `aria-describedby` - References the modal description
- `aria-hidden` - Hides background content from screen readers

### Keyboard Navigation

- **Escape** - Closes the modal (if keyboard prop is true)
- **Tab** - Cycles through focusable elements within modal
- **Shift+Tab** - Reverse tab order
- **Focus trap** - Keeps focus within the modal

### Screen Reader Support

- Modal title is announced when opened
- Background content is hidden from screen readers
- Focus is moved to the modal when opened
- Focus is returned to trigger element when closed

## Best Practices

### Do's ✅

- Use modals sparingly for important interactions
- Provide clear titles and descriptions
- Include obvious close mechanisms
- Keep content focused and concise
- Return focus to the trigger element after closing

```jsx
// Good: Clear purpose and actions
<Modal
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Delete Account"
  subtitle="This action cannot be undone"
  footer={
    <div className="u-d-flex u-gap-3">
      <Button label="Cancel" variant="secondary" onClick={onCancel} />
      <Button label="Delete Account" variant="error" onClick={onConfirm} />
    </div>
  }
>
  <p>Are you sure you want to delete your account? All your data will be permanently removed.</p>
</Modal>
```

### Don'ts ❌

- Don't use modals for non-essential content
- Don't stack multiple modals
- Don't make modals too large or complex
- Don't forget to handle the escape key and backdrop clicks

```jsx
// Bad: Too much content, unclear purpose
<Modal isOpen={isOpen} title="Information">
  <div>
    <p>Lorem ipsum dolor sit amet...</p>
    <p>Consectetur adipiscing elit...</p>
    <p>Sed do eiusmod tempor...</p>
    {/* ... lots more content ... */}
  </div>
</Modal>
```

## Common Patterns

### Loading Modal

```jsx
function LoadingModal({ isOpen, message = "Loading..." }) {
  return (
    <Modal
      isOpen={isOpen}
      title={message}
      size="sm"
      backdrop={false}
      keyboard={false}
      closeButton={false}
    >
      <div className="u-d-flex u-align-items-center u-justify-content-center u-py-4">
        <Spinner size="lg" />
      </div>
    </Modal>
  );
}
```

### Alert Modal

```jsx
function AlertModal({ isOpen, onClose, type, title, message }) {
  const variants = {
    success: { icon: 'CheckCircle', color: 'success' },
    error: { icon: 'XCircle', color: 'error' },
    warning: { icon: 'Warning', color: 'warning' },
    info: { icon: 'Info', color: 'info' }
  };

  const variant = variants[type] || variants.info;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      title={
        <div className="u-d-flex u-align-items-center u-gap-3">
          <Icon name={variant.icon} className={`u-text-${variant.color}`} />
          {title}
        </div>
      }
      size="sm"
      footer={
        <Button label="OK" variant="primary" onClick={onClose} />
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
```

## Related Components

- **Button** - Modal triggers and actions
- **Form** - Form dialogs
- **Icon** - Visual enhancement
- **Spinner** - Loading states
- **Card** - Alternative content containers

## Performance Considerations

- Modals are rendered conditionally to avoid unnecessary DOM nodes
- Use lazy loading for modal content when possible
- Implement proper cleanup for event listeners
- Consider using React.lazy for large modal content

```jsx
// Lazy loading modal content
const LazyModalContent = React.lazy(() => import('./ModalContent'));

function LazyModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} title="Advanced Settings">
      <Suspense fallback={<Spinner />}>
        <LazyModalContent />
      </Suspense>
    </Modal>
  );
}
```

## Browser Support

The Modal component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Focus trap and backdrop functionality require modern browser APIs.
