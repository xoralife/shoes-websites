import { RotateCcw, Check } from "lucide-react";

const policies = [
  "30-day easy returns from delivery date",
  "Items must be unworn with original tags",
  "Free return shipping on all orders",
  "Refund processed within 5-7 business days",
];

export default function ReturnPolicy() {
  return (
    <section className="py-16 bg-[#F8F9FA] dark:bg-[#0F0F1A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <RotateCcw size={32} className="mx-auto text-[#E94560] dark:text-[#FF6B6B] mb-3" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#16213E] dark:text-[#F8F9FA]">Return & Exchange Policy</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 card-shadow">
          <ul className="space-y-4">
            {policies.map((policy) => (
              <li key={policy} className="flex items-start gap-3">
                <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{policy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
