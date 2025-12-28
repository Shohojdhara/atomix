import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Upload } from './Upload';
import { SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Upload component provides a modern file upload interface with drag & drop functionality, progress tracking, file preview, and validation. It supports single and multiple file uploads, custom file size limits, and provides visual feedback throughout the upload process. Ideal for forms requiring file attachments or media uploads.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: SIZES,
      defaultValue: 'md',
      description: 'Size variant of the upload component',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Whether the upload component is disabled',
    },
    maxSizeInMB: {
      control: { type: 'number' },
      defaultValue: 5,
      description: 'Maximum file size in MB',
    },
    multiple: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Whether multiple files can be selected',
    },
    title: {
      control: { type: 'text' },
      defaultValue: 'Drag and Drop files here',
      description: 'Text for the drag and drop section',
    },
    supportedFilesText: {
      control: { type: 'text' },
      defaultValue: 'Files supported: PDF, XSLS, JPEG, PNG, Scanner',
      description: 'Text describing supported file types',
    },
    buttonText: {
      control: { type: 'text' },
      defaultValue: 'Choose File',
      description: 'Text for the upload button',
    },
    helperText: {
      control: { type: 'text' },
      defaultValue: 'Maximum size: 5MB',
      description: 'Helper text displayed below the button',
    },
  },
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default upload component
export const Default: Story = {
  render: args => (
    <div style={{ padding: '30px', maxWidth: '600px' }}>
      <Upload {...args} />
    </div>
  ),
  args: {
    size: 'md',
    title: 'Drag and Drop files here',
    supportedFilesText: 'Files supported: PDF, XSLS, JPEG, PNG, Scanner',
    buttonText: 'Choose File',
    helperText: 'Maximum size: 5MB',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default upload component with medium size and standard styling.',
      },
    },
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
  <div style={{ padding: '30px' }}>
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Small Size</h3>
      <div style={{ maxWidth: '400px' }}>
        <Upload
          size="sm"
          title="Small Upload Area"
          supportedFilesText="PDF, JPEG, PNG"
          buttonText="Choose File"
          helperText="Max: 2MB"
        />
      </div>
    </div>

    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
        Medium Size (Default)
      </h3>
      <div style={{ maxWidth: '500px' }}>
        <Upload
          size="md"
          title="Drag and Drop files here"
          supportedFilesText="Files supported: PDF, XSLS, JPEG, PNG, Scanner"
          buttonText="Choose File"
          helperText="Maximum size: 5MB"
        />
      </div>
    </div>

    <div>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Large Size</h3>
      <div style={{ maxWidth: '700px' }}>
        <Upload
          size="lg"
          title="Drop your files here for upload"
          supportedFilesText="Supported formats: PDF, Excel, Word, Images, and more"
          buttonText="Browse Files"
          helperText="Maximum file size: 10MB per file"
        />
      </div>
    </div>
  </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Upload component in different sizes: small (sm), medium (md), and large (lg).',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  render: args => (
    <div style={{ padding: '30px', maxWidth: '600px' }}>
      <Upload {...args} />
    </div>
  ),
  args: {
    size: 'md',
    title: 'Drag and Drop files here',
    supportedFilesText: 'Files supported: PDF, XSLS, JPEG, PNG, Scanner',
    buttonText: 'Choose File',
    helperText: 'Maximum size: 5MB',
    disabled: true,
  },
  parameters: {
  docs: {
    description: {
      story: 'Upload component in disabled state with reduced opacity and no interactions.',
    },
  },
};

