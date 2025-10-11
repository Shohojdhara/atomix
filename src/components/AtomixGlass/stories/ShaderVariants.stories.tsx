/**
 * ShaderVariants.stories.tsx
 *
 * Professional showcase of Apple-style shader variants with modern design.
 * Features premium liquid glass effects with advanced visual rendering.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper } from './shared-components';
import { useState } from 'react';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Shader Variants',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Experience premium Apple-style shader variants with advanced GPU-accelerated effects. Each variant features unique characteristics including time-based animations, organic flow patterns, and sophisticated visual rendering.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Shader Variants Gallery
 *
 * A comprehensive showcase of all available shader variants with their unique characteristics.
 * Each variant is optimized for different visual styles and use cases.
 */
export const Gallery: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Explore five premium shader variants, each offering distinct visual characteristics from liquid glass to metallic effects. Click any card to see it in action.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeVariant, setActiveVariant] = useState<string | null>(null);

    const variants = [
      {
        id: 'liquidGlass',
        name: 'Liquid Glass',
        icon: '💧',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        shadowColor: 'rgba(102, 126, 234, 0.6)',
        description:
          'Enhanced liquid glass with time-based animations and multi-layered organic distortion',
        features: [
          'Time-based animation',
          'Multi-layer distortion',
          'Chromatic aberration',
          'Depth effects',
          'Organic flow patterns',
        ],
        specs: {
          complexity: 'High',
          performance: 'Good',
          animation: 'Continuous',
          gpuLoad: 'Medium',
        },
        displacementScale: 25,
      },
      {
        id: 'appleFluid',
        name: 'Apple Fluid',
        icon: '🌊',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        shadowColor: 'rgba(245, 87, 108, 0.6)',
        description: 'Premium fluid glass with vortex effects and high-quality organic distortion',
        features: [
          'Vortex effects',
          '5-octave noise',
          'Fluid dynamics',
          'Mouse-driven flow',
          'Apple-style rendering',
        ],
        specs: {
          complexity: 'Very High',
          performance: 'Good',
          animation: 'Interactive',
          gpuLoad: 'High',
        },
        displacementScale: 25,
      },
      {
        id: 'premiumGlass',
        name: 'Premium Glass',
        icon: '💎',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        shadowColor: 'rgba(79, 172, 254, 0.6)',
        description: 'High-end glass with advanced refraction and multi-layer depth effects',
        features: [
          'Advanced refraction',
          'Multi-layer depth',
          'Radial distortion',
          'Edge-aware rendering',
          'Premium quality',
        ],
        specs: {
          complexity: 'High',
          performance: 'Excellent',
          animation: 'Smooth',
          gpuLoad: 'Medium',
        },
        displacementScale: 25,
      },
      {
        id: 'liquidMetal',
        name: 'Liquid Metal',
        icon: '✨',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        shadowColor: 'rgba(252, 182, 159, 0.6)',
        description: 'Metallic liquid effect with shimmer and wave patterns',
        features: [
          'Metallic waves',
          'Shimmer effect',
          '4-octave noise',
          'High-frequency animation',
          'Reflective surface',
        ],
        specs: {
          complexity: 'High',
          performance: 'Good',
          animation: 'Fast',
          gpuLoad: 'Medium-High',
        },
        displacementScale: 25,
      },
      {
        id: 'basiBasi',
        name: 'Basi Basi',
        icon: '🔮',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        shadowColor: 'rgba(250, 112, 154, 0.6)',
        description:
          'Expert premium glass with caustics, spectral dispersion, and volumetric scattering',
        features: [
          'Caustic patterns',
          'Spectral dispersion',
          '7-layer parallax',
          'Volumetric scattering',
          'Micro-surface detail',
          'Advanced turbulence',
        ],
        specs: {
          complexity: 'Maximum',
          performance: 'Moderate',
          animation: 'Complex',
          gpuLoad: 'High',
        },
        displacementScale: 25,
      },
    ];

    return (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1530569427831-a0a4b8a0d206?q=80&w=2071&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.35}
        borderRadius="0"
      >
        <div style={{ width: '100%', maxWidth: '1600px', padding: '60px 40px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
              Premium Shader Technology
            </div>
            <h1
              style={{
                margin: '0 0 20px 0',
                fontSize: '56px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-1.5px',
                textShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              Apple-Style Shader Variants
            </h1>
            <p
              style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.85)',
                maxWidth: '720px',
                margin: '0 auto',
                lineHeight: 1.6,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Experience the pinnacle of liquid glass design with GPU-accelerated shader variants
              featuring time-based animations and organic flow patterns.
            </p>
          </div>

          {/* Variants Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '32px',
              marginBottom: '56px',
            }}
          >
            {variants.map(variant => {
              const isActive = activeVariant === variant.id;

              return (
                <AtomixGlass
                  key={variant.id}
                  mode="shader"
                  shaderVariant={variant.id as any}
                  displacementScale={variant.displacementScale}
                  blurAmount={1.5}
                  saturation={150}
                  aberrationIntensity={2}
                  elasticity={0.2}
                  cornerRadius={28}
                  onClick={() => setActiveVariant(isActive ? null : variant.id)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: isActive ? 'scale(1.02) translateY(-8px)' : 'scale(1)',
                  }}
                >
                  <div
                    style={{
                      padding: '36px 28px',
                      minHeight: '500px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Header with icon */}
                    <div style={{ marginBottom: '28px' }}>
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '20px',
                          background: variant.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '40px',
                          marginBottom: '20px',
                          boxShadow: `0 12px 32px ${variant.shadowColor}`,
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: '-4px',
                            borderRadius: '24px',
                            background: variant.gradient,
                            opacity: 0.4,
                            filter: 'blur(16px)',
                          }}
                        />
                        <span style={{ position: 'relative', zIndex: 1 }}>{variant.icon}</span>
                      </div>
                      {isActive && (
                        <div
                          style={{
                            display: 'inline-block',
                            padding: '5px 14px',
                            borderRadius: '14px',
                            background: 'rgba(102, 126, 234, 0.3)',
                            border: '1px solid rgba(102, 126, 234, 0.5)',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            color: '#fff',
                          }}
                        >
                          Active
                        </div>
                      )}
                    </div>

                    {/* Title and description */}
                    <h3
                      style={{
                        margin: '0 0 12px 0',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#fff',
                        letterSpacing: '-0.5px',
                      }}
                    >
                      {variant.name}
                    </h3>
                    <p
                      style={{
                        margin: '0 0 24px 0',
                        fontSize: '15px',
                        lineHeight: 1.7,
                        color: 'rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      {variant.description}
                    </p>

                    {/* Features */}
                    <div
                      style={{
                        marginBottom: '24px',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          color: 'rgba(255, 255, 255, 0.6)',
                          marginBottom: '12px',
                        }}
                      >
                        Features
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {variant.features.map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 14px',
                              borderRadius: '10px',
                              background: 'rgba(255, 255, 255, 0.08)',
                              backdropFilter: 'blur(8px)',
                              fontSize: '13px',
                              color: 'rgba(255, 255, 255, 0.85)',
                              fontWeight: 500,
                            }}
                          >
                            <div
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: variant.gradient,
                                flexShrink: 0,
                              }}
                            />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                      }}
                    >
                      {Object.entries(variant.specs).map(([key, value]) => (
                        <div
                          key={key}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '10px',
                              textTransform: 'uppercase',
                              fontWeight: 700,
                              letterSpacing: '0.5px',
                              color: 'rgba(255, 255, 255, 0.5)',
                              marginBottom: '4px',
                            }}
                          >
                            {key}
                          </div>
                          <div
                            style={{
                              fontSize: '13px',
                              color: '#fff',
                              fontWeight: 600,
                            }}
                          >
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AtomixGlass>
              );
            })}
          </div>

          {/* Usage Guide */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <AtomixGlass
              mode="shader"
              shaderVariant="liquidGlass"
              displacementScale={20}
              blurAmount={1.2}
              saturation={140}
              cornerRadius={20}
              elasticity={0.15}
            >
              <div style={{ padding: '28px 24px' }}>
                <div
                  style={{
                    fontSize: '32px',
                    marginBottom: '16px',
                  }}
                >
                  💡
                </div>
                <h4
                  style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  Usage Guide
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  Set{' '}
                  <code
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontFamily: 'monospace',
                    }}
                  >
                    mode="shader"
                  </code>{' '}
                  and choose your preferred{' '}
                  <code
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontFamily: 'monospace',
                    }}
                  >
                    shaderVariant
                  </code>{' '}
                  for GPU-accelerated rendering.
                </p>
              </div>
            </AtomixGlass>

            <AtomixGlass
              mode="shader"
              shaderVariant="premiumGlass"
              displacementScale={20}
              blurAmount={1.2}
              saturation={140}
              cornerRadius={20}
              elasticity={0.15}
            >
              <div style={{ padding: '28px 24px' }}>
                <div
                  style={{
                    fontSize: '32px',
                    marginBottom: '16px',
                  }}
                >
                  ⚡
                </div>
                <h4
                  style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  Performance
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  All shader variants are GPU-accelerated for smooth 60fps animations. Premium Glass
                  offers the best performance-to-quality ratio.
                </p>
              </div>
            </AtomixGlass>

            <AtomixGlass
              mode="shader"
              shaderVariant="appleFluid"
              displacementScale={20}
              blurAmount={1.2}
              saturation={140}
              cornerRadius={20}
              elasticity={0.15}
            >
              <div style={{ padding: '28px 24px' }}>
                <div
                  style={{
                    fontSize: '32px',
                    marginBottom: '16px',
                  }}
                >
                  🎨
                </div>
                <h4
                  style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  Best Practices
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  Use lower displacement scales (20-30) for shader mode. Combine with colorful
                  backgrounds for maximum visual impact.
                </p>
              </div>
            </AtomixGlass>
          </div>
        </div>
      </BackgroundWrapper>
    );
  },
};

