/**
 * Get the name of a month by its index (0-11)
 */
export function getMonthName(month: number): string {
  const date = new Date();
  date.setMonth(month);

  return date.toLocaleString('default', { month: 'long' });
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week of the first day of a month (0-6, where 0 is Sunday)
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Format a date according to the specified format
 */
export function formatDate(date: Date, format: string): string {
  if (!date) return '';

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Simple formatting for the most common patterns
  return format
    .replace('yyyy', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('M', month.toString())
    .replace('dd', day.toString().padStart(2, '0'))
    .replace('d', day.toString());
}

/**
 * Format a date range for display
 */
export function formatDateRange(
  startDate: Date | null,
  endDate: Date | null,
  format: string
): string {
  if (!startDate) return '';

  if (!endDate) {
    return `${formatDate(startDate, format)} - Select end date`;
  }

  return `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`;
}

/**
 * Parse a date string according to the specified format
 */
export function parseDate(dateStr: string, format: string): Date | null {
  if (!dateStr) return null;

  // Simple parsing for common formats
  const normalized = format.toLowerCase();

  if (normalized === 'mm/dd/yyyy') {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    const monthStr = parts[0];
    const dayStr = parts[1];
    const yearStr = parts[2];

    if (!monthStr || !dayStr || !yearStr) return null;

    const month = parseInt(monthStr, 10) - 1;
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) return null;

    return new Date(year, month, day);
  }

  if (normalized === 'dd/mm/yyyy') {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    const dayStr = parts[0];
    const monthStr = parts[1];
    const yearStr = parts[2];

    if (!dayStr || !monthStr || !yearStr) return null;

    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) return null;

    return new Date(year, month, day);
  }

  if (normalized === 'yyyy-mm-dd') {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;

    const yearStr = parts[0];
    const monthStr = parts[1];
    const dayStr = parts[2];

    if (!yearStr || !monthStr || !dayStr) return null;

    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const day = parseInt(dayStr, 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) return null;

    return new Date(year, month, day);
  }

  // Fallback to native parsing
  const parsedDate = new Date(dateStr);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
}

/**
 * Try to parse a date range string (e.g. "01/01/2023 - 01/15/2023")
 */
export function parseDateRange(
  rangeStr: string,
  format: string
): { startDate: Date | null; endDate: Date | null } {
  if (!rangeStr) return { startDate: null, endDate: null };

  const parts = rangeStr.split('-');
  if (parts.length !== 2) return { startDate: null, endDate: null };

  const startDateStr = parts[0]?.trim();
  const endDateStr = parts[1]?.trim();

  if (!startDateStr || !endDateStr) {
    return { startDate: null, endDate: null };
  }

  const startDate = parseDate(startDateStr, format);
  const endDate = parseDate(endDateStr, format);

  return { startDate, endDate };
}

/**
 * Check if a date is within a min and max range
 */
export function isDateInRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (!date) return false;

  if (minDate && date < minDate) return false;
  if (maxDate && date > maxDate) return false;

  return true;
}

/**
 * Check if a date is between startDate and endDate (inclusive)
 */
export function isDateInSelectedRange(
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean {
  if (!date || !startDate || !endDate) return false;

  // Handle case where end date is before start date
  if (endDate < startDate) {
    return date >= endDate && date <= startDate;
  }

  return date >= startDate && date <= endDate;
}
