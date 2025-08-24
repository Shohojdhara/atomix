import { useState, useCallback } from 'react';
import { ChartInteraction } from '../../components/Chart/types';

/**
 * Simplified hook for basic chart interactions
 */
export function useChartInteraction() {
  const [interaction, setInteraction] = useState<ChartInteraction>({
    hoveredIndex: null,
    selectedIndex: null,
  });

  const handlePointHover = useCallback((index: number | null) => {
    setInteraction(prev => ({ ...prev, hoveredIndex: index }));
  }, []);

  const handlePointClick = useCallback((index: number) => {
    setInteraction(prev => ({
      ...prev,
      selectedIndex: prev.selectedIndex === index ? null : index,
    }));
  }, []);

  const clearInteraction = useCallback(() => {
    setInteraction({ hoveredIndex: null, selectedIndex: null });
  }, []);

  return {
    interaction,
    handlePointHover,
    handlePointClick,
    clearInteraction,
  };
}
