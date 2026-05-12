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
  it('handles multiple selection correctly', async () => {
    const handleChange = vi.fn();
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ];
    
    // Initial selection is '1'
    const { rerender } = render(<Select multiple options={options} value={['1']} onChange={handleChange} />);

    // Check display label
    const selectedText = document.querySelector('.c-select__selected-text');
    expect(selectedText).toHaveTextContent('Option 1');

    // Open dropdown
    const trigger = document.querySelector('.c-select__selected');
    fireEvent.click(trigger!);

    // Click item '2'
    const item2 = document.querySelector('.c-select__item[data-value="2"]');
    fireEvent.click(item2!);

    expect(handleChange).toHaveBeenCalled();
    // The handler should receive an array with both '1' and '2'
    // Since Select.tsx calls onChange with the new value array
    const event = handleChange.mock.calls[0][0];
    expect(event.target.value).toEqual(['1', '2']);

    // Rerender with both selected
    rerender(<Select multiple options={options} value={['1', '2']} onChange={handleChange} />);
    expect(selectedText).toHaveTextContent('Option 1, Option 2');

    // Click item '1' to deselect it
    const item1 = document.querySelector('.c-select__item[data-value="1"]');
    fireEvent.click(item1!);
    
    expect(handleChange.mock.calls[1][0].target.value).toEqual(['2']);
  });

  it('supports keyboard navigation', () => {
    const handleChange = vi.fn();
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    render(<Select options={options} value="" onChange={handleChange} />);

    const trigger = document.querySelector('.c-select__selected');
    
    // Focus and open with Enter - should focus first item if none selected
    fireEvent.keyDown(trigger!, { key: 'Enter' });
    expect(document.querySelector('.c-select')).toHaveClass('is-open');
    
    const item1 = document.querySelector('.c-select__item[data-value="1"]');
    expect(item1).toHaveClass('is-focused');

    // Press ArrowDown to move to second option
    fireEvent.keyDown(trigger!, { key: 'ArrowDown' });
    const item2 = document.querySelector('.c-select__item[data-value="2"]');
    expect(item2).toHaveClass('is-focused');
    expect(item1).not.toHaveClass('is-focused');

    // Select with Enter
    fireEvent.keyDown(trigger!, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe('2');
    expect(document.querySelector('.c-select')).not.toHaveClass('is-open');
  });

  it('handles empty state and placeholder', () => {
    render(<Select options={[]} value="" placeholder="Select something..." onChange={() => {}} />);
    const selectedText = document.querySelector('.c-select__selected-text');
    expect(selectedText).toHaveTextContent('Select something...');
  });
});
