import React from "react";
import styled from "styled-components";

const SIZE = {
  small: {
    "--borderRadius": 4 + "px",
    "--fontSize": 16 + "px",
    "--padding": "6px 12px",
  },
  medium: {
    "--borderRadius": 4 + "px",
    "--fontSize": 18 + "px",
    "--padding": "14px 20px",
  },
  large: {
    "--borderRadius": 6 + "px",
    "--fontSize": 21 + "px",
    "--padding": "18px 32px",
  },
};

//size: "small"|"medium"|"large"; variant:"fill"|"outline"|"ghost"
function Button({ children, size = "small", variant = "fill", ...delegated }) {
  const styles = SIZE[size];
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  } else if (variant === "ghost") {
    Component = GhostButton;
  } else {
    throw new Error(`Unrecognized button variant : ${variant} `);
  }
  return (
    <Component style={styles} {...delegated}>
      {children}
    </Component>
  );
}

export default Button;

const ButtonBase = styled.button`
  font-size: var(--fontSize);
  font-family: "Roboto", sans-serif;
  border-radius: var(--borderRadius);
  border: 2px solid transparent;
  padding: var(--padding);
  text-transform: uppercase;
  cursor: pointer;

  &:focus {
    outline-color: var(--color-brown-600);
    outline-offset: 4px;
  }
`;

const FillButton = styled(ButtonBase)`
  background-color: var(--color-brown-600);
  color: white;

  &:hover {
    background-color: var(--color-brown-400);
  }
`;
const OutlineButton = styled(ButtonBase)`
  background-color: white;
  color: var(--color-brown-600);
  border: 2px solid currentColor;

  &:hover {
    background-color: var(--color-brown-50);
  }
`;
const GhostButton = styled(ButtonBase)`
  color: var(--color-gray-700);
  background-color: transparent;

  &:focus {
    outline-color: var(--color-gray-700);
  }

  &:hover {
    background-color: var(--color-gray-300);
    color: black;
  }
`;
