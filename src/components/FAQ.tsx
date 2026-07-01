"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is your return policy?", a: "We offer 30-day easy returns for all unworn items in original packaging." },
  { q: "How long does shipping take?", a: "Standard shipping takes 3-7 business days. Express shipping is 1-3 business days." },
  { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. Shipping costs vary by location." },
  { q: "How do I find my size?", a: "Check our size guide for accurate measurements. We recommend going half size up if between sizes." },
  { q: "Are your shoes authentic?", a: "Yes, all products are 100% authentic sourced directly from manufacturers." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] dark:text-[#F8F9FA]">Frequently Asked Questions</h2>
          <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-3">Got questions? We have answers.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 dark:border-[#2D2D4A] rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-[#16213E] dark:text-[#F8F9FA]">{faq.q}</span>
                <ChevronDown size={18} className={`text-[#6C757D] dark:text-gray-400 dark:text-gray-500 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`px-6 transition-all duration-300 ${open === i ? "pb-4 max-h-40" : "max-h-0 pb-0"} overflow-hidden`}>
                <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
