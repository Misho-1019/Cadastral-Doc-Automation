import { useState, useRef, useCallback } from "react";
import { t } from "../i18n.js";
import { FILE_SIZE_LIMIT } from "../constants.js";

export default function FileDropZone({ lang, file, onFileSelect, onFileRemove, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback((selectedFile) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      return;
    }
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
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, [handleFile]);

  const handleInputChange = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  }, [handleFile]);

  const exceedsSize = file && file.size > FILE_SIZE_LIMIT;

  return (
    <div className="space-y-3">
      {!file ? (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            isDragging
              ? "border-teal-400 bg-teal-50"
              : "border-slate-300 bg-white hover:border-teal-300 hover:bg-teal-50/50"
          }`}
        >
          <span className="text-3xl mb-2">📄</span>
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
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-lg shrink-0">📄</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-teal-800 truncate">
                {file.name}
              </p>
              <p className="text-xs text-teal-600">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onFileRemove}
            className="shrink-0 rounded-lg border border-teal-300 px-3 py-1 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
          >
            {t(lang, "remove")}
          </button>
        </div>
      )}

      {exceedsSize && (
        <p className="text-sm text-red-600">{t(lang, "fileTooLarge")}</p>
      )}

      {error && !exceedsSize && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
