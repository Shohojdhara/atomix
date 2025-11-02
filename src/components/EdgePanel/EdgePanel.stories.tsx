import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { Button } from '../Button/Button';
import { EdgePanel } from './EdgePanel';
import { Card } from '../Card/Card';

const meta = {
  title: 'Components/EdgePanel',
  component: EdgePanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'EdgePanel is a versatile sliding panel that can appear from any edge of the screen. Commonly used for mobile navigation, filters, chat windows, or contextual actions.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Position of the edge panel',
    },
    mode: {
      control: { type: 'select' },
      options: ['slide', 'push', 'none'],
      description: 'Animation mode of the panel',
    },
    backdrop: {
      control: 'boolean',
      description: 'Show backdrop behind the panel',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Close the panel when clicking on backdrop',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close the panel when pressing Escape key',
    },
    title: {
      control: 'text',
      description: 'Panel title',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the panel is open (controlled component)',
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1605440704530-cd6f40ecf5a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EdgePanel>;

export default meta;
type Story = StoryObj<typeof EdgePanel>;

// Placeholder for demonstration content
const DemoPanelContent = ({
  position,
  mode,
  backdrop,
  closeOnBackdropClick,
  closeOnEscape,
}: any) => (
  <>
    <p className="u-mb-3">
      This is an Edge Panel that slides in from the <strong>{position}</strong> edge.
    </p>

    <div
      className="u-mb-3 u-p-3"
      style={{ background: 'var(--at-secondary-bg-subtle)', borderRadius: '8px' }}
    >
      <h5 className="u-mb-2">Configuration</h5>
      <ul className="u-list-none u-pl-0 u-mb-0">
        <li className="u-mb-1">
          <strong>Position:</strong> {position}
        </li>
        <li className="u-mb-1">
          <strong>Mode:</strong> {mode}
        </li>
        <li className="u-mb-1">
          <strong>Backdrop:</strong> {backdrop ? 'Visible' : 'Hidden'}
        </li>
        <li className="u-mb-1">
          <strong>Close on backdrop:</strong> {closeOnBackdropClick ? 'Yes' : 'No'}
        </li>
        <li>
          <strong>Close on ESC key:</strong> {closeOnEscape ? 'Yes' : 'No'}
        </li>
      </ul>
    </div>

    <p className="u-mb-3">Common uses include:</p>
    <ul>
      <li>
        <strong>Start:</strong> Navigation menu, filters
      </li>
      <li>
        <strong>End:</strong> Notifications, chat windows
      </li>
      <li>
        <strong>Top:</strong> Alerts, confirmation messages
      </li>
      <li>
        <strong>Bottom:</strong> Action sheets, mobile keyboards
      </li>
    </ul>
  </>
);

// Controller component to demonstrate the EdgePanel
const EdgePanelController = ({
  position,
  mode,
  backdrop,
  closeOnBackdropClick,
  closeOnEscape,
  title,
  glass,
}: any) => {
  const [open, setOpen] = useState(false);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('is-edgepanel-open');
    };
  }, []);

  return (
    <div>
      <Button label={`Open ${position} panel`} variant="primary" onClick={() => setOpen(true)} />

      <EdgePanel
        position={position}
        mode={mode}
        backdrop={backdrop}
        closeOnBackdropClick={closeOnBackdropClick}
        closeOnEscape={closeOnEscape}
        isOpen={open}
        onOpenChange={isOpen => setOpen(isOpen)}
        title={title || `Edge Panel (${position})`}
        glass={glass}
      >
        <DemoPanelContent
          position={position}
          mode={mode}
          backdrop={backdrop}
          closeOnBackdropClick={closeOnBackdropClick}
          closeOnEscape={closeOnEscape}
        />
      </EdgePanel>
    </div>
  );
};

