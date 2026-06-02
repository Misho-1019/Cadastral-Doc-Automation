import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { t } from "../i18n.js";

export default function SettingsPage({ lang }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {t(lang, "navSettings")}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {lang === "bg" ? "Управление на акаунта" : "Manage your account"}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            {lang === "bg" ? "Имейл" : "Email"}
          </p>
          <p className="text-sm font-mono text-slate-800">{user?.email || "—"}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            {lang === "bg" ? "ID на потребител" : "User ID"}
          </p>
          <p className="text-sm font-mono text-slate-500 break-words">{user?.id || "—"}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="w-full rounded-lg border border-red-300 bg-white px-5 py-3 text-base font-semibold text-red-600 hover:bg-red-50 transition-colors"
      >
        {lang === "bg" ? "Излез от акаунта" : "Sign Out"}
      </button>
    </div>
  );
}
