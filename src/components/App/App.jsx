import React from "react";
import Header from "../Header";
import EntryList from "../EntryList";
import EntryForm from "../EntryForm/EntryForm";

function App() {
  const [entries, setEntries] = React.useState([
    { id: crypto.randomUUID(), text: "cook" },
    { id: crypto.randomUUID(), text: "clean my room" },
    { id: crypto.randomUUID(), text: "feed my boss Alisa" },
  ]);

  const [count, setCount] = React.useState(0);

  const addEntry = React.useCallback((text) => {
    setEntries((curE) => [...curE, { id: crypto.randomUUID(), text }]);
  }, []);
  const deleteEntry = React.useCallback((id) => {
    setEntries((curE) => curE.filter((e) => e.id !== id));
  }, []);
  const editEntry = React.useCallback((id, text) => {
    setEntries((curE) => curE.map((e) => (e.id === id ? { ...e, text } : e)));
  }, []);

  return (
    <>
      {/*   
      // for test child component re-render  
      <div>
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div> */}
      <Header>Today I...</Header>
      <EntryList entries={entries} />
      <EntryForm addEntry={addEntry} />
    </>
  );
}

export default App;
