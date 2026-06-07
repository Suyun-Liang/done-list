import React from "react";
import Link from "next/link";
import styled from "styled-components";

function TextLink({ children, ...delegated }) {
  return <StyledLink {...delegated}>{children}</StyledLink>;
}

const StyledLink = styled(Link)`
  color: black;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--color-teal-700);
  text-underline-offset: 4px;
  border: 1px solid transparent;
  border-radius: 6px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline-color: var(--color-gray-700);
    outline-offset: 4px;
  }
`;
export default TextLink;
