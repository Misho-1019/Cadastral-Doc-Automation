import { useRef, useState } from "react";
import { translations } from "./i18n";

function App() {
    const initialFormData = {
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
    };

    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [step, setStep] = useState(0);
    const [screen, setScreen] = useState("home");
    const [loading, setLoading] = useState(false);
    const isSubmittingRef = useRef(false);

    const [fileInputKey, setFileInputKey] = useState(0);
    const [language, setLanguage] = useState("bg");
    
    const t = translations[language];

    const steps = [
        t.steps.pdfUpload,
        t.steps.seller,
        t.steps.buyer,
        t.steps.contract,
        t.steps.payment,
        t.steps.sellerBank,
        t.steps.tax,
        t.steps.generate,
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
            alert(t.alertUploadPdf);
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
                throw new Error(err.error || t.requestFailed);
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

    const handleResetFlow = () => {
        setFile(null);
        setFormData(initialFormData);
        setStep(0);
        setScreen("form");
        setLoading(false);
        setFileInputKey(prev => prev + 1);
        isSubmittingRef.current = false;
    };

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
                                {t.uploadPdf}
                            </p>
            
                            <p className="mt-1 text-sm text-slate-500">
                                {t.choosePdf}
                            </p>
            
                            <p className="mt-2 text-xs text-slate-400">
                                {t.acceptedFormat}
                            </p>
            
                            <input
                                key={fileInputKey}
                                id="pdf-upload"
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                        </label>
            
                        {file && (
                            <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-green-800">
                                        {t.fileSelected}
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
                                    {t.remove}
                                </button>
                            </div>
                        )}
                    </div>
                );
    
            case 1:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="seller_name" value={formData.seller_name} placeholder={t.sellerName} onChange={handleChange} className="rounded border p-2" />
                        <input name="seller_egn" value={formData.seller_egn} placeholder={t.sellerEgn} onChange={handleChange} className="rounded border p-2" />
                        <input name="seller_id_card" value={formData.seller_id_card} placeholder={t.sellerIdCard} onChange={handleChange} className="rounded border p-2" />
                        <input name="seller_id_issue_date" value={formData.seller_id_issue_date} placeholder={t.sellerIdIssueDate} onChange={handleChange} className="rounded border p-2" />
                        <input name="seller_address" value={formData.seller_address} placeholder={t.sellerAddress} onChange={handleChange} className="rounded border p-2 md:col-span-2" />
                    </div>
                );
    
            case 2:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="buyer_name" value={formData.buyer_name} placeholder={t.buyerName} onChange={handleChange} className="rounded border p-2" />
                        <input name="buyer_egn" value={formData.buyer_egn} placeholder={t.buyerEgn} onChange={handleChange} className="rounded border p-2" />
                        <input name="buyer_id_card" value={formData.buyer_id_card} placeholder={t.buyerIdCard} onChange={handleChange} className="rounded border p-2" />
                        <input name="buyer_id_issue_date" value={formData.buyer_id_issue_date} placeholder={t.buyerIdIssueDate} onChange={handleChange} className="rounded border p-2" />
                        <input name="buyer_address" value={formData.buyer_address} placeholder={t.buyerAddress} onChange={handleChange} className="rounded border p-2 md:col-span-2" />
                    </div>
                );
    
            case 3:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="contract_date" value={formData.contract_date} placeholder={t.contractDate} onChange={handleChange} className="rounded border p-2" />
                        <input name="notary_name" value={formData.notary_name} placeholder={t.notaryName} onChange={handleChange} className="rounded border p-2" />
                        <input name="preliminary_contract_date" value={formData.preliminary_contract_date} placeholder={t.preliminaryContractDate} onChange={handleChange} className="rounded border p-2" />
                    </div>
                );
    
            case 4:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="sale_price" value={formData.sale_price} placeholder={t.salePrice} onChange={handleChange} className="rounded border p-2" />
                        <input name="deposit_amount" value={formData.deposit_amount} placeholder={t.depositAmount} onChange={handleChange} className="rounded border p-2" />
                        <input name="remaining_amount" value={formData.remaining_amount} placeholder={t.remainingAmount} onChange={handleChange} className="rounded border p-2" />
                    </div>
                );
    
            case 5:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="seller_bank_name" value={formData.seller_bank_name} onChange={handleChange} placeholder={t.sellerBankName} className="rounded border p-2" />
                        <input name="seller_bank_bic" value={formData.seller_bank_bic} onChange={handleChange} placeholder={t.sellerBankBic} className="rounded border p-2" />
                        <input name="seller_bank_iban" value={formData.seller_bank_iban} onChange={handleChange} placeholder={t.sellerBankIban} className="rounded border p-2 md:col-span-2" />
                    </div>
                );
    
            case 6:
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="tax_evaluation" value={formData.tax_evaluation} placeholder={t.taxEvaluation} onChange={handleChange} className="rounded border p-2" />
                    </div>
                );
    
            case 7:
                return (
                    <div className="rounded-lg bg-slate-50 p-6 text-slate-700">
                        <h3 className="text-lg font-semibold text-slate-900">
                            {t.readyToGenerate}
                        </h3>
            
                        <p className="mt-2">
                            {t.reviewFields}
                        </p>
            
                        <p className="mt-4 text-sm">
                            <strong>{t.pdf}:</strong> {file ? file.name : t.noFileSelected}
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
                    <div className="mb-6 flex justify-end">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                            <option value="bg">BG</option>
                            <option value="en">EN</option>
                        </select>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-slate-900">
                        {t.appTitle}
                    </h1>
    
                    <p className="mt-3 text-slate-600">
                        {t.homeDescription}
                    </p>
    
                    <button
                        type="button"
                        onClick={() => setScreen("form")}
                        className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white"
                    >
                        {t.startNewDocument}
                    </button>
                </section>
            </main>
        );
    }
    
    if (screen === "success") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <section className="max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <div className="mb-6 flex justify-end">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                            <option value="bg">BG</option>
                            <option value="en">EN</option>
                        </select>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-slate-900">
                        {t.successTitle}
                    </h1>
    
                    <p className="mt-3 text-slate-600">
                        {t.successText}
                    </p>
    
                    <button
                        type="button"
                        onClick={handleResetFlow}
                        className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white"
                    >
                        {t.generateAnother}
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-6 flex justify-end">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                        <option value="bg">BG</option>
                        <option value="en">EN</option>
                    </select>
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900">
                    {t.appTitle}
                </h1>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="mb-4">
                        <p className="text-sm text-slate-500">
                            {t.step} {step + 1} {t.of} {steps.length}
                        </p>
                        <h2 className="mt-1 text-xl font-semibold text-slate-900">
                            {steps[step]}
                        </h2>
                    </div>
                    
                    {renderStep()}

                    {!isStepValid() && (
                        <p className="text-sm text-red-500">
                            {t.requiredFields}
                        </p>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            disabled={step === 0}
                            onClick={() => setStep((prev) => prev - 1)}
                            className="rounded-lg border px-4 py-2 disabled:opacity-50"
                        >
                            {t.back}
                        </button>
                    
                        {step < steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={() => setStep((prev) => prev + 1)}
                                disabled={!isStepValid()}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                            >
                                {t.next}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                            >
                                {loading ? t.generating : t.generate}
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}

export default App;