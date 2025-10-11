/**
 * Examples.stories.tsx
 *
 * Real-world usage examples for the AtomixGlass component.
 * These stories demonstrate practical applications and design patterns.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgrounds, backgroundImages } from './shared-components';
import { useState, useEffect } from 'react';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Real-world examples showing how to use AtomixGlass in different design contexts and applications.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Apple-inspired UI example showcasing the liquid glass effect
 *
 * This story demonstrates how to create Apple-like interfaces using the AtomixGlass component,
 * mimicking the frosted glass effect seen in macOS and iOS with realistic design elements
 * and interactions that closely resemble Apple's design language.
 */
export const AppleInspiredUI: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState('home');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentTime, setCurrentTime] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hoverDockItem, setHoverDockItem] = useState<number | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notificationCount, setNotificationCount] = useState(3);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // Update time every minute
      const updateTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
      };

      updateTime();
      const interval = setInterval(updateTime, 60000);

      return () => clearInterval(interval);
    }, []);

    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
    };

    // Apple-style app icons with gradient backgrounds
    const appIcons = [
      { name: 'Photos', color: 'linear-gradient(135deg, #FF9500, #FF2D55)', symbol: '📷' },
      { name: 'Music', color: 'linear-gradient(135deg, #FF2D55, #AF52DE)', symbol: '🎵' },
      { name: 'Mail', color: 'linear-gradient(135deg, #5AC8FA, #007AFF)', symbol: '✉️' },
      { name: 'Maps', color: 'linear-gradient(135deg, #34C759, #5AC8FA)', symbol: '🗺️' },
      { name: 'Weather', color: 'linear-gradient(135deg, #007AFF, #5AC8FA)', symbol: '☀️' },
      { name: 'Notes', color: 'linear-gradient(135deg, #FFCC00, #FF9500)', symbol: '📝' },
    ];

    // Dock apps with more realistic icons
    const dockApps = [
      { name: 'Finder', symbol: '🔍', color: 'linear-gradient(135deg, #1E88E5, #64B5F6)' },
      { name: 'Safari', symbol: '🧭', color: 'linear-gradient(135deg, #039BE5, #81D4FA)' },
      { name: 'Messages', symbol: '💬', color: 'linear-gradient(135deg, #43A047, #81C784)' },
      { name: 'Calendar', symbol: '📅', color: 'linear-gradient(135deg, #E53935, #EF5350)' },
      { name: 'Photos', symbol: '🖼️', color: 'linear-gradient(135deg, #8E24AA, #BA68C8)' },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={'https://images.pexels.com/photos/18772443/pexels-photo-18772443.jpeg'}
        height="90vh"
        style={{ maxWidth: '90vw', padding: '10px' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '90vh',
            width: '100%',
          }}
        >
          {/* Top menu bar - macOS style */}
          <AtomixGlass
            displacementScale={70}
            blurAmount={0}
            saturation={150}
            cornerRadius={8}
            mode="shader"
            shaderVariant="premiumGlass"
            elasticity={0}
          >
            <div
              style={{
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '77vw',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#fff' }}>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ fontSize: '22px' }}>🍎</span>
                  <span>Atomix</span>
                </span>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['Finder', 'File', 'Edit', 'View', 'Window', 'Help'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab.toLowerCase())}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor:
                          activeTab === tab.toLowerCase()
                            ? 'rgba(255,255,255,0.15)'
                            : 'transparent',
                        transition: 'all 0.2s ease',
                        fontSize: '13px',
                        fontWeight: activeTab === tab.toLowerCase() ? 600 : 400,
                        color: 'inherit',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#fff' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', fontSize: '12px', gap: '4px' }}
                >
                  <span>🔋</span>
                  <span>75%</span>
                </div>
                <div style={{ fontSize: '14px' }}>📶</div>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>
                  {currentTime || '10:30 AM'}
                </span>
                <div
                  style={{
                    position: 'relative',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #64B5F6, #1976D2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  }}
                >
                  A
                  {notificationCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: '#FF3B30',
                        color: 'white',
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.8)',
                      }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </AtomixGlass>

          {/* Center widget - iOS style */}
          <AtomixGlass
            displacementScale={50}
            blurAmount={2}
            shaderVariant="premiumGlass"
            cornerRadius={24}
            mode="shader"
            elasticity={0}
          >
            <div style={{ padding: '30px' }}>
              <h2
                style={{
                  marginTop: 0,
                  fontSize: '26px',
                  fontWeight: 600,
                  marginBottom: '24px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome to Atomix OS
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginBottom: '28px',
                }}
              >
                {appIcons.map(app => (
                  <div
                    key={app.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: app.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer',
                      }}
                    >
                      {app.symbol}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500, opacity: 0.9 }}>
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>

              <AtomixGlass
                displacementScale={12}
                blurAmount={5}
                saturation={130}
                aberrationIntensity={1}
                cornerRadius={16}
                elasticity={0}
                mode="shader"
              >
                <div style={{ padding: '18px', fontSize: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
                    >
                      <span style={{ fontSize: '16px' }}>📣</span>
                      <span>Notifications</span>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: 'rgba(255,45,85,0.2)',
                        color: '#FF2D55',
                        fontWeight: 600,
                      }}
                    >
                      {notificationCount} New
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '10px 0',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                        New Atomix Glass Component
                      </div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>
                        Experience the next generation of UI effects
                      </div>
                    </div>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}
                    >
                      ✨
                    </div>
                  </div>
                </div>
              </AtomixGlass>
            </div>
          </AtomixGlass>

          {/* Bottom dock - macOS style */}
          <AtomixGlass
            displacementScale={15}
            blurAmount={2}
            saturation={140}
            aberrationIntensity={1.2}
            cornerRadius={24}
            mode="polar"
            style={{ maxWidth: '600px' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                padding: '6px',
              }}
            >
              {dockApps.map((app, index) => (
                <div
                  key={index}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: app.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform:
                      hoverDockItem === index
                        ? 'translateY(-10px) scale(1.1)'
                        : 'translateY(0) scale(1)',
                    boxShadow:
                      hoverDockItem === index
                        ? '0 10px 20px rgba(0,0,0,0.2)'
                        : '0 4px 10px rgba(0,0,0,0.1)',
                    position: 'relative',
                  }}
                  onMouseEnter={() => setHoverDockItem(index)}
                  onMouseLeave={() => setHoverDockItem(null)}
                >
                  {app.symbol}
                  {hoverDockItem === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {app.name}
                    </div>
                  )}
                </div>
              ))}

              <div
                style={{
                  width: '1px',
                  height: '30px',
                  background: 'rgba(255,255,255,0.3)',
                  margin: '0 4px',
                }}
              />

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform:
                    hoverDockItem === 999
                      ? 'translateY(-10px) scale(1.1)'
                      : 'translateY(0) scale(1)',
                  boxShadow:
                    hoverDockItem === 999
                      ? '0 10px 20px rgba(0,0,0,0.2)'
                      : '0 4px 10px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={() => setHoverDockItem(999)}
                onMouseLeave={() => setHoverDockItem(null)}
              >
                🗑️
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An enhanced Apple-inspired UI example showcasing how to create macOS and iOS-like interfaces using the AtomixGlass component. This example includes a realistic menu bar with status icons, app grid with gradient icons, notification center, and an interactive dock with hover effects - all with the signature Apple frosted glass aesthetic.',
      },
    },
  },
};

/**
 * Hero section example
 *
 * Demonstrates how to use AtomixGlass in a hero section for landing pages.
 */
export const HeroExample: Story = {
  render: () => (
    <BackgroundWrapper backgroundImage={backgroundImages[0]} height="90vh">
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <AtomixGlass
            displacementScale={45}
            blurAmount={0.08}
            saturation={170}
            aberrationIntensity={2.5}
            elasticity={0.18}
            cornerRadius={30}
            mode="standard"
            style={{ maxWidth: '800px' }}
          >
            <div style={{ padding: '40px 60px', color: 'white' }}>
              <h1 style={{ marginTop: 0, fontSize: '2.5rem' }}>Modern Glass UI</h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                Create stunning interfaces with the AtomixGlass component. Perfect for modern, sleek
                designs that stand out.
              </p>
              <div
                style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <button className="c-btn c-btn--primary">Get Started</button>
                <button className="c-btn c-btn--outline-light">Learn More</button>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A hero section example demonstrating how to use AtomixGlass for landing page headers with call-to-action buttons.',
      },
    },
  },
};

