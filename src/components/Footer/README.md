# Footer Component

A comprehensive footer component with multiple layout options, social links, newsletter signup, and responsive design.

## Features

- **Multiple Layouts**: Columns, centered, minimal, and stacked layouts
- **Social Media Integration**: Built-in support for 20+ social platforms
- **Newsletter Signup**: Optional newsletter subscription form
- **Responsive Design**: Mobile-first with collapsible sections
- **Back to Top**: Optional smooth scroll to top functionality
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Theme Support**: Multiple color variants and dark mode
- **Sticky Footer**: Optional sticky positioning

## Usage

### Basic Footer

```tsx
import { Footer, FooterSection, FooterLink } from '@shohojdhara/atomix';

<Footer
  brand="My Company"
  copyright="© 2024 My Company. All rights reserved."
  socialLinks={[
    { platform: 'twitter', url: 'https://twitter.com/company' },
    { platform: 'facebook', url: 'https://facebook.com/company' }
  ]}
>
  <FooterSection title="Products">
    <FooterLink href="/product1">Product 1</FooterLink>
    <FooterLink href="/product2">Product 2</FooterLink>
  </FooterSection>
  
  <FooterSection title="Company">
    <FooterLink href="/about">About Us</FooterLink>
    <FooterLink href="/contact">Contact</FooterLink>
  </FooterSection>
</Footer>
```

### With Newsletter

```tsx
<Footer
  brand="My Company"
  copyright="© 2024 My Company. All rights reserved."
  showNewsletter
  newsletterTitle="Stay Updated"
  newsletterDescription="Get the latest updates delivered to your inbox."
  onNewsletterSubmit={(email) => console.log('Newsletter signup:', email)}
>
  {/* Footer sections */}
</Footer>
```

### Collapsible Sections (Mobile)

```tsx
<FooterSection title="Products" collapsible defaultCollapsed>
  <FooterLink href="/product1">Product 1</FooterLink>
  <FooterLink href="/product2">Product 2</FooterLink>
</FooterSection>
```

## Props

### Footer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `ReactNode` | - | Brand name or logo |
| `brandLogo` | `string \| ReactNode` | - | Brand logo (image URL or React element) |
| `brandDescription` | `ReactNode` | - | Brand description text |
| `copyright` | `ReactNode` | - | Copyright text |
| `layout` | `'columns' \| 'centered' \| 'minimal' \| 'stacked'` | `'columns'` | Footer layout variant |
| `variant` | `ThemeColor` | `'primary'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `showNewsletter` | `boolean` | `false` | Whether to show newsletter signup |
| `newsletterTitle` | `string` | `'Stay Updated'` | Newsletter section title |
| `newsletterDescription` | `string` | - | Newsletter section description |
| `newsletterPlaceholder` | `string` | `'Enter your email'` | Newsletter input placeholder |
| `newsletterButtonText` | `string` | `'Subscribe'` | Newsletter submit button text |
| `onNewsletterSubmit` | `(email: string) => void` | - | Newsletter submit handler |
| `socialLinks` | `SocialLink[]` | `[]` | Social media links |
| `showBackToTop` | `boolean` | `false` | Whether to show back to top button |
| `backToTopText` | `string` | `'Back to Top'` | Back to top button text |
| `onBackToTop` | `() => void` | - | Back to top click handler |
| `showDivider` | `boolean` | `true` | Whether to show divider above bottom section |
| `sticky` | `boolean` | `false` | Whether footer should be sticky |

### FooterSection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | Section title |
| `icon` | `ReactNode` | - | Section icon |
| `collapsible` | `boolean` | `false` | Whether section is collapsible on mobile |
| `defaultCollapsed` | `boolean` | `false` | Whether section is collapsed by default |
| `children` | `ReactNode` | - | Section content |

### FooterLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | Link URL |
| `icon` | `ReactNode` | - | Link icon |
| `external` | `boolean` | `false` | Whether link opens in new tab |
| `active` | `boolean` | `false` | Whether link is active |
| `disabled` | `boolean` | `false` | Whether link is disabled |
| `onClick` | `(event: MouseEvent) => void` | - | Link click handler |
| `LinkComponent` | `React.ElementType` | - | Custom link component (e.g., React Router Link) |

### Social Link Configuration

```tsx
interface SocialLink {
  platform: SocialPlatform;
  url: string;
  icon?: ReactNode; // Custom icon override
  label?: string;   // Custom accessibility label
}
```

### Supported Social Platforms

- `facebook`, `twitter`, `instagram`, `linkedin`
- `youtube`, `github`, `discord`, `tiktok`
- `pinterest`, `snapchat`, `whatsapp`, `telegram`
- `reddit`, `twitch`, `spotify`, `dribbble`
- `behance`, `medium`, `dev`, `codepen`
- `custom` (for custom platforms with custom icons)

## Layout Variants

### Columns (Default)
```tsx
<Footer layout="columns">
  {/* Sections arranged in responsive columns */}
