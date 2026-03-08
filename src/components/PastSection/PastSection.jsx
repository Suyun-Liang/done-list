import React from "react";
import DaySection from "../DaySection/DaySection";
import { EntriesContext } from "../../context/EntriesContext";
import { buildDailyTimeline, getDayKey } from "../../utils";
import useTick from "../../hooks/use-tick";

function PastSection() {
  const [editingId, setEditingId] = React.useState(null);
  const { entries, editEntry, deleteEntry } = React.useContext(EntriesContext);
  // auto render when its 24:00 so entries from today will be sent to the past section
  const now = useTick("day");

  const todayKey = getDayKey(now);
  const entriesExceptToday = entries.filter(
    (e) => getDayKey(e.createdAt) !== todayKey,
  );
  const dailyTimeline = buildDailyTimeline(entriesExceptToday);
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
      {dailyTimeline.map((e) => (
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
