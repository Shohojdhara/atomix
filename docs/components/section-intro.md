# SectionIntro

The SectionIntro component provides a standardized way to introduce sections of content with titles, descriptions, and call-to-action elements. It's designed for creating consistent section headers throughout your application with flexible alignment and styling options.

## Overview

The SectionIntro component creates polished section introductions that can include titles, subtitles, descriptive text, and action buttons. It supports various alignments, background images, and responsive layouts to create engaging section headers for landing pages, content sections, and feature introductions.

## Installation

The SectionIntro component is included in the Atomix package. Import it in your React components:

```jsx
import { SectionIntro } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the section intro styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { SectionIntro } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <SectionIntro
      title="Welcome to Our Platform"
      label="Get Started"
      text="Discover powerful features that will transform how you work and collaborate with your team."
      alignment="center"
      actions={
        <div>
          <Button variant="primary" size="lg">
            Start Free Trial
          </Button>
          <Button variant="outline-secondary" size="lg">
            Learn More
          </Button>
        </div>
      }
    />
  );
}
```

### HTML/CSS

```html
<!-- Section intro structure -->
<div class="c-section-intro c-section-intro--center">
  <div class="c-section-intro__content">
    <div class="c-section-intro__label">Get Started</div>
    <h2 class="c-section-intro__title">Welcome to Our Platform</h2>
    <p class="c-section-intro__text">
      Discover powerful features that will transform how you work.
    </p>
    <div class="c-section-intro__actions">
      <button class="c-btn c-btn--primary c-btn--lg">Start Free Trial</button>
      <button class="c-btn c-btn--outline-secondary c-btn--lg">Learn More</button>
    </div>
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | **Required.** The section title |
| `label` | `ReactNode` | - | Optional subtitle or overline text |
| `text` | `ReactNode` | - | Optional description text |
| `actions` | `ReactNode` | - | Optional call-to-action elements |
| `alignment` | `'left' \| 'center' \| 'right'` | `'left'` | Alignment of the content |
| `backgroundImageSrc` | `string` | - | Optional background image URL |
| `showOverlay` | `boolean` | `true` | Whether to show overlay on background image |
| `imageSrc` | `string` | - | Optional foreground image URL |
| `className` | `string` | `''` | Additional CSS classes |

## Examples

### Basic Section Introduction

```jsx
function BasicSectionIntro() {
  return (
    <SectionIntro
      title="Our Services"
      text="We provide comprehensive solutions to help your business grow and succeed in today's competitive market."
    />
  );
}
```

### Centered Introduction with Actions

```jsx
function CenteredIntro() {
  return (
    <SectionIntro
      label="Why Choose Us"
      title="Built for Modern Teams"
      text="Experience the power of seamless collaboration with tools designed for today's remote and hybrid work environments."
      alignment="center"
      actions={
        <div className="intro-actions">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="link" size="lg">
            <Icon name="Play" />
            Watch Demo
          </Button>
        </div>
      }
    />
  );
}
```

### Background Image Introduction

```jsx
function BackgroundIntro() {
  return (
    <SectionIntro
      title="Transform Your Business"
      text="Join thousands of companies that have revolutionized their operations with our cutting-edge solutions."
      alignment="center"
      backgroundImageSrc="https://example.com/hero-bg.jpg"
      showOverlay={true}
      actions={
        <Button variant="primary" size="lg">
          Start Your Journey
        </Button>
      }
      className="hero-intro"
    />
  );
}
```

### Feature Section Introduction

```jsx
function FeatureIntro() {
  return (
    <SectionIntro
      label="Features"
      title="Everything You Need"
      text={[
        "Our platform provides all the tools and features you need to succeed.",
        "From basic functionality to advanced enterprise features, we've got you covered."
      ]}
      alignment="left"
      imageSrc="https://example.com/features-preview.jpg"
      actions={
        <div className="feature-actions">
          <Button variant="outline-primary">
            View All Features
          </Button>
          <Button variant="link">
            <Icon name="ArrowRight" />
            See Pricing
          </Button>
        </div>
      }
    />
  );
}
```

### Multiple Section Introductions

```jsx
function MultipleSectionIntros() {
  const sections = [
    {
      label: "Step 1",
      title: "Plan Your Strategy",
      text: "Define your goals and create a roadmap for success.",
      alignment: "left"
    },
    {
      label: "Step 2", 
      title: "Execute with Precision",
      text: "Use our tools to implement your strategy effectively.",
      alignment: "center"
    },
    {
      label: "Step 3",
      title: "Measure and Optimize",
      text: "Track progress and optimize for better results.",
      alignment: "right"
    }
  ];

  return (
    <div className="process-sections">
      {sections.map((section, index) => (
        <SectionIntro
          key={index}
          label={section.label}
          title={section.title}
          text={section.text}
          alignment={section.alignment}
          className="process-intro"
        />
      ))}
    </div>
  );
}
```

### Rich Content Introduction

```jsx
function RichContentIntro() {
  const richTitle = (
    <h1>
      Accelerate Your <span className="highlight">Growth</span> with AI
    </h1>
  );

  const richText = (
    <div>
      <p>
        Harness the power of artificial intelligence to automate processes, 
        gain insights, and drive unprecedented growth.
      </p>
      <ul className="feature-list">
        <li>Automated workflow optimization</li>
        <li>Predictive analytics and insights</li>
        <li>Intelligent decision support</li>
      </ul>
    </div>
  );

  return (
    <SectionIntro
      title={richTitle}
      text={richText}
      alignment="center"
      actions={
        <div className="ai-actions">
          <Button variant="primary" size="lg">
            Explore AI Features
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

### Product Showcase Introduction

```jsx
function ProductShowcaseIntro() {
  return (
    <div className="product-showcase">
      <SectionIntro
        label="Introducing"
        title="Next-Generation Platform"
        text="Built from the ground up with modern technologies and user-centric design principles."
        alignment="center"
        backgroundImageSrc="https://example.com/product-bg.jpg"
        showOverlay={true}
        actions={
          <div className="showcase-actions">
            <Button variant="primary" size="lg">
              Pre-Order Now
            </Button>
            <Button variant="outline-light" size="lg">
              <Icon name="Play" />
              Watch Launch Video
            </Button>
          </div>
        }
        className="product-intro"
      />

      <SectionIntro
        title="Key Benefits"
        text="See how our platform can transform your business operations."
        alignment="left"
        imageSrc="https://example.com/benefits-chart.jpg"
        actions={
          <Button variant="outline-primary">
            View Detailed Benefits
          </Button>
        }
      />
    </div>
  );
}
```

### Team Introduction

```jsx
function TeamIntro() {
  return (
    <SectionIntro
      label="Meet the Team"
      title="Passionate Experts"
      text="Our diverse team of professionals brings together decades of experience and innovative thinking to deliver exceptional results."
      alignment="center"
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

### Testimonials Introduction

```jsx
function TestimonialsIntro() {
  return (
    <SectionIntro
      label="Customer Stories"
      title="What Our Clients Say"
      text="Don't just take our word for it. See what industry leaders and satisfied customers have to say about their experience."
      alignment="center"
      actions={
        <div className="testimonials-actions">
          <Button variant="outline-primary">
            Read All Reviews
          </Button>
          <Button variant="link">
            <Icon name="Star" />
            Write a Review
          </Button>
        </div>
      }
    />
  );
}
```

## Accessibility

The SectionIntro component follows WCAG accessibility guidelines:

### Semantic HTML

- Uses proper heading hierarchy (`h1`, `h2`, `h3`, etc.)
- Implements semantic markup for content structure
- Uses appropriate sectioning elements
- Maintains logical reading order

### Keyboard Support

- All interactive elements (buttons, links) are keyboard accessible
- Proper focus management and visible focus indicators
- Tab order follows logical reading sequence

### Screen Reader Support

```jsx
function AccessibleSectionIntro() {
  return (
    <SectionIntro
      title="Accessible Section Header"
      text="This section is properly structured for screen readers and assistive technologies."
      actions={
        <Button 
          variant="primary"
          aria-describedby="section-description"
        >
          Take Action
        </Button>
      }
      aria-label="Main section introduction"
    />
  );
}
```

### Best Practices

1. **Use semantic heading levels** appropriate to the document structure
2. **Provide sufficient color contrast** for text over background images
3. **Include alternative text** for decorative images
4. **Ensure keyboard accessibility** for all interactive elements
5. **Test with screen readers** and assistive technologies

## Styling

### CSS Custom Properties

The SectionIntro component uses CSS custom properties for theming:

```css
:root {
  /* Container */
  --atomix-section-intro-padding: 3rem 0;
  --atomix-section-intro-max-width: 800px;
  --atomix-section-intro-margin: 0 auto;

  /* Label */
  --atomix-section-intro-label-font-size: 0.875rem;
  --atomix-section-intro-label-font-weight: 600;
  --atomix-section-intro-label-color: var(--atomix-primary);
  --atomix-section-intro-label-text-transform: uppercase;
  --atomix-section-intro-label-letter-spacing: 0.05em;
  --atomix-section-intro-label-margin: 0 0 1rem;

  /* Title */
  --atomix-section-intro-title-font-size: 2.5rem;
  --atomix-section-intro-title-font-weight: 700;
  --atomix-section-intro-title-line-height: 1.2;
  --atomix-section-intro-title-color: var(--atomix-text-primary);
  --atomix-section-intro-title-margin: 0 0 1.5rem;

  /* Text */
  --atomix-section-intro-text-font-size: 1.125rem;
  --atomix-section-intro-text-line-height: 1.6;
  --atomix-section-intro-text-color: var(--atomix-text-secondary);
  --atomix-section-intro-text-margin: 0 0 2rem;

  /* Actions */
  --atomix-section-intro-actions-gap: 1rem;
  --atomix-section-intro-actions-margin: 2rem 0 0;

  /* Background overlay */
  --atomix-section-intro-overlay-bg: rgba(0, 0, 0, 0.4);
  --atomix-section-intro-overlay-content-color: var(--atomix-white);

  /* Image */
  --atomix-section-intro-image-max-width: 600px;
  --atomix-section-intro-image-border-radius: var(--atomix-border-radius-lg);
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base section intro component */
.c-section-intro {
  padding: var(--atomix-section-intro-padding);
  position: relative;
}

.c-section-intro__content {
  max-width: var(--atomix-section-intro-max-width);
  margin: var(--atomix-section-intro-margin);
}

/* Label */
.c-section-intro__label {
  font-size: var(--atomix-section-intro-label-font-size);
  font-weight: var(--atomix-section-intro-label-font-weight);
  color: var(--atomix-section-intro-label-color);
  text-transform: var(--atomix-section-intro-label-text-transform);
  letter-spacing: var(--atomix-section-intro-label-letter-spacing);
  margin: var(--atomix-section-intro-label-margin);
  display: block;
}

/* Title */
.c-section-intro__title {
  font-size: var(--atomix-section-intro-title-font-size);
  font-weight: var(--atomix-section-intro-title-font-weight);
  line-height: var(--atomix-section-intro-title-line-height);
  color: var(--atomix-section-intro-title-color);
  margin: var(--atomix-section-intro-title-margin);
}

/* Text */
.c-section-intro__text {
  font-size: var(--atomix-section-intro-text-font-size);
  line-height: var(--atomix-section-intro-text-line-height);
  color: var(--atomix-section-intro-text-color);
  margin: var(--atomix-section-intro-text-margin);
}

.c-section-intro__text p + p {
  margin-top: 1rem;
}

/* Actions */
.c-section-intro__actions {
  display: flex;
  gap: var(--atomix-section-intro-actions-gap);
  flex-wrap: wrap;
  margin: var(--atomix-section-intro-actions-margin);
}

/* Alignment modifiers */
.c-section-intro--left {
  text-align: left;
}

.c-section-intro--left .c-section-intro__actions {
  justify-content: flex-start;
}

.c-section-intro--center {
  text-align: center;
}

.c-section-intro--center .c-section-intro__content {
  margin-left: auto;
  margin-right: auto;
}

.c-section-intro--center .c-section-intro__actions {
  justify-content: center;
}

.c-section-intro--right {
  text-align: right;
}

.c-section-intro--right .c-section-intro__actions {
  justify-content: flex-end;
}

/* Background image */
.c-section-intro--has-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--atomix-section-intro-overlay-content-color);
}

.c-section-intro--has-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--atomix-section-intro-overlay-bg);
  z-index: 1;
}

