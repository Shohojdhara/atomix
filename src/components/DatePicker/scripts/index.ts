import { 
  getMonthName, 
  getDaysInMonth, 
  getFirstDayOfMonth, 
  formatDate, 
  parseDate,
  isDateInRange 
} from '../utils';
import { createPhosphorIcon } from '../../lib/utils/icons';

// Define default options
const DEFAULTS = {
  format: 'MM/dd/yyyy',
  placement: 'bottom-start',
  clearable: true,
  showTodayButton: true,
  showWeekNumbers: false,
  inline: false,
};

/**
 * DatePicker component class for vanilla JavaScript implementation
 */
export default class DatePicker {
  private element: HTMLElement;
  private input: HTMLInputElement | null;
  private options: any;
  private isOpen: boolean;
  private calendar: HTMLElement | null;
  private viewDate: Date;
  private selectedDate: Date | null;
  private viewMode: string;
  private eventListeners: { [key: string]: (e: Event) => void };

  /**
   * Create a new DatePicker instance
   * @param element - The element to attach the datepicker to
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: any = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
    if (!this.element) {
      throw new Error('DatePicker: Element not found');
    }

    this.options = { ...DEFAULTS, ...options };
    this.input = this.element.querySelector('input');
    this.isOpen = this.options.inline;
    this.calendar = null;
    this.selectedDate = this.parseInitialDate();
    this.viewDate = this.selectedDate || new Date();
    this.viewMode = 'days';
    this.eventListeners = {};

    this._init();
  }

  /**
   * Initialize the DatePicker
   */
  private _init(): void {
    this._renderCalendar();
    this._bindEvents();

    if (this.options.inline) {
      this._showCalendar();
    }

    // Dispatch init event
    this.element.dispatchEvent(new CustomEvent('datepicker:init', {
      bubbles: true,
      detail: { instance: this }
    }));
  }

  /**
   * Parse the initial date from the input
   */
  private parseInitialDate(): Date | null {
    if (!this.input || !this.input.value) return null;
    return parseDate(this.input.value, this.options.format);
  }

  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    if (this.input && !this.options.inline) {
      // Input focus
      this.eventListeners.inputFocus = (e) => {
        if (!this.options.disabled && !this.options.readOnly) {
          this._showCalendar();
        }
      };
      this.input.addEventListener('focus', this.eventListeners.inputFocus);

      // Input change
      this.eventListeners.inputChange = (e) => {
        const value = (e.target as HTMLInputElement).value;
        const date = parseDate(value, this.options.format);
        if (date) {
          this.selectedDate = date;
          this.viewDate = new Date(date);
          this._updateCalendar();

          // Dispatch change event
          this.element.dispatchEvent(new CustomEvent('datepicker:change', {
            bubbles: true,
            detail: { date: this.selectedDate }
          }));
        }
      };
      this.input.addEventListener('input', this.eventListeners.inputChange);
    }

    // Document click (for click outside)
    if (!this.options.inline) {
      this.eventListeners.documentClick = (e) => {
        if (this.isOpen) {
          const target = e.target as Node;
          if (
            !this.element.contains(target) && 
            this.calendar && 
            !this.calendar.contains(target)
          ) {
            this._hideCalendar();
          }
        }
      };
      document.addEventListener('click', this.eventListeners.documentClick);
    }

