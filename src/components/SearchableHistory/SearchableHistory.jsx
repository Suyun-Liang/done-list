"use client";

import React from "react";

import SearchBar from "../SearchBar";
import SearchResultSection from "../SearchResultSection/SearchResultSection";
import PastSection from "../PastSection";

import { useDebouncedValue } from "../../hooks/use-debounced-value";

function SearchableHistory({ children }) {
  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const isSearching = debouncedQuery.trim() !== "";
  return (
    <div>
      <SearchBar query={query} onQueryChange={setQuery} />
      {isSearching ? <SearchResultSection query={debouncedQuery} /> : children}
    </div>
  );
}

export default SearchableHistory;
