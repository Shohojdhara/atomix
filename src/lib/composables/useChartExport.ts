import { useCallback, useRef } from 'react';
import { sanitizeCSVCell } from '../utils/csv';

export interface ExportOptions {
  /**
   * Export format
   */
  format: 'png' | 'svg' | 'pdf' | 'csv' | 'json' | 'xlsx';

  /**
   * Export quality (for raster formats)
   */
  quality?: number;

  /**
   * Export dimensions
   */
  dimensions?: {
    width: number;
    height: number;
  };

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Include title and metadata
   */
  includeMetadata?: boolean;

  /**
   * Custom filename
   */
  filename?: string;
}

export interface ShareOptions {
  /**
   * Share platforms
   */
  platforms: ('twitter' | 'facebook' | 'linkedin' | 'email' | 'copy-link')[];

  /**
   * Share message
   */
  message?: string;

  /**
   * Share URL
   */
  url?: string;
}

/**
 * Hook for chart export and sharing functionality
 */
export function useChartExport() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Convert SVG to Canvas
  const svgToCanvas = useCallback(
    async (svgElement: SVGSVGElement, options: ExportOptions): Promise<HTMLCanvasElement> => {
      const { dimensions, backgroundColor = 'white' } = options;

      // Get SVG dimensions
      const svgRect = svgElement.getBoundingClientRect();
      const width = dimensions?.width || svgRect.width;
      const height = dimensions?.height || svgRect.height;

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Set background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Convert SVG to data URL
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          URL.revokeObjectURL(svgUrl);
          resolve(canvas);
        };
        img.onerror = reject;
        img.src = svgUrl;
      });
    },
    []
  );

  // Export as PNG
  const exportAsPNG = useCallback(
    async (svgElement: SVGSVGElement, options: ExportOptions): Promise<void> => {
      const canvas = await svgToCanvas(svgElement, options);
      const quality = options.quality || 0.9;

      canvas.toBlob(
        blob => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = options.filename || 'chart.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
          }
        },
        'image/png',
        quality
      );
    },
    [svgToCanvas]
  );

  // Export as SVG
  const exportAsSVG = useCallback((svgElement: SVGSVGElement, options: ExportOptions): void => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');
    link.download = options.filename || 'chart.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // Export as PDF
  const exportAsPDF = useCallback(
    async (svgElement: SVGSVGElement, options: ExportOptions): Promise<void> => {
      // Note: This requires a PDF library like jsPDF
      // For now, we'll convert to canvas and then to PDF
      const canvas = await svgToCanvas(svgElement, options);

      // This would require jsPDF library
      // const pdf = new jsPDF();
      // const imgData = canvas.toDataURL('image/png');
      // pdf.addImage(imgData, 'PNG', 0, 0);
      // pdf.save(options.filename || 'chart.pdf');

      console.warn('PDF export requires jsPDF library to be installed');
    },
    [svgToCanvas]
  );

  // Export data as CSV
  const exportAsCSV = useCallback((datasets: any[], options: ExportOptions): void => {
    if (!datasets.length) return;

    // Create CSV content
    const headers = ['Label', ...datasets.map(d => d.label)];
    const rows: string[][] = [headers];

    // Get all unique labels
    const allLabels = new Set<string>();
    datasets.forEach(dataset => {
      dataset.data?.forEach((point: any) => allLabels.add(point.label));
    });

    // Create data rows
    Array.from(allLabels).forEach(label => {
      const row = [label];
      datasets.forEach(dataset => {
        const point = dataset.data?.find((p: any) => p.label === label);
        row.push(point ? point.value.toString() : '');
      });
      rows.push(row);
    });

    // Convert to CSV string with sanitization
    const csvContent = rows
      .map(row => row.map(cell => `"${sanitizeCSVCell(cell)}"`).join(','))
      .join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = options.filename || 'chart-data.csv';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // Export data as JSON
  const exportAsJSON = useCallback((datasets: any[], options: ExportOptions): void => {
    const jsonData = {
      metadata: {
        exportDate: new Date().toISOString(),
        format: 'chart-data',
        version: '1.0',
      },
      datasets: datasets.map(dataset => ({
        label: dataset.label,
        color: dataset.color,
        data: dataset.data,
      })),
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = options.filename || 'chart-data.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // Export data as Excel
  const exportAsXLSX = useCallback((datasets: any[], options: ExportOptions): void => {
    // Note: This requires a library like xlsx or exceljs
    console.warn('XLSX export requires xlsx library to be installed');
  }, []);

  // Main export function
  const exportChart = useCallback(
    async (
      svgElement: SVGSVGElement | null,
      datasets: any[],
      options: ExportOptions
    ): Promise<void> => {
      if (!svgElement && !['csv', 'json', 'xlsx'].includes(options.format)) {
        throw new Error('SVG element is required for image exports');
      }

      try {
        switch (options.format) {
          case 'png':
            if (svgElement) await exportAsPNG(svgElement, options);
            break;
          case 'svg':
            if (svgElement) exportAsSVG(svgElement, options);
            break;
          case 'pdf':
            if (svgElement) await exportAsPDF(svgElement, options);
            break;
          case 'csv':
            exportAsCSV(datasets, options);
            break;
          case 'json':
            exportAsJSON(datasets, options);
            break;
          case 'xlsx':
            exportAsXLSX(datasets, options);
            break;
          default:
            throw new Error(`Unsupported export format: ${options.format}`);
        }
      } catch (error) {
        console.error('Export failed:', error);
        throw error;
      }
    },
    [exportAsPNG, exportAsSVG, exportAsPDF, exportAsCSV, exportAsJSON, exportAsXLSX]
  );

  // Share functionality
  const shareChart = useCallback(
    async (svgElement: SVGSVGElement | null, shareOptions: ShareOptions): Promise<void> => {
      const {
        platforms,
        message = 'Check out this chart!',
        url = window.location.href,
      } = shareOptions;

      for (const platform of platforms) {
        switch (platform) {
          case 'twitter':
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
              '_blank'
            );
            break;
          case 'facebook':
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
              '_blank'
            );
            break;
          case 'linkedin':
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
              '_blank'
            );
            break;
          case 'email':
            window.open(
              `mailto:?subject=${encodeURIComponent(message)}&body=${encodeURIComponent(`${message} ${url}`)}`,
              '_blank'
            );
            break;
          case 'copy-link':
            if (navigator.clipboard) {
              await navigator.clipboard.writeText(url);
            } else {
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = url;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
            }
            break;
        }
      }
    },
    []
  );

  return {
    exportChart,
    shareChart,
  };
}