"use client";

export default function ProductImage({ src, name, color = "#EFA23E", className = "" }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={`object-cover ${className}`} />;
  }
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ backgroundColor: color + "26" }}
      role="img"
      aria-label={`${name} (belum ada foto)`}
    >
      <svg viewBox="0 0 80 80" className="w-1/2 h-1/2 max-w-[72px]" fill="none">
        <path
          d="M10 44c0-18 14-30 30-30s30 12 30 30-12 22-30 22S10 62 10 44z"
          fill={color}
        />
        <circle cx="30" cy="38" r="3" fill="#FCF3E3" opacity="0.8" />
        <circle cx="46" cy="32" r="3" fill="#FCF3E3" opacity="0.8" />
        <circle cx="50" cy="48" r="3" fill="#FCF3E3" opacity="0.8" />
        <circle cx="34" cy="53" r="3" fill="#FCF3E3" opacity="0.8" />
      </svg>
    </div>
  );
}