.c-section-intro--has-background .c-section-intro__content {
  position: relative;
  z-index: 2;
}

/* Foreground image */
.c-section-intro__image {
  max-width: var(--atomix-section-intro-image-max-width);
  width: 100%;
  height: auto;
  border-radius: var(--atomix-section-intro-image-border-radius);
  margin-top: 2rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .c-section-intro {
    padding: 2rem 1rem;
  }

  .c-section-intro__title {
    font-size: 2rem;
  }

  .c-section-intro__text {
    font-size: 1rem;
  }

  .c-section-intro__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .c-section-intro--left .c-section-intro__actions,
  .c-section-intro--right .c-section-intro__actions {
    align-items: stretch;
  }

  .c-section-intro--center .c-section-intro__actions {
    align-items: center;
  }
}
```

### Customization Examples

```css
/* Hero variant */
.c-section-intro--hero {
  --atomix-section-intro-padding: 6rem 0;
  --atomix-section-intro-title-font-size: 3.5rem;
  --atomix-section-intro-max-width: 1000px;
}

/* Compact variant */
.c-section-intro--compact {
  --atomix-section-intro-padding: 2rem 0;
  --atomix-section-intro-title-font-size: 2rem;
  --atomix-section-intro-text-font-size: 1rem;
}

/* Dark theme */
.c-section-intro--dark {
  --atomix-section-intro-title-color: var(--atomix-white);
  --atomix-section-intro-text-color: var(--atomix-gray-300);
  background: var(--atomix-gray-900);
}

