"use client";

import { useState } from "react";
import { formatRupiah, getSettings } from "@/lib/data";

const DENOMINATIONS = [5000, 10000, 20000, 50000, 100000];

export default function PaymentModal({ total, onClose, onConfirm, allowCash = true }) {
  const [method, setMethod] = useState("QRIS");
  const [cashInput, setCashInput] = useState("");
  const [confirming, setConfirming] = useState(false);
  const settings = getSettings();

  const cashReceived = Number(cashInput || 0);
  const change = cashReceived - total;
  const cashEnough = cashReceived >= total && cashReceived > 0;

  // Saran nominal: uang pas + pecahan yang cukup untuk membayar
  const quickAmounts = [total, ...DENOMINATIONS.filter((d) => d > total).slice(0, 4)];

  function handleCashChange(e) {
    setCashInput(e.target.value.replace(/\D/g, "").slice(0, 9));
  }

  function handleConfirm() {
    setConfirming(true);
    setTimeout(() => {
      if (method === "Tunai") {
        onConfirm({ method: "Tunai", cashReceived, change });
      } else {
        onConfirm({ method: "QRIS" });
      }
    }, 600);
  }

  const canConfirm = !confirming && (method === "QRIS" || cashEnough);

  return (
    <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
      <div className="bg-paper rounded-2xl border-2 border-line max-w-sm w-full p-6 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-inkSoft hover:text-chili"
          aria-label="Tutup"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <p className="text-center text-sm text-inkSoft mb-1">Total Pembayaran</p>
        <p className="text-center font-display font-bold text-3xl text-ink mb-5">
          {formatRupiah(total)}
        </p>

        {allowCash && (
          <div className="grid grid-cols-2 gap-1 bg-cream border-2 border-line rounded-xl p-1 mb-5">
            {["QRIS", "Tunai"].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`py-2 rounded-lg font-display font-semibold text-sm transition-colors ${
                  method === m ? "bg-ink text-cream" : "text-inkSoft hover:text-ink"
                }`}
              >
                {m === "Tunai" ? "Tunai (Cash)" : "QRIS"}
              </button>
            ))}
          </div>
        )}

        {method === "QRIS" ? (
          <>
            <div className="bg-white border-2 border-line rounded-xl aspect-square flex items-center justify-center overflow-hidden mb-4">
              {settings.qrisImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.qrisImage} alt="QRIS Bintang Kriuk" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center text-inkSoft text-sm px-6">
                  QRIS belum diunggah. Minta admin menambahkan gambar QRIS di menu Pengaturan QRIS.
                </div>
              )}
            </div>
            <p className="text-center text-xs text-inkSoft mb-5">
              Minta pembeli memindai kode QRIS di atas menggunakan aplikasi bank / e-wallet.
            </p>
          </>
        ) : (
          <div className="mb-5">
            <label className="label-field">Uang diterima dari pembeli</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display font-semibold text-inkSoft">
                Rp
              </span>
              <input
                className="input-field !pl-11 font-display font-bold text-xl"
                inputMode="numeric"
                placeholder="0"
                value={cashInput ? Number(cashInput).toLocaleString("id-ID") : ""}
                onChange={handleCashChange}
                autoFocus
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {quickAmounts.map((amt, idx) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setCashInput(String(amt))}
                  className={`text-sm font-medium px-3 py-1.5 rounded-full border-2 transition-colors ${
                    cashReceived === amt
                      ? "bg-gold border-gold text-ink"
                      : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {idx === 0 ? "Uang pas" : formatRupiah(amt)}
                </button>
              ))}
            </div>

            <div
              className={`mt-4 rounded-xl p-4 border-2 ${
                cashInput === ""
                  ? "bg-cream border-line"
                  : cashEnough
                  ? "bg-leaf/10 border-leaf/40"
                  : "bg-chili/10 border-chili/40"
              }`}
            >
              <div className="flex justify-between text-sm text-inkSoft mb-1">
                <span>Uang diterima</span>
                <span>{formatRupiah(cashReceived)}</span>
              </div>
              <div className="flex justify-between text-sm text-inkSoft mb-2">
                <span>Total belanja</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-line pt-2">
                {cashInput === "" ? (
                  <span className="text-sm text-inkSoft">Masukkan uang yang diterima</span>
                ) : cashEnough ? (
                  <>
                    <span className="font-display font-semibold text-leaf-dark">Kembalian</span>
                    <span className="font-display font-bold text-2xl text-leaf-dark">
                      {formatRupiah(change)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-display font-semibold text-chili">Uang kurang</span>
                    <span className="font-display font-bold text-2xl text-chili">
                      {formatRupiah(Math.abs(change))}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="btn-primary w-full text-center disabled:bg-line disabled:text-inkSoft/60 disabled:shadow-none"
        >
          {confirming
            ? "Menyimpan transaksi..."
            : method === "Tunai"
            ? "Terima Tunai & Selesai"
            : "Pembayaran Diterima"}
        </button>
        <button onClick={onClose} className="btn-secondary w-full text-center mt-2">
          Batalkan
        </button>
      </div>
    </div>
  );
}
