import { t } from "../i18n.js";

const typeColors = {
  INDEPENDENT_OBJECT: "bg-blue-100 text-blue-800",
  LAND_PROPERTY: "bg-green-100 text-green-800",
  BUILDING: "bg-purple-100 text-purple-800",
  UNKNOWN: "bg-slate-100 text-slate-800",
};

export default function ResultMeta({ lang, data }) {
  const docType = data.documentType;
  const identifier = data.extractedData?.identifier;
  const totalTime = data.performance?.totalTime;
  const hasValidationErrors =
    data.validationErrors && data.validationErrors.length > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {t(lang, "documentType")}
        </span>
        <span
          className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
            typeColors[docType] || typeColors.UNKNOWN
          }`}
        >
          {docType}
        </span>
      </div>

      {identifier && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {t(lang, "identifier")}
          </span>
          <span className="text-sm font-mono text-slate-700">
            {identifier}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {t(lang, "validation")}
        </span>
        <span
          className={`text-sm font-medium ${
            hasValidationErrors ? "text-amber-600" : "text-green-600"
          }`}
        >
          {hasValidationErrors
            ? `${t(lang, "issuesFound")} (${data.validationErrors.length})`
            : t(lang, "noIssues")}
        </span>
      </div>

      {totalTime && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {t(lang, "time")}
          </span>
          <span className="text-sm text-slate-600">{totalTime}</span>
        </div>
      )}
    </div>
  );
}