// Position Variants
export const Start: Story = {
  render: () => (
    <EdgePanelController
      position="start"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

export const End: Story = {
  render: () => (
    <EdgePanelController
      position="end"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

export const Top: Story = {
  render: () => (
    <EdgePanelController
      position="top"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
      glass={true}
    />
  ),
};

export const Bottom: Story = {
  render: () => (
    <EdgePanelController
      position="bottom"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

// Mode Variants
export const PushMode: Story = {
  parameters: {
    docs: { description: { story: 'Push mode moves page content when the panel opens.' } },
  },
  render: () => (
    <EdgePanelController
      position="start"
      mode="push"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

export const NoneMode: Story = {
  parameters: { docs: { description: { story: 'None mode disables animation completely.' } } },
  render: () => (
    <EdgePanelController
      position="start"
      mode="none"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

// Backdrop Variants
export const NoBackdrop: Story = {
  parameters: { docs: { description: { story: 'Panel without backdrop overlay.' } } },
  render: () => (
    <EdgePanelController
      position="start"
      mode="slide"
      backdrop={false}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

// Feature Examples
export const MobileNavigation: Story = {
  parameters: { docs: { description: { story: 'Example of a mobile navigation menu.' } } },
  render: () => (
    <EdgePanelController
      position="start"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
      title="Navigation"
    />
  ),
};

// Glass Variant Stories
export const GlassStart: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Edge Panel with glass morphism effect from start position. The glass effect blurs and distorts the background content behind it.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      return () => {
        document.body.classList.remove('is-edgepanel-open');
      };
    }, []);

    return (
      <div>
        <Button label="Open Glass Panel (Start)" variant="primary" onClick={() => setOpen(true)} />

        <EdgePanel
          position="start"
          mode="slide"
          backdrop={true}
          closeOnBackdropClick={true}
          closeOnEscape={true}
          isOpen={open}
          onOpenChange={setOpen}
          title="Glass Panel"
          glass={
            {
              mode: 'standard',
              displacementScale: 50,
              blurAmount: 2,
              saturation: 150,
            } as any
          }
        >
          <DemoPanelContent
            position="start"
            mode="slide"
            backdrop={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
          />
        </EdgePanel>
      </div>
    );
  },
};

export const GlassEnd: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Edge Panel with glass morphism effect from end position. Notice how the background is visible through the glass.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      return () => {
        document.body.classList.remove('is-edgepanel-open');
      };
    }, []);

    return (
      <div>
        <Button label="Open Glass Panel (End)" variant="secondary" onClick={() => setOpen(true)} />

        <EdgePanel
          position="end"
          mode="slide"
          backdrop={true}
          closeOnBackdropClick={true}
          closeOnEscape={true}
          isOpen={open}
          onOpenChange={setOpen}
          title="Glass Panel"
          glass={
            {
              mode: 'polar',
              displacementScale: 60,
              blurAmount: 1.5,
              saturation: 170,
            } as any
          }
        >
          <DemoPanelContent
            position="end"
            mode="slide"
            backdrop={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
          />
        </EdgePanel>
      </div>
    );
  },
};

export const GlassCustom: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge Panel with custom glass effect configuration using shader mode.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      return () => {
        document.body.classList.remove('is-edgepanel-open');
      };
    }, []);

    return (
      <div>
        <Button label="Open Custom Glass Panel" variant="primary" onClick={() => setOpen(true)} />

        <EdgePanel
          position="end"
          mode="slide"
          backdrop={true}
          closeOnBackdropClick={true}
          closeOnEscape={true}
          isOpen={open}
          onOpenChange={setOpen}
          title="Custom Glass Panel"
          glass={
            {
              mode: 'shader',
              shaderVariant: 'liquidGlass',
              displacementScale: 70,
              blurAmount: 1.8,
              saturation: 170,
              cornerRadius: 0,
            } as any
          }
        >
          <div>
            <p className="u-mb-4">
              This panel features a custom glass effect with shader mode for premium visual quality.
            </p>

            <Card
              title="Glass Effect Settings"
              text="The glass morphism uses liquid glass shader variant with custom displacement and saturation."
              className="u-mb-3"
            />

            <Card
              title="Premium Visual Quality"
              text="Shader-based glass effects provide the highest quality appearance with smooth transitions."
              className="u-mb-3"
            />

            <Button label="Action" variant="primary" className="u-w-full" />
          </div>
        </EdgePanel>
      </div>
    );
  },
};

export const GlassPremium: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge Panel with premium glass shader variant for high-end UI.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      return () => {
        document.body.classList.remove('is-edgepanel-open');
      };
    }, []);

    return (
      <div>
        <Button label="Open Premium Glass Panel" variant="primary" onClick={() => setOpen(true)} />

        <EdgePanel
          position="start"
          mode="slide"
          backdrop={true}
          closeOnBackdropClick={true}
          closeOnEscape={true}
          isOpen={open}
          onOpenChange={setOpen}
          title="Premium Glass"
          glass={
            {
              mode: 'shader',
              shaderVariant: 'premiumGlass',
              displacementScale: 180,
              blurAmount: 1,
              saturation: 60,
              cornerRadius: 0,
            } as any
          }
        >
          <div>
            <h5 className="u-mb-3">Premium Features</h5>

            <Card
              title="Enhanced Visuals"
              text="Premium glass shader provides the most refined appearance."
              glass
              className="u-mb-3"
            />

            <Card
              title="Perfect for Modern Apps"
              text="Ideal for applications requiring sophisticated UI design."
              glass
              className="u-mb-3"
            />

            <div className="u-mt-4">
              <Button label="Get Started" variant="primary" className="u-w-full u-mb-2" />
              <Button label="Learn More" variant="secondary" className="u-w-full" />
            </div>
          </div>
        </EdgePanel>
      </div>
    );
  },
};

