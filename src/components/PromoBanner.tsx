"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { Zap } from "lucide-react";

export default function PromoBanner() {
  const { days, hours, minutes, seconds } = useCountdown("2026-08-01T00:00:00");

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="gradient-coral py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Zap size={32} className="mx-auto text-white/80 mb-4" />

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Summer Sale - Up to 50% Off
        </h2>

        <p className="text-white/80 text-lg max-w-lg mx-auto mb-10">
          Limited time offer. Grab your favorite pair before they are gone!
        </p>

        <div className="flex justify-center gap-4 md:gap-8 mb-10">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
            { label: "Seconds", value: seconds },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-white">{pad(value)}</span>
              </div>
              <p className="text-white/70 text-xs mt-2 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        <a
          href="#featured"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-[#E94560] font-bold text-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Grab Now
          <Zap size={16} />
        </a>
      </div>
    </section>
  );
}