</Footer>
```

### Centered
```tsx
<Footer layout="centered">
  {/* All content centered */}
</Footer>
```

### Minimal
```tsx
<Footer layout="minimal" size="sm">
  {/* Compact footer with minimal spacing */}
</Footer>
```

### Stacked
```tsx
<Footer layout="stacked">
  {/* Sections stacked vertically */}
</Footer>
```

## Styling

The Footer component uses CSS custom properties for theming:

```css
.c-footer {
  --atomix-footer-bg: var(--atomix-surface);
  --atomix-footer-color: var(--atomix-text);
  --atomix-footer-padding-y: 3rem;
  --atomix-footer-container-max-width: 1200px;
}
```

### Custom Styling

```scss
.c-footer {
  &--custom {
    --atomix-footer-bg: #1a1a1a;
    --atomix-footer-color: #ffffff;
    
    .c-footer__brand-name h3 {
      color: #00ff88;
    }
  }
}
```

## Accessibility

- Semantic HTML structure with proper `<footer>` element
- ARIA attributes for collapsible sections
- Keyboard navigation support
- Screen reader friendly
- Focus management
- High contrast support

## Responsive Behavior

- **Mobile**: Sections stack vertically, optional collapsible sections
- **Tablet**: Responsive grid layout
- **Desktop**: Multi-column layout with proper spacing

## Examples

### Complete Footer with All Features

```tsx
<Footer
  brand="Atomix"
  brandLogo="/logo.png"
  brandDescription="A modern design system for building beautiful interfaces."
  copyright="© 2024 Atomix. All rights reserved."
  layout="columns"
  variant="primary"
  size="md"
  showNewsletter
  newsletterTitle="Stay in the Loop"
  newsletterDescription="Get updates on new components and features."
  onNewsletterSubmit={handleNewsletterSubmit}
  socialLinks={[
    { platform: 'github', url: 'https://github.com/company' },
    { platform: 'twitter', url: 'https://twitter.com/company' },
    { platform: 'discord', url: 'https://discord.gg/company' }
  ]}
  showBackToTop
  showDivider
>
  <FooterSection title="Products" icon="🚀">
    <FooterLink href="/components">Components</FooterLink>
    <FooterLink href="/templates">Templates</FooterLink>
    <FooterLink href="/themes">Themes</FooterLink>
  </FooterSection>
  
  <FooterSection title="Resources" collapsible>
    <FooterLink href="/docs">Documentation</FooterLink>
    <FooterLink href="/guides">Guides</FooterLink>
    <FooterLink href="/examples">Examples</FooterLink>
    <FooterLink href="/blog" external>Blog</FooterLink>
  </FooterSection>
  
  <FooterSection title="Support">
    <FooterLink href="/help">Help Center</FooterLink>
    <FooterLink href="/community">Community</FooterLink>
    <FooterLink href="/contact">Contact Us</FooterLink>
  </FooterSection>
</Footer>
```

## Best Practices

1. **Keep it organized**: Group related links in logical sections
2. **Limit sections**: 3-5 sections work best for readability
3. **Use meaningful labels**: Clear, descriptive link text
4. **Consider mobile**: Test collapsible sections on mobile devices
5. **Accessibility first**: Always provide proper ARIA labels
6. **Performance**: Optimize social media icons and brand logos