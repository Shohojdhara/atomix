import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Badge } from '../components/Badge/Badge';
import { Input } from '../components/Form';
import themeConfig from '../../theme.config';

const ThemeShowcase: React.FC = () => {
  const themes = Object.entries(themeConfig.themes);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Atomix Theme System</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2>Available Themes</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {themes.map(([id, theme]) => (
            <Card key={id} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '4px', 
                  backgroundColor: theme.color || '#ccc' 
                }} />
                <h3 style={{ margin: 0 }}>{theme.name}</h3>
                <Badge 
                  label={theme.status || 'unknown'}
                  variant={theme.status === 'stable' ? 'success' : theme.status === 'beta' ? 'warning' : 'info'}
                />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--atomix-text-secondary)', marginBottom: '0.75rem' }}>
                {theme.description}
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--atomix-text-tertiary)' }}>
                <div>Type: {theme.type}</div>
                <div>Dark Mode: {theme.supportsDarkMode ? '✓' : '✗'}</div>
                {theme.tags && <div>Tags: {theme.tags.join(', ')}</div>}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Component Examples</h2>
        <Card style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3>Buttons</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline-primary">Outline</Button>
              </div>
            </div>

            <div>
              <h3>Badges</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Badge label="Primary" variant="primary" />
                <Badge label="Secondary" variant="secondary" />
                <Badge label="Success" variant="success" />
                <Badge label="Warning" variant="warning" />
                <Badge label="Danger" variant="error" />
              </div>
            </div>

            <div>
              <h3>Input</h3>
              <Input placeholder="Enter text..." style={{ maxWidth: '300px' }} />
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2>Theme Configuration</h2>
        <Card style={{ padding: '1.5rem' }}>
          <pre style={{ 
            fontSize: '0.875rem', 
            overflow: 'auto',
            backgroundColor: 'var(--atomix-bg-secondary)',
            padding: '1rem',
            borderRadius: '4px'
          }}>
            {JSON.stringify({
              defaultTheme: themeConfig.runtime.defaultTheme,
              totalThemes: Object.keys(themeConfig.themes).length,
              basePath: themeConfig.runtime.basePath,
              storageKey: themeConfig.runtime.storageKey,
            }, null, 2)}
          </pre>
        </Card>
      </section>
    </div>
  );
};

const meta: Meta<typeof ThemeShowcase> = {
  title: 'Design System/Theme System',
  component: ThemeShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ThemeShowcase>;

export const Overview: Story = {
  render: () => <ThemeShowcase />,
};

export const ShajDefault: Story = {
  render: () => <ThemeShowcase />,
  parameters: {
    theme: 'shaj-default',
  },
};

export const BoomDevs: Story = {
  render: () => <ThemeShowcase />,
  parameters: {
    theme: 'boomdevs',
  },
};

export const Esrar: Story = {
  render: () => <ThemeShowcase />,
  parameters: {
    theme: 'esrar',
  },
};

export const Mashroom: Story = {
  render: () => <ThemeShowcase />,
  parameters: {
    theme: 'mashroom',
  },
};

export const FlashTrade: Story = {
  render: () => <ThemeShowcase />,
  parameters: {
    theme: 'flashtrade',
  },
};

export const Applemix: Story = {
  render: () => <ThemeShowcase />,
  parameters: {
    theme: 'applemix',
  },
};
