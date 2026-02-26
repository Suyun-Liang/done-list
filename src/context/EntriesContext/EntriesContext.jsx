import React from "react";
import { useStickyState } from "../../hooks/use-sticky-state.js";

export const EntriesContext = React.createContext();

const DEFAULT_ENTRIES = [
  { id: crypto.randomUUID(), text: "cook", createdAt: 1771507380000 },
  {
    id: crypto.randomUUID(),
    text: "clean my room",
    createdAt: 1771498800000,
  },
  {
    id: crypto.randomUUID(),
    text: "feed my boss Alisa",
    createdAt: 1771545600000,
  },
  {
    id: crypto.randomUUID(),
    text: "learn driving",
    createdAt: 1771763040000,
  },
  {
    id: crypto.randomUUID(),
    text: "first driving course",
    createdAt: 1771858920002,
  },
];

function EntriesProvider({ children }) {
  const [entries, setEntries] = useStickyState("entries", DEFAULT_ENTRIES);

  const addEntry = React.useCallback(
    (text) => {
      setEntries((curE) => [
        ...curE,
        { id: crypto.randomUUID(), text, createdAt: Date.now() },
      ]);
    },
    [setEntries],
  );
  const deleteEntry = React.useCallback(
    (id) => {
      setEntries((curE) => curE.filter((e) => e.id !== id));
    },
    [setEntries],
  );
  const editEntry = React.useCallback(
    (id, text) => {
      setEntries((curE) => curE.map((e) => (e.id === id ? { ...e, text } : e)));
    },
    [setEntries],
  );

  const value = React.useMemo(
    () => ({ entries, addEntry, deleteEntry, editEntry }),
    [entries, addEntry, deleteEntry, editEntry],
  );

  return <EntriesContext value={value}>{children}</EntriesContext>;
}

export default EntriesProvider;
