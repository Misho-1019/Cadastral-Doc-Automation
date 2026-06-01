import { useRef, useEffect, useCallback } from "react";
import { t } from "../i18n.js";

export default function DescriptionEditor({ lang, value, onChange }) {
  const textareaRef = useRef(null);
  const charCount = value.length.toLocaleString(lang === "bg" ? "bg-BG" : "en-US");

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.max(el.scrollHeight, 480) + "px";
  }, []);

  useEffect(() => {
    autoResize();
  }, [value, autoResize]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">
          {t(lang, "description")}
        </label>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="w-full min-h-[480px] rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-800 font-mono resize-y focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
      <div className="flex justify-end">
        <span className="text-xs text-slate-400">
          {charCount} {t(lang, "characters")}
        </span>
      </div>
    </div>
  );
}
