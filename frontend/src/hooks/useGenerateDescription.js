import { useState, useRef, useCallback } from "react";
import { API_TIMEOUT_MS } from "../constants.js";

export default function useGenerateDescription() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const isSubmittingRef = useRef(false);
  const abortRef = useRef(null);

  const generate = useCallback(async (file) => {
    if (isSubmittingRef.current) return;

    abortRef.current = new AbortController();
    isSubmittingRef.current = true;
    setLoading(true);
    setError(null);
    setData(null);

    const timeoutId = setTimeout(() => {
      abortRef.current?.abort();
    }, API_TIMEOUT_MS);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("/api/descriptions/generate", {
        method: "POST",
        body: formData,
        signal: abortRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `Server error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Generation timed out");
      } else {
        setError(err.message);
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      isSubmittingRef.current = false;
      abortRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
    setData(null);
    setError(null);
    isSubmittingRef.current = false;
    abortRef.current = null;
  }, []);

  return { loading, data, error, generate, reset };
}
