import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';
import React from 'react';

describe('Select Component', () => {
  it('renders options from props (legacy)', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    render(<Select options={options} value="1" />);

    // Check if selected value is displayed in the trigger
    expect(screen.getByText('Option 1', { selector: '.c-select__selected' })).toBeInTheDocument();

    // Check if options are in the DOM (custom UI uses list items)
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Option 1');
    expect(listItems[1]).toHaveTextContent('Option 2');
  });

  it('renders options from children (compound)', () => {
    render(
      <Select value="2">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );

    // Check if selected value is displayed in the trigger
    expect(screen.getByText('Option 2', { selector: '.c-select__selected' })).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Option 1');
    expect(listItems[1]).toHaveTextContent('Option 2');
  });

  it('renders options from native option children', () => {
    render(
      <Select value="1">
        <option value="1">Native 1</option>
        <option value="2">Native 2</option>
      </Select>
    );

    // Check if selected value is displayed in the trigger
    expect(screen.getByText('Native 1', { selector: '.c-select__selected' })).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('handles selection in compound mode', () => {
    const handleChange = vi.fn();
    render(
      <Select onChange={handleChange} placeholder="Select...">
        <Select.Option value="a">Alpha</Select.Option>
        <Select.Option value="b">Beta</Select.Option>
      </Select>
    );

    // Open dropdown by clicking the trigger
    fireEvent.click(screen.getByText('Select...', { selector: '.c-select__selected' }));

    // Click option (options are in list items)
    // We can find the option by text. Note: list item contains checkbox label which has text.
    // getByText might find multiple if rendered elsewhere, but here it should be unique enough or we scope it.
    // The option label is inside .c-select__item-label
    const betaOption = screen.getByText('Beta', { selector: '.c-select__item-label' });
    // We need to click the list item or label. The click handler is on LI.
    // Bubbling should work if we click label.
    fireEvent.click(betaOption);

    expect(handleChange).toHaveBeenCalled();
    const event = handleChange.mock.calls[0][0];
    expect(event.target.value).toBe('b');
  });
});
