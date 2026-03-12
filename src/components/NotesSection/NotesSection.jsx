import React from "react";

function NotesSection({ notes, entryId, onAddNote, onDeleteNote }) {
  const [draftNote, setDraftNote] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (draftNote.trim() === "") return;
    onAddNote(entryId, draftNote);
    setDraftNote("");
  }

  function handleDelete(noteId) {
    onDeleteNote(entryId, noteId);
  }

  return (
    <div>
      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            {n.text}{" "}
            <button
              type="button"
              onClick={() => {
                handleDelete(n.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={draftNote}
          onChange={(e) => setDraftNote(e.target.value)}
        />
        <button type="submit">add note</button>
      </form>
    </div>
  );
}

export default NotesSection;
