import React, { forwardRef, useImperativeHandle } from 'react';
import { DatePickerProps, DatePickerRef } from './types';
import { useDatePicker } from '../../lib/composables/useDatePicker';
import { formatDate } from './utils';
import { Icon } from '../Icon/Icon';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * DatePicker component for selecting dates from a calendar interface.
 * Supports various display modes, date ranges, and customization options.
 */
export const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  (
    {
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
      glass,
      ...props
    },
    ref
  ) => {
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

      // Methods
      setIsOpen,
      handleInputChange,
      handleInputFocus,
      handleClear,
      handleDateSelect,
      handleTodayClick,
      handlePrevMonth,
      handleNextMonth,
      handlePrevYear,
      handleNextYear,
      // View mode handlers
      switchToMonthView,
      switchToYearView,
      selectMonth,
      selectYear,

      // Utility methods
      generateDays,
      generateMonths,
      generateYears,
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
      minDate,
      maxDate,
      format,
      inline,
    });

    // Expose the ref API
    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      clear: handleClear,
      focus: () => inputRef.current?.focus(),
    }));

    // Prepare class names
    const datepickerClassName =
      `c-datepicker ${className} ${inline ? 'c-datepicker--inline' : ''}`.trim();
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
          : rangeStartDate
            ? `${formatDate(rangeStartDate, format)} - Select end date...`
            : 'Select date range...';
      }
    };

    // Utility functions
    const getMonthName = (monthIndex: number): string => {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return months[monthIndex] || '';
    };

    const getDaysOfWeek = (): string[] => {
      return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    };

    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const isDateToday = (date: Date): boolean => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    const isSameDate = (date1: Date, date2: Date): boolean => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    const generateCalendar = () => {
      const days = generateDays();
      const weeks = [];
      for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
      }
      return weeks;
    };

    const handlePrevDecade = () => {
      // This would need to be implemented in the hook or handled differently
      // For now, we'll work with what we have
    };

    const handleNextDecade = () => {
      // This would need to be implemented in the hook or handled differently
      // For now, we'll work with what we have
    };

    const switchToDayView = () => {
      // This would need to be implemented in the hook or handled differently
      // For now, we'll work with what we have
    };

    // Helper function to render calendar content
    const renderCalendarContent = () => (
      <>
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
                aria-label={`${getMonthName(currentMonth)} ${currentYear}`}
              >
                {getMonthName(currentMonth)} {currentYear}
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
                <Icon name="CaretDoubleLeft" size="sm" />
              </button>
              <button
                type="button"
                className="c-datepicker__view-switch"
                onClick={switchToYearView}
                aria-label={`Year ${currentYear}`}
              >
                {currentYear}
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

          {viewMode === 'years' && (
            <>
              <button
                type="button"
                className="c-datepicker__nav-button c-datepicker__nav-button--prev-decade"
                onClick={handlePrevDecade}
                aria-label="Previous decade"
              >
                <Icon name="CaretDoubleLeft" size="sm" />
              </button>
              <button type="button" className="c-datepicker__view-switch" onClick={switchToDayView}>
                {generateYears()[0]} - {generateYears()[generateYears().length - 1]}
              </button>
              <button
                type="button"
                className="c-datepicker__nav-button c-datepicker__nav-button--next-decade"
                onClick={handleNextDecade}
                aria-label="Next decade"
              >
                <Icon name="CaretDoubleRight" size="sm" />
              </button>
            </>
          )}
        </div>

        <div className="c-datepicker__body">
          {viewMode === 'days' && (
            <>
              <div
                className={`c-datepicker__weekdays${showWeekNumbers ? ' c-datepicker__weekdays--has-weeknumber' : ''}`}
                role="row"
              >
                {showWeekNumbers && <div className="c-datepicker__weekday">Wk</div>}
                {getDaysOfWeek().map(day => (
                  <div key={day} className="c-datepicker__weekday" role="columnheader">
                    {day}
                  </div>
                ))}
              </div>

              <div
                className={`c-datepicker__days${showWeekNumbers ? ' c-datepicker__days--has-weeknumber' : ''}`}
                role="grid"
              >
                {(() => {
                  const allElements = [];
                  const days = generateDays();

                  for (let i = 0; i < days.length; i++) {
                    const dateObj = days[i];
                    if (!dateObj) continue;

                    const dateValue = new Date(dateObj.year, dateObj.month, dateObj.day);
                    const isSelectable = isDateSelectable(dateObj.year, dateObj.month, dateObj.day);
                    const isSelected = isDateSelected(dateObj.year, dateObj.month, dateObj.day);
                    const isTodayDate = isToday(dateObj.year, dateObj.month, dateObj.day);
                    const isInRange = isDateInSelectedRange(
                      dateObj.year,
                      dateObj.month,
                      dateObj.day
                    );

                    // Add week number at the start of each week
                    if (showWeekNumbers && i % 7 === 0) {
                      const weekNum = getWeekNumber(dateValue);
                      allElements.push(
                        <div
                          key={`weeknumber-${Math.floor(i / 7)}`}
                          className="c-datepicker__weeknumber"
                          role="rowheader"
                        >
                          {weekNum}
                        </div>
                      );
                    }

                    // Add the day button
                    allElements.push(
                      <button
                        key={`day-${i}`}
                        type="button"
                        className={`c-datepicker__day
                          ${!dateObj.isCurrentMonth ? 'c-datepicker__day--outside' : ''}
                          ${isSelected ? 'c-datepicker__day--selected' : ''}
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
                  }

                  return allElements;
                })()}
              </div>
            </>
          )}

          {viewMode === 'months' && (
            <div className="c-datepicker__months" role="grid">
              {generateMonths().map((monthObj, index) => {
                const isSelected =
                  value &&
                  value.getMonth() === monthObj.month &&
                  value.getFullYear() === currentYear;

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
      </>
    );

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
          <>
            {glass ? (
              <div
                id={calendarId}
                className={`c-datepicker__calendar c-datepicker__calendar--${placement} c-datepicker__calendar--glass`}
                role="dialog"
                aria-modal={!inline ? 'true' : undefined}
                aria-label="Date picker"
              >
                <AtomixGlass
                  {...(glass === true
                    ? {
                        displacementScale: 50,
                        blurAmount: 3,
                        saturation: 160,
                        aberrationIntensity: 0,
                        cornerRadius: 12,
                        overLight: false,
                        elasticity: 0,
                        mode: 'standard' as const,
                      }
                    : glass)}
                >
                  <div className="c-datepicker__glass-content">{renderCalendarContent()}</div>
                </AtomixGlass>
              </div>
            ) : (
              <div
                id={calendarId}
                className={`c-datepicker__calendar c-datepicker__calendar--${placement}`}
                role="dialog"
                aria-modal={!inline ? 'true' : undefined}
                aria-label="Date picker"
              >
                {renderCalendarContent()}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

export type { DatePickerProps };

DatePicker.displayName = 'DatePicker';

export default DatePicker;
