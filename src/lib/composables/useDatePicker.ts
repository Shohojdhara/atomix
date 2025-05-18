import { useState, useRef, useCallback, useEffect } from 'react';
import { DatePickerViewMode, DatePickerSelectionMode, DateRange } from '../../components/DatePicker/types';
import { 
  getMonthName, 
  getDaysInMonth, 
  getFirstDayOfMonth, 
  formatDate, 
  isDateInRange
} from '../../components/DatePicker/utils';

interface UseDatePickerProps {
  /**
   * The currently selected date value
   */
  value?: Date | null;
  
  /**
   * Callback function when date is changed
   */
  onChange?: (date: Date | null) => void;
  
  /**
   * Selection mode - single date or date range
   */
  selectionMode?: DatePickerSelectionMode;
  
  /**
   * The start date of the range
   */
  startDate?: Date | null;
  
  /**
   * The end date of the range
   */
  endDate?: Date | null;
  
  /**
   * Callback function when date range is changed
   */
  onRangeChange?: (range: DateRange) => void;
  
  /**
   * Format for the date display
   */
  format?: string;
  
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  
  /**
   * Whether the datepicker is in inline mode
   */
  inline?: boolean;
}

interface DateObject {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

interface MonthObject {
  month: number;
  name: string;
}

export function useDatePicker({
  value,
  onChange,
  selectionMode = 'single',
  startDate,
  endDate,
  onRangeChange,
  format = 'MM/dd/yyyy',
  minDate,
  maxDate,
  inline = false
}: UseDatePickerProps = {}) {
  const [isOpen, setIsOpen] = useState(inline);
  const [inputValue, setInputValue] = useState(value ? formatDate(value, format) : '');
  const [rangeInputValue, setRangeInputValue] = useState(
    startDate && endDate 
      ? `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`
      : startDate 
        ? `${formatDate(startDate, format)} - Select end date` 
        : ''
  );
  const [viewDate, setViewDate] = useState(value || startDate || new Date());
  const [viewMode, setViewMode] = useState<DatePickerViewMode>('days');
  const [rangeSelectionState, setRangeSelectionState] = useState<'start' | 'end'>(
    !startDate || (startDate && endDate) ? 'start' : 'end'
  );
  
  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const today = new Date();
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Update input value when value or range dates change externally
  useEffect(() => {
    if (selectionMode === 'single') {
      setInputValue(value ? formatDate(value, format) : '');
    } else {
      setRangeInputValue(
        startDate && endDate 
          ? `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`
          : startDate 
            ? `${formatDate(startDate, format)} - Select end date` 
            : ''
      );
      setRangeSelectionState(!startDate || (startDate && endDate) ? 'start' : 'end');
    }
  }, [value, startDate, endDate, format, selectionMode]);
  
  // Handle date selection
  const handleDateSelect = useCallback((day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    
    if (minDate && selectedDate < minDate) return;
    if (maxDate && selectedDate > maxDate) return;
    
    if (selectionMode === 'single') {
      if (onChange) {
        onChange(selectedDate);
      }
      
      setInputValue(formatDate(selectedDate, format));
      if (!inline) {
        setIsOpen(false);
      }
    } else {
      // Range selection mode
      if (rangeSelectionState === 'start') {
        // Selecting start date
        if (onRangeChange) {
          onRangeChange({
            startDate: selectedDate,
            endDate: null
          });
        }
        setRangeInputValue(`${formatDate(selectedDate, format)} - Select end date`);
        setRangeSelectionState('end');
      } else {
        // Selecting end date
        if (!startDate) return;
        
        // Make sure end date is after start date
        if (selectedDate < startDate) {
          if (onRangeChange) {
            onRangeChange({
              startDate: selectedDate,
              endDate: startDate
            });
          }
          setRangeInputValue(`${formatDate(selectedDate, format)} - ${formatDate(startDate, format)}`);
        } else {
          if (onRangeChange) {
            onRangeChange({
              startDate,
              endDate: selectedDate
            });
          }
          setRangeInputValue(`${formatDate(startDate, format)} - ${formatDate(selectedDate, format)}`);
        }
        
        if (!inline) {
          setIsOpen(false);
        }
        setRangeSelectionState('start');
      }
    }
  }, [
    currentYear, 
    currentMonth, 
    minDate, 
    maxDate, 
    onChange, 
    onRangeChange, 
    format, 
    inline, 
    selectionMode, 
    rangeSelectionState, 
    startDate
  ]);
  
  // Calendar navigation
  const handlePrevMonth = useCallback(() => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  }, [currentYear, currentMonth]);
  
