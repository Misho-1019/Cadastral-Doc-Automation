import { t } from "../i18n.js";

export default function ReviewWarning({ lang }) {
  return (
    <div className="rounded-xl border border-amber-400 bg-amber-50 p-4 flex items-start gap-3">
      <span className="text-amber-500 text-lg shrink-0 mt-0.5">ⓘ</span>
      <p className="text-sm text-amber-800">
        {t(lang, "reviewWarning")}
      </p>
    </div>
  );
}
