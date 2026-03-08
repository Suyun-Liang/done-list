import React, { useContext } from "react";
import { EntriesContext } from "../../context/EntriesContext";
import { groupEntriesByDay } from "../../utils";
import DaySection from "../DaySection/DaySection";

function SearchResultSection({ query }) {
  const { entries } = useContext(EntriesContext);

  const trimmedQuery = query.trim();
  const lowerCasedQuery = trimmedQuery.toLowerCase();
  const matchedEntries = entries.filter((e) =>
    e.text.toLowerCase().includes(lowerCasedQuery),
  );
  const groupedResults = groupEntriesByDay(matchedEntries);

  const matchCountLabel =
    matchedEntries.length === 1
      ? "1 match"
      : `${matchedEntries.length} matches`;
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
