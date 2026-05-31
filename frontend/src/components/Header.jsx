import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { t } from "../i18n.js";

export default function Header({ lang, onLanguageChange }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-teal-700">
          {t(lang, "title")}
        </h1>
        <p className="mt-1 text-slate-500">
          {t(lang, "subtitle")}
        </p>
      </div>
      <LanguageSwitcher lang={lang} onToggle={onLanguageChange} />
    </div>
  );
}
