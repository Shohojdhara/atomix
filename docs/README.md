# Atomix Documentation Site

A modern documentation website for the Atomix Design System, built with Next.js and showcasing all Atomix components, design tokens, and utilities.

## Overview

This documentation site provides comprehensive coverage of the Atomix Design System, including:

- **Component Documentation**: Interactive examples of all React components
- **Design Tokens**: Visual showcase of colors, typography, spacing, and shadows
- **Utility Classes**: Complete reference for spacing, layout, and styling utilities
- **Getting Started Guides**: Installation, setup, and quick start tutorials
- **Best Practices**: Design guidelines and accessibility recommendations

## Features

- 🎨 **Built with Atomix**: Uses the actual Atomix components and styles
- 📱 **Responsive Design**: Optimized for all screen sizes
- 🌙 **Dark Mode Support**: Automatic theme switching
- 🔍 **Interactive Examples**: Live component demos with code snippets
- ⚡ **Fast & Modern**: Next.js 14 with optimized performance
- ♿ **Accessible**: WCAG 2.1 AA compliant navigation and content

## Development

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

### Available Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## Project Structure

```
docs/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── components/         # Component documentation
│   │   ├── design-tokens/      # Design token documentation
│   │   ├── getting-started/    # Getting started guides
│   │   ├── utilities/          # Utility class documentation
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # Documentation-specific components
│   │   ├── DocsLayout.tsx      # Main layout component
│   │   └── ComponentDemo.tsx   # Component demonstration wrapper
│   └── styles/                 # Documentation styles
│       └── globals.scss        # Global styles and Atomix imports
├── public/                     # Static assets
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Documentation Structure

### Component Pages
Each component has its own documentation page including:
- Overview and usage guidelines
- Interactive examples with code snippets
- Complete API reference with prop tables
- Accessibility information
- Design guidelines and best practices

### Design Token Pages
Visual showcases of the design system foundations:
- Color palettes with copy-to-clipboard functionality
- Typography scales and font families
- Spacing system visualization
- Shadow and elevation examples

### Utility Documentation
Complete reference for utility classes:
- Spacing utilities (margin, padding, gap)
- Layout utilities (display, flexbox, grid)
- Typography utilities (text size, weight, color)
- Background and border utilities

## Styling Approach

The documentation site follows Atomix design principles:

- **No External CSS Frameworks**: Built entirely with Atomix styles
- **Utility-First**: Leverages Atomix utility classes for rapid development
- **Component-Based**: Uses actual Atomix React components
- **Design System Consistency**: Maintains visual consistency with the design system
- **SCSS Architecture**: Follows ITCSS methodology like the main Atomix project

## Contributing

### Adding New Documentation

1. **Component Documentation**: Create a new page in `src/app/components/[component-name]/page.tsx`
2. **Design Token Documentation**: Add pages in `src/app/design-tokens/`
3. **Utility Documentation**: Add pages in `src/app/utilities/`

### Component Demo Format

Use the `ComponentDemo` component for consistent examples:

```tsx
<ComponentDemo
  title="Example Title"
  description="Description of what this example shows"
  code={`<Button variant="primary">
  Click me
</Button>`}
>
  <Button variant="primary">Click me</Button>
</ComponentDemo>
```

### Navigation Updates

Update the navigation in `src/components/DocsLayout.tsx` when adding new pages.

## Deployment

The documentation site can be deployed as a static site or server-side rendered:

### Static Export
```bash
npm run build
npm run export
```

### Vercel Deployment
The site is optimized for Vercel deployment with automatic builds from the main branch.

### GitHub Pages
Configure the `basePath` in `next.config.js` for GitHub Pages deployment.

## Performance

The documentation site is optimized for performance:

- **Static Generation**: Pages are pre-generated at build time
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Optimized images with Next.js Image component
- **Bundle Analysis**: Use `npm run analyze` to analyze bundle size

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

This documentation site is part of the Atomix Design System and follows the same license terms as the main project.