import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import BaseChart from './BaseChart';
import { ChartProps } from '../../lib/types/components';

interface TreemapDataPoint {
  id: string;
  label: string;
  value: number;
  color?: string;
  parent?: string;
  children?: TreemapDataPoint[];
  metadata?: Record<string, any>;
}

interface TreemapNode {
  id: string;
  label: string;
  value: number;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  parent?: TreemapNode;
  children: TreemapNode[];
  originalData: TreemapDataPoint;
}

interface TreemapChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Treemap data
   */
  data: TreemapDataPoint[];

  /**
   * Treemap algorithm
   */
  algorithm?: 'squarified' | 'slice-dice' | 'binary';

  /**
   * Color configuration
   */
  colorConfig?: {
    /**
     * Color scheme
     */
    scheme: 'category' | 'value' | 'depth' | 'custom';
    /**
     * Color palette
     */
    palette?: string[];
    /**
     * Whether to use gradients
     */
    useGradients?: boolean;
  };

  /**
   * Label configuration
   */
  labelConfig?: {
    /**
     * Whether to show labels
     */
    showLabels?: boolean;
    /**
     * Minimum size for showing labels
     */
    minSize?: number;
    /**
     * Font size
     */
    fontSize?: number;
    /**
     * Text color
     */
    textColor?: string;
  };

  /**
   * Interaction configuration
   */
  interactionConfig?: {
    /**
     * Whether to enable tooltips
     */
    enableTooltips?: boolean;
    /**
     * Whether to enable zoom
     */
    enableZoom?: boolean;
    /**
     * Whether to enable selection
     */
    enableSelection?: boolean;
  };
}

