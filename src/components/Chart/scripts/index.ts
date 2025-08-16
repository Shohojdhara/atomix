/**
 * Base Chart class for vanilla JS implementation
 */
export default class Chart {
  private element: HTMLElement;
  private options: ChartOptions;
  private headerElement: HTMLElement | null = null;
  private contentElement: HTMLElement | null = null;
  private canvasElement: HTMLElement | null = null;
  private legendElement: HTMLElement | null = null;
  private dataPointClickHandlers: Map<string, (e: MouseEvent) => void> = new Map();
  private legendItemClickHandlers: Map<string, (e: MouseEvent) => void> = new Map();

  /**
   * Create a new Chart instance
   * @param element - Element or selector string
   * @param options - Chart options
   */
  constructor(element: string | HTMLElement, options: ChartOptions = {}) {
    // Get element reference
    this.element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

    if (!this.element) {
      throw new Error('Chart element not found');
    }

    // Default options
    this.options = {
      type: 'line',
      size: 'md',
      variant: 'primary',
      title: '',
      subtitle: '',
      loading: false,
      error: '',
      datasets: [],
      config: {
        showLegend: true,
        showTooltips: true,
        animate: true,
        animationDuration: 500,
        xAxis: {
          showGrid: true,
          showLabels: true,
        },
        yAxis: {
          showGrid: true,
          showLabels: true,
        },
      },
      ...options,
    };

    // Initialize the chart
    this.init();
  }

  /**
   * Initialize the chart
   */
  private init(): void {
    // Set base class and modifiers
    this.element.classList.add('c-chart');

    if (this.options.type) {
      this.element.classList.add(`c-chart--${this.options.type}`);
    }

    if (this.options.size) {
      this.element.classList.add(`c-chart--${this.options.size}`);
    }

    if (this.options.variant) {
      this.element.classList.add(`c-chart--${this.options.variant}`);
    }

    if (this.options.loading) {
      this.element.classList.add('c-chart--loading');
    }

    if (this.options.error) {
      this.element.classList.add('c-chart--error');
    }

    // Set ARIA attributes
    this.element.setAttribute('role', 'img');
    this.element.setAttribute('aria-label', `${this.options.type || 'data'} chart`);

    // Create chart structure
    this.render();

    // Initialize event listeners
    this.initEventListeners();
  }

  /**
   * Render the chart
   */
  private render(): void {
    // Clear existing content
    this.element.innerHTML = '';

    // Create header if title or subtitle exists
    if (this.options.title || this.options.subtitle) {
      this.headerElement = document.createElement('div');
      this.headerElement.className = 'c-chart__header';

      if (this.options.title) {
        const titleElement = document.createElement('h3');
        titleElement.className = 'c-chart__title';
        titleElement.textContent = this.options.title;
        this.headerElement.appendChild(titleElement);
      }

      if (this.options.subtitle) {
        const subtitleElement = document.createElement('p');
        subtitleElement.className = 'c-chart__subtitle';
        subtitleElement.textContent = this.options.subtitle;
        this.headerElement.appendChild(subtitleElement);
      }

      this.element.appendChild(this.headerElement);
    }

    // Create content container
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'c-chart__content';

    // Handle loading state
    if (this.options.loading) {
      const loadingElement = document.createElement('div');
      loadingElement.className = 'c-chart__loading';

      const spinnerElement = document.createElement('div');
      spinnerElement.className = 'c-chart__loading-spinner';
      loadingElement.appendChild(spinnerElement);

      const loadingText = document.createElement('span');
      loadingText.textContent = 'Loading chart...';
      loadingElement.appendChild(loadingText);

      this.contentElement.appendChild(loadingElement);
    }

    // Handle error state
    else if (this.options.error) {
      const errorElement = document.createElement('div');
      errorElement.className = 'c-chart__error';

      const errorText = document.createElement('span');
      errorText.textContent = `Error loading chart: ${this.options.error}`;
      errorElement.appendChild(errorText);

      this.contentElement.appendChild(errorElement);
    }

    // Render chart content
    else {
      this.canvasElement = document.createElement('div');
      this.canvasElement.className = 'c-chart__canvas';

      // Render chart based on type
      switch (this.options.type) {
        case 'line':
          this.renderLineChart();
          break;
        case 'area':
          this.renderAreaChart();
          break;
        case 'bar':
          this.renderBarChart(false);
          break;
        case 'horizontal-bar':
          this.renderBarChart(true);
          break;
        case 'pie':
          this.renderPieChart(false);
          break;
        case 'donut':
        case 'doughnut':
          this.renderPieChart(true);
          break;
        default:
          console.warn(`Chart type '${this.options.type || 'unknown'}' not implemented`);
      }

      if (this.contentElement) {
        this.contentElement.appendChild(this.canvasElement);
      }

      // Render legend if enabled
      if (
        this.options.config?.showLegend &&
        this.options.datasets &&
        this.options.datasets.length > 0
      ) {
        this.renderLegend();
      }
    }

    this.element.appendChild(this.contentElement);
  }

