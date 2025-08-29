import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Upload } from './Upload';

export default {
  title: 'Components/Upload',
  component: Upload,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    maxSizeInMB: {
      control: { type: 'number' },
      defaultValue: 5,
    },
    multiple: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    title: {
      control: { type: 'text' },
      defaultValue: 'Drag and Drop files here',
    },
    buttonText: {
      control: { type: 'text' },
      defaultValue: 'Choose File',
    },
  },
} as Meta<typeof Upload>;

const Template: StoryFn<typeof Upload> = args => (
  <div style={{ padding: '30px', maxWidth: '600px' }}>
    <Upload {...args} />
  </div>
);

// Default upload component
export const Default = Template.bind({});
Default.args = {
  title: 'Drag and Drop files here',
  supportedFilesText: 'Files supported: PDF, XSLS, JPEG, PNG, Scanner',
  buttonText: 'Choose File',
  helperText: 'Maximum size: 5MB',
};

// Disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
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

export const WithControls: StoryFn<typeof Upload> = () => <WithStateControls />;

// Custom Icon
export const CustomIcon = Template.bind({});
CustomIcon.args = {
  ...Default.args,
  icon: <i className="icon-lux-upload-cloud"></i>,
};

// Multiple file upload
export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  ...Default.args,
  multiple: true,
  buttonText: 'Choose Files',
};
