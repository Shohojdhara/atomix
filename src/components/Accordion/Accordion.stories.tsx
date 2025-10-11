import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { ACCORDION } from '../../lib/constants/components';
import type { AtomixGlassProps } from '../../lib/types/components';

// Extract class names without the leading dots
const ACCORDION_CLASS = ACCORDION.SELECTORS.ACCORDION.replace('.', '');
const HEADER_CLASS = ACCORDION.SELECTORS.HEADER.replace('.', '');
const PANEL_CLASS = ACCORDION.SELECTORS.PANEL.replace('.', '');
const BODY_CLASS = ACCORDION.SELECTORS.BODY.replace('.', '');
const IS_OPEN_CLASS = ACCORDION.CLASSES.IS_OPEN;
const IS_DISABLED_CLASS = ACCORDION.CLASSES.IS_DISABLED;

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The Accordion component follows Atomix guidelines for accessibility, styling, and state. It supports both controlled and uncontrolled modes, custom icons, and full keyboard navigation.',
      },
    },
  },
  argTypes: {
    iconPosition: {
      control: { type: 'radio' },
      options: ['right', 'left'],
      description: 'Position of the icon',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the accordion is initially open',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    title: {
      control: 'text',
      description: 'Title of the accordion',
    },
    children: {
      control: 'text',
      description: 'Content inside the accordion',
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Accordion (Closed)
export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: <p>This is the content of the accordion that appears when expanded.</p>,
  },
};

// Open Accordion
export const Open: Story = {
  args: {
    title: 'Open Accordion',
    children: <p>This accordion is open, showing its content.</p>,
    defaultOpen: true,
  },
};

// Disabled Accordion
export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion',
    children: <p>This accordion is disabled.</p>,
    disabled: true,
  },
};

// Icon on Left
export const IconLeft: Story = {
  args: {
    title: 'Icon on Left',
    children: <p>This accordion has the icon on the left side.</p>,
    iconPosition: 'left',
  },
};

// Custom Icon
export const CustomIcon: Story = {
  args: {
    title: 'Custom Icon',
    children: <p>This accordion uses a custom plus icon.</p>,
    icon: (
      <i className="c-accordion__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </i>
    ),
  },
};

// Accordion Group
export const AccordionGroup: Story = {
  args: {
    title: 'Accordion Group',
    children: <p>Group example - see render function</p>,
  },
  render: () => (
    <div>
      <h2>Accordion Group</h2>
      <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '500px' }}>
        <Accordion title="First Accordion" defaultOpen={true}>
          <p>Content of the first accordion.</p>
        </Accordion>

        <Accordion title="Second Accordion">
          <p>Content of the second accordion.</p>
        </Accordion>

        <Accordion title="Third Accordion">
          <p>Content of the third accordion with more content.</p>
          <p>Additional paragraph to demonstrate scrolling.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </Accordion>
      </div>
    </div>
  ),
};

// All Variants
export const AllVariants: Story = {
  args: {
    title: 'All Variants',
    children: <p>See render function for all variants</p>,
  },
  render: () => (
    <div>
      <h2>All Accordion Variants</h2>
      <div className="u-d-flex u-flex-column u-gap-5">
        <div>
          <h3>Default</h3>
          <Accordion title="Default Accordion">
            <p>This is the default accordion.</p>
          </Accordion>
        </div>

        <div>
          <h3>Initially Open</h3>
          <Accordion title="Initially Open Accordion" defaultOpen={true}>
            <p>This accordion starts in the open state.</p>
          </Accordion>
        </div>

        <div>
          <h3>Disabled</h3>
          <Accordion title="Disabled Accordion" disabled={true}>
            <p>This accordion is disabled and cannot be interacted with.</p>
          </Accordion>
        </div>

        <div>
          <h3>Icon on Left</h3>
          <Accordion title="Icon on Left" iconPosition="left">
            <p>This accordion has its icon positioned on the left.</p>
          </Accordion>
        </div>

        <div>
          <h3>Custom Icon</h3>
          <Accordion
            title="Custom Icon"
            icon={
              <i className="c-accordion__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </i>
            }
          >
            <p>This accordion uses a custom plus icon.</p>
          </Accordion>
        </div>

        <div>
          <h3>With Rich Content</h3>
          <Accordion title="Rich Content">
            <div>
              <h4>Section Title</h4>
              <p>
                This accordion contains rich HTML content including headings, paragraphs, and lists.
              </p>
              <ul>
                <li>
                  List item with <a href="#">link</a>
                </li>
                <li>
                  List item with <strong>bold text</strong>
                </li>
                <li>
                  List item with <em>italic text</em>
                </li>
              </ul>
              <div className="u-p-3 u-mt-3 u-bg-light u-border-radius-1">
                <code>This is a code block inside the accordion</code>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  ),
};

