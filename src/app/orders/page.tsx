"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, ArrowLeft, ChevronDown, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

interface Order {
  id: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  shipping: number;
  paymentMethod: string;
  customer: Record<string, string>;
  date: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("solemate-orders");
    if (saved) setOrders(JSON.parse(saved).reverse());
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0F0F1A]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-[#6C757D] dark:text-gray-400 dark:text-gray-500 hover:text-[#E94560] dark:text-[#FF6B6B] transition-colors mb-6">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          <div className="flex items-center gap-3 mb-8">
            <Package size={28} className="text-[#E94560] dark:text-[#FF6B6B]" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#16213E] dark:text-[#F8F9FA]">Order History</h1>
            <span className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 text-sm">({orders.length} orders)</span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h2 className="text-xl font-bold text-[#16213E] dark:text-[#F8F9FA] mb-2">No orders yet</h2>
              <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mb-6">Start shopping to see your orders here.</p>
              <button onClick={() => router.push("/")} className="px-8 py-3 rounded-xl bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-[#1A1A2E] rounded-2xl card-shadow overflow-hidden">
                  <button onClick={() => setExpanded(expanded === order.id ? null : order.id)} className="w-full flex items-center justify-between p-5 text-left">
                    <div>
                      <p className="font-semibold text-[#16213E] dark:text-[#F8F9FA] text-sm">{order.id}</p>
                      <p className="text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-0.5">{new Date(order.date).toLocaleDateString()} &middot; {order.items.length} items</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#16213E] dark:text-[#F8F9FA]">${order.total.toFixed(2)}</span>
                      <ChevronDown size={18} className={`text-[#6C757D] dark:text-gray-400 dark:text-gray-500 transition-transform duration-300 ${expanded === order.id ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  {expanded === order.id && (
                    <div className="px-5 pb-5 space-y-3 border-t border-gray-100 dark:border-[#2D2D4A] pt-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-[#16213E] dark:text-[#F8F9FA]">{item.name} <span className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500">x{item.quantity}</span></span>
                          <span className="font-medium text-[#16213E] dark:text-[#F8F9FA]">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-100 dark:border-[#2D2D4A] pt-3 space-y-1 text-sm">
                        <div className="flex justify-between text-[#6C757D] dark:text-gray-400 dark:text-gray-500"><span>Shipping</span><span>{order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}</span></div>
                        <div className="flex justify-between font-bold text-[#16213E] dark:text-[#F8F9FA]"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium pt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                        Delivered
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <MobileBottomNav />
      <CartSidebar />
      <Toast />
      <Footer />
    </div>
  );
}
