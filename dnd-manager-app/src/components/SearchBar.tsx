import { Delete, Search } from "lucide-react";
import React from "react";
import { getEquipment } from "../services/dndApiService";

function SearchBar() {
  const [query, setQuery] = React.useState<string>("");

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    const searchedElement = query.toLowerCase();
    if (searchedElement) {
      const foundResult = getEquipment(searchedElement);
      console.log("searched for: " + foundResult);
    } else {
      //foundResult.innerHTML = "No result with searched name.";
    }
  }

  function handleDeleteQuery() {
    setQuery("");
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search"
        minLength={1}
      />
      <button onClick={handleDeleteQuery} type="submit">
        <Delete />
      </button>
    </form>
  );
}

export default SearchBar;
