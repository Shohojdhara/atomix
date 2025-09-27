import React, { useState } from 'react';
import { DatePicker } from '../src/components/DatePicker/DatePicker';
import { DateRange } from '../src/components/DatePicker/types';
import { formatDateRange } from '../src/components/DatePicker/utils';

/**
 * Example showcasing the DatePicker component with glass morphism effects
 */
export const GlassDatePickerExample: React.FC = () => {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Glass DatePicker Examples
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          Showcasing the new glass morphism effects for DatePicker components
        </p>
      </div>

      {/* Single Date Picker with Default Glass */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          minWidth: '300px',
        }}
      >
        <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>
          Single Date Selection
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
          DatePicker with default glass effect
        </p>
        <DatePicker
          placeholder="Select a date..."
          value={singleDate}
          onChange={setSingleDate}
          glass={true}
          size="md"
          selectionMode="single"
        />
        {singleDate && (
          <p style={{ color: 'white', marginTop: '1rem', fontSize: '0.875rem' }}>
            Selected: {singleDate.toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Date Range Picker with Custom Glass */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          minWidth: '300px',
        }}
      >
        <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>
          Date Range Selection
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
          DatePicker with customized glass effect (polar mode)
        </p>
        <DatePicker
          placeholder="Select date range..."
          selectionMode="range"
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onRangeChange={handleRangeChange}
          glass={{
            displacementScale: 60,
            blurAmount: 0,
            saturation: 180,
            aberrationIntensity: 2,
            cornerRadius: 16,
            overLight: false,
            mode: 'polar',
          }}
          size="md"
        />
        {dateRange.startDate && dateRange.endDate && (
          <p style={{ color: 'white', marginTop: '1rem', fontSize: '0.875rem' }}>
            Range: {formatDateRange(dateRange.startDate, dateRange.endDate, 'MM/dd/yyyy')}
          </p>
        )}
      </div>

      {/* Inline Glass DatePicker */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>
          Inline Glass Calendar
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
          Always visible calendar with glass effect (prominent mode)
        </p>
        <DatePicker
          inline={true}
          showWeekNumbers={true}
          value={singleDate}
          onChange={setSingleDate}
          glass={{
            displacementScale: 45,
            blurAmount: 0,
            saturation: 160,
            aberrationIntensity: 1.5,
            cornerRadius: 14,
            overLight: false,
            mode: 'prominent',
          }}
          selectionMode="single"
        />
      </div>
    </div>
  );
};

export default GlassDatePickerExample;