/**
 * Theme switching example
 *
 * Shows how the glass effect adapts to different themes.
 */
export const ThemeSwitching: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    return (
      <BackgroundWrapper
        backgroundImage={
          theme === 'light'
            ? backgroundImages[6] // Cozy café interior for light theme
            : backgroundImages[7] // Desert landscape for dark theme
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <AtomixGlass
            displacementScale={60}
            blurAmount={1}
            saturation={theme === 'light' ? 120 : 160}
            aberrationIntensity={2.2}
            elasticity={0.15}
            cornerRadius={20}
            overLight={theme === 'light'}
            mode="standard"
            style={{ width: '350px' }}
          >
            <div style={{ padding: '25px', textAlign: 'center' }}>
              <h2 style={{ marginTop: 0 }}>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</h2>
              <p>The glass effect adapts to different background themes.</p>
              <button
                className={`u-mt-4 c-btn c-btn--${theme === 'light' ? 'primary' : 'outline-light'}`}
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
              </button>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how AtomixGlass adapts to different theme backgrounds. The overLight prop adjusts the glass effect for better visibility on light backgrounds.',
      },
    },
  },
};

/**
 * Video Background Example
 *
 * Demonstrates the glass effect over a moving video background.
 */
export const VideoBackground: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [glassSettings, setGlassSettings] = useState({
      displacementScale: 80,
      blurAmount: 0,
      saturation: 150,
      aberrationIntensity: 0,
      cornerRadius: 24,
      mode: 'standard' as const,
    });

    const updateSettings = (property: string, value: any) => {
      setGlassSettings(prev => ({
        ...prev,
        [property]: value,
      }));
    };

    return (
      <div style={{ position: 'relative', height: '80vh', width: '90vw', overflow: 'hidden' }}>
        {/* Video Background */}
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
            zIndex: -1,
          }}
        >
          <source src={backgrounds.videoBackground} type="video/mp4" />
        </video>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '40px',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* Main Glass Card */}
          <AtomixGlass
            displacementScale={glassSettings.displacementScale}
            blurAmount={glassSettings.blurAmount}
            saturation={glassSettings.saturation}
            aberrationIntensity={glassSettings.aberrationIntensity}
            cornerRadius={glassSettings.cornerRadius}
            mode={glassSettings.mode}
            style={{ width: '400px', maxWidth: '100%' }}
          >
            <div style={{ padding: '32px', textAlign: 'center' }}>
              <h2 style={{ marginTop: 0, fontSize: '28px', fontWeight: 600, marginBottom: '16px' }}>
                Glass Over Video
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '24px', opacity: 0.9 }}>
                Experience the stunning glass morphism effect overlaid on dynamic video content. The
                glass element creates a sophisticated focal point while maintaining visual harmony
                with the moving background.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <button className="c-btn c-btn--primary">Get Started</button>
                <button className="c-btn c-btn--outline">Learn More</button>
              </div>
            </div>
          </AtomixGlass>

          {/* Side Control Panel */}
          <AtomixGlass
            displacementScale={40}
            blurAmount={0.06}
            saturation={120}
            aberrationIntensity={1.5}
            cornerRadius={16}
            mode="standard"
            style={{ width: '300px', maxWidth: '100%' }}
          >
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginTop: 0, fontSize: '18px', marginBottom: '20px' }}>
                Live Controls
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Displacement: {glassSettings.displacementScale}
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={glassSettings.displacementScale}
                  onChange={e => updateSettings('displacementScale', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Blur: {glassSettings.blurAmount}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={glassSettings.blurAmount}
                  onChange={e => updateSettings('blurAmount', parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Saturation: {glassSettings.saturation}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={glassSettings.saturation}
                  onChange={e => updateSettings('saturation', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Aberration: {glassSettings.aberrationIntensity}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={glassSettings.aberrationIntensity}
                  onChange={e => updateSettings('aberrationIntensity', parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Corner Radius: {glassSettings.cornerRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={glassSettings.cornerRadius}
                  onChange={e => updateSettings('cornerRadius', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <button
                className="c-btn c-btn--secondary"
                style={{ width: '100%' }}
                onClick={() => {
                  setGlassSettings({
                    displacementScale: 80,
                    blurAmount: 0.08,
                    saturation: 150,
                    aberrationIntensity: 2.5,
                    cornerRadius: 24,
                    mode: 'standard',
                  });
                }}
              >
                Reset Defaults
              </button>
            </div>
          </AtomixGlass>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example showcases the AtomixGlass component over a dynamic video background, demonstrating how the glass effect creates stunning visual hierarchy and focus over moving content. Use the live controls to experiment with different settings and see how they affect the glass appearance in real-time.',
      },
    },
  },
};

/**
 * Dashboard Cards Example
 *
 * Shows how to use AtomixGlass for modern dashboard UI elements with metrics and data visualization.
 */
export const DashboardCards: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const stats = [
      {
        title: 'Total Revenue',
        value: '$124,563',
        change: '+12.5%',
        trend: 'up',
        icon: '💰',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      {
        title: 'Active Users',
        value: '8,459',
        change: '+23.1%',
        trend: 'up',
        icon: '👥',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      {
        title: 'Conversion Rate',
        value: '3.24%',
        change: '-2.4%',
        trend: 'down',
        icon: '📊',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      {
        title: 'Avg. Session',
        value: '4m 32s',
        change: '+8.3%',
        trend: 'up',
        icon: '⏱️',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[2]}
        height="90vh"
        style={{ padding: '40px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <AtomixGlass
            displacementScale={30}
            blurAmount={0.05}
            saturation={140}
            cornerRadius={20}
            mode="standard"
            style={{ marginBottom: '32px', padding: '24px' }}
          >
            <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700 }}>Analytics Dashboard</h1>
            <p style={{ margin: '8px 0 0 0', opacity: 0.8, fontSize: '16px' }}>
              Real-time performance metrics and insights
            </p>
          </AtomixGlass>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  transform: selectedCard === index ? 'translateY(-8px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setSelectedCard(index)}
                onMouseLeave={() => setSelectedCard(null)}
              >
                <AtomixGlass
                  displacementScale={selectedCard === index ? 50 : 35}
                  blurAmount={0.06}
                  saturation={selectedCard === index ? 160 : 130}
                  aberrationIntensity={selectedCard === index ? 2 : 1}
                  cornerRadius={16}
                  mode="standard"
                >
                  <div style={{ padding: '24px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: stat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                        }}
                      >
                        {stat.icon}
                      </div>
                      <div
                        style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background:
                            stat.trend === 'up'
                              ? 'rgba(16, 185, 129, 0.2)'
                              : 'rgba(239, 68, 68, 0.2)',
                          color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        {stat.change}
                      </div>
                    </div>

                    <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>
                      {stat.title}
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 700 }}>{stat.value}</div>
                  </div>
                </AtomixGlass>
              </div>
            ))}
          </div>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A modern dashboard example showcasing how to use AtomixGlass for data visualization cards. Features interactive hover states, gradient icons, and real-time metrics with trend indicators.',
      },
    },
  },
};

/**
 * E-Commerce Product Card
 *
 * Demonstrates using AtomixGlass for product cards in an e-commerce context.
 */
export const ProductCard: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [quantity, setQuantity] = useState(1);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedSize, setSelectedSize] = useState('M');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [addedToCart, setAddedToCart] = useState(false);

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    const handleAddToCart = () => {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[5]}
        height="90vh"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={1.8}
          cornerRadius={24}
          mode="standard"
          style={{ width: '420px', maxWidth: '90vw' }}
        >
          <div style={{ padding: '32px' }}>
            {/* Product Image */}
            <div
              style={{
                width: '100%',
                height: '280px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              👕
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(239, 68, 68, 0.9)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                -30% OFF
              </div>
            </div>

            {/* Product Info */}
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>
              Premium Cotton T-Shirt
            </h2>
            <p style={{ margin: '0 0 16px 0', opacity: 0.7, fontSize: '14px' }}>
              Ultra-soft fabric with a modern fit. Perfect for everyday wear.
            </p>

            {/* Price */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
            >
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>$49.99</span>
              <span
                style={{
                  fontSize: '20px',
                  textDecoration: 'line-through',
                  opacity: 0.5,
                }}
              >
                $71.99
              </span>
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                Select Size
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border:
                        selectedSize === size
                          ? '2px solid #667eea'
                          : '1px solid rgba(255,255,255,0.2)',
                      background:
                        selectedSize === size
                          ? 'rgba(102, 126, 234, 0.2)'
                          : 'rgba(255,255,255,0.05)',
                      color: 'inherit',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: selectedSize === size ? 600 : 400,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 600,
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    minWidth: '30px',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 600,
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="c-btn c-btn--primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 600,
                background: addedToCart
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : undefined,
              }}
            >
              {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An e-commerce product card example showcasing how to use AtomixGlass for shopping interfaces. Features size selection, quantity controls, dynamic pricing, and interactive cart functionality.',
      },
    },
  },
};

/**
 * Notification Center
 *
 * Demonstrates a notification panel with AtomixGlass for modern app interfaces.
 */
export const NotificationCenter: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        type: 'success',
        icon: '✅',
        title: 'Deployment Successful',
        message: 'Your application has been deployed to production.',
        time: '2 min ago',
        read: false,
      },
      {
        id: 2,
        type: 'warning',
        icon: '⚠️',
        title: 'High CPU Usage',
        message: 'Server load has exceeded 85% for the past 10 minutes.',
        time: '15 min ago',
        read: false,
      },
      {
        id: 3,
        type: 'info',
        icon: '💬',
        title: 'New Message',
        message: 'You have 3 new messages from the team.',
        time: '1 hour ago',
        read: true,
      },
      {
        id: 4,
        type: 'update',
        icon: '🔄',
        title: 'System Update Available',
        message: 'Version 2.4.0 is ready to install.',
        time: '3 hours ago',
        read: true,
      },
    ]);

    const markAsRead = (id: number) => {
      setNotifications(prev =>
        prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
      );
    };

    const clearAll = () => {
      setNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[0]}
        height="90vh"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={40}
          blurAmount={0.06}
          saturation={140}
          aberrationIntensity={1.5}
          cornerRadius={20}
          mode="standard"
          style={{ width: '450px', maxWidth: '90vw', maxHeight: '80vh', overflow: 'hidden' }}
        >
          <div>
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>Notifications</h2>
                {unreadCount > 0 && (
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '4px 8px',
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div
                  style={{
                    padding: '60px 24px',
                    textAlign: 'center',
                    opacity: 0.6,
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
                  <div style={{ fontSize: '16px' }}>No notifications</div>
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      background: notification.read ? 'transparent' : 'rgba(102, 126, 234, 0.1)',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = notification.read
                        ? 'transparent'
                        : 'rgba(102, 126, 234, 0.1)';
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ fontSize: '24px', flexShrink: 0 }}>{notification.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '4px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '15px',
                              fontWeight: notification.read ? 500 : 700,
                            }}
                          >
                            {notification.title}
                          </span>
                          {!notification.read && (
                            <div
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#3b82f6',
                                flexShrink: 0,
                                marginTop: '4px',
                              }}
                            />
                          )}
                        </div>
                        <p
                          style={{
                            margin: '0 0 6px 0',
                            fontSize: '13px',
                            opacity: 0.7,
                            lineHeight: 1.4,
                          }}
                        >
                          {notification.message}
                        </p>
                        <span style={{ fontSize: '12px', opacity: 0.5 }}>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A notification center example showing how to build modern notification panels with AtomixGlass. Features read/unread states, different notification types, and interactive clearing functionality.',
      },
    },
  },
};

