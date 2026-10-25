"use client";

import { useEffect, useState } from "react";
import { getProducts, getSales, formatRupiah } from "@/lib/data";
import StatCard from "@/components/StatCard";
import SalesChart from "@/components/SalesChart";

export default function AdminOverviewPage() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
    setSales(getSales());
  }, []);

  const totalStok = products.reduce((sum, p) => sum + p.stock, 0);
  const stokMenipis = products.filter((p) => p.stock <= 10).length;
  const today = new Date().toDateString();
  const salesToday = sales.filter((s) => new Date(s.date).toDateString() === today);
  const totalHariIni = salesToday.reduce((sum, s) => sum + s.total, 0);

  const soldMap = {};
  sales.forEach((s) => {
    s.items.forEach((item) => {
      if (!soldMap[item.productId]) {
        soldMap[item.productId] = { name: item.name, qty: 0, revenue: 0 };
      }
      soldMap[item.productId].qty += item.qty;
      soldMap[item.productId].revenue += item.qty * item.price;
    });
  });
  const soldList = Object.values(soldMap).sort((a, b) => b.qty - a.qty);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Ringkasan</h1>
        <p className="text-inkSoft text-sm">Pantau stok dan performa penjualan Bintang Kriuk.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Stok Gudang" value={`${totalStok} pcs`} />
        <StatCard label="Produk Hampir Habis" value={stokMenipis} tone="chili" />
        <StatCard label="Transaksi Hari Ini" value={salesToday.length} tone="gold" />
        <StatCard label="Pendapatan Hari Ini" value={formatRupiah(totalHariIni)} tone="leaf" />
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
        <SalesChart sales={sales} />

        <div className="card p-5">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">Barang Terjual</h2>
          {soldList.length === 0 ? (
            <p className="text-sm text-inkSoft">Belum ada transaksi tercatat.</p>
          ) : (
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {soldList.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-ink font-medium">{item.name}</span>
                  <div className="text-right">
                    <p className="text-ink">{item.qty} pcs</p>
                    <p className="text-xs text-inkSoft">{formatRupiah(item.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card p-5 mt-6">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Stok Barang Saat Ini</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-inkSoft border-b border-line">
                <th className="py-2 pr-4 font-medium">Produk</th>
                <th className="py-2 pr-4 font-medium">Kategori</th>
                <th className="py-2 pr-4 font-medium">Harga</th>
                <th className="py-2 pr-4 font-medium">Stok</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-0">
                  <td className="py-2.5 pr-4 text-ink font-medium">{p.name}</td>
                  <td className="py-2.5 pr-4 text-inkSoft">{p.category}</td>
                  <td className="py-2.5 pr-4 text-inkSoft">{formatRupiah(p.price)}</td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.stock <= 10 ? "bg-chili/10 text-chili" : "bg-leaf/10 text-leaf-dark"
                      }`}
                    >
                      {p.stock} pcs
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
