import React from "react";
import EntryList from "../EntryList";
import { formatDate } from "../../utils";
import styled, { css } from "styled-components";

function DaySection({ dayKey, entries, ...delegated }) {
  const { variant = "home" } = { ...delegated };
  return (
    // variant: "home" | "history"
    <Wrapper $variant={variant}>
      <Date $variant={variant}>{formatDate(dayKey, "YYYY-MMM-dd")}</Date>
      {entries.length > 0 && <EntryList entries={entries} {...delegated} />}
      {entries.length === 0 && <QuietDay>A quiet day...</QuietDay>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ $variant }) =>
    $variant === "home"
      ? css``
      : css`
          padding: 8px 10px;
          border: 2px solid currentColor;
          border-radius: var(--radius-sm);
          background-color: var(--color-pink-50);
        `}
`;

const Date = styled.div`
  margin-bottom: var(--space-1);

  ${({ $variant }) =>
    $variant === "home"
      ? css``
      : css`
          border-bottom: 1px solid currentColor;
        `}
`;

const QuietDay = styled.p`
  margin: auto;
`;

export default DaySection;
