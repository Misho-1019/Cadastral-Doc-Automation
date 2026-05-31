import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import FileDropZone from "./components/FileDropZone.jsx";
import GenerateButton from "./components/GenerateButton.jsx";
import LoadingStatus from "./components/LoadingStatus.jsx";
import ResultMeta from "./components/ResultMeta.jsx";
import ValidationWarning from "./components/ValidationWarning.jsx";
import DescriptionEditor from "./components/DescriptionEditor.jsx";
import CopyButton from "./components/CopyButton.jsx";
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
            <ResultMeta lang={lang} data={data} />
            <ValidationWarning lang={lang} errors={data.validationErrors} />
            <DescriptionEditor
              lang={lang}
              value={editedDescription}
              onChange={setEditedDescription}
            />
            <CopyButton lang={lang} text={editedDescription} />
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-lg border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              {t(lang, "generateAnother")}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
