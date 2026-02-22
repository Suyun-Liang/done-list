import React from "react";
import Header from "../Header";
import EntryList from "../EntryList";
import EntryForm from "../EntryForm/EntryForm";
import DateDisplay from "../DateDisplay";

function App() {
  const [entries, setEntries] = React.useState([
    { id: crypto.randomUUID(), text: "cook", createAt: 1771507380000 },
    { id: crypto.randomUUID(), text: "clean my room", createAt: 1771498800000 },
    {
      id: crypto.randomUUID(),
      text: "feed my boss Alisa",
      createAt: 1771545600000,
    },
  ]);

  const [editingId, setEditingId] = React.useState(null);

  const addEntry = React.useCallback((text) => {
    setEntries((curE) => [
      ...curE,
      { id: crypto.randomUUID(), text, createAt: Date.now() },
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
