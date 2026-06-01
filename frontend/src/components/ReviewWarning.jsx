import { t } from "../i18n.js";

export default function ReviewWarning({ lang }) {
  return (
    <div className="rounded-xl border border-amber-400 bg-amber-50 p-4 flex items-start gap-3">
      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <p className="text-sm text-amber-800">
        {t(lang, "reviewWarning")}
      </p>
    </div>
  );
}
