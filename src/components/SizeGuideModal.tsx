"use client";

import { X } from "lucide-react";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const sizeData = [
  { us: "US 7", uk: "UK 6", eu: "EU 40", cm: "25" },
  { us: "US 8", uk: "UK 7", eu: "EU 41", cm: "26" },
  { us: "US 9", uk: "UK 8", eu: "EU 42.5", cm: "27" },
  { us: "US 10", uk: "UK 9", eu: "EU 44", cm: "28" },
  { us: "US 11", uk: "UK 10", eu: "EU 45", cm: "29" },
  { us: "US 12", uk: "UK 11", eu: "EU 46.5", cm: "30" },
];

export default function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[80]" onClick={onClose} />
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#1A1A2E] rounded-3xl max-w-lg w-full p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#16213E] dark:text-[#F8F9FA]">Size Guide</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2D2D4A] rounded-full transition-colors"><X size={18} /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8F9FA] dark:bg-[#0F0F1A]">
                  <th className="px-4 py-3 text-left font-medium text-[#16213E] dark:text-[#F8F9FA]">US</th>
                  <th className="px-4 py-3 text-left font-medium text-[#16213E] dark:text-[#F8F9FA]">UK</th>
                  <th className="px-4 py-3 text-left font-medium text-[#16213E] dark:text-[#F8F9FA]">EU</th>
                  <th className="px-4 py-3 text-left font-medium text-[#16213E] dark:text-[#F8F9FA]">Foot (cm)</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row) => (
                  <tr key={row.us} className="border-t border-gray-100 dark:border-[#2D2D4A]">
                    <td className="px-4 py-3 text-[#16213E] dark:text-[#F8F9FA]">{row.us}</td>
                    <td className="px-4 py-3 text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{row.uk}</td>
                    <td className="px-4 py-3 text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{row.eu}</td>
                    <td className="px-4 py-3 text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{row.cm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-4">Measure your foot from heel to toe and match with the CM column.</p>
        </div>
      </div>
    </>
  );
}
