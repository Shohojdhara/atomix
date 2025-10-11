/**
 * Advanced.stories.tsx
 *
 * Advanced usage examples for the AtomixGlass component.
 * Showcases performance optimization, accessibility features, interactive playgrounds,
 * and advanced integration patterns with modern design systems.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import Button from '../../Button/Button';
import { BackgroundWrapper, backgrounds, backgroundImages } from './shared-components';
import { useState, useEffect } from 'react';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Advanced',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Advanced implementation patterns for AtomixGlass including performance optimization strategies, accessibility compliance, responsive design patterns, and interactive configuration tools for production-ready applications.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Performance Optimization Dashboard
 *
 * Demonstrates enterprise-grade performance optimization techniques with side-by-side
 * comparisons of different configuration strategies and their impact on rendering efficiency.
 */
export const PerformanceOptimization: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive performance optimization guide showcasing three distinct configuration profiles: High Performance (mobile-optimized), Balanced (desktop standard), and Premium (high-end hardware). Each profile demonstrates the trade-offs between visual fidelity and rendering performance.',
      },
    },
  },
  render: () => (
    <BackgroundWrapper backgroundIndex={3} overlay={true} padding="60px 20px">
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1
            style={{
              color: '#fff',
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Performance Optimization
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.25rem',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Fine-tune AtomixGlass for optimal performance across different device capabilities
          </p>
        </div>

        {/* Performance Guidelines */}
        <AtomixGlass
          displacementScale={30}
          blurAmount={0.03}
          saturation={130}
          aberrationIntensity={1.2}
          elasticity={0}
          cornerRadius={16}
          mode="standard"
          style={{ marginBottom: '48px' }}
        >
          <div style={{ padding: '32px' }}>
            <h2
              style={{
                color: '#fff',
                fontSize: '1.75rem',
                fontWeight: '600',
                marginBottom: '24px',
                marginTop: 0,
              }}
            >
              Best Practices & Guidelines
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                color: '#fff',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '12px',
                    opacity: 0.9,
                  }}
                >
                  ⚡
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px' }}>
                  Limit Instances
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', opacity: 0.85, margin: 0 }}>
                  Use 3-5 glass components maximum per view to maintain optimal frame rates
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '12px',
                    opacity: 0.9,
                  }}
                >
                  📱
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px' }}>
                  Mobile Optimization
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', opacity: 0.85, margin: 0 }}>
                  Reduce complexity on mobile: lower displacement scale and disable hover effects
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '12px',
                    opacity: 0.9,
                  }}
                >
                  🎯
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px' }}>
                  Strategic Placement
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', opacity: 0.85, margin: 0 }}>
                  Apply glass effects to focal points only—cards, modals, and navigation elements
                </p>
              </div>
            </div>
          </div>
        </AtomixGlass>

        {/* Configuration Comparison Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
          }}
        >
          {/* High Performance Profile */}
          <div>
            <div
              style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#34C759',
                  boxShadow: '0 0 12px rgba(52, 199, 89, 0.6)',
                }}
              />
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                High Performance
              </h3>
            </div>
            <AtomixGlass
              displacementScale={25}
              blurAmount={0.02}
              saturation={120}
              aberrationIntensity={0.8}
              elasticity={0.08}
              cornerRadius={12}
              mode="standard"
              style={{ height: '100%', minHeight: '400px' }}
            >
              <div
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(52, 199, 89, 0.2)',
                    color: '#34C759',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '20px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span>🚀</span>
                  <span>OPTIMIZED</span>
                </div>
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                  }}
                >
                  Mobile-First Configuration
                </h4>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '12px',
                        fontSize: '0.9375rem',
                        lineHeight: '1.8',
                      }}
                    >
                      <span style={{ opacity: 0.85 }}>Displacement Scale:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>25</span>
                      <span style={{ opacity: 0.85 }}>Blur Amount:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.02</span>
                      <span style={{ opacity: 0.85 }}>Saturation:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>120%</span>
                      <span style={{ opacity: 0.85 }}>Aberration:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.8</span>
                      <span style={{ opacity: 0.85 }}>Elasticity:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.08</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Best For:</strong>
                    <ul style={{ margin: 0, paddingLeft: '20px', opacity: 0.85 }}>
                      <li>Mobile devices & tablets</li>
                      <li>Multiple glass instances</li>
                      <li>Battery-constrained devices</li>
                      <li>Background animations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AtomixGlass>
          </div>

          {/* Balanced Profile */}
          <div>
            <div
              style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#FF9500',
                  boxShadow: '0 0 12px rgba(255, 149, 0, 0.6)',
                }}
              />
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                Balanced
              </h3>
            </div>
            <AtomixGlass
              displacementScale={55}
              blurAmount={0.04}
              saturation={150}
              aberrationIntensity={1.8}
              elasticity={0.15}
              cornerRadius={12}
              mode="standard"
              style={{ height: '100%', minHeight: '400px' }}
            >
              <div
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 149, 0, 0.2)',
                    color: '#FF9500',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '20px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span>⚖️</span>
                  <span>RECOMMENDED</span>
                </div>
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                  }}
                >
                  Production Standard
                </h4>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '12px',
                        fontSize: '0.9375rem',
                        lineHeight: '1.8',
                      }}
                    >
                      <span style={{ opacity: 0.85 }}>Displacement Scale:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>55</span>
                      <span style={{ opacity: 0.85 }}>Blur Amount:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.04</span>
                      <span style={{ opacity: 0.85 }}>Saturation:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>150%</span>
                      <span style={{ opacity: 0.85 }}>Aberration:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>1.8</span>
                      <span style={{ opacity: 0.85 }}>Elasticity:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.15</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Best For:</strong>
                    <ul style={{ margin: 0, paddingLeft: '20px', opacity: 0.85 }}>
                      <li>Desktop applications</li>
                      <li>Modern web browsers</li>
                      <li>Mid-range devices</li>
                      <li>General use cases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AtomixGlass>
          </div>

          {/* Premium Profile */}
          <div>
            <div
              style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#AF52DE',
                  boxShadow: '0 0 12px rgba(175, 82, 222, 0.6)',
                }}
              />
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                Premium
              </h3>
            </div>
            <AtomixGlass
              displacementScale={85}
              blurAmount={0.08}
              saturation={180}
              aberrationIntensity={3.2}
              elasticity={0.22}
              cornerRadius={12}
              mode="standard"
              style={{ height: '100%', minHeight: '400px' }}
            >
              <div
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(175, 82, 222, 0.2)',
                    color: '#AF52DE',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '20px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span>✨</span>
                  <span>PREMIUM</span>
                </div>
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                  }}
                >
                  High-Fidelity Visual
                </h4>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '12px',
                        fontSize: '0.9375rem',
                        lineHeight: '1.8',
                      }}
                    >
                      <span style={{ opacity: 0.85 }}>Displacement Scale:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>85</span>
                      <span style={{ opacity: 0.85 }}>Blur Amount:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.08</span>
                      <span style={{ opacity: 0.85 }}>Saturation:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>180%</span>
                      <span style={{ opacity: 0.85 }}>Aberration:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>3.2</span>
                      <span style={{ opacity: 0.85 }}>Elasticity:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.22</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Best For:</strong>
                    <ul style={{ margin: 0, paddingLeft: '20px', opacity: 0.85 }}>
                      <li>High-end hardware</li>
                      <li>Hero sections & CTAs</li>
                      <li>Premium experiences</li>
                      <li>Single focal elements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AtomixGlass>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  ),
};

