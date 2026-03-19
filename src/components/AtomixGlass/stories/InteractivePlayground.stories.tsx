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
    const [displacementScale, setDisplacementScale] = useState(70);
    const [blurAmount, setBlurAmount] = useState(0.5);
    const [saturation, setSaturation] = useState(140);
    const [aberrationIntensity, setAberrationIntensity] = useState(2);
    const [borderRadius, setBorderRadius] = useState(20);
    const [mode, setMode] = useState<'standard' | 'polar' | 'prominent' | 'shader'>('standard');

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[0]} overlay overlayOpacity={0.3}>
          <div style={{ display: 'flex', gap: '32px', padding: '40px', flexWrap: 'wrap' }}>
            {/* Controls Panel */}
            <div
              style={{
                width: '320px',
                flexShrink: 0,
              }}
            >
              <AtomixGlass
                displacementScale={50}
                blurAmount={0.4}
                saturation={130}
                borderRadius={16}
                mode="standard"
                padding="24px"
              >
                <div className="u-text-white">
                  <h3 className="u-mt-0 u-text-lg u-font-bold u-mb-4">Live Controls</h3>
                  
                  {/* Displacement Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2">
                      Displacement: {displacementScale}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={displacementScale}
                      onChange={(e) => setDisplacementScale(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#667eea' }}
                    />
                  </div>
                  
                  {/* Blur Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2">
                      Blur: {blurAmount}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={blurAmount}
                      onChange={(e) => setBlurAmount(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#667eea' }}
                    />
                  </div>
                  
                  {/* Saturation Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2">
                      Saturation: {saturation}%
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="300"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#667eea' }}
                    />
                  </div>
                  
                  {/* Aberration Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2">
                      Aberration: {aberrationIntensity}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={aberrationIntensity}
                      onChange={(e) => setAberrationIntensity(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#667eea' }}
                    />
                  </div>
                  
                  {/* Border Radius Control */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2">
                      Border Radius: {borderRadius}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={borderRadius}
                      onChange={(e) => setBorderRadius(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#667eea' }}
                    />
                  </div>
                  
                  {/* Mode Selection */}
                  <div className="u-mb-4">
                    <label className="u-block u-text-sm u-font-semibold u-mb-2">Mode</label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as any)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      <option value="standard">Standard</option>
                      <option value="polar">Polar</option>
                      <option value="prominent">Prominent</option>
                      <option value="shader">Shader</option>
                    </select>
                  </div>
                  
                  {/* Reset Button */}
                  <Button
                    variant="outline-light"
                    glass={{ elasticity: 0 }}
                    onClick={() => {
                      setDisplacementScale(70);
                      setBlurAmount(0.5);
                      setSaturation(140);
                      setAberrationIntensity(2);
                      setBorderRadius(20);
                      setMode('standard');
                    }}
                    size="sm"
                    className="u-w-full"
                  >
                    Reset to Defaults
                  </Button>
                </div>
              </AtomixGlass>
            </div>
            
            {/* Preview Area */}
            <div style={{ flex: 1, minWidth: '400px' }}>
              <AtomixGlass
                displacementScale={displacementScale}
                blurAmount={blurAmount}
                saturation={saturation}
                aberrationIntensity={aberrationIntensity}
                borderRadius={borderRadius}
                mode={mode}
                padding="40px"
                style={{ minHeight: '400px' }}
              >
                <div className="u-text-center u-text-white">
                  <h2 className="u-mt-0 u-text-3xl u-font-bold u-mb-3">
                    Live Preview
                  </h2>
                  <p className="u-text-lg u-opacity-90 u-mb-4">
                    Adjust the controls to see real-time changes
                  </p>
                  <div
                    style={{
                      fontSize: '64px',
                      margin: '24px 0',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                    }}
                    aria-hidden="true"
                  >
                    🎨
                  </div>
                  <p className="u-text-sm u-opacity-80">
                    Current settings:{' '}
                    <code style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px' }}>
                      {mode} mode
                    </code>
                  </p>
                </div>
              </AtomixGlass>
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
          'Interactive playground with live controls for displacement, blur, saturation, aberration, border radius, and rendering mode.',
      },
    },
  },
};
