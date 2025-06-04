'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'

interface ColorSwatchProps {
  name: string
  value: string
  variable: string
  description?: string
}

function ColorSwatch({ name, value, variable, description }: ColorSwatchProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="color-swatch">
      <div 
        className="color-box" 
        style={{ backgroundColor: value }}
        onClick={() => copyToClipboard(value)}
      />
      <div className="color-info">
        <div className="color-name">{name}</div>
        <div className="color-value" onClick={() => copyToClipboard(variable)}>
          {variable}
        </div>
        <div className="color-value" onClick={() => copyToClipboard(value)}>
          {value}
        </div>
        {description && (
          <div className="u-text-xs u-text-secondary u-mt-xs">{description}</div>
        )}
      </div>
    </div>
  )
}

interface ColorPaletteProps {
  title: string
  colors: ColorSwatchProps[]
}

function ColorPalette({ title, colors }: ColorPaletteProps) {
  return (
    <div className="color-palette">
      <h3>{title}</h3>
      <div className="color-swatch-o-grid">
        {colors.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </div>
    </div>
  )
}

export default function ColorsPage() {
  const primaryColors = [
    { name: 'Primary 1', value: '#F2E8FD', variable: '$primary-1', description: 'Lightest shade' },
    { name: 'Primary 2', value: '#E4D0FA', variable: '$primary-2', description: 'Very light' },
    { name: 'Primary 3', value: '#D0B2F5', variable: '$primary-3', description: 'Light' },
    { name: 'Primary 4', value: '#B88CEF', variable: '$primary-4', description: 'Light medium' },
    { name: 'Primary 5', value: '#9C63E9', variable: '$primary-5', description: 'Medium' },
    { name: 'Primary 6', value: '#7C3AED', variable: '$primary-6', description: 'Base primary' },
    { name: 'Primary 7', value: '#6425CA', variable: '$primary-7', description: 'Medium dark' },
    { name: 'Primary 8', value: '#501BA6', variable: '$primary-8', description: 'Dark' },
    { name: 'Primary 9', value: '#3C1583', variable: '$primary-9', description: 'Very dark' },
    { name: 'Primary 10', value: '#2A0E60', variable: '$primary-10', description: 'Darkest shade' },
  ]

  const grayColors = [
    { name: 'Gray 1', value: '#F9FAFB', variable: '$gray-1', description: 'Lightest gray' },
    { name: 'Gray 2', value: '#F3F4F6', variable: '$gray-2', description: 'Very light' },
    { name: 'Gray 3', value: '#E5E7EB', variable: '$gray-3', description: 'Light' },
    { name: 'Gray 4', value: '#D1D5DB', variable: '$gray-4', description: 'Light medium' },
    { name: 'Gray 5', value: '#9CA3AF', variable: '$gray-5', description: 'Medium' },
    { name: 'Gray 6', value: '#6B7280', variable: '$gray-6', description: 'Medium dark' },
    { name: 'Gray 7', value: '#4B5563', variable: '$gray-7', description: 'Dark' },
    { name: 'Gray 8', value: '#374151', variable: '$gray-8', description: 'Very dark' },
    { name: 'Gray 9', value: '#1F2937', variable: '$gray-9', description: 'Darker' },
    { name: 'Gray 10', value: '#111827', variable: '$gray-10', description: 'Darkest gray' },
  ]

  const redColors = [
    { name: 'Red 1', value: '#FEF2F2', variable: '$red-1', description: 'Lightest red' },
    { name: 'Red 2', value: '#FEE2E2', variable: '$red-2', description: 'Very light' },
    { name: 'Red 3', value: '#FECACA', variable: '$red-3', description: 'Light' },
    { name: 'Red 4', value: '#FCA5A5', variable: '$red-4', description: 'Light medium' },
    { name: 'Red 5', value: '#F87171', variable: '$red-5', description: 'Medium' },
    { name: 'Red 6', value: '#EF4444', variable: '$red-6', description: 'Base red' },
    { name: 'Red 7', value: '#DC2626', variable: '$red-7', description: 'Medium dark' },
    { name: 'Red 8', value: '#B91C1C', variable: '$red-8', description: 'Dark' },
    { name: 'Red 9', value: '#991B1B', variable: '$red-9', description: 'Very dark' },
    { name: 'Red 10', value: '#7F1D1D', variable: '$red-10', description: 'Darkest red' },
  ]

  const greenColors = [
    { name: 'Green 1', value: '#F0FDF4', variable: '$green-1', description: 'Lightest green' },
    { name: 'Green 2', value: '#DCFCE7', variable: '$green-2', description: 'Very light' },
    { name: 'Green 3', value: '#BBF7D0', variable: '$green-3', description: 'Light' },
    { name: 'Green 4', value: '#86EFAC', variable: '$green-4', description: 'Light medium' },
    { name: 'Green 5', value: '#4ADE80', variable: '$green-5', description: 'Medium' },
    { name: 'Green 6', value: '#22C55E', variable: '$green-6', description: 'Base green' },
    { name: 'Green 7', value: '#16A34A', variable: '$green-7', description: 'Medium dark' },
    { name: 'Green 8', value: '#15803D', variable: '$green-8', description: 'Dark' },
    { name: 'Green 9', value: '#166534', variable: '$green-9', description: 'Very dark' },
    { name: 'Green 10', value: '#14532D', variable: '$green-10', description: 'Darkest green' },
  ]

  const blueColors = [
    { name: 'Blue 1', value: '#EFF6FF', variable: '$blue-1', description: 'Lightest blue' },
    { name: 'Blue 2', value: '#DBEAFE', variable: '$blue-2', description: 'Very light' },
    { name: 'Blue 3', value: '#BFDBFE', variable: '$blue-3', description: 'Light' },
    { name: 'Blue 4', value: '#93C5FD', variable: '$blue-4', description: 'Light medium' },
    { name: 'Blue 5', value: '#60A5FA', variable: '$blue-5', description: 'Medium' },
    { name: 'Blue 6', value: '#3B82F6', variable: '$blue-6', description: 'Base blue' },
    { name: 'Blue 7', value: '#2563EB', variable: '$blue-7', description: 'Medium dark' },
    { name: 'Blue 8', value: '#1D4ED8', variable: '$blue-8', description: 'Dark' },
    { name: 'Blue 9', value: '#1E40AF', variable: '$blue-9', description: 'Very dark' },
    { name: 'Blue 10', value: '#1E3A8A', variable: '$blue-10', description: 'Darkest blue' },
  ]

  const yellowColors = [
    { name: 'Yellow 1', value: '#FEFCE8', variable: '$yellow-1', description: 'Lightest yellow' },
    { name: 'Yellow 2', value: '#FEF9C3', variable: '$yellow-2', description: 'Very light' },
    { name: 'Yellow 3', value: '#FEF08A', variable: '$yellow-3', description: 'Light' },
    { name: 'Yellow 4', value: '#FDE047', variable: '$yellow-4', description: 'Light medium' },
    { name: 'Yellow 5', value: '#FACC15', variable: '$yellow-5', description: 'Medium' },
    { name: 'Yellow 6', value: '#EAB308', variable: '$yellow-6', description: 'Base yellow' },
    { name: 'Yellow 7', value: '#CA8A04', variable: '$yellow-7', description: 'Medium dark' },
    { name: 'Yellow 8', value: '#A16207', variable: '$yellow-8', description: 'Dark' },
    { name: 'Yellow 9', value: '#854D0E', variable: '$yellow-9', description: 'Very dark' },
    { name: 'Yellow 10', value: '#713F12', variable: '$yellow-10', description: 'Darkest yellow' },
  ]

  const semanticColors = [
    { name: 'Success', value: '#22C55E', variable: '$success', description: 'Success states' },
    { name: 'Warning', value: '#EAB308', variable: '$warning', description: 'Warning states' },
    { name: 'Error', value: '#EF4444', variable: '$error', description: 'Error states' },
    { name: 'Info', value: '#3B82F6', variable: '$info', description: 'Information states' },
  ]

  const textColors = [
    { name: 'Primary Text', value: '#111827', variable: '$primary-text', description: 'Main text color' },
    { name: 'Secondary Text', value: '#374151', variable: '$secondary-text', description: 'Secondary text' },
    { name: 'Tertiary Text', value: '#6B7280', variable: '$tertiary-text', description: 'Muted text' },
    { name: 'Disabled Text', value: '#9CA3AF', variable: '$disabled-text', description: 'Disabled states' },
    { name: 'Brand Text', value: '#7C3AED', variable: '$brand-text', description: 'Brand colored text' },
    { name: 'Light Text', value: '#F9FAFB', variable: '$light-text', description: 'Light text on dark' },
  ]

  const backgroundColors = [
    { name: 'Primary BG', value: '#FFFFFF', variable: '$primary-bg', description: 'Main background' },
    { name: 'Secondary BG', value: '#E5E7EB', variable: '$secondary-bg', description: 'Secondary background' },
    { name: 'Tertiary BG', value: '#D1D5DB', variable: '$tertiary-bg', description: 'Tertiary background' },
    { name: 'Brand BG', value: '#E4D0FA', variable: '$brand-bg', description: 'Brand background' },
    { name: 'Success BG', value: '#DCFCE7', variable: '$success-bg', description: 'Success background' },
    { name: 'Warning BG', value: '#FEF9C3', variable: '$warning-bg', description: 'Warning background' },
    { name: 'Error BG', value: '#FEE2E2', variable: '$error-bg', description: 'Error background' },
    { name: 'Info BG', value: '#DBEAFE', variable: '$info-bg', description: 'Info background' },
  ]

  return (
    <DocsLayout>
      <div className="prose">
        <h1>Colors</h1>
        <p>
          Atomix uses a systematic approach to color with carefully crafted palettes that ensure 
          accessibility, consistency, and visual harmony across all components and interfaces.
        </p>

        <section>
          <h2>Color System</h2>
          <p>
            Our color system is built on a foundation of semantic color tokens that adapt to both 
            light and dark themes. Each color has 10 carefully calibrated shades, providing 
            flexibility while maintaining consistency.
          </p>
          
          <div className="u-bg-secondary u-p-md u-rounded u-mb-lg">
            <h4 className="u-mt-0">💡 Pro Tip</h4>
            <p className="u-mb-0">Click on any color swatch to copy its value to your clipboard!</p>
          </div>
        </section>

        <ColorPalette title="Primary Colors" colors={primaryColors} />
        <ColorPalette title="Gray Colors" colors={grayColors} />
        <ColorPalette title="Red Colors" colors={redColors} />
        <ColorPalette title="Green Colors" colors={greenColors} />
        <ColorPalette title="Blue Colors" colors={blueColors} />
        <ColorPalette title="Yellow Colors" colors={yellowColors} />
        <ColorPalette title="Semantic Colors" colors={semanticColors} />
        <ColorPalette title="Text Colors" colors={textColors} />
        <ColorPalette title="Background Colors" colors={backgroundColors} />

        <section>
          <h2>Usage Guidelines</h2>
          
          <h3>Accessibility</h3>
          <p>All color combinations in Atomix meet WCAG 2.1 AA contrast requirements:</p>
          <ul>
            <li>Normal text: minimum 4.5:1 contrast ratio</li>
            <li>Large text: minimum 3:1 contrast ratio</li>
            <li>UI components: minimum 3:1 contrast ratio</li>
          </ul>

          <h3>Semantic Colors</h3>
          <p>Use semantic colors consistently across your application:</p>
          <ul>
            <li><strong>Success (Green):</strong> Confirmations, success states, positive actions</li>
            <li><strong>Warning (Yellow):</strong> Cautions, pending states, attention needed</li>
            <li><strong>Error (Red):</strong> Errors, destructive actions, validation issues</li>
            <li><strong>Info (Blue):</strong> Information, neutral actions, help content</li>
          </ul>

          <h3>Dark Mode</h3>
          <p>
            All colors automatically adapt to dark mode using CSS custom properties. 
            The system intelligently adjusts contrast and brightness to maintain 
            accessibility and visual hierarchy.
          </p>
        </section>

        <section>
          <h2>Implementation</h2>
          
          <h3>CSS Custom Properties</h3>
          <p>Colors are available as CSS custom properties for dynamic theming:</p>
          <pre className="u-bg-secondary u-p-md u-rounded">
<code>{`.my-component {
  color: var(--atomix-primary-text);
  background-color: var(--atomix-primary-bg);
  border-color: var(--atomix-primary-border);
}`}</code>
          </pre>

          <h3>SCSS Variables</h3>
          <p>Use SCSS variables in your stylesheets:</p>
          <pre className="u-bg-secondary u-p-md u-rounded">
<code>{`@use '@atomix/styles/settings/colors' as *;

.my-component {
  color: $primary-text;
  background-color: $primary-bg;
  border-color: $primary-border;
}`}</code>
          </pre>

          <h3>Utility Classes</h3>
          <p>Apply colors using utility classes:</p>
          <pre className="u-bg-secondary u-p-md u-rounded">
<code>{`<div className="u-text-primary u-bg-secondary u-border-primary">
  Content with utility classes
</div>`}</code>
          </pre>
        </section>

        <section>
          <h2>Customization</h2>
          <p>
            Override color values by defining custom CSS properties or SCSS variables 
            before importing Atomix styles:
          </p>
          <pre className="u-bg-secondary u-p-md u-rounded">
<code>{`:root {
  --atomix-primary-6: #your-brand-color;
  --atomix-primary-text: #your-text-color;
}

// Or in SCSS
$primary-6: #your-brand-color;
$primary-text: #your-text-color;

@import '@atomix/styles';`}</code>
          </pre>
        </section>
      </div>
    </DocsLayout>
  )
}