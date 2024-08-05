import { getAllUsers } from "./users.services";
import { BASE_URL_PATH } from "../constants";
import mockData from "../db/dataMock.json";

const mockFetch = jest.fn();

global.fetch = mockFetch;

describe("getAllUsers", () => {
  const query = "fulll";
  const signal = new AbortController().signal;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return data on successful fetch", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getAllUsers(query, signal);

    expect(data).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL_PATH}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      signal,
    });
  });

  it("should throw an error when rate limit is exceeded", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      headers: {
        get: (header: string) => (header === "retry-after" ? "60" : null),
      },
    });

    await expect(getAllUsers(query, signal)).rejects.toThrow(
      "Rate limit exceeded, retry after 60 seconds."
    );
  });

  it("should throw an error when search criteria is invalid", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 422,
    });

    await expect(getAllUsers(query, signal)).rejects.toThrow(
      "Invalid search criteria. Please check your input and try again."
    );
  });

  it("should throw an error when no results are found", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getAllUsers(query, signal)).rejects.toThrow("No results found");
  });
});
