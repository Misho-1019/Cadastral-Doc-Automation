import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { t } from "../i18n.js";

export default function SettingsPage({ lang }) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t(lang, "navSettings")}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {lang === "bg" ? "Управление на акаунта" : "Manage your account"}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm space-y-4">
        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            {lang === "bg" ? "Имейл" : "Email"}
          </p>
          <p className="text-sm font-mono text-slate-800 dark:text-slate-200">{user?.email || "—"}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            {lang === "bg" ? "ID на потребител" : "User ID"}
          </p>
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400 break-words">{user?.id || "—"}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {lang === "bg" ? "Тъмна тема" : "Dark Theme"}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {lang === "bg" ? "Превключване между светла и тъмна тема" : "Toggle between light and dark theme"}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={theme === "dark"}
            onClick={toggleTheme}
            className={`relative w-12 h-7 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none ${
              theme === "dark" ? "bg-teal-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                theme === "dark" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="w-full rounded-lg border border-red-300 dark:border-red-700 bg-white dark:bg-slate-800 px-5 py-3 text-base font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
      >
        {lang === "bg" ? "Излез от акаунта" : "Sign Out"}
      </button>
    </div>
  );
}
