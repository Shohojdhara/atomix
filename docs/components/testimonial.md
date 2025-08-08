# Testimonial

The Testimonial component displays user quotes, reviews, and endorsements with author attribution. It provides a polished way to showcase customer feedback, team member quotes, and social proof to build trust and credibility.

## Overview

The Testimonial component creates visually appealing quote blocks with author information, including name, role, and avatar. It supports various sizes and layouts to fit different design contexts, from simple quotes to featured testimonials with rich formatting.

## Installation

The Testimonial component is included in the Atomix package. Import it in your React components:

```jsx
import { Testimonial } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the testimonial styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { Testimonial } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <Testimonial
      quote="This product has completely transformed how we work. The team loves it and our productivity has increased dramatically."
      author={{
        name: "Sarah Johnson",
        role: "Product Manager at TechCorp",
        avatarSrc: "https://example.com/sarah.jpg",
        avatarAlt: "Sarah Johnson"
      }}
    />
  );
}
```

### HTML/CSS

```html
<!-- Basic testimonial -->
<div class="c-testimonial">
  <blockquote class="c-testimonial__quote">
    <p>"This is an amazing product that has helped our team tremendously."</p>
  </blockquote>
  <footer class="c-testimonial__author">
    <img 
      src="avatar.jpg" 
      alt="John Doe" 
      class="c-testimonial__avatar"
    />
    <div class="c-testimonial__author-info">
      <cite class="c-testimonial__name">John Doe</cite>
      <div class="c-testimonial__role">CEO at Company</div>
    </div>
  </footer>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `ReactNode` | - | **Required.** The testimonial quote text or content |
| `author` | `TestimonialAuthor` | - | Author information object |
| `size` | `'sm' \| 'lg' \| ''` | `''` | Size variant of the testimonial |
| `skeleton` | `boolean` | `false` | Whether to show skeleton loading state |
| `className` | `string` | `''` | Additional CSS classes |

### TestimonialAuthor Interface

```typescript
interface TestimonialAuthor {
  /**
   * The author's name
   */
  name: string;

  /**
   * The author's role or title
   */
  role: string;

  /**
   * The URL to the author's avatar image
   */
  avatarSrc?: string;

