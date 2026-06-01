import { t } from "../i18n.js";

export default function Footer({ lang }) {
  return (
    <footer className="text-center py-6 text-xs text-slate-400">
      {t(lang, "footerText")}
    </footer>
  );
}
