"use client";

import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, formatRupiah } from "@/lib/data";
import ProductForm from "@/components/ProductForm";
import ProductImage from "@/components/ProductImage";

export default function ProdukPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  function refresh() {
    setProducts(getProducts());
  }

  function handleSave(data) {
    if (editing) {
      updateProduct(editing.id, data);
    } else {
      addProduct(data);
    }
    setShowForm(false);
    setEditing(null);
    refresh();
  }

  function handleDelete() {
    deleteProduct(deleteTarget.id);
    setDeleteTarget(null);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Produk & Stok</h1>
          <p className="text-inkSoft text-sm">Tambah, ubah, atau hapus varian kripik yang dijual.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + Tambah Produk
        </button>
      </div>

      <div className="card p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-inkSoft border-b border-line">
                <th className="py-2 pr-4 font-medium">Produk</th>
                <th className="py-2 pr-4 font-medium">Kategori</th>
                <th className="py-2 pr-4 font-medium">Harga</th>
                <th className="py-2 pr-4 font-medium">Stok</th>
                <th className="py-2 pr-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        src={p.image}
                        name={p.name}
                        color={p.color}
                        className="w-14 h-14 rounded-lg shrink-0"
                      />
                      <span className="font-medium text-ink">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-inkSoft">{p.category}</td>
                  <td className="py-3 pr-4 text-inkSoft">{formatRupiah(p.price)}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.stock <= 10 ? "bg-chili/10 text-chili" : "bg-leaf/10 text-leaf-dark"
                      }`}
                    >
                      {p.stock} pcs
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditing(p);
                          setShowForm(true);
                        }}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-line hover:border-ink text-ink"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-chili/40 text-chili hover:bg-chili/10"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-inkSoft">
                    Belum ada produk. Klik &quot;Tambah Produk&quot; untuk mulai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ProductForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-paper rounded-2xl border-2 border-line max-w-sm w-full p-6 text-center">
            <h3 className="font-display text-lg font-bold text-ink mb-2">Hapus produk ini?</h3>
            <p className="text-inkSoft text-sm mb-5">
              &quot;{deleteTarget.name}&quot; akan dihapus dari daftar produk secara permanen.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1 text-center">
                Batal
              </button>
              <button onClick={handleDelete} className="btn-primary flex-1 text-center">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
