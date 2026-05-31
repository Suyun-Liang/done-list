import React, { useEffect, useState } from "react";
import EntryItem from "../EntryItem/EntryItem";
import styled, { css } from "styled-components";

function EntryList({ entries, ...delegated }) {
  const { variant = "home" } = { ...delegated };
  return (
    <div>
      <UnorderedList $variant={variant}>
        {entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} {...delegated} />
        ))}
      </UnorderedList>
    </div>
  );
}

const UnorderedList = styled.ul`
  ${({ $variant }) =>
    $variant === "home" &&
    css`
      padding-inline-start: 0;
      list-style-type: none;
    `}
`;

export default EntryList;
