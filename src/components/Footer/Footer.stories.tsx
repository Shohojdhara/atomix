import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';
import { FooterSection } from './FooterSection';
import { FooterLink } from './FooterLink';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modern, comprehensive footer component with enhanced visual effects, accessibility features, responsive design, and multiple layout variants. Features include design token integration, improved hover effects, modern gradients, and comprehensive accessibility support following Atomix design patterns.',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['columns', 'centered', 'minimal', 'stacked', 'flexible', 'sidebar', 'wide'],
      description: 'Footer layout variant',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'],
      description: 'Color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showNewsletter: {
      control: 'boolean',
      description: 'Whether to show newsletter signup',
    },
    showBackToTop: {
      control: 'boolean',
      description: 'Whether to show back to top button',
    },
    showDivider: {
      control: 'boolean',
      description: 'Whether to show divider above bottom section',
    },
    sticky: {
      control: 'boolean',
      description: 'Whether footer should be sticky',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

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

     
    <FooterSection title="Company">
      <FooterLink href="/about">About Us</FooterLink>
      <FooterLink href="/careers">Careers</FooterLink>
      <FooterLink href="/blog">Blog</FooterLink>
      <FooterLink href="/contact">Contact</FooterLink>
    </FooterSection>

     
    <FooterSection title="Company">
      <FooterLink href="/about">About Us</FooterLink>
      <FooterLink href="/careers">Careers</FooterLink>
      <FooterLink href="/blog">Blog</FooterLink>
      <FooterLink href="/contact">Contact</FooterLink>
    </FooterSection>
  
  </>
);

const LayoutTemplate: Story = {
  args: {
    brand: 'Atomix',
    brandDescription: 'A modern design system for building accessible web applications.',
    copyright: '© 2024 Atomix UI. All rights reserved.',
    layout: 'columns',
    variant: 'primary',
    size: 'md',
    showNewsletter: false,
    showBackToTop: false,
    showDivider: true,
    sticky: false,
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, backgroundColor: 'var(--atomix-brand-bg-subtle)', padding: '2rem' }}>
        <h1>Main Content</h1>
        <p>This is sample page content to demonstrate the footer in context.</p>
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const Default: Story = {
  ...LayoutTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Default footer configuration with modern styling, design tokens, and enhanced visual effects.',
      },
    },
  },
};

export const WithNewsletter: Story = {
  args: {
    ...Default.args,
    showNewsletter: true,
    newsletterTitle: 'Stay in the Loop',
    newsletterDescription: 'Get the latest updates, articles, and resources delivered to your inbox.',
    onNewsletterSubmit: (email: string) => {
      console.log('Newsletter signup:', email);
      alert(`Thank you for subscribing with ${email}!`);
    },
  },
  render: Default.render,
};

export const WithBackToTop: Story = {
  args: {
    ...Default.args,
    showBackToTop: true,
    backToTopText: 'Back to Top',
    onBackToTop: () => {
      console.log('Back to top clicked');
    },
  },
  render: Default.render,
};

export const Centered: Story = {
  ...LayoutTemplate,
  args: {
    ...LayoutTemplate.args,
    layout: 'centered',
    showNewsletter: true,
    showBackToTop: true,
  },
};

export const Minimal: Story = {
  ...LayoutTemplate,
  args: {
    ...LayoutTemplate.args,
    layout: 'minimal',
    variant: 'light',
    size: 'sm',
    socialLinks: sampleSocialLinks.slice(0, 3),
    showDivider: false,
    showNewsletter: false,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, backgroundColor: 'var(--atomix-brand-bg-subtle)' }}>
        <h1>Page Content</h1>
        <p>This is sample page content with a minimal footer.</p>
      </div>
      <Footer {...args}>
        <FooterSection title="Quick Links">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
        </FooterSection>
      </Footer>
    </div>
  ),
};

export const Stacked: Story = {
  ...LayoutTemplate,
  args: {
    ...LayoutTemplate.args,
    layout: 'stacked',
    showNewsletter: true,
    showBackToTop: true,
  },
};

export const DarkVariant: Story = {
  args: {
    ...Default.args,
    variant: 'dark',
    showNewsletter: true,
    showBackToTop: true,
  },
  render: Default.render,
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    showNewsletter: true,
    showBackToTop: true,
  },
  render: Default.render,
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    layout: 'minimal',
  },
  render: Default.render,
};

export const WithBrandLogo: Story = {
  args: {
    ...Default.args,
    brandLogo: 'https://via.placeholder.com/150x50/007bff/ffffff?text=LOGO',
    showNewsletter: true,
  },
  render: Default.render,
};

export const Sticky: Story = {
  args: {
    ...Default.args,
    sticky: true,
    size: 'sm',
    layout: 'minimal',
  },
  render: (args) => (
    <div style={{ height: '200vh', backgroundColor: 'var(--atomix-surface)' }}>
      <div style={{ padding: '2rem' }}>
        <h1>Scroll down to see sticky footer</h1>
        <p>This page is tall enough to demonstrate the sticky footer behavior.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris.
          </p>
        ))}
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const CollapsibleSections: Story = {
  args: {
    ...Default.args,
    showNewsletter: true,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, backgroundColor: 'var(--atomix-brand-bg-subtle)' }}>
        <h1>Collapsible Footer Sections</h1>
        <p>Resize the window to mobile size to see collapsible sections.</p>
      </div>
      <Footer {...args}>
        <FooterSection title="Products" collapsible defaultCollapsed>
          <FooterLink href="/product1">Web Development</FooterLink>
          <FooterLink href="/product2">Mobile Apps</FooterLink>
          <FooterLink href="/product3">UI/UX Design</FooterLink>
        </FooterSection>
        
        <FooterSection title="Company" collapsible>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/careers">Careers</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
        </FooterSection>
      </Footer>
    </div>
  ),
};

