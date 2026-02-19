import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exportToCSV, exportToJSON, exportToExcel, exportData } from '../dataTableExport';
import { DataTableColumn } from '../../types/components';

describe('dataTableExport', () => {
  let createObjectURLMock: any;
  let revokeObjectURLMock: any;
  let createElementMock: any;
  let clickMock: any;
  let linkMock: any;

  let originalCreateObjectURL: any;
  let originalRevokeObjectURL: any;

  beforeEach(() => {
    originalCreateObjectURL = global.URL.createObjectURL;
    originalRevokeObjectURL = global.URL.revokeObjectURL;

    createObjectURLMock = vi.fn(() => 'mock-url');
    revokeObjectURLMock = vi.fn();

    // We need to cast to any because we're modifying the global object
    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    clickMock = vi.fn();
    linkMock = {
      click: clickMock,
      setAttribute: vi.fn(),
      style: {},
      download: '',
      href: '',
    } as unknown as HTMLAnchorElement;

    createElementMock = vi.spyOn(document, 'createElement').mockReturnValue(linkMock);
  });

  afterEach(() => {
    global.URL.createObjectURL = originalCreateObjectURL;
    global.URL.revokeObjectURL = originalRevokeObjectURL;
    vi.restoreAllMocks();
  });

  const mockData = [
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
  ];

  const mockColumns: DataTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'role', title: 'Role' },
  ];

  const readBlobAsText = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  };

  describe('exportToCSV', () => {
    it('should export data to CSV', async () => {
      exportToCSV(mockData, mockColumns, 'test-export');

      expect(createElementMock).toHaveBeenCalledWith('a');
      expect(linkMock.download).toBe('test-export.csv');
      expect(linkMock.href).toBe('mock-url');
      expect(clickMock).toHaveBeenCalled();
      expect(revokeObjectURLMock).toHaveBeenCalledWith('mock-url');

      const blob = createObjectURLMock.mock.calls[0][0] as Blob;
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/csv;charset=utf-8;');

      const content = await readBlobAsText(blob);
      const expectedContent = `"ID","Name","Role"\n"1","John Doe","Admin"\n"2","Jane Smith","User"`;
      expect(content).toBe(expectedContent);
    });

    it('should handle empty data or columns', () => {
      exportToCSV([], mockColumns);
      expect(createObjectURLMock).not.toHaveBeenCalled();

      exportToCSV(mockData, []);
      expect(createObjectURLMock).not.toHaveBeenCalled();
    });

    it('should sanitize CSV cells', async () => {
      const riskyData = [
        { id: 1, content: '=1+1', description: 'Line\nBreak' },
        { id: 2, content: '"Quote"', description: 'Tab\tCharacter' },
      ];
      const riskyColumns: DataTableColumn[] = [
        { key: 'id', title: 'ID' },
        { key: 'content', title: 'Content' },
        { key: 'description', title: 'Description' },
      ];

      exportToCSV(riskyData, riskyColumns);

      const blob = createObjectURLMock.mock.calls[0][0] as Blob;
      const content = await readBlobAsText(blob);

      // =1+1 should be prefixed with '
      // "Quote" should be ""Quote""
      // Line\nBreak should be Line Break
      // Tab\tCharacter should be Tab Character

      const rows = content.split('\n');
      expect(rows[1]).toContain(`"'=1+1"`);
      expect(rows[1]).toContain(`"Line Break"`);
      expect(rows[2]).toContain(`"""Quote"""`);
      expect(rows[2]).toContain(`"Tab Character"`);
    });
  });

  describe('exportToJSON', () => {
    it('should export data to JSON', async () => {
      exportToJSON(mockData, 'test-export');

      expect(createElementMock).toHaveBeenCalledWith('a');
      expect(linkMock.download).toBe('test-export.json');
      expect(linkMock.href).toBe('mock-url');
      expect(clickMock).toHaveBeenCalled();

      const blob = createObjectURLMock.mock.calls[0][0] as Blob;
      expect(blob.type).toBe('application/json;charset=utf-8;');

      const content = await readBlobAsText(blob);
      expect(JSON.parse(content)).toEqual(mockData);
    });

    it('should handle empty data', () => {
      exportToJSON([]);
      expect(createObjectURLMock).not.toHaveBeenCalled();
    });
  });

  describe('exportToExcel', () => {
    it('should export data to Excel (as CSV with .xlsx extension)', async () => {
      exportToExcel(mockData, mockColumns, 'test-export');

      expect(createElementMock).toHaveBeenCalledWith('a');
      expect(linkMock.download).toBe('test-export.xlsx');
      expect(clickMock).toHaveBeenCalled();

      const blob = createObjectURLMock.mock.calls[0][0] as Blob;
      // Note: Implementation uses specific mime type for Excel
      expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      const content = await readBlobAsText(blob);
      // It should still be CSV content
      const expectedContent = `"ID","Name","Role"\n"1","John Doe","Admin"\n"2","Jane Smith","User"`;
      expect(content).toBe(expectedContent);
    });
  });

  describe('exportData', () => {
    it('should call exportToCSV for csv format', () => {
      exportData('csv', mockData, mockColumns, 'test');
      expect(linkMock.download).toBe('test.csv');
    });

    it('should call exportToJSON for json format', () => {
      exportData('json', mockData, mockColumns, 'test');
      expect(linkMock.download).toBe('test.json');
    });

    it('should call exportToExcel for excel format', () => {
      exportData('excel', mockData, mockColumns, 'test');
      expect(linkMock.download).toBe('test.xlsx');
    });

    it('should warn for unsupported format', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      exportData('pdf' as any, mockData, mockColumns);
      expect(consoleSpy).toHaveBeenCalledWith('Unsupported export format: pdf');
      consoleSpy.mockRestore();
    });
  });
});
