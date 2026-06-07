import React from "react";
import { Edit, MessageSquare, Trash2 } from "react-feather";
import { formatRelativeTime, isValidTimestamp } from "../../utils";
import AddCommentForm from "../AddCommentForm/AddCommentForm";
import CommentList from "../CommentList/CommentList";
import EditEntryForm from "../EditEntryForm/EditEntryForm";
import VisuallyHidden from "../VisuallyHidden";
import styled, { css } from "styled-components";
import Button from "../Button/Button";

function EntryItem({
  entry,
  variant = "home",
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
    <Item $variant={variant}>
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
    </Item>
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
      <Main>
        <TextGroup>
          <p>
            {text}{" "}
            {showRelativeTime && isValidTimestamp(now) && (
              <RelativeTime>{formatRelativeTime(createdAt, now)}</RelativeTime>
            )}
          </p>
        </TextGroup>
        <ActionGroup>
          {canEdit && (
            <Button type="button" variant="ghost" size="icon" onClick={onEdit}>
              <Edit />
              <VisuallyHidden>edit entry</VisuallyHidden>
            </Button>
          )}
          {canComment && (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={onComment}
            >
              <MessageSquare />
              <VisuallyHidden>comment entry</VisuallyHidden>
            </Button>
          )}
          {canDelete && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onDelete}
            >
              <Trash2 />
              <VisuallyHidden>delete entry</VisuallyHidden>
            </Button>
          )}
        </ActionGroup>
      </Main>
    </>
  );
}

export default EntryItem;

const Item = styled.li`
  /* background-color: var(--color-surface);
  border-radius: var(--radius-sm); */
  margin-bottom: var(--space-1);
  ${({ $variant }) =>
    $variant === "home" &&
    css`
      border: 1px solid var(--color-gray-700);
      border-radius: var(--radius-sm);
      background-color: var(--color-pink-50);
      padding: 4px 10px;
    `}
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextGroup = styled.div`
  min-width: 0;
  & p {
    overflow-wrap: anywhere;
  }
`;
const ActionGroup = styled.div`
  flex-shrink: 0;
`;

const RelativeTime = styled.span`
  color: var(--color-muted);
  font-size: 0.75rem;
`;
