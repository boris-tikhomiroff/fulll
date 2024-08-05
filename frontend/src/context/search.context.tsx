import React, { useState, useContext, createContext, useMemo } from "react";
import { SearchUsersRequestType } from "../type";

type SearchContextProps = {
  searchData: SearchUsersRequestType | null;
  setSearchData: React.Dispatch<React.SetStateAction<SearchUsersRequestType | null>>;
  loadingApp: boolean;
  setLoadingApp: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

type SearchProviderProps = {
  children: React.ReactNode;
};

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchData, setSearchData] = useState<SearchUsersRequestType | null>(null);
  const [loadingApp, setLoadingApp] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const provider = useMemo<SearchContextProps>(
    () => ({
      searchData,
      setSearchData,
      loadingApp,
      setLoadingApp,
      error,
      setError,
      searchInput,
      setSearchInput,
    }),
    [
      searchData,
      setSearchData,
      loadingApp,
      setLoadingApp,
      error,
      setError,
      searchInput,
      setSearchInput,
    ]
  );

  return <SearchContext.Provider value={provider}>{children}</SearchContext.Provider>;
};

export default SearchProvider;

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
