import React from "react";
import Header from "../Header";
import EntriesProvider from "../../context/EntriesContext";
import PastSection from "../PastSection";
import TodaySection from "../TodaySection/TodaySection";
import SearchBar from "../SearchBar";
import SearchResultSection from "../SearchResultSection/SearchResultSection";

function App() {
  const [query, setQuery] = React.useState("");
  const isSearching = query.trim() !== "";
  return (
    <>
      <EntriesProvider>
        <Header>Today I...</Header>
        <SearchBar query={query} onQueryChange={setQuery} />
        {isSearching && <SearchResultSection query={query} />}
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
