/**
 * Modes.stories.tsx
 *
 * Professional showcase of AtomixGlass rendering modes with modern layouts.
 * Each mode demonstrates unique visual characteristics and displacement patterns.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper } from './shared-components';
import { useState } from 'react';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Modes',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Explore four distinct rendering modes in AtomixGlass. Each mode offers unique displacement patterns, visual characteristics, and performance profiles optimized for different use cases.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Mode Comparison Gallery
 *
 * A comprehensive showcase comparing all four rendering modes side-by-side.
 * Perfect for understanding the visual differences and selecting the right mode for your needs.
 */
export const ModeGallery: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive gallery showcasing all four rendering modes. Click any card to see the mode in action with optimized settings.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedMode, setSelectedMode] = useState<string | null>(null);

    const modes = [
      {
        id: 'standard',
        name: 'Standard',
        icon: '✨',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: 'Balanced displacement with uniform distortion patterns',
        features: [
          'Optimal performance',
          'Uniform displacement',
          'Smooth transitions',
          'Best for production',
        ],
        settings: {
          displacementScale: 120,
          blurAmount: 1.5,
          saturation: 140,
          aberrationIntensity: 2,
        },
        useCase: 'Perfect for cards, modals, and general UI elements',
      },
      {
        id: 'polar',
        name: 'Polar',
        icon: '🌀',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        description: 'Circular refraction with radial displacement patterns',
        features: [
          'Circular distortion',
          'Radial patterns',
          'Dynamic center point',
          'Eye-catching effect',
        ],
        settings: {
          displacementScale: 100,
          blurAmount: 1.2,
          saturation: 150,
          aberrationIntensity: 2.5,
        },
        useCase: 'Ideal for hero sections and feature highlights',
      },
      {
        id: 'prominent',
        name: 'Prominent',
        icon: '💫',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        description: 'Enhanced displacement with stronger edge effects',
        features: [
          'Amplified distortion',
          'Edge enhancement',
          'High visual impact',
          'Premium feel',
        ],
        settings: {
          displacementScale: 140,
          blurAmount: 1.8,
          saturation: 155,
          aberrationIntensity: 3,
        },
        useCase: 'Great for call-to-action elements and premium content',
      },
      {
        id: 'shader',
        name: 'Shader',
        icon: '🔮',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        description: 'Advanced shader-based rendering with maximum visual fidelity',
        features: [
          'Shader-based effects',
          'Maximum quality',
          'Time-based animation',
          'Apple-style fluid',
        ],
        settings: {
          displacementScale: 25,
          blurAmount: 2,
          saturation: 160,
          aberrationIntensity: 2.8,
        },
        useCase: 'Best for hero sections and premium experiences',
      },
    ];

    return (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=3029&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.3}
        borderRadius="0"
      >
        <div style={{ width: '100%', maxWidth: '1400px', padding: '60px 40px' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px)',
                marginBottom: '20px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              Four Rendering Modes
            </div>
            <h1
              style={{
                margin: '0 0 16px 0',
                fontSize: '48px',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-1px',
                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              AtomixGlass Modes
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.85)',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: 1.6,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Choose from four distinct rendering modes, each optimized for different visual styles
              and performance requirements.
            </p>
          </div>

          {/* Modes Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              marginBottom: '48px',
            }}
          >
            {modes.map(mode => {
              const isSelected = selectedMode === mode.id;

              return (
                <AtomixGlass
                  key={mode.id}
                  mode={mode.id as any}
                  displacementScale={mode.settings.displacementScale}
                  blurAmount={mode.settings.blurAmount}
                  saturation={mode.settings.saturation}
                  aberrationIntensity={mode.settings.aberrationIntensity}
                  shaderVariant={mode.id === 'shader' ? 'premiumGlass' : undefined}
                  elasticity={0.2}
                  cornerRadius={24}
                  onClick={() => setSelectedMode(isSelected ? null : mode.id)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                  }}
                >
                  <div
                    style={{
                      padding: '32px 28px',
                      minHeight: '420px',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Icon and Badge */}
                    <div style={{ marginBottom: '24px' }}>
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '18px',
                          background: mode.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          marginBottom: '16px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: '-3px',
                            borderRadius: '20px',
                            background: mode.gradient,
                            opacity: 0.4,
                            filter: 'blur(10px)',
                          }}
                        />
                        <span style={{ position: 'relative', zIndex: 1 }}>{mode.icon}</span>
                      </div>
                      {isSelected && (
                        <div
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            background: 'rgba(102, 126, 234, 0.3)',
                            border: '1px solid rgba(102, 126, 234, 0.4)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            color: '#fff',
                          }}
                        >
                          Selected
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          margin: '0 0 12px 0',
                          fontSize: '26px',
                          fontWeight: 600,
                          color: '#fff',
                          letterSpacing: '-0.5px',
                        }}
                      >
                        {mode.name}
                      </h3>
                      <p
                        style={{
                          margin: '0 0 20px 0',
                          fontSize: '14px',
                          lineHeight: 1.6,
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {mode.description}
                      </p>

                      {/* Features List */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          marginBottom: '20px',
                        }}
                      >
                        {mode.features.map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '13px',
                              color: 'rgba(255, 255, 255, 0.75)',
                            }}
                          >
                            <div
                              style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: mode.gradient,
                              }}
                            />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Use Case */}
                      <div
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          fontSize: '12px',
                          lineHeight: 1.5,
                          color: 'rgba(255, 255, 255, 0.7)',
                          marginTop: 'auto',
                        }}
                      >
                        <strong style={{ color: '#fff' }}>Use Case:</strong> {mode.useCase}
                      </div>
                    </div>

                    {/* Settings Info */}
                    <div
                      style={{
                        marginTop: '20px',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      {Object.entries(mode.settings).map(([key, value]) => (
                        <span
                          key={key}
                          style={{
                            padding: '4px 10px',
                            fontSize: '11px',
                            borderRadius: '8px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontFamily: 'monospace',
                          }}
                        >
                          {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </AtomixGlass>
              );
            })}
          </div>

          {/* Info Card */}
          <AtomixGlass
            mode="standard"
            displacementScale={80}
            blurAmount={1}
            saturation={130}
            cornerRadius={20}
            elasticity={0.12}
          >
            <div
              style={{
                padding: '28px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.15)',
                }}
              >
                💡
              </div>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  Choosing the Right Mode
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <strong>Standard</strong> offers the best balance for most uses.{' '}
                  <strong>Polar</strong> creates eye-catching radial effects.{' '}
                  <strong>Prominent</strong> amplifies visual impact for premium content.{' '}
                  <strong>Shader</strong> delivers maximum quality with advanced GPU-accelerated
                  rendering.
                </p>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
};

/**
 * Standard Mode
 *
 * The most versatile mode with balanced displacement and optimal performance.
 * Recommended as the default choice for production applications.
 */
export const Standard: Story = {
  args: {
    children: (
      <div style={{ padding: '40px 36px', textAlign: 'center', maxWidth: '440px' }}>
        <div
          style={{
            width: '68px',
            height: '68px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
          }}
        >
          ✨
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '32px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          Standard Mode
        </h2>
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          Balanced displacement with uniform distortion patterns. The perfect choice for production
          applications requiring optimal performance and visual quality.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {[
            { label: 'Performance', value: '⚡️ Excellent' },
            { label: 'Quality', value: '⭐️ High' },
            { label: 'Use Case', value: '🎯 Universal' },
            { label: 'GPU Load', value: '📊 Low' },
          ].map(item => (
            <div
              key={item.label}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 120,
    blurAmount: 1.5,
    saturation: 140,
    aberrationIntensity: 2,
    elasticity: 0.18,
    cornerRadius: 28,
    mode: 'standard',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.25}
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
          'Standard mode provides balanced displacement with excellent performance. Ideal for cards, modals, overlays, and general UI components.',
      },
    },
  },
};

/**
 * Polar Mode
 *
 * Creates circular refraction patterns with radial displacement.
 * Perfect for hero sections and elements that need to draw attention.
 */
export const Polar: Story = {
  args: {
    children: (
      <div style={{ padding: '40px 36px', textAlign: 'center', maxWidth: '440px' }}>
        <div
          style={{
            width: '68px',
            height: '68px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 12px 32px rgba(245, 87, 108, 0.5)',
          }}
        >
          🌀
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '32px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          Polar Mode
        </h2>
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          Circular refraction with radial displacement patterns. Creates a dynamic, eye-catching
          effect that draws attention to focal points.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {[
            { label: 'Pattern', value: '⭕ Circular' },
            { label: 'Impact', value: '🎯 High' },
            { label: 'Best For', value: '🌟 Heroes' },
            { label: 'Animation', value: '🔄 Dynamic' },
          ].map(item => (
            <div
              key={item.label}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 100,
    blurAmount: 1.2,
    saturation: 150,
    aberrationIntensity: 2.5,
    elasticity: 0.2,
    cornerRadius: 28,
    mode: 'polar',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.25}
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
          'Polar mode creates circular refraction patterns that emanate from the center. Excellent for hero sections, feature highlights, and attention-grabbing elements.',
      },
    },
  },
};

/**
 * Prominent Mode
 *
 * Enhanced displacement with stronger edge effects for maximum visual impact.
 * Ideal for premium content and call-to-action elements.
 */
export const Prominent: Story = {
  args: {
    children: (
      <div style={{ padding: '40px 36px', textAlign: 'center', maxWidth: '440px' }}>
        <div
          style={{
            width: '68px',
            height: '68px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 12px 32px rgba(79, 172, 254, 0.5)',
          }}
        >
          💫
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '32px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          Prominent Mode
        </h2>
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          Amplified displacement with enhanced edge effects. Delivers a premium, high-impact visual
          experience for important content.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {[
            { label: 'Intensity', value: '🔥 Maximum' },
            { label: 'Quality', value: '💎 Premium' },
            { label: 'Ideal For', value: '🎖️ CTAs' },
            { label: 'Edge FX', value: '✨ Enhanced' },
          ].map(item => (
            <div
              key={item.label}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 140,
    blurAmount: 1.8,
    saturation: 155,
    aberrationIntensity: 3,
    elasticity: 0.22,
    cornerRadius: 28,
    mode: 'prominent',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2942&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.28}
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
          'Prominent mode amplifies displacement effects with enhanced edge characteristics. Perfect for call-to-action elements, premium content, and focal points that demand attention.',
      },
    },
  },
};

/**
 * Shader Mode
 *
 * Advanced GPU-accelerated shader rendering with time-based animations.
 * The pinnacle of AtomixGlass visual quality with Apple-style fluid effects.
 */
export const Shader: Story = {
  args: {
    children: (
      <div style={{ padding: '40px 36px', textAlign: 'center', maxWidth: '440px' }}>
        <div
          style={{
            width: '68px',
            height: '68px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 12px 32px rgba(250, 112, 154, 0.5)',
          }}
        >
          🔮
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '32px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          Shader Mode
        </h2>
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          GPU-accelerated shader rendering with maximum visual fidelity. Features time-based
          animations and Apple-style liquid glass effects.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {[
            { label: 'Technology', value: '🖥️ GPU Shader' },
            { label: 'Fidelity', value: '🌟 Maximum' },
            { label: 'Animation', value: '⏰ Time-based' },
            { label: 'Style', value: '🍎 Apple-like' },
          ].map(item => (
            <div
              key={item.label}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 25,
    blurAmount: 2,
    saturation: 160,
    aberrationIntensity: 2.8,
    elasticity: 0.2,
    cornerRadius: 28,
    mode: 'shader',
    shaderVariant: 'premiumGlass',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=3029&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.3}
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
          'Shader mode uses advanced GPU-accelerated rendering for maximum visual quality. Features time-based animations and multiple shader variants including liquidGlass, appleFluid, and premiumGlass.',
      },
    },
  },
};
