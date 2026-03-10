import React from "react";
import { formatRelativeTime, isValidTimestamp } from "../../utils";
import NotesSection from "../NotesSection/NotesSection";

// what next ?
// under edit status, focus on input

function EntryItem({
  entry,
  // display policy
  capabilities = {},
  now,
  // data actions
  onSave,
  onDelete,
  //UI control state
  editingId,
  onStartEdit,
  onStopEdit,
}) {
  const { id: entryId, text, createdAt, notes } = entry;
  const [draftText, setDraftText] = React.useState(text);
  const {
    canEdit = false,
    canDelete = false,
    showRelativeTime = false,
    canAddNote = false,
  } = capabilities;
  const isEditing = editingId === entryId;

  //keep draft default text fresh when user is not editing
  React.useEffect(() => {
    if (!isEditing) setDraftText(text);
  }, [text, isEditing]);

  function handleStartEdit() {
    if (!canEdit) return;
    onStartEdit?.(entryId);
    setDraftText(text);
  }

  function handleCancel() {
    onStopEdit?.();
    setDraftText(text);
  }

  function saveAndExit() {
    onSave?.(entryId, draftText);
    handleCancel();
  }
  return (
    <li>
      {!isEditing && (
        <DisplayEntry
          text={text}
          createdAt={createdAt}
          canEdit={canEdit}
          canDelete={canDelete}
          showRelativeTime={showRelativeTime}
          now={now}
          onEdit={handleStartEdit}
          onDelete={() => onDelete?.(entry.id)}
        />
      )}
      {canEdit && isEditing && (
        <EditEntryForm
          value={draftText}
          setValue={setDraftText}
          onSave={saveAndExit}
          onCancel={handleCancel}
        />
      )}
      {canAddNote && <NotesSection notes={notes} />}
    </li>
  );
}

function DisplayEntry({
  text,
  createdAt,
  canEdit,
  canDelete,
  showRelativeTime,
  now,
  onEdit,
  onDelete,
}) {
  return (
    <>
      {text}
      {canEdit && (
        <button type="button" onClick={onEdit}>
          edit
        </button>
      )}
      {canDelete && (
        <button type="button" onClick={onDelete}>
          delete
        </button>
      )}
      {showRelativeTime && isValidTimestamp(now) && (
        <span>{formatRelativeTime(createdAt, now)}</span>
      )}
    </>
  );
}

function EditEntryForm({ onSave, onCancel, value, setValue }) {
  const fieldId = React.useId();

  function handleSubmit(e) {
    e.preventDefault();
    onSave?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`edit-entry-field-${fieldId}`}>Edit: </label>
      <input
        autoFocus
        id={`edit-entry-field-${fieldId}`}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            onCancel?.();
          }
        }}
      />
      <button type="submit">save</button>
      <button type="button" onClick={onCancel}>
        cancel
      </button>
    </form>
  );
}

export default EntryItem;
