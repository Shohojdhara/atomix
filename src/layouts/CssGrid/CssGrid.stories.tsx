import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CssGrid from './CssGrid';

const meta = {
  title: 'Layout/CSS Grid',
  component: CssGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A modern CSS Grid component providing native CSS Grid layout capabilities with advanced features.

## Features

- **Grid Template Areas**: Define complex layouts using named grid areas
- **Auto-placement**: Automatic item placement with dense packing
- **Responsive Grids**: Dynamic column counts and min-width constraints
- **Advanced Alignment**: Full CSS Grid alignment control
- **Gap Utilities**: Independent row and column gap control

## Usage Examples

### Basic Grid
\`\`\`tsx
<CssGrid columns={3} gap="1rem">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</CssGrid>
\`\`\`

### Template Areas
\`\`\`tsx
<CssGrid 
  templateAreas={\`
    "header header header"
    "sidebar content content"
    "footer footer footer"
  \`}
  gap="1rem"
>
  <div style={{ gridArea: "header" }}>Header</div>
  <div style={{ gridArea: "sidebar" }}>Sidebar</div>
  <div style={{ gridArea: "content" }}>Content</div>
  <div style={{ gridArea: "footer" }}>Footer</div>
</CssGrid>
\`\`\`

### Auto-fit with Min Width
\`\`\`tsx
<CssGrid minColumnWidth="200px" gap="1rem">
  {/* Items will automatically wrap and fill available space */}
  <div>Responsive Item</div>
  <div>Responsive Item</div>
  <div>Responsive Item</div>
</CssGrid>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of grid columns'
    },
    gap: {
      control: 'text',
      description: 'Gap between grid items'
    },
    templateColumns: {
      control: 'text',
      description: 'CSS grid-template-columns value'
    },
    templateRows: {
      control: 'text',
      description: 'CSS grid-template-rows value'
    },
    templateAreas: {
      control: 'text',
      description: 'CSS grid-template-areas value'
    },
    minColumnWidth: {
      control: 'text',
      description: 'Minimum column width for auto-fit/auto-fill'
    }
  }
} satisfies Meta<typeof CssGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicGrid: Story = {
  args: {
    columns: 3,
    gap: '1rem',
    children: Array.from({ length: 6 }).map((_, i) => (
      <div key={i} style={{ 
        background: '#f0f0f0', 
        padding: '1rem', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        Item {i + 1}
      </div>
    ))
  }
};

export const TemplateAreas: Story = {
  args: {
    templateAreas: `
      "header header header"
      "sidebar content content"
      "footer footer footer"
    `,
    templateColumns: '200px 1fr 1fr',
    templateRows: 'auto 1fr auto',
    gap: '1rem',
    style: { height: '400px' },
    children: [
      <div key="header" style={{ 
        gridArea: 'header',
        background: '#3178c6', 
        color: 'white',
        padding: '1rem',
        textAlign: 'center'
      }}>
        Header
      </div>,
      <div key="sidebar" style={{ 
        gridArea: 'sidebar',
        background: '#e9ecef', 
        padding: '1rem'
      }}>
        Sidebar
      </div>,
      <div key="content" style={{ 
        gridArea: 'content',
        background: '#ffffff', 
        padding: '1rem',
        border: '1px solid #ddd'
      }}>
        Main Content
      </div>,
      <div key="footer" style={{ 
        gridArea: 'footer',
        background: '#343a40', 
        color: 'white',
        padding: '1rem',
        textAlign: 'center'
      }}>
        Footer
      </div>
    ]
  }
};

export const AutoFitGrid: Story = {
  args: {
    minColumnWidth: '200px',
    gap: '1rem',
    children: Array.from({ length: 8 }).map((_, i) => (
      <div key={i} style={{ 
        background: '#28a745', 
        color: 'white',
        padding: '1rem', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        Auto Item {i + 1}
      </div>
    ))
  }
};

export const GapVariations: Story = {
  args: {
    columns: 4,
    columnGap: '2rem',
    rowGap: '1rem',
    children: Array.from({ length: 8 }).map((_, i) => (
      <div key={i} style={{ 
        background: '#6f42c1', 
        color: 'white',
        padding: '1rem', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        Gap Item {i + 1}
      </div>
    ))
  }
};

export const AlignmentExamples: Story = {
  args: {
    columns: 3,
    gap: '1rem',
    justifyItems: 'center',
    alignItems: 'center',
    style: { height: '200px' },
    children: Array.from({ length: 3 }).map((_, i) => (
      <div key={i} style={{ 
        background: '#fd7e14', 
        color: 'white',
        padding: '1rem', 
        borderRadius: '4px',
        width: '80px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {i + 1}
      </div>
    ))
  }
};

export const AutoFlowDense: Story = {
  args: {
    columns: 3,
    gap: '1rem',
    autoFlow: 'dense',
    children: [
      <div key={1} style={{ 
        gridColumn: 'span 2',
        background: '#dc3545', 
        color: 'white',
        padding: '1rem',
        borderRadius: '4px'
      }}>
        Wide Item (span 2)
      </div>,
      <div key={2} style={{ 
        background: '#17a2b8', 
        color: 'white',
        padding: '1rem',
        borderRadius: '4px'
      }}>
        Regular Item
      </div>,
      <div key={3} style={{ 
        background: '#ffc107', 
        color: 'black',
        padding: '1rem',
        borderRadius: '4px'
      }}>
        Regular Item
      </div>,
      <div key={4} style={{ 
        gridRow: 'span 2',
        background: '#20c997', 
        color: 'white',
        padding: '1rem',
        borderRadius: '4px'
      }}>
        Tall Item (span 2)
      </div>
    ]
  }
};

export const ComplexDashboardLayout: Story = {
  args: {
    templateAreas: `
      "header header header"
      "sidebar charts charts"
      "sidebar stats alerts"
      "footer footer footer"
    `,
    templateColumns: '250px 1fr 300px',
    templateRows: '60px 1fr 1fr 50px',
    gap: '1rem',
    style: { height: '600px' },
    children: [
      <div key="header" style={{ 
        gridArea: 'header',
        background: '#3178c6', 
        color: 'white',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px'
      }}>
        <h2 style={{ margin: 0 }}>Dashboard Header</h2>
      </div>,
      <div key="sidebar" style={{ 
        gridArea: 'sidebar',
        background: '#f8f9fa', 
        padding: '1rem',
        borderRadius: '4px'
      }}>
        <h3>Sidebar</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Overview</li>
          <li>Analytics</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>,
      <div key="charts" style={{ 
        gridArea: 'charts',
        background: 'white', 
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <h3>Charts & Analytics</h3>
        <p>Interactive charts area</p>
      </div>,
      <div key="stats" style={{ 
        gridArea: 'stats',
        background: '#e9ecef', 
        padding: '1rem',
        borderRadius: '4px'
      }}>
        <h3>Quick Stats</h3>
        <p>Performance metrics</p>
      </div>,
      <div key="alerts" style={{ 
        gridArea: 'alerts',
        background: '#fff3cd', 
        padding: '1rem',
        borderRadius: '4px',
        border: '1px solid #ffeaa7'
      }}>
        <h3>Alerts</h3>
        <p>System notifications</p>
      </div>,
      <div key="footer" style={{ 
        gridArea: 'footer',
        background: '#343a40', 
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        borderRadius: '4px'
      }}>
        Dashboard Footer
      </div>
    ]
  }
};

export const GridLinePositioning: Story = {
  args: {
    templateColumns: 'repeat(4, 1fr)',
    templateRows: 'repeat(3, 100px)',
    gap: '0.5rem',
    style: { height: '320px' },
    children: [
      <div key="wide" style={{ 
        gridColumn: '1 / 3',
        gridRow: '1',
        background: '#007bff', 
        color: 'white',
        padding: '1rem',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Col 1-2, Row 1
      </div>,
      <div key="tall" style={{ 
        gridColumn: '3',
        gridRow: '1 / 3',
        background: '#28a745', 
        color: 'white',
        padding: '1rem',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Col 3, Row 1-2
      </div>,
      <div key="positioned" style={{ 
        gridColumn: '2 / 4',
        gridRow: '2 / 4',
        background: '#dc3545', 
        color: 'white',
        padding: '1rem',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Col 2-3, Row 2-3
      </div>,
      <div key="small" style={{ 
        gridColumn: '4',
        gridRow: '3',
        background: '#ffc107', 
        color: 'black',
        padding: '1rem',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Col 4, Row 3
      </div>
    ]
  }
};

export const ResponsiveTemplateAreas: Story = {
  args: {
    templateAreas: {
      xs: `"header" "main" "footer"`,
      md: `"header header" "sidebar main" "footer footer"`,
      lg: `"header header header" "sidebar main main" "footer footer footer"`
    } as any,
    templateColumns: {
      xs: '1fr',
      md: '200px 1fr',
      lg: '250px 1fr 1fr'
    } as any,
    gap: '1rem',
    style: { minHeight: '400px' },
    children: [
      <div key="header" style={{ 
        gridArea: 'header',
        background: '#3178c6', 
        color: 'white',
        padding: '1rem',
        borderRadius: '4px'
      }}>
        Header
      </div>,
      <div key="sidebar" style={{ 
        gridArea: 'sidebar',
        background: '#f8f9fa', 
        padding: '1rem',
        borderRadius: '4px'
      }}>
        Sidebar
      </div>,
      <div key="main" style={{ 
        gridArea: 'main',
        background: 'white', 
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        Main Content
      </div>,
      <div key="footer" style={{ 
        gridArea: 'footer',
        background: '#343a40', 
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        borderRadius: '4px'
      }}>
        Footer
      </div>
    ]
  }
};