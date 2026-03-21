/**
 * InteractivePlayground.stories.tsx
 *
 * Simplified interactive playground for AtomixGlass with essential controls.
 * Provides real-time adjustment of key parameters without the complexity
 * of the full-featured playground.
 *
 * @package Atomix
 * @component AtomixGlass
 */
import React from 'react';
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages, StoryErrorBoundary } from './shared-components';
import { advancedArgTypes } from './argTypes';

import { Button } from '../../Button/Button';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Interactive Playground',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive playground for experimenting with AtomixGlass parameters in real-time. Adjust displacement, blur, saturation, and other effects to find the perfect glass aesthetic.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: advancedArgTypes,
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Main Interactive Playground
 *
 * Full-featured playground with live controls for all major parameters.
 */
export const Interactive: Story = {
  render: () => {
    // Defaulting to a high-end "premium" preset
    const [displacementScale, setDisplacementScale] = useState(150);
    const [blurAmount, setBlurAmount] = useState(1.5);
    const [saturation, setSaturation] = useState(160);
    const [aberrationIntensity, setAberrationIntensity] = useState(3.5);
    const [borderRadius, setBorderRadius] = useState(24);
    const [mode, setMode] = useState<'standard' | 'polar' | 'prominent' | 'shader'>('prominent');
    const [withLiquidBlur, setWithLiquidBlur] = useState(true);
    const [withTimeAnimation, setWithTimeAnimation] = useState(true);
    const [withMultiLayerDistortion, setWithMultiLayerDistortion] = useState(true);

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[1]} overlay overlayOpacity={0.15}>
          <div className="u-flex u-gap-6 u-p-6 u-flex-wrap u-w-100 u-justify-center u-items-start" style={{ overflowY: 'auto', maxHeight: '100vh', boxSizing: 'border-box' }}>
            {/* Controls Panel */}
            <div className="u-w-100 u-max-w-100" style={{ width: '360px', flexShrink: 0 }}>
              <AtomixGlass
                displacementScale={50}
                blurAmount={1}
                saturation={130}
                borderRadius={24}
                mode="standard"
                padding="32px 24px"
              >
                <div className="u-text-white u-w-100">
                  <h3 className="u-mt-0 u-text-lg u-font-bold u-mb-5 u-flex u-items-center u-gap-2">
                    <span style={{ fontSize: '1.2em' }}>✨</span> Premium Controls
                  </h3>
                  
                  {/* Displacement Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2 u-opacity-90">
                      Displacement: {displacementScale}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="250"
                      value={displacementScale}
                      onChange={(e) => setDisplacementScale(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#7AFFD7' }}
                    />
                  </div>
                  
                  {/* Blur Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2 u-opacity-90">
                      Blur: {blurAmount}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={blurAmount}
                      onChange={(e) => setBlurAmount(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#7AFFD7' }}
                    />
                  </div>
                  
                  {/* Saturation Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2 u-opacity-90">
                      Saturation: {saturation}%
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="300"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#7AFFD7' }}
                    />
                  </div>
                  
                  {/* Aberration Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2 u-opacity-90">
                      Aberration: {aberrationIntensity}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={aberrationIntensity}
                      onChange={(e) => setAberrationIntensity(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#7AFFD7' }}
                    />
                  </div>
                  
                  {/* Advanced Toggles */}
                  <div className="u-mb-5 u-p-3 u-rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                     <label className="u-flex u-items-center u-mb-3 u-cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={withLiquidBlur} 
                        onChange={(e) => setWithLiquidBlur(e.target.checked)} 
                        className="u-me-2"
                        style={{ accentColor: '#7AFFD7' }}
                      />
                      <span className="u-text-sm u-font-medium">Liquid Blur</span>
                    </label>
                    <label className="u-flex u-items-center u-mb-3 u-cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={withTimeAnimation} 
                        onChange={(e) => setWithTimeAnimation(e.target.checked)} 
                        className="u-me-2"
                        style={{ accentColor: '#7AFFD7' }}
                      />
                      <span className="u-text-sm u-font-medium">Time Animation</span>
                    </label>
                    <label className="u-flex u-items-center u-mb-1 u-cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={withMultiLayerDistortion} 
                        onChange={(e) => setWithMultiLayerDistortion(e.target.checked)} 
                        className="u-me-2"
                        style={{ accentColor: '#7AFFD7' }}
                      />
                      <span className="u-text-sm u-font-medium">Multi-Layer Distortion</span>
                    </label>
                  </div>
                  
                  {/* Mode Selection */}
                  <div className="u-mb-5">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2 u-opacity-90">Render Mode</label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as any)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(0,0,0,0.3)',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="standard">Standard</option>
                      <option value="polar">Polar (Aggressive)</option>
                      <option value="prominent">Prominent (Balanced)</option>
                      <option value="shader">Shader (Legacy)</option>
                    </select>
                  </div>
                  
                  {/* Reset Button */}
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      setDisplacementScale(150);
                      setBlurAmount(1.5);
                      setSaturation(160);
                      setAberrationIntensity(3.5);
                      setBorderRadius(24);
                      setMode('prominent');
                      setWithLiquidBlur(true);
                      setWithTimeAnimation(true);
                      setWithMultiLayerDistortion(true);
                    }}
                    className="u-w-100 u-py-2"
                  >
                    Reset to Premium
                  </Button>
                </div>
              </AtomixGlass>
            </div>
            
            {/* Preview Area (Showcasing Depth) */}
            <div className="u-flex u-flex-column u-gap-6 u-flex-1" style={{ minWidth: '320px', maxWidth: '800px' }}>
              
              {/* Main Premium Card */}
              <AtomixGlass
                displacementScale={displacementScale}
                blurAmount={blurAmount}
                saturation={saturation}
                aberrationIntensity={aberrationIntensity}
                borderRadius={borderRadius}
                mode={mode}
                withLiquidBlur={withLiquidBlur}
                withTimeAnimation={withTimeAnimation}
                withMultiLayerDistortion={withMultiLayerDistortion}
                padding="48px"
                className="u-w-100"
                style={{ minHeight: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <div className="u-text-center u-text-white u-relative u-z-10">
                  <div className="u-mb-3 u-inline-block u-p-3 u-rounded-circle" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <span style={{ fontSize: '48px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }} aria-hidden="true">💎</span>
                  </div>
                  <h2 className="u-mt-0 u-text-4xl u-font-bold u-mb-3" style={{ letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    Full Potential
                  </h2>
                  <p className="u-text-lg u-opacity-90 u-mb-5 u-max-w-100 u-mx-auto" style={{ maxWidth: '400px', lineHeight: 1.6 }}>
                    Experience the pinnacle of glassmorphism. Advanced multi-layer distortion, liquid blur, and real-time shader calculation.
                  </p>
                  
                  {/* Nested Glass Element for Depth Demonstration */}
                  <AtomixGlass
                     displacementScale={displacementScale * 0.5}
                     blurAmount={0}
                     saturation={100}
                     aberrationIntensity={aberrationIntensity * 2}
                     borderRadius={borderRadius - 8}
                     mode="polar"
                     padding="16px 24px"
                     style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.2)' }}
                  >
                    <span className="u-font-bold u-fs-sm u-uppercase" style={{ letterSpacing: '0.1em', opacity: 0.8 }}>Active Engine:</span>
                    <span className="u-font-bold u-text-white" style={{ background: 'linear-gradient(90deg, #7AFFD7, #667EEA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {mode.toUpperCase()}
                    </span>
                  </AtomixGlass>
                </div>
              </AtomixGlass>

              {/* Auxiliary Cards Row */}
              <div className="u-flex u-gap-6 u-flex-wrap">
                <AtomixGlass
                  displacementScale={displacementScale * 0.7}
                  blurAmount={blurAmount * 0.8}
                  saturation={saturation}
                  aberrationIntensity={aberrationIntensity}
                  borderRadius={borderRadius}
                  mode={mode}
                  withLiquidBlur={withLiquidBlur}
                  withTimeAnimation={withTimeAnimation}
                  padding="32px"
                  className="u-flex-1"
                  style={{ minWidth: '240px' }}
                >
                  <div className="u-text-white">
                    <h4 className="u-mt-0 u-text-xl u-font-bold u-mb-2">Fluid Dynamics</h4>
                    <p className="u-opacity-80 u-fs-sm u-m-0" style={{ lineHeight: 1.6 }}>Real-time fractional brownian motion applied to displacement mapping creating an underwater-like distortion field.</p>
                  </div>
                </AtomixGlass>

                <AtomixGlass
                  displacementScale={displacementScale * 0.7}
                  blurAmount={blurAmount * 0.8}
                  saturation={saturation}
                  aberrationIntensity={aberrationIntensity}
                  borderRadius={borderRadius}
                  mode={mode}
                  withLiquidBlur={withLiquidBlur}
                  withTimeAnimation={withTimeAnimation}
                  padding="32px"
                  className="u-flex-1"
                  style={{ minWidth: '240px' }}
                  onClick={() => console.log('Interactive glass element clicked')}
                >
                  <div className="u-text-white u-h-100 u-flex u-flex-column u-justify-between">
                    <div>
                      <h4 className="u-mt-0 u-text-xl u-font-bold u-mb-2">Interactive Depth</h4>
                      <p className="u-opacity-80 u-fs-sm u-m-0" style={{ lineHeight: 1.6 }}>Try clicking and hovering this card to see volumetric lighting calculation tied to relative mouse offset.</p>
                    </div>
                    <div className="u-mt-4 u-text-end">
                      <span className="u-text-xs u-font-bold u-uppercase" style={{ letterSpacing: '0.1em', color: '#7AFFD7' }}>Interactive →</span>
                    </div>
                  </div>
                </AtomixGlass>
              </div>

            </div>
          </div>
        </BackgroundWrapper>
      </StoryErrorBoundary>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Showcase of the AtomixGlass full visual potential, illustrating stacked configurations, advanced FBM motion, heavy liquid blur, and deep chromatic aberrations.',
      },
    },
  },
};

