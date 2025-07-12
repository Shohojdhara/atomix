import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Countdown } from './Countdown';

const meta = {
  title: 'Components/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    target: { control: 'date', description: 'Target date/time' },
    show: {
      control: 'check',
      options: ['days', 'hours', 'minutes', 'seconds'],
      description: 'Fields to show',
    },
    separator: { control: 'text', description: 'Separator string' },
    focused: { control: 'boolean', description: 'Focused style' },
  },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 45 + 1000 * 30); // 1d 45m 30s

export const Default: Story = {
  args: {
    target: futureDate,
  },
};

export const Focused: Story = {
  args: {
    target: futureDate,
    focused: true,
  },
};

export const CustomSeparator: Story = {
  args: {
    target: futureDate,
    separator: ' | ',
    show: ['hours', 'minutes', 'seconds'],
  },
};
