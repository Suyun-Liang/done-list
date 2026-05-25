"use client";

import React, { useContext } from "react";
import { EntriesContext } from "../../context/EntriesContext";
import { groupEntriesByDay } from "../../utils";
import DaySection from "../DaySection/DaySection";

function getEntryMatchCount(entry, query) {
  let count = 0;

  if (entry.text.toLowerCase().includes(query)) count += 1;

  entry.comments.forEach((comment) => {
    if (comment.text.toLowerCase().includes(query)) count += 1;
  });

  return count;
}

function SearchResultSection({ query }) {
  const { entries } = useContext(EntriesContext);

  const trimmedQuery = query.trim();
  const lowerCasedQuery = trimmedQuery.toLowerCase();
  const searchResults = entries
    .map((entry) => ({
      entry,
      matchCount: getEntryMatchCount(entry, lowerCasedQuery),
    }))
    .filter((result) => result.matchCount > 0);
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
