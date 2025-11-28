# Flash Trade Theme

> Professional dark crypto perpetuals trading platform theme for the Atomix Design System, inspired by [flash.trade](https://www.flash.trade)

## Overview

The Flash Trade theme brings the sleek, professional aesthetic of the Flash Trade cryptocurrency perpetuals trading platform to the Atomix Design System. Carefully designed to match the actual flash.trade website, it features an ultra-dark interface optimized for financial data display, bright cyan accents for brand consistency, and sophisticated glass morphism effects that create a modern, immersive trading experience.

This theme has been enhanced based on the real Flash Trade website design, ensuring authentic styling and professional trading platform aesthetics.

## Features

- 🎨 **Authentic Flash Trade Design**: Color palette and styling directly inspired by flash.trade
- 💎 **Bright Cyan Primary**: #06b6d4 cyan matching the Flash Trade brand
- 🌑 **Ultra-Dark Interface**: Deep blacks (#050505, #0a0a0a) for reduced eye strain during extended trading
- 📊 **Trading Color System**: Green (#22c55e) for long/profit, Red (#ef4444) for short/loss
- ✨ **Glass Morphism**: Modern glass effects with backdrop blur for cards, modals, and navigation
- 🔤 **Inter Typography**: Professional Inter font family optimized for financial data
- ⚡ **Fast Animations**: Quick, responsive transitions (0.15s) for real-time trading data
- 🧭 **Professional Navbar**: Glass morphism navbar with asset selector bar
- 💳 **Trading Cards**: Market cards with hover effects and glass backgrounds
- 🎯 **Action Buttons**: Comprehensive button styles for long/short trading actions
- 🏷️ **Price Badges**: Profit/loss badges with glow effects and proper color coding
- 📱 **Responsive Design**: Mobile-first design optimized for all screen sizes
- 🔧 **AtomixGlass Integration**: Seamless compatibility with existing AtomixGlass components

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

The Flash Trade theme uses bright cyan as the primary color, matching the actual flash.trade brand:

```scss
// CSS Custom Properties
:root {
  --flashtrade-primary-1: #051414;   // Darkest cyan
  --flashtrade-primary-6: #06b6d4;   // Flash Trade brand cyan
  --flashtrade-primary-7: #22d3ee;   // Bright cyan
  --flashtrade-primary-10: #cffafe;  // Lightest cyan
}
```

### Trading Colors

```scss
:root {
  // Long/Profit colors (green) - Flash Trade style
  --flashtrade-green-6: #22c55e;    // Profit indicator
  --flashtrade-green-7: #4ade80;    // Hover state
  
  // Short/Loss colors (red) - Flash Trade style
  --flashtrade-red-6: #ef4444;      // Loss indicator
  --flashtrade-red-7: #f87171;      // Hover state
  
  // Warning colors (yellow) - for leverage and pending
  --flashtrade-yellow-6: #eab308;   // Warning/Pending
  --flashtrade-yellow-7: #facc15;   // Hover state
}
```

### Background Colors

```scss
:root {
  // Ultra-dark backgrounds for trading interface
  --flashtrade-gray-1: #050505;     // Deepest background
  --flashtrade-gray-2: #0a0a0a;     // Main background
  --flashtrade-gray-3: #141414;     // Card backgrounds
  --flashtrade-gray-4: #1e1e1e;     // Elevated surfaces
  --flashtrade-gray-5: #2a2a2a;     // Interactive elements
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

