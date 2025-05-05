import { UPLOAD } from '../../../lib/constants/components';

/**
 * Interface for Upload options
 */
interface UploadOptions {
  disabled?: boolean;
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  onFileSelect?: (files: File[]) => void;
  onFileUpload?: (file: File, progress: number) => void;
  onFileUploadComplete?: (file: File) => void;
  onFileUploadError?: (file: File, error: string) => void;
  [key: string]: any;
}

/**
 * Interface for Upload instance
 */
interface UploadInstance {
  setStatus: (status: 'idle' | 'loading' | 'success' | 'error', message?: string) => void;
  setProgress: (percentage: number, timeLeft?: string) => void;
  setFile: (file: File | null) => void;
  disable: () => void;
  enable: () => void;
  destroy: () => void;
}

/**
 * Default options for the Upload component
 */
const DEFAULT_OPTIONS: UploadOptions = {
  disabled: false,
  maxSizeInMB: 5,
  acceptedFileTypes: ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'],
  multiple: false
};

/**
 * Class representing an Upload component
 */
class Upload implements UploadInstance {
  private selector: string | Element;
  private $element: HTMLElement | null;
  private $input: HTMLInputElement | null;
  private $button: HTMLButtonElement | null;
  private $loader: HTMLElement | null;
  private $loaderTitle: HTMLElement | null;
  private $loaderProgress: HTMLElement | null;
  private $loaderClose: HTMLButtonElement | null;
  private options: UploadOptions;
  private currentFile: File | null;
  private dragCounter: number;

  /**
   * Creates an instance of Upload
   * @param selector - CSS selector string or DOM Element
   * @param options - Custom options to override defaults
   */
  constructor(selector: string | Element, options = {}) {
    this.selector = selector || UPLOAD.SELECTORS.UPLOAD;
    this.$element =
      typeof selector === 'string'
        ? document.querySelector<HTMLElement>(selector)
        : selector as HTMLElement;
    this.options = { ...DEFAULT_OPTIONS, ...options } as UploadOptions;
    this.$input = null;
    this.$button = null;
    this.$loader = null;
    this.$loaderTitle = null;
    this.$loaderProgress = null;
    this.$loaderClose = null;
    this.currentFile = null;
    this.dragCounter = 0;
    this._initialize();
  }

  /**
   * Initialize the upload component
   */
  private _initialize(): void {
    if (!this.$element) return;

    // Create a hidden file input element
    this._createHiddenInput();

    // Get references to elements
    this.$button = this.$element.querySelector<HTMLButtonElement>(UPLOAD.SELECTORS.BUTTON);
    this.$loader = this.$element.querySelector<HTMLElement>(UPLOAD.SELECTORS.LOADER);
    this.$loaderTitle = this.$element?.querySelector<HTMLElement>(UPLOAD.SELECTORS.LOADER_TITLE);
    this.$loaderProgress = this.$element?.querySelector<HTMLElement>(UPLOAD.SELECTORS.LOADER_PROGRESS);
    this.$loaderClose = this.$element?.querySelector<HTMLButtonElement>(UPLOAD.SELECTORS.LOADER_CLOSE);

    // Apply disabled state if specified
    if (this.options.disabled) {
      this.disable();
    }

    // Set up event listeners
    this._setupEventListeners();
  }

  /**
   * Creates a hidden file input element and appends it to the element
   */
  private _createHiddenInput(): void {
    if (!this.$element) return;

    // Create input element
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.accept = this.options.acceptedFileTypes?.join(',') || '';
    input.multiple = !!this.options.multiple;
    
    // Append to element
    this.$element.appendChild(input);
    this.$input = input;
  }

  /**
   * Set up all event listeners
   */
  private _setupEventListeners(): void {
    if (!this.$element || !this.$input || !this.$button) return;

    // Button click handler
    this.$button.addEventListener('click', this._handleButtonClick.bind(this));

    // Input change handler
    this.$input.addEventListener('change', this._handleFileSelect.bind(this));

    // Drag and drop handlers
    this.$element.addEventListener('dragenter', this._handleDragEnter.bind(this));
    this.$element.addEventListener('dragleave', this._handleDragLeave.bind(this));
    this.$element.addEventListener('dragover', this._handleDragOver.bind(this));
    this.$element.addEventListener('drop', this._handleDrop.bind(this));

    // Close button handler
    if (this.$loaderClose) {
      this.$loaderClose.addEventListener('click', this._handleClose.bind(this));
    }
  }

