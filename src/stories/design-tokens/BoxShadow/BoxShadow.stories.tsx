import { Meta, StoryObj } from '@storybook/react';

interface ShadowExampleProps {
  name: string;
  size: string;
  shadow: string;
  isDark?: boolean;
  darkShadow?: string;
}

const ShadowExample = ({ name, size, shadow, isDark = false, darkShadow }: ShadowExampleProps) => {
  const currentShadow = isDark && darkShadow ? darkShadow : shadow;

  return (
    <div className="o-grid__col o-grid__col--xs-12 o-grid__col--md-4 o-grid__col--lg-3">
      <div className="u-flex u-flex-column u-gap-2">
        <span className="u-text-sm u-font-semibold">{name}</span>
        <code
          className="u-py-2 u-px-4 u-bg-body-subtle u-rounded-md u-text-xs u-shadow-inset u-border u-border-primary-subtle"
          style={{ minHeight: '50px' }}
        >
          {currentShadow}
        </code>
      </div>
      <div
        className={`u-shadow-${size} u-bg-body-subtle u-rounded-md u-py-2 u-px-4 u-mt-2`}
        style={{ minHeight: '100px' }}
      ></div>
    </div>
  );
};

const BoxShadowPreview = () => {
  const shadows = [
    {
      name: 'Shadow',
      size: '',
      light: '0 8px 16px rgba(0, 0, 0, 0.15)',
      dark: '0px 8px 40px -8px rgba(30, 30, 30, 0.70), 0px 4px 20px 0px rgba(30, 30, 30, 0.80)',
    },
    {
      name: 'Extra Small',
      size: 'xs',
      light: '0px 1px 2px 0px rgba(45, 54, 67, 0.04), 0px 2px 4px 0px rgba(45, 54, 67, 0.08)',
      dark: '0px 1px 2px 0px rgba(30, 30, 30, 0.50), 0px 2px 4px 0px rgba(30, 30, 30, 0.50)',
    },
    {
      name: 'Small',
      size: 'sm',
      light: '0 2px 4px rgba(0, 0, 0, 0.075)',
      dark: '0px 2px 4px -2px rgba(30, 30, 30, 0.50), 0px 4px 8px -2px rgba(30, 30, 30, 0.50)',
    },
    {
      name: 'Large',
      size: 'lg',
      light: '0 16px 48px rgba(0, 0, 0, 0.175)',
      dark: '0px 8px 18px -2px rgba(30, 30, 30, 0.50), 0px 8px 24px -2px rgba(30, 30, 30, 0.50)',
    },
    {
      name: 'Extra Large',
      size: 'xl',
      light: '0px 16px 64px -8px rgba(45, 54, 67, 0.14)',
      dark: '0px 33px 61px -8px rgba(30, 30, 30, 0.90), 0px 8px 10px 0px rgba(30, 30, 30, 0.90)',
    },
    {
      name: 'Inset',
      size: 'inset',
      light: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',
      dark: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)',
    },
  ];

  return (
    <div className={`o-container u-py-12`}>
      <h1 className="u-mb-8">Box Shadows</h1>

      <section className="u-py-10 u-px-4 u-border u-border-dashed u-border-primary-subtle u-rounded-md">
        <h2 className="u-mb-2">Shadow Variants</h2>
        <p className="u-mb-4">
          These are the available box shadow variants in the design system. They automatically
          adjust between light and dark modes.
        </p>

        <div className="o-grid u-row-gap-4">
          {shadows.map(shadow => (
            <ShadowExample
              key={shadow.name}
              name={shadow.name}
              size={shadow.size}
              shadow={shadow.light}
              darkShadow={shadow.dark}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default {
  title: 'Design Tokens',
  component: BoxShadowPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Box shadow tokens and usage examples for the Atomix design system.',
      },
    },
  },
} as Meta<typeof BoxShadowPreview>;

type Story = StoryObj<typeof BoxShadowPreview>;

export const BoxShadow: Story = {};
