"use client";

import React from "react";
import { useStickyState } from "../../hooks/use-sticky-state.js";
import { normalizeEntry } from "../../utils.js";
import { normalizeTextInput } from "../../helper.js";

export const EntriesContext = React.createContext();

const DEFAULT_ENTRIES = [
  { id: "fdsfs", text: "cook", createdAt: 1771507380000 },
  {
    id: "1112",
    text: "clean my room",
    createdAt: 1771498800000,
    comments: [{ id: "dfgghhh", text: "tired...", createdAt: 1771545600000 }],
  },
  {
    id: "123",
    text: "feed my boss Alisa",
    createdAt: 1771545600000,
    comments: [
      {
        id: "dfghff",
        text: "she loved it",
        createdAt: 1771858920002,
      },
    ],
  },
  {
    id: "1134",
    text: "learn driving",
    createdAt: 1771763040000,
    comments: [],
  },
  {
    id: "3445",
    text: "first driving course",
    createdAt: 1771858920002,
    comments: [],
  },
];

function EntriesProvider({ children }) {
  const [entries, setEntries] = useStickyState("entries", DEFAULT_ENTRIES);
  const normalizedEntries = React.useMemo(
    () => entries.map(normalizeEntry),
    [entries],
  );

  const addEntry = React.useCallback(
    (text) => {
      //validate the text:
      const normalizedText = normalizeTextInput(text);
      if (!normalizedText) return;
      setEntries((curE) => [
        ...curE,
        {
          id: crypto.randomUUID(),
          text: normalizedText,
          createdAt: Date.now(),
          comments: [],
        },
      ]);
    },
    [setEntries],
  );
  const deleteEntry = React.useCallback(
    (id) => {
      setEntries((curE) => curE.filter((e) => e.id !== id));
    },
    [setEntries],
  );
  const editEntry = React.useCallback(
    (id, text) => {
      const normalizedText = normalizeTextInput(text);
      if (!normalizedText) return;
      setEntries((curE) =>
        curE.map((e) => (e.id === id ? { ...e, text: normalizedText } : e)),
      );
    },
    [setEntries],
  );

  const addComment = React.useCallback(
    (entryId, text) => {
      //validate the text:
      const normalizedText = normalizeTextInput(text);
      if (!normalizedText) return;

      setEntries((curE) =>
        curE.map((e) => {
          if (e.id !== entryId) return e;
          const newComment = {
            id: crypto.randomUUID(),
            text: normalizedText,
            createdAt: Date.now(),
          };
          return {
            ...e,
            comments: [...e.comments, newComment],
          };
        }),
      );
    },
    [setEntries],
  );

  const deleteComment = React.useCallback(
    (entryId, commentId) => {
      setEntries((curE) => {
        return curE.map((e) => {
          if (e.id !== entryId) return e;
          return {
            ...e,
            comments: e.comments.filter((c) => c.id !== commentId),
          };
        });
      });
    },
    [setEntries],
  );

  const value = React.useMemo(
    () => ({
      entries: normalizedEntries,
      addEntry,
      deleteEntry,
      editEntry,
      addComment,
      deleteComment,
    }),
    [
      normalizedEntries,
      addEntry,
      deleteEntry,
      editEntry,
      addComment,
      deleteComment,
    ],
  );

  return <EntriesContext value={value}>{children}</EntriesContext>;
}

export default EntriesProvider;
