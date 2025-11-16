import { Delete, Search } from "lucide-react";
import React from "react";
import "./SearchBar.css";
import Button from "../Button/Button";

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
    <div className="searchbar-input-container">
      <span className="searchbar-input-wrapper">
        <Search width={20} height={20} color="black" />
        <input className="searchbar-input" id="search-input" type="text" value={query} onChange={handleSearch} placeholder={placeholder} />
      </span>
      <Button buttonLabel="RESET" handleOpenModal={handleReset}>
        <Delete />
      </Button>
    </div>
  );
}

export default SearchBar;
