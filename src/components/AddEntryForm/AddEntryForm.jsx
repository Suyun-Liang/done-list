import React from "react";
import { EntriesContext } from "../../context/EntriesContext";
import useTextInputValidation from "../../hooks/use-text-input-validation";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import styled from "styled-components";

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
    <Form onSubmit={handleSubmit}>
      <VisuallyHidden as="label" htmlFor={`add-entry-field-${fieldId}`}>
        I did
      </VisuallyHidden>
      <Textarea
        id={`add-entry-field-${fieldId}`}
        ref={inputRef}
        type="text"
        value={entry}
        placeholder="what happened today..."
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
      <Actions>
        <Button variant="fill" size="small" type="submit">
          Add
        </Button>
      </Actions>
      <ErrorMsg $visible={Boolean(submitError)}>{submitError}</ErrorMsg>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ErrorMsg = styled.p`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 500ms ease;
`;

export default React.memo(AddEntryForm);
