import React from "react";

import styles from "./AddCommentForm.module.css";

import useTextInputValidation from "../../hooks/use-text-input-validation";

function AddCommentForm({ entryId, onAddComment, onCancel }) {
  const [draftNote, setDraftNote] = React.useState("");
  const inputRef = React.useRef();
  const { submitError, setSubmitError, getValidText } =
    useTextInputValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const normalizedText = getValidText(draftNote);
    if (!normalizedText) return;
    onAddComment(entryId, normalizedText);
    inputRef?.current?.blur();
    setDraftNote("");
    setSubmitError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={draftNote}
        onChange={(e) => {
          setDraftNote(e.target.value);
          setSubmitError("");
        }}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            onCancel?.();
          }
        }}
      />
      <button type="submit">add comment</button>
      <p
        className={`${styles.entryError} ${submitError ? styles.visible : ""}`}
      >
        {submitError}
      </p>
    </form>
  );
}

export default AddCommentForm;
