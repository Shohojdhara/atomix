import PhotoViewer from './index';

/**
 * PhotoViewer instance storage for tracking active instances
 */
const instances = new WeakMap<HTMLElement, PhotoViewer>();

/**
 * Parse data attributes from an element to create PhotoViewer options
 */
function parseDataAttributes(element: HTMLElement): any {
  const dataset = element.dataset;
  const options: any = {};

  // Parse basic options
  if (dataset.startIndex) options.startIndex = parseInt(dataset.startIndex, 10);
  if (dataset.enableKeyboardNavigation) options.enableKeyboardNavigation = dataset.enableKeyboardNavigation === 'true';
  if (dataset.enableGestures) options.enableGestures = dataset.enableGestures === 'true';
  if (dataset.enableFullscreen) options.enableFullscreen = dataset.enableFullscreen === 'true';
  if (dataset.thumbnailPosition) options.thumbnailPosition = dataset.thumbnailPosition;

  // Parse images from data attribute or child elements
  if (dataset.images) {
    try {
      options.images = JSON.parse(dataset.images);
    } catch (e) {
      console.warn('PhotoViewer: Invalid JSON in data-images attribute');
    }
  } else {
    // Extract images from child img elements
    const imgElements = element.querySelectorAll('img');
    options.images = Array.from(imgElements).map(img => ({
      src: img.src,
      alt: img.alt,
      title: img.title || img.alt,
      thumbnail: img.dataset.thumbnail
    }));
  }

  return options;
}

/**
 * Initialize PhotoViewer components from data attributes
 * Looks for elements with [data-photoviewer] attribute
 */
export function initFromDataAttributes(): PhotoViewer[] {
  const photoViewerInstances: PhotoViewer[] = [];
  
  document.querySelectorAll('[data-photoviewer]').forEach(element => {
    // Skip if already initialized
    if (instances.has(element as HTMLElement)) return;
    
    try {
      const options = parseDataAttributes(element as HTMLElement);
      const instance = new PhotoViewer(element as HTMLElement, options);
      instances.set(element as HTMLElement, instance);
      photoViewerInstances.push(instance);
    } catch (error) {
      console.error('PhotoViewer: Failed to initialize instance', error);
    }
  });
  
  return photoViewerInstances;
}

/**
 * Get a PhotoViewer instance from an element
 */
export function getInstance(element: string | HTMLElement): PhotoViewer | null {
  const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
  if (!el) return null;
  
  return instances.get(el) || null;
}

/**
 * Create a new PhotoViewer instance and store it
 */
export function createInstance(element: string | HTMLElement, options: any = {}): PhotoViewer | null {
  const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
  if (!el) return null;
  
  try {
    const instance = new PhotoViewer(el, options);
    instances.set(el, instance);
    return instance;
  } catch (error) {
    console.error('PhotoViewer: Failed to create instance', error);
    return null;
  }
}

/**
 * Dispose a specific PhotoViewer instance
 */
export function disposeInstance(element: string | HTMLElement): boolean {
  const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
  if (!el) return false;
  
  const instance = instances.get(el);
  if (instance) {
    instance.destroy();
    instances.delete(el);
    document.body.classList.remove('is-open-photoviewer');
    return true;
  }
  
  return false;
}

/**
 * Dispose all PhotoViewer instances
 */
export function disposeAll(): void {
  document.querySelectorAll('[data-photoviewer]').forEach(element => {
    const instance = instances.get(element as HTMLElement);
    if (instance) {
      instance.destroy();
      instances.delete(element as HTMLElement);
    }
  });
  document.body.classList.remove('is-open-photoviewer');
}

/**
 * Open a PhotoViewer with images programmatically
 * Creates a temporary container if needed
 */
export function openPhotoViewer(images: Array<string | any>, options: any = {}): PhotoViewer | null {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.zIndex = '9999';
  container.style.display = 'none';
  document.body.appendChild(container);
  
  try {
    const instance = new PhotoViewer(container, { ...options, images });
    instances.set(container, instance);
    
    // Auto-cleanup when closed
    const originalClose = instance.close.bind(instance);
    instance.close = () => {
      originalClose();
      document.body.classList.remove('is-open-photoviewer');
      setTimeout(() => {
        instances.delete(container);
        document.body.removeChild(container);
      }, 100);
    };
    
    instance.open(options.startIndex || 0);
    return instance;
  } catch (error) {
    console.error('PhotoViewer: Failed to open viewer', error);
    document.body.removeChild(container);
    return null;
  }
}

/**
 * Utility function to setup click handlers for gallery elements
 * Automatically creates PhotoViewer instances for image galleries
 */
export function setupGallery(
  gallerySelector: string, 
  imageSelector: string = 'img', 
  options: any = {}
): PhotoViewer[] {
  const galleries = document.querySelectorAll(gallerySelector);
  const instances: PhotoViewer[] = [];
  
  galleries.forEach(gallery => {
    const images = Array.from(gallery.querySelectorAll(imageSelector));
    const imageData = images.map((img: any) => ({
      src: img.src || img.dataset.src,
      alt: img.alt,
      title: img.title || img.alt,
      thumbnail: img.dataset.thumbnail || img.src
    }));
    
    // Add click handlers to images
    images.forEach((img, index) => {
      (img as HTMLElement).style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.preventDefault();
        openPhotoViewer(imageData, { 
          ...options, 
          startIndex: index 
        });
      });
    });
  });
  
  return instances;
}

/**
 * Utility function to check if PhotoViewer is supported
 */
export function isSupported(): boolean {
  return typeof window !== 'undefined' && 
         typeof document !== 'undefined' &&
         'querySelector' in document;
}

/**
 * Get all active PhotoViewer instances
 */
export function getAllInstances(): PhotoViewer[] {
  const allInstances: PhotoViewer[] = [];
  document.querySelectorAll('[data-photoviewer]').forEach(element => {
    const instance = instances.get(element as HTMLElement);
    if (instance) {
      allInstances.push(instance);
    }
  });
  return allInstances;
}

/**
 * Update options for an existing instance
 */
export function updateInstance(element: string | HTMLElement, newOptions: any): boolean {
  const instance = getInstance(element);
  if (!instance) return false;
  
  try {
    // Update images if provided
    if (newOptions.images) {
      instance.setImages(newOptions.images);
    }
    
    // Note: Other options would need to be implemented in the main class
    // This is a basic implementation
    return true;
  } catch (error) {
    console.error('PhotoViewer: Failed to update instance', error);
    return false;
  }
}