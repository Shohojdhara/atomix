import React, { useState, useEffect, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import './colors.scss';

interface ColorSwatchProps {
  name: string;
  value: string;
  isDark?: boolean;
}

const ColorSwatch = ({ name, value, isDark = false }: ColorSwatchProps) => (
  <div className={`color-swatch`}>
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

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

const ColorPalette = ({ title, colors, isDark = false }: ColorPaletteProps) => {
  const colorEntries = Object.entries(colors);
  const width = useWindowWidth();
  const paletteRef = useRef<HTMLDivElement>(null);
  const [mousePosX, setMousePosX] = useState<number | null>(null);
  const [closestSwatchIdx, setClosestSwatchIdx] = useState<number | null>(null);

  let maxLift = -20;
  if (width < 480) {
    maxLift = -10;
  } else if (width < 768) {
    maxLift = -15;
  }

  useEffect(() => {
    const paletteElement = paletteRef.current;
    if (!paletteElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = paletteElement.getBoundingClientRect();
      const currentMouseX = e.clientX - rect.left;
      setMousePosX(currentMouseX);

      let minDistance = Infinity;
      let closestIndex: number | null = null;

      const colorGridElement = paletteElement.children[1] as HTMLDivElement;
      if (!colorGridElement) return;

      for (let i = 0; i < colorGridElement.children.length; i++) {
        const swatchElement = colorGridElement.children[i] as HTMLDivElement;
        if (swatchElement) {
          const swatchRect = swatchElement.getBoundingClientRect();
          const swatchCenterX = (swatchRect.left + swatchRect.right) / 2 - rect.left;
          const distance = Math.abs(currentMouseX - swatchCenterX);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        }
      }
      setClosestSwatchIdx(closestIndex);
    };

    const handleMouseLeave = () => {
      setMousePosX(null);
      setClosestSwatchIdx(null);
    };

    paletteElement.addEventListener('mousemove', handleMouseMove);
    paletteElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      paletteElement.removeEventListener('mousemove', handleMouseMove);
      paletteElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [paletteRef]);

  return (
    <div className="color-palette" ref={paletteRef}>
      <h3>{title}</h3>
      <div className="color-grid">
        {colorEntries.map(([name, value], idx) => {
          let translateY = 0;
          let isLeftHover = false;
          let isRightHover = false;

          if (mousePosX !== null && paletteRef.current) {
            const swatchElement = paletteRef.current.children[1].children[idx] as HTMLDivElement;
            if (swatchElement) {
              const swatchRect = swatchElement.getBoundingClientRect();
              const paletteRect = paletteRef.current.getBoundingClientRect();
              const swatchCenterX = (swatchRect.left + swatchRect.right) / 2 - paletteRect.left;
              const distance = Math.abs(mousePosX - swatchCenterX);

              const currentSwatchWidth = swatchRect.width;
              const maxEffectDistance = currentSwatchWidth * 3;

              if (distance < maxEffectDistance) {
                const normalizedDistance = distance / maxEffectDistance;
                const animationProgress = 1 - Math.pow(normalizedDistance, 2);
                translateY = Math.round(maxLift * animationProgress);
                if (maxLift < 0) {
                  translateY = Math.max(maxLift, translateY);
                } else {
                  translateY = Math.min(maxLift, translateY);
                }
              }
            }

            if (closestSwatchIdx !== null) {
              if (idx < closestSwatchIdx) {
                isRightHover = true; // All elements to the left of the closest
              } else if (idx > closestSwatchIdx) {
                isLeftHover = true; // All elements to the right of the closest
              }
            }
          } else {
            translateY = 0;
            isLeftHover = false;
            isRightHover = false;
          }

          return (
            <div
              key={name}
              className={`color-swatch${isLeftHover ? ' is-left-hover' : ''}${isRightHover ? ' is-right-hover' : ''}`}
              style={{
                transform: `translateY(${translateY}px)`,
              }}
            >
              <div className="color-box" style={{ backgroundColor: value }} />
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

  const themeColors = {
    primary: '#7C3AED',
    secondary: '#E5E7EB',
    success: '#22C55E',
    info: '#3B82F6',
    warning: '#EAB308',
    error: '#EF4444',
    light: '#F9FAFB',
    dark: '#1F2937',
  };

  const textColors = {
    'primary-text': '#1F2937',
    'secondary-text': '#374151',
    'tertiary-text': '#6B7280',
    'disabled-text': '#9CA3AF',
    'invert-text': '#1F2937',
    'brand-text': '#7C3AED',
    'error-text': '#EF4444',
    'success-text': '#22C55E',
    'warning-text': '#EAB308',
    'info-text': '#3B82F6',
  };

  return (
    <div className={`design-tokens ${isDark ? 'dark' : 'light'}`}>
      <h1>Design Tokens</h1>

      <section>
        <h2>Theme Colors</h2>
        <ColorPalette title="Theme Colors" colors={themeColors} isDark={isDark} />
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
        <ColorPalette title="Text Colors" colors={textColors} isDark={isDark} />
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