export const WithExternalLinks: Story = {
  args: {
    ...Default.args,
    socialLinks: [
      ...sampleSocialLinks,
      { platform: 'tiktok' as const, url: 'https://tiktok.com/@company' },
      { platform: 'whatsapp' as const, url: 'https://wa.me/1234567890' },
      { platform: 'discord' as const, url: 'https://discord.gg/company' },
    ],
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, backgroundColor: 'var(--atomix-brand-bg-subtle)' }}>
        <h1>Modern Social Links</h1>
        <p>Footer with enhanced social platforms and modern styling.</p>
      </div>
      <Footer {...args}>
        <FooterSection title="External Resources">
          <FooterLink href="https://github.com" external>GitHub</FooterLink>
          <FooterLink href="https://stackoverflow.com" external>Stack Overflow</FooterLink>
          <FooterLink href="https://developer.mozilla.org" external>MDN Docs</FooterLink>
        </FooterSection>
        
        <FooterSection title="Internal Links">
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/blog" active>Blog</FooterLink>
          <FooterLink href="/disabled" disabled>Disabled Link</FooterLink>
        </FooterSection>
      </Footer>
    </div>
  ),
};

export const ModernGradients: Story = {
  args: {
    ...Default.args,
    variant: 'primary',
    showNewsletter: true,
    showBackToTop: true,
    socialLinks: sampleSocialLinks,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <h1 style={{ color: 'white' }}>Modern Design</h1>
        <p style={{ color: 'white' }}>Showcasing modern gradients and enhanced visual effects.</p>
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const DesignTokensShowcase: Story = {
  args: {
    ...Default.args,
    brand: 'Design Tokens',
    brandDescription: 'Showcasing consistent design tokens, modern hover effects, and enhanced visual styling throughout the footer component.',
    showNewsletter: true,
    showBackToTop: true,
    socialLinks: sampleSocialLinks,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the use of design tokens for consistent styling, enhanced hover effects, modern gradients, and improved accessibility features.',
      },
    },
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, backgroundColor: 'var(--atomix-brand-bg-subtle)' }}>
        <h1>Design Token Integration</h1>
        <p>This footer demonstrates consistent use of design tokens for colors, spacing, shadows, and typography. Hover over elements to see enhanced visual effects.</p>
        <ul>
          <li>✨ Global CSS variables for box shadows</li>
          <li>🎨 Design token-based colors and opacity</li>
          <li>📏 Consistent spacing using rem() function</li>
          <li>🔄 Smooth transitions and hover effects</li>
          <li>♿ Enhanced accessibility features</li>
        </ul>
      </div>
      <Footer {...args}>
        <FooterSection title="Design System">
          <FooterLink href="/tokens">Design Tokens</FooterLink>
          <FooterLink href="/components">Components</FooterLink>
          <FooterLink href="/guidelines">Guidelines</FooterLink>
          <FooterLink href="/accessibility">Accessibility</FooterLink>
        </FooterSection>
        
        <FooterSection title="Development">
          <FooterLink href="/scss">SCSS Architecture</FooterLink>
          <FooterLink href="/css-vars">CSS Variables</FooterLink>
          <FooterLink href="/responsive">Responsive Design</FooterLink>
          <FooterLink href="/performance">Performance</FooterLink>
        </FooterSection>
      </Footer>
    </div>
  ),
};

export const AccessibilityFocused: Story = {
  args: {
    ...Default.args,
    showNewsletter: true,
    showBackToTop: true,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, backgroundColor: 'var(--atomix-brand-bg-subtle)' }}>
        <h1>Accessibility Features</h1>
        <p>Tab through the footer elements to see enhanced focus states and keyboard navigation.</p>
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const ResponsiveShowcase: Story = {
  args: {
    ...Default.args,
    layout: 'columns',
    showNewsletter: true,
    showBackToTop: true,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, backgroundColor: 'var(--atomix-brand-bg-subtle)' }}>
        <h1>Responsive Design</h1>
        <p>Resize the viewport to see responsive grid layouts and collapsible sections.</p>
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const Flexible: Story = {
  ...LayoutTemplate,
  args: {
    ...LayoutTemplate.args,
    layout: 'flexible',
  },
  parameters: {
    docs: {
      description: {
        story: 'Flexible layout that automatically adapts to content width and screen size. Perfect for dynamic content scenarios.',
      },
    },
  },
};

export const Sidebar: Story = {
  ...LayoutTemplate,
  args: {
    ...LayoutTemplate.args,
    layout: 'sidebar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar layout with brand and newsletter in a left sidebar and content sections in the main area.',
      },
    },
  },
};

export const Wide: Story = {
  ...LayoutTemplate,
  args: {
    ...LayoutTemplate.args,
    layout: 'wide',
  },
  parameters: {
    docs: {
      description: {
        story: 'Wide layout optimized for large screens with generous spacing and extended content areas.',
      },
    },
  },
};