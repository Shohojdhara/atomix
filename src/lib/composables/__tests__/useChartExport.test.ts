import { renderHook } from '@testing-library/react';
import { useChartExport, ExportOptions } from '../useChartExport';
import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('useChartExport', () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  beforeAll(() => {
    // Mock URL methods
    URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    URL.revokeObjectURL = vi.fn();

    // Mock HTMLCanvasElement.getContext
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      fillRect: vi.fn(),
      drawImage: vi.fn(),
    })) as any;

    // Mock HTMLCanvasElement.toBlob
    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(new Blob([''], { type: 'image/png' }));
    });

    // Mock HTMLAnchorElement.click
    HTMLAnchorElement.prototype.click = vi.fn();
  });

  afterAll(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    vi.restoreAllMocks();
  });

  it('should export CSV successfully', () => {
    const { result } = renderHook(() => useChartExport());
    const { exportChart } = result.current;

    const datasets = [{ label: 'Test', data: [{ label: 'A', value: 10 }] }];
    const options: ExportOptions = { format: 'csv' };

    exportChart(null, datasets, options);

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });

  it('should export JSON successfully', () => {
    const { result } = renderHook(() => useChartExport());
    const { exportChart } = result.current;

    const datasets = [{ label: 'Test', data: [{ label: 'A', value: 10 }] }];
    const options: ExportOptions = { format: 'json' };

    exportChart(null, datasets, options);

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });

  it('should throw error if SVG element is missing for image exports', async () => {
    const { result } = renderHook(() => useChartExport());
    const { exportChart } = result.current;

    const datasets: any[] = [];
    const options: ExportOptions = { format: 'png' };

    await expect(exportChart(null, datasets, options)).rejects.toThrow(
      'SVG element is required for image exports'
    );
  });

  it('should throw error for unsupported format', async () => {
    const { result } = renderHook(() => useChartExport());
    const { exportChart } = result.current;

    const datasets: any[] = [];
    // Cast to any to bypass type check for test
    const options: any = { format: 'xlsx' };

    // With the check at the beginning of exportChart:
    // if (!svgElement && !['csv', 'json'].includes(options.format))
    // So if format is 'xlsx', it is not in the list, so if svgElement is null, it throws "SVG element is required".

    await expect(exportChart(null, datasets, options)).rejects.toThrow(
      'SVG element is required for image exports'
    );

    // If we provide an SVG element, it should throw "Unsupported export format"
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    // Mock getBoundingClientRect
    svgElement.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));

    await expect(exportChart(svgElement, datasets, options)).rejects.toThrow(
      'Unsupported export format: xlsx'
    );
  });
});
