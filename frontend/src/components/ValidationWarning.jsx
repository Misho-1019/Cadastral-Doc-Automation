import { t } from "../i18n.js";

export default function ValidationWarning({ lang, errors }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="rounded-xl border border-amber-400 bg-amber-50 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z" />
        </svg>
        <span className="text-sm font-semibold text-amber-800">
          {t(lang, "issuesFound")}
        </span>
      </div>
      <ul className="ml-6 list-disc space-y-1">
        {errors.map((err, i) => (
          <li key={i} className="text-sm text-amber-700">
            {err}
          </li>
        ))}
      </ul>
    </div>
  );
}
