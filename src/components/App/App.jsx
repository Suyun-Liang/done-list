import React from "react";
import Header from "../Header";
import EntryList from "../EntryList";
import AddEntryForm from "../AddEntryForm";
import DateDisplay from "../DateDisplay";
import EntriesProvider from "../../context/EntriesContext";

function App() {
  const [editingId, setEditingId] = React.useState(null);

  const startEdit = React.useCallback((id) => {
    setEditingId(id);
  }, []);
  const stopEdit = React.useCallback(() => {
    setEditingId(null);
  }, []);

  return (
    <>
      <EntriesProvider>
        <Header>Today I...</Header>
        <DateDisplay timestamp={Date.now()} />
        <EntryList
          startEdit={startEdit}
          stopEdit={stopEdit}
          editingId={editingId}
        />
        <AddEntryForm />
      </EntriesProvider>
    </>
  );
}

export default App;
