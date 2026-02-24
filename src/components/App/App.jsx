import React, { useEffect } from "react";
import Header from "../Header";
import EntryList from "../EntryList";
import EntryForm from "../EntryForm/EntryForm";
import DateDisplay from "../DateDisplay";
import { useStickyState } from "../../hooks/use-sticky-state.js";

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

function App() {
  const [entries, setEntries] = useStickyState("entries", DEFAULT_ENTRIES);
  const [editingId, setEditingId] = React.useState(null);

  const addEntry = React.useCallback((text) => {
    setEntries((curE) => [
      ...curE,
      { id: crypto.randomUUID(), text, createdAt: Date.now() },
    ]);
  }, []);
  const deleteEntry = React.useCallback((id) => {
    setEntries((curE) => curE.filter((e) => e.id !== id));
  }, []);
  const editEntry = React.useCallback((id, text) => {
    setEntries((curE) => curE.map((e) => (e.id === id ? { ...e, text } : e)));
  }, []);
  const startEdit = React.useCallback((id) => {
    setEditingId(id);
  }, []);
  const stopEdit = React.useCallback(() => {
    setEditingId(null);
  }, []);

  return (
    <>
      <Header>Today I...</Header>
      <DateDisplay timestamp={Date.now()} />
      <EntryList
        entries={entries}
        editEntry={editEntry}
        deleteEntry={deleteEntry}
        startEdit={startEdit}
        stopEdit={stopEdit}
        editingId={editingId}
      />
      <EntryForm addEntry={addEntry} />
    </>
  );
}

export default App;
