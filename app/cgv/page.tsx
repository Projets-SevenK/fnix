import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Conditions générales de vente — FNIX",
};

export default function CGVPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-[6vw] py-16 max-w-[760px] mx-auto w-full">
        <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase">
          Légal
        </span>
        <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,5vw,3rem)] text-[#f4f4f3] uppercase tracking-[1px] mt-2 mb-12">
          Conditions générales de vente
        </h1>

        <div className="space-y-10 font-[family-name:var(--font-archivo)] text-[15px] text-[#9a9aa0] leading-[1.7]">

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              1. Vendeur
            </h2>
            <p>
              Les présentes CGV régissent les ventes conclues entre Felix madalena Jônantas
              (14A rue de plaisance, 35000 Rennes, France —{" "}
              <a href="mailto:j.felixmadalena@gmail.com" className="text-[#1183E6] hover:text-[#2e97f5] transition-colors">
                j.felixmadalena@gmail.com
              </a>
              ) et tout acheteur passant commande sur le site fnix-brand.fr.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              2. Produit
            </h2>
            <p>
              Le produit proposé est le <strong className="text-[#cfcfd4]">T-shirt FNIX Drop 044</strong>,
              taille M, en édition limitée à 7 exemplaires. Les caractéristiques essentielles du produit
              sont décrites sur le site. Les photographies sont non contractuelles.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              3. Prix
            </h2>
            <p>
              Le prix est indiqué en euros, toutes taxes comprises (TTC). Les frais de livraison sont
              offerts. Le prix applicable est celui affiché sur le site au moment de la commande.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              4. Commande
            </h2>
            <p>
              La commande est passée via le formulaire disponible sur le site. Elle est enregistrée
              avec le statut <strong className="text-[#cfcfd4]">en attente</strong> et une référence
              unique de type <span className="font-[family-name:var(--font-space-mono)] text-[#cfcfd4]">FNIX-044-XXX</span>.
              La commande n'est définitive qu'après réception et vérification du paiement.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              5. Paiement
            </h2>
            <p>
              Le paiement s'effectue manuellement via <strong className="text-[#cfcfd4]">Wero</strong>.
              Après validation du formulaire, l'acheteur reçoit les instructions de paiement avec
              le montant exact et la référence de commande à mentionner. Le paiement n'est pas
              automatique. Aucune donnée bancaire n'est collectée par le site.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              6. Disponibilité et stock
            </h2>
            <p>
              Les commandes sont acceptées dans la limite du stock disponible. En cas d'épuisement du
              stock après validation de la commande, l'acheteur en sera informé et remboursé intégralement.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              7. Livraison
            </h2>
            <p>
              La livraison est assurée par <strong className="text-[#cfcfd4]">La Poste</strong> en France
              métropolitaine. Un numéro de suivi est communiqué après expédition. Les délais de livraison
              sont indicatifs et peuvent varier.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              8. Droit de rétractation
            </h2>
            <p>
              Conformément aux articles L221-18 et suivants du Code de la consommation, l'acheteur
              dispose d'un délai de <strong className="text-[#cfcfd4]">14 jours</strong> à compter de
              la réception du produit pour exercer son droit de rétractation, sans avoir à justifier
              de motifs. Le retour est à la charge de l'acheteur. Le remboursement intervient dans
              les 14 jours suivant la réception du produit retourné.
            </p>
            <p className="mt-3">
              Pour exercer ce droit, contacter :{" "}
              <a href="mailto:j.felixmadalena@gmail.com" className="text-[#1183E6] hover:text-[#2e97f5] transition-colors">
                j.felixmadalena@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              9. Garanties légales
            </h2>
            <p>
              Le produit bénéficie de la garantie légale de conformité (articles L217-4 et suivants
              du Code de la consommation) et de la garantie contre les vices cachés (articles 1641
              et suivants du Code civil).
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              10. Réclamations et litiges
            </h2>
            <p>
              Toute réclamation peut être adressée à{" "}
              <a href="mailto:j.felixmadalena@gmail.com" className="text-[#1183E6] hover:text-[#2e97f5] transition-colors">
                j.felixmadalena@gmail.com
              </a>
              . En cas de litige non résolu à l'amiable, l'acheteur peut recourir à une médiation
              de la consommation conformément à l'article L612-1 du Code de la consommation.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              11. Droit applicable
            </h2>
            <p>
              Les présentes CGV sont soumises au droit français. Tout litige relève de la compétence
              des tribunaux du ressort de Rennes.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
