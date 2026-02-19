import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { useForm } from '../useForm';
import { FORM } from '../../constants/components';

describe('useForm', () => {
  it('should return default props', () => {
    const { result } = renderHook(() => useForm());
    expect(result.current.defaultProps).toEqual({ disabled: false });
  });

  it('should merge initial props with default props', () => {
    const { result } = renderHook(() => useForm({ disabled: true, className: 'test' }));
    expect(result.current.defaultProps).toEqual({ disabled: true, className: 'test' });
  });

  describe('generateFormClass', () => {
    it('should generate default form class', () => {
      const { result } = renderHook(() => useForm());
      const className = result.current.generateFormClass({});
      expect(className).toBe(FORM.CLASSES.BASE);
    });

    it('should append custom class name', () => {
      const { result } = renderHook(() => useForm());
      const className = result.current.generateFormClass({ className: 'custom-class' });
      expect(className).toBe(`${FORM.CLASSES.BASE} custom-class`);
    });

    it('should append disabled class when disabled is true', () => {
      const { result } = renderHook(() => useForm());
      const className = result.current.generateFormClass({ disabled: true });
      expect(className).toBe(`${FORM.CLASSES.BASE} ${FORM.CLASSES.DISABLED}`);
    });

    it('should use defaultProps.disabled if disabled is not provided', () => {
      const { result } = renderHook(() => useForm({ disabled: true }));
      const className = result.current.generateFormClass({});
      expect(className).toBe(`${FORM.CLASSES.BASE} ${FORM.CLASSES.DISABLED}`);
    });
  });

  describe('handleSubmit', () => {
    it('should prevent default and call handler if not disabled', () => {
      const { result } = renderHook(() => useForm());
      const handler = vi.fn();
      const preventDefault = vi.fn();
      const event = { preventDefault } as unknown as React.FormEvent<HTMLFormElement>;

      result.current.handleSubmit(handler)(event);

      expect(preventDefault).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should prevent default and NOT call handler if disabled', () => {
      const { result } = renderHook(() => useForm({ disabled: true }));
      const handler = vi.fn();
      const preventDefault = vi.fn();
      const event = { preventDefault } as unknown as React.FormEvent<HTMLFormElement>;

      result.current.handleSubmit(handler)(event);

      expect(preventDefault).toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should not call handler if handler is not provided', () => {
      const { result } = renderHook(() => useForm());
      const preventDefault = vi.fn();
      const event = { preventDefault } as unknown as React.FormEvent<HTMLFormElement>;

      result.current.handleSubmit()(event);

      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('handleReset', () => {
    it('should call handler if not disabled', () => {
      const { result } = renderHook(() => useForm());
      const handler = vi.fn();
      const event = {} as React.FormEvent<HTMLFormElement>;

      result.current.handleReset(handler)(event);

      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should NOT call handler if disabled', () => {
      const { result } = renderHook(() => useForm({ disabled: true }));
      const handler = vi.fn();
      const event = {} as React.FormEvent<HTMLFormElement>;

      result.current.handleReset(handler)(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