const TreemapChart = memo(
  forwardRef<HTMLDivElement, TreemapChartProps>(
    (
      {
        data = [],
        algorithm = 'squarified',
        colorConfig = { scheme: 'category' },
        labelConfig = {
          showLabels: true,
          minSize: 1000,
          fontSize: 12,
          textColor: 'white',
        },
        onDataPointClick,
        config = {},
        ...props
      },
      ref
    ) => {
      const [hoveredNode, setHoveredNode] = useState<TreemapNode | null>(null);
      const [selectedNode, setSelectedNode] = useState<TreemapNode | null>(null);
      const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

      const treeData = useMemo(() => {
        console.log('TreemapChart data:', data);
        if (!data.length) {
          console.log('No data provided to TreemapChart');
          return null;
        }

        // Create a map for quick lookup
        const nodeMap = new Map<string, TreemapDataPoint>();
        data.forEach(item => nodeMap.set(item.id, item));

        // Find root nodes (nodes without parents or with non-existent parents)
        const rootNodes: TreemapDataPoint[] = [];
        const processedNodes = new Set<string>();

        const buildTree = (node: TreemapDataPoint): TreemapDataPoint => {
          if (processedNodes.has(node.id)) {
            return node;
          }

          processedNodes.add(node.id);

          // Find children
          const children = data.filter(item => item.parent === node.id);

          if (children.length > 0) {
            node.children = children.map(child => buildTree(child));
            // For parent nodes, value is sum of children
            node.value = node.children.reduce((sum, child) => sum + child.value, 0);
          }

          return node;
        };

        // Find root nodes
        data.forEach(item => {
          if (!item.parent || !nodeMap.has(item.parent)) {
            rootNodes.push(buildTree(item));
          }
        });

        return rootNodes.length === 1
          ? rootNodes[0]
          : {
              id: 'root',
              label: 'Root',
              value: rootNodes.reduce((sum, node) => sum + node.value, 0),
              children: rootNodes,
            };
      }, [data]);

      // Generate colors
      const generateColor = useCallback(
        (node: TreemapDataPoint, depth: number, index: number) => {
          if (node.color) return node.color;

          const { scheme, palette } = colorConfig;

          const defaultPalette = [
            '#3b82f6',
            '#ef4444',
            '#10b981',
            '#f59e0b',
            '#8b5cf6',
            '#06b6d4',
            '#84cc16',
            '#f97316',
            '#ec4899',
            '#6366f1',
          ];

          const colors = palette || defaultPalette;

          switch (scheme) {
            case 'category':
              return colors[index % colors.length];
            case 'depth':
              const depthColors = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'];
              return depthColors[Math.min(depth, depthColors.length - 1)];
            case 'value':
              if (data.length > 0) {
                const maxValue = Math.max(...data.map(d => d.value));
                const minValue = Math.min(...data.map(d => d.value));
                const ratio = (node.value - minValue) / (maxValue - minValue);
                return `hsl(${220 + ratio * 100}, 70%, ${30 + ratio * 40}%)`;
              }
              return colors[0];
            default:
              return colors[index % colors.length];
          }
        },
        [colorConfig, data]
      );

      // Squarified treemap algorithm
      const squarify = useCallback(
        (nodes: TreemapNode[], x: number, y: number, width: number, height: number) => {
          if (nodes.length === 0) return;

          const totalValue = nodes.reduce((sum, node) => sum + node.value, 0);

          if (nodes.length === 1) {
            const node = nodes[0];
            if (node) {
              node.x = x;
              node.y = y;
              node.width = width;
              node.height = height;
            }
            return;
          }

          // Sort nodes by value (descending)
          const sortedNodes = [...nodes].sort((a, b) => b.value - a.value);

          const aspectRatio = (rect: { width: number; height: number }) =>
            Math.max(rect.width / rect.height, rect.height / rect.width);

          let currentRow: TreemapNode[] = [];
          let remainingNodes = [...sortedNodes];
          let currentX = x;
          let currentY = y;
          let remainingWidth = width;
          let remainingHeight = height;

          while (remainingNodes.length > 0) {
            const node = remainingNodes.shift();
            if (!node) break;
            currentRow.push(node);

            // Calculate dimensions for current row
            const rowValue = currentRow.reduce((sum, n) => sum + n.value, 0);
            const rowRatio = rowValue / totalValue;

            let rowWidth, rowHeight;
            if (remainingWidth >= remainingHeight) {
              rowWidth = remainingWidth * rowRatio;
              rowHeight = remainingHeight;
            } else {
              rowWidth = remainingWidth;
              rowHeight = remainingHeight * rowRatio;
            }

            // Check if adding next node improves aspect ratio
            let shouldContinueRow = false;
            if (remainingNodes.length > 0) {
              const nextNode = remainingNodes[0];
              if (!nextNode) break;
              const testRow = [...currentRow, nextNode];
              const testRowValue = testRow.reduce((sum, n) => sum + n.value, 0);
              const testRowRatio = testRowValue / totalValue;

              let testRowWidth, testRowHeight;
              if (remainingWidth >= remainingHeight) {
                testRowWidth = remainingWidth * testRowRatio;
                testRowHeight = remainingHeight;
              } else {
                testRowWidth = remainingWidth;
                testRowHeight = remainingHeight * testRowRatio;
              }

              const currentWorstAspect = Math.max(
                ...currentRow
                  .filter(n => n)
                  .map(n => {
                    const nodeRatio = n.value / rowValue;
                    const nodeWidth =
                      remainingWidth >= remainingHeight ? rowWidth : rowWidth * nodeRatio;
                    const nodeHeight =
                      remainingWidth >= remainingHeight ? rowHeight * nodeRatio : rowHeight;
                    return aspectRatio({ width: nodeWidth, height: nodeHeight });
                  })
              );

              const testWorstAspect = Math.max(
                ...testRow
                  .filter(n => n)
                  .map(n => {
                    const nodeRatio = n.value / testRowValue;
                    const nodeWidth =
                      remainingWidth >= remainingHeight ? testRowWidth : testRowWidth * nodeRatio;
                    const nodeHeight =
                      remainingWidth >= remainingHeight ? testRowHeight * nodeRatio : testRowHeight;
                    return aspectRatio({ width: nodeWidth, height: nodeHeight });
                  })
              );

              shouldContinueRow = testWorstAspect <= currentWorstAspect;
            }

            if (!shouldContinueRow) {
              // Layout current row
              let nodeX = currentX;
              let nodeY = currentY;

              currentRow.forEach(rowNode => {
                const nodeRatio = rowNode.value / rowValue;

                if (remainingWidth >= remainingHeight) {
                  rowNode.x = nodeX;
                  rowNode.y = nodeY;
                  rowNode.width = rowWidth;
                  rowNode.height = remainingHeight * nodeRatio;
                  nodeY += rowNode.height;
                } else {
                  rowNode.x = nodeX;
                  rowNode.y = nodeY;
                  rowNode.width = remainingWidth * nodeRatio;
                  rowNode.height = rowHeight;
                  nodeX += rowNode.width;
                }
              });

              // Update remaining space
              if (remainingWidth >= remainingHeight) {
                currentX += rowWidth;
                remainingWidth -= rowWidth;
              } else {
                currentY += rowHeight;
                remainingHeight -= rowHeight;
              }

              currentRow = [];
            }
          }
        },
        []
      );

      // Build treemap layout
      const treemapNodes = useMemo(() => {
        if (!data.length) return [];

        // Simple flat layout for leaf nodes only
        const leafNodes = data.filter(item => !item.children || item.children.length === 0);
        const totalValue = leafNodes.reduce((sum, node) => sum + node.value, 0);

        let currentX = 0;
        let currentY = 0;
        const nodeWidth = 800 / Math.ceil(Math.sqrt(leafNodes.length));
        const nodeHeight = 600 / Math.ceil(Math.sqrt(leafNodes.length));

        return leafNodes.map((item, index) => {
          const node: TreemapNode = {
            id: item.id,
            label: item.label,
            value: item.value,
            color: generateColor(item, 0, index) || 'transparent',
            x: currentX,
            y: currentY,
            width: nodeWidth,
            height: nodeHeight,
            depth: 0,
            children: [],
            originalData: item,
          };

          currentX += nodeWidth;
          if (currentX >= 800) {
            currentX = 0;
            currentY += nodeHeight;
          }

          return node;
        });
      }, [data, generateColor]);

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
      }: {
        scales: any;
        colors: string[];
        datasets: any[];
        handlers: any;
        hoveredPoint: {
          datasetIndex: number;
          pointIndex: number;
          x: number;
          y: number;
          clientX: number;
          clientY: number;
        } | null;
      }) => {
        if (!treemapNodes.length) return null;

        return (
          <>
            {treemapNodes.map(node => {
              const isHovered = hoveredNode === node;
              const isSelected = selectedNode === node;
              const area = node.width * node.height;
              const showLabel = labelConfig.showLabels && area >= (labelConfig.minSize || 1000);

              return (
                <g key={node.id}>
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    fill={node.color}
                    className={`c-chart__treemap-node ${isHovered ? 'c-chart__treemap-node--hovered' : ''} ${isSelected ? 'c-chart__treemap-node--selected' : ''}`}
                    onClick={() => {
                      setSelectedNode(node);
                      handlers.onDataPointClick?.(node.originalData, 0, 0);
                    }}
                    onMouseEnter={e => {
                      setHoveredNode(node);
                      const rect = e.currentTarget.getBoundingClientRect();
                      handlers.onPointHover(
                        0,
                        0,
                        node.x,
                        node.y,
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                      );
                    }}
                    onMouseLeave={() => {
                      setHoveredNode(null);
                      handlers.onPointLeave();
                    }}
                  />
                  {showLabel && (
                    <text
                      x={node.x + node.width / 2}
                      y={node.y + node.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="c-chart__treemap-label"
                      style={{ fontSize: labelConfig.fontSize, fill: labelConfig.textColor }}
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
            })}
          </>
        );
      };

      // Convert data to datasets format for BaseChart
      const datasets = [
        {
          label: 'Treemap Data',
          data: data,
        },
      ];

      return (
        <BaseChart
          ref={ref}
          type="treemap"
          datasets={datasets}
          config={config}
          renderContent={renderContent}
          onDataPointClick={onDataPointClick}
          interactive={true}
          {...props}
        />
      );
    }
  )
);

TreemapChart.displayName = 'TreemapChart';
export default TreemapChart;
export type { TreemapChartProps, TreemapDataPoint, TreemapNode };
