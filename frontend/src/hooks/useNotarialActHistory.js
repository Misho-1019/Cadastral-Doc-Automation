import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function useNotarialActHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useAuth();

  const getHeaders = useCallback(() => {
    const headers = {};
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }
    return headers;
  }, [session]);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/descriptions/notarial-act-history`,
        { headers: getHeaders() }
      );
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  const downloadRecord = useCallback(
    async (id, fileName) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/descriptions/notarial-act-history/${id}/download`,
        { headers: getHeaders() }
      );
      if (!res.ok) throw new Error("Failed to download document");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "notarial-act.docx";
      a.click();
      URL.revokeObjectURL(url);
    },
    [getHeaders]
  );

  const deleteRecord = useCallback(
    async (id) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/descriptions/notarial-act-history/${id}`,
        { method: "DELETE", headers: getHeaders() }
      );
      if (!res.ok) throw new Error("Failed to delete record");
      setRecords((prev) => prev.filter((r) => r.id !== id));
    },
    [getHeaders]
  );

  return { records, loading, error, fetchHistory, downloadRecord, deleteRecord };
}
