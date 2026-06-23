import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import TickerSection from "@/components/sections/ticker-section";
import ProductSection from "@/components/sections/product-section";
import StorySection from "@/components/sections/story-section";
import ValuesSection from "@/components/sections/values-section";
import OrderSection from "@/components/sections/order-section";
import FaqSection from "@/components/sections/faq-section";
import { getSettings } from "@/lib/settings";
import { getStock } from "@/lib/stock";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [settings, stock] = await Promise.all([getSettings(), getStock()]);

  return (
    <>
      <Header />
      <main>
        <HeroSection heroImageUrl={settings?.hero_image_url ?? null} />
        <TickerSection />
        <ProductSection
          mainImageUrl={settings?.product_image_main_url ?? null}
          secondary1Url={settings?.product_image_secondary_1_url ?? null}
          secondary2Url={settings?.product_image_secondary_2_url ?? null}
          description={settings?.product_description ?? null}
          price={settings?.product_price ?? null}
          backMessage={settings?.product_back_message ?? null}
          remainingStock={stock?.remaining_stock ?? null}
        />
        <StorySection />
        <ValuesSection />
        <OrderSection price={settings?.product_price ?? null} />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
