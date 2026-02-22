import React from 'react';

interface VariantsGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
}

export const VariantsGrid: React.FC<VariantsGridProps> = ({
  children,
  columns = 4,
  gap = 'gap-4',
}) => {
  const gridClass = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} ${gap}`;

  return <div className={gridClass}>{children}</div>;
};
