"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandsStrip from "@/components/BrandsStrip";
import FeatureStrip from "@/components/FeatureStrip";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import BrandStory from "@/components/BrandStory";
import TrustBadges from "@/components/TrustBadges";
import BundleOffer from "@/components/BundleOffer";
import InstagramFeed from "@/components/InstagramFeed";
import RecentlyViewed from "@/components/RecentlyViewed";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import RewardPoints from "@/components/RewardPoints";
import GiftCard from "@/components/GiftCard";
import ReferralProgram from "@/components/ReferralProgram";
import ReturnPolicy from "@/components/ReturnPolicy";
import ShippingInfo from "@/components/ShippingInfo";
import OrderTracking from "@/components/OrderTracking";
import LiveChat from "@/components/LiveChat";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsent from "@/components/CookieConsent";
import NewsletterPopup from "@/components/NewsletterPopup";

function HomeContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  return (
    <>
      <Categories />
      <FeaturedProducts initialFilter={category} searchQuery={query} />
    </>
  );
}

function CategoriesFallback() {
  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#E94560] font-semibold text-sm tracking-wider uppercase">Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] mt-2">Shop By Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {["Men","Women","Kids","Sports"].map((name) => (
            <div key={name} className="flex flex-col items-center">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gray-200 animate-pulse" />
              <div className="mt-5 h-5 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <ScrollProgress />
      <Header />
      <Hero />
      <BrandsStrip />
      <FeatureStrip />
      <Suspense fallback={<CategoriesFallback />}>
        <HomeContent />
      </Suspense>
      <BrandStory />
      <BundleOffer />
      <TrustBadges />
      <PromoBanner />
      <Testimonials />
      <FAQ />
      <InstagramFeed />
      <RecentlyViewed />
      <RewardPoints />
      <GiftCard />
      <ReferralProgram />
      <ReturnPolicy />
      <ShippingInfo />
      <OrderTracking />
      <Newsletter />
      <LiveChat />
      <Footer />
      <CartSidebar />
      <Toast />
      <ScrollToTop />
      <CookieConsent />
      <NewsletterPopup />
    </main>
  );
}