/**
 * Login Form
 *
 * Demonstrates a modern authentication form using AtomixGlass.
 */
export const LoginForm: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rememberMe, setRememberMe] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[3]}
        height="100vh"
        overlayOpacity={0.3}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={50}
          blurAmount={0.1}
          saturation={130}
          aberrationIntensity={2}
          cornerRadius={24}
          mode="standard"
          style={{ width: '440px', maxWidth: '90vw' }}
        >
          <div style={{ padding: '40px' }}>
            {/* Logo/Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 16px',
                }}
              >
                🔐
              </div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700 }}>
                Welcome Back
              </h2>
              <p style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
                Sign in to continue to your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    style={{ accentColor: '#667eea' }}
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: '14px',
                    color: '#667eea',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="c-btn c-btn--primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: 600,
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Social Login */}
            <div style={{ marginTop: '24px' }}>
              <div
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    padding: '0 16px',
                    background: 'inherit',
                    fontSize: '13px',
                    opacity: 0.6,
                  }}
                >
                  Or continue with
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span>🔵</span> Google
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span>⚫</span> GitHub
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
              Don't have an account?{' '}
              <a
                href="#"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Sign up
              </a>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A modern login form example showcasing authentication UI with AtomixGlass. Features email/password inputs, remember me functionality, forgot password link, social login options, and loading states.',
      },
    },
  },
};

/**
 * Music Player
 *
 * Demonstrates a media player interface using AtomixGlass for a premium look.
 */
