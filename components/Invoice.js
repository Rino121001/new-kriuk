"use client";

import { formatRupiah, getSettings } from "@/lib/data";

function invoiceNo(id) {
  return "INV-" + String(id).replace(/^TRX/, "");
}

export default function Invoice({ sale }) {
  const settings = getSettings();
  const date = new Date(sale.date);
  const isCash = sale.paymentMethod === "Tunai";
  const totalQty = sale.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div id="invoice-print" className="bg-white text-ink px-6 py-6 text-sm">
      <div className="text-center mb-4">
        <div className="w-11 h-11 rounded-full bg-chili text-cream flex items-center justify-center font-display font-bold mx-auto mb-2 print:bg-black">
          BK
        </div>
        <h2 className="font-display font-bold text-xl leading-tight">
          {settings.storeName || "Bintang Kriuk"}
        </h2>
        <p className="text-xs text-inkSoft">Aneka keripik renyah</p>
      </div>

      <div className="border-t-2 border-dashed border-line pt-3 pb-3 space-y-1 text-xs">
        <Row label="No. Invoice" value={invoiceNo(sale.id)} bold />
        <Row
          label="Tanggal"
          value={date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
        />
        <Row
          label="Jam"
          value={date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
        />
        <Row label="Petugas" value={sale.cashier} />
        <Row label="Kanal" value={sale.channel} />
        {sale.buyerName && <Row label="Pembeli" value={sale.buyerName} />}
        {sale.address && <Row label="Alamat" value={sale.address} />}
      </div>

      <div className="border-t-2 border-dashed border-line pt-3 pb-3">
        <div className="space-y-2.5">
          {sale.items.map((item) => (
            <div key={item.productId}>
              <p className="font-medium">{item.name}</p>
              <div className="flex justify-between text-xs text-inkSoft">
                <span>
                  {item.qty} x {formatRupiah(item.price)}
                </span>
                <span className="text-ink font-medium">{formatRupiah(item.qty * item.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-dashed border-line pt-3 space-y-1">
        <Row label={`Total (${totalQty} item)`} value={formatRupiah(sale.total)} bold large />
        <Row label="Metode bayar" value={isCash ? "Tunai (Cash)" : "QRIS"} />
        {isCash && (
          <>
            <Row label="Uang diterima" value={formatRupiah(sale.cashReceived)} />
            <Row label="Kembalian" value={formatRupiah(sale.change)} bold />
          </>
        )}
        <Row label="Status" value={sale.status} />
      </div>

      <p className="text-center text-xs text-inkSoft mt-5 border-t-2 border-dashed border-line pt-3">
        Terima kasih sudah jajan di Bintang Kriuk!
        <br />
        Simpan invoice ini sebagai bukti pembelian.
      </p>
    </div>
  );
}

function Row({ label, value, bold, large }) {
  return (
    <div className="flex justify-between gap-4">
      <span className={large ? "font-display font-semibold" : "text-inkSoft"}>{label}</span>
      <span
        className={`text-right ${bold ? "font-semibold" : ""} ${
          large ? "font-display font-bold text-lg" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
