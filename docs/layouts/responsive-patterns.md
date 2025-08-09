# Responsive Design Patterns

This guide covers common responsive design patterns and best practices using the Atomix Layout system. Learn how to create flexible, accessible layouts that work beautifully across all devices and screen sizes.

## Overview

Responsive design patterns are reusable solutions for common layout challenges. These patterns have been tested across devices and proven to provide excellent user experiences while maintaining accessibility and performance.

### Key Principles

- **📱 Mobile-First** - Start with mobile and enhance for larger screens
- **🎯 Progressive Enhancement** - Layer features based on device capabilities
- **⚖️ Flexible Grids** - Use relative units and flexible layouts
- **🖼️ Responsive Media** - Images and media that adapt to containers
- **🎨 Consistent Spacing** - Maintain visual hierarchy across breakpoints

## Common Layout Patterns

### 1. Sidebar Layout

Perfect for blogs, documentation, and admin dashboards.

#### Desktop-First Sidebar

```jsx
function SidebarLayout({ children, sidebar }) {
  return (
    <Container>
      <Grid>
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <GridCol xs={12} lg={3} className="d-none d-lg-block">
          <aside className="sidebar">
            {sidebar}
          </aside>
        </GridCol>
        
        {/* Main content */}
        <GridCol xs={12} lg={9}>
          <main className="main-content">
            {children}
          </main>
        </GridCol>
      </Grid>
    </Container>
  );
}
```

#### Collapsible Sidebar

```jsx
function CollapsibleSidebar({ children, sidebar }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Container type="fluid">
      <Grid noGutters>
        {/* Mobile sidebar toggle */}
        <GridCol xs={12} className="d-lg-none">
          <header className="mobile-header">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn--ghost sidebar-toggle"
            >
              <Icon name="Menu" />
              Menu
            </button>
          </header>
        </GridCol>

        {/* Sidebar */}
        <GridCol 
          xs={12} 
          lg={3} 
          className={`sidebar-col ${sidebarOpen ? 'mobile-open' : ''}`}
        >
          <aside className="sidebar">
            <div className="sidebar-header d-lg-none">
              <button 
                onClick={() => setSidebarOpen(false)}
                className="btn btn--ghost close-sidebar"
              >
                <Icon name="X" />
              </button>
            </div>
            {sidebar}
          </aside>
        </GridCol>

        {/* Main content */}
        <GridCol xs={12} lg={9}>
          <main className="main-content">
            {children}
          </main>
        </GridCol>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="sidebar-overlay d-lg-none"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </Grid>
    </Container>
  );
}
```

### 2. Holy Grail Layout

Classic three-column layout with header and footer.

```jsx
function HolyGrailLayout({ 
  header, 
  leftSidebar, 
  rightSidebar, 
  footer, 
  children 
}) {
  return (
    <Container type="fluid" className="holy-grail">
      {/* Header */}
      <Grid>
        <GridCol xs={12}>
          <header className="main-header">
            {header}
          </header>
        </GridCol>
      </Grid>

      {/* Main content area */}
      <Grid className="main-area">
        {/* Left sidebar - Stack on mobile */}
        <GridCol xs={12} lg={2} xl={3}>
          <aside className="left-sidebar">
            {leftSidebar}
          </aside>
        </GridCol>

        {/* Main content */}
        <GridCol xs={12} lg={8} xl={6}>
          <main className="main-content">
            {children}
          </main>
        </GridCol>

        {/* Right sidebar - Stack on mobile */}
        <GridCol xs={12} lg={2} xl={3}>
          <aside className="right-sidebar">
            {rightSidebar}
          </aside>
        </GridCol>
      </Grid>

      {/* Footer */}
      <Grid>
        <GridCol xs={12}>
          <footer className="main-footer">
            {footer}
          </footer>
        </GridCol>
      </Grid>
    </Container>
  );
}
```

### 3. Dashboard Layout

Multi-panel layout for data-heavy applications.

```jsx
function DashboardLayout({ stats, charts, activities, notifications }) {
  return (
    <Container type="fluid">
      {/* Header with stats */}
      <Grid className="mb-4">
        {stats.map((stat, index) => (
          <GridCol key={index} xs={6} md={3}>
            <div className="stat-card">
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
              <div className="stat-card__change">
                <Icon name={stat.trend} />
                {stat.change}
              </div>
            </div>
          </GridCol>
        ))}
      </Grid>

      {/* Main dashboard content */}
      <Grid>
        {/* Charts section */}
        <GridCol xs={12} xl={8}>
          <div className="charts-section">
            <Grid>
              <GridCol xs={12} lg={8}>
                <Card>
                  <Card.Header>
                    <h2>Revenue Chart</h2>
                  </Card.Header>
                  <Card.Body>
                    {charts.revenue}
                  </Card.Body>
                </Card>
              </GridCol>
              <GridCol xs={12} lg={4}>
                <Card>
                  <Card.Header>
                    <h2>Conversion Rate</h2>
                  </Card.Header>
                  <Card.Body>
                    {charts.conversion}
                  </Card.Body>
                </Card>
              </GridCol>
            </Grid>
          </div>
        </GridCol>

        {/* Sidebar with activities */}
        <GridCol xs={12} xl={4}>
          <div className="sidebar-panels">
            <Card className="mb-4">
              <Card.Header>
                <h3>Recent Activities</h3>
              </Card.Header>
              <Card.Body>
                {activities}
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h3>Notifications</h3>
              </Card.Header>
              <Card.Body>
                {notifications}
              </Card.Body>
            </Card>
          </div>
        </GridCol>
      </Grid>
    </Container>
  );
}
```

