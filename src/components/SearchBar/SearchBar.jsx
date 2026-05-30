import React from "react";
import Input from "../Input/Input";

function SearchBar({ query, onQueryChange }) {
  return (
    <div>
      <Input
        type="text"
        value={query}
        placeholder="Search lists..."
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
