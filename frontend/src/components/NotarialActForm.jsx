import { useState } from "react";
import { t } from "../i18n.js";

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-colors"
    />
  );
}

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</span>
        <svg className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500"
      />
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
}

export default function NotarialActForm({ lang, onSubmit, loading, defaultValues }) {
  const [form, setForm] = useState({
    notaryName: defaultValues?.notaryName || "",
    notaryNumber: defaultValues?.notaryNumber || "",
    courtDistrict: defaultValues?.courtDistrict || "Софийски районен съд",
    notaryOfficeAddress: defaultValues?.notaryOfficeAddress || 'гр. София, улица "Княз Борис І" № 49',
    actDate: defaultValues?.actDate || "",
    actPlace: defaultValues?.actPlace || "гр. София",

    sellerName: defaultValues?.sellerName || "",
    sellerEGN: defaultValues?.sellerEGN || "",
    sellerIdCardNumber: defaultValues?.sellerIdCardNumber || "",
    sellerIdCardIssueDate: defaultValues?.sellerIdCardIssueDate || "",
    sellerIdCardIssuer: defaultValues?.sellerIdCardIssuer || "МВР - София",
    sellerAddress: defaultValues?.sellerAddress || "",

    buyerName: defaultValues?.buyerName || "",
    buyerEGN: defaultValues?.buyerEGN || "",
    buyerIdCardNumber: defaultValues?.buyerIdCardNumber || "",
    buyerIdCardIssueDate: defaultValues?.buyerIdCardIssueDate || "",
    buyerIdCardIssuer: defaultValues?.buyerIdCardIssuer || "МВР - София",
    buyerAddress: defaultValues?.buyerAddress || "",

    priceCurrency: defaultValues?.priceCurrency || "евро",
    price: defaultValues?.price || "",
    hasPreliminaryContract: defaultValues?.hasPreliminaryContract ?? true,
    preliminaryContractDate: defaultValues?.preliminaryContractDate || "",
    depositAmount: defaultValues?.depositAmount || "",
    depositPercentage: defaultValues?.depositPercentage || "",

    bankName: defaultValues?.bankName || "",
    bankBIC: defaultValues?.bankBIC || "",
    bankIBAN: defaultValues?.bankIBAN || "",

    taxAssessmentValue: defaultValues?.taxAssessmentValue || "",
    taxAssessmentCertNumber: defaultValues?.taxAssessmentCertNumber || "",
    taxAssessmentIssueDate: defaultValues?.taxAssessmentIssueDate || "",
    taxAssessmentIssuer: defaultValues?.taxAssessmentIssuer || "",

    previousDeedDescription: defaultValues?.previousDeedDescription || "",
  });

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...form,
      price: parseFloat(form.price) || 0,
      depositAmount: parseFloat(form.depositAmount) || 0,
      depositPercentage: parseFloat(form.depositPercentage) || 0,
      taxAssessmentValue: parseFloat(form.taxAssessmentValue) || 0,
    };
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Notary */}
      <Section title={t(lang, "naSectionNotary")}>
        <Field label={t(lang, "naNotaryName")}>
          <Input value={form.notaryName} onChange={(e) => set("notaryName", e.target.value)} />
        </Field>
        <Field label={t(lang, "naNotaryNumber")}>
          <Input value={form.notaryNumber} onChange={(e) => set("notaryNumber", e.target.value)} />
        </Field>
        <Field label={t(lang, "naCourtDistrict")}>
          <Input value={form.courtDistrict} onChange={(e) => set("courtDistrict", e.target.value)} />
        </Field>
        <Field label={t(lang, "naNotaryOfficeAddress")}>
          <Input value={form.notaryOfficeAddress} onChange={(e) => set("notaryOfficeAddress", e.target.value)} />
        </Field>
        <Field label={t(lang, "naActDate")}>
          <Input value={form.actDate} onChange={(e) => set("actDate", e.target.value)} placeholder="01.01.2026" />
        </Field>
        <Field label={t(lang, "naActPlace")}>
          <Input value={form.actPlace} onChange={(e) => set("actPlace", e.target.value)} />
        </Field>
      </Section>

      {/* Seller */}
      <Section title={t(lang, "naSectionSeller")}>
        <Field label={t(lang, "naSellerName")}>
          <Input value={form.sellerName} onChange={(e) => set("sellerName", e.target.value)} />
        </Field>
        <Field label={t(lang, "naSellerEGN")}>
          <Input value={form.sellerEGN} onChange={(e) => set("sellerEGN", e.target.value)} />
        </Field>
        <Field label={t(lang, "naSellerIdCardNumber")}>
          <Input value={form.sellerIdCardNumber} onChange={(e) => set("sellerIdCardNumber", e.target.value)} />
        </Field>
        <Field label={t(lang, "naSellerIdCardIssueDate")}>
          <Input value={form.sellerIdCardIssueDate} onChange={(e) => set("sellerIdCardIssueDate", e.target.value)} placeholder="01.01.2020 г." />
        </Field>
        <Field label={t(lang, "naSellerIdCardIssuer")}>
          <Input value={form.sellerIdCardIssuer} onChange={(e) => set("sellerIdCardIssuer", e.target.value)} />
        </Field>
        <Field label={t(lang, "naSellerAddress")}>
          <Input value={form.sellerAddress} onChange={(e) => set("sellerAddress", e.target.value)} />
        </Field>
      </Section>

      {/* Buyer */}
      <Section title={t(lang, "naSectionBuyer")}>
        <Field label={t(lang, "naBuyerName")}>
          <Input value={form.buyerName} onChange={(e) => set("buyerName", e.target.value)} />
        </Field>
        <Field label={t(lang, "naBuyerEGN")}>
          <Input value={form.buyerEGN} onChange={(e) => set("buyerEGN", e.target.value)} />
        </Field>
        <Field label={t(lang, "naBuyerIdCardNumber")}>
          <Input value={form.buyerIdCardNumber} onChange={(e) => set("buyerIdCardNumber", e.target.value)} />
        </Field>
        <Field label={t(lang, "naBuyerIdCardIssueDate")}>
          <Input value={form.buyerIdCardIssueDate} onChange={(e) => set("buyerIdCardIssueDate", e.target.value)} placeholder="01.01.2020 г." />
        </Field>
        <Field label={t(lang, "naBuyerIdCardIssuer")}>
          <Input value={form.buyerIdCardIssuer} onChange={(e) => set("buyerIdCardIssuer", e.target.value)} />
        </Field>
        <Field label={t(lang, "naBuyerAddress")}>
          <Input value={form.buyerAddress} onChange={(e) => set("buyerAddress", e.target.value)} />
        </Field>
      </Section>

      {/* Payment */}
      <Section title={t(lang, "naSectionPayment")}>
        <Field label={t(lang, "naPrice")}>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <Input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 shrink-0">евро</span>
          </div>
        </Field>
        <div className="sm:col-span-2">
          <Toggle
            label={t(lang, "naHasPreliminaryContract")}
            checked={form.hasPreliminaryContract}
            onChange={(v) => set("hasPreliminaryContract", v)}
          />
        </div>
        {form.hasPreliminaryContract && (
          <>
            <Field label={t(lang, "naPreliminaryContractDate")}>
              <Input value={form.preliminaryContractDate} onChange={(e) => set("preliminaryContractDate", e.target.value)} />
            </Field>
            <Field label={t(lang, "naDepositAmount")}>
              <Input type="number" value={form.depositAmount} onChange={(e) => set("depositAmount", e.target.value)} />
            </Field>
            <Field label={t(lang, "naDepositPercentage")}>
              <Input type="number" value={form.depositPercentage} onChange={(e) => set("depositPercentage", e.target.value)} />
            </Field>
          </>
        )}
      </Section>

      {/* Bank */}
      <Section title={t(lang, "naSectionBank")}>
        <Field label={t(lang, "naBankName")}>
          <Input value={form.bankName} onChange={(e) => set("bankName", e.target.value)} />
        </Field>
        <Field label={t(lang, "naBankBIC")}>
          <Input value={form.bankBIC} onChange={(e) => set("bankBIC", e.target.value)} />
        </Field>
        <Field label={t(lang, "naBankIBAN")}>
          <Input value={form.bankIBAN} onChange={(e) => set("bankIBAN", e.target.value)} />
        </Field>
      </Section>

      {/* Tax */}
      <Section title={t(lang, "naSectionTax")}>
        <Field label={t(lang, "naTaxAssessmentValue")}>
          <Input type="number" value={form.taxAssessmentValue} onChange={(e) => set("taxAssessmentValue", e.target.value)} />
        </Field>
        <Field label={t(lang, "naTaxAssessmentCertNumber")}>
          <Input value={form.taxAssessmentCertNumber} onChange={(e) => set("taxAssessmentCertNumber", e.target.value)} />
        </Field>
        <Field label={t(lang, "naTaxAssessmentIssueDate")}>
          <Input value={form.taxAssessmentIssueDate} onChange={(e) => set("taxAssessmentIssueDate", e.target.value)} />
        </Field>
        <Field label={t(lang, "naTaxAssessmentIssuer")}>
          <Input value={form.taxAssessmentIssuer} onChange={(e) => set("taxAssessmentIssuer", e.target.value)} />
        </Field>
      </Section>

      {/* Previous deed */}
      <Section title={t(lang, "naSectionDeed")}>
        <div className="sm:col-span-2">
          <Field label={t(lang, "naPreviousDeedDescription")}>
            <textarea
              value={form.previousDeedDescription}
              onChange={(e) => set("previousDeedDescription", e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-colors resize-vertical"
            />
          </Field>
        </div>
      </Section>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-teal-600 dark:bg-teal-500 px-5 py-3 text-base font-semibold text-white hover:bg-teal-700 dark:hover:bg-teal-600 active:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 outline-none"
      >
        {loading ? t(lang, "naDownloading") : t(lang, "naGenerateAct")}
      </button>
    </form>
  );
}