export const MusicPlayer: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isPlaying, setIsPlaying] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentTime, setCurrentTime] = useState(125);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [volume, setVolume] = useState(70);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isShuffle, setIsShuffle] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

    const totalDuration = 248;

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[4]}
        height="90vh"
        overlayOpacity={0.4}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={55}
          blurAmount={0.1}
          saturation={150}
          aberrationIntensity={2.2}
          cornerRadius={28}
          mode="standard"
          style={{ width: '480px', maxWidth: '90vw' }}
        >
          <div style={{ padding: '32px' }}>
            {/* Album Art */}
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '120px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              🎵
            </div>

            {/* Track Info */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>
                Summer Vibes
              </h2>
              <p style={{ margin: 0, opacity: 0.7, fontSize: '16px' }}>The Atomix Band</p>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  height: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = x / rect.width;
                  setCurrentTime(Math.floor(totalDuration * percentage));
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(currentTime / totalDuration) * 100}%`,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    transition: 'width 0.1s ease',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  fontSize: '13px',
                  opacity: 0.6,
                }}
              >
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '24px',
              }}
            >
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isShuffle ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                🔀
              </button>

              <button
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ⏮️
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                }}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>

              <button
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ⏭️
              </button>

              <button
                onClick={() => {
                  const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
                  const currentIndex = modes.indexOf(repeatMode);
                  setRepeatMode(modes[(currentIndex + 1) % modes.length]);
                }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background:
                    repeatMode !== 'off' ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {repeatMode === 'one' ? '🔂' : '🔁'}
              </button>
            </div>

            {/* Volume Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px', opacity: 0.7 }}>
                {volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={e => setVolume(parseInt(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: '#667eea',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '14px', opacity: 0.6, minWidth: '35px' }}>{volume}%</span>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A premium music player interface showcasing how to use AtomixGlass for media applications. Features play/pause controls, progress tracking, shuffle, repeat modes, and volume control with an elegant design.',
      },
    },
  },
};

/**
 * Pricing Table Example
 *
 * This story demonstrates a modern pricing table using AtomixGlass components,
 * perfect for SaaS applications, subscription services, or product tiers.
 */
export const PricingTable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
      {
        name: 'Starter',
        description: 'Perfect for individuals getting started',
        price: { monthly: 9, yearly: 90 },
        features: ['5 Projects', '10GB Storage', 'Basic Support', 'API Access', 'Monthly Reports'],
        popular: false,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      {
        name: 'Professional',
        description: 'For growing teams and businesses',
        price: { monthly: 29, yearly: 290 },
        features: [
          'Unlimited Projects',
          '100GB Storage',
          'Priority Support',
          'Advanced API Access',
          'Real-time Analytics',
          'Custom Integrations',
          'Team Collaboration',
        ],
        popular: true,
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      {
        name: 'Enterprise',
        description: 'For large organizations with custom needs',
        price: { monthly: 99, yearly: 990 },
        features: [
          'Unlimited Everything',
          '1TB Storage',
          'Dedicated Support',
          'Enterprise API',
          'Advanced Security',
          'Custom Solutions',
          'SLA Guarantee',
          'White-label Options',
        ],
        popular: false,
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    ];

    const savings = Math.round(
      ((plans[1].price.monthly * 12 - plans[1].price.yearly) / (plans[1].price.monthly * 12)) * 100
    );

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[3]}
        height="90vh"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 16px 0' }}>
              Choose Your Plan
            </h1>
            <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '32px' }}>
              Start free, then scale as you grow
            </p>

            {/* Billing Toggle */}
            <AtomixGlass
              blurAmount={0.08}
              saturation={120}
              cornerRadius={50}
              mode="standard"
              style={{ display: 'inline-flex', padding: '6px' }}
            >
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '12px 28px',
                  borderRadius: '50px',
                  border: 'none',
                  background:
                    billingCycle === 'monthly' ? 'rgba(102, 126, 234, 0.5)' : 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: billingCycle === 'monthly' ? 600 : 400,
                  transition: 'all 0.3s ease',
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                style={{
                  padding: '12px 28px',
                  borderRadius: '50px',
                  border: 'none',
                  background:
                    billingCycle === 'yearly' ? 'rgba(102, 126, 234, 0.5)' : 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: billingCycle === 'yearly' ? 600 : 400,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
              >
                Yearly
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#10b981',
                    color: 'white',
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontWeight: 700,
                  }}
                >
                  Save {savings}%
                </span>
              </button>
            </AtomixGlass>
          </div>

          {/* Pricing Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {plans.map((plan, index) => (
              <AtomixGlass
                key={index}
                displacementScale={plan.popular ? 50 : 40}
                blurAmount={0.08}
                saturation={plan.popular ? 150 : 130}
                aberrationIntensity={plan.popular ? 2 : 1.5}
                cornerRadius={24}
                mode="standard"
                style={{
                  position: 'relative',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      padding: '6px 20px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div style={{ padding: '32px' }}>
                  {/* Plan Header */}
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      background: plan.color,
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                    }}
                  >
                    {index === 0 ? '🚀' : index === 1 ? '⭐' : '👑'}
                  </div>

                  <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '24px' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '48px', fontWeight: 800 }}>
                        ${plan.price[billingCycle]}
                      </span>
                      <span style={{ fontSize: '16px', opacity: 0.6 }}>
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p style={{ fontSize: '14px', opacity: 0.7, margin: '8px 0 0 0' }}>
                        ${(plan.price.yearly / 12).toFixed(2)} per month
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: plan.popular
                        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                        : 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginBottom: '28px',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    Get Started
                  </button>

                  {/* Features List */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <p
                      style={{
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        marginBottom: '16px',
                        opacity: 0.7,
                      }}
                    >
                      What's Included
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '12px',
                            fontSize: '14px',
                          }}
                        >
                          <span
                            style={{
                              color: '#10b981',
                              fontSize: '18px',
                              fontWeight: 700,
                            }}
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AtomixGlass>
            ))}
          </div>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive pricing table example demonstrating how to showcase product tiers and subscription plans. Features billing cycle toggle, feature comparisons, and highlighted popular plans.',
      },
    },
  },
};

/**
 * Chat Interface Example
 *
 * This story demonstrates a modern chat interface with message bubbles,
 * typing indicators, and a message input area.
 */
export const ChatInterface: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [messages, setMessages] = useState([
      { id: 1, text: 'Hey! How are you?', sender: 'other', time: '10:30 AM', avatar: '👤' },
      {
        id: 2,
        text: "I'm doing great! Just finished the new design.",
        sender: 'me',
        time: '10:32 AM',
        avatar: '😊',
      },
      {
        id: 3,
        text: 'That sounds awesome! Can you share it?',
        sender: 'other',
        time: '10:33 AM',
        avatar: '👤',
      },
      {
        id: 4,
        text: "Sure! I'll send it over in a few minutes.",
        sender: 'me',
        time: '10:35 AM',
        avatar: '😊',
      },
    ]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputText, setInputText] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isTyping, setIsTyping] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [onlineStatus, setOnlineStatus] = useState(true);

    const handleSend = () => {
      if (inputText.trim()) {
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            text: inputText,
            sender: 'me',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            avatar: '😊',
          },
        ]);
        setInputText('');

        // Simulate other person typing
        setTimeout(() => setIsTyping(true), 1000);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            {
              id: prev.length + 1,
              text: 'Got it! Thanks for letting me know.',
              sender: 'other',
              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              avatar: '👤',
            },
          ]);
        }, 3000);
      }
    };

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[2]}
        height="90vh"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={1.8}
          cornerRadius={24}
          mode="standard"
          style={{
            width: '450px',
            maxWidth: '90vw',
            height: '650px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                👤
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: onlineStatus ? '#10b981' : '#6b7280',
                  border: '2px solid rgba(0,0,0,0.2)',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Alex Johnson</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                {onlineStatus ? 'Active now' : 'Offline'}
              </p>
            </div>
            <button
              onClick={() => setOnlineStatus(!onlineStatus)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '18px',
              }}
            >
              ⋮
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: '24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {messages.map(message => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                  gap: '12px',
                  animation: 'slideIn 0.3s ease',
                }}
              >
                {message.sender === 'other' && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      flexShrink: 0,
                    }}
                  >
                    {message.avatar}
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: message.sender === 'me' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius:
                        message.sender === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background:
                        message.sender === 'me'
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>{message.text}</p>
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      opacity: 0.6,
                      marginTop: '4px',
                      padding: '0 4px',
                    }}
                  >
                    {message.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}
                >
                  👤
                </div>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'currentColor',
                          opacity: 0.6,
                          animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              gap: '12px',
            }}
          >
            <button
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              📎
            </button>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '22px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: 'inherit',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: inputText.trim()
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255,255,255,0.1)',
                color: 'white',
                cursor: inputText.trim() ? 'pointer' : 'default',
                fontSize: '20px',
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}
            >
              ➤
            </button>
          </div>
        </AtomixGlass>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 60%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            30% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        `}</style>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A modern chat interface showcasing message bubbles, typing indicators, online status, and real-time messaging. Perfect for messaging apps, customer support chat, or team collaboration tools.',
      },
    },
  },
};

/**
 * Profile Card Example
 *
 * This story demonstrates a user profile card with stats, actions, and social links,
 * perfect for social platforms, professional networks, or team directories.
 */
