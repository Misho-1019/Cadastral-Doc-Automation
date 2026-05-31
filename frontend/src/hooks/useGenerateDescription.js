import { useState, useRef, useCallback } from "react";

export default function useGenerateDescription() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const isSubmittingRef = useRef(false);

  const generate = useCallback(async (file) => {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("/api/descriptions/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `Server error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setData(null);
    setError(null);
    isSubmittingRef.current = false;
  }, []);

  return { loading, data, error, generate, reset };
}
