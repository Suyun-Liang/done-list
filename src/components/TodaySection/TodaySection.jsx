"use client";

import React from "react";
import AddEntryForm from "../AddEntryForm";
import { EntriesContext } from "../../context/EntriesContext";
import { getDayKey } from "../../utils";
import useTick from "../../hooks/use-tick";
import DaySection from "../DaySection/DaySection";

function TodaySection({ initialNow }) {
  const [editingId, setEditingId] = React.useState(null);
  const { entries, editEntry, deleteEntry } = React.useContext(EntriesContext);

  const capabilities = {
    canEdit: true,
    canDelete: true,
    showRelativeTime: true,
  };

  const relativeNow = useTick("minute", initialNow);
  const calendarNow = useTick("day", initialNow);
  const todayKey = getDayKey(calendarNow);

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
      <DaySection
        dayKey={todayKey}
        entries={todayEntries}
        capabilities={capabilities}
        onSave={editEntry}
        onDelete={deleteEntry}
        onStartEdit={startEditing}
        onStopEdit={endEditing}
        editingId={editingId}
        now={relativeNow}
      />
      <AddEntryForm />
    </>
  );
}

export default TodaySection;
