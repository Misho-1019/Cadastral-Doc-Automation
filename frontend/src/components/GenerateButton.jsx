import { t } from "../i18n.js";

export default function GenerateButton({ lang, disabled, loading, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full rounded-lg px-5 py-3 text-base font-semibold transition-colors flex items-center justify-center gap-2 ${
        disabled || loading
          ? "bg-teal-50 text-teal-300 cursor-not-allowed"
          : "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800"
      }`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {loading ? t(lang, "generating") : t(lang, "generate")}
    </button>
  );
}
