# Examples

Real-world examples and patterns for building applications with the Atomix Design System. Learn from practical implementations and common use cases.

## 🎯 Example Categories

### 🏗️ [Common Patterns](./common-patterns.md)
Frequently used UI patterns and their Atomix implementations.

**Includes:**
- Navigation patterns
- Form layouts
- Card compositions
- Modal workflows
- Data display patterns

### 📐 [Layout Examples](./layouts.md)
Complete page layouts and responsive design patterns.

**Includes:**
- Dashboard layouts
- Landing pages
- E-commerce layouts
- Blog layouts
- Application shells

### 🔌 [Framework Integrations](./integrations.md)
Integration examples with popular frameworks and tools.

**Includes:**
- Next.js integration
- Gatsby integration
- Vite setup
- Webpack configuration
- Storybook setup

## 🚀 Quick Examples

### Basic Card Layout

```jsx
import { Card, Button, Badge, Avatar } from '@shohojdhara/atomix';

function ProductCard({ product }) {
  return (
    <Card className="u-h-100">
      <Card.Header>
        <div className="u-d-flex u-justify-content-between u-align-items-start">
          <Badge variant={product.status === 'new' ? 'success' : 'secondary'}>
            {product.status}
          </Badge>
          <Button variant="ghost" size="sm" aria-label="Add to favorites">
            ♡
          </Button>
        </div>
      </Card.Header>
      
      <Card.Body>
        <img 
          src={product.image} 
          alt={product.name}
          className="u-w-100 u-mb-4 u-rounded"
        />
        <h3 className="u-mb-2">{product.name}</h3>
        <p className="u-text-secondary u-mb-4">{product.description}</p>
        <div className="u-d-flex u-justify-content-between u-align-items-center">
          <span className="u-fw-bold u-fs-lg">${product.price}</span>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <Avatar size="sm" src={product.seller.avatar} />
            <span className="u-fs-sm u-text-tertiary">{product.seller.name}</span>
          </div>
        </div>
      </Card.Body>
      
      <Card.Footer>
        <Button variant="primary" className="u-w-100">
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
}
```

### Responsive Navigation

```jsx
import { Navbar, Nav, Button, Dropdown } from '@shohojdhara/atomix';

function AppNavigation() {
  return (
    <Navbar expand="lg" className="u-bg-white u-shadow-sm">
      <div className="o-container">
        <Navbar.Brand href="/">
          <img src="/logo.svg" alt="Company" className="u-h-8" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-nav" />
        
        <Navbar.Collapse id="main-nav">
          <Nav className="u-me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/solutions">Solutions</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link}>
                Resources
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/docs">Documentation</Dropdown.Item>
                <Dropdown.Item href="/guides">Guides</Dropdown.Item>
                <Dropdown.Item href="/examples">Examples</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/support">Support</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          
          <div className="u-d-flex u-gap-2">
            <Button variant="ghost" href="/login">
              Sign In
            </Button>
            <Button variant="primary" href="/signup">
              Get Started
            </Button>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
```

### Form with Validation

```jsx
import { Form, FormGroup, Input, Button, Callout } from '@shohojdhara/atomix';
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      await submitForm(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="u-max-w-md u-mx-auto">
      {success && (
        <Callout variant="success" className="u-mb-4">
          Thank you! Your message has been sent successfully.
        </Callout>
      )}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormGroup.Label htmlFor="name">Name</FormGroup.Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            isInvalid={!!errors.name}
            placeholder="Your full name"
          />
          {errors.name && (
            <FormGroup.Feedback type="invalid">
              {errors.name}
            </FormGroup.Feedback>
          )}
        </FormGroup>

        <FormGroup>
          <FormGroup.Label htmlFor="email">Email</FormGroup.Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            isInvalid={!!errors.email}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <FormGroup.Feedback type="invalid">
              {errors.email}
            </FormGroup.Feedback>
          )}
        </FormGroup>

        <FormGroup>
          <FormGroup.Label htmlFor="message">Message</FormGroup.Label>
          <Input
            as="textarea"
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            isInvalid={!!errors.message}
            placeholder="Your message..."
          />
          {errors.message && (
            <FormGroup.Feedback type="invalid">
              {errors.message}
            </FormGroup.Feedback>
          )}
        </FormGroup>

        {errors.submit && (
          <Callout variant="error" className="u-mb-4">
            {errors.submit}
          </Callout>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          className="u-w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </Form>
    </div>
  );
}
```

### Dashboard Layout

