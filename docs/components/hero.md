# Hero

The Hero component creates impactful banner sections for landing pages and feature highlights. It supports various layouts, background options including images and videos, and flexible content positioning.

## Overview

The Hero component is designed to make a strong first impression on your users. It provides a flexible foundation for creating engaging landing page headers, product showcases, and call-to-action sections with support for background images, videos, parallax effects, and responsive layouts.

## Props API

### HeroProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Main hero title text |
| `subtitle` | `string` | `undefined` | Optional subtitle text |
| `text` | `string` | `undefined` | Additional descriptive text |
| `imageSrc` | `string` | `undefined` | Foreground image source URL |
| `imageAlt` | `string` | `'Hero image'` | Alt text for the hero image |
| `alignment` | `HeroAlignment` | `'left'` | Content alignment (`'left'`, `'center'`, `'right'`) |
| `backgroundImageSrc` | `string` | `undefined` | Background image source URL |
| `showOverlay` | `boolean` | `true` | Whether to show background overlay |
| `fullViewportHeight` | `boolean` | `false` | Whether hero should take full viewport height |
| `actions` | `ReactNode` | `undefined` | Action buttons or elements |
| `imageColSize` | `number` | `7` | Grid column size for image (1-12) |
| `contentColSize` | `number` | `5` | Grid column size for content (1-12) |
| `contentWidth` | `string` | `undefined` | Custom width for hero content |
| `parallax` | `boolean` | `false` | Enable parallax effect on background |
| `parallaxIntensity` | `number` | `0.5` | Parallax effect intensity (0-1) |
| `videoBackground` | `string` | `undefined` | Video background source URL |
| `videoOptions` | `VideoOptions` | `{}` | Video playback options |
| `className` | `string` | `''` | Additional CSS classes |

### VideoOptions Interface

```typescript
interface VideoOptions {
  autoplay?: boolean;    // Default: true
  loop?: boolean;        // Default: true
  muted?: boolean;       // Default: true
  posterUrl?: string;    // Video poster image
}
```

### HeroAlignment Options

- `'left'` - Content aligned to the left with image on the right
- `'center'` - Centered content with optional image below
- `'right'` - Content aligned to the right with image on the left

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { Hero, Button } from '@shohojdhara/atomix';

