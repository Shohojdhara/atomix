/**
 * Basic.stories.tsx
 *
 * Professional showcase of basic AtomixGlass usage with modern design patterns.
 * Features refined examples with contemporary layouts and enhanced visual hierarchy.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgrounds } from './shared-components';
import { useState } from 'react';

/**
 * Storybook meta configuration for AtomixGlass component
 */
const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Basic',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'AtomixGlass delivers premium glass morphism effects with realistic light refraction, chromatic aberration, and fluid interactive behavior. Built for modern interfaces that demand both visual sophistication and performance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the glass effect',
    },
    displacementScale: {
      control: { type: 'range', min: 0, max: 300, step: 5 },
      description: 'Intensity of the glass distortion effect',
      table: { defaultValue: { summary: '70' } },
    },
    blurAmount: {
      control: { type: 'range', min: 0, max: 10, step: 0.5 },
      description: 'Background blur intensity for frosted glass effect',
      table: { defaultValue: { summary: '0.0625' } },
    },
    saturation: {
      control: { type: 'range', min: 100, max: 300, step: 5 },
      description: 'Color saturation percentage',
      table: { defaultValue: { summary: '140' } },
    },
    aberrationIntensity: {
      control: { type: 'range', min: 0, max: 10, step: 0.1 },
      description: 'Chromatic aberration intensity for depth perception',
      table: { defaultValue: { summary: '2' } },
    },
    elasticity: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Responsiveness to mouse interactions',
      table: { defaultValue: { summary: '0.15' } },
    },
    cornerRadius: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Border radius in pixels',
      table: { defaultValue: { summary: '20' } },
    },
    mode: {
      control: 'select',
      options: ['standard', 'polar', 'prominent', 'shader'],
      description: 'Glass rendering mode',
      table: { defaultValue: { summary: '"standard"' } },
    },
    padding: {
      control: 'text',
      description: 'Internal padding',
      table: { defaultValue: { summary: '"0 0"' } },
    },
    overLight: {
      control: 'boolean',
      description: 'Optimize for light backgrounds',
      table: { defaultValue: { summary: 'false' } },
    },
    reducedMotion: {
      control: 'boolean',
      description: 'Respect reduced motion preferences',
      table: { defaultValue: { summary: 'false' } },
    },
    disableEffects: {
      control: 'boolean',
      description: 'Disable all visual effects',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Hero Showcase
 *
 * A stunning hero section demonstrating AtomixGlass at its finest.
 * Features optimal settings for maximum visual impact with balanced performance.
 */
export const Hero: Story = {
  args: {
    children: (
      <div style={{ padding: '48px 40px', textAlign: 'center', maxWidth: '580px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            marginBottom: '24px',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Premium Glass Morphism
        </div>
        <h1
          style={{
            margin: '0 0 20px 0',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AtomixGlass
        </h1>
        <p
          style={{
            margin: '0 0 32px 0',
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: 400,
          }}
        >
          Experience the next generation of glass morphism with realistic light refraction,
          chromatic aberration, and fluid interactive effects that bring your interfaces to life.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            className="c-btn c-btn--primary"
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            Get Started
          </button>
          <button
            className="c-btn c-btn--outline-light"
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            View Documentation
          </button>
        </div>
      </div>
    ),
    displacementScale: 120,
    blurAmount: 1.5,
    saturation: 140,
    aberrationIntensity: 2.5,
    elasticity: 0.18,
    cornerRadius: 32,
    mode: 'standard',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=3029&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.3}
        overlayColor="rgba(0, 0, 0, 0.3)"
        borderRadius="0"
        padding="40px"
      >
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'The hero showcase demonstrates AtomixGlass with premium settings for maximum visual impact. Perfect for landing pages and feature sections.',
      },
    },
  },
};

/**
 * Default Configuration
 *
 * Balanced settings suitable for most use cases.
 * Provides an excellent starting point with optimal performance.
 */
export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '36px 32px', textAlign: 'center', maxWidth: '420px' }}>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '28px',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          Glass Morphism
        </h2>
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          A premium component featuring realistic light refraction and interactive effects for
          modern, sophisticated interfaces.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            className="c-btn c-btn--primary"
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Explore
          </button>
          <button
            className="c-btn c-btn--outline-light"
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    ),
    displacementScale: 100,
    blurAmount: 1,
    saturation: 140,
    aberrationIntensity: 2,
    elasticity: 0.15,
    cornerRadius: 24,
    mode: 'standard',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.2}
        borderRadius="0"
      >
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Default configuration with balanced settings for optimal performance and visual quality. Suitable for most production use cases.',
      },
    },
  },
};

