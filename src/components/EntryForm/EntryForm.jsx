import React from "react";

function EntryForm({ addEntry }) {
  const [entry, setEntry] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addEntry(entry);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="entry">I did</label>
      <input
        id="entry"
        type="text"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      ></input>
      <button>send</button>
    </form>
  );
}

export default React.memo(EntryForm);
