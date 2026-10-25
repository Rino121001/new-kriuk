"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/data";
import ProductImage from "@/components/ProductImage";

export default function ProductGrid({ products, onAdd, cart = [] }) {
  const [preview, setPreview] = useState(null);

  if (products.length === 0) {
    return (
      <div className="card p-10 text-center text-inkSoft">
        Belum ada produk. Minta admin menambahkan stok kripik dulu ya.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((p) => {
          const habis = p.stock <= 0;
          const inCart = cart.find((i) => i.productId === p.id)?.qty || 0;
          return (
            <div key={p.id} className="card overflow-hidden flex flex-col">
              <button
                type="button"
                onClick={() => setPreview(p)}
                className="relative block w-full aspect-[4/3] bg-cream group"
                aria-label={`Perbesar foto ${p.name}`}
              >
                <ProductImage
                  src={p.image}
                  name={p.name}
                  color={p.color}
                  className={`w-full h-full ${habis ? "opacity-40 grayscale" : ""}`}
                />
                <span
                  className={`absolute top-2 left-2 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    habis
                      ? "bg-chili text-cream"
                      : p.stock <= 10
                      ? "bg-gold text-ink"
                      : "bg-paper/95 text-leaf-dark"
                  }`}
                >
                  {habis ? "Stok habis" : `Stok ${p.stock}`}
                </span>
                {inCart > 0 && (
                  <span className="absolute top-2 right-2 bg-ink text-cream text-xs font-semibold px-2.5 py-1 rounded-full">
                    {inCart} di pesanan
                  </span>
                )}
                <span className="absolute bottom-2 right-2 bg-paper/90 text-ink text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Perbesar
                </span>
              </button>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="font-display font-semibold text-ink text-lg leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-inkSoft">{p.category}</p>
                </div>
                <div className="mt-auto">
                  <p className="font-display font-bold text-xl text-chili mb-3">
                    {formatRupiah(p.price)}
                  </p>
                  <button
                    onClick={() => onAdd(p)}
                    disabled={habis}
                    className="w-full font-display font-semibold py-3 rounded-xl bg-chili text-cream hover:bg-chili-dark active:translate-y-0.5 disabled:bg-line disabled:text-inkSoft/60 transition-colors"
                  >
                    {habis ? "Habis" : "+ Tambah ke pesanan"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {preview && (
        <div
          className="fixed inset-0 bg-ink/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-paper rounded-2xl border-2 border-line max-w-xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductImage
              src={preview.image}
              name={preview.name}
              color={preview.color}
              className="w-full aspect-[4/3]"
            />
            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-xl text-ink">{preview.name}</h3>
                <p className="text-sm text-inkSoft">
                  {preview.category} · Stok {preview.stock}
                </p>
              </div>
              <p className="font-display font-bold text-2xl text-chili shrink-0">
                {formatRupiah(preview.price)}
              </p>
            </div>
            <div className="px-5 pb-5 flex gap-3">
              <button onClick={() => setPreview(null)} className="btn-secondary flex-1 text-center">
                Tutup
              </button>
              <button
                onClick={() => {
                  onAdd(preview);
                  setPreview(null);
                }}
                disabled={preview.stock <= 0}
                className="btn-primary flex-1 text-center disabled:bg-line disabled:text-inkSoft/60 disabled:shadow-none"
              >
                + Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
