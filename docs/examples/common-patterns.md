# Common UI Patterns

Real-world examples of frequently used UI patterns built with Atomix components. These patterns solve common design challenges and provide proven solutions for typical user interface needs.

## 🎯 Navigation Patterns

### Header with Navigation

```jsx
import { Navbar, Nav, Button, Dropdown, Badge } from '@shohojdhara/atomix';

function AppHeader() {
  return (
    <Navbar expand="lg" className="u-bg-white u-shadow-sm">
      <div className="o-container">
        {/* Brand */}
        <Navbar.Brand href="/" className="u-d-flex u-align-items-center u-gap-2">
          <img src="/logo.svg" alt="Company" className="u-h-8" />
          <span className="u-fw-bold u-fs-lg">Atomix</span>
        </Navbar.Brand>
        
        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="main-nav" />
        
        {/* Navigation */}
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
          
          {/* Actions */}
          <div className="u-d-flex u-align-items-center u-gap-3">
            <Button variant="ghost" size="sm">
              🔍
            </Button>
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

### Sidebar Navigation

```jsx
import { Nav, Badge, Accordion } from '@shohojdhara/atomix';

function SidebarNav({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__header u-p-4 u-border-bottom">
        <div className="u-d-flex u-justify-content-between u-align-items-center">
          <h3 className="u-mb-0">Menu</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
      </div>
      
      <div className="sidebar__content u-p-4">
        <Nav vertical>
          <Nav.Link href="/dashboard" className="u-d-flex u-justify-content-between">
            Dashboard
            <Badge variant="primary">3</Badge>
          </Nav.Link>
          
          <Accordion>
            <Accordion.Item>
              <Accordion.Header>Projects</Accordion.Header>
              <Accordion.Body>
                <Nav vertical className="u-ps-3">
                  <Nav.Link href="/projects/active">Active Projects</Nav.Link>
                  <Nav.Link href="/projects/archived">Archived</Nav.Link>
                  <Nav.Link href="/projects/templates">Templates</Nav.Link>
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          
          <Nav.Link href="/team">Team</Nav.Link>
          <Nav.Link href="/settings">Settings</Nav.Link>
        </Nav>
      </div>
    </div>
  );
}
```

## 📝 Form Patterns

### Contact Form with Validation

```jsx
import { Form, FormGroup, Input, Textarea, Button, Callout } from '@shohojdhara/atomix';
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        await submitForm(formData);
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        setErrors({ submit: 'Failed to send message. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="u-max-w-lg u-mx-auto">
      {success && (
        <Callout variant="success" className="u-mb-6">
          Thank you! Your message has been sent successfully.
        </Callout>
      )}
      
      <Form onSubmit={handleSubmit}>
        <div className="u-row u-gap-4">
          <div className="u-col-md-6">
            <FormGroup>
              <FormGroup.Label htmlFor="name">Name *</FormGroup.Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                isInvalid={!!errors.name}
                placeholder="Your full name"
              />
              {errors.name && (
                <FormGroup.Feedback type="invalid">
                  {errors.name}
                </FormGroup.Feedback>
              )}
            </FormGroup>
          </div>
          
          <div className="u-col-md-6">
            <FormGroup>
              <FormGroup.Label htmlFor="email">Email *</FormGroup.Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                isInvalid={!!errors.email}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <FormGroup.Feedback type="invalid">
                  {errors.email}
                </FormGroup.Feedback>
              )}
            </FormGroup>
          </div>
        </div>

        <FormGroup>
          <FormGroup.Label htmlFor="subject">Subject *</FormGroup.Label>
          <Input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange('subject')}
            isInvalid={!!errors.subject}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <FormGroup.Feedback type="invalid">
              {errors.subject}
            </FormGroup.Feedback>
          )}
        </FormGroup>

        <FormGroup>
          <FormGroup.Label htmlFor="message">Message *</FormGroup.Label>
          <Textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange('message')}
            isInvalid={!!errors.message}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <FormGroup.Feedback type="invalid">
              {errors.message}
            </FormGroup.Feedback>
          )}
          <FormGroup.Text>
            Minimum 10 characters ({formData.message.length}/10)
          </FormGroup.Text>
        </FormGroup>

        {errors.submit && (
          <Callout variant="error" className="u-mb-4">
            {errors.submit}
          </Callout>
        )}

        <div className="u-d-flex u-justify-content-end u-gap-3">
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
          >
            Clear
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
```

### Multi-Step Form

```jsx
import { Form, FormGroup, Input, Button, Progress, Badge } from '@shohojdhara/atomix';
import { useState } from 'react';

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 3: Preferences
    notifications: true,
    newsletter: false,
    theme: 'light'
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === totalSteps) {
      console.log('Form submitted:', formData);
    } else {
      nextStep();
    }
  };

  return (
    <div className="u-max-w-md u-mx-auto">
      {/* Progress indicator */}
      <div className="u-mb-6">
        <div className="u-d-flex u-justify-content-between u-mb-2">
          <span className="u-fs-sm u-text-secondary">Step {currentStep} of {totalSteps}</span>
          <Badge variant="primary">{Math.round(progress)}% Complete</Badge>
        </div>
        <Progress value={progress} />
      </div>

      {/* Step indicators */}
      <div className="u-d-flex u-justify-content-center u-mb-6">
        {[1, 2, 3].map(step => (
          <div 
            key={step}
            className={`step-indicator ${step <= currentStep ? 'step-indicator--active' : ''}`}
          >
            {step < currentStep ? '✓' : step}
          </div>
        ))}
      </div>

      <Form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div>
            <h3 className="u-mb-4">Personal Information</h3>
            
            <div className="u-row u-gap-4">
              <div className="u-col-6">
                <FormGroup>
                  <FormGroup.Label>First Name</FormGroup.Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </FormGroup>
              </div>
              <div className="u-col-6">
                <FormGroup>
                  <FormGroup.Label>Last Name</FormGroup.Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </FormGroup>
              </div>
            </div>

            <FormGroup>
              <FormGroup.Label>Email</FormGroup.Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormGroup.Label>Phone</FormGroup.Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </FormGroup>
          </div>
        )}

        {/* Step 2: Address */}
        {currentStep === 2 && (
          <div>
            <h3 className="u-mb-4">Address Information</h3>
            
            <FormGroup>
              <FormGroup.Label>Street Address</FormGroup.Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                required
              />
            </FormGroup>

            <div className="u-row u-gap-4">
              <div className="u-col-6">
                <FormGroup>
                  <FormGroup.Label>City</FormGroup.Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </FormGroup>
              </div>
              <div className="u-col-3">
                <FormGroup>
                  <FormGroup.Label>State</FormGroup.Label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    required
                  />
                </FormGroup>
              </div>
              <div className="u-col-3">
                <FormGroup>
                  <FormGroup.Label>ZIP Code</FormGroup.Label>
                  <Input
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    required
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <div>
            <h3 className="u-mb-4">Preferences</h3>
            
            <FormGroup>
              <FormGroup.Check>
                <FormGroup.Check.Input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
                />
                <FormGroup.Check.Label>
                  Enable notifications
                </FormGroup.Check.Label>
              </FormGroup.Check>
            </FormGroup>

            <FormGroup>
              <FormGroup.Check>
                <FormGroup.Check.Input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
                />
                <FormGroup.Check.Label>
                  Subscribe to newsletter
                </FormGroup.Check.Label>
              </FormGroup.Check>
            </FormGroup>

            <FormGroup>
              <FormGroup.Label>Theme Preference</FormGroup.Label>
              <Select
                value={formData.theme}
                onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </Select>
            </FormGroup>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="u-d-flex u-justify-content-between u-mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <Button type="submit" variant="primary">
            {currentStep === totalSteps ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
```

## 📊 Data Display Patterns

### Data Table with Actions

```jsx
import { Card, Button, Badge, Dropdown, Input, Pagination } from '@shohojdhara/atomix';
import { useState } from 'react';

function DataTable({ data, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const itemsPerPage = 10;

  // Filter and sort data
  const filteredData = data
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return aVal < bVal ? -1 * modifier : aVal > bVal ? 1 * modifier : 0;
    });

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <Card>
      <Card.Header>
        <div className="u-d-flex u-justify-content-between u-align-items-center">
          <h3>Users</h3>
          <div className="u-d-flex u-gap-3">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="u-w-64"
            />
            <Button variant="primary">Add User</Button>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="u-p-0">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('email')} className="sortable">
                  Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('role')} className="sortable">
                  Role {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="u-d-flex u-align-items-center u-gap-3">
                      <Avatar src={user.avatar} name={user.name} size="sm" />
                      <span className="u-fw-medium">{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Badge variant={user.role === 'admin' ? 'primary' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={user.status === 'active' ? 'success' : 'warning'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="ghost" size="sm">
                        ⋯
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onEdit(user)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onDelete(user)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Body>

      <Card.Footer>
        <div className="u-d-flex u-justify-content-between u-align-items-center">
          <span className="u-text-secondary">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} users
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card.Footer>
    </Card>
  );
}
```

## 🔗 Related Documentation

- [Components](../components/README.md) - Complete component library
- [Layout Examples](./layouts.md) - Full page layouts
- [Framework Integrations](./integrations.md) - Integration examples
- [Guides](../guides/README.md) - How-to guides and tutorials

---

Build amazing interfaces with these proven patterns! 🎯
