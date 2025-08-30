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
        component: 'A modern, comprehensive footer component with enhanced visual effects, accessibility features, responsive design, and multiple layout variants following Atomix design patterns.',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['columns', 'centered', 'minimal', 'stacked'],
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
    
    <FooterSection title="Support">
      <FooterLink href="/help">Help Center</FooterLink>
      <FooterLink href="/docs">Documentation</FooterLink>
      <FooterLink href="/community">Community</FooterLink>
      <FooterLink href="/status">Status</FooterLink>
    </FooterSection>
    
    <FooterSection title="Legal">
      <FooterLink href="/privacy">Privacy Policy</FooterLink>
      <FooterLink href="/terms">Terms of Service</FooterLink>
      <FooterLink href="/cookies">Cookie Policy</FooterLink>
      <FooterLink href="/licenses">Licenses</FooterLink>
    </FooterSection>
  </>
);

export const Default: Story = {
  args: {
    brand: 'Atomix',
    brandDescription: 'A modern, accessible design system and component library for building beautiful user interfaces.',
    copyright: '© 2024 Atomix. All rights reserved.',
    layout: 'columns',
    variant: 'primary',
    size: 'md',
    socialLinks: sampleSocialLinks,
    showNewsletter: false,
    showBackToTop: false,
    showDivider: true,
    sticky: false,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--atomix-surface)' }}>
        <h1>Page Content</h1>
        <p>This is sample page content to demonstrate the footer component.</p>
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
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
  args: {
    ...Default.args,
    layout: 'centered',
    showNewsletter: true,
    showBackToTop: true,
  },
  render: Default.render,
};

export const Minimal: Story = {
  args: {
    brand: 'Atomix',
    copyright: '© 2024 Atomix. All rights reserved.',
    layout: 'minimal',
    variant: 'light',
    size: 'sm',
    socialLinks: sampleSocialLinks.slice(0, 3),
    showDivider: false,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--atomix-surface)' }}>
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
  args: {
    ...Default.args,
    layout: 'stacked',
    showNewsletter: true,
    showBackToTop: true,
  },
  render: Default.render,
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
      <div style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--atomix-surface)' }}>
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
        
        <FooterSection title="Support" collapsible>
          <FooterLink href="/help">Help Center</FooterLink>
          <FooterLink href="/docs">Documentation</FooterLink>
          <FooterLink href="/community">Community</FooterLink>
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
      <div style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--atomix-surface)' }}>
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

export const AccessibilityFocused: Story = {
  args: {
    ...Default.args,
    showNewsletter: true,
    showBackToTop: true,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--atomix-surface)' }}>
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
      <div style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--atomix-surface)' }}>
        <h1>Responsive Design</h1>
        <p>Resize the viewport to see responsive grid layouts and collapsible sections.</p>
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};