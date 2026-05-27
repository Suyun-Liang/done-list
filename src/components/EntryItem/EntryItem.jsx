import React from "react";
import styles from "./EntryItem.module.css";
import { Edit, MessageSquare, Trash2 } from "react-feather";
import { formatRelativeTime, isValidTimestamp } from "../../utils";
import AddCommentForm from "../AddCommentForm/AddCommentForm";
import CommentList from "../CommentList/CommentList";
import EditEntryForm from "../EditEntryForm/EditEntryForm";
import VisuallyHidden from "../VisuallyHidden";

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

  const {
    canEdit = false,
    canDelete = false,
    canComment = false,
    canDeleteComment = false,
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
  }

  function saveAndExit(id, text) {
    onSave?.(id, text);
    handleCancel();
  }
  return (
    <li className={styles.entryItem}>
      {/*  edit form replace the entry display */}
      {!isEditing && (
        <DisplayEntryItem
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
          setValue={setDraftText}
          onSave={saveAndExit}
          onCancel={handleCancel}
        />
      )}

      {comments.length > 0 && (
        <CommentList
          comments={comments}
          entryId={entryId}
          canDeleteComment={canDeleteComment}
          onDeleteComment={onDeleteComment}
        />
      )}
      {canComment && isCommenting && (
        <AddCommentForm
          entryId={entryId}
          onAddComment={onAddComment}
          onCancel={handleCancel}
        />
      )}
    </li>
  );
}

function DisplayEntryItem({
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
      <div className={styles.entryMain}>
        <div className={styles.entryTextGroup}>
          <p>
            {text}{" "}
            {showRelativeTime && isValidTimestamp(now) && (
              <span className={styles.relativeTime}>
                {formatRelativeTime(createdAt, now)}
              </span>
            )}
          </p>
        </div>
        <div className={styles.entryActionGroup}>
          {canEdit && (
            <button type="button" onClick={onEdit}>
              <Edit />
              <VisuallyHidden>edit entry</VisuallyHidden>
            </button>
          )}
          {canComment && (
            <button onClick={onComment}>
              <MessageSquare />
              <VisuallyHidden>comment entry</VisuallyHidden>
            </button>
          )}
          {canDelete && (
            <button type="button" onClick={onDelete}>
              <Trash2 />
              <VisuallyHidden>delete entry</VisuallyHidden>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default EntryItem;
