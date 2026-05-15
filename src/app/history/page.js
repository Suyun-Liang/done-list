"use client";

import React from "react";

import PastSection from "../../components/PastSection";
import { useDebouncedValue } from "../../hooks/use-debounced-value";
import SearchResultSection from "../../components/SearchResultSection/SearchResultSection";
import SearchBar from "../../components/SearchBar";

export default function PastPage() {
  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const isSearching = debouncedQuery.trim() !== "";
  return (
    <div>
      <SearchBar query={query} onQueryChange={setQuery} />
      {isSearching && <SearchResultSection query={debouncedQuery} />}
      {!isSearching && <PastSection />}
    </div>
  );
}
