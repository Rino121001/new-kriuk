"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { formatRupiah } from "@/lib/data";

export default function SalesChart({ sales }) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  const data = days.map((d) => {
    const key = d.toDateString();
    const total = sales
      .filter((s) => new Date(s.date).toDateString() === key)
      .reduce((sum, s) => sum + s.total, 0);
    return {
      label: d.toLocaleDateString("id-ID", { weekday: "short" }),
      total,
    };
  });

  return (
    <div className="card p-5">
      <h2 className="font-display font-semibold text-lg text-ink mb-4">Grafik Penjualan 7 Hari</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#E7D2AE" />
          <XAxis dataKey="label" tick={{ fill: "#54443A", fontSize: 12 }} axisLine={{ stroke: "#E7D2AE" }} tickLine={false} />
          <YAxis
            tick={{ fill: "#54443A", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
          />
          <Tooltip
            cursor={{ fill: "#FCF3E3" }}
            formatter={(value) => formatRupiah(value)}
            contentStyle={{ borderRadius: 12, border: "2px solid #E7D2AE", fontFamily: "var(--font-body)" }}
          />
          <Bar dataKey="total" fill="#D6402A" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
