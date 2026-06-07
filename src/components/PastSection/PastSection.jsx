"use client";

import React from "react";
import DaySection from "../DaySection/DaySection";
import { EntriesContext } from "../../context/EntriesContext";
import { buildCompactTimeline, getDayKey } from "../../utils";
import useTick from "../../hooks/use-tick";
import styled from "styled-components";

function PastSection({ initialNow }) {
  // {entryId, type: "edit"|"comment"}
  const [activeEntryAction, setActiveEntryAction] = React.useState(null);
  const { entries, editEntry, deleteEntry, addComment, deleteComment } =
    React.useContext(EntriesContext);
  // auto render when its 24:00 so entries from today will be sent to the past section
  const now = useTick("day", initialNow);
  const todayKey = getDayKey(now);

  const entriesExceptToday = entries.filter(
    (e) => getDayKey(e.createdAt) !== todayKey,
  );
  const dailyTimeline = buildCompactTimeline(entriesExceptToday);
  const capabilities = {
    canEdit: false,
    canDelete: false,
    showRelativeTime: false,
    canComment: true,
    canDeleteComment: true,
  };

  //open or close action panel: "edit"|"comment"
  const openEntryAction = React.useCallback((entryId, type) => {
    setActiveEntryAction({ entryId, type });
  }, []);
  const closeEntryAction = React.useCallback(() => {
    setActiveEntryAction(null);
  }, []);

  return (
    <div>
      <p>Past Section</p>
      <Wrapper>
        {dailyTimeline.map((e) => (
          <DaySection
            key={e.dayKey}
            dayKey={e.dayKey}
            entries={e.entries}
            capabilities={capabilities}
            onSave={editEntry}
            onDelete={deleteEntry}
            onAddComment={addComment}
            onDeleteComment={deleteComment}
            activeEntryAction={activeEntryAction}
            onStartEntryAction={openEntryAction}
            onStopEntryAction={closeEntryAction}
            variant="history"
          />
        ))}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);

  @media (min-width: 48rem) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;

export default PastSection;
