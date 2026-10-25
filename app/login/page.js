"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/data";

const DEMO_ACCOUNTS = [
  { role: "Admin", username: "admin", password: "admin123" },
  { role: "Kasir", username: "kasir", password: "kasir123" },
  { role: "Reseller", username: "reseller", password: "reseller123" },
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = login(username, password);
    if (!user) {
      setError("Username atau kata sandi salah. Coba lagi ya.");
      return;
    }
    router.push(`/dashboard/${user.role}`);
  }

  function fillDemo(acc) {
    setUsername(acc.username);
    setPassword(acc.password);
    setError("");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Panel kiri - branding */}
      <div className="relative bg-chili text-cream flex flex-col justify-between px-10 py-12 overflow-hidden">
        <svg
          className="absolute -right-24 -top-24 w-96 h-96 opacity-20"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M100 0 L118 72 L192 72 L132 116 L154 190 L100 144 L46 190 L68 116 L8 72 L82 72 Z"
            fill="#FCF3E3"
          />
        </svg>
        <svg
          className="absolute -left-16 bottom-10 w-56 h-56 opacity-10"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="100" fill="#FCF3E3" />
        </svg>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-display font-bold text-ink">
            BK
          </div>
          <span className="font-display font-semibold tracking-tight">Bintang Kriuk</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-5xl font-bold leading-[1.05] mb-5">
            Renyah tiap gigitan,
            <br />
            rapi tiap catatan.
          </h1>
          <p className="text-cream/85 leading-relaxed">
            Satu aplikasi untuk kasir toko, admin gudang, dan reseller pengiriman.
            Masuk sesuai peran untuk mulai bekerja.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-sm text-cream/70">
          <span>Stok real-time</span>
          <span>Laporan penjualan</span>
          <span>Pembayaran QRIS</span>
        </div>
      </div>

      {/* Panel kanan - form login */}
      <div className="flex items-center justify-center px-6 py-16 bg-cream">
        <div className="w-full max-w-sm">
          <h2 className="font-display text-3xl font-bold text-ink mb-1">Masuk</h2>
          <p className="text-inkSoft mb-8">Gunakan akun yang sudah didaftarkan admin.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-field">Username</label>
              <input
                className="input-field"
                type="text"
                placeholder="contoh: kasir"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label-field">Kata Sandi</label>
              <input
                className="input-field"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-chili text-sm font-medium bg-chili/10 border border-chili/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary w-full text-center">
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-line">
            <p className="text-xs text-inkSoft mb-3 font-medium uppercase tracking-wide">
              Coba akun demo
            </p>
            <div className="flex flex-col gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => fillDemo(acc)}
                  className="flex items-center justify-between text-sm bg-paper border border-line rounded-lg px-3 py-2 hover:border-chili transition-colors"
                >
                  <span className="font-medium text-ink">{acc.role}</span>
                  <span className="text-inkSoft">{acc.username} / {acc.password}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
