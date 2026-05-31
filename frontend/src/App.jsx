import { useState } from "react";
import Header from "./components/Header.jsx";
import FileDropZone from "./components/FileDropZone.jsx";
import GenerateButton from "./components/GenerateButton.jsx";
import LoadingStatus from "./components/LoadingStatus.jsx";
import { t } from "./i18n.js";

function App() {
  const [lang, setLang] = useState("bg");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [screen, setScreen] = useState("idle");

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

  const handleGenerate = () => {
    if (!file) return;
    setScreen("loading");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Header lang={lang} onLanguageChange={setLang} />

        {screen !== "loading" && (
          <div className="space-y-4">
            <FileDropZone
              lang={lang}
              file={file}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              error={fileError}
            />
            <GenerateButton
              lang={lang}
              disabled={!file}
              loading={false}
              onClick={handleGenerate}
            />
          </div>
        )}

        {screen === "loading" && <LoadingStatus lang={lang} />}
      </div>
    </main>
  );
}

export default App;