/**
 * Interactive Configuration Playground
 *
 * Professional-grade interactive tool for real-time AtomixGlass configuration.
 * Features comprehensive controls with live preview and preset management.
 */
export const InteractivePlayground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive interactive playground enabling real-time experimentation with all AtomixGlass properties. Features an intuitive control panel with grouped settings, preset configurations, and live visual feedback for rapid prototyping and fine-tuning.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({
      displacementScale: 70,
      blurAmount: 0.05,
      saturation: 140,
      aberrationIntensity: 2,
      cornerRadius: 20,
      mode: 'standard' as const,
      overLight: false,
      elasticity: 0.15,
      backgroundType: 'gradient' as 'gradient' | 'image' | 'video',
    });

    const handleChange = (property: string, value: any) => {
      setSettings(prev => ({ ...prev, [property]: value }));
    };

    const applyPreset = (preset: 'minimal' | 'standard' | 'dramatic') => {
      const presets = {
        minimal: {
          displacementScale: 20,
          blurAmount: 0.02,
          saturation: 110,
          aberrationIntensity: 0.5,
          cornerRadius: 8,
          elasticity: 0.05,
        },
        standard: {
          displacementScale: 70,
          blurAmount: 0.05,
          saturation: 140,
          aberrationIntensity: 2,
          cornerRadius: 20,
          elasticity: 0.15,
        },
        dramatic: {
          displacementScale: 120,
          blurAmount: 0.12,
          saturation: 200,
          aberrationIntensity: 4,
          cornerRadius: 32,
          elasticity: 0.25,
        },
      };

      setSettings(prev => ({ ...prev, ...presets[preset] }));
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          settings.backgroundType === 'image'
            ? backgroundImages[3]
            : settings.backgroundType === 'gradient'
              ? backgrounds.blueGradient
              : 'transparent'
        }
        height="100vh"
        padding="0"
        style={{ justifyContent: 'space-evenly' }}
      >
        {settings.backgroundType === 'video' && (
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          >
            <source src={backgrounds.videoBackground} type="video/mp4" />
          </video>
        )}

        {/* Control Panel */}
        <div
          style={{
            width: '400px',
            height: '100vh',
            overflowY: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(20px)',
            padding: '32px',
            boxShadow: '0 0 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                color: '#fff',
                fontSize: '1.75rem',
                fontWeight: '700',
                margin: '0 0 8px 0',
              }}
            >
              Configuration Lab
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', margin: 0 }}>
              Experiment with all glass properties in real-time
            </p>
          </div>

          {/* Preset Buttons */}
          <div style={{ marginBottom: '32px' }}>
            <label
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Quick Presets
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => applyPreset('minimal')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Minimal
              </button>
              <button
                onClick={() => applyPreset('standard')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Standard
              </button>
              <button
                onClick={() => applyPreset('dramatic')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Dramatic
              </button>
            </div>
          </div>

          {/* Visual Effects Section */}
          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.875rem',
                fontWeight: '600',
                margin: '0 0 16px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Visual Effects
            </h3>

            {/* Displacement Scale */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <label htmlFor="displacementScale" style={{ color: '#fff', fontSize: '0.9375rem' }}>
                  Displacement Scale
                </label>
                <span
                  style={{
                    color: '#6366f1',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {settings.displacementScale}
                </span>
              </div>
              <input
                type="range"
                id="displacementScale"
                min="0"
                max="150"
                value={settings.displacementScale}
                onChange={e => handleChange('displacementScale', parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>

            {/* Blur Amount */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <label htmlFor="blurAmount" style={{ color: '#fff', fontSize: '0.9375rem' }}>
                  Blur Amount
                </label>
                <span
                  style={{
                    color: '#6366f1',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {settings.blurAmount.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                id="blurAmount"
                min="0"
                max="0.2"
                step="0.01"
                value={settings.blurAmount}
                onChange={e => handleChange('blurAmount', parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>

            {/* Saturation */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <label htmlFor="saturation" style={{ color: '#fff', fontSize: '0.9375rem' }}>
                  Saturation
                </label>
                <span
                  style={{
                    color: '#6366f1',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {settings.saturation}%
                </span>
              </div>
              <input
                type="range"
                id="saturation"
                min="50"
                max="300"
                value={settings.saturation}
                onChange={e => handleChange('saturation', parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>

            {/* Aberration Intensity */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <label
                  htmlFor="aberrationIntensity"
                  style={{ color: '#fff', fontSize: '0.9375rem' }}
                >
                  Aberration
                </label>
                <span
                  style={{
                    color: '#6366f1',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {settings.aberrationIntensity.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                id="aberrationIntensity"
                min="0"
                max="8"
                step="0.1"
                value={settings.aberrationIntensity}
                onChange={e => handleChange('aberrationIntensity', parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>
          </div>

          {/* Interaction Section */}

          {/* Interaction Section */}
          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.875rem',
                fontWeight: '600',
                margin: '0 0 16px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Interaction
            </h3>

            {/* Elasticity */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <label htmlFor="elasticity" style={{ color: '#fff', fontSize: '0.9375rem' }}>
                  Elasticity
                </label>
                <span
                  style={{
                    color: '#6366f1',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {settings.elasticity.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                id="elasticity"
                min="0"
                max="0.5"
                step="0.01"
                value={settings.elasticity}
                onChange={e => handleChange('elasticity', parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>

            {/* Corner Radius */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <label htmlFor="cornerRadius" style={{ color: '#fff', fontSize: '0.9375rem' }}>
                  Corner Radius
                </label>
                <span
                  style={{
                    color: '#6366f1',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {settings.cornerRadius}px
                </span>
              </div>
              <input
                type="range"
                id="cornerRadius"
                min="0"
                max="50"
                value={settings.cornerRadius}
                onChange={e => handleChange('cornerRadius', parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>
          </div>

          {/* Background Section */}
          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.875rem',
                fontWeight: '600',
                margin: '0 0 16px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Background
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSettings(prev => ({ ...prev, backgroundType: 'image' }))}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor:
                    settings.backgroundType === 'image'
                      ? 'rgba(99, 102, 241, 0.3)'
                      : 'rgba(255,255,255,0.1)',
                  border:
                    settings.backgroundType === 'image'
                      ? '1px solid rgba(99, 102, 241, 0.5)'
                      : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Image
              </button>
              <button
                onClick={() => setSettings(prev => ({ ...prev, backgroundType: 'gradient' }))}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor:
                    settings.backgroundType === 'gradient'
                      ? 'rgba(99, 102, 241, 0.3)'
                      : 'rgba(255,255,255,0.1)',
                  border:
                    settings.backgroundType === 'gradient'
                      ? '1px solid rgba(99, 102, 241, 0.5)'
                      : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Gradient
              </button>
              <button
                onClick={() => setSettings(prev => ({ ...prev, backgroundType: 'video' }))}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor:
                    settings.backgroundType === 'video'
                      ? 'rgba(99, 102, 241, 0.3)'
                      : 'rgba(255,255,255,0.1)',
                  border:
                    settings.backgroundType === 'video'
                      ? '1px solid rgba(99, 102, 241, 0.5)'
                      : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Video
              </button>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            width: '100%',
            maxWidth: '600px',
            minHeight: '400px',
          }}
        >
          <AtomixGlass
            displacementScale={settings.displacementScale}
            blurAmount={settings.blurAmount}
            saturation={settings.saturation}
            aberrationIntensity={settings.aberrationIntensity}
            elasticity={settings.elasticity}
            cornerRadius={settings.cornerRadius}
            mode="standard"
          >
            <div style={{ padding: '48px', height: '100%' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '24px',
                }}
              >
                <span style={{ marginRight: '8px' }}>✨</span>
                LIVE PREVIEW
              </div>
              <h2
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#fff',
                  lineHeight: '1.2',
                }}
              >
                Experience the Magic
              </h2>
              <p
                style={{
                  margin: '0 0 32px 0',
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                Adjust the controls to see real-time changes in the glass effect. Perfect for
                finding the ideal configuration for your project.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Button variant="primary" size="md" glass>
                  Get Started
                </Button>
                <Button variant="secondary" size="md" glass>
                  Learn More
                </Button>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
};
