import { Award, ShieldCheck, RefreshCw, Truck } from "lucide-react";

const features = [
  { icon: Award, title: "Quality Guarantee", desc: "Premium materials only" },
  { icon: ShieldCheck, title: "Safe Shopping", desc: "Protected checkout" },
  { icon: RefreshCw, title: "Easy Exchange", desc: "Size exchanges free" },
  { icon: Truck, title: "Fast Delivery", desc: "2-5 business days" },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F8F9FA] hover:bg-white card-hover card-shadow transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#1A1A2E]/5 flex items-center justify-center mb-3">
            <Icon size={22} className="text-[#1A1A2E]" />
          </div>
          <h4 className="font-semibold text-[#16213E] text-sm">{title}</h4>
          <p className="text-xs text-[#6C757D] mt-1">{desc}</p>
        </div>
      ))}
    </div>
  );
}
