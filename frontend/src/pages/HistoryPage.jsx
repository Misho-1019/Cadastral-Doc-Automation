import { useState } from "react";
import HistoryList from "../components/HistoryList.jsx";
import NotarialActHistoryList from "../components/NotarialActHistoryList.jsx";
import { t } from "../i18n.js";

export default function HistoryPage({ lang }) {
  const [tab, setTab] = useState("descriptions"); // descriptions | notarial

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t(lang, "historyTitle")}
        </h1>
        <div className="mt-3 flex gap-1 border-b border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setTab("descriptions")}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none ${
              tab === "descriptions"
                ? "border-teal-600 text-teal-700 dark:text-teal-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {t(lang, "historyTabDescriptions")}
          </button>
          <button
            type="button"
            onClick={() => setTab("notarial")}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none ${
              tab === "notarial"
                ? "border-teal-600 text-teal-700 dark:text-teal-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {t(lang, "historyTabNotarialActs")}
          </button>
        </div>
      </div>

      {tab === "descriptions" && <HistoryList lang={lang} />}
      {tab === "notarial" && <NotarialActHistoryList lang={lang} />}
    </div>
  );
}
