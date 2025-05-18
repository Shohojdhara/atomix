import React, { forwardRef, useImperativeHandle } from 'react';
import { DatePickerProps, DatePickerRef } from './types';
import { useDatePicker } from '../../lib/composables/useDatePicker';
import { formatDate } from './utils';
import Icon from '../Icon';

/**
 * DatePicker component for selecting dates from a calendar interface.
 * Supports various display modes, date ranges, and customization options.
 */
const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(({
  value,
  onChange,
  selectionMode = 'single',
  startDate,
  endDate,
  onRangeChange,
  format = 'MM/dd/yyyy',
  minDate,
  maxDate,
  placeholder = 'Select date...',
  disabled = false,
  readOnly = false,
  clearable = true,
  showTodayButton = true,
  showWeekNumbers = false,
  inline = false,
  id,
  name,
  className = '',
  placement = 'bottom-start',
  inputClassName = '',
  size = 'md',
  ...props
}, ref) => {
  const {
    // State
    isOpen,
    inputValue,
    rangeInputValue,
    viewMode,
    currentMonth,
    currentYear,
    selectionMode: activeSelectionMode,
    rangeSelectionState,
    
    // Refs
    datePickerRef,
    inputRef,
    
    // Range state
    startDate: rangeStartDate,
    endDate: rangeEndDate,
    
    // Action handlers
    setIsOpen,
    handleDateSelect,
    handlePrevMonth,
    handleNextMonth,
    handlePrevYear,
    handleNextYear,
    handleTodayClick,
    handleClear,
    handleInputChange,
    handleInputFocus,
    
    // View mode handlers
    switchToMonthView,
    switchToYearView,
    selectMonth,
    selectYear,
    
    // Data generators
    generateDays,
    generateMonths,
    generateYears,
    
    // State checkers
    isDateSelectable,
    isDateSelected,
    isDateInSelectedRange,
    isToday,
    getWeekNumber,
  } = useDatePicker({
    value,
    onChange,
    selectionMode,
    startDate,
    endDate,
    onRangeChange,
    format,
    minDate,
    maxDate,
    inline
  });
  
  // Expose the ref API
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    clear: handleClear,
    focus: () => inputRef.current?.focus()
  }));
  
  // Prepare class names
  const datepickerClassName = `c-datepicker ${className} ${inline ? 'c-datepicker--inline' : ''}`.trim();
  const inputClasses = `c-datepicker__input c-input c-input--${size} ${inputClassName}`.trim();
  
  // Create unique ID for accessibility
  const datepickerId = id || `datepicker-${Math.random().toString(36).substring(2, 9)}`;
  const calendarId = `${datepickerId}-calendar`;
  
  // Get the appropriate input value based on selection mode
  const displayValue = selectionMode === 'single' ? inputValue : rangeInputValue;
  
  // Helper function to get placeholder based on selection mode
  const getPlaceholder = () => {
    if (selectionMode === 'single') {
      return placeholder;
    } else {
      return rangeSelectionState === 'start' 
        ? 'Select start date...' 
        : (rangeStartDate ? `${formatDate(rangeStartDate, format)} - Select end date...` : 'Select date range...');
    }
  };
  
  return (
    <div className={datepickerClassName} ref={datePickerRef} {...props}>
      {!inline && (
        <div className="c-datepicker__input-wrapper">
          <input
            id={datepickerId}
            name={name}
            ref={inputRef}
            type="text"
            className={inputClasses}
            placeholder={getPlaceholder()}
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            disabled={disabled}
            readOnly={readOnly}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={calendarId}
          />
          {clearable && displayValue && (
            <button
              type="button"
              className="c-datepicker__clear-button"
              onClick={handleClear}
              aria-label="Clear date"
            >
              <Icon name="X" size="sm" />
            </button>
          )}
          <span className="c-datepicker__calendar-icon" aria-hidden="true">
            <Icon name="Calendar" size="sm" color="var(--atomix-secondary-text-emphasis)" />
          </span>
        </div>
      )}
      
      {(isOpen || inline) && (
        <div 
          id={calendarId}
          className={`c-datepicker__calendar c-datepicker__calendar--${placement}`}
          role="dialog"
          aria-modal={!inline ? "true" : undefined}
          aria-label="Date picker"
        >
          
          
          <div className="c-datepicker__header">
            {viewMode === 'days' && (
              <>
                <button
                  type="button"
                  className="c-datepicker__nav-button c-datepicker__nav-button--prev-year"
                  onClick={handlePrevYear}
                  aria-label="Previous year"
                >
                  <Icon name="CaretDoubleLeft" size="sm" />
                </button>
                <button
                  type="button"
                  className="c-datepicker__nav-button c-datepicker__nav-button--prev-month"
                  onClick={handlePrevMonth}
                  aria-label="Previous month"
                >
                  <Icon name="CaretLeft" size="sm" />
                </button>
                <button
                  type="button"
                  className="c-datepicker__view-switch"
                  onClick={switchToMonthView}
                  aria-label="Switch to month view"
                >
                  {`${currentMonth + 1}/${currentYear}`}
                </button>
                <button
                  type="button"
                  className="c-datepicker__nav-button c-datepicker__nav-button--next-month"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                >
                  <Icon name="CaretRight" size="sm" />
                </button>
                <button
                  type="button"
                  className="c-datepicker__nav-button c-datepicker__nav-button--next-year"
                  onClick={handleNextYear}
                  aria-label="Next year"
                >
                  <Icon name="CaretDoubleRight" size="sm" />
                </button>
              </>
            )}
            
            {viewMode === 'months' && (
              <>
                <button
                  type="button"
                  className="c-datepicker__nav-button c-datepicker__nav-button--prev-year"
                  onClick={handlePrevYear}
                  aria-label="Previous year"
                >
                  <Icon name="CaretLeft" size="sm" />
                </button>
                <button
                  type="button"
                  className="c-datepicker__view-switch"
                  onClick={switchToYearView}
                  aria-label="Switch to year view"
                >
                  {currentYear}
                </button>
                <button
                  type="button"
                  className="c-datepicker__nav-button c-datepicker__nav-button--next-year"
                  onClick={handleNextYear}
                  aria-label="Next year"
                >
                  <Icon name="CaretRight" size="sm" />
                </button>
              </>
            )}
            
            {viewMode === 'years' && (
              <>
                <button
                  type="button"
                  className="c-datepicker__nav-button c-datepicker__nav-button--prev-year"
                  onClick={() => handlePrevYear()}
                  aria-label="Previous year range"
                >
                  <Icon name="CaretLeft" size="sm" />
                </button>
                <button
                  type="button"
                  className="c-datepicker__view-switch"
                  aria-label="Current year range"
                >
                  {currentYear - 6} - {currentYear + 5}
                </button>
                <button
                  type="button"
                  className="c-datepicker__nav-button c-datepicker__nav-button--next-year"
                  onClick={() => handleNextYear()}
                  aria-label="Next year range"
                >
                  <Icon name="CaretRight" size="sm" />
                </button>
              </>
            )}
          </div>
          
          <div className="c-datepicker__body">
            {viewMode === 'days' && (
              <>
                <div className="c-datepicker__weekdays" role="row">
                  {showWeekNumbers && <div className="c-datepicker__weekday c-datepicker__weeknumber" role="columnheader">#</div>}
                  <div className="c-datepicker__weekday" role="columnheader">Su</div>
                  <div className="c-datepicker__weekday" role="columnheader">Mo</div>
                  <div className="c-datepicker__weekday" role="columnheader">Tu</div>
                  <div className="c-datepicker__weekday" role="columnheader">We</div>
                  <div className="c-datepicker__weekday" role="columnheader">Th</div>
                  <div className="c-datepicker__weekday" role="columnheader">Fr</div>
                  <div className="c-datepicker__weekday" role="columnheader">Sa</div>
                </div>
                
                <div 
                  className="c-datepicker__days" 
                  role="grid"
                  aria-labelledby={`${datepickerId}-month-year`}
                >
                  {generateDays().map((dateObj, index) => {
                    const isSelectable = isDateSelectable(dateObj.year, dateObj.month, dateObj.day);
                    const isSelected = isDateSelected(dateObj.year, dateObj.month, dateObj.day);
                    const isTodayDate = isToday(dateObj.year, dateObj.month, dateObj.day);
                    const dateValue = new Date(dateObj.year, dateObj.month, dateObj.day);
                    
                    // Check if date is in range (for range selection)
                    const isInRange = isDateInSelectedRange(dateObj.year, dateObj.month, dateObj.day);
                    
                    // Determine if the day is start or end of range
                    const isStartOfRange = selectionMode === 'range' && startDate && 
                      dateObj.day === startDate.getDate() && 
                      dateObj.month === startDate.getMonth() && 
                      dateObj.year === startDate.getFullYear();
                    
                    const isEndOfRange = selectionMode === 'range' && endDate && 
                      dateObj.day === endDate.getDate() && 
                      dateObj.month === endDate.getMonth() && 
                      dateObj.year === endDate.getFullYear();
                    
                    // Add week number if enabled
                    if (showWeekNumbers && index % 7 === 0) {
                      const weekNum = getWeekNumber(dateValue);
                      
                      return (
                        <React.Fragment key={`week-${index}`}>
                          <div 
                            className="c-datepicker__weeknumber"
                            aria-label={`Week ${weekNum}`}
                          >
                            {weekNum}
                          </div>
                          <button
                            type="button"
                            className={`c-datepicker__day 
                              ${!dateObj.isCurrentMonth ? 'c-datepicker__day--outside' : ''} 
                              ${isSelected ? 'c-datepicker__day--selected' : ''} 
                              ${isStartOfRange ? 'c-datepicker__day--start-range' : ''}
                              ${isEndOfRange ? 'c-datepicker__day--end-range' : ''}
                              ${isInRange ? 'c-datepicker__day--in-range' : ''}
                              ${isTodayDate ? 'c-datepicker__day--today' : ''} 
                              ${!isSelectable ? 'c-datepicker__day--disabled' : ''}`}
                            onClick={() => isSelectable && handleDateSelect(dateObj.day)}
                            disabled={!isSelectable}
                            tabIndex={dateObj.isCurrentMonth ? 0 : -1}
                            aria-label={dateValue.toLocaleDateString()}
                            aria-selected={isSelected ? 'true' : 'false'}
                            role="gridcell"
                          >
                            {dateObj.day}
                          </button>
                        </React.Fragment>
                      );
                    }
                    
                    return (
                      <button
                        key={`day-${index}`}
                        type="button"
                        className={`c-datepicker__day 
                          ${!dateObj.isCurrentMonth ? 'c-datepicker__day--outside' : ''} 
                          ${isSelected ? 'c-datepicker__day--selected' : ''} 
                          ${isStartOfRange ? 'c-datepicker__day--start-range' : ''}
                          ${isEndOfRange ? 'c-datepicker__day--end-range' : ''}
                          ${isInRange ? 'c-datepicker__day--in-range' : ''}
                          ${isTodayDate ? 'c-datepicker__day--today' : ''} 
                          ${!isSelectable ? 'c-datepicker__day--disabled' : ''}`}
                        onClick={() => isSelectable && handleDateSelect(dateObj.day)}
                        disabled={!isSelectable}
                        tabIndex={dateObj.isCurrentMonth ? 0 : -1}
                        aria-label={dateValue.toLocaleDateString()}
                        aria-selected={isSelected ? 'true' : 'false'}
                        role="gridcell"
                      >
                        {dateObj.day}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
            
            {viewMode === 'months' && (
              <div className="c-datepicker__months" role="grid">
                {generateMonths().map((monthObj, index) => {
                  const isSelected = value && value.getMonth() === monthObj.month && value.getFullYear() === currentYear;
                  
                  return (
                    <button
                      key={`month-${index}`}
                      type="button"
                      className={`c-datepicker__month ${isSelected ? 'c-datepicker__month--selected' : ''}`}
                      onClick={() => selectMonth(monthObj.month)}
                      aria-selected={isSelected ? 'true' : 'false'}
                      role="gridcell"
                    >
                      {monthObj.name.substring(0, 3)}
                    </button>
                  );
                })}
              </div>
            )}
            
            {viewMode === 'years' && (
              <div className="c-datepicker__years" role="grid">
                {generateYears().map((year, index) => {
                  const isSelected = value && value.getFullYear() === year;
                  
                  return (
                    <button
                      key={`year-${index}`}
                      type="button"
                      className={`c-datepicker__year ${isSelected ? 'c-datepicker__year--selected' : ''}`}
                      onClick={() => selectYear(year)}
                      aria-selected={isSelected ? 'true' : 'false'}
                      role="gridcell"
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          {viewMode === 'days' && (
            <div className="c-datepicker__footer">
               {selectionMode === 'range' && (
                <div className="c-datepicker__range-status c-badge c-badge--sm c-badge--info u-w-100">
                  Selecting {rangeSelectionState === 'start' ? 'start' : 'end'} date
                </div>
              )}

              {showTodayButton && (
                <button
                  type="button"
                  className="c-datepicker__today-button c-btn c-btn--sm c-btn--outline-primary"
                  onClick={handleTodayClick}
                  aria-label="Go to today"
                >
                  Today
                </button>
              )}           
              
              {!inline && (
                <button
                  type="button"
                  className="c-datepicker__close-button c-btn c-btn--sm c-btn--outline-error"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close calendar"
                >
                  Close
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
