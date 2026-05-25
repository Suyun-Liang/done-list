"use client";

import React from "react";
import { normalizeTextInput } from "../helper";

export default function useTextInputValidation() {
  const [submitError, setSubmitError] = React.useState(null);

  React.useEffect(() => {
    if (!submitError) return;
    const timeoutId = window.setTimeout(() => {
      setSubmitError("");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [submitError]);

  function getValidText(text) {
    const normalizedText = normalizeTextInput(text);

    if (!normalizedText) {
      setSubmitError("Please enter something...");
      return null;
    }

    return normalizedText;
  }

  return { submitError, setSubmitError, getValidText };
}
