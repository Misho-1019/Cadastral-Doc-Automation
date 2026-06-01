import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { t } from "../i18n.js";

export default function TopHeader({ lang, onLanguageChange, onHelpClick }) {
  return (
    <header className="h-[72px] shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg border-2 border-teal-600 flex items-center justify-center text-teal-600 font-bold text-sm"
          aria-hidden="true"
        >
          C
        </div>
        <span className="text-lg font-semibold text-slate-800">
          {t(lang, "title")}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <LanguageSwitcher lang={lang} onToggle={onLanguageChange} />
        <button
          type="button"
          onClick={onHelpClick}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          aria-label={t(lang, "help")}
        >
          <span>{t(lang, "help")}</span>
        </button>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-5">
          <div
            className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold"
            aria-hidden="true"
          >
            LO
          </div>
          <span className="text-sm font-medium text-slate-700">
            {t(lang, "lawOffice")}
          </span>
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}
