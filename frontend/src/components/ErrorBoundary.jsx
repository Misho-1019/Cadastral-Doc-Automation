import { Component } from "react";
import { t } from "../i18n.js";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, lang: "bg" };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    try {
      this.setState({ lang: localStorage.getItem("cadastral-lang") || "bg" });
    } catch {}
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm max-w-md text-center space-y-4">
            <h2 className="text-lg font-bold text-slate-800">
              {t(this.state.lang, "errorFallback")}
            </h2>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
            >
              {t(this.state.lang, "errorTryAgain")}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
