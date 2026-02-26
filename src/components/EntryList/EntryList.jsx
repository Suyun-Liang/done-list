import React, { useEffect, useState } from "react";
import EntryItem from "../EntryItem/EntryItem";
import useTick from "../../hooks/use-tick";
import { EntriesContext } from "../../context/EntriesContext";

function EntryList({ startEdit, stopEdit, editingId }) {
  const now = useTick("minute");
  const { entries } = React.useContext(EntriesContext);

  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <EntryItem
            key={entry.id}
            id={entry.id}
            now={now}
            createdAt={entry.createdAt}
            startEdit={startEdit}
            stopEdit={stopEdit}
            editingId={editingId}
          >
            {entry.text}
          </EntryItem>
        ))}
      </ul>
    </div>
  );
}

export default EntryList;
