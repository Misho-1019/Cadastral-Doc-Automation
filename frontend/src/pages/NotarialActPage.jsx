import { useState, useRef } from "react";
import FileDropZone from "../components/FileDropZone.jsx";
import GenerateButton from "../components/GenerateButton.jsx";
import LoadingStatus from "../components/LoadingStatus.jsx";
import NotarialActForm from "../components/NotarialActForm.jsx";
import useGenerateDescription from "../hooks/useGenerateDescription.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { t } from "../i18n.js";

export default function NotarialActPage({ lang }) {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [step, setStep] = useState("upload"); // upload | loading | form
  const [extractedData, setExtractedData] = useState(null);
  const [docxLoading, setDocxLoading] = useState(false);
  const { loading, data, error, generate, reset } = useGenerateDescription(lang);
  const { session } = useAuth();

  function handleFileSelect(selectedFile) {
    if (!selectedFile) {
      setFileError(t(lang, "fileTooLarge"));
      return;
    }
    setFile(selectedFile);
    setFileError(null);
  }

  function handleFileRemove() {
    setFile(null);
    setFileError(null);
    setStep("upload");
    reset();
  }

  async function handleExtract() {
    if (!file) return;
    setStep("loading");
    try {
      const result = await generate(file);
      setExtractedData(result.extractedData);
      setStep("form");
    } catch {
      setStep("upload");
    }
  }

  async function handleGenerateDocx(formData) {
    setDocxLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      const body = JSON.stringify({
        formData,
        aiDescription: data.description,
        documentNumber: extractedData?.documentNumber || "",
        issueDate: extractedData?.issueDate || "",
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/descriptions/generate-notarial-act`,
        { method: "POST", headers, body }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Failed to generate document");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "notarial-act.docx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setFileError(err.message);
    } finally {
      setDocxLoading(false);
    }
  }

  function handleReset() {
    handleFileRemove();
    setExtractedData(null);
    setStep("upload");
  }

  if (step === "loading") {
    return <LoadingStatus lang={lang} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t(lang, "naTitle")}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t(lang, "naSubtitle")}
        </p>
      </div>

      {step === "upload" && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              {t(lang, "naStep1Upload")}
            </h2>
            <FileDropZone
              lang={lang}
              file={file}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              error={fileError || error}
            />
          </div>
          <GenerateButton
            lang={lang}
            disabled={!file}
            loading={loading}
            onClick={handleExtract}
          />
        </div>
      )}

      {step === "form" && data && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t(lang, "naStep2Form")}
            </h2>
            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
              {t(lang, data.documentType || "unknown")}
            </span>
          </div>
          <NotarialActForm
            lang={lang}
            onSubmit={handleGenerateDocx}
            loading={docxLoading}
          />
        </div>
      )}

      {step === "form" && (
        <button
          type="button"
          onClick={handleReset}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-5 py-3 text-base font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
        >
          {t(lang, "naGenerateAnother")}
        </button>
      )}
    </div>
  );
}
