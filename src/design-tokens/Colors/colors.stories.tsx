import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import './colors.scss';

interface ColorSwatchProps {
  name: string;
  value: string;
  isDark?: boolean;
  isPrevHover?: boolean;
  isNextHover?: boolean;
  onHover?: () => void;
  onUnhover?: () => void;
}

const ColorSwatch = ({ name, value, isDark = false, isPrevHover, isNextHover, onHover, onUnhover }: ColorSwatchProps) => (
  <div
    className={`color-swatch${isPrevHover ? ' is-hover-prev' : ''}${isNextHover ? ' is-hover-next' : ''}`}
    onMouseEnter={onHover}
    onMouseLeave={onUnhover}
  >
    <div 
      className="color-box" 
      style={{ 
        backgroundColor: value,
      }}
    />
    <div className="color-info">
      <div className="color-name">{name}</div>
      <div className="color-value">{value}</div>
    </div>
  </div>
);

interface ColorPaletteProps {
  title: string;
  colors: Record<string, string>;
  isDark?: boolean;
}

const ColorPalette = ({ title, colors, isDark = false }: ColorPaletteProps) => {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);
  const colorEntries = Object.entries(colors);

  return (
    <div className="color-palette">
      <h3>{title}</h3>
      <div className="color-grid">
        {colorEntries.map(([name, value], idx) => {
          let translateY = 0;
          if (hoveredIdx !== null) {
            const maxLift = -20;
            const minLift = 0;
            const distance = Math.abs(idx - hoveredIdx);
            const maxDistance = Math.max(hoveredIdx, colorEntries.length - 1 - hoveredIdx);
            if (idx === hoveredIdx) {
              translateY = maxLift;
            } else {
              // Linear interpolation: farther = closer to 0
              translateY = Math.round(maxLift * (1 - distance / maxDistance));
              if (translateY > 0) translateY = 0;
            }
          }
          return (
            <div
              key={name}
              className="color-swatch"
              style={{
                transform: `translateY(${translateY}px)`,
                zIndex: hoveredIdx === idx ? 2 : 1,
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div 
                className="color-box" 
                style={{ 
                  backgroundColor: value,
                }}
              />
              <div className="color-info">
                <div className="color-name">{name}</div>
                <div className="color-value">{value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DesignTokens = () => {
  const isDark = false;

  // Color scales with direct color values
  const colorScales = {
    primary: {
      'primary-1': '#F2E8FD',
      'primary-2': '#E4D0FA',
      'primary-3': '#D0B2F5',
      'primary-4': '#B88CEF',
      'primary-5': '#9C63E9',
      'primary-6': '#7C3AED',
      'primary-7': '#6425CA',
      'primary-8': '#501BA6',
      'primary-9': '#3C1583',
      'primary-10': '#2A0E60',
    },
    gray: {
      'gray-1': '#F9FAFB',
      'gray-2': '#F3F4F6',
      'gray-3': '#E5E7EB',
      'gray-4': '#D1D5DB',
      'gray-5': '#9CA3AF',
      'gray-6': '#6B7280',
      'gray-7': '#4B5563',
      'gray-8': '#374151',
      'gray-9': '#1F2937',
      'gray-10': '#111827',
    },
    red: {
      'red-1': '#FEF2F2',
      'red-2': '#FEE2E2',
      'red-3': '#FECACA',
      'red-4': '#FCA5A5',
      'red-5': '#F87171',
      'red-6': '#EF4444',
      'red-7': '#DC2626',
      'red-8': '#B91C1C',
      'red-9': '#991B1B',
      'red-10': '#7F1D1D',
    },
    green: {
      'green-1': '#F0FDF4',
      'green-2': '#DCFCE7',
      'green-3': '#BBF7D0',
      'green-4': '#86EFAC',
      'green-5': '#4ADE80',
      'green-6': '#22C55E',
      'green-7': '#16A34A',
      'green-8': '#15803D',
      'green-9': '#166534',
      'green-10': '#14532D',
    },
    blue: {
      'blue-1': '#EFF6FF',
      'blue-2': '#DBEAFE',
      'blue-3': '#BFDBFE',
      'blue-4': '#93C5FD',
      'blue-5': '#60A5FA',
      'blue-6': '#3B82F6',
      'blue-7': '#2563EB',
      'blue-8': '#1D4ED8',
      'blue-9': '#1E40AF',
      'blue-10': '#1E3A8A',
    },
    yellow: {
      'yellow-1': '#FEFCE8',
      'yellow-2': '#FEF9C3',
      'yellow-3': '#FEF08A',
      'yellow-4': '#FDE047',
      'yellow-5': '#FACC15',
      'yellow-6': '#EAB308',
      'yellow-7': '#CA8A04',
      'yellow-8': '#A16207',
      'yellow-9': '#854D0E',
      'yellow-10': '#713F12',
    },
  };

  // Theme colors with direct values
  const themeColors = {
    primary: '#7C3AED',    // primary-6
    secondary: '#E5E7EB',  // gray-3
    success: '#22C55E',    // green-6
    info: '#3B82F6',      // blue-6
    warning: '#EAB308',    // yellow-6
    error: '#EF4444',     // red-6
    light: '#F9FAFB',     // gray-1
    dark: '#1F2937',      // gray-9
  };

  // Text colors with direct values
  const textColors = {
    'primary-text': '#1F2937',     // gray-9
    'secondary-text': '#374151',   // gray-8
    'tertiary-text': '#6B7280',   // gray-6
    'disabled-text': '#9CA3AF',   // gray-5
    'invert-text': '#1F2937',     // gray-9 (will be inverted in dark mode)
    'brand-text': '#7C3AED',     // primary-6
    'error-text': '#EF4444',      // red-6
    'success-text': '#22C55E',    // green-6
    'warning-text': '#EAB308',    // yellow-6
    'info-text': '#3B82F6',       // blue-6
  };

  return (
    <div className={`design-tokens ${isDark ? 'dark' : 'light'}`}>
      <h1>Design Tokens</h1>
      
      <section>
        <h2>Theme Colors</h2>
        <ColorPalette 
          title="Theme Colors" 
          colors={themeColors} 
          isDark={isDark} 
        />
      </section>

      <section>
        <h2>Color Scales</h2>
        {Object.entries(colorScales).map(([name, colors]) => (
          <ColorPalette 
            key={name}
            title={name.charAt(0).toUpperCase() + name.slice(1)} 
            colors={colors} 
            isDark={isDark} 
          />
        ))}
      </section>

      <section>
        <h2>Text Colors</h2>
        <ColorPalette 
          title="Text Colors" 
          colors={textColors} 
          isDark={isDark} 
        />
      </section>
    </div>
  );
};

export default {
  title: 'Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Design tokens for the Atomix design system.',
      },
    },
  },
} as Meta<typeof DesignTokens>;

type Story = StoryObj<typeof DesignTokens>;

export const Colors: Story = {};
