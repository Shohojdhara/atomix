import React, { useState, useRef } from 'react';
import { UPLOAD } from '../../lib/constants/components';

export interface UploadProps {
  /**
   * Whether the upload component is disabled
   */
  disabled?: boolean;

  /**
   * Size variant of the upload component
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Maximum file size in MB
   */
  maxSizeInMB?: number;

  /**
   * Accepted file types
   */
  acceptedFileTypes?: string[];

  /**
   * Whether multiple files can be selected
   */
  multiple?: boolean;

  /**
   * Text for the drag and drop section
   */
  title?: string;

  /**
   * Text describing supported file types
   */
  supportedFilesText?: string;

  /**
   * Text for the upload button
   */
  buttonText?: string;

  /**
   * Helper text displayed below the button
   */
  helperText?: string;

  /**
   * Icon component or class name
   */
  icon?: React.ReactNode;

  /**
   * Called when files are selected
   */
  onFileSelect?: (files: File[]) => void;

  /**
   * Called during file upload with progress
   */
  onFileUpload?: (file: File, progress: number) => void;

  /**
   * Called when file upload is complete
   */
  onFileUploadComplete?: (file: File) => void;

  /**
   * Called on file upload errors
   */
  onFileUploadError?: (file: File, error: string) => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Custom style for the upload component
   */
  style?: React.CSSProperties;
}

/**
 * Upload status type
 */
type UploadStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Upload component for file uploads with drag and drop
 */
export const Upload: React.FC<UploadProps> = ({
  disabled = false,
  size = 'md',
  maxSizeInMB = 5,
  acceptedFileTypes = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
  ],
  multiple = false,
  title = 'Drag and Drop files here',
  supportedFilesText = 'Files supported: PDF, XSLS, JPEG, PNG, Scanner',
  buttonText = 'Choose File',
  helperText = `Maximum size: ${maxSizeInMB}MB`,
  icon = <i className="icon-lux-cloud-arrow-up-fill"></i>,
  onFileSelect,
  onFileUpload,
  onFileUploadComplete,
  onFileUploadError,
  className = '',
  style,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<UploadStatus>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dragCounter = useRef(0);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Handle button click
  const handleButtonClick = () => {
    if (inputRef.current && !disabled) {
      inputRef.current.click();
    }
  };

  // Handle drag enter
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    dragCounter.current++;
    if (dragCounter.current === 1) {
      setIsDragging(true);
    }
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    dragCounter.current = 0;
    setIsDragging(false);

    if (!e.dataTransfer.files?.length) return;

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Process files
  const handleFiles = (files: File[]) => {
    if (!files.length) return;

    // If multiple is not allowed, take only the first file
    const filesToProcess = multiple ? files : [files[0]];

    // Validate files
    const validFiles = filesToProcess.filter(
      (file): file is File => file !== undefined && validateFile(file)
    );

    // Notify about file selection
    if (validFiles.length && onFileSelect) {
      onFileSelect(validFiles as File[]);
    }

    // Process the first valid file
    if (validFiles.length) {
      setCurrentFile(validFiles[0] || null);
      if (validFiles[0]) {
        simulateUpload(validFiles[0]);
      }
    }
  };

  // Validate file
  const validateFile = (file: File): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    // Check file size
    if (file.size > maxSizeInBytes) {
      setStatus('error');
      setErrorMessage(`File too large. Maximum size is ${maxSizeInMB}MB.`);
      return false;
    }

    // Check file type if acceptedFileTypes is provided
    if (acceptedFileTypes?.length) {
      const isAcceptedType = acceptedFileTypes.some(type => {
        // Handle wildcards like image/*
        if (type.endsWith('/*')) {
          const mainType = type.split('/')[0];
          return file.type.startsWith(`${mainType}/`);
        }
        return file.type === type;
      });

      if (!isAcceptedType) {
        setStatus('error');
        setErrorMessage('File type not supported.');
        return false;
      }
    }

    return true;
  };

  // Simulate upload (in a real component, this would be an actual upload)
  const simulateUpload = (file: File) => {
    setStatus('loading');
    setUploadProgress(0);

    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;

      if (progress < 100) {
        setUploadProgress(progress);
        setTimeLeft(`${Math.ceil((100 - progress) / 5)} seconds left`);

        if (onFileUpload) {
          onFileUpload(file, progress);
        }
      } else {
        clearInterval(interval);
        setStatus('success');
        setSuccessMessage('Upload successful');

        if (onFileUploadComplete) {
          onFileUploadComplete(file);
        }
      }
    }, 500);
  };

  // Reset upload
  const resetUpload = () => {
    setStatus('idle');
    setCurrentFile(null);
    setUploadProgress(0);
    setTimeLeft(null);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // Build CSS classes
  const uploadClasses = [
    'c-upload',
    size !== 'md' && `c-upload--${size}`,
    isDragging && UPLOAD.CLASSES.DRAGGING,
    disabled && UPLOAD.CLASSES.DISABLED,
    status === 'loading' && 'c-upload--loading',
    status === 'success' && 'c-upload--success',
    status === 'error' && 'c-upload--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={uploadClasses}
      style={style}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className="c-upload__inner"
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`${title}. ${supportedFilesText}. ${helperText}`}
        aria-disabled={disabled}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            handleButtonClick();
          }
        }}
      >
        {/* Hidden file input */}
        <input
          type="file"
          ref={inputRef}
          className="c-upload__input"
          onChange={handleFileChange}
          disabled={disabled}
          accept={acceptedFileTypes.join(',')}
          multiple={multiple}
          aria-hidden="true"
        />

        {/* Drag and drop area content */}
        <div className="c-upload__icon">{icon}</div>
        <h3 className="c-upload__title">{title}</h3>
        <p className="c-upload__text">{supportedFilesText}</p>

        <button
          type="button"
          className="c-upload__btn c-btn"
          onClick={handleButtonClick}
          disabled={disabled}
        >
          {buttonText}
        </button>

        <p className="c-upload__helper-text">{helperText}</p>
      </div>

      {/* Progress and status area */}
      {status !== 'idle' && (
        <div
          className="c-upload__loader"
          style={{ '--upload-loader-percentage': uploadProgress } as React.CSSProperties}
        >
          {currentFile && (
            <div className="c-upload__loader-status">
              <h5 className="c-upload__loader-title">{currentFile.name}</h5>
              <div className="c-upload__loader-progress">
                <div className="c-upload__loader-par">{uploadProgress}%</div>
                <div className="c-upload__loader-time">{timeLeft}</div>
              </div>
            </div>
          )}

          {(status === 'loading' || status === 'error' || status === 'success') && (
            <div className="c-upload__loader-control">
              <div className="c-upload__loader-bar">
                <svg>
                  <circle cx="10" cy="10" r="10"></circle>
                  <circle cx="10" cy="10" r="10"></circle>
                </svg>
              </div>
              <button
                type="button"
                className="c-upload__loader-close"
                onClick={resetUpload}
                aria-label="Close upload progress"
              >
                <i className="icon-lux-x"></i>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Upload.displayName = 'Upload';
export default Upload;