### 4. Card Grid Layout

Flexible card-based layout for content discovery.

```jsx
function CardGridLayout({ cards, filters }) {
  return (
    <Container>
      {/* Filters */}
      <Grid className="mb-4">
        <GridCol xs={12}>
          <div className="filters">
            {filters}
          </div>
        </GridCol>
      </Grid>

      {/* Card grid */}
      <Grid>
        {cards.map((card, index) => (
          <GridCol 
            key={card.id} 
            xs={12} 
            sm={6} 
            md={4} 
            xl={3}
          >
            <Card className="h-100">
              {card.image && (
                <Card.Image 
                  src={card.image} 
                  alt={card.title}
                  aspectRatio="16:9"
                />
              )}
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" size="sm">
                  {card.action}
                </Button>
              </Card.Footer>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
}
```

### 5. Hero Section Patterns

Attention-grabbing sections for landing pages.

#### Centered Hero

```jsx
function CenteredHero({ title, subtitle, cta, backgroundImage }) {
  return (
    <section 
      className="hero hero--centered"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container>
        <Grid justifyContent="center" alignItems="center" className="min-vh-75">
          <GridCol xs={12} md={8} lg={6}>
            <div className="hero-content text-center">
              <h1 className="hero-title">{title}</h1>
              <p className="hero-subtitle">{subtitle}</p>
              <div className="hero-actions">
                <Button variant="primary" size="lg">
                  {cta.primary}
                </Button>
                <Button variant="outline-secondary" size="lg">
                  {cta.secondary}
                </Button>
              </div>
            </div>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
}
```

#### Split Hero

```jsx
function SplitHero({ content, media }) {
  return (
    <section className="hero hero--split">
      <Container>
        <Grid alignItems="center" className="min-vh-50">
          <GridCol xs={12} lg={6}>
            <div className="hero-content">
              <h1 className="hero-title">{content.title}</h1>
              <p className="hero-subtitle">{content.subtitle}</p>
              <div className="hero-features">
                {content.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <Icon name={feature.icon} />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              <div className="hero-actions">
                <Button variant="primary" size="lg">
                  {content.cta}
                </Button>
              </div>
            </div>
          </GridCol>
          <GridCol xs={12} lg={6}>
            <div className="hero-media">
              {media.type === 'image' ? (
                <img 
                  src={media.src} 
                  alt={media.alt}
                  className="hero-image"
                />
              ) : (
                <video 
                  src={media.src}
                  autoPlay
                  loop
                  muted
                  className="hero-video"
                />
              )}
            </div>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
}
```

## Responsive Breakpoint Strategies

### Mobile-First Media Queries

```scss
// Mobile-first approach
.component {
  // Mobile styles (default)
  padding: 1rem;
  
  // Tablet and up
  @media (min-width: 768px) {
    padding: 2rem;
  }
  
  // Desktop and up
  @media (min-width: 992px) {
    padding: 3rem;
  }
}
```

### Container Queries (Modern Browsers)

```scss
// Container-based responsive design
.card-container {
  container-type: inline-size;
}

.card {
  padding: 1rem;
  
  @container (min-width: 300px) {
    padding: 1.5rem;
    display: flex;
  }
  
  @container (min-width: 500px) {
    padding: 2rem;
  }
}
```

### Responsive Typography

```jsx
function ResponsiveTypography() {
  return (
    <Container>
      <Grid>
        <GridCol xs={12} md={8} offsetMd={2}>
          <article className="responsive-article">
            <header>
              <h1 className="article-title">
                Responsive Typography
              </h1>
              <p className="article-subtitle">
                Scale beautifully across all devices
              </p>
            </header>
            
            <div className="article-content">
              <p className="lead">
                Lead paragraph with larger text for better readability
                on all screen sizes.
              </p>
              
              <p>
                Body text that maintains optimal line length and spacing
                across different viewport sizes for comfortable reading.
              </p>
            </div>
          </article>
        </GridCol>
      </Grid>
    </Container>
  );
}
```