export const ProfileCard: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isFollowing, setIsFollowing] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showShareMenu, setShowShareMenu] = useState(false);

    const stats = [
      { label: 'Followers', value: '12.5K' },
      { label: 'Following', value: '842' },
      { label: 'Posts', value: '1,234' },
    ];

    const socialLinks = [
      { icon: '🐦', name: 'Twitter', color: '#1DA1F2' },
      { icon: '💼', name: 'LinkedIn', color: '#0077B5' },
      { icon: '🌐', name: 'Website', color: '#667eea' },
      { icon: '📧', name: 'Email', color: '#EA4335' },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[4]}
        height="90vh"
        width="90vw"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={1.8}
          cornerRadius={24}
          mode="standard"
          style={{ width: '420px', maxWidth: '90vw', position: 'relative' }}
        >
          {/* Cover Image */}
          <div
            style={{
              height: '140px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '24px 24px 0 0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)',
              }}
            />
          </div>

          <div style={{ padding: '0 32px 32px' }}>
            {/* Profile Picture */}
            <div
              style={{
                marginTop: '-50px',
                marginBottom: '20px',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  border: '4px solid rgba(0,0,0,0.2)',
                  position: 'relative',
                }}
              >
                👨‍💻
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#10b981',
                  border: '3px solid rgba(0,0,0,0.2)',
                }}
              />
            </div>

            {/* Name & Title */}
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 700 }}>
                Jordan Smith
              </h2>
              <p style={{ margin: '0 0 8px 0', fontSize: '16px', opacity: 0.8 }}>
                Senior Product Designer
              </p>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                🌍 San Francisco, CA • 🕐 PST
              </p>
            </div>

            {/* Bio */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                opacity: 0.9,
                marginBottom: '24px',
              }}
            >
              Passionate about creating beautiful, intuitive user experiences. Coffee enthusiast ☕
              and design systems advocate. Always learning, always growing.
            </p>

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '28px',
                padding: '20px 0',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {stats.map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isFollowing
                    ? 'rgba(255,255,255,0.15)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {isFollowing ? '✓ Following' : '+ Follow'}
              </button>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '16px',
                  cursor: 'pointer',
                  minWidth: '50px',
                }}
              >
                📤
              </button>
            </div>

            {/* Social Links */}
            <div>
              <p
                style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  marginBottom: '12px',
                  opacity: 0.7,
                }}
              >
                Connect
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {socialLinks.map((link, index) => (
                  <button
                    key={index}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'inherit',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${link.color}20`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{link.icon}</span>
                    <span>{link.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Share Menu */}
          {showShareMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: '32px',
                marginTop: '8px',
                zIndex: 10,
              }}
            >
              <AtomixGlass
                blurAmount={0.08}
                saturation={130}
                cornerRadius={16}
                mode="standard"
                style={{ padding: '12px', minWidth: '180px' }}
              >
                {['Copy Link', 'Share via Email', 'Download vCard'].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setShowShareMenu(false)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: 'none',
                      background: 'transparent',
                      color: 'inherit',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      borderRadius: '8px',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {option}
                  </button>
                ))}
              </AtomixGlass>
            </div>
          )}
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive user profile card showcasing stats, social links, follow actions, and share functionality. Perfect for social platforms, team directories, or professional networks.',
      },
    },
  },
};

/**
 * Settings Panel Example
 *
 * This story demonstrates a modern settings interface with toggles, dropdowns,
 * and form controls, perfect for app settings or user preferences.
 */
export const SettingsPanel: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notifications, setNotifications] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [darkMode, setDarkMode] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [autoSave, setAutoSave] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [language, setLanguage] = useState('en');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [emailFrequency, setEmailFrequency] = useState('daily');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);

    const handleSave = () => {
      setShowSaveConfirm(true);
      setTimeout(() => setShowSaveConfirm(false), 2000);
    };

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[1]}
        height="90vh"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={1.8}
          cornerRadius={24}
          mode="standard"
          style={{ width: '550px', maxWidth: '90vw' }}
        >
          <div style={{ padding: '32px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: 700 }}>Settings</h2>
              <p style={{ margin: 0, fontSize: '15px', opacity: 0.7 }}>
                Manage your account preferences and settings
              </p>
            </div>

            {/* General Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3
                style={{
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  marginBottom: '16px',
                  opacity: 0.7,
                }}
              >
                General
              </h3>

              {/* Language Select */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    Language
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>
                    Choose your preferred language
                  </div>
                </div>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="en" style={{ background: '#1a1a1a', color: 'white' }}>
                    English
                  </option>
                  <option value="es" style={{ background: '#1a1a1a', color: 'white' }}>
                    Español
                  </option>
                  <option value="fr" style={{ background: '#1a1a1a', color: 'white' }}>
                    Français
                  </option>
                  <option value="de" style={{ background: '#1a1a1a', color: 'white' }}>
                    Deutsch
                  </option>
                </select>
              </div>

              {/* Dark Mode Toggle */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    🌙 Dark Mode
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>
                    Enable dark theme across the app
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    width: '56px',
                    height: '32px',
                    borderRadius: '16px',
                    border: 'none',
                    background: darkMode ? '#667eea' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '4px',
                      left: darkMode ? '28px' : '4px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>

              {/* Auto Save Toggle */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    💾 Auto-Save
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>Automatically save your work</div>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  style={{
                    width: '56px',
                    height: '32px',
                    borderRadius: '16px',
                    border: 'none',
                    background: autoSave ? '#667eea' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '4px',
                      left: autoSave ? '28px' : '4px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3
                style={{
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  marginBottom: '16px',
                  opacity: 0.7,
                }}
              >
                Notifications
              </h3>

              {/* Enable Notifications */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    🔔 Push Notifications
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>Receive push notifications</div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  style={{
                    width: '56px',
                    height: '32px',
                    borderRadius: '16px',
                    border: 'none',
                    background: notifications ? '#667eea' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '4px',
                      left: notifications ? '28px' : '4px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>

              {/* Email Frequency */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    📧 Email Frequency
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>How often to receive emails</div>
                </div>
                <select
                  value={emailFrequency}
                  onChange={e => setEmailFrequency(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="realtime" style={{ background: '#1a1a1a', color: 'white' }}>
                    Real-time
                  </option>
                  <option value="daily" style={{ background: '#1a1a1a', color: 'white' }}>
                    Daily
                  </option>
                  <option value="weekly" style={{ background: '#1a1a1a', color: 'white' }}>
                    Weekly
                  </option>
                  <option value="never" style={{ background: '#1a1a1a', color: 'white' }}>
                    Never
                  </option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {showSaveConfirm ? '✓ Saved!' : 'Save Changes'}
              </button>
              <button
                style={{
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive settings panel showcasing toggles, dropdowns, and form controls. Perfect for app settings, user preferences, or configuration interfaces.',
      },
    },
  },
};

/**
 * Event Card Example
 *
 * This story demonstrates an event card with date, time, location,
 * and RSVP functionality, perfect for event platforms or calendars.
 */
export const EventCard: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | 'not' | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [interestedCount, setInterestedCount] = useState(247);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showShareOptions, setShowShareOptions] = useState(false);

    const handleRSVP = (status: 'going' | 'maybe' | 'not') => {
      if (rsvpStatus === status) {
        setRsvpStatus(null);
        if (status === 'going') setInterestedCount(prev => prev - 1);
      } else {
        if (status === 'going' && rsvpStatus !== 'going') {
          setInterestedCount(prev => prev + 1);
        } else if (rsvpStatus === 'going') {
          setInterestedCount(prev => prev - 1);
        }
        setRsvpStatus(status);
      }
    };

    const attendees = [
      { name: 'Sarah M.', avatar: '👩' },
      { name: 'John D.', avatar: '👨' },
      { name: 'Emily R.', avatar: '👱‍♀️' },
      { name: 'Mike T.', avatar: '👨‍🦰' },
      { name: 'Lisa K.', avatar: '👩‍🦱' },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[0]}
        height="90vh"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={1.8}
          cornerRadius={24}
          mode="standard"
          style={{ width: '480px', maxWidth: '90vw' }}
        >
          {/* Event Image */}
          <div
            style={{
              height: '220px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '24px 24px 0 0',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: '80px' }}>🎉</div>
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                padding: '8px 16px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: '18px' }}>🔥</span>
              Trending
            </div>
          </div>

          <div style={{ padding: '28px' }}>
            {/* Date Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(102, 126, 234, 0.2)',
                padding: '8px 16px',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: '18px' }}>📅</span>
              Saturday, Dec 16, 2024 • 7:00 PM
            </div>

            {/* Event Title */}
            <h2 style={{ margin: '0 0 12px 0', fontSize: '28px', fontWeight: 700 }}>
              Design Systems Meetup
            </h2>

            {/* Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontSize: '15px',
                opacity: 0.9,
              }}
            >
              <span style={{ fontSize: '18px' }}>📍</span>
              <span>Innovation Hub, 123 Tech Street, SF</span>
            </div>

            {/* Host */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
                fontSize: '15px',
                opacity: 0.9,
              }}
            >
              <span style={{ fontSize: '18px' }}>👤</span>
              <span>Hosted by Design Community SF</span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                opacity: 0.9,
                marginBottom: '24px',
              }}
            >
              Join us for an evening of talks, workshops, and networking with fellow designers and
              developers. Learn about the latest trends in design systems and component libraries.
            </p>

            {/* Attendees */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 600, opacity: 0.8 }}>
                  {interestedCount} people interested
                </span>
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Share
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '-8px' }}>
                {attendees.map((attendee, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      border: '2px solid rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      marginLeft: idx > 0 ? '-8px' : '0',
                      position: 'relative',
                      zIndex: attendees.length - idx,
                    }}
                    title={attendee.name}
                  >
                    {attendee.avatar}
                  </div>
                ))}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    border: '2px solid rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginLeft: '-8px',
                  }}
                >
                  +{interestedCount - attendees.length}
                </div>
              </div>
            </div>

            {/* RSVP Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button
                onClick={() => handleRSVP('going')}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: rsvpStatus === 'going' ? '2px solid #667eea' : 'none',
                  background:
                    rsvpStatus === 'going'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '18px' }}>✓</span>
                Going
              </button>
              <button
                onClick={() => handleRSVP('maybe')}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: rsvpStatus === 'maybe' ? '2px solid #f59e0b' : 'none',
                  background:
                    rsvpStatus === 'maybe' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '18px' }}>🤔</span>
                Maybe
              </button>
              <button
                onClick={() => handleRSVP('not')}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: rsvpStatus === 'not' ? '2px solid #ef4444' : 'none',
                  background:
                    rsvpStatus === 'not' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '18px' }}>✗</span>
                Can't Go
              </button>
            </div>

            {/* Additional Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                📅 Add to Calendar
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                🔗 Get Directions
              </button>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive event card showcasing date, location, RSVP functionality, and attendee information. Perfect for event platforms, calendars, or community applications.',
      },
    },
  },
};

/**
 * Social Media Post Example
 *
 * This story demonstrates a social media post card with likes, comments,
 * and sharing functionality, perfect for social platforms or feeds.
 */
export const SocialMediaPost: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [liked, setLiked] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [saved, setSaved] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [likes, setLikes] = useState(1247);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showComments, setShowComments] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [commentText, setCommentText] = useState('');

    const handleLike = () => {
      setLiked(!liked);
      setLikes(prev => (liked ? prev - 1 : prev + 1));
    };

    const comments = [
      {
        user: 'Alex Chen',
        avatar: '👨‍💼',
        text: 'This looks amazing! Great work on the design.',
        time: '2h ago',
      },
      {
        user: 'Sarah Williams',
        avatar: '👩‍🎨',
        text: 'Love the color palette and the attention to detail! 🎨',
        time: '4h ago',
      },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={backgroundImages[3]}
        height="90vh"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={1.8}
          cornerRadius={24}
          mode="standard"
          style={{ width: '500px', maxWidth: '90vw' }}
        >
          {/* Post Header */}
          <div
            style={{
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              👨‍🎨
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: 700 }}>
                Michael Rivera
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                Product Designer • 6 hours ago
              </p>
            </div>
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '18px',
              }}
            >
              ⋮
            </button>
          </div>

          {/* Post Content */}
          <div style={{ padding: '20px 24px' }}>
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}
            >
              Just wrapped up this new landing page design for a fintech startup! 🚀 Really proud of
              how the glassmorphism effects turned out. What do you all think?
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['#design', '#ui', '#glassmorphism', '#webdesign'].map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    background: 'rgba(102, 126, 234, 0.2)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#667eea',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Post Image */}
          <div
            style={{
              height: '280px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '80px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            🎨
          </div>

          {/* Engagement Stats */}
          <div
            style={{
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '14px',
              opacity: 0.8,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span>{likes.toLocaleString()} likes</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>{comments.length + 12} comments</span>
              <span>34 shares</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              padding: '12px 24px',
              display: 'flex',
              gap: '8px',
              borderBottom: showComments ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <button
              onClick={handleLike}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: liked ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)',
                color: liked ? '#ef4444' : 'inherit',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '18px' }}>{liked ? '❤️' : '🤍'}</span>
              Like
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: showComments ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.1)',
                color: showComments ? '#667eea' : 'inherit',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '18px' }}>💬</span>
              Comment
            </button>
            <button
              onClick={() => setSaved(!saved)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: saved ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.1)',
                color: saved ? '#667eea' : 'inherit',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '18px' }}>{saved ? '🔖' : '📑'}</span>
              {saved ? 'Saved' : 'Save'}
            </button>
            <button
              style={{
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'inherit',
                fontSize: '18px',
                cursor: 'pointer',
                minWidth: '46px',
              }}
            >
              📤
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div style={{ padding: '20px 24px' }}>
              {/* Existing Comments */}
              <div style={{ marginBottom: '20px' }}>
                {comments.map((comment, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0,
                      }}
                    >
                      {comment.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          padding: '12px 16px',
                          borderRadius: '12px 12px 12px 4px',
                        }}
                      >
                        <h4
                          style={{
                            margin: '0 0 4px 0',
                            fontSize: '14px',
                            fontWeight: 700,
                          }}
                        >
                          {comment.user}
                        </h4>
                        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                          {comment.text}
                        </p>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '16px',
                          marginTop: '6px',
                          paddingLeft: '16px',
                        }}
                      >
                        <button
                          style={{
                            border: 'none',
                            background: 'none',
                            color: 'inherit',
                            fontSize: '13px',
                            opacity: 0.7,
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          Like
                        </button>
                        <button
                          style={{
                            border: 'none',
                            background: 'none',
                            color: 'inherit',
                            fontSize: '13px',
                            opacity: 0.7,
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          Reply
                        </button>
                        <span style={{ fontSize: '13px', opacity: 0.6 }}>{comment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}
                >
                  😊
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {commentText && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                      <button
                        onClick={() => setCommentText('')}
                        style={{
                          padding: '8px 20px',
                          borderRadius: '16px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive social media post card showcasing likes, comments, shares, and interactive engagement features. Perfect for social platforms, feeds, or community applications.',
      },
    },
  },
};

/**
 * Weather Widget - A beautiful weather display with current conditions and forecast
 */
export const WeatherWidget: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedDay, setSelectedDay] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [unit, setUnit] = useState<'C' | 'F'>('C');

    const currentWeather = {
      temp: unit === 'C' ? 24 : 75,
      condition: 'Partly Cloudy',
      location: 'San Francisco, CA',
      humidity: 65,
      windSpeed: 12,
      precipitation: 20,
      feelsLike: unit === 'C' ? 22 : 72,
    };

    const forecast = [
      {
        day: 'Mon',
        high: unit === 'C' ? 26 : 79,
        low: unit === 'C' ? 18 : 64,
        icon: '⛅',
        condition: 'Partly Cloudy',
      },
      {
        day: 'Tue',
        high: unit === 'C' ? 28 : 82,
        low: unit === 'C' ? 20 : 68,
        icon: '☀️',
        condition: 'Sunny',
      },
      {
        day: 'Wed',
        high: unit === 'C' ? 25 : 77,
        low: unit === 'C' ? 19 : 66,
        icon: '🌧️',
        condition: 'Rainy',
      },
      {
        day: 'Thu',
        high: unit === 'C' ? 23 : 73,
        low: unit === 'C' ? 17 : 63,
        icon: '⛈️',
        condition: 'Thunderstorm',
      },
      {
        day: 'Fri',
        high: unit === 'C' ? 27 : 81,
        low: unit === 'C' ? 21 : 70,
        icon: '☀️',
        condition: 'Sunny',
      },
    ];

    return (
      <BackgroundWrapper backgroundImage={'https://images.unsplash.com/photo-1671521739306-65c98fe91cf8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071'}>
        <AtomixGlass
          displacementScale={60}
          blurAmount={1.1}
          saturation={190}
          cornerRadius={32}
          mode="standard"
          elasticity={0}
        >
          <div style={{ padding: '20px', minWidth: '380px', maxWidth: '500px' }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                  Weather
                </h2>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                  📍 {currentWeather.location}
                </p>
              </div>
              <button
                onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                °{unit}
              </button>
            </div>

            {/* Current Weather */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '50px', marginBottom: '10px' }}>⛅</div>
              <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: '8px' }}>
                {currentWeather.temp}°{unit}
              </div>
              <div style={{ fontSize: '18px', opacity: 0.8, marginBottom: '8px' }}>
                {currentWeather.condition}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.6 }}>
                Feels like {currentWeather.feelsLike}°
              </div>
            </div>

            {/* Weather Details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '24px',
                padding: '10px',
                borderRadius: '20px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>💧</div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                  {currentWeather.humidity}%
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>Humidity</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>💨</div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                  {currentWeather.windSpeed} km/h
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>Wind</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>🌧️</div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                  {currentWeather.precipitation}%
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>Rain</div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', opacity: 0.8 }}>
                5-Day Forecast
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {forecast.map((day, index) => (
                  <div
                    key={day.day}
                    onClick={() => setSelectedDay(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      borderRadius: '16px',
                      background:
                        selectedDay === index ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${selectedDay === index ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600, width: '50px' }}>
                      {day.day}
                    </div>
                    <div style={{ fontSize: '20px' }}>{day.icon}</div>
                    <div style={{ fontSize: '13px', opacity: 0.7, flex: 1, textAlign: 'center' }}>
                      {day.condition}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                      <span style={{ fontWeight: 600 }}>{day.high}°</span>
                      <span style={{ opacity: 0.5 }}>{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive weather widget displaying current conditions, detailed metrics, and a 5-day forecast. Perfect for dashboard applications, weather apps, or home screen widgets.',
      },
    },
  },
};

/**
 * File Upload Component - Drag and drop file uploader with progress
 */
export const FileUploadComponent: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [files, setFiles] = useState<
      Array<{
        name: string;
        size: number;
        progress: number;
        status: 'uploading' | 'complete' | 'error';
      }>
    >([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDragging, setIsDragging] = useState(false);

    const handleFileAdd = (fileName: string) => {
      const newFile = {
        name: fileName,
        size: Math.floor(Math.random() * 10000000) + 100000,
        progress: 0,
        status: 'uploading' as const,
      };
      setFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles(prev =>
          prev.map(f => {
            if (f.name === fileName && f.progress < 100) {
              const newProgress = Math.min(f.progress + Math.random() * 30, 100);
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? 'complete' : 'uploading',
              };
            }
            return f;
          })
        );
      }, 500);

      setTimeout(() => clearInterval(interval), 4000);
    };

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
      <BackgroundWrapper backgroundImage={backgroundImages[5]}>
        <AtomixGlass
          displacementScale={30}
          blurAmount={20}
          saturation={1.2}
          cornerRadius={28}
          mode="standard"
        >
          <div style={{ padding: '40px', minWidth: '500px', maxWidth: '600px' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700 }}>Upload Files</h2>
            <p style={{ margin: '0 0 32px 0', fontSize: '14px', opacity: 0.7 }}>
              Drag and drop files or click to browse
            </p>

            {/* Drop Zone */}
            <div
              onDragOver={e => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => {
                e.preventDefault();
                setIsDragging(false);
                handleFileAdd(`document-${files.length + 1}.pdf`);
              }}
              onClick={() => handleFileAdd(`image-${files.length + 1}.jpg`)}
              style={{
                border: `2px dashed ${isDragging ? 'rgba(100,200,255,0.8)' : 'rgba(255,255,255,0.3)'}`,
                borderRadius: '20px',
                padding: '60px 40px',
                textAlign: 'center',
                marginBottom: '32px',
                background: isDragging ? 'rgba(100,200,255,0.1)' : 'rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>📁</div>
              <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                {isDragging ? 'Drop files here' : 'Choose files or drag here'}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.6 }}>
                Supports: JPG, PNG, PDF, DOC (Max 50MB)
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
                    Uploading {files.filter(f => f.status !== 'complete').length} of {files.length}
                  </h3>
                  <button
                    onClick={() => setFiles([])}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'inherit',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Clear All
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        <div style={{ fontSize: '32px' }}>
                          {file.name.endsWith('.pdf')
                            ? '📄'
                            : file.name.endsWith('.jpg')
                              ? '🖼️'
                              : '📎'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                            {file.name}
                          </div>
                          <div style={{ fontSize: '12px', opacity: 0.6 }}>
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                        <div>
                          {file.status === 'complete' && <div style={{ fontSize: '24px' }}>✅</div>}
                          {file.status === 'uploading' && (
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#64c8ff' }}>
                              {Math.round(file.progress)}%
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {file.status === 'uploading' && (
                        <div
                          style={{
                            height: '6px',
                            borderRadius: '3px',
                            background: 'rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${file.progress}%`,
                              background: 'linear-gradient(90deg, #64c8ff 0%, #667eea 100%)',
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A modern file upload component with drag-and-drop functionality, upload progress tracking, and file management. Ideal for document management systems, media uploads, or form attachments.',
      },
    },
  },
};

