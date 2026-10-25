"use client";

import { useEffect, useState } from "react";
import { getProducts, addSale, getSession } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import CartPanel from "@/components/CartPanel";
import PaymentModal from "@/components/PaymentModal";
import InvoiceModal from "@/components/InvoiceModal";

export default function ResellerPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [address, setAddress] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState("");

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

  function handleCheckoutClick() {
    if (!buyerName.trim() || !address.trim()) {
      setError("Isi nama pembeli dan alamat pengiriman dulu ya.");
      return;
    }
    setError("");
    setShowPayment(true);
  }

  function handleConfirmPayment() {
    const session = getSession();
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const sale = addSale({
      items: cart,
      total,
      cashier: session?.name || "Reseller",
      channel: "Reseller Delivery",
      paymentMethod: "QRIS",
      status: "Lunas",
      buyerName,
      address,
    });
    setReceipt(sale);
    setCart([]);
    setBuyerName("");
    setAddress("");
    setShowPayment(false);
    refreshProducts();
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const extraFields = (
    <div className="border-t border-line mt-4 pt-4 space-y-3">
      <div>
        <label className="label-field">Nama Pembeli</label>
        <input
          className="input-field"
          placeholder="Nama penerima paket"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
        />
      </div>
      <div>
        <label className="label-field">Alamat Pengiriman</label>
        <textarea
          className="input-field resize-none"
          rows={2}
          placeholder="Alamat lengkap untuk delivery"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      {error && <p className="text-chili text-sm">{error}</p>}
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Pesanan Delivery</h1>
        <p className="text-inkSoft text-sm">Buatkan pesanan kripik untuk dikirim ke pembeli.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <ProductGrid products={products} onAdd={handleAdd} cart={cart} />
        <CartPanel
          cart={cart}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
          onCheckout={handleCheckoutClick}
          extraFields={extraFields}
        />
      </div>

      {showPayment && (
        <PaymentModal allowCash={false} total={total} onClose={() => setShowPayment(false)} onConfirm={handleConfirmPayment} />
      )}

      {receipt && (
        <InvoiceModal
          sale={receipt}
          title="Pesanan Dibuat"
          closeLabel="Buat Pesanan Baru"
          onClose={() => setReceipt(null)}
        />
      )}
    </div>
  );
}
