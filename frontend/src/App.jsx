import { useState } from "react";

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
        contract_date_words: "",
        notary_name: "",
        preliminary_contract_date: "",
    
        sale_price: "",
        deposit_amount: "",
        remaining_amount: "",
    
        seller_bank_name: "",
        seller_bank_bic: "",
        seller_bank_iban: "",
    
        tax_evaluation: "",
        tax_evaluation_words: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please upload a PDF file');

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

                    <h2 className="text-lg font-semibold mt-6">Seller</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="seller_name" placeholder="Seller Name" onChange={handleChange} className="border p-2 rounded" />
                        <input name="seller_egn" placeholder="EGN" onChange={handleChange} className="border p-2 rounded" />
                        <input name="seller_id_card" placeholder="ID Card" onChange={handleChange} className="border p-2 rounded" />
                        <input name="seller_id_issue_date" placeholder="ID Issue Date" onChange={handleChange} className="border p-2 rounded" />
                        <input name="seller_address" placeholder="Address" onChange={handleChange} className="border p-2 rounded md:col-span-2" />
                    </div>
                    
                    <h2 className="text-lg font-semibold mt-6">Buyer</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="buyer_name" placeholder="Buyer Name" onChange={handleChange} className="border p-2 rounded" />
                        <input name="buyer_egn" placeholder="EGN" onChange={handleChange} className="border p-2 rounded" />
                        <input name="buyer_id_card" placeholder="ID Card" onChange={handleChange} className="border p-2 rounded" />
                        <input name="buyer_id_issue_date" placeholder="ID Issue Date" onChange={handleChange} className="border p-2 rounded" />
                        <input name="buyer_address" placeholder="Address" onChange={handleChange} className="border p-2 rounded md:col-span-2" />
                    </div>

                    <h2 className="mt-6 text-lg font-semibold">Contract</h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="contract_date" value={formData.contract_date} onChange={handleChange} placeholder="Contract Date" className="rounded border p-2" />
                        <input name="contract_date_words" value={formData.contract_date_words} onChange={handleChange} placeholder="Contract Date Words" className="rounded border p-2" />
                        <input name="notary_name" value={formData.notary_name} onChange={handleChange} placeholder="Notary Name" className="rounded border p-2" />
                        <input name="preliminary_contract_date" value={formData.preliminary_contract_date} onChange={handleChange} placeholder="Preliminary Contract Date" className="rounded border p-2" />
                    </div>
                    
                    <h2 className="mt-6 text-lg font-semibold">Payment</h2>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="sale_price" value={formData.sale_price} onChange={handleChange} placeholder="Sale Price" className="rounded border p-2" />
                        <input name="deposit_amount" value={formData.deposit_amount} onChange={handleChange} placeholder="Deposit Amount" className="rounded border p-2" />
                        <input name="remaining_amount" value={formData.remaining_amount} onChange={handleChange} placeholder="Remaining Amount" className="rounded border p-2" />
                    </div>
                    
                    <h2 className="mt-6 text-lg font-semibold">Seller Bank</h2>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="seller_bank_name" value={formData.seller_bank_name} onChange={handleChange} placeholder="Bank Name" className="rounded border p-2" />
                        <input name="seller_bank_bic" value={formData.seller_bank_bic} onChange={handleChange} placeholder="BIC" className="rounded border p-2" />
                        <input name="seller_bank_iban" value={formData.seller_bank_iban} onChange={handleChange} placeholder="IBAN" className="rounded border p-2 md:col-span-2" />
                    </div>
                    
                    <h2 className="mt-6 text-lg font-semibold">Tax</h2>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input name="tax_evaluation" value={formData.tax_evaluation} onChange={handleChange} placeholder="Tax Evaluation" className="rounded border p-2" />
                        <input name="tax_evaluation_words" value={formData.tax_evaluation_words} onChange={handleChange} placeholder="Tax Evaluation Words" className="rounded border p-2" />
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