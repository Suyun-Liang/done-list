import React from "react";
import { Trash2 } from "react-feather";

function CommentList({ comments, entryId, canDeleteComment, onDeleteComment }) {
  function handleDelete(commentId) {
    if (!canDeleteComment) return;
    onDeleteComment(entryId, commentId);
  }
  return (
    <div>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.text}{" "}
            {canDeleteComment && (
              <button
                type="button"
                onClick={() => {
                  handleDelete(c.id);
                }}
              >
                <Trash2 />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
