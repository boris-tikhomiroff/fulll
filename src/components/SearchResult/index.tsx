import { useSearchContext } from "../../context/search.context";

import UserCard from "../UserCard";
import Loader from "../Loader";
import Message from "../Message";

const SearchResult = () => {
  const { searchData, loadingApp, error, searchInput } = useSearchContext();

  // const alwaysLoading = true;
  // if (alwaysLoading) {
  //   return <Loader />;
  // }

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
    <div className="SearchResult-container">
      {searchData?.items.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default SearchResult;
