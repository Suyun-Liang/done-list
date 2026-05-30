import React from "react";
import styles from "./AddEntryForm.module.css";
import { EntriesContext } from "../../context/EntriesContext";
import useTextInputValidation from "../../hooks/use-text-input-validation";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

function AddEntryForm() {
  const [entry, setEntry] = React.useState("");
  const { addEntry } = React.useContext(EntriesContext);
  const fieldId = React.useId();
  const inputRef = React.useRef();
  const { submitError, setSubmitError, getValidText } =
    useTextInputValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const normalizedText = getValidText(entry);
    if (!normalizedText) return;
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
      <VisuallyHidden as="label" htmlFor={`add-entry-field-${fieldId}`}>
        I did
      </VisuallyHidden>
      <Textarea
        id={`add-entry-field-${fieldId}`}
        ref={inputRef}
        type="text"
        value={entry}
        placeholder="what happened todday..."
        onChange={(e) => {
          setEntry(e.target.value);
          if (submitError) setSubmitError("");
        }}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            handleCancel();
          }
        }}
      />
      <Button variant="fill" size="small">
        Add
      </Button>
      <p
        className={`${styles.entryError} ${submitError ? styles.visible : ""}`}
      >
        {submitError}
      </p>
    </form>
  );
}

export default React.memo(AddEntryForm);
