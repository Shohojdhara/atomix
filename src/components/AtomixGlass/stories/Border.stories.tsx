/**
 * Liquid glass border variants — conic rim, inner highlight, light/dark contexts.
 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AtomixGlass from '../AtomixGlass';
import { PREMIUM_GLASS } from './premium-presets';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Border',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Apple-style liquid glass borders: dual-tone conic rim with corner bloom, top-left inner highlight, and backdrop-aware rim shadows. Default rim width is a **0.5px hairline** (`--atomix-glass-border-width` / `$glass-border-width`). Tune via `--atomix-glass-border-*` tokens in `_settings.atomix-glass.scss` or the `border` prop.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

const panelStyle: React.CSSProperties = {
  padding: '2rem 2.5rem',
  minWidth: 280,
  color: '#fff',
  fontWeight: 500,
};

const Scene = ({
  children,
  background,
}: {
  children: React.ReactNode;
  background: string;
}) => (
  <div
    style={{
      padding: '3rem',
      borderRadius: 24,
      background,
      minWidth: 360,
    }}
  >
    {children}
  </div>
);

export const DarkChrome: Story = {
  name: 'Dark chrome (default rim)',
  render: () => (
    <Scene background="linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)">
      <AtomixGlass {...PREMIUM_GLASS.card} borderRadius={20} withBorder>
        <div style={panelStyle}>Conic rim + inner highlight on dark UI</div>
      </AtomixGlass>
    </Scene>
  ),
};

export const OverLight: Story = {
  name: 'Over light (bright backdrop)',
  render: () => (
    <Scene background="linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)">
      <AtomixGlass {...PREMIUM_GLASS.card} borderRadius={20} overLight withBorder>
        <div style={{ ...panelStyle, color: '#0f172a' }}>Dark rim + white inner catch on light BG</div>
      </AtomixGlass>
    </Scene>
  ),
};

export const BorderOff: Story = {
  name: 'Border disabled (comparison)',
  render: () => (
    <Scene background="linear-gradient(145deg, #1a1a2e 0%, #0f3460 100%)">
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <AtomixGlass {...PREMIUM_GLASS.card} borderRadius={16} withBorder>
          <div style={{ ...panelStyle, minWidth: 200 }}>withBorder</div>
        </AtomixGlass>
        <AtomixGlass {...PREMIUM_GLASS.card} borderRadius={16} border={false}>
          <div style={{ ...panelStyle, minWidth: 200 }}>border=false</div>
        </AtomixGlass>
      </div>
    </Scene>
  ),
};

export const StructuredBorder: Story = {
  name: 'Structured border prop',
  render: () => (
    <Scene background="linear-gradient(145deg, #1a1a2e 0%, #0f3460 100%)">
      <AtomixGlass
        {...PREMIUM_GLASS.card}
        borderRadius={20}
        border={{ width: '0.5px', opacity: 1.2, animated: true }}
      >
        <div style={panelStyle}>border=&#123; width, opacity, animated &#125;</div>
      </AtomixGlass>
    </Scene>
  ),
};

export const Sizes: Story = {
  name: 'Border radius sizes',
  render: () => (
    <Scene background="radial-gradient(circle at 30% 20%, #334155 0%, #0f172a 70%)">
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {[8, 16, 24, 40].map((radius) => (
          <AtomixGlass key={radius} blurAmount={22} borderRadius={radius} withBorder>
            <div style={{ ...panelStyle, padding: '1.25rem 1.5rem', minWidth: 120 }}>{radius}px</div>
          </AtomixGlass>
        ))}
      </div>
    </Scene>
  ),
};

/** Reproduces nested rounded inner content — corner seam regression check. */
export const NestedInnerContent: Story = {
  name: 'Nested inner content (corner artifact)',
  render: () => (
    <Scene background="linear-gradient(160deg, #0b1220 0%, #1e293b 100%)">
      <AtomixGlass {...PREMIUM_GLASS.card} borderRadius={20} withBorder>
        <div
          style={{
            padding: '1.25rem',
            background: '#0f172a',
            borderRadius: 16,
          }}
        >
          <div
            style={{
              padding: '1.5rem 2rem',
              background: 'linear-gradient(145deg, #1e3a5f 0%, #2563eb 100%)',
              borderRadius: 12,
              color: '#e2e8f0',
              fontWeight: 500,
            }}
          >
            Inspect bottom-left inner corner for stray rim lines
          </div>
        </div>
      </AtomixGlass>
    </Scene>
  ),
};
