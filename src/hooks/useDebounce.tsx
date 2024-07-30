import { useEffect, useRef } from "react";

type CallbackFunctionType<T extends any[]> = (...args: T) => void;

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
