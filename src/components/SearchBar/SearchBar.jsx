import React from "react";

function SearchBar({ query, onQueryChange }) {
  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search lists..."
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
