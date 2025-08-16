import AreaChart from './AreaChart';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import Chart from './index';
import LineChart from './LineChart';
import PieChart from './PieChart';

// Register components globally
declare global {
  interface Window {
    Atomix: {
      Chart: typeof Chart;
      LineChart: typeof LineChart;
      AreaChart: typeof AreaChart;
      BarChart: typeof BarChart;
      PieChart: typeof PieChart;
      DonutChart: typeof DonutChart;
    };
  }
}

// Initialize Atomix global object if it doesn't exist
if (!window.Atomix) {
  window.Atomix = {} as any;
}

// Register chart components
window.Atomix.Chart = Chart;
window.Atomix.LineChart = LineChart;
window.Atomix.AreaChart = AreaChart;
window.Atomix.BarChart = BarChart;
window.Atomix.PieChart = PieChart;
window.Atomix.DonutChart = DonutChart;

// Auto-initialize charts from data attributes
document.addEventListener('DOMContentLoaded', () => {
  // Initialize base charts
  document.querySelectorAll('[data-atomix-chart]').forEach(element => {
    const type = element.getAttribute('data-atomix-chart-type') || 'line';
    const options = {
      type,
      title: element.getAttribute('data-atomix-chart-title') || undefined,
      subtitle: element.getAttribute('data-atomix-chart-subtitle') || undefined,
      size: (element.getAttribute('data-atomix-chart-size') as any) || 'md',
      variant: (element.getAttribute('data-atomix-chart-variant') as any) || 'primary',
    };

    // Try to parse JSON data if provided
    const dataAttr = element.getAttribute('data-atomix-chart-data');
    if (dataAttr) {
      try {
        const data = JSON.parse(dataAttr);
        Object.assign(options, { datasets: data });
      } catch (e) {
        console.error('Failed to parse chart data:', e);
      }
    }

    // Initialize chart
    new Chart(element as HTMLElement, options);
  });
});
