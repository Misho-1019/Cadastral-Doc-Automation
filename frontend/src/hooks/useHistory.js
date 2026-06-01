import { useState, useCallback } from "react";

export default function useHistory() {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/descriptions/history");
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecord = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    setRecord(null);
    try {
      const res = await fetch(`/api/descriptions/history/${id}`);
      if (!res.ok) throw new Error("Failed to fetch record");
      const data = await res.json();
      setRecord(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRecord = useCallback(async (id) => {
    const res = await fetch(`/api/descriptions/history/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete record");
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { records, record, loading, error, fetchHistory, fetchRecord, deleteRecord };
}
