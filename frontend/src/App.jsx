import { useRef, useState } from "react";

function App() {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        seller_name: "",
        seller_egn: "",
        seller_id_card: "",
        seller_id_issue_date: "",
        seller_address: "",
    
        buyer_name: "",
        buyer_egn: "",
        buyer_id_card: "",
        buyer_id_issue_date: "",
        buyer_address: "",
    
        contract_date: "",
        notary_name: "",
        preliminary_contract_date: "",
    
        sale_price: "",
        deposit_amount: "",
        remaining_amount: "",
    
        seller_bank_name: "",
        seller_bank_bic: "",
        seller_bank_iban: "",
    
        tax_evaluation: "",
    });
    const [step, setStep] = useState(0);
    const [screen, setScreen] = useState("home");
    const [loading, setLoading] = useState(false);
    const isSubmittingRef = useRef(false);

    const [fileInputKey, setFileInputKey] = useState(0);

    const steps = [
        "PDF Upload",
        "Seller",
        "Buyer",
        "Contract",
        "Payment",
        "Seller Bank",
        "Tax",
        "Generate",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;
        setLoading(true);

        if (!file) {
            alert('Please upload a PDF file');
            isSubmittingRef.current = false;
            setLoading(false);

            return;
        }

        setLoading(true);

        try {
            const requestData = new FormData();

            requestData.append('file', file);
            requestData.append('data', JSON.stringify(formData));  

            const response = await fetch('http://localhost:3030/generate', {
                method: 'POST',
                body: requestData,
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
            setScreen('success');
        } catch (err) {
            console.error(err);
            alert(err.message)
        } finally {
            isSubmittingRef.current = false;
            setLoading(false)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-4">
                        <label
                            htmlFor="pdf-upload"
                            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50"
                        >
                            <div className="rounded-full bg-white px-4 py-3 text-3xl shadow-sm">
                                📄
                            </div>
            
                            <p className="mt-4 text-base font-semibold text-slate-800">
                                Upload cadastral PDF
                            </p>
            
                            <p className="mt-1 text-sm text-slate-500">
                                Click here to choose a PDF file
                            </p>
            
                            <p className="mt-2 text-xs text-slate-400">
                                Accepted format: .pdf
                            </p>
            
                            <input
                                key={fileInputKey}
                                id="pdf-upload"
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="hidden"
                            />
                        </label>
            
                        {file && (
                            <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-green-800">
                                        File selected
                                    </p>
                                    <p className="text-sm text-green-700">
                                        {file.name}
                                    </p>
                                </div>
            
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFile(null);
                                        setFileInputKey(prev => prev + 1)
                                    }}
                                    className="rounded-lg border border-green-300 px-3 py-1 text-sm text-green-700 hover:bg-green-100"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                );
    
            case 1:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="seller_name" value={formData.seller_name} placeholder="Seller Name" onChange={handleChange} className="rounded border p-2" />
                        <input name="seller_egn" value={formData.seller_egn} placeholder="EGN" onChange={handleChange} className="rounded border p-2" />
                        <input name="seller_id_card" value={formData.seller_id_card} placeholder="ID Card" onChange={handleChange} className="rounded border p-2" />
                        <input name="seller_id_issue_date" value={formData.seller_id_issue_date} placeholder="ID Issue Date" onChange={handleChange} className="rounded border p-2" />
                        <input name="seller_address" value={formData.seller_address} placeholder="Address" onChange={handleChange} className="rounded border p-2 md:col-span-2" />
                    </div>
                );
    
            case 2:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="buyer_name" value={formData.buyer_name} placeholder="Buyer Name" onChange={handleChange} className="rounded border p-2" />
                        <input name="buyer_egn" value={formData.buyer_egn} placeholder="EGN" onChange={handleChange} className="rounded border p-2" />
                        <input name="buyer_id_card" value={formData.buyer_id_card} placeholder="ID Card" onChange={handleChange} className="rounded border p-2" />
                        <input name="buyer_id_issue_date" value={formData.buyer_id_issue_date} placeholder="ID Issue Date" onChange={handleChange} className="rounded border p-2" />
                        <input name="buyer_address" value={formData.buyer_address} placeholder="Address" onChange={handleChange} className="rounded border p-2 md:col-span-2" />
                    </div>
                );
    
            case 3:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="contract_date" value={formData.contract_date} onChange={handleChange} placeholder="Contract Date" className="rounded border p-2" />
                        <input name="notary_name" value={formData.notary_name} onChange={handleChange} placeholder="Notary Name" className="rounded border p-2" />
                        <input name="preliminary_contract_date" value={formData.preliminary_contract_date} onChange={handleChange} placeholder="Preliminary Contract Date" className="rounded border p-2" />
                    </div>
                );
    
            case 4:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="sale_price" value={formData.sale_price} onChange={handleChange} placeholder="Sale Price" className="rounded border p-2" />
                        <input name="deposit_amount" value={formData.deposit_amount} onChange={handleChange} placeholder="Deposit Amount" className="rounded border p-2" />
                        <input name="remaining_amount" value={formData.remaining_amount} onChange={handleChange} placeholder="Remaining Amount" className="rounded border p-2" />
                    </div>
                );
    
            case 5:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="seller_bank_name" value={formData.seller_bank_name} onChange={handleChange} placeholder="Bank Name" className="rounded border p-2" />
                        <input name="seller_bank_bic" value={formData.seller_bank_bic} onChange={handleChange} placeholder="BIC" className="rounded border p-2" />
                        <input name="seller_bank_iban" value={formData.seller_bank_iban} onChange={handleChange} placeholder="IBAN" className="rounded border p-2 md:col-span-2" />
                    </div>
                );
    
            case 6:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="tax_evaluation" value={formData.tax_evaluation} onChange={handleChange} placeholder="Tax Evaluation" className="rounded border p-2" />
                    </div>
                );
    
            case 7:
                return (
                    <div className="rounded-lg bg-slate-50 p-6 text-slate-700">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Ready to generate document
                        </h3>
            
                        <p className="mt-2">
                            Review that all fields are filled correctly, then click Generate Document.
                        </p>
            
                        <p className="mt-4 text-sm">
                            <strong>PDF:</strong> {file ? file.name : "No file selected"}
                        </p>
                    </div>
                );
    
            default:
                return null;
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 0:
                return !!file;
    
            case 1:
                return formData.seller_name && formData.seller_egn;
    
            case 2:
                return formData.buyer_name && formData.buyer_egn;
    
            case 3:
                return formData.contract_date && formData.notary_name;
    
            case 4:
                return formData.sale_price;
    
            case 5:
                return formData.seller_bank_name && formData.seller_bank_iban;
    
            case 6:
                return formData.tax_evaluation;
    
            default:
                return true;
        }
    };

    if (screen === "home") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <section className="max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Cadastral Document Generator
                    </h1>
    
                    <p className="mt-3 text-slate-600">
                        Generate a notarial contract from cadastral PDF data and structured form input.
                    </p>
    
                    <button
                        type="button"
                        onClick={() => setScreen("form")}
                        className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white"
                    >
                        Start New Document
                    </button>
                </section>
            </main>
        );
    }
    
    if (screen === "success") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <section className="max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Document Generated
                    </h1>
    
                    <p className="mt-3 text-slate-600">
                        Your DOCX file has been downloaded successfully.
                    </p>
    
                    <button
                        type="button"
                        onClick={() => {
                            setStep(0);
                            setScreen("form");
                        }}
                        className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white"
                    >
                        Generate Another Document
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-slate-900">
                    Cadastral Document Generator
                </h1>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="mb-4">
                        <p className="text-sm text-slate-500">
                            Step {step + 1} of {steps.length}
                        </p>
                        <h2 className="mt-1 text-xl font-semibold text-slate-900">
                            {steps[step]}
                        </h2>
                    </div>
                    
                    {renderStep()}

                    {!isStepValid() && (
                        <p className="text-sm text-red-500">
                            Please fill required fields before continuing.
                        </p>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            disabled={step === 0}
                            onClick={() => setStep((prev) => prev - 1)}
                            className="rounded-lg border px-4 py-2 disabled:opacity-50"
                        >
                            Back
                        </button>
                    
                        {step < steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={() => setStep((prev) => prev + 1)}
                                disabled={!isStepValid()}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                            >
                                {loading ? "Generating..." : "Generate Document"}
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}

export default App;