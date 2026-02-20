import React from "react";

function EntryForm({ addEntry }) {
  const [entry, setEntry] = React.useState("");
  const fieldId = React.useId();

  function handleSubmit(e) {
    e.preventDefault();
    addEntry(entry);
    setEntry("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`add-entry-field-${fieldId}`}>I did</label>
      <input
        id={`add-entry-field-${fieldId}`}
        type="text"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      ></input>
      <button>send</button>
    </form>
  );
}

export default React.memo(EntryForm);
