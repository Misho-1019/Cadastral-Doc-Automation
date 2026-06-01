import { useState, useEffect } from "react";
import TopHeader from "./components/TopHeader.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import FileDropZone from "./components/FileDropZone.jsx";
import GenerateButton from "./components/GenerateButton.jsx";
import LoadingStatus from "./components/LoadingStatus.jsx";
import WorkAreaCard from "./components/WorkAreaCard.jsx";
import StatsRow from "./components/StatsRow.jsx";
import ValidationWarning from "./components/ValidationWarning.jsx";
import DescriptionEditor from "./components/DescriptionEditor.jsx";
import CopyButton from "./components/CopyButton.jsx";
import PerformanceCard from "./components/PerformanceCard.jsx";
import ReviewWarning from "./components/ReviewWarning.jsx";
import HelpModal from "./components/HelpModal.jsx";
import ComingSoonToast from "./components/ComingSoonToast.jsx";
import useGenerateDescription from "./hooks/useGenerateDescription.js";
import { t } from "./i18n.js";

function getInitialLang() {
  try {
    return localStorage.getItem("cadastral-lang") || "bg";
  } catch {
    return "bg";
  }
}

function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [screen, setScreen] = useState("idle");
  const [editedDescription, setEditedDescription] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [comingSoon, setComingSoon] = useState(null);
  const { loading, data, error, generate, reset } = useGenerateDescription(lang);

  useEffect(() => {
    try {
      localStorage.setItem("cadastral-lang", lang);
    } catch {
      // localStorage not available
    }
  }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) setSidebarOpen(false);
    const handler = (e) => setSidebarOpen(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!comingSoon) return;
    const t = setTimeout(() => setComingSoon(null), 2500);
    return () => clearTimeout(t);
  }, [comingSoon]);

  useEffect(() => {
    if (data?.description) {
      setEditedDescription(data.description);
    }
  }, [data]);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) {
      setFileError(t(lang, "fileTooLarge"));
      return;
    }
    setFile(selectedFile);
    setFileError(null);
    setScreen("idle");
  };

  const handleFileRemove = () => {
    setFile(null);
    setFileError(null);
    setScreen("idle");
  };

  const handleGenerate = async () => {
    if (!file) return;
    setScreen("loading");
    try {
      await generate(file);
      setScreen("result");
    } catch {
      setScreen("idle");
    }
  };

  const handleReset = () => {
    reset();
    handleFileRemove();
    setEditedDescription("");
  };

  const handleDownload = () => {
    const blob = new Blob([editedDescription], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "legal-description.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const emptyResults = (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] rounded-xl border border-dashed border-slate-200 bg-slate-50 gap-3">
      <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
      <p className="text-sm text-slate-400 px-4 text-center">
        {t(lang, "resultsPlaceholder")}
      </p>
    </div>
  );

  const uploadContent = (
    <>
      <FileDropZone
        lang={lang}
        file={file}
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        error={fileError || error}
      />
      <GenerateButton
        lang={lang}
        disabled={!file}
        loading={loading}
        onClick={handleGenerate}
      />
    </>
  );

  const uploadContentResult = (
    <FileDropZone
      lang={lang}
      file={file}
      readOnly={true}
      onFileSelect={handleFileSelect}
      onFileRemove={handleFileRemove}
      error={fileError || error}
    />
  );

  const resultsContent = data ? (
    <>
      <StatsRow lang={lang} data={data} />
      <ValidationWarning lang={lang} errors={data.validationErrors} />
      <DescriptionEditor
        lang={lang}
        value={editedDescription}
        onChange={setEditedDescription}
      />
      <div className="flex gap-3">
        <CopyButton lang={lang} text={editedDescription} />
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {t(lang, "download")}
        </button>
      </div>
    </>
  ) : emptyResults;

  return (
    <>

    <div className="h-screen flex flex-col bg-slate-50">
      <TopHeader lang={lang} onLanguageChange={handleLanguageChange} onHelpClick={() => setShowHelp(true)} onToggleSidebar={() => setSidebarOpen(v => !v)} sidebarOpen={sidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar lang={lang} open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavClick={(key) => setComingSoon(key)} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1100px] px-6 py-8">

            {screen === "loading" && <LoadingStatus lang={lang} />}

            {screen !== "loading" && !data && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {t(lang, "navGenerate")}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    {t(lang, "subtitle")}
                  </p>
                </div>

                <WorkAreaCard
                  lang={lang}
                  leftContent={uploadContent}
                  rightContent={emptyResults}
                />
              </div>
            )}

            {screen === "result" && data && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {t(lang, "navGenerate")}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    {t(lang, "subtitle")}
                  </p>
                </div>

                <WorkAreaCard
                  lang={lang}
                  leftContent={uploadContentResult}
                  rightContent={resultsContent}
                />

                <PerformanceCard lang={lang} performance={data.performance} />
                <ReviewWarning lang={lang} />

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full rounded-lg border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                >
                  {t(lang, "generateAnother")}
                </button>
              </div>
            )}

            <Footer lang={lang} />

          </div>
        </main>
      </div>
    </div>

    {showHelp && <HelpModal lang={lang} onClose={() => setShowHelp(false)} />}
    {comingSoon && <ComingSoonToast lang={lang} />}
    </>
  );
}

export default App;
