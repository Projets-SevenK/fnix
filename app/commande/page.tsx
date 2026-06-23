import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import OrderForm from '@/components/forms/order-form';
import { getStock } from '@/lib/stock';
import { getSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Commander — FNIX Drop 044',
  description:
    'Commandez le T-shirt FNIX Drop 044, taille M. 7 pièces disponibles. Paiement via Wero.',
};

export default async function CommandePage() {
  const [stock, settings] = await Promise.all([getStock(), getSettings()]);

  // Fallback values if Supabase is not yet configured
  const remainingStock = stock?.remaining_stock ?? 7;
  const initialStock = stock?.initial_stock ?? 7;
  const productStatus = settings?.product_status ?? 'available';
  const productPrice = settings?.product_price ?? 44;

  // Disabled if stock is exhausted OR if the drop status overrides availability
  const stockAvailable = stock !== null ? (stock.is_available && stock.remaining_stock > 0) : true;
  const isAvailable = stockAvailable && productStatus === 'available';

  // Derive the unavailability message
  const unavailableMessage: string | null =
    productStatus === 'coming_soon'
      ? 'Bientôt disponible'
      : productStatus === 'sold_out'
        ? 'Épuisé'
        : !stockAvailable
          ? 'Drop épuisé'
          : null;

  const stockProgressWidth =
    initialStock > 0
      ? `${Math.round((remainingStock / initialStock) * 100)}%`
      : '0%';

  const stockLabel =
    remainingStock > 1
      ? `${remainingStock} pièces restantes`
      : remainingStock === 1
        ? '1 pièce restante'
        : 'Épuisé';

  return (
    <>
      <Header />

      <main className="flex-1 px-[6vw] py-16 max-w-[720px] mx-auto w-full">
        {/* Page header */}
        <div className="mb-10">
          <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#56565c] tracking-[2px] uppercase">
            Drop 044
          </span>
          <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,5vw,3rem)] text-[#f4f4f3] uppercase tracking-[1px] mt-2 mb-6">
            Passer ma commande
          </h1>

          {/* Product recap */}
          <div className="flex flex-wrap gap-3 items-center p-4 border border-white/[0.08] rounded-[8px] bg-[#0c0c0f]">
            <span className="font-[family-name:var(--font-archivo)] text-sm text-[#cfcfd4]">
              T-shirt FNIX Drop 044
            </span>
            <span className="text-white/[0.2]">·</span>
            <span className="font-[family-name:var(--font-space-mono)] text-sm text-[#cfcfd4]">
              Taille M
            </span>
            <span className="text-white/[0.2]">·</span>
            <span className="font-[family-name:var(--font-anton)] text-[18px] text-[#f4f4f3]">
              {productPrice} €
            </span>
            <span className="text-white/[0.2]">·</span>
            <span className="font-[family-name:var(--font-archivo)] text-sm text-[#86868c]">
              Frais de port offerts
            </span>
          </div>

          {/* Stock indicator */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-[3px] rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-[#1183E6] transition-all duration-500"
                style={{ width: stockProgressWidth }}
              />
            </div>
            <span className="flex items-center gap-2 shrink-0">
              {isAvailable ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1183E6] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1183E6]" />
                  </span>
                  <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#cfcfd4] tracking-[1px] uppercase">
                    {stockLabel}
                  </span>
                </>
              ) : (
                <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#ff6b6b] tracking-[1px] uppercase">
                  Épuisé
                </span>
              )}
            </span>
          </div>

          <p className="mt-5 font-[family-name:var(--font-archivo)] text-sm text-[#86868c] leading-relaxed">
            Remplis le formulaire ci-dessous. Après validation, tu recevras les
            instructions de paiement Wero avec ta référence de commande. Le
            paiement n&apos;est pas automatique.
          </p>
        </div>

        {/* Order form — disabled if stock is exhausted or drop status prevents ordering */}
        {isAvailable ? (
          <OrderForm />
        ) : (
          <div className="p-6 border border-white/[0.08] rounded-[8px] bg-[#0c0c0f] text-center">
            <p className="font-[family-name:var(--font-anton)] text-[1.5rem] text-[#f4f4f3] uppercase tracking-[1px] mb-2">
              {unavailableMessage ?? 'Drop épuisé'}
            </p>
            <p className="font-[family-name:var(--font-archivo)] text-sm text-[#86868c]">
              {productStatus === 'coming_soon'
                ? 'Le drop arrive bientôt. Suis FNIX sur les réseaux pour être le premier informé.'
                : 'Toutes les pièces ont été réservées. Suis FNIX sur les réseaux pour ne pas manquer le prochain drop.'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
