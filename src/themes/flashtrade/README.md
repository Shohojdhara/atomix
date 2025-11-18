# Flash Trade Theme

> Dark crypto perpetuals trading platform theme for the Atomix Design System

## Overview

The Flash Trade theme brings the sleek, professional aesthetic of modern cryptocurrency trading platforms to the Atomix Design System. It features a dark interface optimized for financial data display, high contrast for trading information, and glass morphism effects that create a modern, immersive trading experience.

## Features

- 🎨 **Trading-Focused Color Palette**: Cyan/green for profits, red for losses, optimized for financial data
- 🌑 **Dark Interface**: Deep blacks and grays for reduced eye strain during extended trading sessions
- ✨ **Glass Morphism**: Modern glass effects for cards, modals, and navigation
- 📊 **High Contrast**: Optimized contrast ratios for financial data readability
- ⚡ **Fast Animations**: Quick, responsive transitions for real-time trading data
- 🔧 **AtomixGlass Integration**: Seamless compatibility with existing AtomixGlass components
- 📱 **Responsive Design**: Optimized for desktop and mobile trading interfaces

## Installation

The Flash Trade theme is included in the Atomix Design System. To use it in your project:

```scss
// Import the Flash Trade theme
@use '@shohojdhara/atomix/themes/flashtrade' as flashtrade;
```

Or use the compiled CSS:

```html
<link rel="stylesheet" href="@shohojdhara/atomix/dist/themes/flashtrade.css">
```

## Usage

### Basic Implementation

Apply the theme using the data attribute:

```html
<div data-theme="flashtrade">
  <!-- Your trading interface here -->
</div>
```

### Trading Interface Components

The theme enhances components with trading platform styling:

```html
<!-- Trading card with glass effect -->
<div class="atomix-glass">
  <div class="atomix-glass__content">
    <h2>SOL/USDC</h2>
    <p class="price-positive">$156.66 (+3.56%)</p>
    <button class="btn btn-primary">Trade</button>
  </div>
</div>
```

### Market Cards

```html
<div class="atomix-glass-card">
  <div class="atomix-glass-card__header">
    <h3>Bitcoin</h3>
    <span class="badge badge-success">+2.5%</span>
  </div>
  <div class="atomix-glass-card__body">
    <p class="price">$43,250.00</p>
    <p class="volume">24h Volume: $5.28M</p>
  </div>
</div>
```

### Trading Dashboard

```html
<div class="trading-dashboard atomix-glass">
  <div class="chart-section">
    <!-- Trading chart -->
  </div>
  <div class="order-panel atomix-glass">
    <h3>Place Order</h3>
    <form>
      <input type="number" placeholder="Amount" />
      <select>
        <option>Market</option>
        <option>Limit</option>
      </select>
      <button class="btn btn-primary">Buy</button>
      <button class="btn btn-danger">Sell</button>
    </form>
  </div>
</div>
```

## Color System

### Primary Colors

The Flash Trade theme uses cyan/green as the primary color for trading and positive indicators:

```scss
// CSS Custom Properties
:root {
  --flashtrade-primary-1: #001a14;   // Darkest cyan
  --flashtrade-primary-6: #00ffc8;  // Flash Trade brand cyan
  --flashtrade-primary-10: #66fff0; // Lightest cyan
}
```

### Trading Colors

```scss
:root {
  // Positive/Profit colors (green)
  --flashtrade-green-6: #00ff80;    // Profit indicator
  --flashtrade-green-7: #1aff8c;    // Hover state
  
  // Negative/Loss colors (red)
  --flashtrade-red-6: #ff1a1a;      // Loss indicator
  --flashtrade-red-7: #ff3333;      // Hover state
  
  // Warning colors (yellow)
  --flashtrade-yellow-6: #ffff00;   // Warning/Pending
}
```

### Background Colors

```scss
:root {
  // Dark backgrounds for trading interface
  --flashtrade-gray-1: #0a0a0a;      // Deepest background
  --flashtrade-gray-3: #1e1e1e;     // Card backgrounds
  --flashtrade-gray-5: #323232;     // Elevated surfaces
}
```

## Typography

The theme uses Inter font family optimized for financial data:

```scss
// Font families
$font-family-base: ('Inter', -apple-system, BlinkMacSystemFont, ...);

// Trading-optimized scaling
$h1-font-size: 3rem;    // Market names
$h2-font-size: 2.25rem; // Section titles
$h3-font-size: 1.75rem; // Card titles
```

## Component Styling

### Buttons

