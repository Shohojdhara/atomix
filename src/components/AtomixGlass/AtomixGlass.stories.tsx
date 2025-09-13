import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AtomixGlass } from './AtomixGlass';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Avatar } from '../Avatar/Avatar';
import { Card } from '../Card/Card';

const meta = {
  title: 'Components/AtomixGlass',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The AtomixGlass component creates a stunning glassmorphism effect with interactive mouse tracking,
displacement effects, and chromatic aberration. Perfect for creating modern, futuristic UI elements
that respond to user interaction.

## Features
- **Interactive Mouse Tracking**: Responds to mouse movement with elastic effects
- **Multiple Displacement Modes**: Standard, polar, prominent, and shader-based effects
- **Chromatic Aberration**: Creates realistic glass distortion effects
- **Customizable Parameters**: Fine-tune blur, saturation, displacement, and elasticity
- **Accessibility**: Maintains focus states and keyboard navigation
- **Performance Optimized**: Uses CSS filters and transforms for smooth animations

## Updated Implementation
- **Dual blur handling**: Component uses different defaults for main glass (5) vs container (12)
- **Enhanced interaction effects**: Hover, active, and click states with blend modes
- **Shader-based displacement**: Dynamic shader generation for complex effects
- **External mouse tracking**: Support for shared mouse position across multiple instances
        `,
      },
    },
  },
  argTypes: {
    displacementScale: {
      control: { type: 'range', min: 0, max: 200, step: 5 },
      description: 'Scale of the displacement effect (0-200)',
    },
    blurAmount: {
      control: { type: 'range', min: 0, max: 20, step: 0.5 },
      description: 'Amount of blur applied to the backdrop (0-20)',
    },
    saturation: {
      control: { type: 'range', min: 0, max: 300, step: 10 },
      description: 'Saturation level of the backdrop filter (0-300%)',
    },
    aberrationIntensity: {
      control: { type: 'range', min: 0, max: 10, step: 0.5 },
      description: 'Intensity of chromatic aberration effect (0-10)',
    },
    elasticity: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Elasticity of mouse interaction effects (0-1)',
    },
    cornerRadius: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Border radius of the glass container',
    },
    padding: {
      control: 'text',
      description: 'CSS padding for the glass container',
    },
    mode: {
      control: { type: 'select' },
      options: ['standard', 'polar', 'prominent', 'shader'],
      description: 'Displacement map mode',
    },
    overLight: {
      control: 'boolean',
      description: 'Whether the container is over a light background',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the glass container',
    },
  },
  decorators: [
    Story => (
      <div
        className="u-p-10"
        style={{
          background:
            'url(https://plus.unsplash.com/premium_photo-1698342931398-84352ce5ca20?q=80&w=3833&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '60px',
          height: '90vh',
          width: '90vw',
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0 23 66 / 51%)'}} >
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof AtomixGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Glass Effect with default args',
    displacementScale: 25,
    blurAmount: 1,
    aberrationIntensity: 2,
    elasticity: 0.5,
    saturation: 180,
    mode: 'standard',
    overLight: false,
    cornerRadius: 20,
  },
  render: () => (
    <AtomixGlass {...Default.args}>
      <div className="u-px-10 u-py-20">Glass Effect with default args</div>
    </AtomixGlass>
  ),
};

export const WithButton: Story = {
  args: {
    ...Default.args,
    children: 'With Button',
    onClick: undefined,
  },

  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
      <AtomixGlass blurAmount={1}>
        <Button className="u-border-0" label="Primary Button" variant="primary" rounded />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Button className="u-border-0" label="Secondary Button" variant="secondary" rounded />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Button className="u-border-0" label="Success Button" variant="success" rounded />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Button className="u-border-0" label="Info Button" variant="info" rounded />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Button className="u-border-0" label="Warning Button" variant="warning" rounded />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Button className="u-border-0" label="Error Button" variant="error" rounded />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Button className="u-border-0" label="Light Button" variant="light" rounded />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Button className="u-border-0" label="Dark Button" variant="dark" rounded />
      </AtomixGlass>
    </div>
  ),
};

export const WithBadge: Story = {
  args: {
    ...Default.args,
    children: 'With Badge',
    displacementScale: 40,
  },

  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
      <AtomixGlass blurAmount={1}>
        <Badge className="u-border-0" label="Primary Badge" variant="primary" />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Badge className="u-border-0" label="Secondary Badge" variant="secondary" />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Badge className="u-border-0" label="Success Badge" variant="success" />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Badge className="u-border-0" label="Error Badge" variant="error" />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Badge className="u-border-0" label="Warning Badge" variant="warning" />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Badge className="u-border-0" label="Info Badge" variant="info" />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Badge className="u-border-0" label="Light Badge" variant="light" />
      </AtomixGlass>
      <AtomixGlass blurAmount={1}>
        <Badge className="u-border-0" label="Dark Badge" variant="dark" />
      </AtomixGlass>
    </div>
  ),
};

// Displacement Modes
export const DisplacementModes: Story = {
  args: {
    children: 'Displacement Mode Example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {(['standard', 'polar', 'prominent', 'shader'] as const).map(mode => (
        <div key={mode} style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 12px 0', textTransform: 'capitalize', fontSize: '14px' }}>
            {mode}
          </h4>
          <AtomixGlass
            displacementScale={70}
            blurAmount={0}
            saturation={140}
            aberrationIntensity={2}
            elasticity={0.15}
            cornerRadius={999}
            mode={mode}
            overLight={false}
          >
            <div className="u-px-6 u-py-4">{mode.charAt(0).toUpperCase() + mode.slice(1)}</div>
          </AtomixGlass>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Different displacement modes create unique visual effects. Shader mode generates dynamic displacement maps.',
      },
    },
  },
};

// Blur Amount Variants
export const BlurVariants: Story = {
  args: {
    children: 'Blur Variant Example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {[0, 2, 5, 8, 12, 16].map(blur => (
        <div key={blur} style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Blur: {blur}</h4>
          <AtomixGlass
            displacementScale={50}
            blurAmount={blur}
            saturation={150}
            aberrationIntensity={2.5}
            elasticity={0.2}
            cornerRadius={999}
            mode="standard"
            overLight={false}
          >
            <div className="u-py-4 u-px-10">Blur {blur}</div>
          </AtomixGlass>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Different blur amounts affect the backdrop filter intensity.',
      },
    },
  },
};

// Over Light Background
export const OverLightBackground: Story = {
  args: {
    ...Default.args,
    overLight: true,
  },
  decorators: [
    Story => (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '120px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AtomixGlass blurAmount={1} overLight={true}>
          <div className="u-py-4 u-px-10">Over Light Background</div>
        </AtomixGlass>
      </div>
    ),
  ],
};

// Interactive Card Example
export const InteractiveCard: Story = {
  args: {
    children: '',

    onClick: () => console.log('Card clicked!'),
  },
  render: () => (
    <AtomixGlass
      displacementScale={50}
      blurAmount={8}
      saturation={150}
      aberrationIntensity={2.5}
      elasticity={0.2}
      cornerRadius={8}
      mode={'standard'}
      overLight={false}
    >
      <Card
        title="Interactive Card"
        text="Click to interact"
        className="u-border-0 w-full"
        actions={<Button label="Click me" variant="primary" />}
        children={
          <p className="u-fs-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
            The AtomixGlass component creates a stunning glassmorphism effect with interactive mouse
            tracking, displacement effects, and chromatic aberration. Perfect for creating modern,
            futuristic UI elements that respond to user interaction.
          </p>
        }
      />
    </AtomixGlass>
  ),
};

// Aberration Intensity Variants
export const AberrationIntensity: Story = {
  args: {
    children: 'Aberration Intensity Example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {[0, 1, 2, 4, 6, 8].map(intensity => (
        <div key={intensity} style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Aberration: {intensity}</h4>
          <AtomixGlass
            displacementScale={60}
            blurAmount={1}
            saturation={150}
            aberrationIntensity={intensity}
            elasticity={0.2}
            cornerRadius={999}
            mode="standard"
            overLight={false}
          >
            <div className="u-px-8 u-py-4">Effect {intensity}</div>
          </AtomixGlass>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Different chromatic aberration intensities create varying levels of color separation effects.',
      },
    },
  },
};

// Performance Test
export const MultipleInstances: Story = {
  args: {
    children: 'Multiple Instances Example',
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <AtomixGlass
          key={i}
          displacementScale={40 + i * 10}
          blurAmount={3 + i * 1}
          saturation={120 + i * 20}
          aberrationIntensity={1 + i * 0.5}
          elasticity={0.1 + i * 0.02}
          cornerRadius={i % 2 === 0 ? 999 : 12}
          padding="16px"
          mode={['standard', 'polar', 'prominent', 'shader'][i % 4] as any}
          overLight={false}
        >
          <div style={{ textAlign: 'center', fontSize: '20px', padding: '16px' }}>
            {['🌟', '🚀', '💎', '⚡', '🎨', '✨', '🔮', '🌈'][i]}
          </div>
        </AtomixGlass>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Multiple glass components demonstrating performance with independent mouse tracking and different modes.',
      },
    },
  },
};

// External Mouse Tracking Example
export const SharedMouseTracking: Story = {
  args: {
    children: 'Shared Mouse Tracking Example',
  },
  render: () => {
    const [globalMousePos, setGlobalMousePos] = React.useState({ x: 0, y: 0 });
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setGlobalMousePos({ x: e.clientX, y: e.clientY });
      };

      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '20px',
          border: '2px dashed rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
        }}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <AtomixGlass
            key={i}
            displacementScale={50 + i * 10}
            blurAmount={5 + i}
            saturation={140 + i * 10}
            aberrationIntensity={2 + i * 0.5}
            elasticity={0.15 + i * 0.05}
            cornerRadius={999}
            mode="standard"
            overLight={false}
            mouseContainer={containerRef}
          >
            <div style={{ padding: '16px 24px' }}>Glass {i + 1}</div>
          </AtomixGlass>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multiple glass elements sharing mouse tracking from a common container.',
      },
    },
  },
};

// Playground for testing all controls
export const Playground: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px' }}>
        <span>🎮</span>
        <span>Interactive Glass</span>
      </div>
    ),
    displacementScale: 70,
    blurAmount: 5,
    saturation: 140,
    aberrationIntensity: 2,
    elasticity: 0.15,
    cornerRadius: 999,
    mode: 'standard',
    overLight: false,
    onClick: () => console.log('Playground glass clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the controls below to experiment with all AtomixGlass properties. Click the glass to see interaction effects.',
      },
    },
  },
};
