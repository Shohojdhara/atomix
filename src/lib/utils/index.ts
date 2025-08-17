// Export DOM utilities
export * from './dom';

// Export other utilities as needed

// Export icon utilities
export * from './icons';

/**
 * Class name utility function to conditionally join classNames together
 * @param {...any} args - Class names or conditional class names
 * @returns {string} - Joined class names
 */
export function cn(...args: any[]): string {
  return args
    .filter(Boolean)
    .flat()
    .map((arg) => String(arg).trim())
    .filter(Boolean)
    .join(' ');
}

/**
 * Generate a UUID v4 compatible string without relying on Node.js crypto
 * This is a browser-compatible alternative to the uuid package
 * @returns A UUID v4 compatible string
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param url - YouTube URL
 * @returns YouTube video ID or null if not found
 */
export function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? (match[1] as string) : null;
}

/**
 * Check if a URL is a YouTube URL
 * @param url - URL to check
 * @returns True if the URL is a YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/.test(url);
}