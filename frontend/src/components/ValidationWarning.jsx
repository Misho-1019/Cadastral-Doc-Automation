import { t } from "../i18n.js";

export default function ValidationWarning({ lang, errors }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="rounded-xl border border-amber-400 bg-amber-50 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-amber-500 text-lg">⚠</span>
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
