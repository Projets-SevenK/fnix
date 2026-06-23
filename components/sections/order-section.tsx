import Button from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Choisis ta taille",
    description: "Taille M — seule taille disponible.",
  },
  {
    number: "02",
    title: "Renseigne tes infos",
    description: "Commande enregistrée.",
  },
  {
    number: "03",
    title: "Paiement manuel · Wero",
    description: "Via un lien externe.",
  },
  {
    number: "04",
    title: "Validation & envoi",
    description: "Après paiement, La Poste.",
  },
];

interface OrderSectionProps {
  price?: number | null;
}

export default function OrderSection({ price }: OrderSectionProps) {
  const orderSummary = [
    { label: "Produit", value: "T-shirt FNIX" },
    { label: "Drop", value: "044", mono: true, accent: true },
    { label: "Taille", value: "M uniquement", bold: true },
    { label: "Prix", value: `${price ?? 44}€`, bold: true },
    { label: "Stock disponible", value: "7 pièces", accent: true },
    { label: "Paiement", value: "Wero · manuel" },
    { label: "Livraison", value: "La Poste" },
    { label: "Statut", value: "validée après paiement", italic: true, dim: true },
  ];
  return (
    <section
      id="commander"
      className="px-[6vw] py-24 border-t border-white/[0.06]"
      style={{ background: "#08080a" }}
      aria-labelledby="order-heading"
    >
      <div className="max-w-[1180px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-[14px] mb-[14px]">
          <span className="font-[family-name:var(--font-space-mono)] text-[12px] tracking-[3px] text-[#1183E6] uppercase">
            {"// Commander"}
          </span>
          <span className="w-[30px] h-px bg-[#1183E6]/50" />
        </div>

        <h2
          id="order-heading"
          className="font-[family-name:var(--font-anton)] text-[40px] md:text-[50px] leading-[1.0] text-[#f4f4f3] uppercase tracking-[-0.01em] mb-[10px]"
        >
          Un processus simple
        </h2>

        <p className="font-[family-name:var(--font-archivo)] text-[16px] text-[#9a9aa0] max-w-[620px] leading-[1.55] mb-11">
          Ta commande est{" "}
          <strong className="text-[#e6e6e8] font-semibold">
            enregistrée à l&apos;envoi du formulaire
          </strong>
          . Le paiement Wero est{" "}
          <strong className="text-[#e6e6e8] font-semibold">manuel</strong> et
          se fait juste après&nbsp;: ta commande n&apos;est validée
          qu&apos;
          <strong className="text-[#1183E6] font-semibold">
            après réception du paiement
          </strong>
          .
        </p>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#0c0c0f] border border-white/[0.08] rounded-[14px] p-6"
            >
              <p className="font-[family-name:var(--font-anton)] text-[30px] text-[#1183E6] mb-[10px]">
                {step.number}
              </p>
              <p className="font-[family-name:var(--font-archivo)] font-semibold text-[15px] text-[#e6e6e8] mb-1">
                {step.title}
              </p>
              <p className="font-[family-name:var(--font-archivo)] text-[13px] text-[#86868C]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column layout: info + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
          {/* Info block */}
          <div className="bg-[#0c0c0f] border border-white/[0.08] rounded-[16px] p-[34px]">
            <h3 className="font-[family-name:var(--font-anton)] text-[22px] text-[#f4f4f3] uppercase mb-4">
              Prêt à commander&nbsp;?
            </h3>
            <p className="font-[family-name:var(--font-archivo)] text-[15px] text-[#9a9aa0] leading-[1.65] mb-6">
              Le formulaire de commande est sur la page suivante. Tu
              renseignes tes informations, ta commande est enregistrée, puis
              tu reçois les instructions pour le paiement Wero avec ta
              référence.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Un seul produit : T-shirt FNIX Drop 044",
                "Taille M uniquement — 7 pièces disponibles",
                "Paiement manuel via Wero après la commande",
                "La commande est validée après réception du paiement",
                "Expédition La Poste après validation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#1183E6] mt-[2px]">✓</span>
                  <span className="font-[family-name:var(--font-archivo)] text-[14px] text-[#cfcfd4]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Button href="/commande" variant="primary" className="w-full">
              Accéder au formulaire de commande
            </Button>
          </div>

          {/* Summary card */}
          <div
            className="rounded-[16px] p-[30px] border border-[#1183E6]/22"
            style={{
              background:
                "linear-gradient(180deg, #0e1015 0%, #0a0a0d 100%)",
            }}
          >
            <h3 className="font-[family-name:var(--font-anton)] text-[24px] text-[#f4f4f3] uppercase mb-[22px]">
              Résumé
            </h3>

            <dl className="border-t border-white/[0.08]">
              {orderSummary.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex justify-between py-3 ${
                    index < orderSummary.length - 1
                      ? "border-b border-white/[0.06]"
                      : ""
                  }`}
                >
                  <dt className="font-[family-name:var(--font-archivo)] text-[14px] text-[#86868C]">
                    {item.label}
                  </dt>
                  <dd
                    className={`font-[family-name:var(--font-archivo)] text-[14px] ${
                      item.accent
                        ? "text-[#1183E6] font-semibold"
                        : item.bold
                          ? "text-white font-bold"
                          : item.dim
                            ? "text-[#86868C] italic text-[13px]"
                            : "text-[#e6e6e8] font-medium"
                    } ${item.mono ? "font-[family-name:var(--font-space-mono)] tracking-[1px]" : ""}`}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Wero info notice */}
            <div className="mt-4 pt-[14px] border-t border-white/[0.07] font-[family-name:var(--font-archivo)] text-[12.5px] text-[#7a7a80] leading-[1.55]">
              <span className="text-[#1183E6]">★</span> Le paiement Wero est{" "}
              <span className="text-[#cfcfd4]">manuel</span> et intervient
              après l&apos;envoi du formulaire. Indique ta{" "}
              <span className="text-[#cfcfd4]">référence de commande</span>{" "}
              dans le message du paiement — ta commande sera validée dès
              réception.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
