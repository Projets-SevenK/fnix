export default function StorySection() {
  return (
    <section
      id="histoire"
      className="relative overflow-hidden px-[6vw] py-24 border-t border-white/[0.06]"
      style={{ background: "#08080a" }}
      aria-labelledby="story-heading"
    >
      {/* 44 watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-[-60px] right-[4vw] font-[family-name:var(--font-anton)] text-[340px] leading-[0.7] text-white/[0.025]"
      >
        44
      </span>

      <div className="relative z-10 max-w-[1180px] mx-auto">
        <div className="max-w-[780px]">
          <p className="font-[family-name:var(--font-space-mono)] text-[12px] tracking-[3px] text-[#1183E6] uppercase mb-5">
            {"// Histoire"}
          </p>

          <h2
            id="story-heading"
            className="font-[family-name:var(--font-anton)] text-[44px] md:text-[56px] leading-[1.04] text-[#f4f4f3] uppercase tracking-[-0.01em] mb-[30px]"
          >
            Une marque née
            <br />
            d&apos;un héritage
          </h2>

          <p className="font-[family-name:var(--font-archivo)] text-[17px] md:text-[19px] text-[#b9b9bf] leading-[1.75] max-w-[680px]">
            FNIX est né d&apos;un hommage familial. Le nom réunit{" "}
            <strong className="text-white font-semibold">Félix</strong>, le
            prénom du père du créateur, et le{" "}
            <strong className="text-white font-semibold">ñ</strong> inspiré de
            sa mère, <strong className="text-white font-semibold">Madalena</strong>
            . Le point bleu symbolise son attachement à cette couleur, mais
            aussi la confiance, l&apos;évolution et la profondeur. FNIX porte
            une vision&nbsp;:{" "}
            <strong className="text-[#1183E6] font-semibold">
              avancer avec ambition, sans oublier le respect.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
