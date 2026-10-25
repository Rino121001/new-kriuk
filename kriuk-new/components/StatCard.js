export default function StatCard({ label, value, tone = "ink" }) {
  const toneClass = {
    ink: "text-ink",
    chili: "text-chili",
    gold: "text-gold-dark",
    leaf: "text-leaf-dark",
  }[tone];

  return (
    <div className="card p-5">
      <p className="text-sm text-inkSoft mb-1">{label}</p>
      <p className={`font-display font-bold text-2xl ${toneClass}`}>{value}</p>
    </div>
  );
}
