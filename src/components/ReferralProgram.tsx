import { Users, ArrowRight } from "lucide-react";

export default function ReferralProgram() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] rounded-3xl p-8 md:p-12 text-white text-center">
          <Users size={36} className="mx-auto mb-4 text-[#E94560]" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Refer a Friend</h2>
          <p className="text-gray-300 max-w-md mx-auto mb-6">Share the love! Get $20 for every friend who makes their first purchase.</p>
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all duration-300">
            Invite Friends <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
