"use client";

import Invoice from "@/components/Invoice";

export default function InvoiceModal({ sale, title = "Transaksi Berhasil", closeLabel = "Transaksi Baru", onClose }) {
  return (
    <div className="invoice-overlay fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 px-4 py-6 overflow-y-auto">
      <div className="max-w-sm mx-auto">
        <div className="no-print flex items-center gap-2 mb-3 text-cream">
          <div className="w-8 h-8 rounded-full bg-leaf flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-display font-semibold">{title}</p>
        </div>

        <div className="rounded-2xl overflow-hidden border-2 border-line">
          <Invoice sale={sale} />
        </div>

        <div className="no-print grid grid-cols-2 gap-3 mt-4">
          <button onClick={() => window.print()} className="btn-secondary text-center">
            Cetak / Simpan PDF
          </button>
          <button onClick={onClose} className="btn-primary text-center">
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
