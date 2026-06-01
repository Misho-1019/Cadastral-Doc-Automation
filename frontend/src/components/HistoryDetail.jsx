import { useEffect, useCallback } from "react";
import { t } from "../i18n.js";
import useHistory from "../hooks/useHistory.js";
import CopyButton from "./CopyButton.jsx";
import ValidationWarning from "./ValidationWarning.jsx";

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

export default function HistoryDetail({ lang, id, onBack }) {
  const { record, loading, fetchRecord, deleteRecord } = useHistory();

  useEffect(() => {
    if (id) fetchRecord(id);
  }, [id, fetchRecord]);

  const handleDelete = async () => {
    if (!window.confirm(t(lang, "historyDeleteConfirm"))) return;
    try {
      await deleteRecord(id);
      onBack();
    } catch {
      // silently fail
    }
  };

  const handleDownload = useCallback(() => {
    if (!record?.description) return;
    const blob = new Blob([record.description], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "legal-description.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [record]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-7 w-48 rounded-lg bg-slate-200 animate-pulse" />
        <div className="h-96 rounded-xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (!record) {
    return (
      <p className="text-sm text-slate-500">{t(lang, "historyEmpty")}</p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
          >
            ← {t(lang, "historyBack")}
          </button>
          <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${typeColors[record.documentType] || typeColors.UNKNOWN}`}>
            {t(lang, typeLabelKeys[record.documentType] || "typeUnknown")}
          </span>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
        >
          {t(lang, "historyDelete")}
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs text-slate-400 mb-1">{t(lang, "identifier")}</p>
        <p className="text-sm font-mono text-slate-800 break-words">
          {record.identifier || "—"}
        </p>
      </div>

      {record.fileName && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-400 mb-1">PDF</p>
          <p className="text-sm text-slate-700">{record.fileName}</p>
        </div>
      )}

      {record.createdAt && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-400 mb-1">{t(lang, "historyDate")}</p>
          <p className="text-sm text-slate-700">
            {new Date(record.createdAt).toLocaleString(lang === "bg" ? "bg-BG" : "en-US")}
          </p>
        </div>
      )}

      <ValidationWarning lang={lang} errors={record.validationErrors} />

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          {t(lang, "description")}
        </label>
        <textarea
          readOnly
          value={record.description}
          className="w-full min-h-[400px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 font-mono resize-none focus:outline-none"
        />
      </div>

      <div className="flex gap-3">
        <CopyButton lang={lang} text={record.description} />
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {t(lang, "download")}
        </button>
      </div>
    </div>
  );
}
