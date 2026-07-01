"use client";

import { useState } from "react";
import { X, Ruler } from "lucide-react";

const sizeChart = [
  { us: "7", uk: "6", eu: "40", cm: "25" },
  { us: "8", uk: "7", eu: "41", cm: "26" },
  { us: "9", uk: "8", eu: "42", cm: "27" },
  { us: "10", uk: "9", eu: "43", cm: "28" },
  { us: "11", uk: "10", eu: "44", cm: "29" },
  { us: "12", uk: "11", eu: "45", cm: "30" },
];

export default function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-sm text-[#E94560] dark:text-[#FF6B6B] hover:underline flex items-center gap-1">
        <Ruler size={14} /> Size Guide
      </button>
      {open && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[80]" onClick={() => setOpen(false)} />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#16213E] dark:text-[#F8F9FA]">Size Guide</h3>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 dark:bg-[#2D2D4A] rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-[#2D2D4A]">
                    <th className="py-2 text-left text-[#6C757D] dark:text-gray-400 dark:text-gray-500 font-medium">US</th>
                    <th className="py-2 text-left text-[#6C757D] dark:text-gray-400 dark:text-gray-500 font-medium">UK</th>
                    <th className="py-2 text-left text-[#6C757D] dark:text-gray-400 dark:text-gray-500 font-medium">EU</th>
                    <th className="py-2 text-left text-[#6C757D] dark:text-gray-400 dark:text-gray-500 font-medium">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((s) => (
                    <tr key={s.us} className="border-b border-gray-100 dark:border-[#2D2D4A]">
                      <td className="py-2 font-medium text-[#16213E] dark:text-[#F8F9FA]">{s.us}</td>
                      <td className="py-2 text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{s.uk}</td>
                      <td className="py-2 text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{s.eu}</td>
                      <td className="py-2 text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{s.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-4">Measure from heel to longest toe. If between sizes, go half size up.</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
