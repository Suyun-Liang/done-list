import React from "react";

function CommentList({ comments, entryId, onDeleteComment }) {
  function handleDelete(commentId) {
    onDeleteComment(entryId, commentId);
  }
  return (
    <div>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.text}{" "}
            <button
              type="button"
              onClick={() => {
                handleDelete(c.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
