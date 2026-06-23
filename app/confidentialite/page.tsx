import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité — FNIX",
};

export default function ConfidentialitePage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-[6vw] py-16 max-w-[760px] mx-auto w-full">
        <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase">
          Légal
        </span>
        <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,5vw,3rem)] text-[#f4f4f3] uppercase tracking-[1px] mt-2 mb-12">
          Politique de confidentialité
        </h1>

        <div className="space-y-10 font-[family-name:var(--font-archivo)] text-[15px] text-[#9a9aa0] leading-[1.7]">

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              1. Responsable du traitement
            </h2>
            <p>
              Felix madalena Jônantas, 14A rue de plaisance, 35000 Rennes, France.
              Contact :{" "}
              <a href="mailto:j.felixmadalena@gmail.com" className="text-[#1183E6] hover:text-[#2e97f5] transition-colors">
                j.felixmadalena@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              2. Données collectées
            </h2>
            <p>Lors d&apos;une commande, les données suivantes sont collectées :</p>
            <ul className="mt-3 space-y-1 list-disc list-inside pl-2">
              <li>Prénom et nom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse de livraison</li>
              <li>Note optionnelle liée à la commande</li>
            </ul>
            <p className="mt-3">
              Aucune donnée bancaire n&apos;est collectée. Le paiement est réalisé directement
              via l&apos;application Wero, externe à ce site.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              3. Finalité du traitement
            </h2>
            <p>Les données sont utilisées exclusivement pour :</p>
            <ul className="mt-3 space-y-1 list-disc list-inside pl-2">
              <li>Le traitement et le suivi de la commande</li>
              <li>La préparation et l&apos;expédition du colis</li>
              <li>La communication avec l&apos;acheteur relative à sa commande</li>
            </ul>
            <p className="mt-3">
              Les données ne sont utilisées à aucune fin commerciale ou marketing.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              4. Base légale
            </h2>
            <p>
              Le traitement est fondé sur l&apos;exécution du contrat de vente (article 6.1.b du RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              5. Durée de conservation
            </h2>
            <p>
              Les données sont conservées pendant <strong className="text-[#cfcfd4]">3 ans</strong> à
              compter de la date de commande, conformément au délai de prescription légale applicable
              aux obligations contractuelles.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              6. Destinataires des données
            </h2>
            <p>
              Les données sont accessibles uniquement par l&apos;éditeur du site. Elles sont hébergées
              par <strong className="text-[#cfcfd4]">Supabase</strong> (serveurs en Europe) et
              par <strong className="text-[#cfcfd4]">Vercel Inc.</strong> (États-Unis), dans le
              cadre du fonctionnement technique du site. Ces prestataires agissent en qualité de
              sous-traitants et ne sont pas autorisés à utiliser les données à d&apos;autres fins.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              7. Transferts hors UE
            </h2>
            <p>
              L&apos;hébergement du site via Vercel implique un transfert de données vers les États-Unis.
              Ce transfert est encadré par les clauses contractuelles types de la Commission
              européenne.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              8. Cookies
            </h2>
            <p>
              Ce site n&apos;utilise pas de cookies publicitaires ou de tracking. Seuls des cookies
              techniques strictement nécessaires au fonctionnement du site peuvent être déposés.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              9. Vos droits
            </h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside pl-2">
              <li>Droit d&apos;accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez :{" "}
              <a href="mailto:j.felixmadalena@gmail.com" className="text-[#1183E6] hover:text-[#2e97f5] transition-colors">
                j.felixmadalena@gmail.com
              </a>
              . Une réponse sera apportée dans un délai d&apos;un mois.
            </p>
            <p className="mt-3">
              Vous pouvez également introduire une réclamation auprès de la{" "}
              <strong className="text-[#cfcfd4]">CNIL</strong> (Commission Nationale de l&apos;Informatique
              et des Libertés) si vous estimez que vos droits ne sont pas respectés.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              10. Mise à jour
            </h2>
            <p>
              Cette politique peut être mise à jour à tout moment. La date de dernière mise à jour
              est le <strong className="text-[#cfcfd4]">23 juin 2026</strong>.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
