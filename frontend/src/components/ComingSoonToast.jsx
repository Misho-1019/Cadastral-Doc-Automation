import { t } from "../i18n.js";

export default function ComingSoonToast({ lang }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-[fadeInUp_0.3s_ease-out]">
      <div className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 shadow-lg text-white text-sm font-medium">
        <span>⏳</span>
        {t(lang, "comingSoon")}
      </div>
    </div>
  );
}
