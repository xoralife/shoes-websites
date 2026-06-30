import { Truck, Shield, RotateCcw, HeadphonesIcon } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above $99" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: RotateCcw, title: "30-Day Return", desc: "Easy returns policy" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Dedicated support" },
];

export default function FeatureStrip() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F8F9FA] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#E94560]/10 flex items-center justify-center shrink-0">
                <Icon size={22} className="text-[#E94560]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#16213E] text-sm">{title}</h4>
                <p className="text-xs text-[#6C757D]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
