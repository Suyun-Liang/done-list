import React from "react";

function NotesSection({ notes }) {
  return (
    <div>
      <ul>
        {notes.map((n) => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
      <form>
        <input type="text" />
        <button type="submit">add note</button>
      </form>
    </div>
  );
}

export default NotesSection;
