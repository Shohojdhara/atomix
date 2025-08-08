# Upload

The Upload component provides a drag-and-drop file upload interface with progress tracking, file validation, and support for multiple file types. It offers both interactive drag-and-drop functionality and traditional file selection via button click.

## Overview

The Upload component is designed for file upload scenarios in web applications. It provides a user-friendly interface with visual feedback, file type validation, size limits, and progress tracking. The component supports both single and multiple file uploads with comprehensive error handling.

## Props API

### UploadProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the upload component is disabled |
| `maxSizeInMB` | `number` | `5` | Maximum file size in megabytes |
| `acceptedFileTypes` | `string[]` | `['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png']` | Accepted MIME types |
| `multiple` | `boolean` | `false` | Whether multiple files can be selected |
| `title` | `string` | `'Drag and Drop files here'` | Main title text |
| `supportedFilesText` | `string` | `'Files supported: PDF, XSLS, JPEG, PNG, Scanner'` | Description of supported file types |
| `buttonText` | `string` | `'Choose File'` | Text for the upload button |
| `helperText` | `string` | `'Maximum size: {maxSizeInMB}MB'` | Helper text displayed below button |
| `icon` | `ReactNode` | Default upload icon | Icon component for the upload area |
| `onFileSelect` | `(files: File[]) => void` | `undefined` | Called when files are selected |
| `onFileUpload` | `(file: File, progress: number) => void` | `undefined` | Called during upload with progress |
| `onFileUploadComplete` | `(file: File) => void` | `undefined` | Called when upload completes successfully |
| `onFileUploadError` | `(file: File, error: string) => void` | `undefined` | Called when upload encounters an error |
| `className` | `string` | `''` | Additional CSS classes |

### File Type Examples

Common MIME types for `acceptedFileTypes`:

- **Images**: `'image/jpeg'`, `'image/png'`, `'image/gif'`, `'image/webp'`
- **Documents**: `'application/pdf'`, `'application/msword'`
- **Spreadsheets**: `'application/vnd.ms-excel'`, `'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'`
- **Text**: `'text/plain'`, `'text/csv'`
- **Wildcards**: `'image/*'`, `'text/*'`

## Usage Examples

### Basic React Usage

