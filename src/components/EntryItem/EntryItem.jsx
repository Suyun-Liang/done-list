import React from "react";
import { formatRelativeTime } from "../../utils";

// what next ?
// under edit status, focus on input

function EntryItem({
  id: entryId,
  children: text,
  createdAt,
  now,
  editEntry,
  deleteEntry,
  editingId,
  startEdit,
  stopEdit,
}) {
  const [editText, setEditText] = React.useState(text);
  const fieldId = React.useId();
  const isEditing = editingId === entryId;

  function handleEdit() {
    startEdit(entryId);
    setEditText(text);
  }

  function handleSubmit(e) {
    e.preventDefault();

    editEntry(entryId, editText);
    stopEdit();
  }

  function handelCancel() {
    stopEdit();
    setEditText(text);
  }

  return (
    <li>
      {!isEditing && (
        <>
          {text}
          <button onClick={handleEdit}>edit</button>
          <button onClick={() => deleteEntry(entryId)}>delete</button>
          <span>{formatRelativeTime(createdAt, now)}</span>
        </>
      )}
      {isEditing && (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor={`edit-entry-field-${fieldId}`}>Edit: </label>
            <input
              autoFocus
              id={`edit-entry-field-${fieldId}`}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.code === "Escape") {
                  handelCancel();
                }
              }}
            />
            <button type="submit">save</button>
            <button type="button" onClick={handelCancel}>
              cancel
            </button>
          </form>
        </>
      )}
    </li>
  );
}

export default EntryItem;
