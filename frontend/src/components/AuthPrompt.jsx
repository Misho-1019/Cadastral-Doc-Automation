import { Link } from "react-router-dom";
import { t } from "../i18n.js";

export default function AuthPrompt({ lang, returnTo }) {
  const to = returnTo ? `/login?redirect=${encodeURIComponent(returnTo)}` : "/login";

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-800">
          {lang === "bg" ? "Изисква се вход" : "Sign in required"}
        </h2>
        <p className="text-sm text-slate-500">
          {lang === "bg"
            ? "Моля, влезте в акаунта си или се регистрирайте, за да използвате тази страница."
            : "Please sign in or create an account to access this page."}
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Link
            to={to}
            className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            {lang === "bg" ? "Вход" : "Sign In"}
          </Link>
          <Link
            to="/signup"
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {lang === "bg" ? "Регистрация" : "Sign Up"}
          </Link>
        </div>
      </div>
    </div>
  );
}
