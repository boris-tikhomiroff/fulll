import { useEffect } from "react";

import { useSearchContext } from "../../context/search.context";
import { getAllUsers } from "../../services/users.services";
import { SearchUsersRequestType } from "../../type";
import { useDebounce, useQuery } from "../../hooks";

import SearchInput from "../SearchInput";
import Tooltip from "../ToolTip";

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

      <div className="header__input_container">
        <SearchInput onChange={handleSearchChange} />
      </div>

      <Tooltip />
    </div>
  );
};

export default Header;
