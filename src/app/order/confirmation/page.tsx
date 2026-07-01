"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Package, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id") || `SOLE-${Date.now()}`;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-[#16213E] mb-3">Order Placed Successfully!</h1>
          <p className="text-[#6C757D] mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-[#6C757D] mb-8">
            Your order ID: <span className="font-bold text-[#16213E]">{orderId}</span>
          </p>

          <div className="bg-white rounded-2xl p-6 card-shadow mb-8 text-left">
            <h2 className="font-bold text-[#16213E] mb-4 flex items-center gap-2">
              <Package size={18} className="text-[#E94560]" /> Order Details
            </h2>
            <div className="space-y-2 text-sm text-[#6C757D]">
              <div className="flex justify-between"><span>Order ID</span><span className="font-medium text-[#16213E]">{orderId}</span></div>
              <div className="flex justify-between"><span>Status</span><span className="text-green-600 font-medium">Confirmed</span></div>
              <div className="flex justify-between"><span>Estimated Delivery</span><span className="font-medium text-[#16213E]">3-5 Business Days</span></div>
              <div className="flex justify-between"><span>Payment</span><span className="font-medium text-[#16213E]">Paid</span></div>
            </div>
          </div>

          <p className="text-sm text-[#6C757D] mb-6">A confirmation email has been sent to your email address.</p>

          <button onClick={() => router.push("/")} className="px-10 py-3.5 rounded-xl bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all">
            Continue Shopping
          </button>
        </div>
      </main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
