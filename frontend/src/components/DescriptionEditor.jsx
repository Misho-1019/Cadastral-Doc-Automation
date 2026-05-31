import { t } from "../i18n.js";

export default function DescriptionEditor({ lang, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {t(lang, "description")}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={14}
        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-800 font-mono resize-y focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
    </div>
  );
}