  /**
   * Handle button click
   */
  private _handleButtonClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.$input && !this.options.disabled) {
      this.$input.click();
    }
  }

  /**
   * Handle file selection from the input element
   */
  private _handleFileSelect(event: Event): void {
    if (!this.$input?.files?.length) return;
    
    const files = Array.from(this.$input.files);
    this._processFiles(files);
  }

  /**
   * Handle drag enter event
   */
  private _handleDragEnter(event: DragEvent): void {
    event.preventDefault();
    if (this.options.disabled) return;
    
    this.dragCounter++;
    if (this.dragCounter === 1) {
      this.$element?.classList.add(UPLOAD.CLASSES.DRAGGING);
    }
  }

  /**
   * Handle drag leave event
   */
  private _handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    if (this.options.disabled) return;
    
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.$element?.classList.remove(UPLOAD.CLASSES.DRAGGING);
    }
  }

  /**
   * Handle drag over event
   */
  private _handleDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.options.disabled) return;
  }

  /**
   * Handle drop event
   */
  private _handleDrop(event: DragEvent): void {
    event.preventDefault();
    if (this.options.disabled) return;
    
    this.dragCounter = 0;
    this.$element?.classList.remove(UPLOAD.CLASSES.DRAGGING);
    
    if (!event.dataTransfer?.files.length) return;
    
    const files = Array.from(event.dataTransfer.files);
    this._processFiles(files);
  }

  /**
   * Handle close button click
   */
  private _handleClose(event: MouseEvent): void {
    event.preventDefault();
    
    // Reset state
    this.setStatus('idle');
    this.setFile(null);
    
    // Reset input
    if (this.$input) {
      this.$input.value = '';
    }
  }

  /**
   * Process the selected files
   */
  private _processFiles(files: File[]): void {
    if (!files.length) return;
    
    // If multiple is not allowed, take only the first file
    const filesToProcess = this.options.multiple ? files : [files[0]];
    
    // Validate files
    const validFiles = filesToProcess.filter(file => this._validateFile(file));
    
    // Notify about file selection
    if (validFiles.length && this.options.onFileSelect) {
      this.options.onFileSelect(validFiles);
    }
    
    // Process the first valid file
    if (validFiles.length) {
      this.setFile(validFiles[0]);
      this._simulateUpload(validFiles[0]);
    }
  }

  /**
   * Validate a file based on size and type
   */
  private _validateFile(file: File): boolean {
    const maxSizeInBytes = (this.options.maxSizeInMB || 5) * 1024 * 1024;
    
    // Check file size
    if (file.size > maxSizeInBytes) {
      this.setStatus('error', `File too large. Maximum size is ${this.options.maxSizeInMB}MB.`);
      return false;
    }
    
    // Check file type if acceptedFileTypes is provided
    if (this.options.acceptedFileTypes?.length) {
      const isAcceptedType = this.options.acceptedFileTypes.some(type => {
        // Handle wildcards like image/*
        if (type.endsWith('/*')) {
          const mainType = type.split('/')[0];
          return file.type.startsWith(`${mainType}/`);
        }
        return file.type === type;
      });
      
      if (!isAcceptedType) {
        this.setStatus('error', 'File type not supported.');
        return false;
      }
    }
    
    return true;
  }

  /**
   * Simulate a file upload process
   * In a real implementation, this would be replaced with actual upload logic
   */
  private _simulateUpload(file: File): void {
    this.setStatus('loading');
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += 5;
      
      if (progress < 100) {
        this.setProgress(progress, `${Math.ceil((100 - progress) / 5)} seconds left`);
        
        if (this.options.onFileUpload) {
          this.options.onFileUpload(file, progress);
        }
      } else {
        clearInterval(interval);
        this.setStatus('success', 'Upload successful');
        
        if (this.options.onFileUploadComplete) {
          this.options.onFileUploadComplete(file);
        }
      }
    }, 500);
  }

  /**
   * Set current file
   */
  public setFile(file: File | null): void {
    this.currentFile = file;
    
    if (file && this.$loaderTitle) {
      this.$loaderTitle.textContent = file.name;
    }
  }

  /**
   * Set upload progress
   */
  public setProgress(percentage: number, timeLeft?: string): void {
    if (!this.$element || !this.$loaderProgress) return;
    
    // Set percentage as CSS variable
    this.$element.style.setProperty(UPLOAD.ATTRIBUTES.PERCENTAGE, percentage.toString());
    
    // Update the loader elements if they exist
    const $par = this.$element.querySelector<HTMLElement>(UPLOAD.SELECTORS.LOADER_PAR);
    const $time = this.$element.querySelector<HTMLElement>(UPLOAD.SELECTORS.LOADER_TIME);
    
    if ($par) {
      $par.textContent = `${percentage}%`;
    }
    
    if ($time && timeLeft) {
      $time.textContent = timeLeft;
    }
  }

  /**
   * Set upload status
   */
  public setStatus(status: 'idle' | 'loading' | 'success' | 'error', message?: string): void {
    if (!this.$element) return;
    
    // Remove all status classes
    this.$element.classList.remove(
      UPLOAD.CLASSES.LOADING,
      UPLOAD.CLASSES.SUCCESS,
      UPLOAD.CLASSES.ERROR
    );
    
    // Add appropriate class based on status
    switch (status) {
      case 'loading':
        this.$element.classList.add(UPLOAD.CLASSES.LOADING);
        break;
      case 'success':
        this.$element.classList.add(UPLOAD.CLASSES.SUCCESS);
        break;
      case 'error':
        this.$element.classList.add(UPLOAD.CLASSES.ERROR);
        break;
    }
    
    // Update message if provided and loader exists
    if (message && this.$loaderProgress) {
      this.$loaderProgress.textContent = message;
    }
  }

  /**
   * Disable the upload component
   */
  public disable(): void {
    if (!this.$element || !this.$button) return;
    
    this.$element.classList.add(UPLOAD.CLASSES.DISABLED);
    this.$button.disabled = true;
    this.options.disabled = true;
  }

  /**
   * Enable the upload component
   */
  public enable(): void {
    if (!this.$element || !this.$button) return;
    
    this.$element.classList.remove(UPLOAD.CLASSES.DISABLED);
    this.$button.disabled = false;
    this.options.disabled = false;
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    if (!this.$element || !this.$input || !this.$button) return;
    
    // Remove event listeners
    this.$button.removeEventListener('click', this._handleButtonClick.bind(this));
    this.$input.removeEventListener('change', this._handleFileSelect.bind(this));
    this.$element.removeEventListener('dragenter', this._handleDragEnter.bind(this));
    this.$element.removeEventListener('dragleave', this._handleDragLeave.bind(this));
    this.$element.removeEventListener('dragover', this._handleDragOver.bind(this));
    this.$element.removeEventListener('drop', this._handleDrop.bind(this));
    
    if (this.$loaderClose) {
      this.$loaderClose.removeEventListener('click', this._handleClose.bind(this));
    }
    
    // Remove input element
    if (this.$input.parentNode) {
      this.$input.parentNode.removeChild(this.$input);
    }
  }
}

/**
 * Initialize all upload components in the document
 * @param {string|Element} selector - CSS selector string or DOM Element
 * @param {Object} options - Custom options to override defaults
 * @returns {UploadInstance[]} Array of Upload instances
 */
export function initializeUploads(selector = UPLOAD.SELECTORS.UPLOAD, options = {}): UploadInstance[] {
  const uploadInstances: UploadInstance[] = [];
  const uploadElements = document.querySelectorAll<HTMLElement>(typeof selector === 'string' ? selector : UPLOAD.SELECTORS.UPLOAD);

  if (!uploadElements.length) return uploadInstances;

  uploadElements.forEach((element) => {
    try {
      const instance = new Upload(element, options);
      uploadInstances.push(instance);
    } catch (error) {
      console.error('Error initializing upload:', error);
    }
  });

  return uploadInstances;
}

export default Upload; 