/**
 * Interactive Card
 *
 * Demonstrates hover and click interactions with dynamic state changes.
 * Perfect for understanding how AtomixGlass responds to user input.
 */
export const Interactive: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isActive, setIsActive] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hoverCount, setHoverCount] = useState(0);

    return (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.25}
        borderRadius="0"
      >
        <AtomixGlass
          {...args}
          onClick={() => setIsActive(!isActive)}
          style={{
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isActive ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <div
            style={{ padding: '40px', textAlign: 'center', maxWidth: '380px' }}
            onMouseEnter={() => setHoverCount(prev => prev + 1)}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 24px',
                borderRadius: '20px',
                background: isActive
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                boxShadow: isActive
                  ? '0 12px 32px rgba(102, 126, 234, 0.4)'
                  : '0 12px 32px rgba(245, 87, 108, 0.4)',
                transition: 'all 0.4s ease',
              }}
            >
              {isActive ? '✨' : '🎯'}
            </div>
            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '24px',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              {isActive ? 'Activated!' : 'Interactive Glass'}
            </h3>
            <p
              style={{
                margin: '0 0 20px 0',
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {isActive
                ? 'Beautiful! Click again to reset or continue exploring.'
                : 'Hover to see the glass effect, then click to activate the interactive state.'}
            </p>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '20px',
              }}
            >
              Hover count: <strong style={{ color: '#fff' }}>{hoverCount}</strong>
            </div>
            <button
              style={{
                padding: '12px 28px',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '10px',
                background: isActive ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {isActive ? 'Reset State' : 'Click Me'}
            </button>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  args: {
    displacementScale: 110,
    blurAmount: 1.2,
    saturation: 160,
    aberrationIntensity: 2.8,
    elasticity: 0.22,
    cornerRadius: 28,
    mode: 'standard',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive example demonstrating state changes, hover effects, and click interactions. Watch the glass react smoothly to user input.',
      },
    },
  },
};

/**
 * Minimal Design
 *
 * Clean, minimalist approach with subtle glass effects.
 * Ideal for professional interfaces that require restraint.
 */
export const Minimal: Story = {
  args: {
    children: (
      <div style={{ padding: '32px 28px', maxWidth: '360px' }}>
        <div
          style={{
            width: '48px',
            height: '4px',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))',
            marginBottom: '20px',
          }}
        />
        <h3
          style={{
            margin: '0 0 12px 0',
            fontSize: '22px',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '-0.3px',
          }}
        >
          Minimal Glass
        </h3>
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          Subtle glass effects with a focus on content. Perfect for professional interfaces that
          prioritize clarity and elegance.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {['Design', 'Development', 'UI/UX'].map(tag => (
            <span
              key={tag}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    displacementScale: 60,
    blurAmount: 0.8,
    saturation: 120,
    aberrationIntensity: 1.2,
    elasticity: 0.12,
    cornerRadius: 16,
    mode: 'standard',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.4}
        borderRadius="0"
      >
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Minimal glass design with subtle effects. Focuses on content with restrained visual enhancements for professional applications.',
      },
    },
  },
};

/**
 * Premium Experience
 *
 * Maximum visual impact with enhanced effects and animations.
 * Showcases the full capability of AtomixGlass.
 */
export const Premium: Story = {
  args: {
    children: (
      <div style={{ padding: '44px 36px', textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            margin: '0 auto 28px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 16px 48px rgba(102, 126, 234, 0.5)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              opacity: 0.3,
              filter: 'blur(12px)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>💎</span>
        </div>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(102, 126, 234, 0.2)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            backdropFilter: 'blur(8px)',
            marginBottom: '20px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Premium Edition
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '36px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px',
          }}
        >
          Premium Glass
        </h2>
        <p
          style={{
            margin: '0 0 28px 0',
            fontSize: '17px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          Experience the pinnacle of glass morphism design with enhanced visual effects, realistic
          refraction, and fluid interactions.
        </p>
        <button
          style={{
            padding: '14px 36px',
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          Experience Premium
        </button>
      </div>
    ),
    displacementScale: 150,
    blurAmount: 2,
    saturation: 160,
    aberrationIntensity: 3.5,
    elasticity: 0.25,
    cornerRadius: 36,
    mode: 'prominent',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2942&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.35}
        borderRadius="0"
      >
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Premium showcase with maximum visual impact. Enhanced effects demonstrate the full capabilities of AtomixGlass.',
      },
    },
  },
};
