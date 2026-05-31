export default function LanguageSwitcher({ lang, onToggle }) {
  const languages = [
    { code: "bg", label: "BG" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="flex rounded-lg border border-slate-200 overflow-hidden">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => onToggle(code)}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            lang === code
              ? "bg-teal-600 text-white"
              : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
