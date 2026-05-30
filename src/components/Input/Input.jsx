import React from "react";
import styled from "styled-components";

function Input({ ...delegated }) {
  return <StyledInput {...delegated} />;
}

const StyledInput = styled.input`
  background-color: transparent;
  border: 1px solid var(--color-gray-700);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  &:focus {
    outline-color: var(--color-gray-700);
    outline-offset: 1px;
  }
`;

export default Input;
