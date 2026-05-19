import React from "react";
import styles from "./EntryItem.module.css";
import { formatRelativeTime, isValidTimestamp } from "../../utils";
import NotesSection from "../NotesSection/NotesSection";
import { normalizeTextInput } from "../../helper";

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
  onAddNote,
  onDeleteNote,
}) {
  const { id: entryId, text, createdAt, notes } = entry;
  const [draftText, setDraftText] = React.useState(text);
  const [submitError, setSubmitError] = React.useState("");
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
    setSubmitError("");
  }

  function saveAndExit(id, text) {
    onSave?.(id, text);
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
          id={entryId}
          value={draftText}
          submitError={submitError}
          setValue={setDraftText}
          setSubmitError={setSubmitError}
          onSave={saveAndExit}
          onCancel={handleCancel}
        />
      )}
      {canAddNote && (
        <NotesSection
          notes={notes}
          entryId={entryId}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
        />
      )}
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

function EditEntryForm({
  id,
  onSave,
  onCancel,
  value,
  setValue,
  submitError,
  setSubmitError,
}) {
  const fieldId = React.useId();

  React.useEffect(() => {
    if (!submitError) return;
    const timeoutId = window.setTimeout(() => {
      setSubmitError("");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [submitError]);

  function handleSubmit(e) {
    e.preventDefault();
    const normalizedText = normalizeTextInput(value);
    if (!normalizedText) {
      setSubmitError("Please enter something...");
      return;
    }
    onSave?.(id, normalizedText);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`edit-entry-field-${fieldId}`}>Edit: </label>
      <input
        autoFocus
        id={`edit-entry-field-${fieldId}`}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (submitError) setSubmitError("");
        }}
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
      <p
        className={`${styles.entryError} ${submitError ? styles.visible : ""}`}
      >
        {submitError}
      </p>
    </form>
  );
}

export default EntryItem;
