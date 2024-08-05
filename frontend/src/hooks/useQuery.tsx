import { useState, useEffect } from "react";

type UseQueryResponseType<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Custom hook to fetch data with a given callback function and parameters.
 *
 * @param {Function} fetchCallback - The callback function to fetch data. It should return a promise.
 * @param {P} [params] - Optional parameters to pass to the fetch callback.
 * @returns {Object} - An object containing the data, loading state, and any error encountered.
 */
const useQuery = <T, P>(
  fetchCallback: (params: P, signal: AbortSignal) => Promise<T>,
  params?: P
): UseQueryResponseType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      if (
        params === undefined ||
        params === null ||
        (typeof params === "string" && params.trim().length === 0)
      ) {
        setData(null);
        setIsLoading(false);
        return;
      }

      try {
        setError(null);
        setIsLoading(true);
        const data = await fetchCallback(params as P, abortController.signal);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error);
          }
        } else {
          setError(new Error("An unknown error occurred"));
        }
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [fetchCallback, params]);

  return { data, isLoading, error };
};

export default useQuery;
