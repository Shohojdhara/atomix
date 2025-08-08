# EdgePanel

The EdgePanel component provides a slide-out panel that appears from the edges of the screen or a container. It's commonly used for navigation menus, filters, settings panels, and other secondary content that should be easily accessible but not always visible.

## Overview

The EdgePanel component creates an overlay panel that slides in from any edge of the screen (start, end, top, or bottom). It supports different animation modes, backdrop interactions, and keyboard navigation, making it ideal for responsive navigation patterns and contextual content display.

## Installation

The EdgePanel component is included in the Atomix package. Import it in your React components:

```jsx
import { EdgePanel } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the edge panel styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { EdgePanel } from '@shohojdhara/atomix';

function MyComponent() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsPanelOpen(true)}>
        Open Panel
      </button>

      <EdgePanel
        title="Side Navigation"
        isOpen={isPanelOpen}
        onOpenChange={setIsPanelOpen}
        position="start"
      >
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </EdgePanel>
    </div>
  );
}
```

### HTML/CSS

```html
<!-- Edge panel structure -->
<div class="c-edge-panel c-edge-panel--start is-open">
  <div class="c-edge-panel__backdrop"></div>
  <div class="c-edge-panel__container">
    <div class="c-edge-panel__header">
      <h4>Panel Title</h4>
      <button class="c-edge-panel__close" aria-label="Close panel">
        <svg><!-- Close icon --></svg>
      </button>
    </div>
    <div class="c-edge-panel__body">
      <!-- Panel content -->
    </div>
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | Panel title displayed in the header |
| `children` | `ReactNode` | - | **Required.** Panel content |
| `position` | `EdgePanelPosition` | `'start'` | Position where the panel slides from |
| `mode` | `EdgePanelMode` | `'slide'` | Animation mode for the panel |
| `isOpen` | `boolean` | `false` | Whether the panel is currently open |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when panel open state changes |
| `backdrop` | `boolean` | `true` | Whether to show the backdrop overlay |
| `closeOnBackdropClick` | `boolean` | `true` | Close panel when clicking the backdrop |
| `closeOnEscape` | `boolean` | `true` | Close panel when pressing Escape key |
| `className` | `string` | `''` | Additional CSS classes |

### Position Options

- `'start'` - Slides from the left (in LTR) or right (in RTL)
- `'end'` - Slides from the right (in LTR) or left (in RTL)
- `'top'` - Slides from the top
- `'bottom'` - Slides from the bottom

### Animation Mode Options

- `'slide'` - Panel slides over content (default)
- `'push'` - Panel pushes content aside
- `'none'` - No animation, instant show/hide

## Examples

### Navigation Menu

```jsx
function NavigationPanel() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: 'Home' },
    { href: '/projects', label: 'Projects', icon: 'Folder' },
    { href: '/team', label: 'Team', icon: 'Users' },
    { href: '/settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <>
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open navigation menu"
      >
        <Icon name="Menu" />
      </button>

      <EdgePanel
        title="Navigation"
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        position="start"
        mode="slide"
      >
        <nav className="main-navigation">
          <ul>
            {menuItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </EdgePanel>
    </>
  );
}
```

### Filter Panel

```jsx
function FilterPanel({ filters, onFiltersChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <button 
        className="filter-toggle"
        onClick={() => setIsFilterOpen(true)}
      >
        <Icon name="Filter" />
        Filters
      </button>

      <EdgePanel
        title="Filter Results"
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        position="end"
        mode="slide"
      >
        <div className="filter-content">
          <div className="filter-group">
            <label>Category</label>
            <select 
              value={filters.category} 
              onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <input 
              type="range" 
              min="0" 
              max="1000"
              value={filters.maxPrice}
              onChange={(e) => onFiltersChange({ ...filters, maxPrice: e.target.value })}
            />
            <span>Up to ${filters.maxPrice}</span>
          </div>

          <div className="filter-actions">
            <button onClick={() => onFiltersChange({})}>
              Clear All
            </button>
          </div>
        </div>
      </EdgePanel>
    </>
  );
}
```

### Settings Panel

```jsx
function SettingsPanel() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <button 
        className="settings-button"
        onClick={() => setIsSettingsOpen(true)}
      >
        <Icon name="Settings" />
      </button>

      <EdgePanel
        title="Settings"
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        position="end"
        mode="slide"
      >
        <div className="settings-content">
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              Enable Notifications
            </label>
          </div>

          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              />
              Dark Mode
            </label>
          </div>

          <div className="setting-item">
            <label>Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </EdgePanel>
    </>
  );
}
```

### Different Positions

```jsx
function MultiPositionExample() {
  const [panels, setPanels] = useState({
    start: false,
    end: false,
    top: false,
    bottom: false
  });

  const openPanel = (position) => {
    setPanels(prev => ({ ...prev, [position]: true }));
  };

  const closePanel = (position) => {
    setPanels(prev => ({ ...prev, [position]: false }));
  };

  return (
    <div className="panel-demo">
      <div className="panel-triggers">
        <button onClick={() => openPanel('start')}>Left Panel</button>
        <button onClick={() => openPanel('end')}>Right Panel</button>
        <button onClick={() => openPanel('top')}>Top Panel</button>
        <button onClick={() => openPanel('bottom')}>Bottom Panel</button>
      </div>

      <EdgePanel
        title="Left Panel"
        position="start"
        isOpen={panels.start}
        onOpenChange={(open) => !open && closePanel('start')}
      >
        <p>Content from the left side</p>
      </EdgePanel>

      <EdgePanel
        title="Right Panel"
        position="end"
        isOpen={panels.end}
        onOpenChange={(open) => !open && closePanel('end')}
      >
        <p>Content from the right side</p>
      </EdgePanel>

      <EdgePanel
        title="Top Panel"
        position="top"
        isOpen={panels.top}
        onOpenChange={(open) => !open && closePanel('top')}
      >
        <p>Content from the top</p>
      </EdgePanel>

      <EdgePanel
        title="Bottom Panel"
        position="bottom"
        isOpen={panels.bottom}
        onOpenChange={(open) => !open && closePanel('bottom')}
      >
        <p>Content from the bottom</p>
      </EdgePanel>
    </div>
  );
}
```

### Animation Modes

```jsx
function AnimationModeExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('slide');

  return (
    <div>
      <div className="mode-selector">
        <label>Animation Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="slide">Slide</option>
          <option value="push">Push</option>
          <option value="none">None</option>
        </select>
      </div>

      <button onClick={() => setIsOpen(true)}>
        Open Panel ({mode} mode)
      </button>

      <EdgePanel
        title={`Panel - ${mode} animation`}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        mode={mode}
        position="start"
      >
        <p>This panel uses the "{mode}" animation mode.</p>
      </EdgePanel>
    </div>
  );
}
```

### Custom Backdrop Behavior

```jsx
function CustomBackdropExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    backdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true
  });

  return (
    <div>
      <div className="config-options">
        <label>
          <input
            type="checkbox"
            checked={config.backdrop}
            onChange={(e) => setConfig(prev => ({ ...prev, backdrop: e.target.checked }))}
          />
          Show Backdrop
        </label>

        <label>
          <input
            type="checkbox"
            checked={config.closeOnBackdropClick}
            onChange={(e) => setConfig(prev => ({ ...prev, closeOnBackdropClick: e.target.checked }))}
          />
          Close on Backdrop Click
        </label>

        <label>
          <input
            type="checkbox"
            checked={config.closeOnEscape}
            onChange={(e) => setConfig(prev => ({ ...prev, closeOnEscape: e.target.checked }))}
          />
          Close on Escape
        </label>
      </div>

      <button onClick={() => setIsOpen(true)}>
        Open Configurable Panel
      </button>

      <EdgePanel
        title="Configurable Panel"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        backdrop={config.backdrop}
        closeOnBackdropClick={config.closeOnBackdropClick}
        closeOnEscape={config.closeOnEscape}
      >
        <div className="panel-config-info">
          <p>Current configuration:</p>
          <ul>
            <li>Backdrop: {config.backdrop ? 'On' : 'Off'}</li>
            <li>Close on backdrop click: {config.closeOnBackdropClick ? 'On' : 'Off'}</li>
            <li>Close on escape: {config.closeOnEscape ? 'On' : 'Off'}</li>
          </ul>
        </div>
      </EdgePanel>
    </div>
  );
}
```

### Responsive Panel

```jsx
function ResponsivePanel() {
  const [isDesktopPanelOpen, setIsDesktopPanelOpen] = useState(false);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openPanel = () => {
    if (isMobile) {
      setIsMobilePanelOpen(true);
    } else {
      setIsDesktopPanelOpen(true);
    }
  };

  return (
    <>
      <button onClick={openPanel}>
        Open {isMobile ? 'Mobile' : 'Desktop'} Panel
      </button>

      {/* Desktop panel - slides from start */}
      <EdgePanel
        title="Desktop Navigation"
        isOpen={isDesktopPanelOpen}
        onOpenChange={setIsDesktopPanelOpen}
        position="start"
        mode="slide"
      >
        <nav className="desktop-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </EdgePanel>

      {/* Mobile panel - slides from bottom */}
      <EdgePanel
        title="Mobile Menu"
        isOpen={isMobilePanelOpen}
        onOpenChange={setIsMobilePanelOpen}
        position="bottom"
        mode="slide"
      >
        <nav className="mobile-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </EdgePanel>
    </>
  );
}
```

## Accessibility

The EdgePanel component follows WCAG accessibility guidelines:

### Keyboard Support

- **Escape**: Closes the panel (when `closeOnEscape` is true)
- **Tab**: Moves focus through panel content
- **Shift + Tab**: Moves focus backward through panel content
- Focus is trapped within the panel when open
- Focus returns to trigger element when closed

### ARIA Attributes

- `role="dialog"` on the panel container
- `aria-modal="true"` when panel is open
- `aria-labelledby` linking to the panel title
- `aria-label` on the close button
- `aria-expanded` on trigger elements

### Focus Management

```jsx
function AccessiblePanel() {
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    
    // Return focus to trigger when panel closes
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <>
      <button 
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="accessible-panel"
      >
        Open Panel
      </button>

      <EdgePanel
        id="accessible-panel"
        title="Accessible Panel"
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        aria-describedby="panel-description"
      >
        <p id="panel-description">
          This panel demonstrates proper accessibility features
        </p>
      </EdgePanel>
    </>
  );
}
```

### Best Practices

1. **Always provide a clear title** for the panel
2. **Use semantic HTML** within panel content
3. **Ensure sufficient color contrast** for all text
4. **Provide alternative ways** to access panel content
5. **Test with keyboard navigation** and screen readers

## Styling

### CSS Custom Properties

The EdgePanel component uses CSS custom properties for theming:

```css
:root {
  /* Panel container */
  --atomix-edge-panel-bg: var(--atomix-white);
  --atomix-edge-panel-border: 1px solid var(--atomix-border-color);
  --atomix-edge-panel-border-radius: 0;
  --atomix-edge-panel-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --atomix-edge-panel-width: 320px;
  --atomix-edge-panel-height: 240px;

  /* Panel backdrop */
  --atomix-edge-panel-backdrop-bg: rgba(0, 0, 0, 0.5);
  --atomix-edge-panel-backdrop-blur: blur(2px);

  /* Panel header */
  --atomix-edge-panel-header-bg: var(--atomix-gray-50);
  --atomix-edge-panel-header-border: 1px solid var(--atomix-border-color);
  --atomix-edge-panel-header-padding: 1rem;

  /* Panel body */
  --atomix-edge-panel-body-padding: 1rem;

  /* Animation timing */
  --atomix-edge-panel-transition: transform 0.3s ease, opacity 0.3s ease;
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base panel class */
.c-edge-panel {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.c-edge-panel.is-open {
  pointer-events: auto;
}

/* Backdrop */
.c-edge-panel__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--atomix-edge-panel-backdrop-bg);
  backdrop-filter: var(--atomix-edge-panel-backdrop-blur);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.c-edge-panel.is-open .c-edge-panel__backdrop {
  opacity: 1;
}

/* Panel container */
.c-edge-panel__container {
  position: absolute;
  background: var(--atomix-edge-panel-bg);
  border: var(--atomix-edge-panel-border);
  box-shadow: var(--atomix-edge-panel-shadow);
  transition: var(--atomix-edge-panel-transition);
}

/* Position modifiers */
.c-edge-panel--start .c-edge-panel__container {
  top: 0;
  left: 0;
  height: 100%;
  width: var(--atomix-edge-panel-width);
  transform: translateX(-100%);
  border-radius: 0 var(--atomix-edge-panel-border-radius) var(--atomix-edge-panel-border-radius) 0;
}

.c-edge-panel--start.is-open .c-edge-panel__container {
  transform: translateX(0);
}

.c-edge-panel--end .c-edge-panel__container {
  top: 0;
  right: 0;
  height: 100%;
  width: var(--atomix-edge-panel-width);
  transform: translateX(100%);
  border-radius: var(--atomix-edge-panel-border-radius) 0 0 var(--atomix-edge-panel-border-radius);
}

.c-edge-panel--end.is-open .c-edge-panel__container {
  transform: translateX(0);
}

.c-edge-panel--top .c-edge-panel__container {
  top: 0;
  left: 0;
  width: 100%;
  height: var(--atomix-edge-panel-height);
  transform: translateY(-100%);
  border-radius: 0 0 var(--atomix-edge-panel-border-radius) var(--atomix-edge-panel-border-radius);
}

.c-edge-panel--top.is-open .c-edge-panel__container {
  transform: translateY(0);
}

.c-edge-panel--bottom .c-edge-panel__container {
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--atomix-edge-panel-height);
  transform: translateY(100%);
  border-radius: var(--atomix-edge-panel-border-radius) var(--atomix-edge-panel-border-radius) 0 0;
}

