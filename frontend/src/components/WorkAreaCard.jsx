import { t } from "../i18n.js";

export default function WorkAreaCard({ lang, leftContent, rightContent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-6">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {t(lang, "uploadTitle")}
          </h2>
          {leftContent}
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {t(lang, "resultsTitle")}
          </h2>
          {rightContent}
        </div>
      </div>
    </div>
  );
}
