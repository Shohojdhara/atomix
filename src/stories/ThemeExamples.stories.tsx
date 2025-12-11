import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Badge } from '../components/Badge/Badge';
import { Input } from '../components/Form';
import { Navbar } from '../components/Navigation/Navbar/Navbar';
import { Modal } from '../components/Modal/Modal';
import { Tabs } from '../components/Tabs/Tabs';
import { Progress } from '../components/Progress/Progress';
import { Spinner } from '../components/Spinner/Spinner';

const ComponentShowcase: React.FC = () => (
  <div style={{ padding: '2rem', minHeight: '100vh' }}>
    <h1>Theme Component Examples</h1>
    
    <section style={{ marginBottom: '2rem' }}>
      <h2>Buttons</h2>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button variant="outline-primary">Outline Primary</Button>
        <Button variant="outline-secondary">Outline Secondary</Button>
        <Button variant="link">Link</Button>
      </div>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2>Cards & Badges</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <Card style={{ padding: '1.5rem' }}>
          <h3>Card Title</h3>
          <p>Card content with theme colors</p>
          <Badge label="New" variant="primary" />
        </Card>
        <Card style={{ padding: '1.5rem' }}>
          <h3>Another Card</h3>
          <p>Different card example</p>
          <Badge label="Featured" variant="success" />
        </Card>
      </div>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2>Form Elements</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <Input placeholder="Enter your name" />
        <Input placeholder="Enter your email" type="email" />
        <Button variant="primary" fullWidth>Submit</Button>
      </div>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2>Progress & Loading</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Progress value={75} variant="primary" />
        <Progress value={50} variant="success" />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Spinner variant="primary" />
          <Spinner variant="success" />
          <Spinner variant="danger" />
        </div>
      </div>
    </section>
  </div>
);

const DarkModeExample: React.FC = () => (
  <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: 'var(--atomix-bg-primary)' }}>
    <h1 style={{ color: 'var(--atomix-text-primary)' }}>Dark Mode Example</h1>
    <p style={{ color: 'var(--atomix-text-secondary)' }}>
      This example demonstrates how themes handle dark mode
    </p>
    
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: '2rem' }}>
      {['primary', 'secondary', 'success', 'warning', 'danger'].map(variant => (
        <Card key={variant} style={{ padding: '1rem' }}>
          <Button variant={variant as any} fullWidth>{variant}</Button>
        </Card>
      ))}
    </div>
  </div>
);

const GlassEffectExample: React.FC = () => (
  <div style={{ 
    padding: '2rem', 
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}>
    <h1 style={{ color: 'white', marginBottom: '2rem' }}>Glass Effect Example</h1>
    
    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      <Card style={{ padding: '2rem', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.1)' }}>
        <h3 style={{ color: 'white' }}>Glass Card</h3>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Content with glass morphism effect</p>
        <Button variant="primary" glass>Glass Button</Button>
      </Card>
      
      <Card style={{ padding: '2rem', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.1)' }}>
        <h3 style={{ color: 'white' }}>Another Glass Card</h3>
        <Input placeholder="Glass input" style={{ background: 'rgba(255,255,255,0.2)' }} />
      </Card>
    </div>
  </div>
);

const TradingThemeExample: React.FC = () => (
  <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#0a0e1a' }}>
    <h1 style={{ color: '#06b6d4', marginBottom: '2rem' }}>Trading Theme Example</h1>
    
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      <Card style={{ padding: '1.5rem', backgroundColor: '#0f1420' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#fff' }}>BTC/USDT</span>
          <Badge label="+5.2%" variant="success" />
        </div>
        <div style={{ fontSize: '1.5rem', color: '#06b6d4', margin: '1rem 0' }}>$45,234.56</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="success" size="sm" fullWidth>Long</Button>
          <Button variant="error" size="sm" fullWidth>Short</Button>
        </div>
      </Card>

      <Card style={{ padding: '1.5rem', backgroundColor: '#0f1420' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#fff' }}>ETH/USDT</span>
          <Badge label="-2.1%" variant="error" />
        </div>
        <div style={{ fontSize: '1.5rem', color: '#06b6d4', margin: '1rem 0' }}>$2,845.32</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="success" size="sm" fullWidth>Long</Button>
          <Button variant="danger" size="sm" fullWidth>Short</Button>
        </div>
      </Card>
    </div>
  </div>
);

const ColorPaletteExample: React.FC = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Theme Color Palette</h1>
    
    <section style={{ marginBottom: '2rem' }}>
      <h2>Primary Colors</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
        {['primary', 'secondary', 'success', 'warning', 'danger', 'info'].map(color => (
          <div key={color} style={{ textAlign: 'center' }}>
            <div style={{ 
              height: '100px', 
              backgroundColor: `var(--atomix-${color})`,
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }} />
            <div style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>{color}</div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Component Variants</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {['primary', 'secondary', 'success', 'warning', 'danger'].map(variant => (
          <div key={variant} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Button variant={variant as any}>{variant}</Button>
            <Badge label={variant} variant={variant as any} />
            <Progress value={60} variant={variant as any} style={{ flex: 1 }} />
          </div>
        ))}
      </div>
    </section>
  </div>
);

const meta: Meta<typeof ComponentShowcase> = {
  title: 'Design System/Theme Examples',
  component: ComponentShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ComponentShowcase>;

export const AllComponents: Story = {
  render: () => <ComponentShowcase />,
};

export const DarkMode: Story = {
  render: () => <DarkModeExample />,
};

export const GlassEffect: Story = {
  render: () => <GlassEffectExample />,
};

export const TradingInterface: Story = {
  render: () => <TradingThemeExample />,
};

export const ColorPalette: Story = {
  render: () => <ColorPaletteExample />,
};