```scss
// Primary button (buy/long actions)
.btn-primary {
  background: linear-gradient(135deg, var(--flashtrade-primary-6), var(--flashtrade-primary-7));
  color: var(--flashtrade-black);
}

// Danger button (sell/short actions)
.btn-danger {
  background: linear-gradient(135deg, var(--flashtrade-red-6), var(--flashtrade-red-7));
  color: var(--flashtrade-white);
}
```

### Badges

```scss
// Profit badge
.badge-success {
  background-color: rgba(0, 255, 128, 0.2);
  color: var(--flashtrade-green-6);
  border: 1px solid var(--flashtrade-green-6);
}

// Loss badge
.badge-danger {
  background-color: rgba(255, 26, 26, 0.2);
  color: var(--flashtrade-red-6);
  border: 1px solid var(--flashtrade-red-6);
}
```

### Cards

```scss
.market-card {
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(12px) saturate(1.8);
  border: 1px solid rgba(0, 255, 200, 0.1);
  border-radius: 12px;
}
```

## Performance Optimization

### Hardware Acceleration

The theme automatically enables hardware acceleration for smooth animations:

```scss
.trading-card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}
```

### Responsive Behavior

Trading interface optimizations for mobile:

```scss
@media (max-width: 768px) {
  .trading-dashboard {
    backdrop-filter: blur(8px); // Reduced complexity
  }
}
```

### Reduced Motion Support

The theme respects user preferences:

```scss
@media (prefers-reduced-motion: reduce) {
  .price-animation {
    transition: none;
  }
}
```

## Customization

### Theme Variables

Override theme variables to customize the appearance:

```scss
@use '@shohojdhara/atomix/themes/flashtrade' with (
  $primary-6: #00ffaa, // Custom primary color
  $background-transparency: 0.15
);
```

### Custom Trading Colors

```scss
:root {
  --flashtrade-custom-profit: #00ff80;
  --flashtrade-custom-loss: #ff1a1a;
  --flashtrade-custom-warning: #ffff00;
}
```

## Browser Support

The Flash Trade theme requires modern browsers with support for:

- `backdrop-filter` (CSS Backdrop Filter)
- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox
- CSS Transforms and Transitions

### Fallbacks

For browsers without `backdrop-filter` support:

```scss
.atomix-glass {
  background-color: rgba(30, 30, 30, 0.95); // Fallback
  backdrop-filter: blur(12px); // Enhanced
}
```

## Best Practices

### Trading Interface

1. **Data Readability**: Ensure high contrast for price data and percentages
2. **Color Coding**: Use green for profits, red for losses consistently
3. **Real-time Updates**: Use fast transitions for price changes
4. **Information Hierarchy**: Use different glass depths for important data

### Performance

1. **Limit Glass Layers**: Avoid deep nesting of glass elements
2. **Optimize Animations**: Use transform and opacity for smooth performance
3. **Lazy Load**: Load charts and heavy components on demand

### Accessibility

1. **Contrast**: Maintain WCAG AA contrast ratios for all text
2. **Motion**: Respect `prefers-reduced-motion` settings
3. **Focus**: Clear focus indicators for keyboard navigation
4. **Color Blindness**: Don't rely solely on color for information

## Examples

### Market List

```html
<div class="markets-list">
  <div class="market-card atomix-glass">
    <div class="market-header">
      <h3>SOL/USDC</h3>
      <span class="badge badge-success">+3.56%</span>
    </div>
    <div class="market-price">$156.66</div>
    <div class="market-volume">24h: $5.28M</div>
  </div>
</div>
```

### Trading Panel

```html
<div class="trading-panel atomix-glass">
  <div class="order-type">
    <button class="btn active">Market</button>
    <button class="btn">Limit</button>
  </div>
  <div class="order-form">
    <input type="number" placeholder="Amount" />
    <div class="leverage-selector">
      <span>Leverage: 1x - 100x</span>
    </div>
    <div class="order-actions">
      <button class="btn btn-primary">Long</button>
      <button class="btn btn-danger">Short</button>
    </div>
  </div>
</div>
```

### Price Chart

```html
<div class="chart-container atomix-glass">
  <div class="chart-header">
    <h2>SOL/USDC</h2>
    <div class="price-info">
      <span class="current-price">$156.66</span>
      <span class="price-change positive">+3.56%</span>
    </div>
  </div>
  <div class="chart-body">
    <!-- TradingView or custom chart -->
  </div>
</div>
```

## Contributing

When contributing to the Flash Trade theme:

1. Follow the existing SCSS architecture
2. Maintain high contrast for financial data
3. Test across different browsers and devices
4. Ensure accessibility compliance
5. Update documentation for new features
6. Maintain performance optimization

## License

The Flash Trade theme is part of the Atomix Design System and follows the same licensing terms.

