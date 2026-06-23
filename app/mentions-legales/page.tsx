import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Mentions légales — FNIX",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-[6vw] py-16 max-w-[760px] mx-auto w-full">
        <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase">
          Légal
        </span>
        <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,5vw,3rem)] text-[#f4f4f3] uppercase tracking-[1px] mt-2 mb-12">
          Mentions légales
        </h1>

        <div className="space-y-10 font-[family-name:var(--font-archivo)] text-[15px] text-[#9a9aa0] leading-[1.7]">

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              Éditeur du site
            </h2>
            <p>
              Le site <strong className="text-[#cfcfd4]">fnix-brand.fr</strong> est édité par :
            </p>
            <ul className="mt-3 space-y-1 list-none pl-0">
              <li><span className="text-[#cfcfd4]">Nom :</span> Felix madalena Jônantas</li>
              <li><span className="text-[#cfcfd4]">Adresse :</span> 14A rue de plaisance, 35000 Rennes, France</li>
              <li>
                <span className="text-[#cfcfd4]">Email :</span>{" "}
                <a
                  href="mailto:j.felixmadalena@gmail.com"
                  className="text-[#1183E6] hover:text-[#2e97f5] transition-colors"
                >
                  j.felixmadalena@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              Directeur de la publication
            </h2>
            <p>Felix madalena Jônantas</p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              Hébergeur
            </h2>
            <ul className="space-y-1 list-none pl-0">
              <li><span className="text-[#cfcfd4]">Société :</span> Vercel Inc.</li>
              <li><span className="text-[#cfcfd4]">Adresse :</span> 340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis</li>
              <li>
                <span className="text-[#cfcfd4]">Site :</span>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1183E6] hover:text-[#2e97f5] transition-colors"
                >
                  vercel.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, logo, visuels) sont la propriété
              exclusive de Felix madalena Jônantas. Toute reproduction, distribution ou utilisation sans
              autorisation préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              Données personnelles
            </h2>
            <p>
              Les informations collectées lors d&apos;une commande sont traitées conformément à notre{" "}
              <a href="/confidentialite" className="text-[#1183E6] hover:text-[#2e97f5] transition-colors">
                politique de confidentialité
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-anton)] text-[1.1rem] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
              Contact
            </h2>
            <p>
              Pour toute question relative au site :{" "}
              <a
                href="mailto:j.felixmadalena@gmail.com"
                className="text-[#1183E6] hover:text-[#2e97f5] transition-colors"
              >
                j.felixmadalena@gmail.com
              </a>
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
