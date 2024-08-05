import { useSearchContext } from "../../context/search.context";
import "./SearchResult.css";

import { Loader, Message, UserCard } from "..";

const SearchResult = () => {
  const { searchData, loadingApp, error, searchInput } = useSearchContext();

  if (loadingApp) {
    return <Loader />;
  }

  if (error && searchInput) {
    return <Message content={error.message ?? error} type="error" />;
  }

  if (searchData?.total_count === 0) {
    return <Message content={"No results found."} type="info" />;
  }

  return (
    <div className="search-result">
      {searchData?.items.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default SearchResult;