/* Gradient background */
.c-section-intro--gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.c-section-intro--gradient .c-section-intro__label {
  color: rgba(255, 255, 255, 0.9);
}

/* Bordered style */
.c-section-intro--bordered {
  border-left: 4px solid var(--atomix-primary);
  padding-left: 2rem;
}

/* Animation effects */
.c-section-intro--animate {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.c-section-intro--animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

## Common Patterns

### Landing Page Hero

```jsx
function LandingHero() {
  return (
    <SectionIntro
      title="Build the Future Today"
      text="Empower your team with cutting-edge tools and technologies designed for tomorrow's challenges."
      alignment="center"
      backgroundImageSrc="https://example.com/hero-bg.jpg"
      showOverlay={true}
      actions={
        <div className="hero-actions">
          <Button variant="primary" size="lg">
            Get Started Free
          </Button>
          <Button variant="outline-light" size="lg">
            <Icon name="Play" />
            Watch Demo
          </Button>
        </div>
      }
      className="hero-section"
    />
  );
}
```

### Feature Sections

```jsx
function FeatureSections() {
  const features = [
    {
      label: "Security",
      title: "Enterprise-Grade Security",
      text: "Your data is protected with bank-level encryption and compliance standards."
    },
    {
      label: "Performance", 
      title: "Lightning-Fast Performance",
      text: "Optimized infrastructure delivers sub-second response times globally."
    },
    {
      label: "Integration",
      title: "Seamless Integrations", 
      text: "Connect with over 100+ popular tools and services your team already uses."
    }
  ];

  return (
    <div className="feature-sections">
      {features.map((feature, index) => (
        <SectionIntro
          key={index}
          label={feature.label}
          title={feature.title}
          text={feature.text}
          alignment="center"
          actions={
            <Button variant="outline-primary">
              Learn More
            </Button>
          }
          className="feature-intro"
        />
      ))}
    </div>
  );
}
```

### About Us Section

```jsx
function AboutSection() {
  return (
    <SectionIntro
      label="About Us"
      title="Our Story"
      text={[
        "Founded in 2020 with a simple mission: make technology accessible to everyone.",
        "Today we serve thousands of customers worldwide, helping them achieve their goals with innovative solutions and exceptional support."
      ]}
      alignment="left"
      imageSrc="https://example.com/about-image.jpg"
      actions={
        <div className="about-actions">
          <Button variant="outline-primary">
            Learn Our Story
          </Button>
          <Button variant="link">
            <Icon name="Users" />
            Meet the Team
          </Button>
        </div>
      }
    />
  );
}
```

## Performance Considerations

1. **Image optimization**: Use appropriate image formats and sizes
2. **Lazy loading**: Implement lazy loading for background images
3. **Content delivery**: Use CDNs for image assets
4. **Animation performance**: Use CSS transforms for smooth animations

```jsx
// Optimized section intro with lazy loading
const OptimizedSectionIntro = ({ backgroundImageSrc, ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (backgroundImageSrc) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = backgroundImageSrc;
    }
  }, [backgroundImageSrc]);

  return (
    <SectionIntro
      {...props}
      backgroundImageSrc={imageLoaded ? backgroundImageSrc : undefined}
      className={`section-intro-optimized ${imageLoaded ? 'image-loaded' : ''}`}
    />
  );
};
```

## Integration Examples

### With CMS Content

```jsx
// Integration with headless CMS
function CMSSectionIntro({ cmsData }) {
  return (
    <SectionIntro
      label={cmsData.eyebrow}
      title={cmsData.headline}
      text={cmsData.description}
      alignment={cmsData.alignment || 'center'}
      backgroundImageSrc={cmsData.backgroundImage?.url}
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

function AnimatedSectionIntro(props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <SectionIntro {...props} />
    </motion.div>
  );
}
```

## Browser Support

The SectionIntro component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Button](./button.md)** - Used for action elements
- **[Icon](./icon.md)** - Used in buttons and decorative elements
- **[Hero](./hero.md)** - Similar hero-style layouts
- **[River](./river.md)** - Alternative content layout component
- **[Card](./card.md)** - Alternative content container

## Migration Guide

### From Custom Section Headers

```jsx
// Before (custom section header)
<div className="section-header">
  <span className="section-label">Features</span>
  <h2 className="section-title">Why Choose Us</h2>
  <p className="section-description">We provide the best solutions</p>
  <div className="section-actions">
    <button>Learn More</button>
  </div>
</div>

// After (Atomix SectionIntro)
<SectionIntro
  label="Features"
  title="Why Choose Us"
  text="We provide the best solutions"
  actions={<Button>Learn More</Button>}
/>
```

### From Hero Components

```jsx
// Before (separate hero component)
<Hero
  headline="Welcome"
  subheadline="Get started today"
  backgroundImage="bg.jpg"
  cta={<Button>Get Started</Button>}
/>

// After (SectionIntro with background)
<SectionIntro
  title="Welcome"
  text="Get started today"
  backgroundImageSrc="bg.jpg"
  alignment="center"
  actions={<Button>Get Started</Button>}
/>
```
