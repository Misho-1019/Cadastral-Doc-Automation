import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function useHistory() {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(null);
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
      const res = await fetch("/api/descriptions/history", {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  const fetchRecord = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    setRecord(null);
    try {
      const res = await fetch(`/api/descriptions/history/${id}`, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch record");
      const data = await res.json();
      setRecord(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  const deleteRecord = useCallback(async (id) => {
    const res = await fetch(`/api/descriptions/history/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete record");
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, [getHeaders]);

  return { records, record, loading, error, fetchHistory, fetchRecord, deleteRecord };
}
