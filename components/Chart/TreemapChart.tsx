import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';

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
     * Value-based color range
     */
    valueRange?: [string, string];
  };

  /**
   * Whether to show labels
   */
  showLabels?: boolean;

  /**
   * Whether to show values
   */
  showValues?: boolean;

  /**
   * Label configuration
   */
  labelConfig?: {
    /**
     * Minimum cell size to show label
     */
    minSize?: number;
    /**
     * Font size
     */
    fontSize?: number;
    /**
     * Text color
     */
    color?: string;
  };

  /**
   * Border configuration
   */
  borderConfig?: {
    /**
     * Border width
     */
    width?: number;
    /**
     * Border color
     */
    color?: string;
    /**
     * Border radius
     */
    radius?: number;
  };

  /**
   * Animation configuration
   */
  animationConfig?: {
    /**
     * Enable animations
     */
    enabled?: boolean;
    /**
     * Animation duration
     */
    duration?: number;
    /**
     * Animation easing
     */
    easing?: string;
  };

  /**
   * Interaction handlers
   */
  onNodeClick?: (node: TreemapNode) => void;
  onNodeHover?: (node: TreemapNode | null) => void;
}

const TreemapChart = memo(
  forwardRef<HTMLDivElement, TreemapChartProps>(
    (
      {
        data = [],
        algorithm = 'squarified',
        colorConfig = { scheme: 'category' },
        showLabels = true,
        showValues = false,
        labelConfig = {
          minSize: 1000,
          fontSize: 12,
          color: 'white',
        },
        borderConfig = {
          width: 1,
          color: 'white',
          radius: 2,
        },
        animationConfig = {
          enabled: true,
          duration: 750,
          easing: 'ease-out',
        },
        onNodeClick,
        onNodeHover,
        config = {},
        ...props
      },
      ref
    ) => {
      const [hoveredNode, setHoveredNode] = useState<TreemapNode | null>(null);
      const [selectedNode, setSelectedNode] = useState<TreemapNode | null>(null);
      const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

      // Build hierarchical tree structure
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

          const { scheme, palette, valueRange } = colorConfig;

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
              if (valueRange && treeData) {
                const maxValue = Math.max(...data.map(d => d.value));
                const minValue = Math.min(...data.map(d => d.value));
                const ratio = (node.value - minValue) / (maxValue - minValue);
                // Simple interpolation between two colors
                return `hsl(${220 + ratio * 100}, 70%, ${30 + ratio * 40}%)`;
              }
              return colors[0];
            default:
              return colors[index % colors.length];
          }
        },
        [colorConfig, data, treeData]
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

      // Handle node interactions
      const handleNodeClick = useCallback(
        (node: TreemapNode) => {
          setSelectedNode(node);
          onNodeClick?.(node);
        },
        [onNodeClick]
      );

      const handleNodeHover = useCallback(
        (node: TreemapNode | null, event?: React.MouseEvent) => {
          setHoveredNode(node);
          onNodeHover?.(node);

          if (event && node) {
            const rect = event.currentTarget.getBoundingClientRect();
            setTooltipPosition({
              x: event.clientX,
              y: event.clientY,
            });
          }
        },
        [onNodeHover]
      );

      // Render treemap content
      const renderContent = useCallback(() => {
        if (!treemapNodes.length) return null;

        return (
          <g>
            {treemapNodes.map(node => {
              const isHovered = hoveredNode === node;
              const isSelected = selectedNode === node;
              const area = node.width * node.height;
              const showLabel = showLabels && area >= (labelConfig.minSize || 1000);

              return (
                <g key={node.id}>
                  {/* Node rectangle */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    fill={node.color}
                    rx={borderConfig.radius || 2}
                    className={`c-chart__treemap-node ${isHovered ? 'c-chart__treemap-node--hovered' : ''} ${isSelected ? 'c-chart__treemap-node--selected' : ''} ${animationConfig.enabled ? 'c-chart__treemap-node--animated' : ''}`}
                    onMouseEnter={e => handleNodeHover(node, e)}
                    onMouseLeave={() => handleNodeHover(null)}
                    onClick={() => handleNodeClick(node)}
                  />

                  {/* Node label */}
                  {showLabel && (
                    <g>
                      <text
                        x={node.x + node.width / 2}
                        y={node.y + node.height / 2 - (showValues ? 8 : 0)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="c-chart__treemap-label"
                      >
                        {node.label}
                      </text>

                      {showValues && (
                        <text
                          x={node.x + node.width / 2}
                          y={node.y + node.height / 2 + 12}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="c-chart__treemap-value"
                        >
                          {node.value.toLocaleString()}
                        </text>
                      )}
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      }, [
        treemapNodes,
        hoveredNode,
        selectedNode,
        showLabels,
        showValues,
        labelConfig,
        borderConfig,
        animationConfig,
        handleNodeHover,
        handleNodeClick,
      ]);

      return (
        <Chart ref={ref} type="treemap" datasets={[]} config={config} {...props}>
          <svg
            width={800}
            height={600}
            viewBox="0 0 800 600"
            style={{ width: '100%', height: '100%' }}
          >
            {renderContent()}
          </svg>

          {hoveredNode && (
            <div
              className="c-chart__tooltip"
              style={{
                position: 'fixed',
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 10,
                transform: 'translateY(-100%)',
                background: 'var(--atomix-gray-9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                pointerEvents: 'none',
              }}
            >
              <div>
                <strong>{hoveredNode?.label}</strong>
              </div>
              <div>Value: {hoveredNode?.value.toLocaleString()}</div>
            </div>
          )}
        </Chart>
      );
    }
  )
);

TreemapChart.displayName = 'TreemapChart';
export default TreemapChart;
export type { TreemapChartProps, TreemapDataPoint, TreemapNode };
