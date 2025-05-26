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
    <div className="spacing-example">
      <div className="spacing-info">
        <span className="spacing-name">{name}</span>
        <div className="spacing-details">
          <code className="spacing-value">{value}</code>
          <span className="spacing-px">{sizeInPx}px</span>
        </div>
      </div>
      <div 
        className="spacing-visual"
        style={{
          '--spacing-size': value,
          '--spacing-bg': isDark ? '#2D2D2D' : '#F5F5F5',
          '--spacing-color': isDark ? '#4A90E2' : '#3B82F6',
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
    <div className={`spacing-preview ${isDark ? 'dark' : ''}`}>
      <h1>Spacing Scale</h1>
      
      <section className="spacing-section">
        <h2>Spacing Units</h2>
        <p className="section-description">
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
      
      <section className="usage-section">
        <h2>Usage Examples</h2>
        <p className="section-description">
          Here are some common usage examples for the spacing scale:
        </p>
        
        <div className="usage-examples">
          <div className="example-card">
            <h3>Card Component</h3>
            <div className="example-content" style={{ 
              padding: '1.5rem',
              borderRadius: '8px',
              backgroundColor: isDark ? '#2D2D2D' : '#FFFFFF',
              border: `1px solid ${isDark ? '#3D3D3D' : '#E5E7EB'}`
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>Card Title</h4>
              <p style={{ margin: '0 0 1.5rem' }}>This is a card with consistent spacing using the spacing scale.</p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: `1px solid ${isDark ? '#3D3D3D' : '#E5E7EB'}`
              }}>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  color: isDark ? '#F9FAFB' : '#111827',
                  cursor: 'pointer'
                }}>
                  Cancel
                </button>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: isDark ? '#3B82F6' : '#2563EB',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          
          <div className="example-card">
            <h3>Form Layout</h3>
            <div className="example-content" style={{ 
              padding: '1.5rem',
              borderRadius: '8px',
              backgroundColor: isDark ? '#2D2D2D' : '#FFFFFF',
              border: `1px solid ${isDark ? '#3D3D3D' : '#E5E7EB'}`
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                  color: isDark ? '#E5E7EB' : '#111827'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '4px',
                    border: `1px solid ${isDark ? '#3D3D3D' : '#D1D5DB'}`,
                    backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF',
                    color: isDark ? '#F9FAFB' : '#111827',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                  color: isDark ? '#E5E7EB' : '#111827'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '4px',
                    border: `1px solid ${isDark ? '#3D3D3D' : '#D1D5DB'}`,
                    backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF',
                    color: isDark ? '#F9FAFB' : '#111827',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <button style={{
                width: '100%',
                padding: '0.625rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: isDark ? '#3B82F6' : '#2563EB',
                color: '#FFFFFF',
                fontWeight: 500,
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}>
                Sign In
              </button>
            </div>
          </div>
          
          <div className="example-card">
            <h3>Spacing Utilities</h3>
            <div className="example-content" style={{ 
              padding: '1.5rem',
              borderRadius: '8px',
              backgroundColor: isDark ? '#2D2D2D' : '#FFFFFF',
              border: `1px solid ${isDark ? '#3D3D3D' : '#E5E7EB'}`
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>Common Spacing Classes</h4>
              <div style={{ marginBottom: '1.5rem' }}>
                <code style={{
                  display: 'block',
                  padding: '0.5rem',
                  backgroundColor: isDark ? '#1F1F1F' : '#F9FAFB',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  color: isDark ? '#E5E7EB' : '#111827'
                }}>
                  .p-4 {'{'} padding: 1rem; {'}'}
                </code>
                <code style={{
                  display: 'block',
                  padding: '0.5rem',
                  backgroundColor: isDark ? '#1F1F1F' : '#F9FAFB',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  color: isDark ? '#E5E7EB' : '#111827'
                }}>
                  .m-4 {'{'} margin: 1rem; {'}'}
                </code>
                <code style={{
                  display: 'block',
                  padding: '0.5rem',
                  backgroundColor: isDark ? '#1F1F1F' : '#F9FAFB',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  color: isDark ? '#E5E7EB' : '#111827'
                }}>
                  .gap-4 {'{'} gap: 1rem; {'}'}
                </code>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: `1px solid ${isDark ? '#3D3D3D' : '#E5E7EB'}`
              }}>
                <span style={{ fontSize: '0.875rem', color: isDark ? '#9CA3AF' : '#6B7280' }}>
                  View all utilities
                </span>
                <span style={{ color: isDark ? '#3B82F6' : '#2563EB', fontSize: '0.875rem', fontWeight: 500 }}>
                  Documentation →
                </span>
              </div>
            </div>
          </div>
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
