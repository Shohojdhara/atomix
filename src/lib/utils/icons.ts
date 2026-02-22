/**
 * Icon path definitions for common Phosphor icons
 */
const ICON_PATHS: Record<string, string> = {
  House:
    'M240 121.6V240h-48v-72a24 24 0 0 0-24-24h-80a24 24 0 0 0-24 24v72H16V121.6a16 16 0 0 1 5.4-12L111.4 29a16 16 0 0 1 21.2 0l90 80.6a16 16 0 0 1 5.4 12Z',
  Package:
    'M223.68 66.15 135.68 18a15.88 15.88 0 0 0-15.36 0l-88 48.13a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03ZM128 32.59l74.12 40.55-32 17.56-74.12-40.55ZM96 68.08l73.56 40.23-32.04 17.53L64 85.64ZM40 95.83l72 39.39v79.23l-72-39.4Zm144 79.22v-79.23l72-39.39v79.22Z',
  Folder:
    'M216 72h-84.7L104.4 44.2A16.05 16.05 0 0 0 92.7 40H40a16 16 0 0 0-16 16v144.3a15.91 15.91 0 0 0 15.9 15.7h176.2a15.91 15.91 0 0 0 15.9-15.7V88a16 16 0 0 0-16-16Z',
  Tag: 'M246.15 128.6 183.06 65.5l.09-24.21A16.05 16.05 0 0 0 167 25.14l-24.1.09L79.4 88.85a16 16 0 0 0 0 22.63l67.26 67.27a16 16 0 0 0 22.63 0l76.86-76.86a16 16 0 0 0 0-23.29ZM160 152l-56-56 56-56 56 56Zm-16-72a16 16 0 1 1-16 16 16 16 0 0 1 16-16Z',
  CaretRight:
    'M181.66 133.66l-80 80A8 8 0 0 1 88 208V48a8 8 0 0 1 13.66-5.66l80 80a8 8 0 0 1 0 11.32Z',
  CaretDown:
    'M208 96v16a8 8 0 0 1-2.34 5.66l-80 80a8 8 0 0 1-11.32 0l-80-80A8 8 0 0 1 32 112V96a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8Z',
  User: 'M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z',
  Home: 'M224 115.55V208a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16v-40a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v40a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-92.45a16 16 0 0 1 5.17-11.78l80-75.48a16 16 0 0 1 21.66 0l80 75.48a16 16 0 0 1 5.17 11.78Z',
  // Added icons for DatePicker
  X: 'M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128l66.35 66.34Z',
  Calendar:
    'M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32H48V48Zm136 160H48V96h160v112Z',
  CaretDoubleLeft:
    'M181.66 181.66a8 8 0 0 1-11.32 0L120 131.31V160a8 8 0 0 1-13.66 5.66l-48-48a8 8 0 0 1 0-11.32l48-48A8 8 0 0 1 120 64v28.69l50.34-50.35a8 8 0 0 1 11.32 11.32l-56 56a8 8 0 0 1-11.32 0L102.63 98 64 128l38.63 30L114.34 146.63a8 8 0 0 1 11.32 0l56 56a8 8 0 0 1 0 11.32Z',
  CaretDoubleRight:
    'M74.34 181.66a8 8 0 0 0 11.32 0L136 131.31V160a8 8 0 0 0 13.66 5.66l48-48a8 8 0 0 0 0-11.32l-48-48A8 8 0 0 0 136 64v28.69L85.66 42.34a8 8 0 0 0-11.32 11.32l56 56a8 8 0 0 0 11.32 0l11.71-11.71L192 128l-38.63 30-11.71-11.71a8 8 0 0 0-11.32 0l-56 56a8 8 0 0 0 0 11.32Z',
};

/**
 * Create a Phosphor icon SVG element
 * @param name - Icon name
 * @param size - Icon size in pixels
 * @returns SVG element as HTML string
 */
export function createPhosphorIcon(name: string, size: number = 16): string {
  const path = ICON_PATHS[name] || '';

  if (!path) {
    console.warn(
      'Icon not found in icon library:',
      typeof name === 'string' ? name.replace(/[^a-zA-Z0-9_-]/g, '_') : 'invalid_name'
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="currentColor" viewBox="0 0 256 256">
    <path d="${path}"></path>
  </svg>`;
}

/**
 * Create an icon element
 * @param name - Icon name
 * @param size - Icon size in pixels
 * @param className - Additional CSS class name
 * @returns Icon element
 */
export function createIconElement(
  name: string,
  size: number = 16,
  className: string = ''
): HTMLSpanElement {
  const iconElement = document.createElement('span');
  iconElement.className = className || 'c-icon';
  iconElement.style.display = 'inline-flex';
  iconElement.style.alignItems = 'center';
  iconElement.style.justifyContent = 'center';
  iconElement.innerHTML = createPhosphorIcon(name, size);

  return iconElement;
}

/**
 * Get all available icon names
 * @returns Array of icon names
 */
export function getAvailableIcons(): string[] {
  return Object.keys(ICON_PATHS);
}
