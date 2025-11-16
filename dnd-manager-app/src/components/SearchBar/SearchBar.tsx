import { Delete, Search } from "lucide-react";
import React from "react";
import "./SearchBar.css";

function SearchBar<T extends { name: string }>({
  placeholder,
  listToSearch,
  setFilteredList,
  resetFilteredList,
}: {
  placeholder: string;
  listToSearch: T[];
  setFilteredList: React.Dispatch<React.SetStateAction<T[]>>;
  resetFilteredList: () => void;
}) {
  const [query, setQuery] = React.useState<string>("");

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchedElement = event.target.value.toLowerCase();
    setQuery(event.target.value);
    if (!searchedElement) {
      resetFilteredList();
      return;
    }
    const foundResults = listToSearch.filter((item) => item.name.toLowerCase().includes(searchedElement));
    setFilteredList(foundResults);
  }

  function handleReset() {
    setQuery("");
    resetFilteredList();
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="searchbar-container">
      <span className="searchbar-input-wrapper">
        <Search width={20} height={20} />
        <input id="search-input" type="text" value={query} onChange={handleSearch} placeholder={placeholder} />
      </span>
      <button onClick={handleReset} type="button" className="searchbar-reset-button">
        <Delete />
      </button>
    </form>
  );
}

export default SearchBar;
