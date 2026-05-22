import React from "react";
import styles from "./EntryItem.module.css";
import { Edit, MessageSquare, Trash2 } from "react-feather";
import { formatRelativeTime, isValidTimestamp } from "../../utils";
import AddCommentForm from "../AddCommentForm/AddCommentForm";
import { normalizeTextInput } from "../../helper";
import CommentList from "../CommentList/CommentList";

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
  onAddComment,
  onDeleteComment,
  activeEntryAction,
  onStartEntryAction,
  onStopEntryAction,
}) {
  const { id: entryId, text, createdAt, comments } = entry;
  const [draftText, setDraftText] = React.useState(text);
  const [submitError, setSubmitError] = React.useState("");

  const {
    canEdit = false,
    canDelete = false,
    canComment = false,
    showRelativeTime = false,
  } = capabilities;
  const isEditing =
    activeEntryAction?.entryId === entryId &&
    activeEntryAction?.type === "edit";
  const isCommenting =
    activeEntryAction?.entryId === entryId &&
    activeEntryAction?.type === "comment";

  //keep draft default text fresh when user is not editing
  React.useEffect(() => {
    if (!isEditing) setDraftText(text);
  }, [text, isEditing]);

  function handleStartEdit() {
    if (!canEdit) return;
    onStartEntryAction(entryId, "edit");
    setDraftText(text);
  }

  function handleStartComment() {
    if (!canComment) return;
    onStartEntryAction(entryId, "comment");
    // toggle comment form
    if (isCommenting) onStopEntryAction();
  }

  function handleCancel() {
    onStopEntryAction?.();
    setDraftText(text);
    setSubmitError("");
  }

  function saveAndExit(id, text) {
    onSave?.(id, text);
    handleCancel();
  }
  return (
    <li>
      {/*  edit form replace the entry display */}
      {!isEditing && (
        <DisplayEntry
          text={text}
          createdAt={createdAt}
          canEdit={canEdit}
          canDelete={canDelete}
          canComment={canComment}
          showRelativeTime={showRelativeTime}
          now={now}
          onEdit={handleStartEdit}
          onComment={handleStartComment}
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

      {comments.length > 0 && (
        <CommentList
          comments={comments}
          entryId={entryId}
          onDeleteComment={onDeleteComment}
        />
      )}
      {canComment && isCommenting && (
        <AddCommentForm entryId={entryId} onAddComment={onAddComment} />
      )}
    </li>
  );
}

function DisplayEntry({
  text,
  createdAt,
  canEdit,
  canDelete,
  canComment,
  showRelativeTime,
  now,
  onEdit,
  onComment,
  onDelete,
}) {
  return (
    <>
      {text}
      {canEdit && (
        <button type="button" onClick={onEdit}>
          <Edit />
        </button>
      )}
      {canComment && (
        <button onClick={onComment}>
          <MessageSquare />
        </button>
      )}
      {canDelete && (
        <button type="button" onClick={onDelete}>
          <Trash2 />
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
