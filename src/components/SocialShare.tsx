"use client";

import { Share2, Facebook, Twitter, Link2, Check } from "lucide-react";
import { useState } from "react";

export default function SocialShare() {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#6C757D] font-medium">Share:</span>
      <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors" aria-label="Share on Facebook">
        <Facebook size={14} className="text-blue-600" />
      </button>
      <button className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center hover:bg-sky-200 transition-colors" aria-label="Share on Twitter">
        <Twitter size={14} className="text-sky-600" />
      </button>
      <button onClick={copyLink} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Copy link">
        {copied ? <Check size={14} className="text-green-600" /> : <Link2 size={14} className="text-[#6C757D]" />}
      </button>
    </div>
  );
}
