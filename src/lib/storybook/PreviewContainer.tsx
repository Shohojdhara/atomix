import React from 'react';

interface PreviewContainerProps {
  title: string;
  description: string;
  backgroundImage?: string;
  children: React.ReactNode;
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  title,
  description,
  backgroundImage,
  children,
}) => {
  const containerStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }
    : {};

  return (
    <div style={containerStyle} className="w-full">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
