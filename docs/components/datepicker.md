# DatePicker

The DatePicker component provides a user-friendly calendar interface for selecting dates or date ranges. It supports various display modes, customization options, and accessibility features for building modern date selection experiences.

## Overview

The DatePicker component offers both inline and dropdown calendar views with support for single date selection and date range selection. It includes features like date validation, keyboard navigation, and customizable formatting to meet diverse application needs.

## Installation

The DatePicker component is included in the Atomix package. Import it in your React components:

```jsx
import { DatePicker } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the datepicker styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { DatePicker } from '@shohojdhara/atomix';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Select a date"
      />
    </div>
  );
}
```

### HTML/CSS

```html
<!-- DatePicker with default styling -->
<div class="c-datepicker" data-datepicker>
  <input
    type="text"
    class="c-datepicker__input"
    placeholder="Select date..."
    readonly
  />
  <button class="c-datepicker__trigger" type="button">
    <svg class="c-datepicker__icon"><!-- Calendar icon --></svg>
  </button>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | - | The currently selected date value |
| `onChange` | `(date: Date \| null) => void` | - | Callback function when date is changed |
| `selectionMode` | `'single' \| 'range'` | `'single'` | Selection mode - single date or date range |
| `startDate` | `Date \| null` | - | The start date of the range (range mode only) |
| `endDate` | `Date \| null` | - | The end date of the range (range mode only) |
| `onRangeChange` | `(range: DateRange) => void` | - | Callback function when date range is changed |
| `format` | `string` | `'MM/dd/yyyy'` | Format for the date display |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `placeholder` | `string` | `'Select date...'` | Placeholder text for the input |
| `disabled` | `boolean` | `false` | Whether the datepicker is disabled |
| `readOnly` | `boolean` | `false` | Whether the datepicker is read-only |
| `clearable` | `boolean` | `true` | Whether to show a clear button |
| `showTodayButton` | `boolean` | `true` | Whether to show the "Today" button |
| `showWeekNumbers` | `boolean` | `false` | Whether to show week numbers |
| `inline` | `boolean` | `false` | Whether to display inline (always visible) |
| `id` | `string` | - | ID for the input element |
| `name` | `string` | - | Name for the input element |
| `className` | `string` | `''` | Additional CSS classes |
| `placement` | `DatePickerPlacement` | `'bottom-start'` | Placement of the dropdown calendar |
| `inputClassName` | `string` | `''` | Additional CSS classes for the input |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input field |
| `style` | `React.CSSProperties` | - | Custom style for the datepicker component |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Applies a glass morphism effect to the calendar dropdown |

### DateRange Interface

```typescript
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
```

### Placement Options

- `'top-start'` - Above the input, aligned to start
- `'top-end'` - Above the input, aligned to end
- `'bottom-start'` - Below the input, aligned to start (default)
- `'bottom-end'` - Below the input, aligned to end
- `'left-start'` - To the left, aligned to start
- `'left-end'` - To the left, aligned to end
- `'right-start'` - To the right, aligned to start
- `'right-end'` - To the right, aligned to end

### Ref Methods

```typescript
interface DatePickerRef {
  open: () => void;    // Open the datepicker
  close: () => void;   // Close the datepicker
  clear: () => void;   // Clear the selected date
  focus: () => void;   // Set focus on the input
}
```

## Examples

### Basic Date Selection

```jsx
function BasicExample() {
  const [date, setDate] = useState(null);

  return (
    <div>
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Choose a date"
      />
      {date && (
        <p>Selected: {date.toLocaleDateString()}</p>
      )}
    </div>
  );
}
```

### Date Range Selection

```jsx
function DateRangeExample() {
  const [range, setRange] = useState({
    startDate: null,
    endDate: null
  });

  return (
    <div>
      <DatePicker
        selectionMode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        onRangeChange={setRange}
        placeholder="Select date range"
      />
      
      {range.startDate && range.endDate && (
        <p>
          Range: {range.startDate.toLocaleDateString()} - {range.endDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
```

### Different Sizes

```jsx
<div className="datepicker-sizes">
  <DatePicker size="sm" placeholder="Small datepicker" />
  <DatePicker size="md" placeholder="Medium datepicker" />
  <DatePicker size="lg" placeholder="Large datepicker" />
</div>
```

### Date Constraints

```jsx
function ConstrainedDatePicker() {
  const today = new Date();
  const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      minDate={today}
      maxDate={maxDate}
      placeholder="Select future date (next 30 days)"
    />
  );
}
```

### Custom Format

```jsx
function CustomFormatExample() {
  const [date, setDate] = useState(null);

  return (
    <div>
      {/* Different date formats */}
      <DatePicker
        value={date}
        onChange={setDate}
        format="dd/MM/yyyy"
        placeholder="DD/MM/YYYY format"
      />
      
      <DatePicker
        value={date}
        onChange={setDate}
        format="MMM dd, yyyy"
        placeholder="Month DD, YYYY format"
      />
      
      <DatePicker
        value={date}
        onChange={setDate}
        format="yyyy-MM-dd"
        placeholder="ISO format"
      />
    </div>
  );
}
```

### Inline Calendar

```jsx
function InlineCalendar() {
  const [date, setDate] = useState(null);

  return (
    <div>
      <h3>Select Event Date</h3>
      <DatePicker
        value={date}
        onChange={setDate}
        inline
        showWeekNumbers
      />
    </div>
  );
}
```

### Advanced Configuration

```jsx
function AdvancedDatePicker() {
  const [date, setDate] = useState(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      showWeekNumbers
      showTodayButton
      clearable
      placement="top-start"
      format="EEEE, MMMM do, yyyy"
      placeholder="Select date with advanced options"
    />
  );
}
```

### Form Integration

```jsx
function DatePickerForm() {
  const [formData, setFormData] = useState({
    eventDate: null,
    startDate: null,
    endDate: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="event-date">Event Date</label>
        <DatePicker
          id="event-date"
          name="eventDate"
          value={formData.eventDate}
          onChange={(date) => setFormData(prev => ({ ...prev, eventDate: date }))}
        />
      </div>

      <div className="form-group">
        <label>Date Range</label>
        <DatePicker
          selectionMode="range"
          startDate={formData.startDate}
          endDate={formData.endDate}
          onRangeChange={(range) => setFormData(prev => ({ 
            ...prev, 
            startDate: range.startDate,
            endDate: range.endDate
          }))}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Controlled with Ref

```jsx
function ControlledDatePicker() {
  const datePickerRef = useRef(null);
  const [date, setDate] = useState(null);

  const handleOpenCalendar = () => {
    datePickerRef.current?.open();
  };

  const handleClearDate = () => {
    datePickerRef.current?.clear();
  };

  return (
    <div>
      <DatePicker
        ref={datePickerRef}
        value={date}
        onChange={setDate}
      />
      
      <div className="datepicker-controls">
        <button onClick={handleOpenCalendar}>Open Calendar</button>
        <button onClick={handleClearDate}>Clear Date</button>
      </div>
    </div>
  );
}
```

## Accessibility

The DatePicker component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus to the datepicker input
- **Enter/Space**: Opens the calendar dropdown
- **Escape**: Closes the calendar dropdown
- **Arrow Keys**: Navigate dates within the calendar
- **Home/End**: Jump to start/end of week or month
- **Page Up/Down**: Navigate between months

### ARIA Attributes

- `role="application"` on the calendar grid
- `aria-label` for navigation buttons
- `aria-selected` for selected dates
- `aria-disabled` for disabled dates
- `aria-expanded` for dropdown state
- `aria-live="polite"` for date announcements

### Screen Reader Support

```jsx
<DatePicker
  value={date}
  onChange={setDate}
  aria-label="Select appointment date"
  aria-describedby="date-help"
/>
<div id="date-help" className="sr-only">
  Use arrow keys to navigate calendar, enter to select date
</div>
```

### Best Practices

1. **Provide clear labels and instructions**
2. **Use semantic HTML elements**
3. **Ensure sufficient color contrast**
4. **Support keyboard navigation**
5. **Announce date changes to screen readers**

## Styling

### CSS Custom Properties

The DatePicker component uses CSS custom properties for theming:

```css
:root {
  /* DatePicker input */
  --atomix-datepicker-input-bg: var(--atomix-input-bg);
  --atomix-datepicker-input-border: var(--atomix-input-border);
  --atomix-datepicker-input-border-radius: var(--atomix-border-radius);
  --atomix-datepicker-input-padding: var(--atomix-input-padding);
  --atomix-datepicker-input-font-size: var(--atomix-font-size-base);

  /* Calendar */
  --atomix-datepicker-calendar-bg: var(--atomix-white);
  --atomix-datepicker-calendar-border: 1px solid var(--atomix-border-color);
  --atomix-datepicker-calendar-border-radius: var(--atomix-border-radius-lg);
  --atomix-datepicker-calendar-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  /* Calendar header */
  --atomix-datepicker-header-bg: var(--atomix-gray-50);
  --atomix-datepicker-header-border: var(--atomix-border-color);

  /* Calendar cells */
  --atomix-datepicker-cell-size: 2.5rem;
  --atomix-datepicker-cell-border-radius: var(--atomix-border-radius);
  --atomix-datepicker-cell-hover-bg: var(--atomix-gray-100);

  /* Selected date */
  --atomix-datepicker-selected-bg: var(--atomix-primary);
  --atomix-datepicker-selected-color: var(--atomix-white);

  /* Today's date */
  --atomix-datepicker-today-border: 2px solid var(--atomix-primary);

  /* Disabled dates */
  --atomix-datepicker-disabled-color: var(--atomix-gray-400);
  --atomix-datepicker-disabled-bg: transparent;
}
```

### CSS Classes

```css
/* Base datepicker */
.c-datepicker {
  position: relative;
  display: inline-block;
}

/* Input field */
.c-datepicker__input {
  width: 100%;
  padding: var(--atomix-datepicker-input-padding);
  background: var(--atomix-datepicker-input-bg);
  border: var(--atomix-datepicker-input-border);
  border-radius: var(--atomix-datepicker-input-border-radius);
}

/* Calendar dropdown */
.c-datepicker__calendar {
  position: absolute;
  z-index: 1000;
  background: var(--atomix-datepicker-calendar-bg);
  border: var(--atomix-datepicker-calendar-border);
  border-radius: var(--atomix-datepicker-calendar-border-radius);
  box-shadow: var(--atomix-datepicker-calendar-shadow);
}

/* Calendar header */
.c-datepicker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--atomix-datepicker-header-bg);
  border-bottom: 1px solid var(--atomix-datepicker-header-border);
}

/* Calendar grid */
.c-datepicker__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  padding: 1rem;
}

/* Calendar cell */
.c-datepicker__cell {
  width: var(--atomix-datepicker-cell-size);
  height: var(--atomix-datepicker-cell-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--atomix-datepicker-cell-border-radius);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.c-datepicker__cell:hover {
  background: var(--atomix-datepicker-cell-hover-bg);
}

/* Selected date */
.c-datepicker__cell--selected {
  background: var(--atomix-datepicker-selected-bg);
  color: var(--atomix-datepicker-selected-color);
}

/* Today's date */
.c-datepicker__cell--today {
  border: var(--atomix-datepicker-today-border);
}

/* Disabled date */
.c-datepicker__cell--disabled {
  color: var(--atomix-datepicker-disabled-color);
  background: var(--atomix-datepicker-disabled-bg);
  cursor: not-allowed;
}

/* Size modifiers */
.c-datepicker--sm .c-datepicker__input {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.c-datepicker--lg .c-datepicker__input {
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
}

/* Inline variant */
.c-datepicker--inline .c-datepicker__calendar {
  position: static;
  box-shadow: none;
}
```

### Customization Examples

```css
/* Custom theme */
.c-datepicker--custom {
  --atomix-datepicker-selected-bg: #667eea;
  --atomix-datepicker-today-border: 2px solid #764ba2;
  --atomix-datepicker-cell-hover-bg: #f7fafc;
}

/* Compact calendar */
.c-datepicker--compact {
  --atomix-datepicker-cell-size: 2rem;
}

/* Custom input styling */
.c-datepicker__input--custom {
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-weight: 500;
}

.c-datepicker__input--custom:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

## Common Patterns

### Event Planning

```jsx
function EventPlanner() {
  const [eventData, setEventData] = useState({
    startDate: null,
    endDate: null,
    registrationDeadline: null
  });

  return (
    <div className="event-planner">
      <h3>Plan Your Event</h3>
      
      <div className="form-group">
        <label>Event Duration</label>
        <DatePicker
          selectionMode="range"
          startDate={eventData.startDate}
          endDate={eventData.endDate}
          onRangeChange={(range) => 
            setEventData(prev => ({
              ...prev,
              startDate: range.startDate,
              endDate: range.endDate
            }))
          }
          placeholder="Select event dates"
        />
      </div>

      <div className="form-group">
        <label>Registration Deadline</label>
        <DatePicker
          value={eventData.registrationDeadline}
          onChange={(date) => 
            setEventData(prev => ({ ...prev, registrationDeadline: date }))
          }
          maxDate={eventData.startDate || undefined}
          placeholder="Select deadline"
        />
      </div>
    </div>
  );
}
```

### Booking System

```jsx
function BookingCalendar({ availableDates, bookedDates }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const isDateDisabled = (date) => {
    return !availableDates.includes(date.toDateString()) ||
           bookedDates.includes(date.toDateString());
  };

  return (
    <div className="booking-calendar">
      <div className="booking-inputs">
        <DatePicker
          value={checkIn}
          onChange={setCheckIn}
          placeholder="Check-in date"
          minDate={new Date()}
          // Custom validation logic would go here
        />
        
        <DatePicker
          value={checkOut}
          onChange={setCheckOut}
          placeholder="Check-out date"
          minDate={checkIn || new Date()}
          // Custom validation logic would go here
        />
      </div>
      
      {checkIn && checkOut && (
        <div className="booking-summary">
          <p>Duration: {Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))} nights</p>
        </div>
      )}
    </div>
  );
}
```

### Report Date Filter

```jsx
function ReportFilter({ onFilterChange }) {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const handleRangeChange = (range) => {
    setDateRange(range);
    onFilterChange(range);
  };

  const presetRanges = [
    {
      label: 'Last 7 days',
      range: {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date()
      }
    },
    {
      label: 'Last 30 days',
      range: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endDate: new Date()
      }
    }
  ];

  return (
    <div className="report-filter">
      <DatePicker
        selectionMode="range"
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onRangeChange={handleRangeChange}
        placeholder="Select date range for report"
      />
      
      <div className="preset-ranges">
        {presetRanges.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handleRangeChange(preset.range)}
            className="preset-button"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## Performance Considerations

1. **Date object creation**: Minimize unnecessary Date object creation
2. **Calendar rendering**: Use virtualization for large date ranges
3. **Event handlers**: Use useCallback to prevent unnecessary re-renders
4. **Date formatting**: Cache formatted date strings when possible

```jsx
// Optimized date picker with memoization
const OptimizedDatePicker = memo(({ value, onChange, ...props }) => {
  const handleDateChange = useCallback((date) => {
    onChange(date);
  }, [onChange]);

  return (
    <DatePicker
      value={value}
      onChange={handleDateChange}
      {...props}
    />
  );
});
```

## Integration Examples

### With Form Libraries

```jsx
// React Hook Form integration
import { Controller, useForm } from 'react-hook-form';

function FormWithDatePicker() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="eventDate"
        control={control}
        rules={{ required: 'Event date is required' }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              placeholder="Select event date"
            />
            {error && <span className="error">{error.message}</span>}
          </div>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### With State Management

```jsx
// Redux integration
import { useDispatch, useSelector } from 'react-redux';
import { setEventDate } from './eventSlice';

function ReduxDatePicker() {
  const dispatch = useDispatch();
  const eventDate = useSelector(state => state.event.date);

  return (
    <DatePicker
      value={eventDate}
      onChange={(date) => dispatch(setEventDate(date))}
      placeholder="Select event date"
    />
  );
}
```

## Browser Support

The DatePicker component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

For older browser support, ensure you have appropriate polyfills for:
- Intl.DateTimeFormat
- Date methods
- CSS Grid (for calendar layout)

## Related Components

- **[Input](./input.md)** - Base input component used internally
- **[Button](./button.md)** - Used for navigation and actions
- **[Icon](./icon.md)** - Used for calendar and navigation icons
- **[Popover](./popover.md)** - Used for dropdown positioning
- **[Modal](./modal.md)** - Alternative date selection in modal

## Migration Guide

### From Native Date Input

```jsx
// Before (native date input)
<input
  type="date"
  value={date ? date.toISOString().split('T')[0] : ''}
  onChange={(e) => setDate(new Date(e.target.value))}
/>

// After (Atomix DatePicker)
<DatePicker
  value={date}
  onChange={setDate}
  format="yyyy-MM-dd"
/>
```

### From Custom Implementation

```jsx
// Before (custom calendar)
<CustomCalendar
  selectedDate={date}
  onDateSelect={setDate}
  showWeeks={true}
/>

// After (Atomix DatePicker)
<DatePicker
  value={date}
  onChange={setDate}
  showWeekNumbers={true}
  inline={true}
/>
```