.c-edge-panel--bottom.is-open .c-edge-panel__container {
  transform: translateY(0);
}

/* Push mode */
.c-edge-panel--push .c-edge-panel__container {
  position: relative;
}

.c-edge-panel--push.is-open + .main-content {
  transform: translateX(var(--atomix-edge-panel-width));
}

/* Panel header */
.c-edge-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--atomix-edge-panel-header-padding);
  background: var(--atomix-edge-panel-header-bg);
  border-bottom: var(--atomix-edge-panel-header-border);
}

.c-edge-panel__header h4 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

/* Close button */
.c-edge-panel__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--atomix-border-radius);
  transition: background-color 0.2s ease;
}

.c-edge-panel__close:hover {
  background: var(--atomix-gray-100);
}

/* Panel body */
.c-edge-panel__body {
  padding: var(--atomix-edge-panel-body-padding);
  overflow-y: auto;
  height: calc(100% - 4rem); /* Adjust based on header height */
}
```

### Customization Examples

```css
/* Custom panel theme */
.c-edge-panel--custom {
  --atomix-edge-panel-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --atomix-edge-panel-header-bg: rgba(255, 255, 255, 0.1);
  --atomix-edge-panel-width: 400px;
}

.c-edge-panel--custom .c-edge-panel__header h4 {
  color: white;
}

