import Image from "next/image";
import Link from "next/link";

const followLinks = [
  { href: "#", label: "Instagram" },
  { href: "mailto:contact@fnix.fr", label: "Contact" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/[0.07] px-[6vw] pt-16 pb-12"
      style={{ background: "#08080a" }}
    >
      {/* 44 watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-[-50px] right-[5vw] font-[family-name:var(--font-anton)] text-[180px] leading-[0.7] text-white/[0.03]"
      >
        44
      </span>

      <div className="relative z-10 max-w-[1180px] mx-auto">
        {/* Top row */}
        <div className="flex flex-wrap justify-between items-start gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="FNIX — accueil">
              <Image
                src="/fnix-logo.png"
                alt="FNIX"
                width={140}
                height={38}
                className="h-[38px] w-auto mb-4"
              />
            </Link>
            <p className="font-[family-name:var(--font-anton)] text-[18px] text-[#cfcfd4] uppercase tracking-[1px]">
              Respect. Ambition. Évolution.
            </p>
          </div>

          {/* Links columns */}
          <div className="flex gap-[60px] flex-wrap">
            <div className="flex flex-col gap-[11px]">
              <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase mb-1">
                Suivre
              </span>
              {followLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-[family-name:var(--font-archivo)] text-[14px] text-[#cfcfd4] no-underline hover:text-[#1183E6] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-[11px]">
              <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase mb-1">
                Légal
              </span>
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-[family-name:var(--font-archivo)] text-[14px] text-[#cfcfd4] no-underline hover:text-[#1183E6] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap justify-between gap-[10px] pt-[22px] border-t border-white/[0.07] font-[family-name:var(--font-space-mono)] text-[12px] text-[#56565c] tracking-[1px]">
          <span>© 2026 FNIX · DROP 044</span>
          <Link href="/admin" className="text-[#56565c] hover:text-[#9a9aa0] transition-colors no-underline">
            Admin
          </Link>
          <span>FNIX-BRAND.FR</span>
        </div>
      </div>
    </footer>
  );
}
