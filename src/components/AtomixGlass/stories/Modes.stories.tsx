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
import React, { useState } from 'react';
import { Grid, GridCol, Container } from '../../../layouts/Grid';

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
        backgroundImage="https://images.unsplash.com/photo-1760196339465-e403a30d662e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1493"
        height="100vh"
        width="100vw"
        overlayOpacity={0.3}
        borderRadius="0"
      >
        <div style={{ width: '100%', maxWidth: '1400px', padding: '60px 40px' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <AtomixGlass
              mode="standard"
              displacementScale={80}
              blurAmount={1}
              saturation={130}
              cornerRadius={20}
              elasticity={0.12}
              className="u-mb-4 d-inline-block"
            >
              Four Rendering Modes
            </AtomixGlass>
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
          <Container>
            <Grid>
              {modes.map(mode => {
                const isSelected = selectedMode === mode.id;

                return (
                  <GridCol xs={12} md={6} className="u-mb-4">
                    <AtomixGlass
                      key={mode.id}
                      mode={mode.id as any}
                      displacementScale={mode.settings.displacementScale}
                      blurAmount={mode.settings.blurAmount}
                      saturation={mode.settings.saturation}
                      aberrationIntensity={mode.settings.aberrationIntensity}
                      shaderVariant={mode.id === 'shader' ? 'premiumGlass' : undefined}
                      elasticity={0}
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
                  </GridCol>
                );
              })}
            </Grid>
          </Container>

          {/* Info Card */}
          <AtomixGlass
            mode="standard"
            displacementScale={80}
            blurAmount={1}
            saturation={130}
            cornerRadius={20}
            elasticity={0.12}
            className="u-mt-8"
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
            background:
              'url(https://images.unsplash.com/photo-1760196339465-e403a30d662e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1493)',
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

/**
 * Shader Variants Gallery
 *
 * A comprehensive showcase of all available shader variants with their unique characteristics.
 * Each variant is optimized for different visual styles and use cases.
 */
export const ShaderVariants: Story = {
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
        displacementScale: 20,
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
        displacementScale: 20,
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
        displacementScale: 20,
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
        displacementScale: 20,
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
                  elasticity={0}
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
          <AtomixGlass
            mode="shader"
            shaderVariant="liquidGlass"
            displacementScale={20}
            blurAmount={1.2}
            elasticity={0}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
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
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
};
