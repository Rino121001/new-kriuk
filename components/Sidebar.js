"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/data";

const NAV_ITEMS = {
  admin: [
    { href: "/dashboard/admin", label: "Ringkasan", icon: "chart" },
    { href: "/dashboard/admin/produk", label: "Produk & Stok", icon: "box" },
    { href: "/dashboard/admin/transaksi", label: "Riwayat & Invoice", icon: "receipt" },
    { href: "/dashboard/admin/qris", label: "Pengaturan QRIS", icon: "qr" },
  ],
  kasir: [
    { href: "/dashboard/kasir", label: "Kasir", icon: "cart" },
    { href: "/dashboard/kasir/riwayat", label: "Riwayat & Invoice", icon: "receipt" },
  ],
  reseller: [
    { href: "/dashboard/reseller", label: "Pesanan Delivery", icon: "moto" },
  ],
};

function Icon({ name }) {
  const common = "w-5 h-5";
  switch (name) {
    case "chart":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19V10M12 19V5M20 19v-7" strokeLinecap="round" />
        </svg>
      );
    case "box":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "qr":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" strokeLinecap="round" />
        </svg>
      );
    case "receipt":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cart":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
          <path d="M2 3h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.8L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "moto":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="5" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M5 18l3-8h5l3 4h2M8 10l2-4h3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ session }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = NAV_ITEMS[session.role] || [];

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <aside className="w-64 shrink-0 bg-ink text-cream flex flex-col min-h-screen">
      <div className="px-6 py-6 flex items-center gap-3 border-b border-cream/10">
        <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center font-display font-bold text-ink text-sm">
          BK
        </div>
        <span className="font-display font-semibold">Bintang Kriuk</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                active ? "bg-gold text-ink" : "text-cream/70 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              <Icon name={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-cream/10">
        <div className="px-3 mb-3">
          <p className="text-sm font-medium">{session.name}</p>
          <p className="text-xs text-cream/50 capitalize">{session.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-cream/70 hover:bg-chili hover:text-cream transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}
