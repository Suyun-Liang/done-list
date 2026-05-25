"use client";

import React, { useContext } from "react";
import { EntriesContext } from "../../context/EntriesContext";
import { groupEntriesByDay } from "../../utils";
import DaySection from "../DaySection/DaySection";

// check if each entry or its comment has matched text, and filter the comments
// if there is matched result return an object
// if no match then return null
function getEntrySearchResult(entry, query) {
  const isEntryMatched = entry.text.toLowerCase().includes(query);

  const matchedComments = entry.comments.filter((comment) =>
    comment.text.toLowerCase().includes(query),
  );

  const matchCount = (isEntryMatched ? 1 : 0) + matchedComments.length;

  if (matchCount === 0) return null;

  return {
    entry: { ...entry, comments: matchedComments },
    matchCount,
  };
}

function SearchResultSection({ query }) {
  const { entries } = useContext(EntriesContext);

  const trimmedQuery = query.trim();
  const lowerCasedQuery = trimmedQuery.toLowerCase();

  const searchResults = entries
    .map((entry) => getEntrySearchResult(entry, lowerCasedQuery))
    .filter(Boolean);
  const matchedEntries = searchResults.map((result) => result.entry);
  const matchCount = searchResults.reduce(
    (total, result) => total + result.matchCount,
    0,
  );

  const groupedResults = groupEntriesByDay(matchedEntries);

  const matchCountLabel =
    matchCount === 1 ? "1 match" : `${matchCount} matches`;
  const dayCountLabel =
    groupedResults.length === 1 ? "1 day" : `${groupedResults.length} days`;

  return (
    <div>
      <p>
        Search results for: {trimmedQuery} ( {matchCountLabel} in{" "}
        {dayCountLabel} )
      </p>
      {groupedResults.length === 0 && <p>No matches found.</p>}
      {groupedResults.map((e) => (
        <DaySection key={e.dayKey} dayKey={e.dayKey} entries={e.entries} />
      ))}
    </div>
  );
}

export default SearchResultSection;
