import { Package, Clock, Globe, CreditCard } from "lucide-react";

const info = [
  { icon: Package, title: "Free Shipping", desc: "On orders over $99" },
  { icon: Clock, title: "Express Delivery", desc: "1-3 business days" },
  { icon: Globe, title: "Worldwide", desc: "Shipping to 50+ countries" },
  { icon: CreditCard, title: "Cash on Delivery", desc: "Pay when you receive" },
];

export default function ShippingInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#16213E] dark:text-[#F8F9FA] text-center mb-10">Shipping Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {info.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6 rounded-2xl bg-[#F8F9FA] dark:bg-[#0F0F1A]">
              <Icon size={28} className="mx-auto text-[#E94560] dark:text-[#FF6B6B] mb-3" />
              <h4 className="font-semibold text-[#16213E] dark:text-[#F8F9FA]">{title}</h4>
              <p className="text-sm text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
