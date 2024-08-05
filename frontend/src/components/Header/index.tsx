import { useEffect } from "react";
import "./Header.css";

import { useSearchContext } from "../../context/search.context";
import { getAllUsers } from "../../services/users.services";
import { SearchUsersRequestType } from "../../type";
import { useDebounce, useQuery } from "../../hooks";
import { Tooltip, SearchInput } from "..";

const Header = () => {
  const { setSearchData, setLoadingApp, setError, searchInput, setSearchInput } =
    useSearchContext();

  const { data, isLoading, error } = useQuery<SearchUsersRequestType, string>(
    getAllUsers,
    searchInput
  );

  const debouncedSetSearchInput = useDebounce((value: string) => {
    setSearchInput(value);
  }, 500);

  const handleSearchChange = (value: string) => {
    debouncedSetSearchInput(value);
  };

  useEffect(() => {
    setSearchData(data);
    setLoadingApp(isLoading);
    setError(error);
  }, [data, setSearchData, isLoading, setLoadingApp, error, setError]);

  return (
    <div className="header">
      <div className="header__title">
        <h1>Github Search</h1>
      </div>

      <div className="header__input-container">
        <SearchInput onChange={handleSearchChange} placeholder="Search input" />
      </div>

      <Tooltip />
    </div>
  );
};

export default Header;
