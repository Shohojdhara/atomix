# Modal Component

The Modal component provides a flexible and accessible dialog window that can be used for various purposes like notifications, forms, and more.

## Usage

### HTML Structure

```html
<div class="c-modal" id="myModal">
  <div class="c-modal__backdrop"></div>
  <div class="c-modal__dialog">
    <div class="c-modal__content">
      <div class="c-modal__header">
        <div class="c-modal__header-content">
          <h3 class="c-modal__title">Modal Title</h3>
          <p class="c-modal__sub">Subtitle text</p>
        </div>
        <button type="button" class="c-modal__close c-btn js-modal-close" aria-label="Close modal">
          <svg><!-- Close icon SVG --></svg>
        </button>
      </div>
      
      <div class="c-modal__body">
        Modal content goes here
      </div>
      
      <div class="c-modal__footer">
        <button class="c-btn c-btn--primary">Save</button>
        <button class="c-btn js-modal-close">Cancel</button>
      </div>
    </div>
  </div>
</div>
```

### JavaScript Initialization

#### Automatic Initialization

The Modal component can be automatically initialized for all modals on the page:

```js
// Initialize all modals on the page
Atomix.initializeModals();

// Setup event delegation for dynamically added modals
Atomix.setupModalEventDelegation();
```

#### Manual Initialization

You can also manually initialize modals with custom options:

```js
// Initialize a specific modal
const modal = new Atomix.Modal('#myModal', {
  backdrop: true,
  keyboard: true,
  size: 'md',
  onOpen: function() {
    console.log('Modal opened');
  },
  onClose: function() {
    console.log('Modal closed');
  }
});
```

### API

#### Opening and Closing Modals

```js
// Get a modal instance
const modalInstance = Atomix.getModalInstance('#myModal');

// Open modal
modalInstance.open();

// Close modal
modalInstance.close();

// Toggle modal
modalInstance.toggle();
```

#### Trigger Buttons

You can use data attributes to trigger modals:

```html
<!-- Open button -->
<button data-target="#myModal" class="js-modal-open">Open Modal</button>

<!-- or use data-modal-open attribute -->
<button data-modal-open="myModal">Open Modal</button>

<!-- Close button -->
<button class="js-modal-close">Close</button>

<!-- or use data-modal-close attribute -->
<button data-modal-close>Close</button>
```

### Configuration Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| openSelector | string | '.js-modal-open' | Selector for buttons that open the modal |
| closeSelector | string | '.js-modal-close' | Selector for buttons that close the modal |
| dialogSelector | string | '.c-modal__dialog' | Selector for the dialog element |
| backdropSelector | string | '.c-modal__backdrop' | Selector for the backdrop element |
| backdrop | boolean | true | Whether clicking the backdrop closes the modal |
| keyboard | boolean | true | Whether pressing ESC key closes the modal |
| size | string | 'md' | Size of the modal ('sm', 'md', 'lg', 'xl') |
| onOpen | function | null | Callback when modal opens |
| onClose | function | null | Callback when modal closes |
| onToggle | function | null | Callback when modal toggles with state parameter |

### Data Attributes

You can configure modals using data attributes:

```html
<div class="c-modal" 
     id="configModal" 
     data-backdrop="true"
     data-keyboard="true"
     data-size="lg">
  <!-- Modal content -->
</div>
```

### Events

The Modal component dispatches custom events:

```js
const modal = document.getElementById('myModal');

// Listen for modal open event
modal.addEventListener('modal:open', (event) => {
  console.log('Modal opened', event.detail.instance);
});

// Listen for modal close event
modal.addEventListener('modal:close', (event) => {
  console.log('Modal closed', event.detail.instance);
});

// Listen for modal destroy event
modal.addEventListener('modal:destroy', (event) => {
  console.log('Modal destroyed', event.detail.instance);
});
```

## Accessibility

The Modal component includes several accessibility features:

- Proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)
- Focus management (traps focus inside the modal)
- Keyboard support (ESC key to close)
- Screen reader friendly

## Browser Support

The Modal component supports all modern browsers and Internet Explorer 11+. 