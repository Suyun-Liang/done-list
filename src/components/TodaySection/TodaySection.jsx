import React from "react";
import EntryList from "../EntryList";
import AddEntryForm from "../AddEntryForm";
import { EntriesContext } from "../../context/EntriesContext";
import { getDayKey } from "../../utils";
import useTick from "../../hooks/use-tick";
import DaySection from "../DaySection/DaySection";

function TodaySection() {
  const [editingId, setEditingId] = React.useState(null);
  const now = useTick("minute");
  const { entries, editEntry, deleteEntry } = React.useContext(EntriesContext);

  const todayKey = getDayKey(Date.now());
  const capabilities = {
    canEdit: true,
    canDelete: true,
    showRelativeTime: true,
  };
  const todayEntries = entries.filter(
    (e) => getDayKey(e.createdAt) === todayKey,
  );

  const startEditing = React.useCallback((id) => {
    setEditingId(id);
  }, []);
  const endEditing = React.useCallback(() => {
    setEditingId(null);
  }, []);
  return (
    <>
      <p>Today Section</p>
      <DaySection
        dayKey={todayKey}
        entries={todayEntries}
        capabilities={capabilities}
        onSave={editEntry}
        onDelete={deleteEntry}
        onStartEdit={startEditing}
        onStopEdit={endEditing}
        editingId={editingId}
        now={now}
      />
      <AddEntryForm />
    </>
  );
}

export default TodaySection;