  const handleNextMonth = useCallback(() => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  }, [currentYear, currentMonth]);
  
  const handlePrevYear = useCallback(() => {
    setViewDate(new Date(currentYear - 1, currentMonth, 1));
  }, [currentYear, currentMonth]);
  
  const handleNextYear = useCallback(() => {
    setViewDate(new Date(currentYear + 1, currentMonth, 1));
  }, [currentYear, currentMonth]);
  
  // Handle view mode changes
  const switchToMonthView = useCallback(() => {
    setViewMode('months');
  }, []);
  
  const switchToYearView = useCallback(() => {
    setViewMode('years');
  }, []);
  
  const selectMonth = useCallback((month: number) => {
    setViewDate(new Date(currentYear, month, 1));
    setViewMode('days');
  }, [currentYear]);
  
  const selectYear = useCallback((year: number) => {
    setViewDate(new Date(year, currentMonth, 1));
    setViewMode('months');
  }, [currentMonth]);
  
  // Handle today button click
  const handleTodayClick = useCallback(() => {
    const todayDate = new Date();
    setViewDate(todayDate);
    
    if (selectionMode === 'single') {
      handleDateSelect(todayDate.getDate());
    } else {
      // For range mode, just navigate to today
      setViewDate(new Date());
    }
  }, [handleDateSelect, selectionMode]);
  
  // Handle clear button click
  const handleClear = useCallback(() => {
    if (selectionMode === 'single') {
      setInputValue('');
      if (onChange) {
        onChange(null);
      }
    } else {
      setRangeInputValue('');
      setRangeSelectionState('start');
      if (onRangeChange) {
        onRangeChange({
          startDate: null,
          endDate: null
        });
      }
    }
  }, [onChange, onRangeChange, selectionMode]);
  
  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectionMode === 'single') {
      setInputValue(e.target.value);
      
      // Try to parse the date
      const parsedDate = new Date(e.target.value);
      if (!isNaN(parsedDate.getTime())) {
        if (onChange) {
          onChange(parsedDate);
        }
        setViewDate(parsedDate);
      }
    } else {
      setRangeInputValue(e.target.value);
      
      // Attempt to parse range input (not fully implemented - would need complex parsing)
      // This is a simplified implementation that would need improvement
      const parts = e.target.value.split('-');
      if (parts.length === 2) {
        const startPart = parts[0].trim();
        const endPart = parts[1].trim();
        
        const parsedStart = new Date(startPart);
        if (!isNaN(parsedStart.getTime())) {
          setViewDate(parsedStart);
        }
        
        // Attempt to parse both dates
        if (startPart && endPart) {
          const parsedStartDate = new Date(startPart);
          const parsedEndDate = new Date(endPart);
          
          if (!isNaN(parsedStartDate.getTime()) && !isNaN(parsedEndDate.getTime())) {
            if (onRangeChange) {
              onRangeChange({
                startDate: parsedStartDate,
                endDate: parsedEndDate
              });
            }
          }
        }
      }
    }
  }, [onChange, onRangeChange, selectionMode]);
  
  // Handle input focus
  const handleInputFocus = useCallback(() => {
    if (!inline) {
      setIsOpen(true);
    }
  }, [inline]);
  
  // Handle click outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      datePickerRef.current && 
      !datePickerRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);
  
  // Add/remove event listeners
  useEffect(() => {
    if (isOpen && !inline) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside, inline]);
  
  // Generate days for the calendar
  const generateDays = useCallback((): DateObject[] => {
    const days: DateObject[] = [];
    const prevMonthDays = getDaysInMonth(
      currentMonth === 0 ? currentYear - 1 : currentYear,
      currentMonth === 0 ? 11 : currentMonth - 1
    );
    
    // Add previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        month: currentMonth === 0 ? 11 : currentMonth - 1,
        year: currentMonth === 0 ? currentYear - 1 : currentYear,
        isCurrentMonth: false
      });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true
      });
    }
    
    // Add next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: currentMonth === 11 ? 0 : currentMonth + 1,
        year: currentMonth === 11 ? currentYear + 1 : currentYear,
        isCurrentMonth: false
      });
    }
    
    return days;
  }, [daysInMonth, firstDayOfMonth, currentMonth, currentYear]);
  
  // Generate months for month picker
  const generateMonths = useCallback((): MonthObject[] => {
    const months: MonthObject[] = [];
    for (let i = 0; i < 12; i++) {
      months.push({
        month: i,
        name: getMonthName(i)
      });
    }
    return months;
  }, []);
  
  // Generate years for year picker
  const generateYears = useCallback((): number[] => {
    const years: number[] = [];
    const startYear = currentYear - 6;
    for (let i = 0; i < 12; i++) {
      years.push(startYear + i);
    }
    return years;
  }, [currentYear]);
  
  // Check if a date is selectable
  const isDateSelectable = useCallback((year: number, month: number, day: number): boolean => {
    const date = new Date(year, month, day);
    return isDateInRange(date, minDate, maxDate);
  }, [minDate, maxDate]);
  
  // Check if a date is selected
  const isDateSelected = useCallback((year: number, month: number, day: number): boolean => {
    if (selectionMode === 'single') {
      if (!value) return false;
    
      return (
        value.getFullYear() === year &&
        value.getMonth() === month &&
        value.getDate() === day
      );
    } else {
      if (!startDate && !endDate) return false;
      
      const date = new Date(year, month, day);
      
      if (startDate && !endDate) {
        return (
          startDate.getFullYear() === year &&
          startDate.getMonth() === month &&
          startDate.getDate() === day
        );
      }
      
      if (startDate && endDate) {
        // Return true if the date is the start date or end date
        const isStartDate = (
          startDate.getFullYear() === year &&
          startDate.getMonth() === month &&
          startDate.getDate() === day
        );
        
        const isEndDate = (
          endDate.getFullYear() === year &&
          endDate.getMonth() === month &&
          endDate.getDate() === day
        );
        
        return isStartDate || isEndDate;
      }
      
      return false;
    }
  }, [value, selectionMode, startDate, endDate]);
  
  // Check if a date is in range (between startDate and endDate)
  const isDateInSelectedRange = useCallback((year: number, month: number, day: number): boolean => {
    if (selectionMode !== 'range' || !startDate || !endDate) return false;
    
    const date = new Date(year, month, day);
    return date > startDate && date < endDate;
  }, [selectionMode, startDate, endDate]);
  
  // Check if a date is today
  const isToday = useCallback((year: number, month: number, day: number): boolean => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  }, [today]);
  
  // Calculate week number for a date
  const getWeekNumber = useCallback((date: Date): number => {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  }, []);
  
  return {
    // State
    isOpen,
    inputValue,
    rangeInputValue,
    viewDate,
    viewMode,
    currentMonth,
    currentYear,
    selectionMode,
    rangeSelectionState,
    
    // Refs
    datePickerRef,
    inputRef,
    
    // Range state
    startDate,
    endDate,
    
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
  };
} 