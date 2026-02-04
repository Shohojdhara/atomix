import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import DatePicker from './DatePicker';
import { DateRange } from './types';
import { formatDateRange } from './utils';
import { SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DatePicker

## Overview

DatePicker provides a user-friendly interface for selecting dates or date ranges. It supports single date selection, date range selection, custom date formatting, and various display options. DatePickers are essential for forms requiring date input and provide calendar-based selection with keyboard navigation.

## Features

- Single date and date range selection
- Custom date formatting
- Minimum and maximum date constraints
- Inline and pop-up display modes
- Glass morphism effect option
- Week number display
- Today button option
- Clearable selection
- Read-only mode
- Multiple size options

## Accessibility

- Keyboard support: Navigate calendar with arrow keys, select with Enter
- Screen reader: Date selection and calendar navigation announced properly
- ARIA support: Roles and properties for calendar components
- Focus management: Maintains focus within the calendar controls

## Usage Examples

### Basic Usage

\`\`\`tsx
<DatePicker 
  placeholder="Select date..." 
  value={date} 
  onChange={setDate} 
/>
\`\`\`

### Range Selection

\`\`\`tsx
<DatePicker 
  selectionMode="range"
  value={range} 
  onChange={setRange} 
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| value | Date \\| DateRange \\| null | null | Selected date value or range |
| selectionMode | 'single' \\| 'range' | 'single' | Selection mode - single date or date range |
| minDate | Date | - | Minimum selectable date |
| maxDate | Date | - | Maximum selectable date |
| format | string | 'MM/dd/yyyy' | Date format string |
| placeholder | string | 'Select date...' | Placeholder text |
| disabled | boolean | false | Whether the date picker is disabled |
| readOnly | boolean | false | Whether the date picker is read-only |
| clearable | boolean | false | Whether the date can be cleared |
| showTodayButton | boolean | false | Whether to show a "Today" button |
| showWeekNumbers | boolean | false | Whether to show week numbers |
| inline | boolean | false | Whether to display inline (always visible) |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Size of the date picker |
| placement | Placement | 'bottom-start' | Position of the calendar dropdown |
| glass | boolean | false | Apply glass morphism effect to the calendar dropdown |
| onChange | (value: Date \\| DateRange) => void | - | Callback when date selection changes |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { 
      control: 'date', 
      description: 'Selected date value',
      table: {
        type: { summary: 'Date | DateRange | null' },
        defaultValue: { summary: 'null' },
      },
    },
    selectionMode: {
      control: { type: 'radio' },
      options: ['single', 'range'],
      description: 'Selection mode - single date or date range',
      table: {
        type: { summary: '"single" | "range"' },
        defaultValue: { summary: 'single' },
      },
    },
    minDate: { 
      control: 'date', 
      description: 'Minimum selectable date',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: '-' },
      },
    },
    maxDate: { 
      control: 'date', 
      description: 'Maximum selectable date',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: '-' },
      },
    },
    format: { 
      control: 'text', 
      description: 'Date format string',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'MM/dd/yyyy' },
      },
    },
    placeholder: { 
      control: 'text', 
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select date...' },
      },
    },
    disabled: { 
      control: 'boolean', 
      description: 'Whether the date picker is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    readOnly: { 
      control: 'boolean', 
      description: 'Whether the date picker is read-only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    clearable: { 
      control: 'boolean', 
      description: 'Whether the date can be cleared',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showTodayButton: { 
      control: 'boolean', 
      description: 'Whether to show a "Today" button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showWeekNumbers: { 
      control: 'boolean', 
      description: 'Whether to show week numbers',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    inline: { 
      control: 'boolean', 
      description: 'Whether to display inline (always visible)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size of the date picker',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    placement: {
      control: { type: 'select' },
      options: [
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
      description: 'Position of the calendar dropdown',
      table: {
        type: { summary: 'Placement' },
        defaultValue: { summary: 'bottom-start' },
      },
    },
    glass: {
      control: { type: 'boolean' },
      description: 'Apply glass morphism effect to the calendar dropdown',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onChange: {
      action: 'date changed',
      description: 'Callback when date selection changes',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    placeholder: 'Select date...',
    format: 'MM/dd/yyyy',
    clearable: true,
    showTodayButton: true,
    showWeekNumbers: false,
    size: 'md',
    placement: 'bottom-start',
    selectionMode: 'single',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="u-w-xs u-mt-20 u-mx-auto u-flex u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic DatePicker with default configuration.',
      },
    },
  },
};

export const WithInitialDate: Story = {
  args: {
    selectionMode: 'single',
  },
  render: args => {
    const initialDate = new Date();
    const [date, setDate] = useState<Date | null>(initialDate);
    return (
      <div className="u-w-xs u-mt-20 u-mx-auto u-flex u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with an initial date value.',
      },
    },
  },
};

export const DateRangeSelection: Story = {
  args: {
    selectionMode: 'range',
    placeholder: 'Select date range...',
    format: 'MM/dd/yyyy',
    clearable: true,
    showTodayButton: false,
    size: 'md',
    placement: 'bottom-start',
  },
  render: args => {
    const [range, setRange] = useState<DateRange | null>(null);
    return (
      <div className="u-w-xs u-mt-20 u-mx-auto u-flex u-items-center">
        <DatePicker {...args} value={range} onChange={setRange} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker in range selection mode.',
      },
    },
  },
};

export const WithGlassEffect: Story = {
  args: {
    placeholder: 'Select date...',
    format: 'MM/dd/yyyy',
    clearable: true,
    showTodayButton: true,
    glass: true,
    size: 'md',
    placement: 'bottom-start',
    selectionMode: 'single',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="u-w-xs u-p-8 u-bg-gradient-to-br u-from-indigo-500 u-via-purple-500 u-to-pink-500 u-min-h-80 u-flex u-items-center u-justify-center u-mt-20 u-mx-auto u-flex u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with glass morphism effect applied.',
      },
    },
  },
};

export const WithMinMaxDates: Story = {
  args: {
    placeholder: 'Select date...',
    format: 'MM/dd/yyyy',
    clearable: true,
    showTodayButton: true,
    size: 'md',
    selectionMode: 'single',
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15), // 15th day of current month
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="u-w-xs u-mt-20 u-mx-auto u-flex u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with minimum and maximum date constraints.',
      },
    },
  },
};

export const WithWeekNumbers: Story = {
  args: {
    placeholder: 'Select date...',
    format: 'MM/dd/yyyy',
    showWeekNumbers: true,
    size: 'md',
    selectionMode: 'single',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="u-w-xs u-mt-20 u-mx-auto u-flex u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker showing week numbers in the calendar.',
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="u-mt-20 u-mx-auto u-flex u-flex-col u-gap-4">
        <div className="u-w-xs">
          <label className="u-block u-mb-2 u-text-sm u-font-medium">Small</label>
          <DatePicker 
            value={date} 
            onChange={setDate} 
            size="sm"
            placeholder="Select date..."
          />
        </div>
        <div className="u-w-xs">
          <label className="u-block u-mb-2 u-text-sm u-font-medium">Medium</label>
          <DatePicker 
            value={date} 
            onChange={setDate} 
            size="md"
            placeholder="Select date..."
          />
        </div>
        <div className="u-w-xs">
          <label className="u-block u-mb-2 u-text-sm u-font-medium">Large</label>
          <DatePicker 
            value={date} 
            onChange={setDate} 
            size="lg"
            placeholder="Select date..."
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker available in different sizes.',
      },
    },
  },
};

export const DisabledAndReadOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div className="u-mt-20 u-mx-auto u-flex u-flex-col u-gap-4">
        <div className="u-w-xs">
          <label className="u-block u-mb-2 u-text-sm u-font-medium">Disabled</label>
          <DatePicker 
            value={date} 
            onChange={setDate} 
            disabled={true}
            placeholder="Select date..."
          />
        </div>
        <div className="u-w-xs">
          <label className="u-block u-mb-2 u-text-sm u-font-medium">Read Only</label>
          <DatePicker 
            value={date} 
            onChange={setDate} 
            readOnly={true}
            placeholder="Select date..."
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker in disabled and read-only states.',
      },
    },
  },
};

export const InlineMode: Story = {
  args: {
    placeholder: 'Select date...',
    format: 'MM/dd/yyyy',
    clearable: true,
    showTodayButton: true,
    inline: true,
    selectionMode: 'single',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker in inline mode (always visible).',
      },
    },
  },
};