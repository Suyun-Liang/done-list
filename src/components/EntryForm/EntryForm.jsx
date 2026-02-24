import React, { useRef } from "react";

function EntryForm({ addEntry }) {
  const [entry, setEntry] = React.useState("");
  const fieldId = React.useId();
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    addEntry(entry);
    setEntry("");
  }

  function handelCancel() {
    inputRef.current?.blur();
    setEntry("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`add-entry-field-${fieldId}`}>I did</label>
      <input
        id={`add-entry-field-${fieldId}`}
        ref={inputRef}
        type="text"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            handelCancel();
          }
        }}
      ></input>
      <button>send</button>
    </form>
  );
}

export default React.memo(EntryForm);
