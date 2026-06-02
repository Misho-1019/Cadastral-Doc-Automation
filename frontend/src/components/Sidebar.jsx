import { useLocation } from "react-router-dom";
import { t } from "../i18n.js";

const navItems = [
  { key: "navGenerate", icon: generateIcon, route: "/" },
  { key: "navHistory", icon: historyIcon, route: "/history" },
  { key: "navSettings", icon: settingsIcon, route: "/settings" },
];

function generateIcon(active) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function historyIcon(active) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function settingsIcon(active) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function isActive(itemRoute, currentPath) {
  if (!itemRoute) return false;
  if (itemRoute === "/") return currentPath === "/";
  return currentPath.startsWith(itemRoute);
}

export default function Sidebar({ lang, open, onClose, onNavClick }) {
  const location = useLocation();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          bg-white border-r border-slate-200 flex flex-col
          transition-all duration-300 overflow-hidden min-w-0
          fixed md:relative inset-y-0 left-0 z-40
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${open ? "w-[260px]" : "w-0"}
        `}
      >
        <nav className="flex-1 px-3 pt-6 space-y-1 min-w-[260px]">
          {navItems.map((item) => {
            const active = isActive(item.route, location.pathname);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onNavClick?.(item.key);
                  if (window.innerWidth < 768) onClose?.();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none ${
                  active
                    ? "bg-teal-50 text-teal-700 border-l-[3px] border-teal-600 rounded-l-none cursor-default"
                    : "text-slate-500 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                {item.icon(active)}
                <span className="whitespace-nowrap">{t(lang, item.key)}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 pb-6 min-w-[260px]">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              {t(lang, "sidebarTagline")}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 whitespace-nowrap">
              {t(lang, "sidebarSubtitle")}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
