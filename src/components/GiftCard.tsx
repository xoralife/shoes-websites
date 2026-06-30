import { Gift, ArrowRight } from "lucide-react";

export default function GiftCard() {
  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white rounded-3xl p-8 card-shadow">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E94560] to-[#FF6B6B] flex items-center justify-center">
              <Gift size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#16213E]">Gift Cards</h3>
              <p className="text-[#6C757D] text-sm">The perfect gift for every occasion</p>
            </div>
          </div>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all">
            Buy Now <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