```jsx
import React, { useState } from 'react';
import { Upload } from '@shohojdhara/atomix';

function FileUploadForm() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (files) => {
    console.log('Files selected:', files);
  };

  const handleFileUpload = (file, progress) => {
    console.log(`Uploading ${file.name}: ${progress}%`);
  };

  const handleUploadComplete = (file) => {
    console.log('Upload complete:', file.name);
    setUploadedFiles(prev => [...prev, file]);
  };

  const handleUploadError = (file, error) => {
    console.error('Upload failed:', file.name, error);
  };

  return (
    <div>
      <h3>Upload Documents</h3>
      <Upload
        maxSizeInMB={10}
        acceptedFileTypes={['application/pdf', 'image/jpeg', 'image/png']}
        onFileSelect={handleFileSelect}
        onFileUpload={handleFileUpload}
        onFileUploadComplete={handleUploadComplete}
        onFileUploadError={handleUploadError}
      />
      
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h4>Uploaded Files:</h4>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### Multiple File Upload

```jsx
function MultipleFileUpload() {
  const [files, setFiles] = useState([]);

  const handleMultipleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  return (
    <Upload
      multiple={true}
      maxSizeInMB={20}
      acceptedFileTypes={['image/*', 'application/pdf']}
      title="Drop multiple files here"
      buttonText="Choose Files"
      supportedFilesText="Upload images and PDFs (max 20MB each)"
      onFileSelect={handleMultipleFileSelect}
    />
  );
}
```

### Image Upload with Preview

```jsx
function ImageUpload() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelect = (files) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload">
      <Upload
        acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif']}
        maxSizeInMB={5}
        title="Drop your image here"
        supportedFilesText="JPEG, PNG, GIF up to 5MB"
        onFileSelect={handleImageSelect}
      />
      
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
}
```

### Custom Upload with API Integration

```jsx
function ApiUpload() {
  const [uploadStatus, setUploadStatus] = useState('idle');

  const uploadToServer = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleFileSelect = async (files) => {
    if (files.length === 0) return;

    setUploadStatus('uploading');

    try {
      const file = files[0];
      const result = await uploadToServer(file);
      console.log('Upload successful:', result);
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
    }
  };

  return (
    <div>
      <Upload
        title="Upload to Server"
        onFileSelect={handleFileSelect}
        disabled={uploadStatus === 'uploading'}
      />
      
      {uploadStatus === 'uploading' && <p>Uploading...</p>}
      {uploadStatus === 'success' && <p>Upload successful!</p>}
      {uploadStatus === 'error' && <p>Upload failed. Please try again.</p>}
    </div>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Initialize upload component
const uploadContainer = document.getElementById('file-upload');

const upload = new Atomix.Upload(uploadContainer, {
  maxSizeInMB: 10,
  acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  multiple: false,
  title: 'Drag and drop your file here',
  buttonText: 'Browse Files',
  onFileSelect: (files) => {
    console.log('Files selected:', files);
  },
  onFileUpload: (file, progress) => {
    console.log(`Upload progress: ${progress}%`);
  },
  onFileUploadComplete: (file) => {
    console.log('Upload complete:', file.name);
  },
  onFileUploadError: (file, error) => {
    console.error('Upload error:', error);
  }
});

// Programmatically trigger file selection
upload.openFileDialog();

// Update settings
upload.updateSettings({
  maxSizeInMB: 20,
  multiple: true
});
```

### HTML with Data Attributes

```html
<!-- Basic upload component -->
<div 
  class="c-upload" 
  data-atomix="upload"
  data-max-size="5"
  data-accepted-types="image/jpeg,image/png,application/pdf"
  data-multiple="false">
  
  <div class="c-upload__inner">
    <div class="c-upload__icon">
      <i class="icon-lux-cloud-arrow-up-fill"></i>
    </div>
    <h3 class="c-upload__title">Drag and Drop files here</h3>
    <p class="c-upload__text">Files supported: JPEG, PNG, PDF</p>
    <button class="c-upload__btn c-btn c-btn--primary">
      Choose File
    </button>
    <p class="c-upload__helper-text">Maximum size: 5MB</p>
    <input type="file" style="display: none;" accept="image/jpeg,image/png,application/pdf" />
  </div>
</div>

<!-- Upload with progress indicator -->
<div class="c-upload c-upload--loading" style="--upload-progress: 75%">
  <!-- Upload content -->
  <div class="c-upload__loader">
    <div class="c-upload__loader-status">
      <h5 class="c-upload__loader-title">document.pdf</h5>
      <div class="c-upload__loader-progress">
        <div class="c-upload__loader-par">75%</div>
        <div class="c-upload__loader-time">5 seconds left</div>
      </div>
    </div>
    <div class="c-upload__loader-control">
      <div class="c-upload__loader-bar">
        <!-- Progress circle SVG -->
      </div>
      <button class="c-upload__loader-close c-btn c-btn--icon">
        <i class="icon-lux-x"></i>
      </button>
    </div>
  </div>
</div>
```

## Styling

### CSS Classes

The Upload component uses the following CSS class structure:

```css
/* Base upload container */
.c-upload {
  /* Upload container styles */
}

/* State modifiers */
.c-upload--disabled { /* Disabled state */ }
.c-upload--loading { /* Loading state */ }
.c-upload--success { /* Success state */ }
.c-upload--error { /* Error state */ }
.c-upload--dragging { /* Drag over state */ }

/* Upload elements */
.c-upload__inner { /* Inner content container */ }
.c-upload__icon { /* Upload icon */ }
.c-upload__title { /* Main title */ }
.c-upload__text { /* Description text */ }
.c-upload__btn { /* Upload button */ }
.c-upload__helper-text { /* Helper text */ }

/* Progress loader */
.c-upload__loader { /* Progress container */ }
.c-upload__loader-status { /* Status information */ }
.c-upload__loader-title { /* File name */ }
.c-upload__loader-progress { /* Progress details */ }
.c-upload__loader-par { /* Progress percentage */ }
.c-upload__loader-time { /* Time remaining */ }
.c-upload__loader-control { /* Control buttons */ }
.c-upload__loader-bar { /* Progress bar */ }
.c-upload__loader-close { /* Close button */ }
```

### Custom Styling

```css
/* Custom upload variant */
.c-upload--image {
  border: 2px dashed var(--atomix-primary);
  background: var(--atomix-primary-light);
}

.c-upload--image.c-upload--dragging {
  border-color: var(--atomix-primary-dark);
  background: var(--atomix-primary);
  color: white;
}

/* Compact upload style */
.c-upload--compact {
  min-height: 120px;
}

.c-upload--compact .c-upload__title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

/* Progress animation */
.c-upload__loader-bar circle {
  stroke-dasharray: 63;
  stroke-dashoffset: calc(63 - (63 * var(--upload-progress)) / 100);
  transition: stroke-dashoffset 0.3s ease;
}

/* Hover effects */
.c-upload:hover:not(.c-upload--disabled) {
  border-color: var(--atomix-primary);
  background-color: var(--atomix-gray-50);
}

/* Error state styling */
.c-upload--error {
  border-color: var(--atomix-error);
  background-color: var(--atomix-error-light);
}

.c-upload--error .c-upload__title {
  color: var(--atomix-error);
}
```

## Accessibility

The Upload component includes comprehensive accessibility features:

### ARIA Attributes

- `role="button"` - Applied to the upload area for keyboard interaction
- `aria-label` - Descriptive labels for upload actions
- `aria-describedby` - Links helper text to the upload area
- `aria-live` - Announces upload progress and status changes

### Keyboard Navigation

- **Tab** - Navigate to the upload component
- **Enter/Space** - Trigger file selection dialog
- **Escape** - Cancel drag operation or close progress dialog

### Screen Reader Support

- Upload area is announced as an interactive element
- File selection and progress are announced
- Error messages are conveyed to screen readers
- File type restrictions are clearly communicated

## Best Practices

### Do's ✅

- Clearly specify accepted file types and size limits
- Provide visual feedback during upload progress
- Show meaningful error messages
- Support both drag-and-drop and click-to-upload
- Validate files on the client and server side

```jsx
// Good: Clear specifications and feedback
<Upload
  acceptedFileTypes={['image/jpeg', 'image/png']}
  maxSizeInMB={5}
  title="Upload Profile Picture"
  supportedFilesText="JPEG or PNG, max 5MB"
  onFileUploadError={(file, error) => {
    showNotification(`Upload failed: ${error}`, 'error');
  }}
/>
```

### Don'ts ❌

- Don't forget to validate file types and sizes
- Don't rely solely on client-side validation
- Don't show unclear error messages
- Don't make the upload area too small for easy dropping

```jsx
// Bad: No validation or feedback
<Upload
  onFileSelect={(files) => {
    // No validation, just upload anything
    uploadFiles(files);
  }}
/>
```

## Common Patterns

### Document Upload with Preview

```jsx
function DocumentUpload() {
  const [documents, setDocuments] = useState([]);

  const handleFileSelect = (files) => {
    const newDocuments = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      status: 'pending',
      progress: 0
    }));
    
    setDocuments(prev => [...prev, ...newDocuments]);
  };

  const uploadDocument = async (document) => {
    // Update status to uploading
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === document.id 
          ? { ...doc, status: 'uploading' }
          : doc
      )
    );

    // Simulate upload with progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === document.id 
            ? { ...doc, progress }
            : doc
        )
      );
    }

    // Mark as complete
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === document.id 
          ? { ...doc, status: 'complete' }
          : doc
      )
    );
  };

  return (
    <div>
      <Upload
        multiple={true}
        acceptedFileTypes={['application/pdf', 'image/*']}
        maxSizeInMB={10}
        onFileSelect={handleFileSelect}
      />
      
      <div className="document-list">
        {documents.map(doc => (
          <div key={doc.id} className="document-item">
            <span>{doc.file.name}</span>
            <div className="document-actions">
              {doc.status === 'pending' && (
                <button onClick={() => uploadDocument(doc)}>
                  Upload
                </button>
              )}
              {doc.status === 'uploading' && (
                <span>{doc.progress}%</span>
              )}
              {doc.status === 'complete' && (
                <span>✓ Complete</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Batch File Processing

```jsx
function BatchUpload() {
  const [queue, setQueue] = useState([]);
  const [processing, setProcessing] = useState(false);

  const addToQueue = (files) => {
    const queueItems = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      status: 'queued',
      error: null
    }));
    
    setQueue(prev => [...prev, ...queueItems]);
  };

  const processQueue = async () => {
    setProcessing(true);
    
    for (const item of queue) {
      if (item.status === 'queued') {
        try {
          // Update status
          setQueue(prev => 
            prev.map(queueItem => 
              queueItem.id === item.id 
                ? { ...queueItem, status: 'processing' }
                : queueItem
            )
          );

          // Process file
          await processFile(item.file);
          
          // Mark as complete
          setQueue(prev => 
            prev.map(queueItem => 
              queueItem.id === item.id 
                ? { ...queueItem, status: 'complete' }
                : queueItem
            )
          );
        } catch (error) {
          // Mark as failed
          setQueue(prev => 
            prev.map(queueItem => 
              queueItem.id === item.id 
                ? { ...queueItem, status: 'failed', error: error.message }
                : queueItem
            )
          );
        }
      }
    }
    
    setProcessing(false);
  };

  return (
    <div>
      <Upload
        multiple={true}
        onFileSelect={addToQueue}
        disabled={processing}
      />
      
      <div className="queue-controls">
        <button 
          onClick={processQueue} 
          disabled={processing || queue.length === 0}
        >
          {processing ? 'Processing...' : 'Process Queue'}
        </button>
        <button onClick={() => setQueue([])}>Clear Queue</button>
      </div>

      <div className="queue-list">
        {queue.map(item => (
          <div key={item.id} className={`queue-item queue-item--${item.status}`}>
            <span>{item.file.name}</span>
            <span className="status">{item.status}</span>
            {item.error && <span className="error">{item.error}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Related Components

- **Button** - Used for the upload trigger button
- **Icon** - Used for upload icons and status indicators
- **Progress** - Related to the upload progress functionality
- **Modal** - Can contain upload components
- **Form** - Often used within forms for file input

## Browser Support

The Upload component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

File API and drag-and-drop features require:
- Chrome 13+
- Firefox 3.6+
- Safari 6+
- Edge 12+

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x
<Upload 
  allowedTypes={['pdf', 'jpg', 'png']}
  maxSize={5}
  multipleFiles={false}
  onUpload={handleUpload}
/>

// v2.x
<Upload 
  acceptedFileTypes={['application/pdf', 'image/jpeg', 'image/png']}
  maxSizeInMB={5}
  multiple={false}
  onFileUploadComplete={handleUpload}
/>
```

The main changes:
- `allowedTypes` changed to `acceptedFileTypes` with MIME types
- `maxSize` changed to `maxSizeInMB` for clarity
- `multipleFiles` changed to `multiple`
- `onUpload` split into specific event handlers
- Added progress tracking capabilities
- Improved accessibility features