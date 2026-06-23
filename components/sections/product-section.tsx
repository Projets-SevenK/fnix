import Image from "next/image";
import Button from "@/components/ui/button";

interface ProductSectionProps {
  mainImageUrl?: string | null;
  secondary1Url?: string | null;
  secondary2Url?: string | null;
  description?: string | null;
  price?: number | null;
  backMessage?: string | null;
  remainingStock?: number | null;
}

export default function ProductSection({
  mainImageUrl,
  secondary1Url,
  secondary2Url,
  description,
  price,
  backMessage,
  remainingStock,
}: ProductSectionProps) {
  const stockLabel = remainingStock != null ? `${remainingStock} pièce${remainingStock > 1 ? 's' : ''}` : '7 pièces';

  const productDetails = [
    { label: "Couleur", value: "Une seule" },
    { label: "Avant", value: "Logo FNIX" },
    { label: "Dos", value: backMessage ?? "Inscription FNIX" },
    { label: "Taille disponible", value: "M uniquement" },
    { label: "Stock", value: stockLabel, accent: true },
    { label: "Livraison", value: "La Poste" },
  ];
  return (
    <section
      id="produit"
      className="px-[6vw] py-24 bg-[#060608]"
      aria-labelledby="product-heading"
    >
      <div className="max-w-[1180px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-[14px] mb-[14px]">
          <span className="font-[family-name:var(--font-space-mono)] text-[12px] tracking-[3px] text-[#1183E6] uppercase">
            {"// La pièce"}
          </span>
          <span className="w-[30px] h-px bg-[#1183E6]/50" />
        </div>

        <h2
          id="product-heading"
          className="font-[family-name:var(--font-anton)] text-[44px] md:text-[54px] leading-[1.0] text-[#f4f4f3] uppercase tracking-[-0.01em] mb-[14px]"
        >
          La première pièce FNIX
        </h2>
        <p className="font-[family-name:var(--font-archivo)] text-[17px] text-[#9a9aa0] max-w-[560px] leading-[1.6] mb-12">
          {description
            ? description
            : <>Un t-shirt pensé comme une première empreinte&nbsp;: simple, direct,
          chargé de sens. Un seul modèle, pour le premier drop.</>}
        </p>

        {/* Grid: images left, product card right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Main image or placeholder */}
            {mainImageUrl ? (
              <div className="col-span-2 h-[300px] md:h-[380px] relative rounded-[14px] overflow-hidden border border-white/[0.08]">
                <Image
                  src={mainImageUrl}
                  alt="T-shirt FNIX Drop 044 — vue principale"
                  fill
                  unoptimized
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            ) : (
              <div
                className="col-span-2 h-[300px] md:h-[380px] relative rounded-[14px] flex items-center justify-center border border-white/[0.08]"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, #0d0d10 0, #0d0d10 11px, #131318 11px, #131318 22px)",
                }}
                aria-label="Visuel T-shirt porté — fille"
              >
                <span className="font-[family-name:var(--font-space-mono)] text-[12px] tracking-[2px] text-[#56565c] uppercase">
                  [ T-shirt porté — fille ]
                </span>
                <span className="absolute top-[14px] right-4 font-[family-name:var(--font-space-mono)] text-[11px] text-[#2f2f35] tracking-[2px]">
                  044
                </span>
              </div>
            )}

            {/* Secondary image 1 or placeholder */}
            {secondary1Url ? (
              <div className="h-[180px] md:h-[220px] relative rounded-[14px] overflow-hidden border border-white/[0.08]">
                <Image
                  src={secondary1Url}
                  alt="T-shirt FNIX Drop 044 — vue secondaire 1"
                  fill
                  unoptimized
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 50vw, 28vw"
                />
              </div>
            ) : (
              <div
                className="h-[180px] md:h-[220px] rounded-[14px] flex items-center justify-center border border-white/[0.08]"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, #0d0d10 0, #0d0d10 11px, #131318 11px, #131318 22px)",
                }}
                aria-label="Visuel T-shirt porté — garçon"
              >
                <span className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[2px] text-[#56565c] uppercase text-center">
                  [ T-shirt porté
                  <br />
                  garçon ]
                </span>
              </div>
            )}

            {/* Secondary image 2 or placeholder */}
            {secondary2Url ? (
              <div className="h-[180px] md:h-[220px] relative rounded-[14px] overflow-hidden border border-white/[0.08]">
                <Image
                  src={secondary2Url}
                  alt="T-shirt FNIX Drop 044 — vue secondaire 2"
                  fill
                  unoptimized
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 50vw, 28vw"
                />
              </div>
            ) : (
              <div
                className="h-[180px] md:h-[220px] rounded-[14px] flex items-center justify-center border border-white/[0.08]"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, #0d0d10 0, #0d0d10 11px, #131318 11px, #131318 22px)",
                }}
                aria-label="Détail logo avant du t-shirt"
              >
                <span className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[2px] text-[#56565c] uppercase">
                  [ Détail logo avant ]
                </span>
              </div>
            )}
          </div>

          {/* Product card */}
          <div className="bg-[#0c0c0f] border border-white/[0.08] rounded-[16px] p-[34px]">
            <div className="flex items-baseline justify-between mb-[6px]">
              <span className="font-[family-name:var(--font-anton)] text-[26px] text-[#f4f4f3] uppercase">
                T-shirt FNIX
              </span>
              <span className="font-[family-name:var(--font-space-mono)] text-[12px] text-[#1183E6] tracking-[2px]">
                044
              </span>
            </div>
            <p className="font-[family-name:var(--font-archivo)] text-[15px] text-[#9a9aa0] mb-6">
              Prix{" "}
              <span className="text-[#e6e6e8] font-semibold">
                {price != null ? `${price} €` : "à confirmer"}
              </span>
            </p>

            {/* Details list */}
            <dl className="border-t border-white/[0.08]">
              {productDetails.map((detail, index) => (
                <div
                  key={detail.label}
                  className={`flex justify-between py-[13px] ${
                    index < productDetails.length - 1
                      ? "border-b border-white/[0.06]"
                      : ""
                  }`}
                >
                  <dt className="font-[family-name:var(--font-archivo)] text-[14px] text-[#86868C]">
                    {detail.label}
                  </dt>
                  <dd
                    className={`font-[family-name:var(--font-archivo)] text-[14px] font-medium ${
                      detail.accent ? "text-[#1183E6] font-semibold" : "text-[#e6e6e8]"
                    }`}
                  >
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Button href="/commande" variant="primary" className="w-full mt-[26px]">
              Passer commande
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
