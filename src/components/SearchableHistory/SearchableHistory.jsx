"use client";

import React from "react";

import SearchBar from "../SearchBar";
import SearchResultSection from "../SearchResultSection/SearchResultSection";
import PastSection from "../PastSection";

import { useDebouncedValue } from "../../hooks/use-debounced-value";
import styled from "styled-components";

function SearchableHistory({ children }) {
  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const isSearching = debouncedQuery.trim() !== "";
  return (
    <Wrapper>
      <SearchBar query={query} onQueryChange={setQuery} />
      {isSearching ? <SearchResultSection query={debouncedQuery} /> : children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default SearchableHistory;
