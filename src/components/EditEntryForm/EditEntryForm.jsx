import React from "react";

import VisuallyHidden from "../VisuallyHidden";

import useTextInputValidation from "../../hooks/use-text-input-validation";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styled from "styled-components";

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
      <Main>
        <VisuallyHidden as="label" htmlFor={`edit-entry-field-${fieldId}`}>
          Edit entry
        </VisuallyHidden>
        <StyledInput
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
        <EntryActionGroup>
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
        </EntryActionGroup>
      </Main>
      <ErrorMsg $visible={Boolean(submitError)}>{submitError}</ErrorMsg>
    </form>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  min-width: 0;
`;

const EntryActionGroup = styled.div`
  flex-shrink: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
`;

const ErrorMsg = styled.p`
  color: var(--color-teal-700);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 500ms ease;
`;

export default EditEntryForm;
