import React from "react";
import DaySection from "../DaySection/DaySection";
import { EntriesContext } from "../../context/EntriesContext";
import { getDayKey, groupEntriesByDay } from "../../utils";
import useTick from "../../hooks/use-tick";

function PastSection() {
  const [editingId, setEditingId] = React.useState(null);
  const { entries, editEntry, deleteEntry } = React.useContext(EntriesContext);

  const entriesExceptToday = entries.filter(
    (e) => getDayKey(e.createdAt) !== getDayKey(Date.now()),
  );
  const groupedEntries = groupEntriesByDay(entriesExceptToday);
  const capabilities = {
    canEdit: false,
    canDelete: false,
    showRelativeTime: false,
  };

  const startEditing = React.useCallback((id) => {
    setEditingId(id);
  }, []);
  const endEditing = React.useCallback(() => {
    setEditingId(null);
  }, []);

  return (
    <div>
      <p>Past Section</p>
      {groupedEntries.map((e) => (
        <DaySection
          key={e.dayKey}
          dayKey={e.dayKey}
          entries={e.entries}
          capabilities={capabilities}
          onSave={editEntry}
          onDelete={deleteEntry}
          onStartEdit={startEditing}
          onStopEdit={endEditing}
          editingId={editingId}
        />
      ))}
    </div>
  );
}

export default PastSection;