// Controlled Accordion
export const Controlled: Story = {
  args: {
    title: 'Controlled Accordion',
    children: <p>This accordion is controlled by external state.</p>,
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button className="c-btn c-btn--primary u-mb-3" onClick={() => setOpen(prev => !prev)}>
          Toggle Accordion (Controlled)
        </button>
        <Accordion title="Controlled Accordion" isOpen={open} onOpenChange={setOpen}>
          <p>This accordion is controlled by external state.</p>
        </Accordion>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled Accordion using the `isOpen` and `onOpenChange` props.',
      },
    },
  },
};

// Glass Variant
export const Glass: Story = {
  args: {
    title: 'Glass Accordion',
    children: <p>This accordion has a glass morphism effect applied.</p>,
    glass: true,
  },
  render: args => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1759915995309-404c743bfbf9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        borderRadius: '12px',
        height: '97vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <Accordion {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an Accordion with glass morphism effect enabled against a gradient background.',
      },
    },
  },
};

// Glass with Custom Settings
export const GlassCustom: Story = {
  args: {
    title: 'Custom Glass Accordion',
    children: <p>This accordion has custom glass morphism settings.</p>,
    glass: {
      displacementScale: 180,
      blurAmount: 3,
      saturation: 60,
      cornerRadius: 4,
      mode: 'polar',
    } as AtomixGlassProps as any,
  },
  render: args => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1754147965582-edcb63324a81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: '120%',
        backgroundPosition: 'center',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '97vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'gradient 15s ease infinite',
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            20% { background-position: 70% 50%; }
            40% { background-position: 0% 50%; }
            50% { background-position: 50% 0%; }
            75% { background-position: 50% 50%; }
            100% { background-position: 50% 0%; }
          }
        `}
      </style>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <Accordion {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an Accordion with custom glass morphism settings against a scenic background image.',
      },
    },
  },
};

// Glass Accordion Group
export const GlassGroup: Story = {
  args: {
    title: 'Glass Accordion Group',
    children: <p>Group example with glass effect - see render function</p>,
    glass: {
      displacementScale: 180,
      blurAmount: 1,
      saturation: 60,
      cornerRadius: 4,
      mode: 'shader',
      ShaderVariant: 'premiumGlass',
    } as any,
  },
  render: () => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1623237353316-417116e040a5?q=80&w=3307&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: '150%',
        animation: 'gradient 15s ease infinite',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '97vh',
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <h2
        style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '2rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        Glass Accordion Group
      </h2>
      <div
        className="u-d-flex u-flex-column u-gap-3"
        style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
      >
        <Accordion title="First Glass Accordion" defaultOpen={true} glass>
          <p>Content of the first glass accordion with beautiful glass morphism effect.</p>
        </Accordion>

        <Accordion title="Second Glass Accordion" glass>
          <p>Content of the second glass accordion showcasing the glass effect.</p>
        </Accordion>

        <Accordion title="Third Glass Accordion" glass>
          <p>Content of the third glass accordion with more content.</p>
          <p>Additional paragraph to demonstrate scrolling and glass effects.</p>
          <ul>
            <li>Glass effect item 1</li>
            <li>Glass effect item 2</li>
            <li>Glass effect item 3</li>
          </ul>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates multiple Accordions with glass morphism effects against an animated gradient background.',
      },
    },
  },
};

// Glass Mode Variants - Standard
export const GlassModeStandard: Story = {
  args: {
    title: 'Standard Glass Mode Accordion',
    children: (
      <div>
        <p>
          This accordion uses the standard glass mode with classic blur and displacement effects.
        </p>
        <p>The standard mode provides a refined glass appearance perfect for elegant interfaces.</p>
      </div>
    ),
    glass: {
      mode: 'standard',
      displacementScale: 60,
      blurAmount: 2,
      saturation: 160,
      aberrationIntensity: 2,
      cornerRadius: 4,
    } as any,
  },
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Standard Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
          Classic glass morphism with blur and displacement
        </p>
      </div>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Accordion {...args} />
      </div>
    </div>
  ),
};

// Glass Mode Variants - Polar
export const GlassModePolar: Story = {
  args: {
    title: 'Polar Glass Mode Accordion',
    children: (
      <div>
        <p>This accordion uses the polar glass mode with radial distortion effects.</p>
        <p>The polar mode creates unique distortion patterns emanating from the center point.</p>
      </div>
    ),
    glass: {
      mode: 'polar',
      displacementScale: 80,
      blurAmount: 1.5,
      saturation: 180,
      aberrationIntensity: 3,
      cornerRadius: 4,
    } as any,
  },
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Polar Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Radial distortion effect from center</p>
      </div>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Accordion {...args} />
      </div>
    </div>
  ),
};

// Glass Mode Variants - Prominent
export const GlassModeProminent: Story = {
  args: {
    title: 'Prominent Glass Mode Accordion',
    children: (
      <div>
        <p>This accordion uses the prominent glass mode with enhanced distortion effects.</p>
        <p>The prominent mode delivers maximum depth and visual impact for striking designs.</p>
      </div>
    ),
    glass: {
      mode: 'prominent',
      displacementScale: 100,
      blurAmount: 2.5,
      saturation: 200,
      aberrationIntensity: 4,
      cornerRadius: 4,
    } as any,
  },
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Prominent Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Enhanced distortion with maximum depth</p>
      </div>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Accordion {...args} />
      </div>
    </div>
  ),
};

// Glass Mode Variants - Shader
export const GlassModeShader: Story = {
  args: {
    title: 'Shader Glass Mode Accordion',
    children: (
      <div>
        <p>This accordion uses the shader glass mode with GPU-accelerated liquid glass effects.</p>
        <p>The shader mode provides smooth, performant animations with liquid glass dynamics.</p>
      </div>
    ),
    glass: {
      mode: 'shader',
      shaderVariant: 'liquidGlass',
      displacementScale: 70,
      blurAmount: 1.8,
      saturation: 170,
      cornerRadius: 4,
    } as any,
  },
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Shader Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>GPU-accelerated liquid glass effect</p>
      </div>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Accordion {...args} />
      </div>
    </div>
  ),
};

// All Glass Modes Comparison
export const AllGlassModesComparison: Story = {
  args: {
    title: 'Glass Modes Comparison',
    children: <p>Comparison example</p>,
  },
  render: () => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        overflow: 'auto',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem',
            fontSize: '2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Glass Mode Accordions Comparison
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Standard Mode */}
          <div>
            <h3
              style={{
                color: 'white',
                marginBottom: '1rem',
                fontSize: '1.25rem',
                textAlign: 'center',
              }}
            >
              Standard Mode
            </h3>
            <Accordion
              title="Standard Glass"
              glass={
                {
                  mode: 'standard',
                  displacementScale: 60,
                  blurAmount: 2,
                  saturation: 160,
                  aberrationIntensity: 2,
                } as any
              }
            >
              <p>Classic blur and displacement effects for a refined glass appearance.</p>
            </Accordion>
          </div>

          {/* Polar Mode */}
          <div>
            <h3
              style={{
                color: 'white',
                marginBottom: '1rem',
                fontSize: '1.25rem',
                textAlign: 'center',
              }}
            >
              Polar Mode
            </h3>
            <Accordion
              title="Polar Glass"
              glass={
                {
                  mode: 'polar',
                  displacementScale: 80,
                  blurAmount: 1.5,
                  saturation: 180,
                  aberrationIntensity: 3,
                } as any
              }
            >
              <p>Radial distortion effects emanating from the center point.</p>
            </Accordion>
          </div>

          {/* Prominent Mode */}
          <div>
            <h3
              style={{
                color: 'white',
                marginBottom: '1rem',
                fontSize: '1.25rem',
                textAlign: 'center',
              }}
            >
              Prominent Mode
            </h3>
            <Accordion
              title="Prominent Glass"
              glass={
                {
                  mode: 'prominent',
                  displacementScale: 100,
                  blurAmount: 2.5,
                  saturation: 200,
                  aberrationIntensity: 4,
                } as any
              }
            >
              <p>Enhanced distortion with maximum depth and visual impact.</p>
            </Accordion>
          </div>

          {/* Shader Mode */}
          <div>
            <h3
              style={{
                color: 'white',
                marginBottom: '1rem',
                fontSize: '1.25rem',
                textAlign: 'center',
              }}
            >
              Shader Mode
            </h3>
            <Accordion
              title="Shader Glass"
              glass={
                {
                  mode: 'shader',
                  shaderVariant: 'liquidGlass',
                  displacementScale: 70,
                  blurAmount: 1.8,
                  saturation: 170,
                } as any
              }
            >
              <p>GPU-accelerated liquid glass with smooth animations.</p>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Glass Accordion Interactive Showcase
export const GlassInteractiveShowcase: Story = {
  args: {
    title: 'Interactive Glass Accordion',
    children: <p>Interactive showcase</p>,
  },
  render: () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
      <div
        style={{
          background: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '3rem',
          borderRadius: '12px',
          minHeight: '95vh',
          overflow: 'auto',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: '3rem',
              fontSize: '2rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Interactive Glass Accordion Showcase
          </h2>

          <div className="u-d-flex u-flex-column u-gap-3">
            <Accordion
              title="Features & Benefits"
              isOpen={openIndex === 0}
              onOpenChange={open => setOpenIndex(open ? 0 : null)}
              glass={
                {
                  mode: 'standard',
                  displacementScale: 60,
                  blurAmount: 2,
                } as any
              }
            >
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Premium Glass Effects</h4>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Hardware-accelerated rendering</li>
                  <li>Smooth mouse-responsive animations</li>
                  <li>Multiple distortion modes</li>
                  <li>Customizable parameters</li>
                </ul>
              </div>
            </Accordion>

            <Accordion
              title="Technical Specifications"
              isOpen={openIndex === 1}
              onOpenChange={open => setOpenIndex(open ? 1 : null)}
              glass={
                {
                  mode: 'polar',
                  displacementScale: 70,
                  blurAmount: 1.8,
                } as any
              }
            >
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Performance & Compatibility</h4>
                <p>Optimized for modern browsers with WebGL support.</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>60 FPS animations</li>
                  <li>Responsive design</li>
                  <li>Accessibility compliant</li>
                  <li>Mobile-friendly</li>
                </ul>
              </div>
            </Accordion>

            <Accordion
              title="Customization Options"
              isOpen={openIndex === 2}
              onOpenChange={open => setOpenIndex(open ? 2 : null)}
              glass={
                {
                  mode: 'prominent',
                  displacementScale: 80,
                  blurAmount: 2.2,
                } as any
              }
            >
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Flexible Configuration</h4>
                <p>Customize every aspect of the glass effect:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>Blur amount and saturation</li>
                  <li>Displacement scale</li>
                  <li>Aberration intensity</li>
                  <li>Corner radius</li>
                  <li>Mode selection</li>
                </ul>
              </div>
            </Accordion>

            <Accordion
              title="Integration Guide"
              isOpen={openIndex === 3}
              onOpenChange={open => setOpenIndex(open ? 3 : null)}
              glass={
                {
                  mode: 'shader',
                  shaderVariant: 'liquidGlass',
                  displacementScale: 65,
                } as any
              }
            >
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Easy Implementation</h4>
                <p>Simple to integrate with your existing components:</p>
                <div
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '1rem',
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                  }}
                >
                  <code style={{ color: '#fff', fontSize: '0.875rem' }}>
                    {'<Accordion glass={true} />'}
                  </code>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    );
  },
};

// Glass Accordion with Rich Content
export const GlassRichContent: Story = {
  args: {
    title: 'Glass Accordion with Rich Content',
    children: <p>Rich content example</p>,
  },
  render: () => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        overflow: 'auto',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem',
            fontSize: '2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Glass Accordion with Rich Content
        </h2>

        <div className="u-d-flex u-flex-column u-gap-3">
          <Accordion title="Design Philosophy" defaultOpen={true} glass={true}>
            <div>
              <p style={{ marginBottom: '1rem' }}>
                Our glass morphism design combines modern aesthetics with practical functionality.
                The translucent effects create depth and visual hierarchy while maintaining
                readability.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <div
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.1)',
                    padding: '1rem',
                    borderRadius: '8px',
                  }}
                >
                  <h5 style={{ marginBottom: '0.5rem' }}>Aesthetic</h5>
                  <p style={{ fontSize: '0.875rem' }}>Beautiful, modern design</p>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.1)',
                    padding: '1rem',
                    borderRadius: '8px',
                  }}
                >
                  <h5 style={{ marginBottom: '0.5rem' }}>Functional</h5>
                  <p style={{ fontSize: '0.875rem' }}>Practical and usable</p>
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion
            title="Component Features"
            glass={
              {
                mode: 'polar',
                displacementScale: 70,
              } as any
            }
          >
            <div>
              <p style={{ marginBottom: '1rem' }}>
                Explore the comprehensive features available in our glass accordion component:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>✨ Glass morphism effects</div>
                <div>🎨 Multiple visual modes</div>
                <div>⚡ High performance</div>
                <div>♿ Accessibility ready</div>
                <div>📱 Mobile responsive</div>
                <div>🎯 Easy customization</div>
              </div>
            </div>
          </Accordion>

          <Accordion
            title="Implementation Examples"
            glass={
              {
                mode: 'shader',
                shaderVariant: 'liquidGlass',
              } as any
            }
          >
            <div>
              <p style={{ marginBottom: '1rem' }}>
                Multiple ways to implement glass effects in your application:
              </p>
              <div
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              >
                <code
                  style={{
                    color: '#fff',
                    fontSize: '0.875rem',
                    display: 'block',
                    whiteSpace: 'pre',
                  }}
                >
                  {`// Basic usage
<Accordion glass={true} />

// Custom configuration
<Accordion glass={{
  mode: 'polar',
  displacementScale: 70
}} />`}
                </code>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  ),
};