## Advanced Responsive Patterns

### Conditional Rendering Based on Screen Size

```jsx
function ResponsiveComponents() {
  const [screenSize, setScreenSize] = useState('mobile');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) setScreenSize('mobile');
      else if (width < 992) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <Grid>
        <GridCol xs={12}>
          {screenSize === 'mobile' && (
            <MobileNavigation />
          )}
          
          {screenSize === 'tablet' && (
            <TabletNavigation />
          )}
          
          {screenSize === 'desktop' && (
            <DesktopNavigation />
          )}
        </GridCol>
      </Grid>
    </Container>
  );
}
```

### Progressive Image Loading

```jsx
function ResponsiveImageGrid({ images }) {
  return (
    <Container>
      <Grid>
        {images.map(image => (
          <GridCol key={image.id} xs={12} sm={6} md={4} lg={3}>
            <div className="responsive-image-container">
              <picture>
                <source 
                  media="(min-width: 1200px)" 
                  srcSet={`${image.src}?w=400 1x, ${image.src}?w=800 2x`}
                />
                <source 
                  media="(min-width: 768px)" 
                  srcSet={`${image.src}?w=300 1x, ${image.src}?w=600 2x`}
                />
                <img 
                  src={`${image.src}?w=250`}
                  srcSet={`${image.src}?w=250 1x, ${image.src}?w=500 2x`}
                  alt={image.alt}
                  loading="lazy"
                  className="responsive-image"
                />
              </picture>
            </div>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
}
```

### Responsive Tables

```jsx
function ResponsiveTable({ data, columns }) {
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'cards' : 'table');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (viewMode === 'cards') {
    return (
      <Container>
        <Grid>
          {data.map((row, index) => (
            <GridCol key={index} xs={12} sm={6}>
              <Card className="data-card">
                <Card.Body>
                  {columns.map(column => (
                    <div key={column.key} className="data-row">
                      <strong>{column.label}:</strong> {row[column.key]}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Grid>
        <GridCol xs={12}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {columns.map(column => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {columns.map(column => (
                      <td key={column.key}>{row[column.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GridCol>
      </Grid>
    </Container>
  );
}
```

## Performance Optimization

### Lazy Loading Sections

```jsx
function LazySection({ children, threshold = 0.1 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className="lazy-section">
      {isVisible ? (
        children
      ) : (
        <div className="lazy-placeholder">
          <Spinner />
        </div>
      )}
    </div>
  );
}

// Usage
function HomePage() {
  return (
    <>
      <HeroSection />
      
      <LazySection>
        <FeaturesSection />
      </LazySection>
      
      <LazySection>
        <TestimonialsSection />
      </LazySection>
      
      <LazySection>
        <NewsletterSection />
      </LazySection>
    </>
  );
}
```

### Responsive Image Components

