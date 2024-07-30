import { SearchUsersRequestType } from "../type";

const baseUrlPath = "https://api.github.com/search/users?q=";

export const getAllUsers = async (
  query: string,
  signal: AbortSignal
): Promise<SearchUsersRequestType> => {
  try {
    const response = await fetch(`${baseUrlPath}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      signal,
    });

    if (!response.ok) {
      const retryAfter = response.headers.get("retry-after");
      const resetTime = response.headers.get("x-ratelimit-reset");
      if (response.status === 403 || response.status === 429) {
        const retryTime = retryAfter
          ? `Rate limit exceeded, retry after ${retryAfter} seconds.`
          : resetTime
          ? `Rate limit exceeded, retry after ${new Date(
              parseInt(resetTime) * 1000
            ).toLocaleString()}.`
          : "Rate limit exceeded. Please try again later.";

        throw new Error(retryTime);
      }

      if (response.status === 422) {
        throw new Error("Invalid search criteria. Please check your input and try again.");
      }

      if (response.status === 404) {
        throw new Error("No results found");
      }

      throw new Error(`${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
