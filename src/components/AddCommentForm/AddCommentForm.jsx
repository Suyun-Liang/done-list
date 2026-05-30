import React from "react";

import styles from "./AddCommentForm.module.css";

import useTextInputValidation from "../../hooks/use-text-input-validation";
import Button from "../Button/Button";
import Input from "../Input/Input";

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
      <Input
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
      <Button variant="fill" size="small" type="submit">
        add comment
      </Button>
      <p
        className={`${styles.entryError} ${submitError ? styles.visible : ""}`}
      >
        {submitError}
      </p>
    </form>
  );
}

export default AddCommentForm;
