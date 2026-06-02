import { useEffect, useRef, useCallback } from "react";
import { t } from "../i18n.js";

export default function ConfirmModal({ lang, message, onConfirm, onCancel }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onCancel?.();
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-[fadeIn_0.15s_ease-out]"
      onClick={onCancel}
      onKeyDown={handleKeyDown}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-[fadeInUp_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-label={t(lang, "historyDeleteConfirm")}
      >
        <p className="text-sm text-slate-700 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
          >
            {t(lang, "dismiss")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
          >
            {t(lang, "historyDelete")}
          </button>
        </div>
      </div>
    </div>
  );
}
