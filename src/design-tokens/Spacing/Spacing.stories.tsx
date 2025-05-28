import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import './Spacing.scss';

interface SpacingExampleProps {
  name: string;
  size: string;
  value: string;
  isDark?: boolean;
}

const SpacingExample = ({ name, size, value, isDark = false }: SpacingExampleProps) => {
  const sizeInPx = parseFloat(value) * 16; // Convert rem to px for display
  
  return (
    <div className="spacing-example u-d-flex u-flex-column u-gap-2">
      <div className="spacing-info u-d-flex u-gap-2 u-justify-content-between u-items-center">
        <span className="spacing-name u-fs-sm u-fw-bold">{name}</span>
        <div className="spacing-details u-d-flex u-gap-2 u-items-center">
          <code className="spacing-value u-fs-xs u-text-error u-bg-error-subtle u-rounded-sm u-px-2 u-py-1">{value}</code>
          <span className="spacing-px u-fs-xs">{sizeInPx}px</span>
        </div>
      </div>
      <div 
        className="spacing-visual"
        style={{
          '--spacing-size': value,
        } as React.CSSProperties}
      >
        <div className="spacing-visual-inner"></div>
      </div>
    </div>
  );
};

const SpacingPreview = () => {
  const isDark = false;

  const spacingScale = [
    { name: '0', value: '0rem' },
    { name: '1', value: '0.25rem' },
    { name: '2', value: '0.5rem' },
    { name: '3', value: '0.75rem' },
    { name: '4', value: '1rem' },
    { name: '5', value: '1.25rem' },
    { name: '6', value: '1.5rem' },
    { name: '7', value: '1.75rem' },
    { name: '8', value: '2rem' },
    { name: '9', value: '2.25rem' },
    { name: '10', value: '2.5rem' },
    { name: '11', value: '2.75rem' },
    { name: '12', value: '3rem' },
    { name: '14', value: '3.5rem' },
    { name: '16', value: '4rem' },
    { name: '20', value: '5rem' },
    { name: '24', value: '6rem' },
    { name: '28', value: '7rem' },
    { name: '32', value: '8rem' },
    { name: '36', value: '9rem' },
    { name: '40', value: '10rem' },
    { name: '44', value: '11rem' },
    { name: '48', value: '12rem' },
    { name: '52', value: '13rem' },
    { name: '56', value: '14rem' },
    { name: '60', value: '15rem' },
    { name: '64', value: '16rem' },
    { name: '72', value: '18rem' },
    { name: '80', value: '20rem' },
    { name: '90', value: '22.5rem' },
  ];

  return (
    <div className={`spacing-preview o-container o-container-fluid u-py-2 u-my-4 u-rounded-md ${isDark ? 'dark' : ''}`}>
      <h1 className="u-fs-xl u-text-primary u-mb-2">Spacing Scale</h1>
      
      <section className="spacing-section u-bg-primary-subtle u-p-4 u-rounded-md">
        <h2>Spacing Units</h2>
        <p className="section-description u-fs-sm u-text-secondary u-mb-4">
          The spacing scale is based on a 4px unit system. Each step in the scale represents a multiple of 4px.
          Use these values for margin, padding, and other spacing-related properties.
        </p>
        
        <div className="spacing-grid">
          {spacingScale.map(({ name, value }) => (
            <SpacingExample
              key={name}
              name={name}
              size={name}
              value={value}
              isDark={isDark}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default {
  title: 'Design Tokens/Spacing',
  component: SpacingPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Spacing scale and utilities for the Atomix design system.',
      },
    },
  },
} as Meta<typeof SpacingPreview>;

type Story = StoryObj<typeof SpacingPreview>;

export const Spacing: Story = {};