  /**
   * Render line chart
   */
  private renderLineChart(): void {
    if (!this.canvasElement || !this.options.datasets || !this.options.datasets.length) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 400');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Implementation details would go here
    // For brevity, we're not implementing the full SVG generation
    // This would be similar to the React implementation but using DOM manipulation

    this.canvasElement.appendChild(svg);
  }

  /**
   * Render area chart
   */
  private renderAreaChart(): void {
    // Area chart is a line chart with fill
    this.renderLineChart();
  }

  /**
   * Render bar chart
   */
  private renderBarChart(horizontal: boolean): void {
    if (!this.canvasElement || !this.options.datasets || !this.options.datasets.length) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 400');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Implementation details would go here

    this.canvasElement.appendChild(svg);
  }

  /**
   * Render pie/donut chart
   */
  private renderPieChart(isDonut: boolean): void {
    if (!this.canvasElement || !this.options.datasets || !this.options.datasets.length) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 400');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Implementation details would go here

    this.canvasElement.appendChild(svg);
  }

  /**
   * Render chart legend
   */
  private renderLegend(): void {
    if (!this.contentElement || !this.options.datasets || !this.options.datasets.length) return;

    this.legendElement = document.createElement('div');
    this.legendElement.className = 'c-chart__legend';

    // For pie/donut charts, use the first dataset's data points
    if (this.options.type && ['pie', 'donut', 'doughnut'].includes(this.options.type)) {
      const dataset = this.options.datasets[0];
      const total = dataset.data.reduce((sum, point) => sum + point.value, 0);

      dataset.data.forEach((point, i) => {
        const percentage = Math.round((point.value / total) * 100);
        const color = point.color || `var(--atomix-color-${i + 1})`;

        const legendItem = document.createElement('div');
        legendItem.className = 'c-chart__legend-item';
        legendItem.setAttribute('data-index', i.toString());

        const colorBox = document.createElement('div');
        colorBox.className = 'c-chart__legend-color';
        colorBox.style.backgroundColor = color;

        const label = document.createElement('span');
        label.className = 'c-chart__legend-label';
        label.textContent = `${point.label} (${percentage}%)`;

        legendItem.appendChild(colorBox);
        legendItem.appendChild(label);

        // Add click handler
        const handler = (e: Event) => {
          if (e instanceof MouseEvent) {
            this.handleLegendItemClick(0, i);
          }
        };

        this.legendItemClickHandlers.set(`0-${i}`, handler);
        legendItem.addEventListener('click', handler);

        if (this.legendElement) {
          this.legendElement.appendChild(legendItem);
        }
      });
    }
    // For other chart types, use all datasets
    else {
      this.options.datasets.forEach((dataset, i) => {
        const color = dataset.color || `var(--atomix-color-${i + 1})`;

        const legendItem = document.createElement('div');
        legendItem.className = 'c-chart__legend-item';
        legendItem.setAttribute('data-index', i.toString());

        if (dataset.visible === false) {
          legendItem.setAttribute('data-visible', 'false');
        }

        const colorBox = document.createElement('div');
        colorBox.className = 'c-chart__legend-color';
        colorBox.style.backgroundColor = color;

        const label = document.createElement('span');
        label.className = 'c-chart__legend-label';
        label.textContent = dataset.label || '';

        legendItem.appendChild(colorBox);
        legendItem.appendChild(label);

        // Add click handler
        const handler = (e: Event) => {
          if (e instanceof MouseEvent) {
            this.handleLegendItemClick(i, -1);
          }
        };

        this.legendItemClickHandlers.set(`${i}`, handler);
        legendItem.addEventListener('click', handler);

        if (this.legendElement) {
          this.legendElement.appendChild(legendItem);
        }
      });
    }

    this.contentElement.appendChild(this.legendElement);
  }

  /**
   * Initialize event listeners
   */
  private initEventListeners(): void {
    // Tooltip handling would be implemented here
  }

  /**
   * Handle data point click
   */
  private handleDataPointClick(datasetIndex: number, pointIndex: number): void {
    if (
      this.options.onDataPointClick &&
      this.options.datasets &&
      this.options.datasets[datasetIndex]?.data[pointIndex]
    ) {
      const dataPoint = this.options.datasets[datasetIndex].data[pointIndex];
      this.options.onDataPointClick(dataPoint, datasetIndex, pointIndex);
    }
  }