```jsx
import { Card, Badge, Progress, Avatar, Button } from '@shohojdhara/atomix';

function Dashboard() {
  return (
    <div className="o-container u-py-6">
      {/* Header */}
      <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-6">
        <div>
          <h1 className="u-mb-2">Dashboard</h1>
          <p className="u-text-secondary">Welcome back, Sarah!</p>
        </div>
        <Button variant="primary">New Project</Button>
      </div>

      {/* Stats Grid */}
      <div className="o-grid u-mb-6" style={{ '--grid-columns': 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <Card>
          <Card.Body>
            <div className="u-d-flex u-justify-content-between u-align-items-start u-mb-3">
              <div>
                <p className="u-text-secondary u-mb-1">Total Revenue</p>
                <h3 className="u-mb-0">$45,231</h3>
              </div>
              <Badge variant="success">+20.1%</Badge>
            </div>
            <Progress value={75} variant="success" size="sm" />
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="u-d-flex u-justify-content-between u-align-items-start u-mb-3">
              <div>
                <p className="u-text-secondary u-mb-1">Active Users</p>
                <h3 className="u-mb-0">2,350</h3>
              </div>
              <Badge variant="primary">+180</Badge>
            </div>
            <Progress value={60} variant="primary" size="sm" />
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="u-d-flex u-justify-content-between u-align-items-start u-mb-3">
              <div>
                <p className="u-text-secondary u-mb-1">Conversion Rate</p>
                <h3 className="u-mb-0">3.24%</h3>
              </div>
              <Badge variant="warning">-0.5%</Badge>
            </div>
            <Progress value={32} variant="warning" size="sm" />
          </Card.Body>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="o-grid" style={{ '--grid-columns': '2fr 1fr', '--grid-gap': '2rem' }}>
        {/* Recent Activity */}
        <Card>
          <Card.Header>
            <h4>Recent Activity</h4>
          </Card.Header>
          <Card.Body>
            <div className="u-space-y-4">
              {[
                { user: 'John Doe', action: 'completed project "Website Redesign"', time: '2 hours ago' },
                { user: 'Sarah Smith', action: 'added new team member', time: '4 hours ago' },
                { user: 'Mike Johnson', action: 'updated project timeline', time: '6 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="u-d-flex u-gap-3">
                  <Avatar size="sm" name={activity.user} />
                  <div className="u-flex-1">
                    <p className="u-mb-1">
                      <strong>{activity.user}</strong> {activity.action}
                    </p>
                    <p className="u-text-secondary u-fs-sm u-mb-0">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <h4>Quick Actions</h4>
          </Card.Header>
          <Card.Body>
            <div className="u-space-y-3">
              <Button variant="outline-primary" className="u-w-100 u-justify-content-start">
                📊 View Analytics
              </Button>
              <Button variant="outline-primary" className="u-w-100 u-justify-content-start">
                👥 Manage Team
              </Button>
              <Button variant="outline-primary" className="u-w-100 u-justify-content-start">
                ⚙️ Settings
              </Button>
              <Button variant="outline-primary" className="u-w-100 u-justify-content-start">
                📝 Create Report
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
```

## 🎨 Styling Examples

### Custom Theme Implementation

```css
/* Custom brand theme */
[data-theme="brand"] {
  --atomix-primary: #ff6b6b;
  --atomix-primary-hover: #ff5252;
  --atomix-secondary: #4ecdc4;
  --atomix-success: #45b7d1;
  --atomix-border-radius: 1rem;
  --atomix-font-family-base: 'Poppins', sans-serif;
}

/* Dark theme customizations */
[data-theme="dark"] {
  --atomix-bg-primary: #0f172a;
  --atomix-bg-secondary: #1e293b;
  --atomix-text-primary: #f1f5f9;
  --atomix-text-secondary: #cbd5e1;
  --atomix-border-primary: #334155;
}
```

### Responsive Utilities

```html
<!-- Mobile-first responsive design -->
<div class="u-p-4 u-p-md-6 u-p-lg-8">
  <h1 class="u-fs-xl u-fs-md-2xl u-fs-lg-3xl u-text-center u-text-md-start">
    Responsive Heading
  </h1>
  
  <div class="u-d-flex u-flex-column u-flex-md-row u-gap-4 u-gap-md-6">
    <div class="u-flex-1">Main content</div>
    <div class="u-w-md-25 u-w-lg-20">Sidebar</div>
  </div>
</div>
```

## 🔗 Related Documentation

- [Components](../components/README.md) - Component library reference
- [Design Tokens](../design-tokens/README.md) - Design system foundation
- [Styles](../styles/README.md) - CSS architecture and utilities
- [Guides](../guides/README.md) - Comprehensive guides and tutorials
- [API Reference](../api/README.md) - Complete API documentation

## 🚀 Next Steps

1. **Explore Patterns** - Browse [Common Patterns](./common-patterns.md)
2. **Study Layouts** - Check out [Layout Examples](./layouts.md)
3. **Try Integrations** - Learn about [Framework Integrations](./integrations.md)
4. **Build Your Own** - Start creating with these patterns as inspiration

---

Learn from real-world examples and build amazing interfaces! 🎯
