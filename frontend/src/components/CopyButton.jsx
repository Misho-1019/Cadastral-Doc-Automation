import { useState, useCallback } from "react";
import { t } from "../i18n.js";

export default function CopyButton({ lang, text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`w-full rounded-lg border px-5 py-3 text-base font-semibold transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none ${
        copied
          ? "border-amber-400 bg-amber-50 text-amber-700"
          : "border-teal-600 text-teal-700 hover:bg-teal-50 active:bg-teal-100"
      }`}
    >
      {copied ? (
        <>
          <span>✓</span>
          {t(lang, "copied")}
        </>
      ) : (
        <>
          <span>📋</span>
          {t(lang, "copy")}
        </>
      )}
    </button>
  );
}
