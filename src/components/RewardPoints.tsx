import { Star, ArrowRight } from "lucide-react";

export default function RewardPoints() {
  return (
    <section className="py-12 bg-gradient-to-r from-[#FEEFC0] to-[#fff3d6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1A1A2E] flex items-center justify-center">
            <Star size={24} className="text-[#FEEFC0]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#16213E]">SOLEMATE Rewards</h3>
            <p className="text-sm text-[#6C757D]">Earn points on every purchase. 1 point = $0.10</p>
          </div>
        </div>
        <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A2E] text-white text-sm font-medium hover:bg-[#0F3460] transition-all">
          Join Free <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
