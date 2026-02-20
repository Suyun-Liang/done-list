import React from "react";
import EntryItem from "../EntryItem/EntryItem";

function EntryList({
  entries,
  editEntry,
  deleteEntry,
  startEdit,
  stopEdit,
  editingId,
}) {
  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <EntryItem
            key={entry.id}
            id={entry.id}
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
