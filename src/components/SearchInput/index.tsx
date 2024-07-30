import React, { ChangeEvent } from "react";

type SearchInputProps = {
  onChange: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input type="text" placeholder="Search input" onChange={handleChange} className="searchInput" />
  );
};

export default SearchInput;
