import React, { useState, useRef, useEffect, useCallback } from 'react';
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
   * Upload endpoint URL. If not provided, upload will be simulated.
   */
  uploadEndpoint?: string;

  /**
   * HTTP method for upload request
   */
  uploadMethod?: 'POST' | 'PUT' | 'PATCH';

  /**
   * Additional headers to include in upload request
   */
  uploadHeaders?: Record<string, string>;

  /**
   * Additional form data fields to include in upload
   */
  uploadData?: Record<string, string>;

  /**
   * Chunk size in MB for chunked uploads (0 = no chunking)
   */
  chunkSizeInMB?: number;

  /**
   * Maximum number of retry attempts for failed uploads
   */
  maxRetries?: number;

  /**
   * Delay in milliseconds between retry attempts
   */
  retryDelay?: number;

  /**
   * Whether to automatically upload files after selection
   */
  autoUpload?: boolean;

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
  onFileUploadComplete?: (file: File, response?: any) => void;

  /**
   * Called on file upload errors
   */
  onFileUploadError?: (file: File, error: string) => void;

  /**
   * Called when upload is cancelled
   */
  onUploadCancel?: (file: File) => void;

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
 * Upload request state
 */
interface UploadRequest {
  xhr: XMLHttpRequest | null;
  abortController: AbortController;
  file: File;
  retryCount: number;
  chunkXhrs?: XMLHttpRequest[];
  intervalId?: NodeJS.Timeout;
}

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
  uploadEndpoint,
  uploadMethod = 'POST',
  uploadHeaders = {},
  uploadData = {},
  chunkSizeInMB = 0,
  maxRetries = 3,
  retryDelay = 1000,
  autoUpload = true,
  onFileSelect,
  onFileUpload,
  onFileUploadComplete,
  onFileUploadError,
  onUploadCancel,
  className = '',
  style,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRequestRef = useRef<UploadRequest | null>(null);
  const startTimeRef = useRef<number | null>(null);

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
      const fileToUpload = validFiles[0];
      if (fileToUpload) {
        setCurrentFile(fileToUpload);
        if (autoUpload) {
          uploadFile(fileToUpload);
        }
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

  // Calculate time remaining based on upload speed
  const calculateTimeRemaining = useCallback((progress: number, elapsedTime: number): string => {
    if (progress <= 0 || elapsedTime <= 0) return '';

    const estimatedTotalTime = (elapsedTime / progress) * 100;
    const remainingTime = estimatedTotalTime - elapsedTime;

    if (remainingTime <= 0) return 'Almost done...';

    const seconds = Math.ceil(remainingTime / 1000);
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} left`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s left`;
  }, []);

  // Upload file chunk
  const uploadChunk = useCallback(
    (
      file: File,
      chunkIndex: number,
      totalChunks: number,
      chunkSize: number,
      chunkXhrs: XMLHttpRequest[]
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append('file', chunk, file.name);
        formData.append('chunkIndex', chunkIndex.toString());
        formData.append('totalChunks', totalChunks.toString());
        formData.append('fileName', file.name);
        formData.append('fileSize', file.size.toString());

        // Add additional form data
        Object.entries(uploadData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const xhr = new XMLHttpRequest();

        // Store XHR for cancellation
        chunkXhrs[chunkIndex] = xhr;

        // Set up progress tracking for this chunk
        xhr.upload.addEventListener('progress', e => {
          if (e.lengthComputable && uploadRequestRef.current) {
            const chunkProgress = (e.loaded / e.total) * 100;
            const overallProgress = ((chunkIndex * chunkSize + e.loaded) / file.size) * 100;

            setUploadProgress(Math.min(overallProgress, 100));

            const elapsedTime = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
            const timeRemaining = calculateTimeRemaining(overallProgress, elapsedTime);
            setTimeLeft(timeRemaining);

            if (onFileUpload) {
              onFileUpload(file, overallProgress);
            }
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = xhr.responseText ? JSON.parse(xhr.responseText) : {};
              resolve(response);
            } catch {
              resolve({});
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error occurred during upload'));
        });

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload was cancelled'));
        });

        xhr.open(uploadMethod, uploadEndpoint!);

        // Set headers
        Object.entries(uploadHeaders).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });

        xhr.send(formData);
      });
    },
    [uploadEndpoint, uploadMethod, uploadHeaders, uploadData, onFileUpload, calculateTimeRemaining]
  );

  // Upload file (with chunking support)
  const uploadFile = useCallback(
    async (file: File, retryCount: number = 0) => {
      // If no endpoint is provided, simulate upload for backward compatibility
      if (!uploadEndpoint) {
        setStatus('loading');
        setUploadProgress(0);
        startTimeRef.current = Date.now();

        // Simulate progress updates
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;

          if (progress < 100) {
            setUploadProgress(progress);
            const elapsedTime = Date.now() - (startTimeRef.current || Date.now());
            const timeRemaining = calculateTimeRemaining(progress, elapsedTime);
            setTimeLeft(timeRemaining);

            if (onFileUpload) {
              onFileUpload(file, progress);
            }
          } else {
            clearInterval(interval);
            setStatus('success');
            setSuccessMessage('Upload successful');
            startTimeRef.current = null;

            if (onFileUploadComplete) {
              onFileUploadComplete(file);
            }

            uploadRequestRef.current = null;
          }
        }, 500);

        // Store interval for cleanup
        uploadRequestRef.current = {
          xhr: null,
          abortController: new AbortController(),
          file,
          retryCount,
          intervalId: interval,
        };

        return;
      }

      setStatus('loading');
      setUploadProgress(0);
      setErrorMessage(null);
      setSuccessMessage(null);
      startTimeRef.current = Date.now();

      try {
        const chunkSize = chunkSizeInMB > 0 ? chunkSizeInMB * 1024 * 1024 : file.size;
        const totalChunks = chunkSizeInMB > 0 ? Math.ceil(file.size / chunkSize) : 1;

        if (totalChunks > 1) {
          // Chunked upload
          const chunkXhrs: XMLHttpRequest[] = [];

          // Initialize upload request with chunk array
          uploadRequestRef.current = {
            xhr: null,
            abortController: new AbortController(),
            file,
            retryCount,
            chunkXhrs,
          };

          try {
            const chunkResults = [];
            for (let i = 0; i < totalChunks; i++) {
              // Check if upload was cancelled
              if (!uploadRequestRef.current) {
                throw new Error('Upload was cancelled');
              }

              const result = await uploadChunk(file, i, totalChunks, chunkSize, chunkXhrs);
              chunkResults.push(result);
            }

            setStatus('success');
            setSuccessMessage('Upload successful');
            setUploadProgress(100);
            setTimeLeft(null);
            startTimeRef.current = null;

            if (onFileUploadComplete) {
              onFileUploadComplete(file, chunkResults);
            }

            uploadRequestRef.current = null;
          } catch (error) {
            // Abort all remaining chunks
            chunkXhrs.forEach(xhr => {
              if (xhr && xhr.readyState !== XMLHttpRequest.DONE) {
                xhr.abort();
              }
            });
            throw error;
          }
        } else {
          // Single upload - wrap in Promise for proper error handling
          await new Promise<void>((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);

            // Add additional form data
            Object.entries(uploadData).forEach(([key, value]) => {
              formData.append(key, value);
            });

            const xhr = new XMLHttpRequest();
            const abortController = new AbortController();

            // Set up progress tracking
            xhr.upload.addEventListener('progress', e => {
              if (e.lengthComputable) {
                const progress = (e.loaded / e.total) * 100;
                setUploadProgress(progress);

                const elapsedTime = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
                const timeRemaining = calculateTimeRemaining(progress, elapsedTime);
                setTimeLeft(timeRemaining);

                if (onFileUpload) {
                  onFileUpload(file, progress);
                }
              }
            });

            xhr.addEventListener('load', () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                setStatus('success');
                setSuccessMessage('Upload successful');
                setUploadProgress(100);
                setTimeLeft(null);
                startTimeRef.current = null;

                try {
                  const response = xhr.responseText ? JSON.parse(xhr.responseText) : {};
                  if (onFileUploadComplete) {
                    onFileUploadComplete(file, response);
                  }
                } catch {
                  if (onFileUploadComplete) {
                    onFileUploadComplete(file);
                  }
                }

                uploadRequestRef.current = null;
                resolve();
              } else {
                reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
              }
            });

            xhr.addEventListener('error', () => {
              reject(new Error('Network error occurred during upload'));
            });

            xhr.addEventListener('abort', () => {
              setStatus('idle');
              setUploadProgress(0);
              setTimeLeft(null);
              startTimeRef.current = null;
              uploadRequestRef.current = null;

              if (onUploadCancel) {
                onUploadCancel(file);
              }

              reject(new Error('Upload was cancelled'));
            });

            xhr.open(uploadMethod, uploadEndpoint);

            // Set headers
            Object.entries(uploadHeaders).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value);
            });

            // Store request for cancellation
            uploadRequestRef.current = {
              xhr,
              abortController,
              file,
              retryCount,
            };

            xhr.send(formData);
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';

        // Retry logic
        if (retryCount < maxRetries && !errorMessage.includes('cancelled')) {
          setStatus('loading');
          setErrorMessage(`Upload failed. Retrying... (${retryCount + 1}/${maxRetries})`);

          setTimeout(() => {
            uploadFile(file, retryCount + 1);
          }, retryDelay);
        } else {
          setStatus('error');
          setErrorMessage(errorMessage);
          setUploadProgress(0);
          setTimeLeft(null);
          startTimeRef.current = null;
          uploadRequestRef.current = null;

          if (onFileUploadError) {
            onFileUploadError(file, errorMessage);
          }
        }
      }
    },
    [
      uploadEndpoint,
      uploadMethod,
      uploadHeaders,
      uploadData,
      chunkSizeInMB,
      maxRetries,
      retryDelay,
      onFileUpload,
      onFileUploadComplete,
      onFileUploadError,
      onUploadCancel,
      uploadChunk,
      calculateTimeRemaining,
    ]
  );

  // Reset upload
  const resetUpload = useCallback(() => {
    // Cancel any ongoing upload
    if (uploadRequestRef.current) {
      // Cancel single XHR request
      if (uploadRequestRef.current.xhr) {
        uploadRequestRef.current.xhr.abort();
      }

      // Cancel all chunk XHR requests
      if (uploadRequestRef.current.chunkXhrs) {
        uploadRequestRef.current.chunkXhrs.forEach(xhr => {
          if (xhr && xhr.readyState !== XMLHttpRequest.DONE) {
            xhr.abort();
          }
        });
      }

      // Clear interval if it exists
      if (uploadRequestRef.current.intervalId) {
        clearInterval(uploadRequestRef.current.intervalId);
      }

      uploadRequestRef.current = null;
    }

    setStatus('idle');
    setCurrentFile(null);
    setUploadProgress(0);
    setTimeLeft(null);
    setErrorMessage(null);
    setSuccessMessage(null);
    startTimeRef.current = null;
  }, []);

  // Cancel upload
  const cancelUpload = useCallback(() => {
    if (uploadRequestRef.current) {
      // Cancel single XHR request
      if (uploadRequestRef.current.xhr) {
        uploadRequestRef.current.xhr.abort();
      }

      // Cancel all chunk XHR requests
      if (uploadRequestRef.current.chunkXhrs) {
        uploadRequestRef.current.chunkXhrs.forEach(xhr => {
          if (xhr && xhr.readyState !== XMLHttpRequest.DONE) {
            xhr.abort();
          }
        });
      }

      // Clear interval if it exists (for simulated uploads)
      if (uploadRequestRef.current.intervalId) {
        clearInterval(uploadRequestRef.current.intervalId);
      }

      uploadRequestRef.current.abortController.abort();

      if (onUploadCancel && uploadRequestRef.current.file) {
        onUploadCancel(uploadRequestRef.current.file);
      }
    }

    uploadRequestRef.current = null;
    resetUpload();
  }, [onUploadCancel, resetUpload]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (uploadRequestRef.current) {
        // Cancel single XHR request
        if (uploadRequestRef.current.xhr) {
          uploadRequestRef.current.xhr.abort();
        }

        // Cancel all chunk XHR requests
        if (uploadRequestRef.current.chunkXhrs) {
          uploadRequestRef.current.chunkXhrs.forEach(xhr => {
            if (xhr && xhr.readyState !== XMLHttpRequest.DONE) {
              xhr.abort();
            }
          });
        }

        // Clear interval if it exists
        if (uploadRequestRef.current.intervalId) {
          clearInterval(uploadRequestRef.current.intervalId);
        }
      }
    };
  }, []);

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
              {status === 'loading' && (
                <div className="c-upload__loader-bar">
                  <svg>
                    <circle cx="10" cy="10" r="10"></circle>
                    <circle cx="10" cy="10" r="10"></circle>
                  </svg>
                </div>
              )}
              {status === 'loading' && (
                <button
                  type="button"
                  className="c-upload__loader-cancel"
                  onClick={cancelUpload}
                  aria-label="Cancel upload"
                >
                  <i className="icon-lux-x"></i>
                </button>
              )}
              {(status === 'error' || status === 'success') && (
                <button
                  type="button"
                  className="c-upload__loader-close"
                  onClick={resetUpload}
                  aria-label="Close upload progress"
                >
                  <i className="icon-lux-x"></i>
                </button>
              )}
            </div>
          )}

          {errorMessage && status === 'error' && (
            <div className="c-upload__error-message">
              {errorMessage}
              {uploadRequestRef.current && uploadRequestRef.current.retryCount < maxRetries && (
                <button
                  type="button"
                  className="c-upload__retry-btn"
                  onClick={() => {
                    if (currentFile) {
                      uploadFile(currentFile, uploadRequestRef.current?.retryCount || 0);
                    }
                  }}
                >
                  Retry
                </button>
              )}
            </div>
          )}

          {successMessage && status === 'success' && (
            <div className="c-upload__success-message">{successMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

Upload.displayName = 'Upload';
export default Upload;
