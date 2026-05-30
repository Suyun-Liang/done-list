import React from "react";
import styled from "styled-components";

function Textarea({ children, ...delegated }) {
  return <StyledTextarea {...delegated}>{children}</StyledTextarea>;
}

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  background-color: transparent;
  border: 1px solid var(--color-gray-700);
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  &:focus {
    outline-color: var(--color-gray-700);
    outline-offset: 1px;
  }
`;

export default Textarea;
