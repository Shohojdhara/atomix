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
    glass: {
      control: { type: 'boolean' },
      description: 'Apply glass morphism effect to the calendar dropdown',
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
                : 'No date selected'}
          </p>
        </div>
      </div>
    );
  },
};

// Glass Effect - Basic
export const GlassEffectBasic: Story = {
  args: {
    placeholder: 'Select date...',
    clearable: true,
    showTodayButton: true,
    selectionMode: 'single',
    glass: true,
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
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
        <div
          style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Glass DatePicker</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            DatePicker with glass morphism effect
          </p>
        </div>
        <div style={{ width: '300px' }}>
          <DatePicker {...args} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

// Glass Mode Variants - Standard
export const GlassModeStandard: Story = {
  args: {
    placeholder: 'Select date...',
    selectionMode: 'single',
    glass: {
      mode: 'standard',
      displacementScale: 50,
      blurAmount: 3,
      saturation: 160,
      aberrationIntensity: 0,
      overLight: false,
      elasticity: 0,
    } as any,
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
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
        <div
          style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Standard Glass Mode</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Classic glass morphism with blur and displacement
          </p>
        </div>
        <div style={{ width: '300px' }}>
          <DatePicker {...args} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

// Glass Mode Variants - Polar
export const GlassModePolar: Story = {
  args: {
    placeholder: 'Select date...',
    selectionMode: 'single',
    glass: {
      mode: 'polar',
      displacementScale: 60,
      blurAmount: 2.5,
      saturation: 180,
      aberrationIntensity: 2,
    } as any,
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
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
        <div
          style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Polar Glass Mode</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Radial distortion effect from center</p>
        </div>
        <div style={{ width: '300px' }}>
          <DatePicker {...args} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

// Glass Mode Variants - Prominent
export const GlassModeProminent: Story = {
  args: {
    placeholder: 'Select date...',
    selectionMode: 'single',
    glass: {
      mode: 'prominent',
      displacementScale: 80,
      blurAmount: 3.5,
      saturation: 200,
      aberrationIntensity: 3,
    } as any,
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
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
        <div
          style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Prominent Glass Mode</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Enhanced distortion with maximum depth
          </p>
        </div>
        <div style={{ width: '300px' }}>
          <DatePicker {...args} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

// Glass Mode Variants - Shader
export const GlassModeShader: Story = {
  args: {
    placeholder: 'Select date...',
    selectionMode: 'single',
    glass: {
      mode: 'shader',
      shaderVariant: 'liquidGlass',
      displacementScale: 55,
      blurAmount: 2.8,
      saturation: 170,
    } as any,
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
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
        <div
          style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Shader Glass Mode</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>GPU-accelerated liquid glass effect</p>
        </div>
        <div style={{ width: '300px' }}>
          <DatePicker {...args} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

// All Glass Modes Comparison
export const AllGlassModesComparison: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | null>(null);
    const [date2, setDate2] = useState<Date | null>(null);
    const [date3, setDate3] = useState<Date | null>(null);
    const [date4, setDate4] = useState<Date | null>(null);

    return (
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
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: '3rem',
              fontSize: '2rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Glass Mode DatePicker Comparison
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Standard Mode */}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>
                Standard
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                }}
              >
                Classic blur and displacement
              </p>
              <DatePicker
                placeholder="Select date..."
                value={date1}
                onChange={setDate1}
                glass={
                  {
                    mode: 'standard',
                    displacementScale: 50,
                    blurAmount: 3,
                    saturation: 160,
                  } as any
                }
              />
            </div>

            {/* Polar Mode */}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Polar</h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                }}
              >
                Radial distortion effect
              </p>
              <DatePicker
                placeholder="Select date..."
                value={date2}
                onChange={setDate2}
                glass={
                  {
                    mode: 'polar',
                    displacementScale: 60,
                    blurAmount: 2.5,
                    saturation: 180,
                  } as any
                }
              />
            </div>

            {/* Prominent Mode */}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>
                Prominent
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                }}
              >
                Maximum depth and distortion
              </p>
              <DatePicker
                placeholder="Select date..."
                value={date3}
                onChange={setDate3}
                glass={
                  {
                    mode: 'prominent',
                    displacementScale: 80,
                    blurAmount: 3.5,
                    saturation: 200,
                  } as any
                }
              />
            </div>

            {/* Shader Mode */}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Shader</h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                }}
              >
                GPU-accelerated liquid glass
              </p>
              <DatePicker
                placeholder="Select date..."
                value={date4}
                onChange={setDate4}
                glass={
                  {
                    mode: 'shader',
                    shaderVariant: 'liquidGlass',
                    displacementScale: 55,
                    blurAmount: 2.8,
                  } as any
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Glass DatePicker with Range Selection
export const GlassRangeSelection: Story = {
  args: {
    selectionMode: 'range',
    placeholder: 'Select date range...',
    glass: true,
  },
  render: args => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null,
    });

    return (
      <div
        style={{
          background: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920)',
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
        <div
          style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Glass Range DatePicker</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Select date ranges with glass morphism effect
          </p>
        </div>
        <div style={{ width: '300px' }}>
          <DatePicker
            {...args}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onRangeChange={setDateRange}
          />
          {dateRange.startDate && dateRange.endDate && (
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '0.875rem' }}>
                Range: {formatDateRange(dateRange.startDate, dateRange.endDate, 'MM/dd/yyyy')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};

// Glass DatePicker Inline
export const GlassInline: Story = {
  args: {
    inline: true,
    showWeekNumbers: true,
    selectionMode: 'single',
    glass: {
      mode: 'polar',
      displacementScale: 60,
      blurAmount: 2.5,
    } as any,
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div
        style={{
          background: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920)',
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
        <div
          style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Inline Glass DatePicker</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Always visible with glass morphism effect
          </p>
        </div>
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
};

// Glass DatePicker Showcase
export const GlassShowcase: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | null>(null);
    const [date2, setDate2] = useState<Date | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null,
    });

    return (
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
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: '3rem',
              fontSize: '2rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Glass DatePicker Showcase
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Single Date Selection */}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Single Date Selection</h3>
              <div
                style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>
                    Standard Glass
                  </label>
                  <DatePicker
                    placeholder="Select date..."
                    value={date1}
                    onChange={setDate1}
                    glass={true}
                  />
                </div>
                <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>
                    Polar Glass
                  </label>
                  <DatePicker
                    placeholder="Select date..."
                    value={date2}
                    onChange={setDate2}
                    glass={
                      {
                        mode: 'polar',
                        displacementScale: 60,
                      } as any
                    }
                  />
                </div>
              </div>
            </div>

            {/* Range Selection */}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Range Selection</h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '300px' }}>
                  <DatePicker
                    selectionMode="range"
                    placeholder="Select date range..."
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onRangeChange={setDateRange}
                    glass={
                      {
                        mode: 'shader',
                        shaderVariant: 'liquidGlass',
                      } as any
                    }
                  />
                </div>
              </div>
            </div>

            {/* Different Sizes */}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Different Sizes</h3>
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>
                    Small
                  </label>
                  <DatePicker placeholder="Select date..." size="sm" glass={true} />
                </div>
                <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>
                    Medium
                  </label>
                  <DatePicker placeholder="Select date..." size="md" glass={true} />
                </div>
                <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>
                    Large
                  </label>
                  <DatePicker placeholder="Select date..." size="lg" glass={true} />
                </div>
              </div>
            </div>
          </div>
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

export const WithGlassEffect: Story = {
  args: {
    placeholder: 'Select date...',
    glass: true,
    size: 'md',
    placement: 'bottom-start',
    selectionMode: 'single',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div
        style={{
          width: '97vw',
          minHeight: '97vh',
          background:
            'url(https://images.unsplash.com/photo-1701341263063-1f3303c759d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="u-mx-auto" style={{ width: '300px' }} data-testid="read-only-datepicker">
          <DatePicker {...args} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

export const GlassEffectCustomized: Story = {
  args: {
    placeholder: 'Select date...',
    glass: {
      displacementScale: 60,
      blurAmount: 0,
      saturation: 180,
      aberrationIntensity: 2,
      overLight: false,
      mode: 'polar' as const,
    } as any,
    size: 'md',
    placement: 'bottom-start',
    selectionMode: 'single',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div
        style={{
          width: '98vw',
          minHeight: '97vh',
          background:
            'url(https://images.unsplash.com/photo-1744035522988-08bf64003759?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          padding: '2rem',
          borderRadius: '12px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="u-mx-auto" data-testid="read-only-datepicker">
          <DatePicker {...args} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

export const GlassEffectInline: Story = {
  args: {
    glass: true,
    inline: true,
    showWeekNumbers: true,
    selectionMode: 'single',
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div
        style={{
          width: '98vw',
          minHeight: '97vh',
          background:
            'url(https://images.unsplash.com/photo-1497449711066-ecd7e3d6a484?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          padding: '2rem',
          borderRadius: '16px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="u-mx-auto u-w-50" data-testid="read-only-datepicker">
          <DatePicker {...args} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

export const GlassEffectRangeSelection: Story = {
  args: {
    selectionMode: 'range',
    placeholder: 'Select date...',
    glass: {
      mode: 'prominent' as const,
    } as any,
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
        style={{
          width: '98vw',
          minHeight: '97vh',
          background:
            'url(https://images.unsplash.com/photo-1723046833386-5a494bdb6da7?q=80&w=2694&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          padding: '2rem',
          borderRadius: '12px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <div
          className="u-mt-20 u-mx-auto"
          style={{ width: '300px' }}
          data-testid="read-only-datepicker"
        >
          <div
            style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '0.875rem',
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
          <DatePicker
            {...args}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onRangeChange={handleRangeChange}
          />
        </div>
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
