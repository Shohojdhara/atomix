# River

The River component creates flexible content sections with text and image layouts. It's designed for creating engaging content blocks that flow naturally through your application, with support for various layouts, background images, and responsive design patterns.

## Overview

The River component is a versatile content layout component that combines text content with images in various configurations. It supports both foreground and background images, multiple layout orientations, and responsive behavior to create visually appealing content sections.

## Installation

The River component is included in the Atomix package. Import it in your React components:

```jsx
import { River } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the river styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { River } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <River
      title="Welcome to Our Service"
      text="Discover amazing features that will transform your workflow and boost productivity."
      imageSrc="https://example.com/hero-image.jpg"
      imageAlt="Team collaboration"
      actions={
        <div>
          <Button variant="primary">Get Started</Button>
          <Button variant="outline-secondary">Learn More</Button>
        </div>
      }
    />
  );
}
```

### HTML/CSS

```html
<!-- Basic river section -->
<div class="c-river">
  <div class="c-river__content">
    <div class="c-river__text-content">
      <h2 class="c-river__title">Section Title</h2>
      <p class="c-river__text">Content description goes here.</p>
      <div class="c-river__actions">
        <button class="c-btn c-btn--primary">Primary Action</button>
      </div>
    </div>
  </div>
  <div class="c-river__visual">
    <img src="image.jpg" alt="Description" class="c-river__image" />
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | Title of the river section |
| `text` | `string \| string[]` | - | Text content (string or array of paragraphs) |
| `actions` | `ReactNode` | - | Action buttons or links |
| `imageSrc` | `string` | - | Foreground image source URL |
| `imageAlt` | `string` | `'Image'` | Alt text for the image |
| `center` | `boolean` | `false` | Whether to center the content |
| `breakout` | `boolean` | `false` | Whether to use breakout layout |
| `reverse` | `boolean` | `false` | Whether to reverse the layout (image first) |
| `backgroundImageSrc` | `string` | - | Background image source URL |
| `showOverlay` | `boolean` | `true` | Whether to show overlay on background image |
| `contentWidth` | `string` | - | Custom content width |
| `contentColumns` | `RiverContentColumn[]` | - | Custom content columns configuration |
| `className` | `string` | `''` | Additional CSS classes |

### RiverContentColumn Interface

```typescript
interface RiverContentColumn {
  /**
   * Column type (title or text)
   */
  type: 'title' | 'text';

