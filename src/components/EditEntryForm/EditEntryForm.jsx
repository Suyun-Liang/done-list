import React from "react";
import styles from "./EditEntryForm.module.css";
import useTextInputValidation from "../../hooks/use-text-input-validation";

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
            setSubmitError("");
            onCancel?.();
          }
        }}
      />
      <button type="submit">save</button>
      <button
        type="button"
        onClick={() => {
          onCancel?.();
          setSubmitError("");
        }}
      >
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

export default EditEntryForm;
