import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "../i18n.js";
import useHistory from "../hooks/useHistory.js";

const typeColors = {
  INDEPENDENT_OBJECT: "bg-purple-100 text-purple-700",
  LAND_PROPERTY: "bg-green-100 text-green-700",
  BUILDING: "bg-blue-100 text-blue-700",
  UNKNOWN: "bg-slate-100 text-slate-600",
};

const typeLabelKeys = {
  INDEPENDENT_OBJECT: "typeIndependentObject",
  LAND_PROPERTY: "typeLandProperty",
  BUILDING: "typeBuilding",
  UNKNOWN: "typeUnknown",
};

export default function HistoryList({ lang }) {
  const navigate = useNavigate();
  const { records, loading, fetchHistory, deleteRecord } = useHistory();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = async (id) => {
    if (!window.confirm(t(lang, "historyDeleteConfirm"))) return;
    try {
      await deleteRecord(id);
    } catch {
      // silently fail
    }
  };

  if (loading && records.length === 0) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!loading && records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-slate-200 bg-slate-50 gap-3">
        <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-slate-400">{t(lang, "historyEmpty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((r) => (
        <div
          key={r.id}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center gap-4"
        >
          <span className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold shrink-0 ${typeColors[r.documentType] || typeColors.UNKNOWN}`}>
            {t(lang, typeLabelKeys[r.documentType] || "typeUnknown")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-800 truncate">
              {r.identifier || "—"}
            </p>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {r.description?.slice(0, 80)}
              {(r.description?.length || 0) > 80 ? "…" : ""}
            </p>
          </div>
          <p className="text-xs text-slate-400 shrink-0 hidden sm:block">
            {new Date(r.createdAt).toLocaleString(lang === "bg" ? "bg-BG" : "en-US")}
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate(`/history/${r.id}`)}
              className="rounded-lg border border-teal-600 px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
            >
              {t(lang, "historyView")}
            </button>
            <button
              type="button"
              onClick={() => handleDelete(r.id)}
              className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
            >
              {t(lang, "historyDelete")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
