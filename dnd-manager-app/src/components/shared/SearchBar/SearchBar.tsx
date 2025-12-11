import { Delete, Search } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        resetFilteredList();
        return;
      }

      const searchLowerCase = query.toLowerCase();
      const foundResults = listToSearch.filter((item) => item.name.toLowerCase().includes(searchLowerCase));
      setFilteredList(foundResults);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, listToSearch, setFilteredList, resetFilteredList]);

  function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleReset() {
    setQuery("");
    resetFilteredList();
  }

  return (
    <div className="searchbar-input-container">
      <span className="searchbar-input-wrapper">
        <Search width={20} height={20} color="black" />
        <input
          className="searchbar-input"
          id="search-input"
          type="text"
          value={query}
          onChange={handleSearchInput}
          placeholder={placeholder}
        />
      </span>
      <Button buttonLabel="RESET" handleButtonClick={handleReset}>
        <Delete />
      </Button>
    </div>
  );
}

export default SearchBar;
