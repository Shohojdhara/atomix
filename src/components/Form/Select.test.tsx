import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

describe('Select Component', () => {
  it('renders legacy options correctly', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    render(<Select options={options} value="" onChange={() => {}} />);

    // Check custom UI items
    const items = document.querySelectorAll('.c-select__item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Option 1');
    expect(items[1]).toHaveTextContent('Option 2');

    // Check native select options
    const select = document.querySelector('select');
    expect(select).not.toBeNull();
    expect(select?.options).toHaveLength(3); // Placeholder + 2
    expect(select?.options[1].value).toBe('1');
    expect(select?.options[2].value).toBe('2');
  });

  it('renders compound options correctly', async () => {
    render(
      <Select value="" onChange={() => {}}>
        <Select.Option value="1">Compound Option 1</Select.Option>
        <Select.Option value="2">Compound Option 2</Select.Option>
      </Select>
    );

    // Check custom UI items
    const items = document.querySelectorAll('.c-select__item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Compound Option 1');
    expect(items[1]).toHaveTextContent('Compound Option 2');

    // Check native select options
    await waitFor(() => {
        const select = document.querySelector('select');
        expect(select).not.toBeNull();
        expect(select?.options).toHaveLength(3); // Placeholder + 2
        expect(select?.options[1].value).toBe('1');
        expect(select?.options[2].value).toBe('2');
    });
  });

  it('handles selection in legacy mode', () => {
    const handleChange = vi.fn();
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    render(<Select options={options} value="" onChange={handleChange} />);

    // Open dropdown
    const trigger = document.querySelector('.c-select__selected');
    fireEvent.click(trigger!);

    // Click item
    const item = document.querySelector('.c-select__item[data-value="1"]');
    fireEvent.click(item!);

    expect(handleChange).toHaveBeenCalled();
    // Check event value
    expect(handleChange.mock.calls[0][0].target.value).toBe('1');
  });

  it('handles selection in compound mode', async () => {
    const handleChange = vi.fn();
    render(
      <Select value="" onChange={handleChange}>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );

    // Wait for options to be registered
    await waitFor(() => {
        const select = document.querySelector('select');
        expect(select?.options).toHaveLength(3);
    });

    // Open dropdown
    const trigger = document.querySelector('.c-select__selected');
    fireEvent.click(trigger!);

    // Click item
    const item = document.querySelector('.c-select__item[data-value="2"]');
    fireEvent.click(item!);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe('2');
  });
});
