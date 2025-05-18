import React, { useState } from 'react';
import DatePicker from '../../components/DatePicker';
import { formatDate, formatDateRange } from '../../components/DatePicker/utils';

export default function DatePickerExample() {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  });

  const handleRangeChange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(range);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">DatePicker Examples</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Single Date Selection</h2>
          <div className="mb-4">
            <DatePicker
              value={singleDate}
              onChange={setSingleDate}
              placeholder="Select a date..."
            />
          </div>
          <div className="bg-gray-100 p-3 rounded-md">
            <p>Selected date: {singleDate ? formatDate(singleDate, 'MM/dd/yyyy') : 'None'}</p>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Date Range Selection</h2>
          <div className="mb-4">
            <DatePicker
              selectionMode="range"
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onRangeChange={handleRangeChange}
              placeholder="Select date range..."
            />
          </div>
          <div className="bg-gray-100 p-3 rounded-md">
            <p>
              Date range: {dateRange.startDate && dateRange.endDate
                ? formatDateRange(dateRange.startDate, dateRange.endDate, 'MM/dd/yyyy')
                : (dateRange.startDate
                  ? formatDateRange(dateRange.startDate, null, 'MM/dd/yyyy')
                  : 'None')
              }
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border rounded-md p-4">
        <h2 className="text-xl font-semibold mb-4">Advanced Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">With Min/Max Dates</h3>
            <DatePicker
              minDate={new Date(new Date().setDate(new Date().getDate() - 5))}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 10))}
              placeholder="Limited date range..."
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Inline Calendar</h3>
            <DatePicker
              inline
              value={singleDate}
              onChange={setSingleDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 