```jsx
function ResponsiveImage({ 
  src, 
  alt, 
  sizes = "100vw",
  aspectRatio = "16:9",
  priority = false 
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      className="responsive-image-wrapper"
      style={{ aspectRatio }}
    >
      {!loaded && (
        <div className="image-placeholder">
          <Spinner />
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`responsive-image ${loaded ? 'loaded' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
}
```

## Accessibility in Responsive Design

### Skip Navigation

```jsx
function AccessibleLayout({ children, navigation }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Container type="fluid">
        <Grid>
          <GridCol xs={12}>
            <nav aria-label="Main navigation">
              {navigation}
            </nav>
          </GridCol>
        </Grid>
        
        <Grid>
          <GridCol xs={12}>
            <main id="main-content" tabIndex="-1">
              {children}
            </main>
          </GridCol>
        </Grid>
      </Container>
    </>
  );
}
```

### Responsive Focus Management

```jsx
function ResponsiveModal({ isOpen, onClose, children }) {
  const modalRef = useRef();
  const previousFocus = useRef();

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement;
      modalRef.current?.focus();
    } else {
      previousFocus.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <Container>
        <Grid justifyContent="center" alignItems="center" className="min-vh-100">
          <GridCol xs={12} sm={8} md={6} lg={4}>
            <div
              ref={modalRef}
              className="modal-content"
              role="dialog"
              aria-modal="true"
              tabIndex="-1"
            >
              <button
                onClick={onClose}
                className="modal-close"
                aria-label="Close modal"
              >
                <Icon name="X" />
              </button>
              {children}
            </div>
          </GridCol>
        </Grid>
      </Container>
    </div>
  );
}
```

### Screen Reader Announcements

```jsx
function ResponsiveAnnouncements() {
  const [screenSize, setScreenSize] = useState('');
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newSize;
      
      if (width < 576) newSize = 'mobile';
      else if (width < 768) newSize = 'small tablet';
      else if (width < 992) newSize = 'tablet';
      else if (width < 1200) newSize = 'desktop';
      else newSize = 'large desktop';

      if (newSize !== screenSize) {
        setScreenSize(newSize);
        setAnnouncement(`Layout changed to ${newSize} view`);
        
        // Clear announcement after announcing
        setTimeout(() => setAnnouncement(''), 1000);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [screenSize]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
```

## Testing Responsive Designs

### Visual Regression Testing

```jsx
// test/responsive.test.js
import { render, screen } from '@testing-library/react';
import { ResizeObserver } from '@juggle/resize-observer';

// Mock ResizeObserver
global.ResizeObserver = ResizeObserver;

describe('Responsive Components', () => {
  const breakpoints = [375, 768, 1024, 1440];

  breakpoints.forEach(width => {
    test(`renders correctly at ${width}px`, () => {
      // Set viewport width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      // Trigger resize event
      window.dispatchEvent(new Event('resize'));

      const { container } = render(<ResponsiveComponent />);
      expect(container).toMatchSnapshot(`responsive-${width}px`);
    });
  });
});
```

### E2E Responsive Testing

```javascript
// cypress/integration/responsive.spec.js
describe('Responsive Design', () => {
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1024, height: 768, name: 'laptop' },
    { width: 1440, height: 900, name: 'desktop' }
  ];

  viewports.forEach(viewport => {
    context(`${viewport.name} viewport`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/responsive-demo');
      });

      it('should display navigation correctly', () => {
        if (viewport.width < 768) {
          cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible');
          cy.get('[data-testid="desktop-navigation"]').should('not.be.visible');
        } else {
          cy.get('[data-testid="mobile-menu-toggle"]').should('not.be.visible');
          cy.get('[data-testid="desktop-navigation"]').should('be.visible');
        }
      });

      it('should maintain readable text', () => {
        cy.get('body').should('have.css', 'font-size').and('match', /\d+px/);
        cy.get('h1').should('be.visible');
        cy.get('p').should('be.visible');
      });

      it('should handle layout shifts gracefully', () => {
        cy.get('[data-testid="main-content"]').should('be.visible');
        cy.scrollTo('bottom', { duration: 2000 });
        cy.get('[data-testid="footer"]').should('be.visible');
      });
    });
  });
});
```

## Common Responsive Pitfalls

### 1. Fixed Heights

```jsx
// ❌ Avoid fixed heights
function BadCard() {
  return (
    <div style={{ height: '200px' }}>
      Content might overflow on different screen sizes
    </div>
  );
}

// ✅ Use min-height or flexible heights
function GoodCard() {
  return (
    <div style={{ minHeight: '200px' }}>
      Content can grow as needed
    </div>
  );
}
```

### 2. Assuming Touch vs Desktop

```jsx
// ❌ Don't assume device type
function BadInteraction() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  return (
    <button 
      onMouseEnter={!isMobile ? handleHover : undefined}
      onClick={handleClick}
    >
      Hover me
    </button>
  );
}

// ✅ Support all interaction methods
function GoodInteraction() {
  return (
    <button 
      onMouseEnter={handleHover}
      onFocus={handleFocus}
      onClick={handleClick}
      onTouchStart={handleTouch}
    >
      Interact with me
    </button>
  );
}
```

### 3. Viewport Units Without Fallbacks

```scss
// ❌ Can cause issues on mobile browsers
.hero {
  height: 100vh;
}

// ✅ Provide fallback and use CSS custom properties
.hero {
  height: 500px; /* fallback */
  height: calc(var(--vh, 1vh) * 100);
}

// JavaScript to handle mobile viewport issues
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
```

## Best Practices Checklist

### Design Phase
- [ ] Start with mobile wireframes
- [ ] Define breakpoint strategy
- [ ] Plan content hierarchy
- [ ] Consider touch targets (44px minimum)
- [ ] Design for one-handed use

### Development Phase
- [ ] Use mobile-first CSS
- [ ] Test on real devices
- [ ] Optimize images for different screen densities
- [ ] Implement proper focus management
- [ ] Ensure keyboard navigation works

### Testing Phase
- [ ] Test across multiple devices and browsers
- [ ] Verify text remains readable at all sizes
- [ ] Check touch targets are accessible
- [ ] Test with slow network connections
- [ ] Validate accessibility with screen readers

### Performance Phase
- [ ] Optimize images and media
- [ ] Minimize layout shifts
- [ ] Use lazy loading for non-critical content
- [ ] Implement proper caching strategies
- [ ] Monitor Core Web Vitals

---

**Ready to build responsive layouts?** Start with one of the common patterns above and gradually add more advanced features. For questions and support, visit our [GitHub Discussions](https://github.com/shohojdhara/atomix/discussions). 📱💻

*Built with ❤️ by the Atomix team*