import type { Meta, StoryObj } from '@storybook/react';
import { AtomixGlass } from './AtomixGlass';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/new',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen', // Use fullscreen to better see the effect
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    displacementScale: { control: { type: 'range', min: 0, max: 200, step: 1 } },
    blurAmount: { control: { type: 'range', min: -1, max: 1, step: 0.001 } },
    saturation: { control: { type: 'range', min: 100, max: 200, step: 1 } },
    aberrationIntensity: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    elasticity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    cornerRadius: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    overLight: { control: 'boolean' },
    mode: { control: 'select', options: ['standard', 'polar', 'prominent', 'shader'] },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

const StoryContainer = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate offset as a percentage
      const offsetX = ((e.clientX - centerX) / rect.width) * 100;
      const offsetY = ((e.clientY - centerY) / rect.height) * 100;

      setBackgroundPosition({ x: offsetX, y: offsetY });
    }
  }, []);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      return () => {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1663882658055-40f1d4249867?q=80&w=3807&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: '160%',
        backgroundPosition: `calc(50% + ${backgroundPosition.x}px) calc( 50% + ${backgroundPosition.y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const InteractiveWrapper = ({
  children,
}: {
  children: (
    mousePos: { x: number; y: number },
    mouseOffset: { x: number; y: number },
    containerRef: RefObject<HTMLDivElement>
  ) => React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMouseOffset({
        x: ((e.clientX - centerX) / rect.width) * 100,
        y: ((e.clientY - centerY) / rect.height) * 100,
      });
    }
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const currentRef = containerRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);
    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {children(mousePos, mouseOffset, containerRef)}
    </div>
  );
};

export const Default: Story = {
  args: {
    children: <div className="u-fw-semibold">Atomix Glass</div>,
    displacementScale: 120,
    blurAmount: -0,
    saturation: 140,
    aberrationIntensity: 0,
    padding: '50px 200px',
    elasticity: 0,
    cornerRadius: 60,
    overLight: false,
    mode: 'standard',
  },
  decorators: [
    Story => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
};

export const Interactive: Story = {
  render: args => (
    <InteractiveWrapper>
      {(mousePos, mouseOffset, containerRef) => (
        <StoryContainer>
          <AtomixGlass
            {...args}
            globalMousePos={mousePos}
            mouseOffset={mouseOffset}
            mouseContainer={containerRef}
          >
            {args.children}
          </AtomixGlass>
        </StoryContainer>
      )}
    </InteractiveWrapper>
  ),
  args: {
    ...Default.args,
    children: <div className="u-fw-semibold">Move your mouse</div>,
    elasticity: 0.2,
  },
};

export const PolarMode: Story = {
  ...Interactive,
  args: {
    ...Interactive.args,
    mode: 'polar',
    children: <div className="u-fw-semibold">Polar Mode</div>,
  },
};

export const ProminentMode: Story = {
  ...Interactive,
  args: {
    ...Interactive.args,
    mode: 'prominent',
    children: <div className="u-fw-semibold">Prominent Mode</div>,
  },
};

export const ShaderMode: Story = {
  ...Interactive,
  args: {
    ...Interactive.args,
    mode: 'shader',
    children: <div className="u-fw-semibold">Shader Mode</div>,
  },
};

export const OverLight: Story = {
  ...Interactive,
  args: {
    ...Interactive.args,
    overLight: true,
    children: <div className="u-fw-semibold">Over Light</div>,
    displacementScale: 23,
  },
  decorators: [
    Story => (
      <InteractiveWrapper>
        {(mousePos, mouseOffset, containerRef) => (
          <StoryContainer
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: '120%',
                backgroundPosition: `calc(40% + ${mouseOffset.x}px) calc( 50% + ${mouseOffset.y}px)`,
            }}
          >
            <AtomixGlass
              {...Interactive.args}
              overLight={true}
              globalMousePos={mousePos}
              mouseOffset={mouseOffset}
              mouseContainer={containerRef}
              
            >
              <div className="u-fw-semibold">Over Light</div>
            </AtomixGlass>
          </StoryContainer>
        )}
      </InteractiveWrapper>
    ),
  ],
};

export const Clickable: Story = {
  ...Interactive,
  args: {
    ...Interactive.args,
    onClick: () => alert('Clicked!'),
    children: <div className="u-fw-semibold">Click Me</div>,
  },
};