export const GlassShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all glass modes and variants for Edge Panel.',
      },
    },
  },
  render: () => {
    const [openPanels, setOpenPanels] = useState({
      standard: false,
      polar: false,
      prominent: false,
      liquid: false,
      premium: false,
    });

    useEffect(() => {
      return () => {
        document.body.classList.remove('is-edgepanel-open');
      };
    }, []);

    const togglePanel = (panel: string) => {
      setOpenPanels(prev => ({
        ...prev,
        [panel]: !prev[panel as keyof typeof prev],
      }));
    };

    return (
      <div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            label="Standard Glass"
            variant="primary"
            onClick={() => togglePanel('standard')}
          />
          <Button label="Polar Glass" variant="secondary" onClick={() => togglePanel('polar')} />
          <Button
            label="Prominent Glass"
            variant="tertiary"
            onClick={() => togglePanel('prominent')}
          />
          <Button label="Liquid Glass" variant="info" onClick={() => togglePanel('liquid')} />
          <Button label="Premium Glass" variant="success" onClick={() => togglePanel('premium')} />

          {/* Standard Glass Mode */}
          <EdgePanel
            position="start"
            mode="slide"
            backdrop={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
            isOpen={openPanels.standard}
            onOpenChange={isOpen => setOpenPanels(prev => ({ ...prev, standard: isOpen }))}
            title="Standard Glass Mode"
            glass={
              {
                mode: 'standard',
                displacementScale: 25,
                blurAmount: 1.2,
                saturation: 140,
                cornerRadius: 0,
              } as any
            }
          >
            <div>
              <h5 className="u-mb-3">Standard Glass Effect</h5>
              <p className="u-mb-4">
                Classic glass morphism with balanced displacement and blur for general use.
              </p>
              <Card title="Balanced Design" text="Perfect for everyday applications." glass />
            </div>
          </EdgePanel>

          {/* Polar Glass Mode */}
          <EdgePanel
            position="end"
            mode="slide"
            backdrop={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
            isOpen={openPanels.polar}
            onOpenChange={isOpen => setOpenPanels(prev => ({ ...prev, polar: isOpen }))}
            title="Polar Glass Mode"
            glass={
              {
                mode: 'polar',
                displacementScale: 35,
                blurAmount: 1.5,
                saturation: 160,
                cornerRadius: 0,
              } as any
            }
          >
            <div>
              <h5 className="u-mb-3">Polar Glass Effect</h5>
              <p className="u-mb-4">
                Enhanced polar distortion creates unique radial patterns from center.
              </p>
              <Card
                title="Radial Distortion"
                text="Creates circular displacement patterns."
                glass
              />
            </div>
          </EdgePanel>

          {/* Prominent Glass Mode */}
          <EdgePanel
            position="start"
            mode="slide"
            backdrop={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
            isOpen={openPanels.prominent}
            onOpenChange={isOpen => setOpenPanels(prev => ({ ...prev, prominent: isOpen }))}
            title="Prominent Glass Mode"
            glass={
              {
                mode: 'prominent',
                displacementScale: 50,
                blurAmount: 2,
                saturation: 180,
                cornerRadius: 0,
              } as any
            }
          >
            <div>
              <h5 className="u-mb-3">Prominent Glass Effect</h5>
              <p className="u-mb-4">
                Stronger displacement and blur for bold, eye-catching interfaces.
              </p>
              <Card title="Bold Appearance" text="Maximum visual impact and depth." glass />
            </div>
          </EdgePanel>

          {/* Liquid Glass Shader */}
          <EdgePanel
            position="end"
            mode="slide"
            backdrop={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
            isOpen={openPanels.liquid}
            onOpenChange={isOpen => setOpenPanels(prev => ({ ...prev, liquid: isOpen }))}
            title="Liquid Glass Shader"
            glass={
              {
                mode: 'shader',
                shaderVariant: 'liquidGlass',
                displacementScale: 70,
                blurAmount: 1.8,
                saturation: 170,
                cornerRadius: 0,
              } as any
            }
          >
            <div>
              <h5 className="u-mb-3">Liquid Glass Shader</h5>
              <p className="u-mb-4">
                GPU-accelerated shader-based glass with fluid, organic distortion patterns.
              </p>
              <Card
                title="Premium Quality"
                text="Smooth, flowing distortions powered by WebGL shaders."
                glass
              />
            </div>
          </EdgePanel>

          {/* Premium Glass Shader */}
          <EdgePanel
            position="start"
            mode="slide"
            backdrop={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
            isOpen={openPanels.premium}
            onOpenChange={isOpen => setOpenPanels(prev => ({ ...prev, premium: isOpen }))}
            title="Premium Glass Shader"
            glass={
              {
                mode: 'shader',
                shaderVariant: 'premiumGlass',
                displacementScale: 180,
                blurAmount: 1,
                saturation: 60,
                cornerRadius: 0,
              } as any
            }
          >
            <div>
              <h5 className="u-mb-3">Premium Glass Shader</h5>
              <p className="u-mb-4">
                Highest quality glass effect with refined, sophisticated appearance.
              </p>
              <Card
                title="Elite Design"
                text="The pinnacle of glass morphism for luxury applications."
                glass
              />
            </div>
          </EdgePanel>
        </div>
      </div>
    );
  },
};
