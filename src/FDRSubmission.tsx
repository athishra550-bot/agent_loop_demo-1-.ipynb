
import { useState } from "react";

import {
  ArrowLeft,
  Building2,
  Landmark,
  FileText,
  Upload,
  CheckCircle2,
  X
} from "lucide-react";


interface FDRRecord {
  id: string;
  institution: string;
  bank: string;
  amount: string;
  maturity: string;
  status: string;
}

interface FDRSubmissionProps {
  onCancel: () => void;
  onSubmit: (record: FDRRecord) => void;
}

function FDRSubmission({ onCancel, onSubmit }: FDRSubmissionProps) {
  const [formData, setFormData] = useState({
    institution: "",
    institutionId: "",
    bank: "",
    branch: "",
    fdrNumber: "",
    amount: "",
    issueDate: "",
    maturityDate: ""
  });

  const [document, setDocument] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (Number(formData.amount) <= 0) {
      setError("Please enter a valid deposit amount.");
      return;
    }

    if (new Date(formData.maturityDate) <= new Date(formData.issueDate)) {
      setError("Maturity date must be after the issue date.");
      return;
    }

    if (!document) {
      setError("Please upload the FDR document.");
      return;
    }

    const record: FDRRecord = {
      id: formData.fdrNumber,
      institution: formData.institution,
      bank: formData.bank,
      amount: new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(Number(formData.amount)),
      maturity: new Date(formData.maturityDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),
      status: "Pending"
    };

    onSubmit(record);
  };

  const inputStyle = "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelStyle = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">

      {/* Header */}
      <div className="mx-auto max-w-5xl">

        <button
          onClick={onCancel}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Submit New FDR
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter the institution and financial instrument details below.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Institution Details */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Building2 size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Institution Details
                </h2>
                <p className="text-xs text-slate-400">
                  Details of the submitting institution
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className={labelStyle}>
                  Institution Name *
                </label>

                <input
                  required
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Enter institution name"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Institution ID *
                </label>

                <input
                  required
                  name="institutionId"
                  value={formData.institutionId}
                  onChange={handleChange}
                  placeholder="Example: AICTE12345"
                  className={inputStyle}
                />
              </div>

            </div>
          </div>

          {/* Bank Details */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <Landmark size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Bank & FDR Details
                </h2>
                <p className="text-xs text-slate-400">
                  Financial instrument information
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className={labelStyle}>Bank Name *</label>

                <select
                  required
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Select Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Canara Bank">Canara Bank</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Branch Name *</label>

                <input
                  required
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Enter bank branch"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>FDR Number *</label>

                <input
                  required
                  name="fdrNumber"
                  value={formData.fdrNumber}
                  onChange={handleChange}
                  placeholder="Enter FDR reference number"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Deposit Amount (₹) *</label>

                <input
                  required
                  type="number"
                  min="1"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter deposit amount"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Issue Date *</label>

                <input
                  required
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Maturity Date *</label>

                <input
                  required
                  type="date"
                  name="maturityDate"
                  value={formData.maturityDate}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

            </div>
          </div>

          {/* Document Upload */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                <FileText size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Supporting Documents
                </h2>
                <p className="text-xs text-slate-400">
                  Upload the bank-issued FDR document
                </p>
              </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50">

              {document ? (
                <>
                  <CheckCircle2 size={35} className="mb-3 text-emerald-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    {document.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Click to replace document
                  </p>
                </>
              ) : (
                <>
                  <Upload size={35} className="mb-3 text-blue-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    Click to upload FDR document
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    PDF format only · Maximum 5 MB
                  </p>
                </>
              )}

              <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];

                  if (!selectedFile) return;

                  if (selectedFile.type !== "application/pdf") {
                    setError("Only PDF documents are allowed.");
                    setDocument(null);
                    e.target.value = "";
                    return;
                  }

                  if (selectedFile.size > 5 * 1024 * 1024) {
                    setError("Document size must not exceed 5 MB.");
                    setDocument(null);
                    e.target.value = "";
                    return;
                  }

                  setError("");
                  setDocument(selectedFile);
                }}
              />
            </label>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <X size={18} />
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="mb-10 flex flex-col-reverse justify-end gap-3 sm:flex-row">

            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
            >
              <CheckCircle2 size={18} />
              Submit FDR for Verification
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default FDRSubmission;
