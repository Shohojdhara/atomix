# DatePicker Component

The DatePicker component provides a user-friendly interface for selecting dates from a calendar, supporting both single date selection and date range selection.

## Features

- Single date selection
- Date range selection
- Customizable date formats
- Min/max date constraints
- Inline or popup modes
- Week numbers display
- Month and year views
- Keyboard navigation
- Accessibility support

## Basic Usage

```jsx
import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';

const Example = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="Select a date..."
    />
  );
};
```

## Date Range Selection

```jsx
import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';

const RangeExample = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  
  const handleRangeChange = (range) => {
    setDateRange(range);
  };
  
  return (
    <DatePicker
      selectionMode="range"
      startDate={dateRange.startDate}
      endDate={dateRange.endDate}
      onRangeChange={handleRangeChange}
      placeholder="Select date range..."
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date` | `null` | The selected date (for single selection mode) |
| `onChange` | `(date: Date) => void` | - | Callback when date changes (for single selection mode) |
| `selectionMode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `startDate` | `Date` | `null` | The start date of the range (for range selection mode) |
| `endDate` | `Date` | `null` | The end date of the range (for range selection mode) |
| `onRangeChange` | `(range: { startDate, endDate }) => void` | - | Callback when date range changes |
| `format` | `string` | `'MM/dd/yyyy'` | Date format for the input |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `placeholder` | `string` | `'Select date...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the datepicker is disabled |
| `readOnly` | `boolean` | `false` | Whether the datepicker is read-only |
| `clearable` | `boolean` | `true` | Whether to show a clear button |
| `showTodayButton` | `boolean` | `true` | Whether to show the "Today" button |
| `showWeekNumbers` | `boolean` | `false` | Whether to show week numbers |
| `inline` | `boolean` | `false` | Whether to display inline (always visible) |
| `id` | `string` | - | ID for the input element |
| `name` | `string` | - | Name for the input element |
| `className` | `string` | - | Additional class for the component |
| `placement` | `string` | `'bottom-start'` | Placement of the dropdown calendar |
| `inputClassName` | `string` | - | Additional class for the input |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input field |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Applies glass morphism effect to calendar dropdown |

## Ref API

The DatePicker component exposes the following methods via React refs:

```jsx
const datePickerRef = useRef();

// Open the calendar
datePickerRef.current.open();

// Close the calendar
datePickerRef.current.close();

// Clear the selected date
datePickerRef.current.clear();

// Focus the input
datePickerRef.current.focus();
```

## Glass Morphism Effect

The DatePicker component supports glass morphism effects through the `glass` prop, which can be applied to the calendar dropdown for a modern, translucent appearance.

### Basic Glass Effect

```jsx
import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';

const GlassExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem' }}>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Select a date..."
        glass={true}
      />
    </div>
  );
};
```

### Custom Glass Configuration

```jsx
import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';

const CustomGlassExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  return (
    <div style={{ background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)', padding: '2rem' }}>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Select a date..."
        glass={{
          displacementScale: 60,
          blurAmount: 0,
          saturation: 180,
          aberrationIntensity: 2,
          borderRadius: 16,
          overLight: false,
          mode: 'polar',
        }}
      />
    </div>
  );
};
```

### Glass with Date Range Selection

```jsx
import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';

const GlassRangeExample = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  
  return (
    <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '2rem' }}>
      <DatePicker
        selectionMode="range"
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onRangeChange={setDateRange}
        placeholder="Select date range..."
        glass={{
          displacementScale: 45,
          blurAmount: 0,
          saturation: 160,
          aberrationIntensity: 1.5,
          borderRadius: 14,
          mode: 'prominent',
        }}
      />
    </div>
  );
};
```

### Glass Props

When `glass` is an object, it accepts the same props as the `AtomixGlass` component:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `displacementScale` | `number` | `40` | Displacement scale for the glass effect |
| `blurAmount` | `number` | `0` | Blur amount for the backdrop |
| `saturation` | `number` | `160` | Saturation percentage for the backdrop |
| `aberrationIntensity` | `number` | `1.5` | Chromatic aberration intensity |
| `borderRadius` | `number` | `12` | Corner radius in pixels |
| `overLight` | `boolean` | `false` | Whether the glass is over a light background |
| `mode` | `'standard' \| 'polar' \| 'prominent' \| 'shader'` | `'standard'` | Glass effect mode |

### Best Practices for Glass DatePicker

- Use glass effects with colorful or gradient backgrounds for best visual impact
- Consider the `overLight` prop when using light backgrounds
- The `polar` and `prominent` modes work well for date pickers with larger calendar dropdowns
- Ensure sufficient contrast between the glass effect and background for accessibility