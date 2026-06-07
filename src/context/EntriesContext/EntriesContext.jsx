"use client";

import React from "react";
import { useStickyState } from "../../hooks/use-sticky-state.js";
import { normalizeEntry } from "../../utils.js";
import { createId, normalizeTextInput } from "../../helper.js";

export const EntriesContext = React.createContext();

const DEFAULT_ENTRIES = [
  {
    id: "1",
    text: "made coffee and opened the window",
    createdAt: 1771507380000,
    comments: [
      {
        id: "c1",
        text: "the weather felt soft today",
        createdAt: 1771510980000,
      },
    ],
  },

  // --- 2 day gap ---

  {
    id: "2",
    text: "studied German for 20 minutes",
    createdAt: 1771763040000,
    comments: [],
  },

  {
    id: "3",
    text: "stayed in bed most of the afternoon",
    createdAt: 1771766640000,
    comments: [
      {
        id: "c2",
        text: "i think i really needed the rest",
        createdAt: 1771770240000,
      },
    ],
  },

  // --- 1 day gap ---

  {
    id: "4",
    text: "went outside even though i didn't want to",
    createdAt: 1771945320000,
    comments: [],
  },

  // --- 4 day gap (should NOT fill) ---

  {
    id: "5",
    text: "fixed a small React bug",
    createdAt: 1772377320000,
    comments: [
      {
        id: "c3",
        text: "the bug was just a missing import",
        createdAt: 1772380920000,
      },
      {
        id: "c4",
        text: "felt proud after solving it",
        createdAt: 1772384520000,
      },
    ],
  },

  {
    id: "6",
    text: "watched TV with my husband",
    createdAt: 1772463720000,
    comments: [],
  },

  // --- 3 day gap (edge case: SHOULD fill) ---

  {
    id: "7",
    text: "survived my driving lesson",
    createdAt: 1772809320000,
    comments: [
      {
        id: "c5",
        text: "parallel parking is still scary",
        createdAt: 1772812920000,
      },
    ],
  },

  // same day
  {
    id: "8",
    text: "cooked noodles at 11pm",
    createdAt: 1772816520000,
    comments: [],
  },

  // --- today-ish entry for relative time testing ---

  {
    id: "9",
    text: "worked on DoneList before sleeping",
    createdAt: Date.now() - 1000 * 60 * 8,
    comments: [],
  },

  {
    id: "10",
    text: "did absolutely nothing today",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
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
          id: createId(),
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
            id: createId(),
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
