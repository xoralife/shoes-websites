"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, CreditCard, Shield, ArrowLeft, Trash2, Truck, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";

const paymentMethods = [
  { id: "card", name: "Credit Card", icon: CreditCard },
  { id: "paypal", name: "PayPal", icon: Shield },
  { id: "cod", name: "Cash on Delivery", icon: Truck },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, removeFromCart, incrementQuantity, decrementQuantity, openCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", zip: "" });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-[#16213E] mb-2">Your Cart is Empty</h1>
          <p className="text-[#6C757D] mb-6">Add some products before checking out.</p>
          <button onClick={() => router.push("/")} className="px-8 py-3 rounded-xl bg-[#E94560] text-white font-medium hover:bg-[#d63851] transition-all">
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = cartTotal;
  const shipping = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    const required = ["name", "email", "phone", "address", "city", "state", "zip"];
    const empty = required.filter((f) => !form[f as keyof typeof form].trim());
    if (empty.length > 0) return;

    setPlacing(true);
    const order = {
      id: `SOLE-${Date.now()}`,
      items: [...cart],
      total,
      shipping,
      paymentMethod,
      customer: form,
      date: new Date().toISOString(),
    };
    const orders = JSON.parse(localStorage.getItem("solemate-orders") || "[]");
    orders.push(order);
    localStorage.setItem("solemate-orders", JSON.stringify(orders));
    setTimeout(() => {
      localStorage.removeItem("solemate-cart");
      router.push(`/order/confirmation?id=${order.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[#6C757D] hover:text-[#E94560] transition-colors mb-6">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-[#16213E] mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 md:p-8 card-shadow">
                <h2 className="text-lg font-bold text-[#16213E] mb-5">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="sm:col-span-2 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                  <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                  <input placeholder="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                  <input placeholder="Street Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="sm:col-span-2 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                  <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                  <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                  <input placeholder="ZIP Code" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 card-shadow">
                <h2 className="text-lg font-bold text-[#16213E] mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map(({ id, name, icon: Icon }) => (
                    <label key={id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === id ? "border-[#E94560] bg-[#E94560]/5" : "border-gray-100 hover:border-gray-200"}`}>
                      <input type="radio" name="payment" value={id} checked={paymentMethod === id} onChange={() => setPaymentMethod(id)} className="accent-[#E94560]" />
                      <Icon size={20} className="text-[#E94560]" />
                      <span className="font-medium text-[#16213E] text-sm">{name}</span>
                    </label>
                  ))}
                </div>
                {paymentMethod === "card" && (
                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    <input placeholder="Card Number (4242 4242 4242 4242)" className="sm:col-span-2 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                    <input placeholder="MM/YY" className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                    <input placeholder="CVC" className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 card-shadow sticky top-28">
                <h2 className="text-lg font-bold text-[#16213E] mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FA]">
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                          <path d="M12 28 Q10 25 11 21 Q12 17 16 16 L24 15 Q28 14 29 17 Q30 20 28 22 L26 25 Q24 28 22 29 Q18 31 15 30 Q12 29 12 28Z" fill="#E94560" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#16213E] truncate">{item.name}</p>
                        <p className="text-xs text-[#6C757D]">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => decrementQuantity(item.id)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Minus size={10} /></button>
                        <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => incrementQuantity(item.id)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Plus size={10} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-[#6C757D] hover:text-[#E94560] p-1"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-[#6C757D]"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-[#6C757D]"><span>Shipping</span><span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : `$${shipping.toFixed(2)}`}</span></div>
                  <div className="flex justify-between text-lg font-bold text-[#16213E] pt-2 border-t border-gray-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full mt-6 py-3.5 rounded-xl bg-[#1A1A2E] text-white font-medium text-sm hover:bg-[#0F3460] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {placing ? "Placing Order..." : `Place Order - $${total.toFixed(2)}`}
                </button>
                <p className="text-xs text-[#6C757D] text-center mt-3 flex items-center justify-center gap-1"><Shield size={12} /> Secure SSL Encrypted Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <CartSidebar />
      <Toast />
      <Footer />
    </div>
  );
}