    // Calendar element events (will be delegated)
  }

  /**
   * Render the calendar element
   */
  private _renderCalendar(): void {
    // Create calendar container if it doesn't exist
    if (!this.calendar) {
      this.calendar = document.createElement('div');
      this.calendar.className = `c-datepicker__calendar c-datepicker__calendar--${this.options.placement}`;
      this.calendar.setAttribute('role', 'dialog');
      this.calendar.setAttribute('aria-label', 'Date picker');
      
      if (this.options.inline) {
        this.element.appendChild(this.calendar);
      } else {
        document.body.appendChild(this.calendar);
      }

      // Add event delegation for calendar interactions
      this.eventListeners.calendarClick = (e) => {
        const target = e.target as HTMLElement;
        
        // Day selection
        if (target.matches('.c-datepicker__day') && !(target as HTMLButtonElement).disabled) {
          const day = parseInt(target.textContent || '0', 10);
          this._selectDate(day);
        }
        
        // Navigation buttons
        if (target.closest('.c-datepicker__nav-button--prev-month')) {
          this._prevMonth();
        }
        if (target.closest('.c-datepicker__nav-button--next-month')) {
          this._nextMonth();
        }
        if (target.closest('.c-datepicker__nav-button--prev-year')) {
          this._prevYear();
        }
        if (target.closest('.c-datepicker__nav-button--next-year')) {
          this._nextYear();
        }
        
        // View mode switches
        if (target.closest('.c-datepicker__view-switch')) {
          if (this.viewMode === 'days') {
            this._switchToMonthView();
          } else if (this.viewMode === 'months') {
            this._switchToYearView();
          }
        }
        
        // Month selection
        if (target.matches('.c-datepicker__month')) {
          const monthIndex = Array.from(target.parentElement?.children || []).indexOf(target);
          if (monthIndex !== -1) {
            this._selectMonth(monthIndex);
          }
        }
        
        // Year selection
        if (target.matches('.c-datepicker__year')) {
          const year = parseInt(target.textContent || '0', 10);
          this._selectYear(year);
        }
        
        // Today button
        if (target.closest('.c-datepicker__today-button')) {
          this._goToToday();
        }
        
        // Close button
        if (target.closest('.c-datepicker__close-button')) {
          this._hideCalendar();
        }
        
        // Clear button
        if (target.closest('.c-datepicker__clear-button')) {
          this._clearDate();
        }
      };
      
      this.calendar.addEventListener('click', this.eventListeners.calendarClick);
    }
    
    this._updateCalendar();
  }

  /**
   * Update the calendar content based on current state
   */
  private _updateCalendar(): void {
    if (!this.calendar) return;
    
    const currentMonth = this.viewDate.getMonth();
    const currentYear = this.viewDate.getFullYear();
    
    let content = '';
    
    // Calendar header
    content += `<div class="c-datepicker__header">`;
    
    if (this.viewMode === 'days') {
      content += `
        <button type="button" class="c-datepicker__nav-button c-datepicker__nav-button--prev-year" aria-label="Previous year">
          ${createPhosphorIcon('CaretDoubleLeft', 16)}
        </button>
        <button type="button" class="c-datepicker__nav-button c-datepicker__nav-button--prev-month" aria-label="Previous month">
          ${createPhosphorIcon('CaretLeft', 16)}
        </button>
        <button type="button" class="c-datepicker__view-switch" aria-label="Switch to month view">
          ${currentMonth + 1}/${currentYear}
        </button>
        <button type="button" class="c-datepicker__nav-button c-datepicker__nav-button--next-month" aria-label="Next month">
          ${createPhosphorIcon('CaretRight', 16)}
        </button>
        <button type="button" class="c-datepicker__nav-button c-datepicker__nav-button--next-year" aria-label="Next year">
          ${createPhosphorIcon('CaretDoubleRight', 16)}
        </button>
      `;
    } else if (this.viewMode === 'months') {
      content += `
        <button type="button" class="c-datepicker__nav-button c-datepicker__nav-button--prev-year" aria-label="Previous year">
          ${createPhosphorIcon('CaretLeft', 16)}
        </button>
        <button type="button" class="c-datepicker__view-switch" aria-label="Switch to year view">
          ${currentYear}
        </button>
        <button type="button" class="c-datepicker__nav-button c-datepicker__nav-button--next-year" aria-label="Next year">
          ${createPhosphorIcon('CaretRight', 16)}
        </button>
      `;
    } else if (this.viewMode === 'years') {
      const startYear = currentYear - 6;
      const endYear = currentYear + 5;
      
      content += `
        <button type="button" class="c-datepicker__nav-button c-datepicker__nav-button--prev-year" aria-label="Previous year range">
          ${createPhosphorIcon('CaretLeft', 16)}
        </button>
        <button type="button" class="c-datepicker__view-switch" aria-label="Current year range">
          ${startYear} - ${endYear}
        </button>
        <button type="button" class="c-datepicker__nav-button c-datepicker__nav-button--next-year" aria-label="Next year range">
          ${createPhosphorIcon('CaretRight', 16)}
        </button>
      `;
    }
    
    content += `</div>`;
    
    // Calendar body
    content += `<div class="c-datepicker__body">`;
    
    if (this.viewMode === 'days') {
      // Weekday headers
      content += `<div class="c-datepicker__weekdays" role="row">`;
      
      if (this.options.showWeekNumbers) {
        content += `<div class="c-datepicker__weekday c-datepicker__weeknumber" role="columnheader">#</div>`;
      }
      
      const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      weekdays.forEach(day => {
        content += `<div class="c-datepicker__weekday" role="columnheader">${day}</div>`;
      });
      
      content += `</div>`;
      
      // Days grid
      content += `<div class="c-datepicker__days" role="grid">`;
      
      const days = this._generateDays();
      const today = new Date();
      
      days.forEach((dateObj, index) => {
        const isSelectable = this._isDateSelectable(dateObj.year, dateObj.month, dateObj.day);
        const isSelected = this._isDateSelected(dateObj.year, dateObj.month, dateObj.day);
        const isTodayDate = this._isToday(dateObj.year, dateObj.month, dateObj.day, today);
        const dateValue = new Date(dateObj.year, dateObj.month, dateObj.day);
        
        // Add week number if enabled
        if (this.options.showWeekNumbers && index % 7 === 0) {
          const weekNum = this._getWeekNumber(dateValue);
          
          content += `
            <div class="c-datepicker__weeknumber" aria-label="Week ${weekNum}">
              ${weekNum}
            </div>
          `;
        }
        
        const dayClasses = [
          'c-datepicker__day',
          !dateObj.isCurrentMonth ? 'c-datepicker__day--outside' : '',
          isSelected ? 'c-datepicker__day--selected' : '',
          isTodayDate ? 'c-datepicker__day--today' : '',
          !isSelectable ? 'c-datepicker__day--disabled' : ''
        ].filter(Boolean).join(' ');
        
        content += `
          <button
            type="button"
            class="${dayClasses}"
            ${!isSelectable ? 'disabled' : ''}
            tabindex="${dateObj.isCurrentMonth ? 0 : -1}"
            aria-label="${dateValue.toLocaleDateString()}"
            aria-selected="${isSelected ? 'true' : 'false'}"
            role="gridcell"
          >
            ${dateObj.day}
          </button>
        `;
      });
      
      content += `</div>`;
    } else if (this.viewMode === 'months') {
      // Months grid
      content += `<div class="c-datepicker__months" role="grid">`;
      
      for (let i = 0; i < 12; i++) {
        const monthName = getMonthName(i).substring(0, 3);
        const isSelected = this.selectedDate && 
                           this.selectedDate.getMonth() === i && 
                           this.selectedDate.getFullYear() === currentYear;
        
        content += `
          <button
            type="button"
            class="c-datepicker__month ${isSelected ? 'c-datepicker__month--selected' : ''}"
            aria-selected="${isSelected ? 'true' : 'false'}"
            role="gridcell"
          >
            ${monthName}
          </button>
        `;
      }
      
      content += `</div>`;
    } else if (this.viewMode === 'years') {
      // Years grid
      content += `<div class="c-datepicker__years" role="grid">`;
      
      const startYear = currentYear - 6;
      for (let i = 0; i < 12; i++) {
        const year = startYear + i;
        const isSelected = this.selectedDate && this.selectedDate.getFullYear() === year;
        
        content += `
          <button
            type="button"
            class="c-datepicker__year ${isSelected ? 'c-datepicker__year--selected' : ''}"
            aria-selected="${isSelected ? 'true' : 'false'}"
            role="gridcell"
          >
            ${year}
          </button>
        `;
      }
      
      content += `</div>`;
    }
    
    content += `</div>`;
    
    // Calendar footer (only for days view)
    if (this.viewMode === 'days') {
      content += `<div class="c-datepicker__footer">`;
      
      if (this.options.showTodayButton) {
        content += `
          <button
            type="button"
            class="c-datepicker__today-button"
            aria-label="Go to today"
          >
            Today
          </button>
        `;
      }
      
      if (!this.options.inline) {
        content += `
          <button
            type="button"
            class="c-datepicker__close-button"
            aria-label="Close calendar"
          >
            Close
          </button>
        `;
      }
      
      content += `</div>`;
    }
    
    this.calendar.innerHTML = content;
    
    if (!this.options.inline) {
      this._positionCalendar();
    }
  }

  /**
   * Generate an array of date objects for the current month view
   */
  private _generateDays(): Array<{ day: number, month: number, year: number, isCurrentMonth: boolean }> {
    const currentMonth = this.viewDate.getMonth();
    const currentYear = this.viewDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(
      currentMonth === 0 ? currentYear - 1 : currentYear,
      currentMonth === 0 ? 11 : currentMonth - 1
    );
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        month: currentMonth === 0 ? 11 : currentMonth - 1,
        year: currentMonth === 0 ? currentYear - 1 : currentYear,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true
      });
    }
    
    // Next month days
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
  }

  /**
   * Show the calendar
   */
  private _showCalendar(): void {
    if (this.isOpen) return;
    
    this.isOpen = true;
    
    if (this.calendar) {
      if (!this.options.inline) {
        document.body.appendChild(this.calendar);
        this._positionCalendar();
      }
      
      this.calendar.classList.add('is-open');
      
      // Dispatch open event
      this.element.dispatchEvent(new CustomEvent('datepicker:open', {
        bubbles: true,
        detail: { instance: this }
      }));
    }
  }

  /**
   * Hide the calendar
   */
  private _hideCalendar(): void {
    if (!this.isOpen || this.options.inline) return;
    
    this.isOpen = false;
    
    if (this.calendar) {
      this.calendar.classList.remove('is-open');
      
      if (!this.options.inline && this.calendar.parentNode) {
        document.body.removeChild(this.calendar);
      }
      
      // Dispatch close event
      this.element.dispatchEvent(new CustomEvent('datepicker:close', {
        bubbles: true,
        detail: { instance: this }
      }));
    }
  }

  /**
   * Position the calendar relative to the input
   */
  private _positionCalendar(): void {
    if (!this.calendar || !this.input) return;
    
    const inputRect = this.input.getBoundingClientRect();
    const calendarRect = this.calendar.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    let top, left;
    
    // Base position calculation on placement option
    switch (this.options.placement) {
      case 'top-start':
        top = inputRect.top - calendarRect.height + scrollTop;
        left = inputRect.left + scrollLeft;
        break;
      case 'top-end':
        top = inputRect.top - calendarRect.height + scrollTop;
        left = inputRect.right - calendarRect.width + scrollLeft;
        break;
      case 'bottom-end':
        top = inputRect.bottom + scrollTop;
        left = inputRect.right - calendarRect.width + scrollLeft;
        break;
      case 'bottom-start':
      default:
        top = inputRect.bottom + scrollTop;
        left = inputRect.left + scrollLeft;
        break;
    }
    
    // Ensure the calendar stays within viewport
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    if (left + calendarRect.width > viewport.width) {
      left = viewport.width - calendarRect.width;
    }
    
    if (left < 0) {
      left = 0;
    }
    
    if (top + calendarRect.height > viewport.height) {
      top = inputRect.top - calendarRect.height + scrollTop;
    }
    
    if (top < 0) {
      top = inputRect.bottom + scrollTop;
    }
    
    this.calendar.style.top = `${top}px`;
    this.calendar.style.left = `${left}px`;
  }

  /**
   * Select a date
   * @param day - The day to select
   */
  private _selectDate(day: number): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const newDate = new Date(year, month, day);
    
    if (this.options.minDate && newDate < this.options.minDate) return;
    if (this.options.maxDate && newDate > this.options.maxDate) return;
    
    this.selectedDate = newDate;
    
    // Update input value
    if (this.input) {
      this.input.value = formatDate(newDate, this.options.format);
    }
    
    // Update calendar UI
    this._updateCalendar();
    
    // Close calendar if not inline
    if (!this.options.inline) {
      this._hideCalendar();
    }
    
    // Dispatch change event
    this.element.dispatchEvent(new CustomEvent('datepicker:change', {
      bubbles: true,
      detail: { date: this.selectedDate }
    }));
  }

  /**
   * Navigate to previous month
   */
  private _prevMonth(): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    
    this.viewDate = new Date(year, month - 1, 1);
    this._updateCalendar();
  }

  /**
   * Navigate to next month
   */
  private _nextMonth(): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    
    this.viewDate = new Date(year, month + 1, 1);
    this._updateCalendar();
  }

  /**
   * Navigate to previous year
   */
  private _prevYear(): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    
    this.viewDate = new Date(year - 1, month, 1);
    this._updateCalendar();
  }

  /**
   * Navigate to next year
   */
  private _nextYear(): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    
    this.viewDate = new Date(year + 1, month, 1);
    this._updateCalendar();
  }

  /**
   * Switch to month view
   */
  private _switchToMonthView(): void {
    this.viewMode = 'months';
    this._updateCalendar();
  }

  /**
   * Switch to year view
   */
  private _switchToYearView(): void {
    this.viewMode = 'years';
    this._updateCalendar();
  }

  /**
   * Select a month
   * @param month - The month index (0-11)
   */
  private _selectMonth(month: number): void {
    const year = this.viewDate.getFullYear();
    
    this.viewDate = new Date(year, month, 1);
    this.viewMode = 'days';
    this._updateCalendar();
  }

  /**
   * Select a year
   * @param year - The year
   */
  private _selectYear(year: number): void {
    const month = this.viewDate.getMonth();
    
    this.viewDate = new Date(year, month, 1);
    this.viewMode = 'months';
    this._updateCalendar();
  }

  /**
   * Go to today's date
   */
  private _goToToday(): void {
    const today = new Date();
    this.viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this._selectDate(today.getDate());
  }

  /**
   * Clear the selected date
   */
  private _clearDate(): void {
    this.selectedDate = null;
    
    if (this.input) {
      this.input.value = '';
    }
    
    this._updateCalendar();
    
    // Dispatch change event
    this.element.dispatchEvent(new CustomEvent('datepicker:change', {
      bubbles: true,
      detail: { date: null }
    }));
  }

  /**
   * Check if a date is selectable
   */
  private _isDateSelectable(year: number, month: number, day: number): boolean {
    const date = new Date(year, month, day);
    return isDateInRange(date, this.options.minDate, this.options.maxDate);
  }

  /**
   * Check if a date is selected
   */
  private _isDateSelected(year: number, month: number, day: number): boolean {
    if (!this.selectedDate) return false;
    
    return (
      this.selectedDate.getFullYear() === year &&
      this.selectedDate.getMonth() === month &&
      this.selectedDate.getDate() === day
    );
  }

  /**
   * Check if a date is today
   */
  private _isToday(year: number, month: number, day: number, today: Date): boolean {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  }

  /**
   * Get week number for a date
   */
  private _getWeekNumber(date: Date): number {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  }

  // Public API methods

  /**
   * Set a new date
   * @param date - The date to set
   */
  public setDate(date: Date | null): void {
    if (date === null) {
      this._clearDate();
      return;
    }
    
    this.selectedDate = date;
    this.viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
    
    if (this.input) {
      this.input.value = formatDate(date, this.options.format);
    }
    
    this._updateCalendar();
    
    // Dispatch change event
    this.element.dispatchEvent(new CustomEvent('datepicker:change', {
      bubbles: true,
      detail: { date }
    }));
  }

  /**
   * Get the currently selected date
   */
  public getDate(): Date | null {
    return this.selectedDate;
  }

  /**
   * Open the calendar
   */
  public open(): void {
    this._showCalendar();
  }

  /**
   * Close the calendar
   */
  public close(): void {
    this._hideCalendar();
  }

  /**
   * Clear the selected date
   */
  public clear(): void {
    this._clearDate();
  }

  /**
   * Update the datepicker options
   * @param options - New options to apply
   */
  public updateOptions(options: any): void {
    this.options = { ...this.options, ...options };
    this._updateCalendar();
  }

  /**
   * Destroy the datepicker instance
   */
  public destroy(): void {
    // Remove event listeners
    if (this.input) {
      this.input.removeEventListener('focus', this.eventListeners.inputFocus);
      this.input.removeEventListener('input', this.eventListeners.inputChange);
    }
    
    document.removeEventListener('click', this.eventListeners.documentClick);
    
    if (this.calendar) {
      this.calendar.removeEventListener('click', this.eventListeners.calendarClick);
      
      // Remove calendar from DOM
      if (this.calendar.parentNode) {
        this.calendar.parentNode.removeChild(this.calendar);
      }
    }
    
    // Dispatch destroy event
    this.element.dispatchEvent(new CustomEvent('datepicker:destroy', {
      bubbles: true,
      detail: { instance: this }
    }));
  }

  /**
   * Initialize all datepickers in the document
   */
  public static initializeAll(selector: string = '[data-datepicker]', options: any = {}): DatePicker[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => new DatePicker(element as HTMLElement, options));
  }
} 