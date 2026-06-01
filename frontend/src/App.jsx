import { useState, useEffect } from "react";
import TopHeader from "./components/TopHeader.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import FileDropZone from "./components/FileDropZone.jsx";
import GenerateButton from "./components/GenerateButton.jsx";
import LoadingStatus from "./components/LoadingStatus.jsx";
import StatsRow from "./components/StatsRow.jsx";
import ValidationWarning from "./components/ValidationWarning.jsx";
import DescriptionEditor from "./components/DescriptionEditor.jsx";
import CopyButton from "./components/CopyButton.jsx";
import PerformanceCard from "./components/PerformanceCard.jsx";
import ReviewWarning from "./components/ReviewWarning.jsx";
import useGenerateDescription from "./hooks/useGenerateDescription.js";
import { t } from "./i18n.js";

function App() {
  const [lang, setLang] = useState("bg");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [screen, setScreen] = useState("idle");
  const [editedDescription, setEditedDescription] = useState("");
  const { loading, data, error, generate, reset } = useGenerateDescription();

  useEffect(() => {
    if (data?.description) {
      setEditedDescription(data.description);
    }
  }, [data]);

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

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <TopHeader lang={lang} onLanguageChange={setLang} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar lang={lang} />

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

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        {t(lang, "uploadTitle")}
                      </h2>
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
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        {t(lang, "resultsTitle")}
                      </h2>
                      <div className="flex items-center justify-center h-full min-h-[200px] rounded-xl border border-dashed border-slate-200 bg-slate-50">
                        <p className="text-sm text-slate-400 px-4 text-center">
                          {t(lang, "resultsPlaceholder")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        {t(lang, "uploadTitle")}
                      </h2>
                      <FileDropZone
                        lang={lang}
                        file={file}
                        onFileSelect={handleFileSelect}
                        onFileRemove={handleFileRemove}
                        error={fileError || error}
                      />
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        {t(lang, "resultsTitle")}
                      </h2>
                      <StatsRow lang={lang} data={data} />
                      <ValidationWarning lang={lang} errors={data.validationErrors} />
                      <DescriptionEditor
                        lang={lang}
                        value={editedDescription}
                        onChange={setEditedDescription}
                      />
                      <CopyButton lang={lang} text={editedDescription} />
                    </div>
                  </div>
                </div>

                <PerformanceCard lang={lang} performance={data.performance} />
                <ReviewWarning lang={lang} />

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full rounded-lg border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                >
                  {t(lang, "generateAnother")}
                </button>
              </div>
            )}

            <Footer />

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
