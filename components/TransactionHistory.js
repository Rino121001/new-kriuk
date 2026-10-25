"use client";

import { useEffect, useState } from "react";
import { getSales, formatRupiah } from "@/lib/data";
import InvoiceModal from "@/components/InvoiceModal";

export default function TransactionHistory() {
  const [sales, setSales] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSales(getSales());
  }, []);

  const q = search.trim().toLowerCase();
  const filtered = sales.filter((s) => {
    if (!q) return true;
    return (
      s.id.toLowerCase().includes(q) ||
      s.id.replace("TRX", "INV-").toLowerCase().includes(q) ||
      (s.buyerName || "").toLowerCase().includes(q) ||
      s.items.some((i) => i.name.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Riwayat Transaksi</h1>
          <p className="text-inkSoft text-sm">Lihat dan cetak ulang invoice dari semua penjualan.</p>
        </div>
        <input
          className="input-field max-w-xs"
          placeholder="Cari no. invoice / produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-inkSoft border-b border-line">
                <th className="py-2 pr-4 font-medium">No. Invoice</th>
                <th className="py-2 pr-4 font-medium">Waktu</th>
                <th className="py-2 pr-4 font-medium">Kanal</th>
                <th className="py-2 pr-4 font-medium">Bayar</th>
                <th className="py-2 pr-4 font-medium">Total</th>
                <th className="py-2 font-medium text-right">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-line/60 last:border-0">
                  <td className="py-3 pr-4 font-medium text-ink">{s.id.replace("TRX", "INV-")}</td>
                  <td className="py-3 pr-4 text-inkSoft">
                    {new Date(s.date).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 pr-4 text-inkSoft">{s.channel}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.paymentMethod === "Tunai" ? "bg-gold/25 text-gold-dark" : "bg-leaf/10 text-leaf-dark"
                      }`}
                    >
                      {s.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-semibold text-ink">{formatRupiah(s.total)}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelected(s)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-line hover:border-ink text-ink"
                    >
                      Lihat Invoice
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-inkSoft">
                    {sales.length === 0
                      ? "Belum ada transaksi. Invoice akan muncul di sini setelah ada penjualan."
                      : "Tidak ada transaksi yang cocok dengan pencarian."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <InvoiceModal
          sale={selected}
          title="Detail Invoice"
          closeLabel="Tutup"
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