/**
 * Search Results - Search interface with filtered results
 */
export const SearchResults: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchQuery, setSearchQuery] = useState('design system');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = ['all', 'articles', 'videos', 'documentation', 'tutorials'];

    const results = [
      {
        type: 'article',
        title: 'Building a Modern Design System',
        description:
          'Learn how to create scalable and maintainable design systems for your projects...',
        url: 'example.com/article-1',
        date: '2 days ago',
        author: 'Sarah Chen',
        icon: '📝',
      },
      {
        type: 'video',
        title: 'Design System Tutorial',
        description:
          'Complete video guide to design systems, covering components, tokens, and documentation...',
        url: 'example.com/video-1',
        date: '1 week ago',
        author: 'John Design',
        icon: '🎥',
        duration: '24:35',
      },
      {
        type: 'documentation',
        title: 'Design System Best Practices',
        description:
          'Official documentation covering design system principles, patterns, and implementation...',
        url: 'example.com/docs-1',
        date: '3 days ago',
        author: 'Atomix Team',
        icon: '📚',
      },
      {
        type: 'tutorial',
        title: 'Getting Started with Design Systems',
        description:
          'Step-by-step tutorial for beginners to understand and implement design systems...',
        url: 'example.com/tutorial-1',
        date: '5 days ago',
        author: 'Maria Garcia',
        icon: '🎓',
      },
      {
        type: 'article',
        title: 'Design Tokens in Practice',
        description:
          'Deep dive into design tokens: what they are, why they matter, and how to use them...',
        url: 'example.com/article-2',
        date: '1 week ago',
        author: 'Alex Kim',
        icon: '📝',
      },
    ];

    const filteredResults =
      selectedFilter === 'all'
        ? results
        : results.filter(r => r.type === selectedFilter.slice(0, -1));

    return (
      <BackgroundWrapper backgroundImage={'https://images.unsplash.com/photo-1708446737917-04712abc09a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070'}>
        <AtomixGlass
          displacementScale={80}
          blurAmount={1.1}
          cornerRadius={30}
          mode="standard"
          elasticity={0}
        >
          <div style={{ padding: '24px', minWidth: '800px', maxWidth: '900px' }}>
            {/* Search Header */}
            <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 700 }}>Search</h2>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for anything..."
                style={{
                  width: '100%',
                  padding: '12px 48px 12px 20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '20px',
                }}
              >
                🔍
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto' }}>
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background:
                      selectedFilter === filter
                        ? 'rgba(255,255,255,0.25)'
                        : 'rgba(255,255,255,0.08)',
                    color: 'inherit',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.7 }}>
              Found {filteredResults.length} results for "{searchQuery}"
            </div>

            {/* Results List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxHeight: '600px',
                overflowY: 'auto',
              }}
            >
              {filteredResults.map((result, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ fontSize: '40px', flexShrink: 0 }}>{result.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                          {result.title}
                        </h3>
                        {result.duration && (
                          <span
                            style={{
                              padding: '2px 4px',
                              borderRadius: '6px',
                              background: 'rgba(255,255,255,0.15)',
                              fontSize: '11px',
                              fontWeight: 600,
                            }}
                          >
                            {result.duration}
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          margin: '0 0 12px 0',
                          fontSize: '14px',
                          opacity: 0.8,
                        }}
                      >
                        {result.description}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '13px',
                          opacity: 0.6,
                        }}
                      >
                        <span>{result.url}</span>
                        <span>•</span>
                        <span>{result.author}</span>
                        <span>•</span>
                        <span>{result.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive search results interface with filtering, categorization, and detailed result cards. Perfect for documentation sites, knowledge bases, or content platforms.',
      },
    },
  },
};

/**
 * Payment Form - Secure payment form with card input
 */
export const PaymentForm: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cardNumber, setCardNumber] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cardName, setCardName] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expiryDate, setExpiryDate] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cvv, setCvv] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [saveCard, setSaveCard] = useState(false);

    const formatCardNumber = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts: string[] = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length) {
        return parts.join(' ');
      } else {
        return value;
      }
    };

    const formatExpiry = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (v.length >= 2) {
        return v.slice(0, 2) + '/' + v.slice(2, 4);
      }
      return v;
    };

    return (
      <BackgroundWrapper backgroundImage={backgroundImages[0]}>
        <AtomixGlass
          displacementScale={32}
          blurAmount={22}
          saturation={1.1}
          cornerRadius={28}
          mode="standard"
        >
          <div style={{ padding: '40px', minWidth: '450px', maxWidth: '500px' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700 }}>
              Payment Details
            </h2>
            <p style={{ margin: '0 0 32px 0', fontSize: '14px', opacity: 0.7 }}>
              Complete your purchase securely
            </p>

            {/* Card Preview */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                marginBottom: '32px',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, opacity: 0.9 }}>CREDIT CARD</div>
                <div style={{ fontSize: '32px' }}>💳</div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    letterSpacing: '2px',
                  }}
                >
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}
                >
                  <div>
                    <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>
                      CARD HOLDER
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase' }}>
                      {cardName || 'YOUR NAME'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>
                      EXPIRES
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{expiryDate || 'MM/YY'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={e => setExpiryDate(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'inherit',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'inherit',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Save Card Option */}
              <div
                onClick={() => setSaveCard(!saveCard)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    background: saveCard
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                  }}
                >
                  {saveCard && '✓'}
                </div>
                <span style={{ fontSize: '14px' }}>Save card for future purchases</span>
              </div>

              {/* Amount Summary */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ opacity: 0.7 }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>$129.00</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ opacity: 0.7 }}>Tax</span>
                  <span style={{ fontWeight: 600 }}>$12.90</span>
                </div>
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(255,255,255,0.2)',
                    margin: '12px 0',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontWeight: 700 }}>$141.90</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Pay $141.90
              </button>

              <div style={{ textAlign: 'center', fontSize: '12px', opacity: 0.6 }}>
                🔒 Secured by 256-bit SSL encryption
              </div>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A secure payment form with card preview, input formatting, and payment summary. Perfect for e-commerce checkouts, subscription payments, or donation forms.',
      },
    },
  },
};