// Manual state controls
const WithStateControls: React.FC = () => {
  const [currentState, setCurrentState] = useState<'default' | 'uploading' | 'success' | 'error'>(
    'default'
  );
  const [progress, setProgress] = useState(75);

  const resetState = () => {
    setCurrentState('default');
  };

  const simulateUpload = () => {
    setCurrentState('uploading');
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setCurrentState('success');
      }
    }, 500);
  };

  const showError = () => {
    setCurrentState('error');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button style={{ marginRight: '10px', padding: '8px 16px' }} onClick={resetState}>
          Reset
        </button>
        <button style={{ marginRight: '10px', padding: '8px 16px' }} onClick={simulateUpload}>
          Simulate Upload
        </button>
        <button style={{ padding: '8px 16px' }} onClick={showError}>
          Show Error
        </button>
      </div>

      <div style={{ padding: '30px', maxWidth: '600px' }}>
        {currentState === 'default' && (
          <Upload
            onFileSelect={files => {
              console.log('Files selected:', files);
              simulateUpload();
            }}
          />
        )}

        {currentState === 'uploading' && (
          <div className="c-upload">
            <div className="c-upload__inner">
              <div className="c-upload__icon">
                <i className="icon-lux-cloud-arrow-up-fill"></i>
              </div>
              <h3 className="c-upload__title">Drag and Drop files here</h3>
              <p className="c-upload__text">Files supported: PDF, XSLS, JPEG, PNG, Scanner</p>
              <button className="c-upload__btn c-btn c-btn--primary">Choose File</button>
              <p className="c-upload__helper-text">Maximum size: 5MB</p>
            </div>
            <div
              className="c-upload__loader"
              style={{ '--upload-loader-percentage': progress } as React.CSSProperties}
            >
              <div className="c-upload__loader-status">
                <h5 className="c-upload__loader-title">File name.pdf</h5>
                <div className="c-upload__loader-progress">
                  <div className="c-upload__loader-par">{progress}%</div>
                  <div className="c-upload__loader-time">
                    {Math.ceil((100 - progress) / 5)} seconds left
                  </div>
                </div>
              </div>

              <div className="c-upload__loader-control">
                <div className="c-upload__loader-bar">
                  <svg>
                    <circle cx="10" cy="10" r="10"></circle>
                    <circle cx="10" cy="10" r="10"></circle>
                  </svg>
                </div>
                <button className="c-upload__loader-close c-btn c-btn--icon" onClick={resetState}>
                  <i className="icon-lux-x"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentState === 'success' && (
          <div className="c-upload c-upload--success">
            <div className="c-upload__inner">
              <div className="c-upload__icon">
                <i className="icon-lux-cloud-arrow-up-fill"></i>
              </div>
              <h3 className="c-upload__title">Drag and Drop files here</h3>
              <p className="c-upload__text">Files supported: PDF, XSLS, JPEG, PNG, Scanner</p>
              <button className="c-upload__btn c-btn c-btn--primary">Choose File</button>
              <p className="c-upload__helper-text">Maximum size: 5MB</p>
            </div>
            <div className="c-upload__loader">
              <div className="c-upload__loader-status">
                <h5 className="c-upload__loader-title">File name.pdf</h5>
                <div className="c-upload__loader-progress">Upload successful</div>
              </div>

              <div className="c-upload__loader-control">
                <button className="c-upload__loader-close c-btn c-btn--icon" onClick={resetState}>
                  <i className="icon-lux-check-circle-fill"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentState === 'error' && (
          <div className="c-upload c-upload--error">
            <div className="c-upload__inner">
              <div className="c-upload__icon">
                <i className="icon-lux-cloud-arrow-up-fill"></i>
              </div>
              <h3 className="c-upload__title">Drag and Drop files here</h3>
              <p className="c-upload__text">Files supported: PDF, XSLS, JPEG, PNG, Scanner</p>
              <button className="c-upload__btn c-btn c-btn--primary">Choose File</button>
              <p className="c-upload__helper-text">Maximum size: 5MB</p>
            </div>
            <div className="c-upload__loader">
              <div className="c-upload__loader-status">
                <h5 className="c-upload__loader-title">File name.pdf</h5>
                <div className="c-upload__loader-progress">Error message</div>
              </div>

              <div className="c-upload__loader-control">
                <button className="c-upload__loader-close c-btn c-btn--icon" onClick={resetState}>
                  <i className="icon-lux-x"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const WithControls: Story = {
  render: () => <WithStateControls />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing different upload states: default, uploading with progress, success, and error states.',
      },
    },
  },
};

// Custom Icon
export const CustomIcon: Story = {
  render: args => (
    <div style={{ padding: '30px', maxWidth: '600px' }}>
      <Upload {...args} />
    </div>
  ),
  args: {
    size: 'md',
    title: 'Upload your documents',
    supportedFilesText: 'Drag files here or click to browse',
    buttonText: 'Choose File',
    helperText: 'Maximum size: 5MB',
    icon: <i className="icon-lux-upload-cloud"></i>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload component with a custom icon and personalized text content.',
      },
    },
  },
};

// Multiple file upload
export const MultipleFiles: Story = {
  render: args => (
    <div style={{ padding: '30px', maxWidth: '600px' }}>
      <Upload {...args} />
    </div>
  ),
  args: {
    size: 'md',
    multiple: true,
    buttonText: 'Choose Files',
    title: 'Upload multiple files',
    supportedFilesText: 'Select multiple files at once',
    helperText: 'Maximum size: 5MB per file',
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload component configured to accept multiple files at once.',
      },
    },
  },
};

// Drag and Drop Demo
export const DragDropDemo: Story = {
  render: () => {
    const [dragState, setDragState] = useState<'idle' | 'dragging'>('idle');
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileSelect = (files: File[]) => {
    const fileNames = files.map(file => file.name);
    setUploadedFiles(prev => [...prev, ...fileNames]);
  };

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
          Interactive Drag & Drop Demo
        </h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Try dragging files over the upload area to see the hover effects, or click to select
          files.
        </p>
      </div>

      <div style={{ maxWidth: '600px', marginBottom: '20px' }}>
        <Upload
          title="Drag files here to see the magic ✨"
          supportedFilesText="PDF, Images, Documents - All welcome!"
          buttonText="Or click to browse"
          helperText="Watch the upload area respond to your interactions"
          onFileSelect={handleFileSelect}
          multiple={true}
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4
            style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#495057' }}
          >
            Selected Files:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {uploadedFiles.map((fileName, index) => (
              <li key={index} style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                {fileName}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setUploadedFiles([])}
            style={{
              marginTop: '12px',
              padding: '6px 12px',
              fontSize: '12px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear List
          </button>
        </div>
      )}
    </div>
    );
  },
};
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demonstration of drag & drop functionality with visual feedback and file tracking.',
      },
    },
  },
};

// Different File Types
export const FileTypeRestrictions: Story = {
  render: () => (
    <div style={{ padding: '30px' }}>
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Images Only</h3>
      <div style={{ maxWidth: '500px' }}>
        <Upload
          title="Upload Images"
          supportedFilesText="JPEG, PNG, GIF, WebP"
          buttonText="Choose Images"
          helperText="Maximum size: 10MB"
          acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
          multiple={true}
        />
      </div>
    </div>

    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Documents Only</h3>
      <div style={{ maxWidth: '500px' }}>
        <Upload
          title="Upload Documents"
          supportedFilesText="PDF, Word, Excel, PowerPoint"
          buttonText="Choose Documents"
          helperText="Maximum size: 25MB"
          acceptedFileTypes={[
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ]}
        />
      </div>
    </div>
  </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Upload components configured for specific file types with appropriate messaging.',
      },
    },
  },
};
