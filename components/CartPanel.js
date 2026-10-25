"use client";

import { formatRupiah } from "@/lib/data";
import ProductImage from "@/components/ProductImage";

export default function CartPanel({ cart, onQtyChange, onRemove, onCheckout, extraFields }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="card p-5 flex flex-col h-full">
      <h2 className="font-display font-semibold text-lg text-ink mb-4">Pesanan Saat Ini</h2>

      {cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center text-inkSoft text-sm py-10">
          Belum ada kripik dipilih.
          <br />
          Klik &quot;+ Tambah&quot; pada produk di sebelah kiri.
        </div>
      ) : (
        <div className="flex-1 space-y-3 overflow-y-auto max-h-[360px] pr-1">
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <ProductImage
                src={item.image}
                name={item.name}
                color={item.color}
                className="w-12 h-12 rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                <p className="text-xs text-inkSoft">{formatRupiah(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onQtyChange(item.productId, item.qty - 1)}
                  className="w-7 h-7 rounded-lg border border-line text-ink font-semibold hover:border-chili"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-medium">{item.qty}</span>
                <button
                  onClick={() => onQtyChange(item.productId, item.qty + 1)}
                  className="w-7 h-7 rounded-lg border border-line text-ink font-semibold hover:border-chili"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onRemove(item.productId)}
                className="text-inkSoft hover:text-chili"
                aria-label="Hapus"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {extraFields}

      <div className="border-t border-line mt-4 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-inkSoft">
          <span>Total item</span>
          <span>{totalQty} pcs</span>
        </div>
        <div className="flex justify-between font-display font-bold text-lg text-ink">
          <span>Total Bayar</span>
          <span>{formatRupiah(total)}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="btn-primary w-full text-center mt-2 disabled:bg-line disabled:text-inkSoft/60 disabled:shadow-none"
        >
          Lanjut ke Pembayaran
        </button>
      </div>
    </div>
  );
}
