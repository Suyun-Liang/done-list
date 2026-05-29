import React from "react";
import styles from "./EditEntryForm.module.css";

import VisuallyHidden from "../VisuallyHidden";

import useTextInputValidation from "../../hooks/use-text-input-validation";
import Button from "../Button/Button";

function EditEntryForm({ id, onSave, onCancel, value, setValue }) {
  const fieldId = React.useId();
  const { submitError, setSubmitError, getValidText } =
    useTextInputValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const normalizedText = getValidText(value);
    if (!normalizedText) return;
    onSave?.(id, normalizedText);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formMain}>
        <VisuallyHidden as="label" htmlFor={`edit-entry-field-${fieldId}`}>
          Edit entry
        </VisuallyHidden>
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
              setSubmitError("");
              onCancel?.();
            }
          }}
        />
        <div className={styles.editEntryActionGroup}>
          <Button variant="fill" size="small" type="submit">
            save
          </Button>
          <Button
            variant="ghost"
            size="small"
            type="button"
            onClick={() => {
              onCancel?.();
              setSubmitError("");
            }}
          >
            cancel
          </Button>
        </div>
      </div>
      <p
        className={`${styles.entryError} ${submitError ? styles.visible : ""}`}
      >
        {submitError}
      </p>
    </form>
  );
}

export default EditEntryForm;
