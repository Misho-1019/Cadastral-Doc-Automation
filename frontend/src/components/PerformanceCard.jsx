import { t } from "../i18n.js";

function formatMs(ms) {
  return `${ms.toLocaleString()} ms`;
}

export default function PerformanceCard({ lang, performance }) {
  if (!performance) return null;

  const items = [
    {
      label: t(lang, "extractionTime"),
      duration: performance.extractionTime,
      ms: performance.extractionTimeMs,
    },
    {
      label: t(lang, "generationTime"),
      duration: performance.descriptionTime,
      ms: performance.descriptionTimeMs,
    },
    {
      label: t(lang, "totalTime"),
      duration: performance.totalTime,
      ms: performance.totalTimeMs,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
        <span className="text-sm font-semibold text-slate-700">
          {t(lang, "performance")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs text-slate-400 mb-1">{item.label}</p>
            <p className="text-base font-semibold text-teal-700">
              {item.duration || "—"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {item.ms != null ? formatMs(item.ms) : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
