import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exportToExcel, exportToCsvWithXlsxExtension, exportData } from '../dataTableExport';
import { DataTableColumn } from '../../types/components';

describe('dataTableExport', () => {
  const mockData = [
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
  ];

  const mockColumns: DataTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'role', title: 'Role' },
  ];

  let createObjectURLSpy: any;
  let revokeObjectURLSpy: any;
  let createElementSpy: any;
  let linkClickSpy: any;
  let link: HTMLAnchorElement;

  beforeEach(() => {
    // Mock URL.createObjectURL and URL.revokeObjectURL
    createObjectURLSpy = vi.fn(() => 'blob:mock-url');
    revokeObjectURLSpy = vi.fn();

    global.URL.createObjectURL = createObjectURLSpy;
    global.URL.revokeObjectURL = revokeObjectURLSpy;

    // Mock document.createElement
    linkClickSpy = vi.fn();
    link = {
      click: linkClickSpy,
      style: {},
    } as unknown as HTMLAnchorElement;

    createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return link;
      }
      // @ts-ignore
      return document.createElement(tagName); // fallback to original if needed, though mostly unnecessary for 'a'
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exportToCsvWithXlsxExtension should generate a file with .xlsx extension but CSV content', () => {
    exportToCsvWithXlsxExtension(mockData, mockColumns, 'test-export');

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    const blob = createObjectURLSpy.mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    expect(link.download).toBe('test-export.xlsx');
    expect(link.href).toBe('blob:mock-url');
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });

  it('deprecated exportToExcel should still work', () => {
    exportToExcel(mockData, mockColumns, 'test-export-legacy');

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(link.download).toBe('test-export-legacy.xlsx');
  });

  it('exportData with excel format should produce .xlsx file', () => {
    exportData('excel', mockData, mockColumns, 'test-export');

    expect(link.download).toBe('test-export.xlsx');
    expect(createObjectURLSpy).toHaveBeenCalled();
  });
});