  /**
   * Content for the column
   */
  content: ReactNode;
}
```

## Examples

### Basic Text and Image

```jsx
function BasicRiver() {
  return (
    <River
      title="Innovative Solutions"
      text="We provide cutting-edge technology solutions that help businesses scale and succeed in the digital age."
      imageSrc="https://example.com/innovation.jpg"
      imageAlt="Innovation concept"
      actions={
        <Button variant="primary" size="lg">
          Explore Solutions
        </Button>
      }
    />
  );
}
```

### Reversed Layout

```jsx
function ReversedRiver() {
  return (
    <River
      title="Our Story"
      text={[
        "Founded in 2020, we started with a simple mission: make technology accessible to everyone.",
        "Today, we serve thousands of customers worldwide with our innovative platforms and services."
      ]}
      imageSrc="https://example.com/team.jpg"
      imageAlt="Our team"
      reverse={true}
      actions={
        <div className="action-group">
          <Button variant="outline-primary">Read More</Button>
          <Button variant="link">
            <Icon name="Play" />
            Watch Video
          </Button>
        </div>
      }
    />
  );
}
```

### Centered Layout

```jsx
function CenteredRiver() {
  return (
    <River
      title="Ready to Get Started?"
      text="Join thousands of satisfied customers who trust our platform for their business needs."
      center={true}
      actions={
        <div className="centered-actions">
          <Button variant="primary" size="lg">
            Start Free Trial
          </Button>
          <Button variant="outline-secondary" size="lg">
            Schedule Demo
          </Button>
        </div>
      }
    />
  );
}
```

### Background Image with Overlay

```jsx
function BackgroundRiver() {
  return (
    <River
      title="Transform Your Business"
      text="Discover how our platform can revolutionize your workflow and drive growth."
      backgroundImageSrc="https://example.com/business-bg.jpg"
      showOverlay={true}
      center={true}
      actions={
        <Button variant="primary" size="lg">
          Get Started Today
        </Button>
      }
      className="hero-river"
    />
  );
}
```

### Breakout Layout

```jsx
function BreakoutRiver() {
  return (
    <River
      title="Full-Width Experience"
      text="This section extends beyond the normal content boundaries to create a more immersive experience."
      imageSrc="https://example.com/wide-image.jpg"
      imageAlt="Wide landscape"
      breakout={true}
      reverse={true}
    />
  );
}
```

### Custom Content Columns

```jsx
function CustomColumnsRiver() {
  const contentColumns = [
    {
      type: 'title',
      content: (
        <div>
          <h2>Advanced Features</h2>
          <p className="subtitle">Built for professionals</p>
        </div>
      )
    },
    {
      type: 'text',
      content: (
        <div>
          <ul className="feature-list">
            <li>Real-time collaboration</li>
            <li>Advanced analytics</li>
            <li>Enterprise security</li>
            <li>API integrations</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <River
      contentColumns={contentColumns}
      imageSrc="https://example.com/features.jpg"
      imageAlt="Feature showcase"
      actions={
        <Button variant="primary">
          View All Features
        </Button>
      }
    />
  );
}
```

### Multiple Rivers

```jsx
function MultipleRivers() {
  const features = [
    {
      title: "Easy to Use",
      text: "Intuitive interface designed for users of all skill levels.",
      image: "https://example.com/easy.jpg",
      reverse: false
    },
    {
      title: "Powerful Analytics",
      text: "Get insights that matter with our advanced reporting tools.",
      image: "https://example.com/analytics.jpg",
      reverse: true
    },
    {
      title: "Secure & Reliable",
      text: "Enterprise-grade security with 99.9% uptime guarantee.",
      image: "https://example.com/secure.jpg",
      reverse: false
    }
  ];

  return (
    <div className="features-section">
      {features.map((feature, index) => (
        <River
          key={index}
          title={feature.title}
          text={feature.text}
          imageSrc={feature.image}
          imageAlt={feature.title}
          reverse={feature.reverse}
          actions={
            <Button variant="outline-primary">
              Learn More
            </Button>
          }
        />
      ))}
    </div>
  );
}
```

### Product Showcase

```jsx
function ProductShowcase() {
  return (
    <div className="product-showcase">
      <River
        title="Introducing Our Latest Product"
        text={[
          "Revolutionary design meets cutting-edge technology in our newest offering.",
          "Experience the future of productivity with features that adapt to your workflow."
        ]}
        imageSrc="https://example.com/product.jpg"
        imageAlt="New product"
        actions={
          <div className="product-actions">
            <Button variant="primary" size="lg">
              Pre-Order Now
            </Button>
            <Button variant="outline-secondary" size="lg">
              <Icon name="Play" />
              Watch Demo
            </Button>
          </div>
        }
      />
      
      <River
        title="Key Features"
        text="Designed with your needs in mind, every feature serves a purpose."
        reverse={true}
        contentColumns={[
          {
            type: 'text',
            content: (
              <div className="features-grid">
                <div className="feature">
                  <Icon name="Zap" />
                  <h4>Lightning Fast</h4>
                  <p>Optimized for speed and performance</p>
                </div>
                <div className="feature">
                  <Icon name="Shield" />
                  <h4>Ultra Secure</h4>
                  <p>Bank-level security protocols</p>
                </div>
                <div className="feature">
                  <Icon name="Smartphone" />
                  <h4>Mobile Ready</h4>
                  <p>Works seamlessly on all devices</p>
                </div>
              </div>
            )
          }
        ]}
        imageSrc="https://example.com/features-visual.jpg"
        imageAlt="Product features"
      />
    </div>
  );
}
```

### Team Introduction

```jsx
function TeamIntroduction() {
  return (
    <River
      title="Meet Our Team"
      text={[
        "We're a diverse group of passionate professionals united by a common goal: creating exceptional experiences for our users.",
        "From designers and developers to strategists and support specialists, every team member brings unique expertise to the table."
      ]}
      imageSrc="https://example.com/team-photo.jpg"
      imageAlt="Our team"
      center={false}
      reverse={true}
      actions={
        <div className="team-actions">
          <Button variant="outline-primary">
            View All Team Members
          </Button>
          <Button variant="link">
            <Icon name="MapPin" />
            Visit Our Office
          </Button>
        </div>
      }
    />
  );
}
```

## Accessibility

The River component follows WCAG accessibility guidelines:

### Semantic HTML

- Uses proper heading hierarchy with `h2`, `h3`, etc.
- Implements semantic markup for content sections
- Includes appropriate `alt` text for images
- Uses `section` elements for logical content grouping

### Keyboard Support

- All interactive elements (buttons, links) are keyboard accessible
- Proper focus management and visible focus indicators
- Tab order follows logical reading order

### Screen Reader Support

```jsx
function AccessibleRiver() {
  return (
    <River
      title="Accessible Content Section"
      text="This section is properly structured for screen readers and assistive technologies."
      imageSrc="https://example.com/accessible.jpg"
      imageAlt="Team members collaborating on accessible design"
      actions={
        <Button 
          variant="primary"
          aria-describedby="cta-description"
        >
          Get Started
        </Button>
      }
    />
  );
}
```

### Best Practices

1. **Always provide meaningful alt text** for images
2. **Use semantic HTML** structure for content
3. **Maintain proper heading hierarchy** 
4. **Ensure sufficient color contrast** for text over images
5. **Test with screen readers** and keyboard navigation

## Styling

### CSS Custom Properties

The River component uses CSS custom properties for theming:

```css
:root {
  /* Container */
  --atomix-river-padding: 4rem 0;
  --atomix-river-max-width: 1200px;
  --atomix-river-gap: 3rem;
  
  /* Content */
  --atomix-river-content-width: 50%;
  --atomix-river-title-font-size: 2.5rem;
  --atomix-river-title-font-weight: 700;
  --atomix-river-title-line-height: 1.2;
  --atomix-river-title-color: var(--atomix-text-primary);
  
  /* Text */
  --atomix-river-text-font-size: 1.125rem;
  --atomix-river-text-line-height: 1.6;
  --atomix-river-text-color: var(--atomix-text-secondary);
  --atomix-river-text-margin: 1.5rem 0;
  
  /* Image */
  --atomix-river-image-border-radius: var(--atomix-border-radius-lg);
  --atomix-river-image-aspect-ratio: 16/9;
  
  /* Background overlay */
  --atomix-river-overlay-bg: rgba(0, 0, 0, 0.4);
  --atomix-river-overlay-content-color: var(--atomix-white);
  
  /* Actions */
  --atomix-river-actions-gap: 1rem;
  --atomix-river-actions-margin: 2rem 0 0;
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base river component */
.c-river {
  display: flex;
  align-items: center;
  padding: var(--atomix-river-padding);
  max-width: var(--atomix-river-max-width);
  margin: 0 auto;
  gap: var(--atomix-river-gap);
}

/* Content section */
.c-river__content {
  flex: 1;
  width: var(--atomix-river-content-width);
}

.c-river__text-content {
  max-width: 100%;
}

/* Title */
.c-river__title {
  font-size: var(--atomix-river-title-font-size);
  font-weight: var(--atomix-river-title-font-weight);
  line-height: var(--atomix-river-title-line-height);
  color: var(--atomix-river-title-color);
  margin-bottom: 1rem;
}

/* Text */
.c-river__text {
  font-size: var(--atomix-river-text-font-size);
  line-height: var(--atomix-river-text-line-height);
  color: var(--atomix-river-text-color);
  margin: var(--atomix-river-text-margin);
}

.c-river__text + .c-river__text {
  margin-top: 1rem;
}

/* Actions */
.c-river__actions {
  display: flex;
  gap: var(--atomix-river-actions-gap);
  margin: var(--atomix-river-actions-margin);
  flex-wrap: wrap;
}

/* Visual section */
.c-river__visual {
  flex: 1;
  width: var(--atomix-river-content-width);
}

.c-river__image {
  width: 100%;
  height: auto;
  border-radius: var(--atomix-river-image-border-radius);
  object-fit: cover;
  aspect-ratio: var(--atomix-river-image-aspect-ratio);
}

/* Layout modifiers */
.c-river--reverse {
  flex-direction: row-reverse;
}

.c-river--center {
  text-align: center;
  flex-direction: column;
  align-items: center;
}

.c-river--center .c-river__content {
  width: 100%;
  max-width: 800px;
}

.c-river--breakout {
  max-width: none;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

/* Background image */
.c-river--has-background {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--atomix-river-overlay-content-color);
}

.c-river--has-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--atomix-river-overlay-bg);
  z-index: 1;
}

.c-river--has-background .c-river__content {
  position: relative;
  z-index: 2;
}

/* Responsive design */
@media (max-width: 768px) {
  .c-river {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  
  .c-river--reverse {
    flex-direction: column;
  }
  
  .c-river__content,
  .c-river__visual {
    width: 100%;
  }
  
  .c-river__title {
    font-size: 2rem;
  }
  
  .c-river__actions {
    justify-content: center;
  }
}
```

### Customization Examples

```css
/* Hero variant */
.c-river--hero {
  --atomix-river-padding: 6rem 0;
  --atomix-river-title-font-size: 3.5rem;
  --atomix-river-gap: 4rem;
}

/* Compact variant */
.c-river--compact {
  --atomix-river-padding: 2rem 0;
  --atomix-river-title-font-size: 2rem;
  --atomix-river-gap: 2rem;
}

/* Dark theme */
.c-river--dark {
  --atomix-river-title-color: var(--atomix-white);
  --atomix-river-text-color: var(--atomix-gray-300);
  background: var(--atomix-gray-900);
}

/* Gradient background */
.c-river--gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Custom aspect ratios */
.c-river--square .c-river__image {
  aspect-ratio: 1/1;
}

.c-river--portrait .c-river__image {
  aspect-ratio: 3/4;
}

/* Animation effects */
.c-river--animate {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.c-river--animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

## Common Patterns

### Landing Page Hero

```jsx
function LandingHero() {
  return (
    <River
      title="Build Better Products Faster"
      text="The complete toolkit for modern product teams. From ideation to launch, we've got you covered."
      backgroundImageSrc="https://example.com/hero-bg.jpg"
      showOverlay={true}
      center={true}
      actions={
        <div className="hero-actions">
          <Button variant="primary" size="lg">
            Start Free Trial
          </Button>
          <Button variant="outline-light" size="lg">
            Watch Demo
          </Button>
        </div>
      }
      className="hero-river"
    />
  );
}
```

### Feature Highlights

```jsx
function FeatureHighlight({ features }) {
  return (
    <div className="feature-highlights">
      {features.map((feature, index) => (
        <River
          key={feature.id}
          title={feature.title}
          text={feature.description}
          imageSrc={feature.image}
          imageAlt={feature.title}
          reverse={index % 2 === 1}
          actions={
            <Button variant="outline-primary">
              Learn More
            </Button>
          }
        />
      ))}
    </div>
  );
}
```

### About Us Section

```jsx
function AboutUsSection() {
  return (
    <div className="about-section">
      <River
        title="Our Mission"
        text={[
          "We believe technology should empower, not complicate. That's why we build tools that are powerful yet simple to use.",
          "Since our founding, we've helped over 10,000 companies streamline their workflows and achieve their goals."
        ]}
        imageSrc="https://example.com/mission.jpg"
        imageAlt="Team working together"
      />
      
      <River
        title="Our Values"
        reverse={true}
        contentColumns={[
          {
            type: 'text',
            content: (
              <div className="values-grid">
                <div className="value">
                  <h4>Innovation</h4>
                  <p>Constantly pushing boundaries</p>
                </div>
                <div className="value">
                  <h4>Integrity</h4>
                  <p>Doing the right thing, always</p>
                </div>
                <div className="value">
                  <h4>Impact</h4>
                  <p>Making a meaningful difference</p>
                </div>
              </div>
            )
          }
        ]}
        imageSrc="https://example.com/values.jpg"
        imageAlt="Company values"
      />
    </div>
  );
}
```

## Performance Considerations

1. **Image optimization**: Use appropriate image formats and sizes
2. **Lazy loading**: Implement lazy loading for images below the fold
3. **Content delivery**: Use CDNs for image assets
4. **Animation**: Use CSS transforms for better performance

```jsx
// Optimized river with lazy loading
const OptimizedRiver = ({ imageSrc, ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <River
      {...props}
      imageSrc={imageLoaded ? imageSrc : undefined}
      className={`river-optimized ${imageLoaded ? 'image-loaded' : ''}`}
      onImageLoad={() => setImageLoaded(true)}
    />
  );
};
```

## Integration Examples

### With CMS Content

```jsx
// Integration with headless CMS
function CMSRiver({ cmsData }) {
  return (
    <River
      title={cmsData.title}
      text={cmsData.content}
      imageSrc={cmsData.image?.url}
      imageAlt={cmsData.image?.alt}
      reverse={cmsData.layout === 'reversed'}
      actions={
        cmsData.buttons?.map(button => (
          <Button 
            key={button.id}
            variant={button.style}
            href={button.url}
          >
            {button.text}
          </Button>
        ))
      }
    />
  );
}
```

### With Animation Libraries

```jsx
// Integration with Framer Motion
import { motion } from 'framer-motion';

function AnimatedRiver(props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <River {...props} />
    </motion.div>
  );
}
```

## Browser Support

The River component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Button](./button.md)** - Used for action elements
- **[Icon](./icon.md)** - Used in actions and content
- **[Card](./card.md)** - Alternative content container
- **[Hero](./hero.md)** - Similar hero-style layouts
- **[SectionIntro](./section-intro.md)** - For section introductions

## Migration Guide

### From Custom Layout

```jsx
// Before (custom layout)
<div className="content-section">
  <div className="content-text">
    <h2>Title</h2>
    <p>Description</p>
    <button>Action</button>
  </div>
  <div className="content-image">
    <img src="image.jpg" alt="Image" />
  </div>
</div>

// After (Atomix River)
<River
  title="Title"
  text="Description"
  imageSrc="image.jpg"
  imageAlt="Image"
  actions={<Button>Action</Button>}
/>
```
