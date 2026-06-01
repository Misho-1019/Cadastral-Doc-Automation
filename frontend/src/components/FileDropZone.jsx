import { useState, useRef, useCallback } from "react";
import { t } from "../i18n.js";
import { FILE_SIZE_LIMIT } from "../constants.js";

export default function FileDropZone({ lang, file, onFileSelect, onFileRemove, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback((selectedFile) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") return;
    if (selectedFile.size > FILE_SIZE_LIMIT) {
      onFileSelect(null);
      return;
    }
    onFileSelect(selectedFile);
  }, [onFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleInputChange = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  }, [handleFile]);

  if (file && file.size <= FILE_SIZE_LIMIT) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-lg shrink-0">📄</span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onFileRemove}
          className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-1"
          title={t(lang, "remove")}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging
            ? "border-teal-500 bg-teal-50"
            : "border-slate-200 bg-white hover:border-teal-500 hover:bg-teal-50/50"
        }`}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-700">
          {t(lang, "uploadLabel")}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {t(lang, "acceptedFormat")}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />
      </label>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
