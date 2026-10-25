"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/data";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/login");
      return;
    }
    setSession(s);
    setChecked(true);
  }, [router]);

  if (!checked || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="font-display text-inkSoft">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar session={session} />
      <main className="flex-1 min-h-screen bg-cream px-8 py-8">{children}</main>
    </div>
  );
}
