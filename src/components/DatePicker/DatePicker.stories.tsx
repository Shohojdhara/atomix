import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DatePicker from './DatePicker';
import { DateRange } from './types';
import { formatDateRange } from './utils';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: { control: 'date' },
    startDate: { control: 'date' },
    endDate: { control: 'date' },
    selectionMode: {
      control: { type: 'radio' },
      options: ['single', 'range'],
      description: 'Selection mode - single date or date range',
    },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    format: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    clearable: { control: 'boolean' },
    showTodayButton: { control: 'boolean' },
    showWeekNumbers: { control: 'boolean' },
    inline: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
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
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
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
      <div style={{ width: '300px' }} className="u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
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
      <div style={{ width: '300px' }} className="u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    showWeekNumbers: true,
    selectionMode: 'single',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div style={{ width: '300px' }} className="u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
};

export const DateRangeSelection: Story = {
  args: {
    selectionMode: 'range',
    placeholder: 'Select date range...',
  },
  render: args => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null,
    });

    const handleRangeChange = (range: DateRange) => {
      setDateRange(range);
    };

    return (
      <div
        style={{ width: '300px' }}
        className="u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center"
      >
        <DatePicker
          {...args}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onRangeChange={handleRangeChange}
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '0.25rem',
          }}
        >
          <p>
            Selected range:{' '}
            {dateRange.startDate && dateRange.endDate
              ? formatDateRange(dateRange.startDate, dateRange.endDate, 'MM/dd/yyyy')
              : dateRange.startDate
                ? formatDateRange(dateRange.startDate, null, 'MM/dd/yyyy')
                : 'No range selected'}
          </p>
        </div>
      </div>
    );
  },
};

export const DateRangeWithLimits: Story = {
  args: {
    selectionMode: 'range',
    placeholder: 'Select date range...',
  },
  render: args => {
    // Set min date to 7 days ago
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7);

    // Set max date to 14 days from now
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);

    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null,
    });

    const handleRangeChange = (range: DateRange) => {
      setDateRange(range);
    };

    return (
      <div
        style={{ width: '400px' }}
        className="u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center"
      >
        <p className="u-text-info u-px-2 u-py-4 u-bg-info-subtle u-fs-xs u-text-center">
          Select a date range between {minDate.toLocaleDateString()} and{' '}
          {maxDate.toLocaleDateString()}
        </p>
        <DatePicker
          {...args}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onRangeChange={handleRangeChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  },
};

export const InlineRangeSelection: Story = {
  args: {
    selectionMode: 'range',
    inline: true,
    showWeekNumbers: true,
  },
  render: args => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null,
    });

    const handleRangeChange = (range: DateRange) => {
      setDateRange(range);
    };

    return (
      <div
        style={{ width: '300px' }}
        className="u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center"
      >
        <DatePicker
          {...args}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onRangeChange={handleRangeChange}
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '0.25rem',
          }}
        >
          <p>
            Selected range:{' '}
            {dateRange.startDate && dateRange.endDate
              ? formatDateRange(dateRange.startDate, dateRange.endDate, 'MM/dd/yyyy')
              : dateRange.startDate
                ? formatDateRange(dateRange.startDate, null, 'MM/dd/yyyy')
                : 'No range selected'}
          </p>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: args => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div
        style={{ width: '300px' }}
        className={'u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center'}
      >
        <DatePicker {...args} size="sm" placeholder="Small (sm)" value={date} onChange={setDate} />
        <DatePicker {...args} size="md" placeholder="Medium (md)" value={date} onChange={setDate} />
        <DatePicker {...args} size="lg" placeholder="Large (lg)" value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled DatePicker',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ width: '300px' }} className="u-mt-20 u-mx-auto">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    placeholder: 'Read-only DatePicker',
  },
  render: args => {
    const initialDate = new Date();
    const [date, setDate] = useState<Date | null>(initialDate);
    return (
      <div
        className="u-mt-20 u-mx-auto"
        style={{ width: '300px' }}
        data-testid="read-only-datepicker"
      >
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
};

export const DifferentFormats: Story = {
  render: args => {
    const initialDate = new Date();
    const [date1, setDate1] = useState<Date | null>(initialDate);
    const [date2, setDate2] = useState<Date | null>(initialDate);
    const [date3, setDate3] = useState<Date | null>(initialDate);

    return (
      <div className="u-w-75 u-mx-auto u-mt-20 u-d-flex u-gap-3">
        <DatePicker
          {...args}
          format="MM/dd/yyyy"
          placeholder="MM/DD/YYYY"
          value={date1}
          onChange={setDate1}
        />
        <DatePicker
          {...args}
          format="dd/MM/yyyy"
          placeholder="DD/MM/YYYY"
          value={date2}
          onChange={setDate2}
        />
        <DatePicker
          {...args}
          format="yyyy-MM-dd"
          placeholder="YYYY-MM-DD"
          value={date3}
          onChange={setDate3}
        />
      </div>
    );
  },
};

export const Playground: Story = {
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null,
    });

    const handleSingleDateChange = (date: Date | null) => {
      setDate(date);
    };

    const handleRangeChange = (range: DateRange) => {
      setDateRange(range);
    };

    return args.selectionMode === 'single' ? (
      <DatePicker {...args} value={date} onChange={handleSingleDateChange} />
    ) : (
      <DatePicker
        {...args}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onRangeChange={handleRangeChange}
      />
    );
  },
};