function LandingPage() {
  return (
    <Hero
      title="Build Amazing Interfaces"
      subtitle="Welcome to Atomix"
      text="Create beautiful, accessible, and performant user interfaces with our comprehensive design system."
      actions={
        <div className="hero-actions">
          <Button variant="primary" label="Get Started" />
          <Button variant="outline-primary" label="Learn More" />
        </div>
      }
    />
  );
}
```

### Hero with Image

```jsx
function ProductHero() {
  return (
    <Hero
      title="Revolutionary Design Tool"
      subtitle="Design System 2.0"
      text="Streamline your design workflow with our next-generation component library."
      imageSrc="/images/product-showcase.png"
      imageAlt="Product interface screenshot"
      alignment="left"
      actions={
        <Button variant="primary" size="lg" label="Start Free Trial" />
      }
    />
  );
}
```

### Hero with Background Image

```jsx
function BackgroundHero() {
  return (
    <Hero
      title="Explore the Possibilities"
      subtitle="Innovation Starts Here"
      text="Join thousands of developers building the future of web applications."
      backgroundImageSrc="/images/hero-background.jpg"
      showOverlay={true}
      fullViewportHeight={true}
      alignment="center"
      actions={
        <div className="hero-button-group">
          <Button variant="primary" label="Get Started" />
          <Button variant="link" label="Watch Demo" />
        </div>
      }
    />
  );
}
```

### Hero with Video Background

```jsx
function VideoHero() {
  return (
    <Hero
      title="Experience the Future"
      subtitle="Next-Gen Platform"
      text="See our platform in action with this immersive video demonstration."
      videoBackground="/videos/hero-background.mp4"
      videoOptions={{
        autoplay: true,
        loop: true,
        muted: true,
        posterUrl: "/images/video-poster.jpg"
      }}
      showOverlay={true}
      alignment="center"
      fullViewportHeight={true}
      actions={
        <Button variant="primary" size="lg" label="Learn More" />
      }
    />
  );
}
```

### Hero with Parallax Effect

```jsx
function ParallaxHero() {
  return (
    <Hero
      title="Smooth Scrolling Experience"
      subtitle="Modern Web Design"
      text="Create engaging user experiences with smooth parallax effects."
      backgroundImageSrc="/images/parallax-background.jpg"
      parallax={true}
      parallaxIntensity={0.3}
      showOverlay={true}
      alignment="center"
      actions={
        <Button variant="outline-primary" label="Explore Features" />
      }
    />
  );
}
```

### Advanced Layout Configuration

```jsx
function CustomLayoutHero() {
  return (
    <Hero
      title="Flexible Grid Layout"
      subtitle="Customizable Columns"
      text="Adjust the grid layout to fit your design needs with custom column sizes."
      imageSrc="/images/layout-example.png"
      imageAlt="Layout configuration example"
      alignment="right"
      imageColSize={6}
      contentColSize={6}
      contentWidth="800px"
      actions={
        <div className="flex gap-4">
          <Button variant="primary" label="Try It Now" />
          <Button variant="secondary" label="Documentation" />
        </div>
      }
    />
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Initialize hero component
const heroContainer = document.getElementById('landing-hero');

const hero = new Atomix.Hero(heroContainer, {
  title: 'Welcome to Our Platform',
  subtitle: 'Getting Started',
  text: 'Build amazing applications with our comprehensive toolkit.',
  backgroundImageSrc: '/images/hero-bg.jpg',
  showOverlay: true,
  alignment: 'center',
  fullViewportHeight: true
});

// Update hero content dynamically
hero.updateContent({
  title: 'Updated Hero Title',
  text: 'New description text'
});
```

### HTML with Data Attributes

```html
<!-- Basic hero -->
<div 
  class="c-hero c-hero--center" 
  data-atomix="hero"
  data-title="Welcome to Atomix"
  data-subtitle="Design System"
  data-text="Build beautiful interfaces with ease"
  data-alignment="center">
  
  <div class="c-hero__container o-container">
    <div class="c-hero__content">
      <p class="c-hero__subtitle">Design System</p>
      <h1 class="c-hero__title">Welcome to Atomix</h1>
      <p class="c-hero__text">Build beautiful interfaces with ease</p>
      <div class="c-hero__actions">
        <button class="c-button c-button--primary">Get Started</button>
      </div>
    </div>
  </div>
</div>

<!-- Hero with background image -->
<div 
  class="c-hero c-hero--center c-hero--full-height" 
  data-atomix="hero"
  style="background-image: url('/images/hero-bg.jpg');">
  
  <div class="c-hero__bg">
    <img src="/images/hero-bg.jpg" alt="Background" class="c-hero__bg-image" />
    <div class="c-hero__overlay"></div>
  </div>
  
  <div class="c-hero__container o-container">
    <div class="c-hero__content">
      <h1 class="c-hero__title">Hero Title</h1>
      <p class="c-hero__text">Hero description text</p>
    </div>
  </div>
</div>
```

## Styling

### CSS Classes

The Hero component uses the following CSS class structure:

```css
/* Base hero container */
.c-hero {
  /* Base hero styles */
}

/* Layout modifiers */
.c-hero--left { /* Left-aligned content */ }
.c-hero--center { /* Center-aligned content */ }
.c-hero--right { /* Right-aligned content */ }
.c-hero--full-height { /* Full viewport height */ }
.c-hero--grid { /* Grid layout enabled */ }

/* Background elements */
.c-hero__bg { /* Background container */ }
.c-hero__bg-image { /* Background image */ }
.c-hero__video { /* Background video */ }
.c-hero__overlay { /* Background overlay */ }

/* Content elements */
.c-hero__container { /* Content container */ }
.c-hero__grid { /* Grid wrapper */ }
.c-hero__content { /* Content wrapper */ }
.c-hero__subtitle { /* Subtitle text */ }
.c-hero__title { /* Main title */ }
.c-hero__text { /* Description text */ }
.c-hero__actions { /* Action buttons */ }

/* Image elements */
.c-hero__image-wrapper { /* Image container */ }
.c-hero__image { /* Foreground image */ }

/* State modifiers */
.has-parallax { /* Parallax enabled */ }
```

### Custom Styling

```css
/* Custom hero variant */
.c-hero--gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.c-hero--gradient .c-hero__title {
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

/* Custom spacing */
.c-hero--compact {
  --atomix-hero-padding-y: 4rem;
}

.c-hero--spacious {
  --atomix-hero-padding-y: 8rem;
}

/* Animation effects */
.c-hero__content {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .c-hero--grid {
    display: block;
  }
  
  .c-hero__image {
    margin-top: 2rem;
  }
}
```

## Accessibility

The Hero component includes comprehensive accessibility features:

### ARIA Attributes

- Proper heading hierarchy with `h1` for main title
- Alt text for images and background images
- Semantic HTML structure for screen readers

### Keyboard Navigation

- Focusable action buttons with proper tab order
- Skip links can be added for better navigation

### Screen Reader Support

- Descriptive alt text for all images
- Proper heading structure for content hierarchy
- Background videos include fallback content

## Best Practices

### Do's ✅

- Use compelling, action-oriented titles
- Provide alt text for all images
- Keep text concise and scannable
- Use high-contrast colors for readability
- Test on various screen sizes

```jsx
// Good: Clear hierarchy and compelling copy
<Hero
  title="Transform Your Design Workflow"
  subtitle="Professional Tools"
  text="Streamline your process with our comprehensive design system."
  imageSrc="/images/workflow.png"
  imageAlt="Design workflow illustration showing connected components"
  actions={<Button variant="primary" label="Start Your Free Trial" />}
/>
```

### Don'ts ❌

- Don't use too much text in the hero
- Don't rely solely on color for important information
- Don't use low-contrast text over busy backgrounds
- Don't forget to optimize large background images

```jsx
// Bad: Too much text, poor contrast
<Hero
  title="This is a very long title that goes on and on and probably won't fit well on mobile devices"
  text="This is way too much text for a hero section. Heroes should be concise and to the point, not lengthy descriptions that users won't read."
  backgroundImageSrc="/images/busy-pattern.jpg"
  showOverlay={false}
/>
```

## Common Patterns

### Landing Page Hero

```jsx
function LandingHero() {
  return (
    <Hero
      title="Build Better Products Faster"
      subtitle="Design System Platform"
      text="Everything you need to create consistent, accessible user interfaces."
      backgroundImageSrc="/images/gradient-bg.jpg"
      alignment="center"
      fullViewportHeight={true}
      actions={
        <div className="hero-cta">
          <Button variant="primary" size="lg" label="Get Started Free" />
          <Button variant="link" label="Watch Demo →" />
        </div>
      }
    />
  );
}
```

### Product Feature Hero

```jsx
function FeatureHero() {
  return (
    <Hero
      title="Advanced Analytics Dashboard"
      subtitle="New Feature"
      text="Get deeper insights into your application performance with our new analytics suite."
      imageSrc="/images/analytics-dashboard.png"
      imageAlt="Analytics dashboard showing charts and metrics"
      alignment="left"
      actions={
        <div className="feature-actions">
          <Button variant="primary" label="Learn More" />
          <Button variant="outline-secondary" label="View Demo" />
        </div>
      }
    />
  );
}
```

### Event Promotion Hero

```jsx
function EventHero() {
  return (
    <Hero
      title="Design Conference 2024"
      subtitle="March 15-17, San Francisco"
      text="Join industry leaders and innovators for three days of inspiring talks and workshops."
      videoBackground="/videos/conference-highlights.mp4"
      videoOptions={{
        autoplay: true,
        loop: true,
        muted: true
      }}
      showOverlay={true}
      alignment="center"
      fullViewportHeight={true}
      actions={
        <div className="event-actions">
          <Button variant="primary" size="lg" label="Register Now" />
          <Button variant="outline-light" label="View Schedule" />
        </div>
      }
    />
  );
}
```

### App Download Hero

```jsx
function AppDownloadHero() {
  return (
    <Hero
      title="Get the Mobile App"
      subtitle="Available Now"
      text="Take your productivity on the go with our native mobile applications."
      imageSrc="/images/mobile-app-mockup.png"
      imageAlt="Mobile app interface mockup"
      alignment="right"
      imageColSize={5}
      contentColSize={7}
      actions={
        <div className="download-buttons">
          <Button variant="dark" label="Download for iOS" />
          <Button variant="dark" label="Download for Android" />
        </div>
      }
    />
  );
}
```

## Related Components

- **Button** - Used for hero call-to-action elements
- **Card** - Can be used within hero sections for structured content
- **Icon** - Often used in hero action buttons
- **Grid** - Hero uses the grid system for layout

## Browser Support

The Hero component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Video backgrounds require additional support:
- Chrome 60+
- Firefox 60+
- Safari 10+
- Edge 79+

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x
<Hero 
  heading="Hero Title"
  subheading="Hero Subtitle"
  description="Hero description"
  image="/image.jpg"
  position="left"
/>

// v2.x
<Hero 
  title="Hero Title"
  subtitle="Hero Subtitle"
  text="Hero description"
  imageSrc="/image.jpg"
  alignment="left"
/>
```

The main changes:
- `heading` prop renamed to `title`
- `subheading` prop renamed to `subtitle`
- `description` prop renamed to `text`
- `image` prop renamed to `imageSrc`
- `position` prop renamed to `alignment`
- Added support for video backgrounds and parallax effects
- Improved grid layout system