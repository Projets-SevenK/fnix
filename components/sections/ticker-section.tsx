const TICKER_CONTENT = [
  { text: "DROP 044 ", dim: true },
  { text: "·", accent: true },
  { text: " STOCK LIMITÉ ", dim: false },
  { text: "·", accent: true },
  { text: " PREMIER DROP FNIX ", dim: true },
  { text: "·", accent: true },
  { text: " LIVRAISON LA POSTE ", dim: false },
  { text: "·", accent: true },
  { text: " RESPECT · AMBITION · ÉVOLUTION ", dim: true },
  { text: "· ", accent: true },
];

export default function TickerSection() {
  // Duplicate content for seamless loop
  const items = [...TICKER_CONTENT, ...TICKER_CONTENT];

  return (
    <div
      className="overflow-hidden whitespace-nowrap border-t border-white/[0.07] border-b"
      style={{ background: "#08080a", padding: "14px 0" }}
      aria-hidden="true"
    >
      <div
        className="inline-block animate-marquee font-[family-name:var(--font-anton)] text-[18px] tracking-[6px] uppercase"
      >
        {items.map((item, index) => (
          <span
            key={index}
            style={{
              color: item.accent
                ? "#1183E6"
                : item.dim
                  ? "#56565c"
                  : "#cfcfd4",
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
