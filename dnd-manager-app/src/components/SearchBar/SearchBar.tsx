import { Delete, Search } from "lucide-react";
import React from "react";

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
    <form onSubmit={(e) => e.preventDefault()}>
      <Search />
      <input id="search-input" type="text" value={query} onChange={handleSearch} placeholder={placeholder} />
      <button onClick={handleReset} type="button">
        <Delete />
      </button>
    </form>
  );
}

export default SearchBar;
