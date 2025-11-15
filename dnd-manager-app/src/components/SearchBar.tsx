import { Delete, Search } from "lucide-react";
import React from "react";

function SearchBar({
  listToSearch,
  setEquipment,
  resetFilteredEquipment,
}: {
  listToSearch: any[];
  setEquipment: React.Dispatch<React.SetStateAction<any[]>>;
  resetFilteredEquipment: () => void;
}) {
  const [query, setQuery] = React.useState<string>("");

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchedElement = event.target.value.toLowerCase();
    setQuery(event.target.value);

    if (searchedElement) {
      const foundResults = listToSearch.filter((item) => item.name.toLowerCase().includes(searchedElement));
      setEquipment(foundResults);
    } else {
      setEquipment(listToSearch);
    }
  }

  function handleReset() {
    setQuery("");
    resetFilteredEquipment();
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Search />
      <input id="search-input" type="text" value={query} onChange={handleSearch} placeholder="Search" />
      <button onClick={handleReset} type="button">
        <Delete />
      </button>
    </form>
  );
}

export default SearchBar;
