import { useEffect, useRef, useCallback } from 'react';
/**
 * Simple autoplay hook.
 * @param callback Function called every `interval` ms while autoplay is active.
 * @param interval Delay in milliseconds. Defaults to 5000 (5 seconds).
 */
export function useAutoPlay(callback, interval = 5000) {
    const savedCallback = useRef(callback);
    const timer = useRef(null);
    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    const pause = useCallback(() => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
    }, []);
    const resume = useCallback(() => {
        if (timer.current)
            return; // Already running
        timer.current = setInterval(() => {
            savedCallback.current();
        }, interval);
    }, [interval]);
    // Start autoplay on mount
    useEffect(() => {
        resume();
        return pause; // Cleanup on unmount
    }, [resume, pause]);
    return { pause, resume };
}
