import React from "react";
import EntryItem from "../EntryItem/EntryItem";

function EntryList({ entries }) {
  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <EntryItem key={entry.id} id={entry.id}>
            {entry.text}
          </EntryItem>
        ))}
      </ul>
    </div>
  );
}

export default EntryList;
