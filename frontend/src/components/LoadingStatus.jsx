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
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <div className="h-7 w-64 rounded-lg bg-slate-200 animate-pulse" />
        <div className="h-4 w-96 rounded bg-slate-200 animate-pulse" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-6">
          <div className="space-y-3">
            <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
            <div className="h-32 rounded-xl bg-slate-100 animate-pulse" />
            <div className="h-12 rounded-lg bg-slate-200 animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
            <div className="h-96 rounded-xl bg-slate-100 animate-pulse" />
            <div className="h-12 rounded-lg bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 animate-pulse">
        {t(lang, STATUS_MESSAGES[index])}
      </p>
    </div>
  );
}