  /**
   * Handle legend item click
   */
  private handleLegendItemClick(datasetIndex: number, pointIndex: number): void {
    if (
      this.options.onLegendItemClick &&
      this.options.datasets &&
      this.options.datasets[datasetIndex]
    ) {
      const dataset = this.options.datasets[datasetIndex];
      const currentVisibility = dataset.visible !== false;

      // Toggle visibility
      dataset.visible = !currentVisibility;

      // Update UI
      if (this.legendElement) {
        const legendItem = this.legendElement.querySelector(`[data-index="${datasetIndex}"]`);
        if (legendItem instanceof HTMLElement) {
          legendItem.setAttribute('data-visible', (!currentVisibility).toString());
        }
      }

      // Trigger callback
      this.options.onLegendItemClick(datasetIndex, !currentVisibility);

      // Re-render chart
      this.update();
    }
  }

  /**
   * Update chart with new options
   */
  public update(options: Partial<ChartOptions> = {}): void {
    // Update options
    this.options = {
      ...this.options,
      ...options,
      config: {
        ...this.options.config,
        ...options.config,
      },
    };

    // Re-render chart
    this.render();
  }

  /**
   * Clean up event listeners and references
   */
  public destroy(): void {
    // Clean up data point click handlers
    this.dataPointClickHandlers.forEach((handler, key) => {
      const [datasetIndex, pointIndex] = key.split('-').map(Number);
      const element = this.canvasElement?.querySelector(
        `[data-dataset="${datasetIndex}"][data-point="${pointIndex}"]`
      );
      if (element instanceof HTMLElement) {
        element.removeEventListener('click', handler);
      }
    });

    // Clean up legend item click handlers
    this.legendItemClickHandlers.forEach((handler, key) => {
      let selector = '';
      if (key.includes('-')) {
        const [datasetIndex, pointIndex] = key.split('-').map(Number);
        selector = `[data-index="${pointIndex}"]`;
      } else {
        selector = `[data-index="${key}"]`;
      }

      const element = this.legendElement?.querySelector(selector);
      if (element instanceof HTMLElement) {
        element.removeEventListener('click', handler);
      }
    });

    // Clear maps
    this.dataPointClickHandlers.clear();
    this.legendItemClickHandlers.clear();

    // Clear element references
    this.headerElement = null;
    this.contentElement = null;
    this.canvasElement = null;
    this.legendElement = null;

    // Clear element
    this.element.innerHTML = '';
    this.element.removeAttribute('role');
    this.element.removeAttribute('aria-label');

    // Remove classes
    this.element.classList.remove('c-chart');
    if (this.options.type) {
      this.element.classList.remove(`c-chart--${this.options.type}`);
    }
    if (this.options.size) {
      this.element.classList.remove(`c-chart--${this.options.size}`);
    }
    if (this.options.variant) {
      this.element.classList.remove(`c-chart--${this.options.variant}`);
    }
    this.element.classList.remove('c-chart--loading');
    this.element.classList.remove('c-chart--error');
  }
}

/**
 * Chart options interface
 */
export interface ChartOptions {
  /**
   * Chart type
   */
  type?: 'line' | 'area' | 'bar' | 'horizontal-bar' | 'pie' | 'donut' | 'doughnut';

  /**
   * Chart size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Chart variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

  /**
   * Chart title
   */
  title?: string;

  /**
   * Chart subtitle
   */
  subtitle?: string;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Chart datasets
   */
  datasets?: Array<{
    label: string;
    data: Array<{
      label: string;
      value: number;
      color?: string;
      metadata?: Record<string, any>;
    }>;
    color?: string;
    visible?: boolean;
  }>;

  /**
   * Chart configuration
   */
  config?: {
    /**
     * X-axis configuration
     */
    xAxis?: {
      label?: string;
      showGrid?: boolean;
      showLabels?: boolean;
      min?: number;
      max?: number;
      ticks?: number;
    };

    /**
     * Y-axis configuration
     */
    yAxis?: {
      label?: string;
      showGrid?: boolean;
      showLabels?: boolean;
      min?: number;
      max?: number;
      ticks?: number;
    };

    /**
     * Whether to show legend
     */
    showLegend?: boolean;

    /**
     * Whether to show tooltips
     */
    showTooltips?: boolean;

    /**
     * Whether to animate the chart
     */
    animate?: boolean;

    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;
  };

  /**
   * Click handler for data points
   */
  onDataPointClick?: (dataPoint: any, datasetIndex: number, pointIndex: number) => void;

  /**
   * Legend item click handler
   */
  onLegendItemClick?: (datasetIndex: number, visible: boolean) => void;
}
