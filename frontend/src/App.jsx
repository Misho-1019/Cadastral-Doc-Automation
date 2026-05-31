import { useState } from "react";
import Header from "./components/Header.jsx";
import FileDropZone from "./components/FileDropZone.jsx";
import { FILE_SIZE_LIMIT } from "./constants.js";
import { t } from "./i18n.js";

function App() {
  const [lang, setLang] = useState("bg");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) {
      setFileError(t(lang, "fileTooLarge"));
      return;
    }
    setFile(selectedFile);
    setFileError(null);
  };

  const handleFileRemove = () => {
    setFile(null);
    setFileError(null);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Header lang={lang} onLanguageChange={setLang} />
        <FileDropZone
          lang={lang}
          file={file}
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          error={fileError}
        />
      </div>
    </main>
  );
}

export default App;
