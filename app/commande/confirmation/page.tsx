import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getSettings } from '@/lib/settings';

export const metadata: Metadata = {
  title: 'Confirmation de commande — FNIX Drop 044',
  description: 'Votre commande FNIX a été enregistrée. Suivez les instructions Wero pour finaliser votre paiement.',
};

interface ConfirmationPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function isValidReference(ref: unknown): ref is string {
  if (typeof ref !== 'string') return false;
  return /^FNIX-044-\d{3}$/.test(ref);
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const [params, settings] = await Promise.all([searchParams, getSettings()]);
  const rawRef = params['ref'];
  const ref = Array.isArray(rawRef) ? rawRef[0] : rawRef;

  const weroPhone = settings?.wero_phone ?? '06 XX XX XX XX';
  const weroBeneficiary = settings?.wero_beneficiary_name ?? null;

  if (!isValidReference(ref)) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center px-[6vw] py-16">
          <div className="max-w-[520px] w-full text-center">
            <p className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase mb-4">
              Erreur
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-[2rem] text-[#f4f4f3] uppercase mb-4">
              Référence introuvable
            </h1>
            <p className="font-[family-name:var(--font-archivo)] text-sm text-[#86868c] mb-8">
              Aucune référence de commande valide n&apos;a été trouvée. Si tu
              viens de passer commande, contacte-nous à{' '}
              <a
                href="mailto:contact@fnix.fr"
                className="text-[#1183E6] hover:text-[#2e97f5] underline transition-colors"
              >
                contact@fnix.fr
              </a>
              .
            </p>
            <Link
              href="/commande"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-archivo)] text-sm font-medium text-[#cfcfd4] border border-white/[0.18] rounded-[7px] px-5 py-3 hover:border-[#1183E6] transition-colors"
            >
              Retour au formulaire
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="flex-1 px-[6vw] py-16 max-w-[720px] mx-auto w-full">
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-[#1183E6]" />
          <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase">
            Commande enregistrée
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,5vw,3rem)] text-[#f4f4f3] uppercase tracking-[1px] mb-3">
          Merci pour ta commande
        </h1>
        <p className="font-[family-name:var(--font-archivo)] text-[#86868c] text-sm mb-10">
          Ta commande a bien été enregistrée. Elle sera confirmée après
          réception et vérification manuelle du paiement Wero.
        </p>

        {/* Reference */}
        <div className="p-5 mb-8 border border-white/[0.08] rounded-[8px] bg-[#0c0c0f]">
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase mb-2">
            Ta référence de commande
          </p>
          <p className="font-[family-name:var(--font-anton)] text-[2rem] text-[#1183E6] tracking-[1px]">
            {ref}
          </p>
          <p className="font-[family-name:var(--font-archivo)] text-xs text-[#56565c] mt-2">
            Conserve cette référence — elle te sera demandée pour le paiement.
          </p>
        </div>

        {/* Order recap */}
        <div className="p-5 mb-8 border border-white/[0.08] rounded-[8px] bg-[#0c0c0f]">
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase mb-4">
            Récapitulatif
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-[family-name:var(--font-archivo)] text-sm text-[#cfcfd4]">
                T-shirt FNIX Drop 044
              </span>
              <span className="font-[family-name:var(--font-space-mono)] text-sm text-[#cfcfd4]">
                Taille M
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
              <span className="font-[family-name:var(--font-archivo)] text-sm text-[#86868c]">
                Frais de port
              </span>
              <span className="font-[family-name:var(--font-archivo)] text-sm text-[#86868c]">
                Offerts
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
              <span className="font-[family-name:var(--font-archivo)] text-sm font-semibold text-[#f4f4f3]">
                Total
              </span>
              <span className="font-[family-name:var(--font-anton)] text-[20px] text-[#f4f4f3]">
                44 €
              </span>
            </div>
          </div>
        </div>

        {/* Wero instructions */}
        <div className="p-5 mb-8 border border-[#1183E6]/30 rounded-[8px] bg-[#0c0c0f]">
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#1183E6]/70 tracking-[2px] uppercase mb-4">
            Instructions de paiement Wero
          </p>

          <ol className="flex flex-col gap-4">
            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-anton)] text-[18px] text-[#1183E6] leading-none mt-[2px]">
                1
              </span>
              <div>
                <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold text-[#f4f4f3] mb-1">
                  Ouvre ton application Wero
                </p>
                <p className="font-[family-name:var(--font-archivo)] text-sm text-[#86868c]">
                  Effectue un virement vers le numéro suivant :
                </p>
                <p className="font-[family-name:var(--font-space-mono)] text-[15px] text-[#f4f4f3] mt-1">
                  {weroPhone}
                </p>
                {weroBeneficiary && (
                  <p className="font-[family-name:var(--font-archivo)] text-[13px] text-[#86868c] mt-1">
                    Bénéficiaire : {weroBeneficiary}
                  </p>
                )}
                {weroPhone === '06 XX XX XX XX' && (
                  <p className="font-[family-name:var(--font-archivo)] text-[11px] text-[#56565c] mt-1">
                    (Le numéro définitif sera communiqué prochainement)
                  </p>
                )}
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-anton)] text-[18px] text-[#1183E6] leading-none mt-[2px]">
                2
              </span>
              <div>
                <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold text-[#f4f4f3] mb-1">
                  Indique le montant exact
                </p>
                <p className="font-[family-name:var(--font-space-mono)] text-[15px] text-[#f4f4f3]">
                  44,00 €
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-anton)] text-[18px] text-[#1183E6] leading-none mt-[2px]">
                3
              </span>
              <div>
                <p className="font-[family-name:var(--font-archivo)] text-sm font-semibold text-[#f4f4f3] mb-1">
                  Ajoute obligatoirement ta référence dans la note
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-2 mt-1 border border-[#1183E6]/30 rounded-[6px] bg-[#080810]">
                  <span className="font-[family-name:var(--font-space-mono)] text-[15px] text-[#1183E6]">
                    {ref}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-archivo)] text-xs text-[#56565c] mt-2">
                  Sans cette référence, ton paiement ne pourra pas être
                  associé à ta commande.
                </p>
              </div>
            </li>
          </ol>

          {/* Important notice */}
          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <p className="font-[family-name:var(--font-archivo)] text-[13px] text-[#86868c] leading-relaxed">
              <strong className="text-[#cfcfd4] font-semibold">
                Le paiement n&apos;est pas validé automatiquement.
              </strong>{' '}
              Ta commande sera confirmée après vérification manuelle du paiement
              Wero. Tu recevras une confirmation par e-mail une fois le paiement
              vérifié.
            </p>
          </div>
        </div>

        {/* Shipping delay */}
        <div className="p-5 mb-8 border border-white/[0.08] rounded-[8px] bg-[#0c0c0f]">
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase mb-2">
            Délai d&apos;expédition
          </p>
          <p className="font-[family-name:var(--font-archivo)] text-sm text-[#cfcfd4]">
            Expédition sous 3 à 5 jours ouvrés après confirmation du paiement.
          </p>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-archivo)] text-sm text-[#86868c] hover:text-[#cfcfd4] transition-colors"
        >
          <span aria-hidden="true">&larr;</span>
          Retour à l&apos;accueil
        </Link>
      </main>

      <Footer />
    </>
  );
}
