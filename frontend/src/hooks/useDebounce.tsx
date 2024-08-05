import { useEffect, useRef } from "react";

type CallbackFunctionType<T extends any[]> = (...args: T) => void;

/**
 * Custom hook to debounce a callback function.
 *
 * @param {CallbackFunctionType<T>} callback - The callback function to be debounced.
 * @param {number} delay - The delay in milliseconds for the debounce.
 * @returns {CallbackFunctionType<T>} - The debounced callback function.
 */
const useDebounce = <T extends any[]>(
  callback: CallbackFunctionType<T>,
  delay: number
): CallbackFunctionType<T> => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
