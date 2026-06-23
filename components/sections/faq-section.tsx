"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "Comment se passe le paiement ?",
    answer:
      "Après l'envoi de ton formulaire, ta commande est enregistrée et tu reçois les instructions pour régler manuellement via Wero. Indique bien ta référence de commande dans le message du paiement.",
  },
  {
    question: "Quand ma commande est-elle validée ?",
    answer:
      "Ta commande n'est validée qu'après réception de ton paiement Wero. Le propriétaire vérifie chaque commande, puis la confirme avant expédition — tu reçois une confirmation par email.",
  },
  {
    question: "Comment se passe la livraison ?",
    answer:
      "Chaque pièce est expédiée via La Poste après validation du paiement. Le délai dépend de ta zone de livraison.",
  },
  {
    question: "Puis-je retourner le produit ?",
    answer:
      "Les modalités de retour seront précisées dans les conditions de vente. En cas de problème avec ta commande, tu peux contacter FNIX directement.",
  },
  {
    question: "Le t-shirt est-il disponible en plusieurs couleurs ?",
    answer:
      "Le premier drop FNIX est volontairement proposé en une seule couleur — une première empreinte. D'autres couleurs pourront suivre.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  function toggleItem(index: number) {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }

  return (
    <section
      id="faq"
      className="px-[6vw] py-24 bg-[#060608]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1180px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-[14px] mb-[14px]">
          <span className="font-[family-name:var(--font-space-mono)] text-[12px] tracking-[3px] text-[#1183E6] uppercase">
            {"// FAQ"}
          </span>
          <span className="w-[30px] h-px bg-[#1183E6]/50" />
        </div>

        <h2
          id="faq-heading"
          className="font-[family-name:var(--font-anton)] text-[40px] md:text-[50px] leading-[1.0] text-[#f4f4f3] uppercase tracking-[-0.01em] mb-10"
        >
          Questions fréquentes
        </h2>

        <div className="max-w-[860px]" role="list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-white/[0.08]"
                role="listitem"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center gap-[18px] py-[22px] cursor-pointer text-left bg-transparent border-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="font-[family-name:var(--font-space-mono)] text-[13px] text-[#1183E6] tracking-[1px] flex-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-[family-name:var(--font-archivo)] font-semibold text-[16px] md:text-[18px] transition-colors ${
                      isOpen ? "text-white" : "text-[#e6e6e8]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className="flex-none text-[26px] font-light leading-none transition-transform duration-250"
                    style={{
                      display: "inline-block",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      color: isOpen ? "#1183E6" : "#86868C",
                      transition: "transform 0.25s, color 0.25s",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "260px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.3s ease, opacity 0.25s",
                  }}
                >
                  <p className="pb-[22px] pl-[49px] font-[family-name:var(--font-archivo)] text-[15px] text-[#9a9aa0] leading-[1.65] max-w-[660px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
