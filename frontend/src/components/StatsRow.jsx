import { t } from "../i18n.js";

const typeColors = {
  INDEPENDENT_OBJECT: "bg-blue-100 text-blue-800",
  LAND_PROPERTY: "bg-green-100 text-green-800",
  BUILDING: "bg-purple-100 text-purple-800",
  UNKNOWN: "bg-slate-100 text-slate-800",
};

const typeLabels = {
  INDEPENDENT_OBJECT: "Самостоятелен обект",
  LAND_PROPERTY: "Поземлен имот",
  BUILDING: "Сграда",
  UNKNOWN: "Неизвестен",
};

export default function StatsRow({ lang, data }) {
  const docType = data.documentType;
  const identifier = data.extractedData?.identifier;
  const totalTime = data.performance?.totalTime;
  const hasErrors = data.validationErrors?.length > 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          {t(lang, "documentType")}
        </p>
        <span className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold ${typeColors[docType] || typeColors.UNKNOWN}`}>
          {typeLabels[docType] || docType}
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          {t(lang, "identifier")}
        </p>
        <p className="text-sm font-mono text-slate-700 break-words whitespace-normal">
          {identifier || "—"}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          {t(lang, "validation")}
        </p>
        <div className="flex items-center gap-1.5">
          {hasErrors ? (
            <>
              <span className="text-amber-500 text-sm">⚠</span>
              <span className="text-sm font-medium text-amber-600">
                {t(lang, "issuesFound")} ({data.validationErrors.length})
              </span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-sm font-medium text-green-600">
                {t(lang, "noIssues")}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          {t(lang, "time")}
        </p>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold text-slate-700">
            {totalTime || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
