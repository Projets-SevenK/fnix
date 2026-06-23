const values = [
  {
    number: "01",
    title: "Respect",
    description:
      "Une valeur qui se perd aujourd'hui. FNIX la remet au centre.",
  },
  {
    number: "02",
    title: "Ambition",
    description: "Commencer petit, viser grand. Construire quelque chose de fort.",
  },
  {
    number: "03",
    title: "Évolution",
    description: "Avancer, drop après drop. Le 044 n'est qu'un début.",
  },
];

export default function ValuesSection() {
  return (
    <section
      className="px-[6vw] py-24 bg-[#060608]"
      aria-label="Les valeurs FNIX"
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((value) => (
            <article
              key={value.number}
              className="bg-[#0c0c0f] border border-white/[0.08] rounded-[16px] p-[34px]"
            >
              {/* Blue bar accent */}
              <div className="w-[34px] h-1 bg-[#1183E6] mb-[26px]" />

              {/* Number */}
              <p className="font-[family-name:var(--font-space-mono)] text-[12px] text-[#56565c] tracking-[2px] mb-2">
                {value.number}
              </p>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-anton)] text-[34px] text-[#f4f4f3] uppercase mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="font-[family-name:var(--font-archivo)] text-[15px] text-[#9a9aa0] leading-[1.6]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
