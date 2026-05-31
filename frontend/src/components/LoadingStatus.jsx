import { useState, useEffect } from "react";
import { t } from "../i18n.js";
import { STATUS_MESSAGES } from "../constants.js";

export default function LoadingStatus({ lang }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <svg
        className="animate-spin h-8 w-8 text-teal-600"
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
      <p className="text-sm text-slate-600 animate-pulse">
        {t(lang, STATUS_MESSAGES[index])}
      </p>
    </div>
  );
}
