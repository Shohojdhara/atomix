import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import './Typography.scss';

interface TypographyScaleProps {
  name: string;
  className?: string;
  weight?: number | string;
  children: React.ReactNode;
  isDark?: boolean;
}

const TypographyScale = ({
  name,
  className = '',
  weight = 400,
  children,
  isDark = false,
}: TypographyScaleProps) => (
  <div className="typography-scale">
    <div className="typography-info">
      <span className="typography-name">{name}</span>
      <span className="typography-details">
        {weight} • {className || 'base'}
      </span>
    </div>
    <div 
      className={`${className}`} 
      style={{ fontWeight: weight }}
    >
      {children}
    </div>
  </div>
);

const TypographyPreview = () => {
  const isDark = false;

  const fontWeights = [
    { name: 'Light', value: 300 },
    { name: 'Regular', value: 400 },
    { name: 'Medium', value: 500 },
    { name: 'Semibold', value: 600 },
    { name: 'Bold', value: 700 },
    { name: 'Heavy', value: 800 },
    { name: 'Black', value: 900 },
  ];

  const fontSizes = [
    { name: 'Display 1', className: 'display-1' },
    { name: 'Heading 1', className: 'h1' },
    { name: 'Heading 2', className: 'h2' },
    { name: 'Heading 3', className: 'h3' },
    { name: 'Heading 4', className: 'h4' },
    { name: 'Heading 5', className: 'h5' },
    { name: 'Heading 6', className: 'h6' },
    { name: 'Large', className: 'u-fs-lg' },
    { name: 'Base', className: 'u-fs-base' },
    { name: 'Medium', className: 'u-fs-md' },
    { name: 'Small', className: 'u-fs-sm' },
    { name: 'Extra Small', className: 'u-fs-xs' },
  ];

  const sampleText = 'The quick brown fox jumps over the lazy dog.';
  const sampleTextLong = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.';

  return (
    <div className={`typography-preview`}>
      <h1>Typography</h1>
      
      <section className="typography-section">
        <h2>Font Family</h2>
        <div className="font-family-preview">
          <div className="font-family-item">
            <h3>Helvetica Neue</h3>
            <p className="font-helvetica">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789!@#$%^&*()
            </p>
          </div>
          <div className="font-family-item">
            <h3>System Font Stack</h3>
            <p className="font-system">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789!@#$%^&*()
            </p>
          </div>
          <div className="font-family-item">
            <h3>Monospace</h3>
            <p className="font-mono">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789!@#$%^&*()
            </p>
          </div>
        </div>
      </section>

      <section className="typography-section">
        <h2>Font Weights</h2>
        <div className="font-weights-preview">
          {fontWeights.map(({ name, value }) => (
            <div key={value} className="font-weight-item">
              <span className="font-weight-name">{name} ({value})</span>
              <p style={{ fontWeight: value }}>
                {sampleText}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="typography-section">
        <h2>Type Scale</h2>
        <div className="type-scale-preview">
          {fontSizes.map(({ name, className }) => (
            <TypographyScale 
              key={className} 
              name={name} 
              className={className}
              isDark={isDark}
            >
              {sampleText}
            </TypographyScale>
          ))}
        </div>
      </section>

      <section className="typography-section">
        <h2>Text Styles</h2>
        <div className="text-styles-preview">
          <TypographyScale name="Normal">
            {sampleTextLong}
          </TypographyScale>
          <TypographyScale name="Italic" className="u-fst-italic">
            {sampleTextLong}
          </TypographyScale>
          <TypographyScale name="Uppercase" className="u-text-uppercase">
            {sampleTextLong}
          </TypographyScale>
          <TypographyScale name="Underline" className="u-td-underline">
            {sampleTextLong}
          </TypographyScale>
          <TypographyScale name="Line Through" className="u-td-line-through">
            {sampleTextLong}
          </TypographyScale>
        </div>
      </section>
    </div>
  );
};

export default {
  title: 'Design Tokens/Typography',
  component: TypographyPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Typography system for the Atomix design system.',
      },
    },
  },
} as Meta<typeof TypographyPreview>;

type Story = StoryObj<typeof TypographyPreview>;

export const Typography: Story = {};
