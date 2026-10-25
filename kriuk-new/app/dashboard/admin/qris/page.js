"use client";

import { useEffect, useRef, useState } from "react";
import { getSettings, saveSettings } from "@/lib/data";

export default function QrisSettingsPage() {
  const [qrisImage, setQrisImage] = useState(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setQrisImage(getSettings().qrisImage);
  }, []);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setQrisImage(reader.result);
      setSaved(false);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    saveSettings({ qrisImage });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleRemove() {
    setQrisImage(null);
    saveSettings({ qrisImage: null });
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Pengaturan QRIS</h1>
        <p className="text-inkSoft text-sm">
          Unggah gambar kode QRIS toko. Gambar ini akan tampil otomatis di layar pembayaran kasir dan reseller.
        </p>
      </div>

      <div className="card p-6 max-w-lg">
        <div className="bg-white border-2 border-dashed border-line rounded-xl aspect-square flex items-center justify-center overflow-hidden mb-5">
          {qrisImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrisImage} alt="Preview QRIS" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center text-inkSoft text-sm px-8">
              Belum ada gambar QRIS. Unggah file gambar kode QRIS toko Anda.
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex gap-3">
          <button onClick={() => fileInputRef.current?.click()} className="btn-secondary flex-1 text-center">
            Pilih Gambar
          </button>
          <button onClick={handleSave} disabled={!qrisImage} className="btn-primary flex-1 text-center disabled:bg-line disabled:text-inkSoft/60 disabled:shadow-none">
            {saved ? "Tersimpan ✓" : "Simpan QRIS"}
          </button>
        </div>
        {qrisImage && (
          <button onClick={handleRemove} className="text-chili text-sm font-medium mt-4 hover:underline">
            Hapus gambar QRIS
          </button>
        )}
      </div>
    </div>
  );
}
