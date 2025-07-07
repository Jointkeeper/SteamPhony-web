import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAutoPlay } from './useAutoPlay';

// Mock timers
vi.useFakeTimers();

describe('useAutoPlay', () => {
  let mockCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCallback = vi.fn();
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start autoplay on mount', () => {
    renderHook(() => useAutoPlay(mockCallback, 1000));
    
    expect(mockCallback).not.toHaveBeenCalled();
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should call callback at specified interval', () => {
    renderHook(() => useAutoPlay(mockCallback, 2000));
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(2);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  it('should pause autoplay when pause is called', () => {
    const { result } = renderHook(() => useAutoPlay(mockCallback, 1000));
    
    act(() => {
      result.current.pause();
    });
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should resume autoplay when resume is called', () => {
    const { result } = renderHook(() => useAutoPlay(mockCallback, 1000));
    
    act(() => {
      result.current.pause();
    });
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockCallback).not.toHaveBeenCalled();
    
    act(() => {
      result.current.resume();
    });
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not start multiple timers when resume is called multiple times', () => {
    const { result } = renderHook(() => useAutoPlay(mockCallback, 1000));
    
    act(() => {
      result.current.resume();
      result.current.resume();
      result.current.resume();
    });
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should handle callback changes', () => {
    const newCallback = vi.fn();
    const { result, rerender } = renderHook(
      ({ callback }) => useAutoPlay(callback, 1000),
      {
        initialProps: { callback: mockCallback },
      }
    );
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(newCallback).not.toHaveBeenCalled();
    
    rerender({ callback: newCallback });
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(newCallback).toHaveBeenCalledTimes(1);
  });

  it('should cleanup timer on unmount', () => {
    const { unmount } = renderHook(() => useAutoPlay(mockCallback, 1000));
    
    unmount();
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should use default interval of 5000ms when not specified', () => {
    renderHook(() => useAutoPlay(mockCallback));
    
    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(mockCallback).not.toHaveBeenCalled();
    
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should handle pause/resume cycle correctly', () => {
    const { result } = renderHook(() => useAutoPlay(mockCallback, 1000));
    
    // Let it run once
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    // Pause it
    act(() => {
      result.current.pause();
    });
    
    // Should not call after pause
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    // Resume it
    act(() => {
      result.current.resume();
    });
    
    // Should call again after resume
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
}); 