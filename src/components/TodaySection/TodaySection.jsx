"use client";

import React from "react";
import AddEntryForm from "../AddEntryForm";
import { EntriesContext } from "../../context/EntriesContext";
import { getDayKey } from "../../utils";
import useTick from "../../hooks/use-tick";
import DaySection from "../DaySection/DaySection";

function TodaySection({ initialNow }) {
  // {entryId, type: "edit"|"comment"}
  const [activeEntryAction, setActiveEntryAction] = React.useState(null);
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

  //open or close action panel: "edit"|"comment"
  const openEntryAction = React.useCallback((entryId, type) => {
    setActiveEntryAction({ entryId, type });
  }, []);
  const closeEntryAction = React.useCallback(() => {
    setActiveEntryAction(null);
  }, []);
  return (
    <>
      <DaySection
        dayKey={todayKey}
        entries={todayEntries}
        capabilities={capabilities}
        onSave={editEntry}
        onDelete={deleteEntry}
        activeEntryAction={activeEntryAction}
        onStartEntryAction={openEntryAction}
        onStopEntryAction={closeEntryAction}
        now={relativeNow}
      />
      <AddEntryForm />
    </>
  );
}

export default TodaySection;
