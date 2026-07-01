"use client";

import { useState } from "react";
import { X, Share2, Link, Check } from "lucide-react";

interface ShareModalProps {
  productName: string;
  productUrl: string;
  open: boolean;
  onClose: () => void;
}

const shareOptions = [
  { name: "Copy Link", icon: Link, color: "bg-[#1A1A2E]" },
  { name: "Facebook", icon: Share2, color: "bg-[#1877F2]" },
  { name: "Twitter", icon: Share2, color: "bg-[#1DA1F2]" },
  { name: "WhatsApp", icon: Share2, color: "bg-[#25D366]" },
];

export default function ShareModal({ productName, productUrl, open, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${productUrl}` : productUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => { setCopied(false); onClose(); }, 1500);
  };

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(productName)}&url=${encodeURIComponent(fullUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(productName + " " + fullUrl)}`,
    };
    if (urls[platform]) window.open(urls[platform], "_blank", "noopener");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[80]" onClick={onClose} />
      <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4">
        <div className="bg-white dark:bg-[#1A1A2E] rounded-3xl w-full max-w-sm p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#16213E] dark:text-[#F8F9FA]">Share</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2D2D4A] rounded-full"><X size={18} /></button>
          </div>
          <p className="text-sm text-[#6C757D] dark:text-gray-400 mb-5 truncate">{productName}</p>
          <div className="flex gap-4 justify-center mb-5">
            {shareOptions.map(({ name, icon: Icon, color }) => (
              <button
                key={name}
                onClick={() => name === "Copy Link" ? handleCopy() : handleShare(name.toLowerCase())}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shadow-md hover:scale-110 transition-transform`}>
                  {copied && name === "Copy Link" ? <Check size={20} className="text-white" /> : <Icon size={20} className="text-white" />}
                </div>
                <span className="text-[10px] font-medium text-[#6C757D] dark:text-gray-400">{copied && name === "Copy Link" ? "Copied!" : name}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-[#0F0F1A] text-xs text-[#6C757D] truncate">
            <Link size={14} className="shrink-0" />
            <span className="truncate">{fullUrl}</span>
          </div>
        </div>
      </div>
    </>
  );
}
