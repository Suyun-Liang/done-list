import React, { useEffect, useState } from "react";
import EntryItem from "../EntryItem/EntryItem";
import useTick from "../../hooks/use-tick";

function EntryList({
  entries,
  editEntry,
  deleteEntry,
  startEdit,
  stopEdit,
  editingId,
}) {
  const now = useTick("minute");

  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <EntryItem
            key={entry.id}
            id={entry.id}
            now={now}
            createdAt={entry.createdAt}
            editEntry={editEntry}
            deleteEntry={deleteEntry}
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
