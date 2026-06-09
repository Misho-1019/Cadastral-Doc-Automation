import { useEffect, useRef, useCallback, useState } from "react";
import { t } from "../i18n.js";

const pages = {
  bg: [
    {
      title: "Генериране на описание",
      steps: [
        "Качете PDF — Изберете или влачете кадастрална скица (PDF файл, макс. 10MB)",
        "Генерирайте — Натиснете \"Генерирай описание\" за извличане на данни и създаване на юридическо описание чрез AI",
        "Прегледайте — Проверете генерираното описание, типа документ, идентификатора и валидацията",
        "Редактирайте — Направете корекции директно в текстовото поле",
        "Копирайте или изтеглете — Копирайте описанието в клипборда или изтеглете като .txt файл",
      ],
    },
    {
      title: "Нотариален акт",
      steps: [
        "Отворете страница \"Нотариален акт\" — Изберете я от страничното меню",
        "Качете PDF — Качете кадастрална скица и генерирайте юридическото описание чрез AI",
        "Попълнете данни — Въведете информация за нотариус, продавач, купувач, цена, банкова сметка, данъчна оценка и предишен нотариален акт",
        "Изтеглете .docx — Натиснете \"Генерирай нотариален акт\" и файлът се изтегля автоматично",
      ],
    },
  ],
  en: [
    {
      title: "Generate Description",
      steps: [
        "Upload PDF — Select or drag a cadastral sketch (PDF file, max 10MB)",
        "Generate — Click \"Generate Description\" to extract data and create a legal description via AI",
        "Review — Check the generated description, document type, identifier, and validation",
        "Edit — Make adjustments directly in the text area",
        "Copy or Download — Copy the description to clipboard or download as .txt file",
      ],
    },
    {
      title: "Notarial Act",
      steps: [
        "Open \"Notarial Act\" — Select it from the sidebar menu",
        "Upload PDF — Upload a cadastral sketch and generate the legal description via AI",
        "Fill in details — Enter notary, seller, buyer, price, bank account, tax assessment, and previous deed information",
        "Download .docx — Click \"Generate Notarial Act\" and the file downloads automatically",
      ],
    },
  ],
};

export default function HelpModal({ lang, onClose }) {
  const [page, setPage] = useState(0);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    return () => previousFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [lang]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowRight") {
      setPage((p) => Math.min(p + 1, pages[lang].length - 1));
      return;
    }
    if (e.key === "ArrowLeft") {
      setPage((p) => Math.max(p - 1, 0));
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
  }, [onClose, lang]);

  const p = pages[lang];
  const current = p[page];

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
        aria-label={current.title}
        className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl animate-[fadeInUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
          aria-label={t(lang, "dismiss")}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
          {lang === "bg" ? "Как се използва" : "How to use"} — {current.title}
        </h2>

        <ol className="space-y-3 min-h-[220px]">
          {current.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50 text-xs font-bold text-teal-700 dark:text-teal-400">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-default transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
            aria-label={lang === "bg" ? "Предишна страница" : "Previous page"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex gap-2">
            {p.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none ${
                  i === page
                    ? "bg-teal-600 dark:bg-teal-400"
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                }`}
                aria-label={`${lang === "bg" ? "Страница" : "Page"} ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(p + 1, pages[lang].length - 1))}
            disabled={page === p.length - 1}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-default transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
            aria-label={lang === "bg" ? "Следваща страница" : "Next page"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
