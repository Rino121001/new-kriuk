"use client";

import { useEffect, useState } from "react";
import { getProducts, addSale, getSession } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import CartPanel from "@/components/CartPanel";
import PaymentModal from "@/components/PaymentModal";
import InvoiceModal from "@/components/InvoiceModal";

export default function KasirPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  function refreshProducts() {
    setProducts(getProducts());
  }

  function handleAdd(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      const currentQty = existing ? existing.qty : 0;
      if (currentQty >= product.stock) return prev;
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        { productId: product.id, name: product.name, price: product.price, qty: 1, image: product.image, color: product.color },
      ];
    });
  }

  function handleQtyChange(productId, qty) {
    const product = products.find((p) => p.id === productId);
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    if (product && qty > product.stock) return;
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)));
  }

  function handleRemove(productId) {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }

  function handleConfirmPayment(payment) {
    const session = getSession();
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const sale = addSale({
      items: cart,
      total,
      cashier: session?.name || "Kasir",
      channel: "Kasir Toko",
      paymentMethod: payment?.method || "QRIS",
      cashReceived: payment?.method === "Tunai" ? payment.cashReceived : null,
      change: payment?.method === "Tunai" ? payment.change : null,
      status: "Lunas",
    });
    setReceipt(sale);
    setCart([]);
    setShowPayment(false);
    refreshProducts();
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kasir</h1>
          <p className="text-inkSoft text-sm">Pilih kripik, cek stok, lalu bayar dengan QRIS atau tunai.</p>
        </div>
        <input
          className="input-field max-w-xs"
          placeholder="Cari kripik..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <ProductGrid products={filteredProducts} onAdd={handleAdd} cart={cart} />
        <CartPanel
          cart={cart}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
          onCheckout={() => setShowPayment(true)}
        />
      </div>

      {showPayment && (
        <PaymentModal total={total} onClose={() => setShowPayment(false)} onConfirm={handleConfirmPayment} />
      )}

      {receipt && (
        <InvoiceModal
          sale={receipt}
          title="Transaksi Berhasil"
          closeLabel="Transaksi Baru"
          onClose={() => setReceipt(null)}
        />
      )}
    </div>
  );
}