/**
 * Newsletter Subscription - Email subscription form with benefits
 */
export const NewsletterSubscription: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [subscribed, setSubscribed] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = () => {
      if (email) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setSubscribed(true);
        }, 1500);
      }
    };

    const benefits = [
      {
        icon: '📬',
        title: 'Weekly Updates',
        description: 'Get the latest news and updates every week',
      },
      {
        icon: '🎁',
        title: 'Exclusive Content',
        description: 'Access premium articles and resources',
      },
      { icon: '💡', title: 'Expert Tips', description: 'Learn from industry professionals' },
      { icon: '🎉', title: 'Early Access', description: 'Be the first to try new features' },
    ];

    return (
      <BackgroundWrapper backgroundImage={backgroundImages[1]}>
        <AtomixGlass
          displacementScale={30}
          blurAmount={20}
          saturation={1.2}
          cornerRadius={32}
          mode="standard"
        >
          <div style={{ padding: '50px', minWidth: '500px', maxWidth: '600px' }}>
            {!subscribed ? (
              <>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div style={{ fontSize: '60px', marginBottom: '16px' }}>📧</div>
                  <h2 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: 700 }}>
                    Join Our Newsletter
                  </h2>
                  <p style={{ margin: 0, fontSize: '16px', opacity: 0.8, lineHeight: 1.6 }}>
                    Subscribe to get exclusive content, tips, and updates delivered to your inbox
                  </p>
                </div>

                {/* Email Input */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      onKeyPress={e => {
                        if (e.key === 'Enter') handleSubscribe();
                      }}
                      style={{
                        width: '100%',
                        padding: '18px 140px 18px 20px',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'inherit',
                        fontSize: '16px',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={!email || isLoading}
                      style={{
                        position: 'absolute',
                        right: '6px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        background: email
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: email ? 'pointer' : 'not-allowed',
                        opacity: isLoading ? 0.7 : 1,
                      }}
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>
                  <p style={{ margin: '12px 0 0 0', fontSize: '13px', opacity: 0.6 }}>
                    No spam. Unsubscribe anytime.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
                >
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{benefit.icon}</div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>
                        {benefit.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '13px', opacity: 0.7, lineHeight: 1.5 }}>
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '32px',
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>
                      50K+
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.6 }}>Subscribers</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>
                      4.9★
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.6 }}>Rating</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>
                      Weekly
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.6 }}>Delivery</div>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '80px', marginBottom: '24px' }}>🎉</div>
                <h2 style={{ margin: '0 0 16px 0', fontSize: '32px', fontWeight: 700 }}>
                  Welcome Aboard!
                </h2>
                <p
                  style={{ margin: '0 0 32px 0', fontSize: '16px', opacity: 0.8, lineHeight: 1.6 }}
                >
                  Thank you for subscribing! Check your inbox for a confirmation email.
                </p>
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(100,200,100,0.15)',
                    border: '1px solid rgba(100,200,100,0.3)',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                    ✓ Subscription Confirmed
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>{email}</div>
                </div>
                <button
                  onClick={() => {
                    setSubscribed(false);
                    setEmail('');
                  }}
                  style={{
                    padding: '14px 32px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Subscribe Another Email
                </button>
              </div>
            )}
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive newsletter subscription form with benefits display, subscriber stats, and success state. Perfect for landing pages, blogs, or marketing campaigns.',
      },
    },
  },
};

