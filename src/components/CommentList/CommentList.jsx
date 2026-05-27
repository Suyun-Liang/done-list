import React from "react";
import styles from "./CommentList.module.css";
import { Trash2 } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";

function CommentList({ comments, entryId, canDeleteComment, onDeleteComment }) {
  function handleDelete(commentId) {
    if (!canDeleteComment) return;
    onDeleteComment(entryId, commentId);
  }
  return (
    <div>
      <ul>
        {comments.map((c) => (
          <li key={c.id} className={styles.commentItem}>
            <div className={styles.commentMain}>
              <div className={styles.commentTextGroup}>
                <p>{c.text}</p>
              </div>
              <div className={styles.commentActionGroup}>
                {canDeleteComment && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(c.id);
                    }}
                  >
                    <Trash2 />
                    <VisuallyHidden>Delete comment</VisuallyHidden>
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
