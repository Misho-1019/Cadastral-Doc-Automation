import { useState } from "react";
import Header from "./components/Header.jsx";
import FileDropZone from "./components/FileDropZone.jsx";
import GenerateButton from "./components/GenerateButton.jsx";
import LoadingStatus from "./components/LoadingStatus.jsx";
import useGenerateDescription from "./hooks/useGenerateDescription.js";
import { t } from "./i18n.js";

function App() {
  const [lang, setLang] = useState("bg");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [screen, setScreen] = useState("idle");
  const { loading, data, error, generate, reset } = useGenerateDescription();

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

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Header lang={lang} onLanguageChange={setLang} />

        {screen === "loading" && <LoadingStatus lang={lang} />}

        {screen !== "loading" && !data && (
          <div className="space-y-4">
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
        )}

        {screen === "result" && data && (
          <div className="space-y-6">
            <pre className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 overflow-auto max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
            <GenerateButton
              lang={lang}
              disabled={false}
              loading={false}
              onClick={() => {
                reset();
                handleFileRemove();
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