/* Narrow mobile panel */
.c-edge-panel--mobile {
  --atomix-edge-panel-width: 280px;
}

@media (max-width: 768px) {
  .c-edge-panel--mobile {
    --atomix-edge-panel-width: 100vw;
  }
}

/* Glassmorphism effect */
.c-edge-panel--glass .c-edge-panel__container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Custom animation */
.c-edge-panel--bounce .c-edge-panel__container {
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Common Patterns

### Mobile Navigation

```jsx
function MobileNavigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  const navItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/products', label: 'Products', icon: 'Package' },
    { path: '/services', label: 'Services', icon: 'Tool' },
    { path: '/contact', label: 'Contact', icon: 'Mail' }
  ];

  return (
    <>
      {/* Mobile header with hamburger menu */}
      <header className="mobile-header">
        <div className="brand">My App</div>
        <button
          className="hamburger"
          onClick={() => setIsNavOpen(true)}
          aria-label="Open navigation menu"
        >
          <Icon name="Menu" />
        </button>
      </header>

      {/* Navigation panel */}
      <EdgePanel
        title="Navigation"
        isOpen={isNavOpen}
        onOpenChange={setIsNavOpen}
        position="start"
        mode="slide"
      >
        <nav className="mobile-nav">
          <ul>
            {navItems.map(item => (
              <li key={item.path}>
                <a 
                  href={item.path}
                  className={`nav-link ${currentPath === item.path ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPath(item.path);
                    setIsNavOpen(false);
                  }}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </EdgePanel>
    </>
  );
}
```

### Shopping Cart Sidebar

```jsx
function ShoppingCartSidebar({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const totalPrice = cartItems.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  return (
    <>
      <button 
        className="cart-trigger"
        onClick={() => setIsCartOpen(true)}
      >
        <Icon name="ShoppingCart" />
        <span className="cart-count">{cartItems.length}</span>
      </button>

      <EdgePanel
        title="Shopping Cart"
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        position="end"
        mode="slide"
      >
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <Icon name="ShoppingCart" size="lg" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>${item.price}</p>
                      <div className="quantity-controls">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Icon name="Trash" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="total">
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </EdgePanel>
    </>
  );
}
```

### Notification Center

```jsx
function NotificationCenter() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'Welcome to the platform!', time: '2 min ago' },
    { id: 2, type: 'success', message: 'Profile updated successfully', time: '1 hour ago' },
    { id: 3, type: 'warning', message: 'Please verify your email', time: '2 hours ago' }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <>
      <button 
        className="notifications-trigger"
        onClick={() => setIsNotificationsOpen(true)}
      >
        <Icon name="Bell" />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      <EdgePanel
        title="Notifications"
        isOpen={isNotificationsOpen}
        onOpenChange={setIsNotificationsOpen}
        position="end"
        mode="slide"
      >
        <div className="notifications-content">
          <div className="notifications-header">
            <span>{notifications.length} notifications</span>
            <button onClick={clearAll}>Clear All</button>
          </div>

          <div className="notifications-list">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon">
                  <Icon name={notification.type === 'info' ? 'Info' : 
                            notification.type === 'success' ? 'CheckCircle' : 
                            notification.type === 'warning' ? 'AlertTriangle' : 'AlertCircle'} />
                </div>
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                {!notification.read && (
                  <div className="unread-indicator" />
                )}
              </div>
            ))}
          </div>
        </div>
      </EdgePanel>
    </>
  );
}
```

## Performance Considerations

1. **Portal rendering**: Use React portals for better performance with multiple panels
2. **Animation optimization**: Use CSS transforms instead of changing layout properties
3. **Event delegation**: Minimize event listeners on backdrop elements
4. **Content lazy loading**: Load panel content only when needed

```jsx
// Optimized panel with lazy content loading
const LazyEdgePanel = ({ isOpen, children, ...props }) => {
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);

  return (
    <EdgePanel isOpen={isOpen} {...props}>
      {hasBeenOpened ? children : null}
    </EdgePanel>
  );
};
```

## Integration Examples

### With React Router

```jsx
import { useNavigate, useLocation } from 'react-router-dom';

function RouterIntegratedPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/settings', label: 'Settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <EdgePanel
      title="Navigation"
      isOpen={isMenuOpen}
      onOpenChange={setIsMenuOpen}
      position="start"
    >
      <nav>
        <ul>
          {menuItems.map(item => (
            <li key={item.path}>
              <button
                className={location.pathname === item.path ? 'active' : ''}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </EdgePanel>
  );
}
```

### With State Management

```jsx
// Redux integration
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, closeSidebar } from './store/uiSlice';

function ReduxEdgePanel() {
  const dispatch = useDispatch();
  const { isSidebarOpen, sidebarContent } = useSelector(state => state.ui);

  return (
    <EdgePanel
      title="Redux Panel"
      isOpen={isSidebarOpen}
      onOpenChange={(open) => open ? null : dispatch(closeSidebar())}
      position="start"
    >
      {sidebarContent}
    </EdgePanel>
  );
}
```

### With Form State

```jsx
function FormEdgePanel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmClose = confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    setIsFormOpen(false);
    setHasUnsavedChanges(false);
  };

  return (
    <EdgePanel
      title="Edit Profile"
      isOpen={isFormOpen}
      onOpenChange={(open) => !open && handleClose()}
      closeOnBackdropClick={!hasUnsavedChanges}
      closeOnEscape={!hasUnsavedChanges}
      position="end"
    >
      <form onChange={() => setHasUnsavedChanges(true)}>
        {/* Form content */}
      </form>
    </EdgePanel>
  );
}
```

## Browser Support

The EdgePanel component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

For older browser support, ensure you have appropriate polyfills for:
- CSS Transforms
- CSS Transitions
- Focus management APIs

## Related Components

- **[Modal](./modal.md)** - Alternative overlay component for centered content
- **[Dropdown](./dropdown.md)** - For smaller contextual overlays
- **[Tooltip](./tooltip.md)** - For brief informational overlays
- **[Navigation](./navigation.md)** - Often used within edge panels
- **[Button](./button.md)** - Used for panel triggers and actions

## Migration Guide

### From Custom Sidebar

```jsx
// Before (custom sidebar)
<div className={`sidebar ${isOpen ? 'open' : ''}`}>
  <div className="sidebar-header">
    <h3>Menu</h3>
    <button onClick={closeSidebar}>×</button>
  </div>
  <div className="sidebar-content">
    {content}
  </div>
</div>

// After (Atomix EdgePanel)
<EdgePanel
  title="Menu"
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  position="start"
>
  {content}
</EdgePanel>
```

### From Native Details Element

```jsx
// Before (details/summary)
<details open={isOpen}>
  <summary>Panel Title</summary>
  <div className="panel-content">
    {content}
  </div>
</details>

// After (Atomix EdgePanel)
<EdgePanel
  title="Panel Title"
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  inline={true}
>
  {content}
</EdgePanel>
```
