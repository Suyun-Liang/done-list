import React from "react";

// what next ?
// under edit status, focus on input

function EntryItem({
  id: entryId,
  children: text,
  editEntry,
  deleteEntry,
  editingId,
  startEdit,
  stopEdit,
}) {
  const [newText, setNewText] = React.useState(text);
  const fieldId = React.useId();
  const isEditing = editingId === entryId;

  function handleEdit() {
    startEdit(entryId);
    setNewText(text);
  }

  function handleSubmit(e) {
    e.preventDefault();

    editEntry(entryId, newText);
    stopEdit();
  }

  return (
    <li>
      {!isEditing && (
        <>
          {text}
          <button onClick={handleEdit}>edit</button>
          <button onClick={() => deleteEntry(entryId)}>delete</button>
        </>
      )}
      {isEditing && (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor={`edit-entry-field-${fieldId}`}>Edit: </label>
            <input
              id={`edit-entry-field-${fieldId}`}
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button type="submit">save</button>
            <button
              type="button"
              onClick={() => {
                stopEdit();
                setNewText(text);
              }}
            >
              cancel
            </button>
          </form>
        </>
      )}
    </li>
  );
}

export default EntryItem;
