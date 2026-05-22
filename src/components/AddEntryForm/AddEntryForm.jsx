import React from "react";
import styles from "./AddEntryForm.module.css";
import { EntriesContext } from "../../context/EntriesContext";
import { normalizeTextInput } from "../../helper";

function AddEntryForm() {
  const [entry, setEntry] = React.useState("");
  const [submitError, setSubmitError] = React.useState("");
  const { addEntry } = React.useContext(EntriesContext);
  const fieldId = React.useId();
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (!submitError) return;
    const timeoutId = window.setTimeout(() => {
      setSubmitError("");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [submitError]);

  function handleSubmit(e) {
    e.preventDefault();
    const normalizedText = normalizeTextInput(entry);
    if (!normalizedText) {
      setSubmitError("Please enter something...");
      return;
    }
    addEntry(normalizedText);
    inputRef?.current?.blur();
    setEntry("");
    setSubmitError("");
  }

  function handleCancel() {
    inputRef.current?.blur();
    setEntry("");
    setSubmitError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`add-entry-field-${fieldId}`}>I did</label>
      <input
        id={`add-entry-field-${fieldId}`}
        ref={inputRef}
        type="text"
        value={entry}
        onChange={(e) => {
          setEntry(e.target.value);
          if (submitError) setSubmitError("");
        }}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            handleCancel();
          }
        }}
      ></input>
      <button>Add</button>
      <p
        className={`${styles.entryError} ${submitError ? styles.visible : ""}`}
      >
        {submitError}
      </p>
    </form>
  );
}

export default React.memo(AddEntryForm);
