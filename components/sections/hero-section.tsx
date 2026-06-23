import Image from "next/image";
import Button from "@/components/ui/button";

interface HeroSectionProps {
  heroImageUrl?: string | null;
}

export default function HeroSection({ heroImageUrl }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden flex items-center min-h-[760px]"
      style={{
        background:
          "radial-gradient(120% 120% at 82% 5%, #0d0f14 0%, #060608 56%)",
      }}
      aria-label="Présentation FNIX Drop 044"
    >
      {/* 44 watermark — decorative background number */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-50px] top-1/2 -translate-y-1/2 font-[family-name:var(--font-anton)] text-[640px] leading-[0.75] tracking-[-0.04em] text-white/[0.035]"
      >
        44
      </span>

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-[6vw] py-16 flex flex-col md:flex-row items-center gap-10">
        {/* Text column */}
        <div className="flex-1 max-w-[600px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-[10px] border border-[#1183E6]/55 bg-[#1183E6]/[0.08] px-4 py-[7px] rounded-full mb-[30px]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#1183E6] shadow-[0_0_10px_#1183E6]" />
            <span className="font-[family-name:var(--font-space-mono)] text-[12px] tracking-[3px] text-[#bcd9f5] uppercase">
              Première pièce · Drop 044
            </span>
          </div>

          {/* FNIX logo as hero heading */}
          <Image
            src="/fnix-logo.png"
            alt="FNIX"
            width={330}
            height={90}
            className="w-[330px] max-w-[80%] mb-6 ml-[-6px]"
            style={{ height: "auto" }}
            priority
            unoptimized
          />

          {/* Tagline */}
          <h1 className="font-[family-name:var(--font-anton)] text-[52px] md:text-[62px] leading-[1.04] text-[#f4f4f3] uppercase tracking-[-0.01em] mb-5">
            Respect.
            <br />
            Ambition.
            <br />
            <span className="text-[#1183E6]">Évolution.</span>
          </h1>

          <p className="font-[family-name:var(--font-archivo)] text-[16px] text-[#9a9aa0] leading-[1.6] max-w-[440px] mb-9">
            Une marque née d&apos;un héritage. Le premier drop&nbsp;: une
            première empreinte, simple et chargée de sens.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-[14px]">
            <Button href="/commande" variant="primary">
              Commander la pièce
            </Button>
            <Button href="/#histoire" variant="secondary">
              Découvrir l&apos;histoire
            </Button>
          </div>
        </div>

        {/* Product image — dynamic or placeholder */}
        {heroImageUrl ? (
          <div className="flex-none w-full md:w-[330px] h-[300px] md:h-[450px] rounded-[14px] overflow-hidden relative border border-white/[0.08]">
            <Image
              src={heroImageUrl}
              alt="T-shirt FNIX Drop 044"
              fill
              unoptimized
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 330px"
            />
          </div>
        ) : (
          <div
            className="flex-none w-full md:w-[330px] h-[300px] md:h-[450px] rounded-[14px] flex items-center justify-center relative border border-white/[0.08]"
            style={{
              background:
                "repeating-linear-gradient(135deg, #0d0d10 0, #0d0d10 11px, #131318 11px, #131318 22px)",
            }}
            aria-label="Emplacement visuel T-shirt FNIX Drop 044"
          >
            <span className="font-[family-name:var(--font-space-mono)] text-[12px] tracking-[2px] text-[#56565c] uppercase">
              [ T-shirt porté ]
            </span>
            <span className="absolute top-[14px] right-4 font-[family-name:var(--font-space-mono)] text-[11px] text-[#2f2f35] tracking-[2px]">
              044
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
