import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function SignupPage({ lang }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError(lang === "bg" ? "Паролите не съвпадат" : "Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">
            {lang === "bg" ? "Проверете имейла си" : "Check your email"}
          </h1>
          <p className="text-sm text-slate-600">
            {lang === "bg"
              ? "Изпратихме ви линк за потвърждение на имейла. Моля, отворете го, за да активирате акаунта си."
              : "We sent you a confirmation link. Please open it to activate your account."}
          </p>
          <Link
            to="/login"
            className="inline-block rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            {lang === "bg" ? "Към входа" : "Go to Sign In"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          {lang === "bg" ? "Регистрация" : "Sign Up"}
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          {lang === "bg" ? "Създайте нов акаунт" : "Create a new account"}
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {lang === "bg" ? "Потвърдете паролата" : "Confirm Password"}
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
              ? (lang === "bg" ? "Регистриране..." : "Signing up...")
              : (lang === "bg" ? "Регистрация" : "Sign Up")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {lang === "bg" ? "Вече имате акаунт?" : "Already have an account?"}{" "}
          <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium">
            {lang === "bg" ? "Влезте" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
