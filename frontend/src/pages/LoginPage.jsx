import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { t } from "../i18n.js";

export default function LoginPage({ lang }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          {lang === "bg" ? "Вход" : "Sign In"}
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          {lang === "bg" ? "Влезте в акаунта си" : "Sign in to your account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {lang === "bg" ? "Имейл" : "Email"}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {lang === "bg" ? "Парола" : "Password"}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50 transition-colors"
          >
            {loading
              ? (lang === "bg" ? "Влизане..." : "Signing in...")
              : (lang === "bg" ? "Вход" : "Sign In")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {lang === "bg" ? "Нямате акаунт?" : "Don't have an account?"}{" "}
          <Link to="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
            {lang === "bg" ? "Регистрирайте се" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
