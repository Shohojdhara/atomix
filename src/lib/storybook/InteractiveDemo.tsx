import React from 'react';

interface ControlOption {
  type: 'select' | 'slider' | 'text' | 'checkbox';
  label: string;
  value: any;
  onChange: (value: any) => void;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface InteractiveDemoProps {
  controls: ControlOption[];
  children: React.ReactNode;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  controls,
  children,
}) => {
  const renderControl = (control: ControlOption, index: number) => {
    const baseId = `control-${index}`;
    
    switch (control.type) {
      case 'select':
        return (
          <div key={baseId} className="mb-4">
            <label htmlFor={baseId} className="block text-sm font-medium mb-2">
              {control.label}
            </label>
            <select
              id={baseId}
              value={control.value}
              onChange={(e) => control.onChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {control.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
        
      case 'slider':
        return (
          <div key={baseId} className="mb-4">
            <label htmlFor={baseId} className="block text-sm font-medium mb-2">
              {control.label}: {control.value}
            </label>
            <input
              id={baseId}
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={control.value}
              onChange={(e) => control.onChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        );
        
      case 'text':
        return (
          <div key={baseId} className="mb-4">
            <label htmlFor={baseId} className="block text-sm font-medium mb-2">
              {control.label}
            </label>
            <input
              id={baseId}
              type="text"
              value={control.value}
              onChange={(e) => control.onChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        );
        
      case 'checkbox':
        return (
          <div key={baseId} className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={control.value}
                onChange={(e) => control.onChange(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">{control.label}</span>
            </label>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {controls.map(renderControl)}
      </div>
      <div className="border-t pt-6">
        {children}
      </div>
    </div>
  );
};