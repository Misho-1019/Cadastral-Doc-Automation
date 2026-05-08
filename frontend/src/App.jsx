import { useState } from "react";

function App() {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please upload a PDF file');

            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append('file', file);
            formData.append('data', jsonData);

            const response = await fetch('http://localhost:3030/generate', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Request failed");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = "generated-contract.docx";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-slate-900">
                    Cadastral Document Generator
                </h1>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Upload PDF
                        </label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            JSON Data
                        </label>
                        <textarea
                            value={jsonData}
                            onChange={(e) => setJsonData(e.target.value)}
                            rows={10}
                            className="mt-1 w-full rounded-lg border p-2 font-mono text-sm"
                            placeholder='{"seller_name": "..."}'
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                    >
                        {loading ? "Generating..." : "Generate Document"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default App;