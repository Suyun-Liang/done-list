import React from "react";

import useTextInputValidation from "../../hooks/use-text-input-validation";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styled from "styled-components";

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
    onCancel?.();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Main>
        <StyledInput
          ref={inputRef}
          type="text"
          value={draftNote}
          onChange={(e) => {
            setDraftNote(e.target.value);
            if (submitError) setSubmitError("");
          }}
          onKeyDown={(e) => {
            if (e.code === "Escape") {
              onCancel?.();
            }
          }}
        />
        <Actions>
          <Button variant="fill" size="small" type="submit">
            add comment
          </Button>
        </Actions>
      </Main>
      <ErrorMsg $visible={Boolean(submitError)}>{submitError}</ErrorMsg>
    </Form>
  );
}
const Form = styled.form``;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled(Input)`
  min-width: 0;
`;

const Actions = styled.div`
  flex-shrink: 0;
`;

const ErrorMsg = styled.p`
  color: var(--color-teal-700);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 500ms ease;
`;

export default AddCommentForm;
