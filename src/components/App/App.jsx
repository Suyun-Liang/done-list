import React from "react";
import Header from "../Header";
import EntriesProvider from "../../context/EntriesContext";
import PastSection from "../PastSection";
import TodaySection from "../TodaySection/TodaySection";
import SearchBar from "../SearchBar";
import SearchResultSection from "../SearchResultSection/SearchResultSection";
import { useDebouncedValue } from "../../hooks/use-debounced-value";

function App() {
  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const isSearching = debouncedQuery.trim() !== "";
  return (
    <>
      <EntriesProvider>
        <Header>Today I...</Header>
        <SearchBar query={query} onQueryChange={setQuery} />
        {isSearching && <SearchResultSection query={debouncedQuery} />}
        {!isSearching && (
          <>
            <TodaySection />
            <PastSection />
          </>
        )}
      </EntriesProvider>
    </>
  );
}

export default App;
