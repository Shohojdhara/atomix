import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Footer } from './Footer';
import { FooterSection } from './FooterSection';
import { FooterLink } from './FooterLink';
import { THEME_COLORS, SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Footer

## Overview

Footer provides a comprehensive footer section for websites with multiple layout variants, sections, links, and optional features like newsletter signup and back-to-top buttons. Footers support various color variants, sizes, and can be sticky. Essential for site navigation, branding, and additional information display.

## Features

- Multiple layout variants (columns, centered, minimal, stacked, flexible, sidebar, wide)
- Color and size variants
- Newsletter signup option
- Back-to-top button
- Social media links
- Divider options
- Sticky positioning
- Responsive design
- Glass effect option

## Accessibility

- Screen reader: Footer content and links announced properly
- ARIA support: Proper landmarks and roles for footer section
- Keyboard support: All interactive elements accessible via keyboard
- Focus management: Visible focus indicators for navigation

## Usage Examples

### Basic Usage

\`\`\`tsx
<Footer>
  <FooterSection title="Products">
    <FooterLink href="/products">Our Products</FooterLink>
  </FooterSection>
</Footer>
\`\`\`

### With Newsletter

\`\`\`tsx
<Footer showNewsletter={true}>
  <FooterSection title="Products">
    <FooterLink href="/products">Our Products</FooterLink>
  </FooterSection>
</Footer>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| layout | 'columns' \\| 'centered' \\| 'minimal' \\| 'stacked' \\| 'flexible' \\| 'sidebar' \\| 'wide' | 'columns' | Footer layout variant |
| variant | ThemeColor | 'secondary' | Color variant |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Size variant |
| showNewsletter | boolean | false | Whether to show newsletter signup |
| showBackToTop | boolean | false | Whether to show back to top button |
| showDivider | boolean | false | Whether to show divider above bottom section |
| sticky | boolean | false | Whether footer should be sticky |
| socialLinks | SocialLink[] | [] | Array of social media links |
| onBackToTopClick | () => void | - | Callback when back to top button is clicked |
| brand | ReactNode | - | Brand name or logo |
| brandLogo | string \\| ReactNode | - | Brand logo (image URL or React element) |
| brandDescription | ReactNode | - | Brand description text |
| copyright | ReactNode | - | Copyright text |
| newsletterTitle | string | 'Stay Updated' | Newsletter section title |
| newsletterDescription | string | 'Subscribe...' | Newsletter section description |
| newsletterPlaceholder | string | 'Enter your email' | Newsletter input placeholder |
| newsletterButtonText | string | 'Subscribe' | Newsletter submit button text |
| onNewsletterSubmit | (email: string) => void | - | Newsletter submit handler |
| glass | boolean | - | Whether footer should have glass effect |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['columns', 'centered', 'minimal', 'stacked', 'flexible', 'sidebar', 'wide'],
      description: 'Footer layout variant',
      table: {
        type: { summary: '"columns" | "centered" | "minimal" | "stacked" | "flexible" | "sidebar" | "wide"' },
        defaultValue: { summary: 'columns' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'Color variant',
      table: {
        type: { summary: 'ThemeColor' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size variant',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    showNewsletter: {
      control: 'boolean',
      description: 'Whether to show newsletter signup',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showBackToTop: {
      control: 'boolean',
      description: 'Whether to show back to top button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showDivider: {
      control: 'boolean',
      description: 'Whether to show divider above bottom section',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    sticky: {
      control: 'boolean',
      description: 'Whether footer should be sticky',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    socialLinks: {
      control: 'object',
      description: 'Array of social media links',
      table: {
        type: { summary: 'SocialLink[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onBackToTop: {
      action: 'back to top clicked',
      description: 'Callback when back to top button is clicked',
    },
    onNewsletterSubmit: {
      action: 'newsletter submitted',
      description: 'Callback when newsletter is submitted',
    },
    brand: {
      control: 'text',
      description: 'Brand name',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    brandLogo: {
      control: 'text',
      description: 'Brand logo URL',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    brandDescription: {
      control: 'text',
      description: 'Brand description',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    copyright: {
      control: 'text',
      description: 'Copyright text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    newsletterTitle: {
      control: 'text',
      description: 'Title for newsletter section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Stay Updated' },
      },
    },
    newsletterDescription: {
      control: 'text',
      description: 'Description for newsletter section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Subscribe to our newsletter for the latest updates.' },
      },
    },
    newsletterPlaceholder: {
      control: 'text',
      description: 'Placeholder for newsletter input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Enter your email' },
      },
    },
    newsletterButtonText: {
      control: 'text',
      description: 'Text for newsletter button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Subscribe' },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Whether to apply glass effect',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample social links
const sampleSocialLinks = [
  { platform: 'facebook' as const, url: 'https://facebook.com/company' },
  { platform: 'twitter' as const, url: 'https://twitter.com/company' },
  { platform: 'instagram' as const, url: 'https://instagram.com/company' },
  { platform: 'linkedin' as const, url: 'https://linkedin.com/company' },
  { platform: 'github' as const, url: 'https://github.com/company' },
];

// Sample footer content
const SampleFooterContent = () => (
  <>
    <FooterSection title="Products">
      <FooterLink href="/product1">Web Development</FooterLink>
      <FooterLink href="/product2">Mobile Apps</FooterLink>
      <FooterLink href="/product3">UI/UX Design</FooterLink>
      <FooterLink href="/product4">Consulting</FooterLink>
    </FooterSection>

    <FooterSection title="Company">
      <FooterLink href="/about">About Us</FooterLink>
      <FooterLink href="/careers">Careers</FooterLink>
      <FooterLink href="/blog">Blog</FooterLink>
      <FooterLink href="/contact">Contact</FooterLink>
    </FooterSection>

    <FooterSection title="Resources">
      <FooterLink href="/docs">Documentation</FooterLink>
      <FooterLink href="/tutorials">Tutorials</FooterLink>
      <FooterLink href="/support">Support</FooterLink>
      <FooterLink href="/community">Community</FooterLink>
    </FooterSection>

    <FooterSection title="Legal">
      <FooterLink href="/privacy">Privacy Policy</FooterLink>
      <FooterLink href="/terms">Terms of Service</FooterLink>
      <FooterLink href="/cookies">Cookie Policy</FooterLink>
      <FooterLink href="/gdpr">GDPR Compliance</FooterLink>
    </FooterSection>
  </>
);

export const BasicUsage: Story = {
  args: {
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic footer with sample content and default layout.',
      },
    },
  },
};

export const WithNewsletter: Story = {
  args: {
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    showNewsletter: true,
    newsletterTitle: 'Stay Updated',
    newsletterDescription: 'Subscribe to our newsletter for the latest updates and news.',
    newsletterPlaceholder: 'Enter your email address',
    newsletterButtonText: 'Subscribe Now',
    onNewsletterSubmit: fn(),
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with newsletter signup form.',
      },
    },
  },
};

export const WithBackToTop: Story = {
  args: {
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    showBackToTop: true,
    backToTopText: 'Back to Top',
    onBackToTop: fn(),
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with back to top button and social links.',
      },
    },
  },
};

export const CenteredLayout: Story = {
  args: {
    layout: 'centered',
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with centered layout variant.',
      },
    },
  },
};

export const MinimalLayout: Story = {
  args: {
    layout: 'minimal',
    brand: 'Atomix',
    brandLogo: 'https://via.placeholder.com/150x50.png?text=LOGO',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with minimal layout variant.',
      },
    },
  },
};

export const StackedLayout: Story = {
  args: {
    layout: 'stacked',
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with stacked layout variant.',
      },
    },
  },
};

export const FlexibleLayout: Story = {
  args: {
    layout: 'flexible',
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with flexible layout variant.',
      },
    },
  },
};

export const SidebarLayout: Story = {
  args: {
    layout: 'sidebar',
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with sidebar layout variant.',
      },
    },
  },
};

export const WideLayout: Story = {
  args: {
    layout: 'wide',
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with wide layout variant.',
      },
    },
  },
};

export const DarkVariant: Story = {
  args: {
    variant: 'dark',
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with dark color variant.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with large size variant.',
      },
    },
  },
};

export const WithGlassEffect: Story = {
  args: {
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
    glass: true,
  },
  render: (args) => (
    <Footer {...args}>
      <SampleFooterContent />
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with glass effect enabled.',
      },
    },
  },
};

export const StickyFooter: Story = {
  args: {
    sticky: true,
    brand: 'Atomix',
    brandDescription: 'A modern design system for building beautiful, accessible websites.',
    copyright: '© 2024 Atomix. All rights reserved.',
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <div style={{ minHeight: '200vh' }}>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Scroll down to see the sticky footer</p>
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sticky footer that stays at the bottom of the viewport.',
      },
    },
  },
};