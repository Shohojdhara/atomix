import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Tooltip } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      defaultValue: 'top',
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click'],
      defaultValue: 'hover',
    },
    delay: {
      control: { type: 'number' },
      defaultValue: 200,
    },
    offset: {
      control: { type: 'number' },
      defaultValue: 10,
    },
    glass: {
      control: { type: 'boolean' },
      description: 'Enable glass morphism effect',
    },
  },
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = args => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  content: <p className="u-mb-0">This is a tooltip on top</p>,
  position: 'top',
  trigger: 'hover',
};

export const ClickTrigger = Template.bind({});
ClickTrigger.args = {
  content: <p className="u-mb-0">Click anywhere to close this tooltip</p>,
  position: 'top',
  trigger: 'click',
};

export const BottomPosition = Template.bind({});
BottomPosition.args = {
  content: <p className="u-mb-0">This tooltip appears below the trigger</p>,
  position: 'bottom',
};

export const LeftPosition = Template.bind({});
LeftPosition.args = {
  content: <p className="u-mb-0">This tooltip appears to the left</p>,
  position: 'left',
};

export const RightPosition = Template.bind({});
RightPosition.args = {
  content: <p className="u-mb-0">This tooltip appears to the right</p>,
  position: 'right',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  content: <p className="u-mb-0">Tooltips work great with icons</p>,
  position: 'top',
  children: <i className="icon-lux-info" style={{ fontSize: '24px', cursor: 'pointer' }}></i>,
};

export const CustomDelay = Template.bind({});
CustomDelay.args = {
  content: <p className="u-mb-0">This tooltip has a longer delay</p>,
  position: 'top',
  delay: 500,
};

export const CustomOffset = Template.bind({});
CustomOffset.args = {
  content: <p className="u-mb-0">This tooltip has a larger offset from the trigger</p>,
  position: 'top',
  offset: 20,
};

export const RichContent = Template.bind({});
RichContent.args = {
  content: (
    <div>
      <h4 style={{ marginTop: 0, marginBottom: '8px' }}>Rich Tooltip Content</h4>
      <ul style={{ margin: 0, paddingLeft: '16px' }}>
        <li>Supports HTML content</li>
        <li>Can include multiple elements</li>
        <li>Helpful for complex information</li>
      </ul>
    </div>
  ),
  position: 'bottom',
  trigger: 'click',
  offset: 15,
};

/**
 * Glass morphism tooltip example.
 */
export const GlassTooltip = Template.bind({});
GlassTooltip.args = {
  content: <p className="u-mb-0">This is a glass tooltip</p>,
  position: 'top',
  trigger: 'hover',
  glass: true,
};
GlassTooltip.decorators = [
  Story => (
    <div
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1764066183840-9afb28867988?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100dvh',
        width: '100dvw',
        margin: 0,
      }}
    >
      <Story />
    </div>
  ),
];

/**
 * Glass tooltip with custom settings.
 */
export const GlassTooltipCustom = Template.bind({});
GlassTooltipCustom.args = {
  content: <p className="u-mb-0">Custom glass tooltip with enhanced effects</p>,
  position: 'top',
  trigger: 'hover',
  glass: {
    displacementScale: 60,
    blurAmount: 2,
    saturation: 200,
    aberrationIntensity: 1,
    cornerRadius: 12,
    mode: 'polar',
  },
};
GlassTooltipCustom.decorators = [
  Story => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1758843412266-e8661a80ada2?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100dvh',
        width: '100dvw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Story />
    </div>
  ),
];

/**
 * Glass tooltip with click trigger.
 */
export const GlassTooltipClick = Template.bind({});
GlassTooltipClick.args = {
  content: <p className="u-mb-0">Click to show glass tooltip</p>,
  position: 'top',
  trigger: 'click',
  glass: true,
};
GlassTooltipClick.decorators = [
  Story => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1658937364065-60f3f6818724?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100dvh',
        width: '100dvw',
        margin: 0,
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Story />
    </div>
  ),
];

/**
 * Glass tooltip with different positions.
 */
export const GlassTooltipPositions = Template.bind({});
GlassTooltipPositions.args = {
  content: <p className="u-mb-0">Glass tooltip in different positions</p>,
  position: 'top',
  trigger: 'hover',
  glass: true,
};
GlassTooltipPositions.decorators = [
  Story => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1657617053432-09e4adf998bb?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100dvh',
        width: '100dvw',
        margin: 0,
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Story />
    </div>
  ),
];

/**
 * Glass tooltip with rich content.
 */
export const GlassTooltipRich = Template.bind({});
GlassTooltipRich.args = {
  content: (
    <div>
      <h4 style={{ marginTop: 0, marginBottom: '8px' }}>Glass Rich Tooltip</h4>
      <ul style={{ margin: 0, paddingLeft: '16px' }}>
        <li>Beautiful glass effect</li>
        <li>Supports rich content</li>
        <li>Modern design</li>
      </ul>
    </div>
  ),
  position: 'bottom',
  trigger: 'click',
  offset: 15,
  glass: true,
};
GlassTooltipRich.decorators = [
  Story => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1685334466570-6c6162e242b6?q=80&w=2534&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100dvh',
        width: '100dvw',
        margin: 0,
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Story />
    </div>
  ),
];
