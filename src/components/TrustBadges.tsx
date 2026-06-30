import { Shield, Lock, Leaf, Award } from "lucide-react";

const badges = [
  { icon: Shield, text: "Secure Checkout", sub: "SSL Encrypted" },
  { icon: Lock, text: "Privacy Protected", sub: "Your data is safe" },
  { icon: Leaf, text: "Eco Friendly", sub: "Sustainable materials" },
  { icon: Award, text: "1 Year Warranty", sub: "Against defects" },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map(({ icon: Icon, text, sub }) => (
            <div key={text} className="flex items-center gap-3 p-4 rounded-xl bg-white card-shadow">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Icon size={22} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-[#16213E] text-sm">{text}</p>
                <p className="text-xs text-[#6C757D]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
