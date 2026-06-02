import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { t } from "../i18n.js";

export default function TopHeader({ lang, onLanguageChange, onHelpClick, onToggleSidebar, sidebarOpen }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-[72px] shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
          aria-label="Toggle sidebar"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span className={`block h-[2.5px] rounded-full transition-all duration-300 origin-center ${
              sidebarOpen ? "rotate-45 translate-y-[7px]" : ""
            } ${sidebarOpen ? "bg-slate-600 dark:bg-slate-300" : "bg-slate-600 dark:bg-slate-300"}`} />
            <span className={`block h-[2.5px] rounded-full transition-all duration-300 ${
              sidebarOpen ? "opacity-0 scale-0" : "opacity-100"
            } bg-slate-600 dark:bg-slate-300`} />
            <span className={`block h-[2.5px] rounded-full transition-all duration-300 origin-center ${
              sidebarOpen ? "-rotate-45 -translate-y-[7px]" : ""
            } bg-slate-600 dark:bg-slate-300`} />
          </div>
        </button>

        <div
          className="w-8 h-8 rounded-lg border-2 border-teal-600 flex items-center justify-center text-teal-600 font-bold text-sm"
          aria-hidden="true"
        >
          C
        </div>
        <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {t(lang, "title")}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <LanguageSwitcher lang={lang} onToggle={onLanguageChange} />
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
          aria-label={lang === "bg" ? "Превключване на тема" : "Toggle theme"}
        >
          {theme === "dark" ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={onHelpClick}
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
          aria-label={t(lang, "help")}
        >
          <span>{t(lang, "help")}</span>
        </button>
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-5">
          <div
            className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold"
            aria-hidden="true"
          >
            LO
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {t(lang, "lawOffice")}
          </span>
          <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}
