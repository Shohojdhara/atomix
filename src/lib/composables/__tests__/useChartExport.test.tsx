import { renderHook } from '@testing-library/react';
import { useChartExport, ExportOptions } from '../useChartExport';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useChartExport', () => {
  let originalCreateObjectURL: typeof URL.createObjectURL;
  let originalRevokeObjectURL: typeof URL.revokeObjectURL;
  let originalXMLSerializer: typeof global.XMLSerializer;
  let originalImage: typeof global.Image;
  let originalGetContext: typeof HTMLCanvasElement.prototype.getContext;

  beforeEach(() => {
    // Store original values
    originalCreateObjectURL = URL.createObjectURL;
    originalRevokeObjectURL = URL.revokeObjectURL;
    originalXMLSerializer = global.XMLSerializer;
    originalImage = global.Image;
    originalGetContext = HTMLCanvasElement.prototype.getContext;

    // Mock URL.createObjectURL and URL.revokeObjectURL
    URL.createObjectURL = vi.fn(() => 'mock-url');
    URL.revokeObjectURL = vi.fn();

    // Mock XMLSerializer
    global.XMLSerializer = class MockXMLSerializer {
      serializeToString() {
        return '<svg></svg>';
      }
    } as any;

    // Mock Image
    // @ts-ignore
    global.Image = class MockImage {
      onload: () => void = () => {};
      onerror: () => void = () => {};
      src: string = '';
      set src(value: string) {
        // Trigger onload asynchronously to simulate image loading
        setTimeout(() => {
            if (this.onload) this.onload();
        }, 0);
      }
    } as any;

    // Mock HTMLCanvasElement.getContext
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
        fillStyle: '',
        fillRect: vi.fn(),
        drawImage: vi.fn(),
    })) as any;
  });

  afterEach(() => {
    // Restore original values
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    global.XMLSerializer = originalXMLSerializer;
    global.Image = originalImage;
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    vi.restoreAllMocks();
  });

  it('should warn when PDF export is attempted', async () => {
    const { result } = renderHook(() => useChartExport());
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

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

    const options: ExportOptions = {
      format: 'pdf',
      filename: 'chart.pdf'
    };

    await result.current.exportChart(svgElement, [], options);

    expect(consoleSpy).toHaveBeenCalledWith('PDF export requires jsPDF library to be installed');
  });
});
