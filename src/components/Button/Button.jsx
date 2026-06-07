import React from "react";
import styled, { css } from "styled-components";

const SIZE = {
  small: {
    "--borderRadius": 6 + "px",
    "--fontSize": 16 + "px",
    "--padding": "6px 14px",
  },
  medium: {
    "--borderRadius": 8 + "px",
    "--fontSize": 18 + "px",
    "--padding": "14px 22px",
  },
  large: {
    "--borderRadius": 10 + "px",
    "--fontSize": 21 + "px",
    "--padding": "18px 34px",
  },
  icon: {
    "--borderRadius": 6 + "px",
    "--buttonSize": 32 + "px",
    "--iconSize": 20 + "px",
    "--padding": "0",
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
    <Component style={styles} $size={size} {...delegated}>
      {children}
    </Component>
  );
}

export default Button;

const ButtonBase = styled.button`
  width: var(--buttonSize, auto);
  height: var(--buttonSize, auto);

  font-size: var(--fontSize);
  font-family: inherit;
  border-radius: var(--borderRadius);
  border: var(--borderWidth, 2px) solid transparent;
  padding: var(--padding);
  text-transform: capitalize;
  cursor: pointer;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  svg {
    width: var(--iconSize, 1rem);
    height: var(--iconSize, 1rem);
    stroke-width: var(--iconStrokeWidth, 2px);
  }

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
  border-color: currentColor;

  ${({ $size }) =>
    $size === "icon" &&
    css`
      --borderWidth: 1px;
      --iconStrokeWidth: 1.5px;
    `}

  &:hover {
    background-color: var(--color-brown-50);
  }
`;
const GhostButton = styled(ButtonBase)`
  color: var(--color-gray-700);
  background-color: transparent;

  ${({ $size }) =>
    $size === "icon" &&
    css`
      --borderWidth: 0px;
      --iconStrokeWidth: 2px;
      color: var(--color-brown-700);
    `}

  &:focus {
    outline-color: var(--color-gray-700);

    ${({ $size }) =>
      $size === "icon" &&
      css`
        outline-color: var(--color-brown-700);
      `}
  }

  &:hover {
    background-color: var(--color-gray-300);
    color: black;

    ${({ $size }) =>
      $size === "icon" &&
      css`
        background-color: var(--color-brown-100);
      `}
  }
`;
