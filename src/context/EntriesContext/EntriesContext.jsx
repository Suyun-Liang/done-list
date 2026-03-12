import React from "react";
import { useStickyState } from "../../hooks/use-sticky-state.js";
import { normalizeEntry } from "../../utils.js";

export const EntriesContext = React.createContext();

const DEFAULT_ENTRIES = [
  { id: crypto.randomUUID(), text: "cook", createdAt: 1771507380000 },
  {
    id: crypto.randomUUID(),
    text: "clean my room",
    createdAt: 1771498800000,
    notes: [
      { id: crypto.randomUUID(), text: "tired...", createdAt: 1771545600000 },
    ],
  },
  {
    id: crypto.randomUUID(),
    text: "feed my boss Alisa",
    createdAt: 1771545600000,
    notes: [
      {
        id: crypto.randomUUID(),
        text: "she loved it",
        createdAt: 1771858920002,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    text: "learn driving",
    createdAt: 1771763040000,
    notes: [],
  },
  {
    id: crypto.randomUUID(),
    text: "first driving course",
    createdAt: 1771858920002,
    notes: [],
  },
];

function EntriesProvider({ children }) {
  const [entries, setEntries] = useStickyState("entries", DEFAULT_ENTRIES);
  const normalizedEntries = React.useMemo(
    () => entries.map(normalizeEntry),
    [entries],
  );

  const addEntry = React.useCallback(
    (text) => {
      setEntries((curE) => [
        ...curE,
        { id: crypto.randomUUID(), text, createdAt: Date.now(), notes: [] },
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

  const addNote = React.useCallback(
    (entryId, text) => {
      setEntries((curE) =>
        curE.map((e) => {
          if (e.id !== entryId) return e;
          const newNote = {
            id: crypto.randomUUID(),
            text,
            createdAt: Date.now(),
          };
          return {
            ...e,
            notes: [...e.notes, newNote],
          };
        }),
      );
    },
    [setEntries],
  );

  const deleteNote = React.useCallback(
    (entryId, noteId) => {
      setEntries((curE) => {
        return curE.map((e) => {
          if (e.id !== entryId) return e;
          return { ...e, notes: e.notes.filter((n) => n.id !== noteId) };
        });
      });
    },
    [setEntries],
  );

  const value = React.useMemo(
    () => ({
      entries: normalizedEntries,
      addEntry,
      deleteEntry,
      editEntry,
      addNote,
      deleteNote,
    }),
    [normalizedEntries, addEntry, deleteEntry, editEntry, addNote, deleteNote],
  );

  return <EntriesContext value={value}>{children}</EntriesContext>;
}

export default EntriesProvider;
