# Atomix Design System

**Atomix** is a comprehensive, modern design system and component library built for React, TypeScript, and vanilla JavaScript applications. It provides a rich set of accessible, performant, and customizable UI components with both React and vanilla JS implementations.

## ✨ Features

- **40+ UI Components**: Comprehensive collection of modern UI components
- **Dual Implementation**: Both React and vanilla JavaScript versions of each component
- **TypeScript First**: Built with TypeScript for excellent developer experience
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation
- **Theming System**: 6 built-in themes with runtime switching capability
- **SCSS Architecture**: ITCSS methodology with BEM naming conventions
- **Storybook Integration**: Complete documentation and examples
- **Tree Shaking**: Optimized bundle size with selective imports
- **SSR Support**: Full server-side rendering compatibility
- **Mobile First**: Responsive design with touch-friendly interactions

## 🚀 Quick Start

### Installation

```bash
npm install @shohojdhara/atomix
```

### Basic Usage

#### React Components

```jsx
import React from 'react';
import { Button, Card, Avatar, Badge } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

function App() {
  return (
    <div>
      <Card>
        <Card.Header>
          <Avatar src="/avatar.jpg" alt="User" />
          <Badge color="primary">New</Badge>
        </Card.Header>
        <Card.Body>
          <h3>Welcome to Atomix</h3>
          <p>A modern design system for React applications.</p>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Get Started</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
```

#### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@shohojdhara/atomix/dist/index.css">
</head>
<body>
  <div class="c-card">
    <div class="c-card__header">
      <img class="c-avatar" src="/avatar.jpg" alt="User">
      <span class="c-badge c-badge--primary">New</span>
    </div>
    <div class="c-card__body">
      <h3>Welcome to Atomix</h3>
      <p>A modern design system for web applications.</p>
    </div>
    <div class="c-card__footer">
      <button class="c-btn c-btn--primary">Get Started</button>
    </div>
  </div>

  <script src="node_modules/@shohojdhara/atomix/dist/index.js"></script>
  <script>
    // Initialize components
    const card = new Atomix.Card('.c-card');
  </script>
</body>
</html>
```

## 📦 Package Exports

Atomix provides multiple export paths for different use cases:

```javascript
// Main exports
import { Button, Card } from '@shohojdhara/atomix';           // Components
import '@shohojdhara/atomix/css';                             // Compiled CSS
import '@shohojdhara/atomix/scss';                            // Source SCSS

// Theme exports
import '@shohojdhara/atomix/themes/css';                      // All themes CSS
import '@shohojdhara/atomix/themes/scss';                     // Theme SCSS

// Utilities and composables
import { utils, composables, constants } from '@shohojdhara/atomix';
```

## 🎨 Theming

Atomix includes 6 built-in themes that can be switched at runtime:

- **Shaj Default**: Clean, professional blue theme
- **Shaj Ocean**: Calm aquatic cyan theme  
- **Shaj Sunset**: Warm energetic orange theme
- **Shaj Forest**: Natural green theme
- **Shaj Midnight**: Sophisticated purple theme
- **Shaj Pastel**: Soft pink theme

### Theme Usage

```jsx
import { useTheme } from '@shohojdhara/atomix';