/**
 * Liquid Glass Variant
 *
 * Enhanced liquid glass with time-based animations and multi-layered organic distortion.
 * Perfect for hero sections and premium content areas.
 */
export const LiquidGlass: Story = {
  args: {
    children: (
      <div style={{ padding: '44px 40px', textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 28px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            boxShadow: '0 20px 48px rgba(102, 126, 234, 0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              opacity: 0.4,
              filter: 'blur(20px)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>💧</span>
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '36px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          Liquid Glass
        </h2>
        <p
          style={{
            margin: '0 0 28px 0',
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          Experience fluid, time-based animations with multi-layered organic distortion and
          chromatic aberration effects that create living glass.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {['Time Animation', 'Multi-Layer', 'Chromatic FX', 'Organic Flow'].map(tag => (
            <div
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'rgba(102, 126, 234, 0.2)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 25,
    blurAmount: 1.5,
    saturation: 150,
    aberrationIntensity: 2,
    elasticity: 0.2,
    cornerRadius: 32,
    mode: 'shader',
    shaderVariant: 'liquidGlass',
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
          'Liquid Glass features time-based animations with multi-layered distortion. Ideal for premium hero sections and feature highlights.',
      },
    },
  },
};

/**
 * Apple Fluid Variant
 *
 * Premium fluid glass inspired by Apple's design language.
 * Features vortex effects and 5-octave noise for organic, flowing visuals.
 */
export const AppleFluid: Story = {
  args: {
    children: (
      <div style={{ padding: '44px 40px', textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 28px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            boxShadow: '0 20px 48px rgba(245, 87, 108, 0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              opacity: 0.4,
              filter: 'blur(20px)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>🌊</span>
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '36px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          Apple Fluid
        </h2>
        <p
          style={{
            margin: '0 0 28px 0',
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          Apple-inspired fluid dynamics with vortex effects and high-quality 5-octave noise. Mouse
          interactions create mesmerizing flow patterns.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {['Vortex FX', '5-Octave', 'Apple Style', 'Interactive'].map(tag => (
            <div
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'rgba(245, 87, 108, 0.2)',
                border: '1px solid rgba(245, 87, 108, 0.3)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 25,
    blurAmount: 1.5,
    saturation: 150,
    aberrationIntensity: 2,
    elasticity: 0.2,
    cornerRadius: 32,
    mode: 'shader',
    shaderVariant: 'appleFluid',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
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
          'Apple Fluid delivers premium vortex effects with 5-octave noise. Mouse interactions create dynamic, flowing patterns inspired by Apple design.',
      },
    },
  },
};

/**
 * Premium Glass Variant
 *
 * High-end glass rendering with advanced refraction and multi-layer depth.
 * Offers the best performance-to-quality ratio among shader variants.
 */
export const PremiumGlass: Story = {
  args: {
    children: (
      <div style={{ padding: '44px 40px', textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 28px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            boxShadow: '0 20px 48px rgba(79, 172, 254, 0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              opacity: 0.4,
              filter: 'blur(20px)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>💎</span>
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '36px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          Premium Glass
        </h2>
        <p
          style={{
            margin: '0 0 28px 0',
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          Advanced refraction with multi-layer depth effects and edge-aware rendering. The optimal
          balance of quality and performance.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {['Advanced Refraction', 'Multi-Depth', 'Edge-Aware', 'Optimized'].map(tag => (
            <div
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'rgba(79, 172, 254, 0.2)',
                border: '1px solid rgba(79, 172, 254, 0.3)',
                fontSize: '13px',
                fontWeight:
 600,
                color: '#fff',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 25,
    blurAmount: 1.5,
    saturation: 150,
    aberrationIntensity: 2,
    elasticity: 0.2,
    cornerRadius: 32,
    mode: 'shader',
    shaderVariant: 'premiumGlass',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop"
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
          'Premium Glass offers advanced refraction with optimal performance. Best choice for production applications requiring high-quality shader effects.',
      },
    },
  },
};