/**
 * Progress Tracker - Multi-step progress indicator
 */
export const ProgressTracker: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentStep, setCurrentStep] = useState(2);

    const steps = [
      {
        id: 1,
        title: 'Account Setup',
        description: 'Create your profile and set preferences',
        icon: '👤',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Payment Method',
        description: 'Add your payment information',
        icon: '💳',
        status: 'current',
      },
      {
        id: 3,
        title: 'Verification',
        description: 'Verify your email and phone',
        icon: '✉️',
        status: 'upcoming',
      },
      {
        id: 4,
        title: 'Complete',
        description: 'Review and finish setup',
        icon: '🎉',
        status: 'upcoming',
      },
    ];

    const getStepStatus = (stepId: number) => {
      if (stepId < currentStep) return 'completed';
      if (stepId === currentStep) return 'current';
      return 'upcoming';
    };

    return (
      <BackgroundWrapper backgroundImage={backgroundImages[6]}>
        <AtomixGlass
          displacementScale={28}
          blurAmount={18}
          saturation={1.15}
          cornerRadius={30}
          mode="standard"
        >
          <div style={{ padding: '50px', minWidth: '650px', maxWidth: '800px' }}>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: 700 }}>
              Getting Started
            </h2>
            <p style={{ margin: '0 0 48px 0', fontSize: '16px', opacity: 0.7 }}>
              Complete the following steps to set up your account
            </p>

            {/* Progress Bar */}
            <div style={{ marginBottom: '48px' }}>
              <div
                style={{
                  position: 'relative',
                  height: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  fontSize: '13px',
                  opacity: 0.6,
                }}
              >
                <span>
                  Step {currentStep} of {steps.length}
                </span>
                <span>{Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}% Complete</span>
              </div>
            </div>

            {/* Steps List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              {steps.map(step => {
                const status = getStepStatus(step.id);
                const isCompleted = status === 'completed';
                const isCurrent = status === 'current';
                const isUpcoming = status === 'upcoming';

                return (
                  <div
                    key={step.id}
                    onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '24px',
                      borderRadius: '20px',
                      background: isCurrent
                        ? 'rgba(102,126,234,0.15)'
                        : isCompleted
                          ? 'rgba(100,200,100,0.1)'
                          : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${
                        isCurrent
                          ? 'rgba(102,126,234,0.5)'
                          : isCompleted
                            ? 'rgba(100,200,100,0.3)'
                            : 'rgba(255,255,255,0.1)'
                      }`,
                      cursor: step.id <= currentStep ? 'pointer' : 'default',
                      opacity: isUpcoming ? 0.6 : 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Step Number/Icon */}
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '16px',
                        background: isCurrent
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : isCompleted
                            ? 'linear-gradient(135deg, #50c878 0%, #3cb371 100%)'
                            : 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        flexShrink: 0,
                      }}
                    >
                      {isCompleted ? '✓' : step.icon}
                    </div>

                    {/* Step Content */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '6px',
                        }}
                      >
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                          {step.title}
                        </h3>
                        {isCompleted && (
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '8px',
                              background: 'rgba(100,200,100,0.2)',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#50c878',
                            }}
                          >
                            COMPLETED
                          </span>
                        )}
                        {isCurrent && (
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '8px',
                              background: 'rgba(102,126,234,0.2)',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#667eea',
                            }}
                          >
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    {step.id <= currentStep && (
                      <div style={{ fontSize: '20px', opacity: 0.5 }}>→</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                style={{
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentStep === 1 ? 0.5 : 1,
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                disabled={currentStep === steps.length}
                style={{
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  background:
                    currentStep === steps.length
                      ? 'rgba(255,255,255,0.2)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: currentStep === steps.length ? 'not-allowed' : 'pointer',
                  opacity: currentStep === steps.length ? 0.5 : 1,
                }}
              >
                {currentStep === steps.length ? 'Completed ✓' : 'Next →'}
              </button>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive progress tracker for multi-step processes with status indicators, step navigation, and progress visualization. Perfect for onboarding flows, checkout processes, or application wizards.',
      },
    },
  },
};
