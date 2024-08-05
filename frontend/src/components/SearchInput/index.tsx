import { ChangeEvent } from "react";
import "./SearchInput.css";

type SearchInputProps = {
  onChange: (value: string) => void;
  placeholder: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ onChange, placeholder }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input type="text" placeholder={placeholder} onChange={handleChange} className="search-input" />
  );
};

export default SearchInput;