  /**
   * Alternative text for the avatar image
   */
  avatarAlt?: string;
}
```

## Examples

### Basic Testimonial

```jsx
function BasicTestimonial() {
  return (
    <Testimonial
      quote="The customer service is outstanding. They went above and beyond to help us integrate the platform."
      author={{
        name: "Michael Chen",
        role: "CTO at StartupXYZ",
        avatarSrc: "https://example.com/michael.jpg"
      }}
    />
  );
}
```

### Rich Content Quote

```jsx
function RichContentTestimonial() {
  const richQuote = (
    <div>
      <p>
        "Working with this team has been an <strong>absolute game-changer</strong> for our business. 
        Not only did they deliver on time, but they exceeded our expectations in every way."
      </p>
      <p>
        "I would recommend them to anyone looking for a reliable partner."
      </p>
    </div>
  );

  return (
    <Testimonial
      quote={richQuote}
      author={{
        name: "Emily Rodriguez",
        role: "Founder & CEO, InnovateCorp",
        avatarSrc: "https://example.com/emily.jpg",
        avatarAlt: "Emily Rodriguez smiling"
      }}
      size="lg"
    />
  );
}
```

### Different Sizes

```jsx
function TestimonialSizes() {
  const quote = "Great product, highly recommended!";
  const author = {
    name: "Alex Thompson",
    role: "Designer",
    avatarSrc: "https://example.com/alex.jpg"
  };

  return (
    <div className="testimonial-sizes">
      <Testimonial
        quote={quote}
        author={author}
        size="sm"
      />
      
      <Testimonial
        quote={quote}
        author={author}
      />
      
      <Testimonial
        quote={quote}
        author={author}
        size="lg"
      />
    </div>
  );
}
```

### Without Avatar

```jsx
function NoAvatarTestimonial() {
  return (
    <Testimonial
      quote="Simple yet powerful. This tool has streamlined our entire workflow and saved us countless hours."
      author={{
        name: "David Kim",
        role: "Operations Manager"
      }}
    />
  );
}
```

### Loading State

```jsx
function TestimonialWithLoading() {
  const [loading, setLoading] = useState(true);
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTestimonial({
        quote: "This platform has revolutionized our customer engagement strategy.",
        author: {
          name: "Lisa Wang",
          role: "Marketing Director",
          avatarSrc: "https://example.com/lisa.jpg"
        }
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Testimonial skeleton={true} />;
  }

  return (
    <Testimonial
      quote={testimonial.quote}
      author={testimonial.author}
    />
  );
}
```

### Testimonial Grid

```jsx
function TestimonialGrid() {
  const testimonials = [
    {
      id: 1,
      quote: "Exceptional service and support. They truly care about their customers' success.",
      author: {
        name: "Jennifer Adams",
        role: "VP of Sales",
        avatarSrc: "https://example.com/jennifer.jpg"
      }
    },
    {
      id: 2,
      quote: "The ROI we've seen since implementing this solution has been incredible.",
      author: {
        name: "Robert Martinez",
        role: "Finance Director",
        avatarSrc: "https://example.com/robert.jpg"
      }
    },
    {
      id: 3,
      quote: "User-friendly interface with powerful features. Perfect combination!",
      author: {
        name: "Amanda Foster",
        role: "UX Designer",
        avatarSrc: "https://example.com/amanda.jpg"
      }
    }
  ];

  return (
    <div className="testimonial-grid">
      <h2>What Our Customers Say</h2>
      <div className="grid">
        {testimonials.map(testimonial => (
          <Testimonial
            key={testimonial.id}
            quote={testimonial.quote}
            author={testimonial.author}
          />
        ))}
      </div>
    </div>
  );
}
```

### Featured Testimonial

```jsx
function FeaturedTestimonial() {
  return (
    <div className="featured-testimonial-section">
      <div className="container">
        <Testimonial
          quote={
            <div>
              <p>
                "In just three months, our conversion rates improved by <strong>150%</strong> 
                and our customer satisfaction scores reached an all-time high."
              </p>
              <p>
                "The platform is intuitive, powerful, and backed by an amazing support team. 
                It's exactly what we needed to scale our business."
              </p>
            </div>
          }
          author={{
            name: "Maria Gonzalez",
            role: "CEO & Founder at GrowthCo",
            avatarSrc: "https://example.com/maria.jpg",
            avatarAlt: "Maria Gonzalez, CEO of GrowthCo"
          }}
          size="lg"
          className="featured-testimonial"
        />
        
        <div className="social-proof">
          <div className="stat">
            <strong>500+</strong>
            <span>Happy Customers</span>
          </div>
          <div className="stat">
            <strong>4.9/5</strong>
            <span>Average Rating</span>
          </div>
          <div className="stat">
            <strong>99%</strong>
            <span>Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Video Testimonial Card

```jsx
function VideoTestimonial() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="video-testimonial">
      <Testimonial
        quote="Watch how our platform helped transform their business in just 6 months."
        author={{
          name: "James Wilson",
          role: "Senior Developer at DevCorp",
          avatarSrc: "https://example.com/james.jpg"
        }}
        className="video-testimonial-card"
      />
      
      <div className="video-overlay">
        <button 
          className="play-button"
          onClick={() => setShowVideo(true)}
          aria-label="Play video testimonial"
        >
          <Icon name="Play" size="lg" />
        </button>
      </div>
      
      {showVideo && (
        <Modal onClose={() => setShowVideo(false)}>
          <video controls autoPlay>
            <source src="testimonial-video.mp4" type="video/mp4" />
          </video>
        </Modal>
      )}
    </div>
  );
}
```

### Testimonial Carousel

```jsx
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "Outstanding product quality and customer service!",
      author: { name: "Alice Cooper", role: "Product Manager" }
    },
    {
      quote: "Best investment we've made for our business.",
      author: { name: "Bob Wilson", role: "Business Owner" }
    },
    {
      quote: "Highly recommend to anyone in our industry.",
      author: { name: "Carol Davis", role: "Industry Expert" }
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="testimonial-carousel">
      <div className="carousel-container">
        <Testimonial
          quote={testimonials[currentIndex].quote}
          author={testimonials[currentIndex].author}
          size="lg"
        />
      </div>
      
      <div className="carousel-controls">
        <button onClick={prevTestimonial} aria-label="Previous testimonial">
          <Icon name="ChevronLeft" />
        </button>
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <button onClick={nextTestimonial} aria-label="Next testimonial">
          <Icon name="ChevronRight" />
        </button>
      </div>
    </div>
  );
}
```

### Industry-Specific Testimonials

```jsx
function IndustryTestimonials() {
  const testimonialsByIndustry = {
    healthcare: [
      {
        quote: "Patient satisfaction has improved significantly since we started using this platform.",
        author: { name: "Dr. Sarah Lee", role: "Chief Medical Officer" }
      }
    ],
    finance: [
      {
        quote: "The security features and compliance tools are exactly what we needed.",
        author: { name: "Mark Johnson", role: "Risk Management Director" }
      }
    ],
    education: [
      {
        quote: "Our students are more engaged and learning outcomes have improved.",
        author: { name: "Prof. Lisa Chen", role: "Dean of Students" }
      }
    ]
  };

  const [selectedIndustry, setSelectedIndustry] = useState('healthcare');

  return (
    <div className="industry-testimonials">
      <div className="industry-tabs">
        {Object.keys(testimonialsByIndustry).map(industry => (
          <button
            key={industry}
            className={`tab ${selectedIndustry === industry ? 'active' : ''}`}
            onClick={() => setSelectedIndustry(industry)}
          >
            {industry.charAt(0).toUpperCase() + industry.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="testimonials-content">
        {testimonialsByIndustry[selectedIndustry].map((testimonial, index) => (
          <Testimonial
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
          />
        ))}
      </div>
    </div>
  );
}
```

## Accessibility

The Testimonial component follows WCAG accessibility guidelines:

### Semantic HTML

- Uses `<blockquote>` for quotes with proper citation
- Implements `<cite>` element for author attribution  
- Uses `<footer>` for author information section
- Maintains proper heading hierarchy when used with titles

### Screen Reader Support

```jsx
function AccessibleTestimonial() {
  return (
    <Testimonial
      quote="This platform has exceeded all our expectations and delivered incredible results."
      author={{
        name: "Karen Smith",
        role: "Director of Operations at ABC Corp",
        avatarSrc: "https://example.com/karen.jpg",
        avatarAlt: "Karen Smith, Director of Operations"
      }}
      aria-label="Customer testimonial from Karen Smith"
    />
  );
}
```

### Best Practices

1. **Provide meaningful alt text** for avatar images
2. **Use semantic HTML** for quotes and citations
3. **Include proper attribution** for all testimonials
4. **Ensure sufficient color contrast** for all text
5. **Test with screen readers** for proper content flow

## Styling

### CSS Custom Properties

The Testimonial component uses CSS custom properties for theming:

```css
:root {
  /* Container */
  --atomix-testimonial-bg: var(--atomix-white);
  --atomix-testimonial-border: 1px solid var(--atomix-border-color);
  --atomix-testimonial-border-radius: var(--atomix-border-radius-lg);
  --atomix-testimonial-padding: 1.5rem;
  --atomix-testimonial-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  /* Quote */
  --atomix-testimonial-quote-font-size: 1.125rem;
  --atomix-testimonial-quote-line-height: 1.6;
  --atomix-testimonial-quote-color: var(--atomix-text-primary);
  --atomix-testimonial-quote-font-style: italic;
  --atomix-testimonial-quote-margin: 0 0 1.5rem;

  /* Quote marks */
  --atomix-testimonial-quote-mark-size: 2rem;
  --atomix-testimonial-quote-mark-color: var(--atomix-primary-alpha-30);
  --atomix-testimonial-quote-mark-font-family: 'Georgia', serif;

  /* Author */
  --atomix-testimonial-author-gap: 1rem;
  --atomix-testimonial-avatar-size: 3rem;
  --atomix-testimonial-avatar-border-radius: 50%;

  /* Author info */
  --atomix-testimonial-name-font-size: 1rem;
  --atomix-testimonial-name-font-weight: 600;
  --atomix-testimonial-name-color: var(--atomix-text-primary);
  --atomix-testimonial-role-font-size: 0.875rem;
  --atomix-testimonial-role-color: var(--atomix-text-secondary);
  --atomix-testimonial-role-margin-top: 0.25rem;

  /* Size variants */
  --atomix-testimonial-sm-padding: 1rem;
  --atomix-testimonial-sm-quote-font-size: 1rem;
  --atomix-testimonial-sm-avatar-size: 2.5rem;

  --atomix-testimonial-lg-padding: 2rem;
  --atomix-testimonial-lg-quote-font-size: 1.25rem;
  --atomix-testimonial-lg-avatar-size: 4rem;
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base testimonial component */
.c-testimonial {
  background: var(--atomix-testimonial-bg);
  border: var(--atomix-testimonial-border);
  border-radius: var(--atomix-testimonial-border-radius);
  padding: var(--atomix-testimonial-padding);
  box-shadow: var(--atomix-testimonial-shadow);
  position: relative;
}

/* Quote section */
.c-testimonial__quote {
  font-size: var(--atomix-testimonial-quote-font-size);
  line-height: var(--atomix-testimonial-quote-line-height);
  color: var(--atomix-testimonial-quote-color);
  font-style: var(--atomix-testimonial-quote-font-style);
  margin: var(--atomix-testimonial-quote-margin);
  position: relative;
}

.c-testimonial__quote::before {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: -0.75rem;
  font-size: var(--atomix-testimonial-quote-mark-size);
  color: var(--atomix-testimonial-quote-mark-color);
  font-family: var(--atomix-testimonial-quote-mark-font-family);
  line-height: 1;
}

.c-testimonial__quote p {
  margin: 0;
}

.c-testimonial__quote p + p {
  margin-top: 1rem;
}

/* Author section */
.c-testimonial__author {
  display: flex;
  align-items: center;
  gap: var(--atomix-testimonial-author-gap);
}

.c-testimonial__avatar {
  width: var(--atomix-testimonial-avatar-size);
  height: var(--atomix-testimonial-avatar-size);
  border-radius: var(--atomix-testimonial-avatar-border-radius);
  object-fit: cover;
  flex-shrink: 0;
}

.c-testimonial__author-info {
  min-width: 0;
}

.c-testimonial__name {
  display: block;
  font-size: var(--atomix-testimonial-name-font-size);
  font-weight: var(--atomix-testimonial-name-font-weight);
  color: var(--atomix-testimonial-name-color);
  font-style: normal;
}

.c-testimonial__role {
  font-size: var(--atomix-testimonial-role-font-size);
  color: var(--atomix-testimonial-role-color);
  margin-top: var(--atomix-testimonial-role-margin-top);
}

/* Size variants */
.c-testimonial--sm {
  padding: var(--atomix-testimonial-sm-padding);
}

.c-testimonial--sm .c-testimonial__quote {
  font-size: var(--atomix-testimonial-sm-quote-font-size);
}

.c-testimonial--sm .c-testimonial__avatar {
  width: var(--atomix-testimonial-sm-avatar-size);
  height: var(--atomix-testimonial-sm-avatar-size);
}

.c-testimonial--lg {
  padding: var(--atomix-testimonial-lg-padding);
}

.c-testimonial--lg .c-testimonial__quote {
  font-size: var(--atomix-testimonial-lg-quote-font-size);
}

.c-testimonial--lg .c-testimonial__avatar {
  width: var(--atomix-testimonial-lg-avatar-size);
  height: var(--atomix-testimonial-lg-avatar-size);
}

/* Skeleton loading state */
.c-testimonial--skeleton .c-testimonial__quote {
  height: 4rem;
  background: var(--atomix-skeleton-bg);
  border-radius: var(--atomix-border-radius);
  animation: var(--atomix-skeleton-animation);
}

.c-testimonial--skeleton .c-testimonial__avatar {
  background: var(--atomix-skeleton-bg);
  animation: var(--atomix-skeleton-animation);
}

.c-testimonial--skeleton .c-testimonial__name,
.c-testimonial--skeleton .c-testimonial__role {
  height: 1rem;
  background: var(--atomix-skeleton-bg);
  border-radius: var(--atomix-border-radius);
  animation: var(--atomix-skeleton-animation);
}

.c-testimonial--skeleton .c-testimonial__role {
  height: 0.875rem;
  width: 80%;
}
```

### Customization Examples

```css
/* Minimal style */
.c-testimonial--minimal {
  border: none;
  box-shadow: none;
  background: transparent;
  padding: 1rem 0;
}

.c-testimonial--minimal .c-testimonial__quote::before {
  display: none;
}

/* Card style with hover effect */
.c-testimonial--card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.c-testimonial--card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Colorful quote marks */
.c-testimonial--colorful .c-testimonial__quote::before {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Dark theme */
.c-testimonial--dark {
  background: var(--atomix-gray-800);
  border-color: var(--atomix-gray-700);
  color: var(--atomix-white);
}

.c-testimonial--dark .c-testimonial__quote {
  color: var(--atomix-gray-100);
}

.c-testimonial--dark .c-testimonial__name {
  color: var(--atomix-white);
}

.c-testimonial--dark .c-testimonial__role {
  color: var(--atomix-gray-400);
}

/* Bordered style */
.c-testimonial--bordered {
  border-left: 4px solid var(--atomix-primary);
}

/* Center aligned */
.c-testimonial--center {
  text-align: center;
}

.c-testimonial--center .c-testimonial__author {
  justify-content: center;
  flex-direction: column;
}

.c-testimonial--center .c-testimonial__quote::before {
  left: 50%;
  transform: translateX(-50%);
}
```

## Common Patterns

### Customer Success Stories

```jsx
function CustomerSuccessStories() {
  const stories = [
    {
      quote: "Revenue increased by 300% in the first quarter after implementation.",
      author: { name: "Jessica Brown", role: "VP of Sales" },
      metric: "300% Revenue Increase"
    },
    {
      quote: "Cut operational costs by 40% while improving efficiency.",
      author: { name: "Tom Wilson", role: "Operations Director" }, 
      metric: "40% Cost Reduction"
    }
  ];

  return (
    <div className="success-stories">
      <h2>Customer Success Stories</h2>
      <div className="stories-grid">
        {stories.map((story, index) => (
          <div key={index} className="story-card">
            <div className="metric-highlight">{story.metric}</div>
            <Testimonial
              quote={story.quote}
              author={story.author}
              className="story-testimonial"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Social Proof Section

```jsx
function SocialProofSection() {
  return (
    <section className="social-proof">
      <div className="container">
        <div className="section-header">
          <h2>Trusted by Industry Leaders</h2>
          <p>See what our customers have to say about their experience</p>
        </div>
        
        <div className="testimonials-showcase">
          <div className="featured-testimonial">
            <Testimonial
              quote="This platform has become an essential part of our daily operations. The ROI has been phenomenal."
              author={{
                name: "Rachel Green",
                role: "Chief Technology Officer",
                avatarSrc: "https://example.com/rachel.jpg"
              }}
              size="lg"
            />
          </div>
          
          <div className="supporting-testimonials">
            <Testimonial
              quote="Excellent customer support and reliable service."
              author={{ name: "Mike Davis", role: "IT Director" }}
              size="sm"
            />
            <Testimonial
              quote="Easy to use and packed with features we actually need."
              author={{ name: "Anna Taylor", role: "Project Manager" }}
              size="sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Performance Considerations

1. **Image optimization**: Use appropriate avatar image sizes
2. **Content loading**: Implement skeleton states for dynamic content
3. **Lazy loading**: Load testimonials below the fold lazily
4. **Caching**: Cache testimonial data when fetching from APIs

```jsx
// Optimized testimonial with lazy loading
const LazyTestimonial = ({ author, ...props }) => {
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  return (
    <Testimonial
      {...props}
      author={{
        ...author,
        avatarSrc: avatarLoaded ? author.avatarSrc : undefined
      }}
      onAvatarLoad={() => setAvatarLoaded(true)}
    />
  );
};
```

## Integration Examples

### With Review APIs

```jsx
// Integration with review platform
function APITestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(response => response.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="testimonials-loading">
        {[1, 2, 3].map(i => (
          <Testimonial key={i} skeleton={true} />
        ))}
      </div>
    );
  }

  return (
    <div className="api-testimonials">
      {testimonials.map(testimonial => (
        <Testimonial
          key={testimonial.id}
          quote={testimonial.content}
          author={{
            name: testimonial.author.name,
            role: testimonial.author.title,
            avatarSrc: testimonial.author.avatar
          }}
        />
      ))}
    </div>
  );
}
```

## Browser Support

The Testimonial component supports all modern browsers:

- Chrome 60+
- Firefox 55+  
- Safari 12+
- Edge 79+

## Related Components

- **[Avatar](./avatar.md)** - Used for author images
- **[Card](./card.md)** - Alternative container for testimonials
- **[Rating](./rating.md)** - Often used with testimonials
- **[Button](./button.md)** - Used in testimonial CTAs
- **[Icon](./icon.md)** - Used for quote marks and decorations

## Migration Guide

### From Custom Testimonial

```jsx
// Before (custom testimonial)
<div className="testimonial">
  <blockquote>"Great product!"</blockquote>
  <div className="author">
    <img src="avatar.jpg" />
    <span>John Doe, CEO</span>
  </div>
</div>

// After (Atomix Testimonial)
<Testimonial
  quote="Great product!"
  author={{
    name: "John Doe",
    role: "CEO",
    avatarSrc: "avatar.jpg"
  }}
/>
```