function ThemeSelector() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  
  return (
    <select value={currentTheme} onChange={e => setTheme(e.target.value)}>
      {availableThemes.map(theme => (
        <option key={theme} value={theme}>{theme}</option>
      ))}
    </select>
  );
}
```

## 🧩 Component Categories

### Form Components
- **Button**: Primary, secondary, and variant buttons
- **Input**: Text, email, password, and number inputs
- **Select**: Dropdown selection with search
- **Checkbox**: Single and group checkboxes
- **Radio**: Radio button groups
- **Textarea**: Multi-line text input
- **Toggle**: On/off switch component
- **Upload**: File upload with drag & drop

### Layout Components
- **Grid**: Responsive grid system
- **Container**: Content containers
- **MasonryGrid**: Pinterest-style grid layout

### Navigation Components
- **Navbar**: Responsive navigation header
- **Breadcrumb**: Hierarchical navigation
- **Pagination**: Page navigation
- **Tab**: Tabbed content panels
- **Steps**: Multi-step process indicator

### Data Display
- **Card**: Content cards with header/body/footer
- **DataTable**: Feature-rich data tables
- **List**: Styled lists with variants
- **Avatar**: User profile images
- **AvatarGroup**: Multiple avatar display
- **Badge**: Status and count indicators
- **Rating**: Star rating component

### Feedback Components
- **Modal**: Dialog and popup modals
- **Tooltip**: Contextual help tooltips
- **Popover**: Rich popup content
- **Messages**: Alert and notification messages
- **Callout**: Highlighted information blocks
- **Progress**: Progress bars and indicators
- **Spinner**: Loading indicators

### Interactive Components
- **Accordion**: Collapsible content sections
- **Dropdown**: Dropdown menus
- **PhotoViewer**: Image gallery viewer
- **DatePicker**: Date selection component
- **Countdown**: Timer and countdown display
- **Todo**: Task management component

### Utility Components
- **Icon**: Icon wrapper component
- **ColorModeToggle**: Dark/light mode toggle
- **EdgePanel**: Side panel component
- **Hero**: Hero section component
- **River**: Content with image sections
- **SectionIntro**: Section introduction component
- **Testimonial**: Customer testimonial component
- **ProductReview**: Product review component

## 🏗️ Architecture

### ITCSS Structure

Atomix follows the ITCSS (Inverted Triangle CSS) methodology:

```
src/styles/
├── 01-settings/     # Variables and configuration
├── 02-tools/        # Mixins and functions
├── 03-generic/      # Reset and normalize
├── 04-elements/     # Base HTML elements
├── 05-objects/      # Layout patterns
├── 06-components/   # UI components
└── 99-utilities/    # Helper classes
```

### Component Structure

Each component follows a consistent pattern:

```
src/components/ComponentName/
├── ComponentName.tsx              # React component
├── ComponentName.stories.tsx      # Storybook stories
├── index.ts                       # Exports
└── scripts/                       # Vanilla JS implementation
    ├── index.ts                   # Main component class
    ├── ComponentNameInteractions.ts # Event handlers
    └── bundle.ts                  # Global registration
```

### Dual Implementation

Every component provides both React and vanilla JavaScript implementations:

```jsx
// React usage
import { Button } from '@shohojdhara/atomix';
<Button onClick={handleClick}>Click me</Button>
```

```javascript
// Vanilla JS usage
const button = new Atomix.Button('.my-button', {
  onClick: handleClick
});
```

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn
- Modern browser

### Setup

```bash
# Clone the repository
git clone https://github.com/liimonx/atomix.git
cd atomix

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run storybook    # Start Storybook
npm run test         # Run tests
npm run lint         # Lint code
npm run format       # Format code
```

## 📚 Documentation

- **[Getting Started Guide](./docs/getting-started.md)**: Detailed setup and usage instructions
- **[Component Guide](./docs/components.md)**: Comprehensive component documentation
- **[Theming Guide](./docs/theming.md)**: Customization and theming
- **[Development Guide](./docs/development.md)**: Contributing and development workflow
- **[API Reference](./docs/api-reference.md)**: Complete API documentation
- **[Migration Guide](./docs/migration.md)**: Version upgrade instructions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/development.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🔗 Links

- [Storybook Documentation](https://atomix-storybook.netlify.app)
- [GitHub Repository](https://github.com/liimonx/atomix)
- [npm Package](https://www.npmjs.com/package/@shohojdhara/atomix)

## 📊 Stats

- **Components**: 40+
- **Bundle Size**: < 50KB (minified + gzipped)
- **TypeScript**: 100% coverage
- **Accessibility**: WCAG 2.1 AA compliant
- **Browser Support**: Modern browsers (ES2020+)
- **Framework Support**: React 18+, Vanilla JS

---

**Built with ❤️ by the Atomix team**
