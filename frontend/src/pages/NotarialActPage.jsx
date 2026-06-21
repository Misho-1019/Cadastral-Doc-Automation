import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileDropZone from "../components/FileDropZone.jsx";
import GenerateButton from "../components/GenerateButton.jsx";
import LoadingStatus from "../components/LoadingStatus.jsx";
import NotarialActForm from "../components/NotarialActForm.jsx";
import useGenerateDescription from "../hooks/useGenerateDescription.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { t } from "../i18n.js";

function collectValuesToBold(extractedData) {
  if (!extractedData) return [];
  const values = new Set();

  const add = (v) => {
    if (v && typeof v === "string" && v.trim() && v.trim().toLowerCase() !== "няма") {
      values.add(v.trim());
    }
  };

  for (const [key, value] of Object.entries(extractedData)) {
    if (key === "documentType") continue;
    if (key === "additionalInfo") continue;
    if (typeof value === "string") {
      add(value);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string") {
          add(item);
        } else if (item && typeof item === "object") {
          for (const v of Object.values(item)) {
            if (typeof v === "string") add(v);
          }
        }
      }
    }
  }

  return [...values].sort((a, b) => b.length - a.length);
}

export default function NotarialActPage({ lang }) {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [step, setStep] = useState("upload"); // upload | loading | form | success
  const [extractedData, setExtractedData] = useState(null);
  const [docxLoading, setDocxLoading] = useState(false);
  const { loading, data, error, generate, reset } = useGenerateDescription(lang);
  const { session } = useAuth();
  const navigate = useNavigate();

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
        identifier: extractedData?.identifier || "",
        extractedDataValues: collectValuesToBold(extractedData),
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
      setStep("success");
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

      {step === "success" && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-10 shadow-sm text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {t(lang, "naSuccess")}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {t(lang, "naSuccessSubtitle")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg bg-teal-600 dark:bg-teal-500 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-700 dark:hover:bg-teal-600 active:bg-teal-800 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 outline-none"
            >
              {t(lang, "naGenerateAnother")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
            >
              {t(lang, "naBackToHome")}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
