import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#produit", label: "La pièce" },
  { href: "#histoire", label: "Histoire" },
  { href: "#commander", label: "Modalités" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header
      className="sticky top-0 z-60 flex items-center justify-between px-[6vw] py-4 border-b border-white/[0.07]"
      style={{
        background: "rgba(6,6,8,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {/* Logo */}
      <Link href="/" aria-label="FNIX — accueil">
        <Image
          src="/fnix-logo.png"
          alt="FNIX"
          width={120}
          height={32}
          className="h-8 w-auto"
          priority
        />
      </Link>

      {/* Desktop navigation */}
      <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-[34px]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-[family-name:var(--font-archivo)] text-sm font-medium text-[#cfcfd4] no-underline tracking-[0.3px] hover:text-[#1183E6] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/commande"
          className="font-[family-name:var(--font-archivo)] text-[13px] font-bold text-white bg-[#1183E6] px-[22px] py-[11px] rounded-[7px] no-underline hover:bg-[#2e97f5] transition-colors"
        >
          Commander
        </Link>
      </nav>

      {/* Mobile hamburger — visible only on small screens */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-2"
        aria-label="Ouvrir le menu"
      >
        <span className="w-[21px] h-[2px] bg-[#cfcfd4] block" />
        <span className="w-[21px] h-[2px] bg-[#cfcfd4] block" />
        <span className="w-[21px] h-[2px] bg-[#cfcfd4] block" />
      </button>
    </header>
  );
}
