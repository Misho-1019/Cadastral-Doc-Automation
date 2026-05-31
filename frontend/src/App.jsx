import { useState } from "react";
import Header from "./components/Header.jsx";

function App() {
  const [lang, setLang] = useState("bg");

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Header lang={lang} onLanguageChange={setLang} />
      </div>
    </main>
  );
}

export default App;
