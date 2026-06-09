import { useState, useEffect } from "react";
import { t } from "../i18n.js";
import useNotarialActHistory from "../hooks/useNotarialActHistory.js";
import ConfirmModal from "./ConfirmModal.jsx";

export default function NotarialActHistoryList({ lang }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { records, loading, fetchHistory, downloadRecord, deleteRecord } =
    useNotarialActHistory();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = (id) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteRecord(deleteTarget);
    } catch {
      // silently fail
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading && records.length === 0) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-slate-100 dark:bg-slate-700 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!loading && records.length === 0) {
    return (
      <div className="text-center py-10">
        <svg className="mx-auto w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p className="mt-3 text-sm text-slate-400 dark:text-slate-500">
          {t(lang, "naHistoryEmpty")}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {records.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 flex items-center gap-4"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                {r.sellerName || "—"} → {r.buyerName || "—"}
              </p>
              {r.identifier && (
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                  {r.identifier}
                </p>
              )}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 shrink-0 hidden sm:block">
              {new Date(r.createdAt).toLocaleDateString(lang === "bg" ? "bg-BG" : "en-US")}
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => downloadRecord(r.id, r.fileName)}
                className="rounded-lg border border-teal-600 dark:border-teal-500 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
              >
                {t(lang, "naHistoryDownload")}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(r.id)}
                className="rounded-lg border border-red-300 dark:border-red-700 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
              >
                {t(lang, "historyDelete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteTarget && (
        <ConfirmModal
          lang={lang}
          message={t(lang, "historyDeleteConfirm")}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
