import { useEffect, useRef, useCallback } from "react";
import { t } from "../i18n.js";

export default function HelpModal({ lang, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    return () => previousFocusRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "Tab") {
      const modal = modalRef.current;
      if (!modal) return;
      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }, [onClose]);

  const steps = lang === "bg" ? [
    "Качете PDF — Изберете или влачете кадастрална скица (PDF файл, макс. 10MB)",
    "Генерирайте — Натиснете \"Генерирай описание\" за извличане на данни и създаване на юридическо описание чрез AI",
    "Прегледайте — Проверете генерираното описание, типа документ, идентификатора и валидацията",
    "Редактирайте — Направете корекции директно в текстовото поле",
    "Копирайте или изтеглете — Копирайте описанието в клипборда или изтеглете като .txt файл",
    "Поставете — Поставете описанието в договор или нотариален акт (.docx)",
  ] : [
    "Upload PDF — Select or drag a cadastral sketch (PDF file, max 10MB)",
    "Generate — Click \"Generate Description\" to extract data and create a legal description via AI",
    "Review — Check the generated description, document type, identifier, and validation",
    "Edit — Make adjustments directly in the text area",
    "Copy or Download — Copy the description to clipboard or download as .txt file",
    "Paste — Paste the description into a contract or notarial deed (.docx)",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={lang === "bg" ? "Помощ" : "Help"}
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-[fadeInUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors rounded focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
          aria-label={t(lang, "dismiss")}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {lang === "bg" ? "Как се използва" : "How to use"}
        </h2>

        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
