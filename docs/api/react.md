# React API Reference

Complete reference for all React components in the Atomix Design System, including props, types, and usage examples.

## 📚 Component Categories

### Basic Components

#### Button
Interactive button component with multiple variants and states.

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost' | 'outline-primary' | 'outline-secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  [key: string]: any;
}

// Usage
<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

#### Badge
Small status indicators and labels.

```tsx
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

// Usage
<Badge variant="success">New</Badge>
```

#### Icon
Icon wrapper component with consistent sizing.

```tsx
interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

// Usage
<Icon name="heart" size="md" />
```

#### Spinner
Loading indicator component.

```tsx
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
}

// Usage
<Spinner size="md" variant="primary" />
```

### Layout Components

#### Card
Flexible content container with header, body, and footer sections.

```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Usage
<Card variant="elevated">
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here.</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

### Form Components

#### Form
Form container with submission handling.

```tsx
interface FormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  noValidate?: boolean;
}

// Usage
<Form onSubmit={handleSubmit}>
  {/* Form content */}
</Form>
```

#### Input
Text input component with validation support.

```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isValid?: boolean;
  isInvalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name?: string;
  'aria-describedby'?: string;
}

// Usage
<Input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  isInvalid={!!errors.email}
/>
```

#### Select
Dropdown selection component.

```tsx
interface SelectProps {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isValid?: boolean;
  isInvalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
}

interface OptionProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

// Usage
<Select value={selectedValue} onChange={handleChange}>
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>
```

### Interactive Components

#### Modal
Dialog overlay component.

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  centered?: boolean;
  backdrop?: boolean | 'static';
  keyboard?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ModalHeaderProps {
  children: React.ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
  className?: string;
}

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Usage
<Modal isOpen={isOpen} onClose={handleClose} size="lg">
  <Modal.Header closeButton>
    <h4>Modal Title</h4>
  </Modal.Header>
  <Modal.Body>
    <p>Modal content goes here.</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  </Modal.Footer>
</Modal>
```

#### Dropdown
Dropdown menu component.

```tsx
interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownToggleProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'end';
}

interface DropdownItemProps {
  as?: React.ElementType;
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

// Usage
<Dropdown>
  <Dropdown.Toggle as={Button} variant="primary">
    Dropdown
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
    <Dropdown.Item href="/settings">Settings</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
```

#### Accordion
Collapsible content panel for organizing information.

```tsx
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  iconPosition?: 'left' | 'right';
  icon?: React.ReactNode;
  isOpen?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  glass?: boolean | AtomixGlassProps;
}

// Usage
<Accordion title="What is Atomix?">
  <p>Atomix is a comprehensive design system for building modern user interfaces.</p>
</Accordion>
```

#### AtomixGlass
Premium glassmorphism effect component with advanced shader-based rendering.

```tsx
interface AtomixGlassProps {
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  borderRadius?: number;
  mode?: 'standard' | 'polar' | 'prominent' | 'shader';
  shaderVariant?: 'liquidGlass' | 'premiumGlass' | 'appleFluid' | 'liquidMetal' | 'plasma' | 'waves' | 'noise';
  overLight?: boolean | 'auto' | OverLightConfig;
  reducedMotion?: boolean;
  highContrast?: boolean;
  children?: React.ReactNode;
}

// Usage
<AtomixGlass mode="premiumGlass" blurAmount={20}>
  <div style={{ padding: '2rem' }}>
    <h3>Glass Effect</h3>
    <p>Premium glassmorphism with advanced shaders.</p>
  </div>
</AtomixGlass>
```

#### Avatar
User profile picture or placeholder.

```tsx
interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Usage
<Avatar src="/user.jpg" name="John Doe" status="online" />
<AvatarGroup max={3}>
  <Avatar name="A" />
  <Avatar name="B" />
  <Avatar name="C" />
  <Avatar name="D" />
</AvatarGroup>
```

#### Callout
Prominent message or alert with optional actions.

```tsx
interface CalloutProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
  onClose?: () => void;
  actions?: React.ReactNode;
  compact?: boolean;
  isToast?: boolean;
  glass?: boolean | AtomixGlassProps;
}

// Usage
<Callout variant="success" title="Success!">
  Your changes have been saved successfully.
</Callout>
```

#### Hero
Prominent landing section for marketing and introductory content.

```tsx
interface HeroProps {
  title: React.ReactNode;
  subtitle?: string;
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  alignment?: 'left' | 'center' | 'right';
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
}

// Usage
<Hero
  title="Build Amazing Interfaces"
  subtitle="The ultimate design system for modern web applications"
  imageSrc="/hero-image.png"
  alignment="center"
>
  <Button variant="primary" size="lg">Get Started</Button>
</Hero>
```

#### DataTable
Powerful data grid with sorting, filtering, and pagination support.

```tsx
interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  width?: string | number;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onRowClick?: (item: T) => void;
  className?: string;
}

// Usage
<DataTable
  data={users}
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' }
  ]}
  pagination
  pageSize={10}
/>
```

#### Chart
Comprehensive data visualization system with multiple chart types.

```tsx
interface ChartProps {
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'radar' | 'scatter';
  data: any[];
  options?: ChartOptions;
  height?: string | number;
  width?: string | number;
  loading?: boolean;
}

// Usage
<Chart
  type="line"
  data={revenueData}
  height={300}
/>
```

## 🎯 Common Patterns

### Event Handling

```tsx
// Button click handling
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Button clicked');
};

// Form submission
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission
};

// Input change handling
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
```

### Ref Forwarding

```tsx
// All components support ref forwarding
const buttonRef = useRef<HTMLButtonElement>(null);

<Button ref={buttonRef} variant="primary">
  Click me
</Button>
```

### Custom Props

```tsx
// All components accept additional props
<Button
  variant="primary"
  data-testid="submit-button"
  aria-label="Submit form"
  custom-attribute="value"
>
  Submit
</Button>
```

## 🔧 TypeScript Support

### Generic Components

```tsx
// Form with generic data type
interface FormData {
  email: string;
  password: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
      />
    </Form>
  );
};
```

### Component Props Types

```tsx
// Import prop types for custom components
import type { ButtonProps, CardProps, ModalProps } from '@shohojdhara/atomix';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} />;
};
```

## 🧪 Testing

### Testing Library Examples

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, Modal } from '@shohojdhara/atomix';

// Button testing
test('button handles click events', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Modal testing
test('modal opens and closes', () => {
  const handleClose = jest.fn();
  render(
    <Modal isOpen={true} onClose={handleClose}>
      <Modal.Body>Modal content</Modal.Body>
    </Modal>
  );
  
  expect(screen.getByText('Modal content')).toBeInTheDocument();
  
  fireEvent.click(screen.getByLabelText('Close'));
  expect(handleClose).toHaveBeenCalled();
});
```

## 🔗 Related Documentation

- [JavaScript API](./javascript.md) - Vanilla JavaScript components
- [CSS API](./css.md) - CSS classes and custom properties
- [Components Guide](../components/README.md) - Component usage guides
- [Examples](../examples/README.md) - Real-world usage examples

---

Complete React API reference for building with Atomix! ⚛️
