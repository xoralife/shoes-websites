"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim()) setMsg("");
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${open ? "bg-gray-200 rotate-90" : "bg-[#E94560] hover:bg-[#d63851]"}`} aria-label="Chat">
        {open ? <X size={22} className="text-[#1A1A2E]" /> : <MessageCircle size={22} className="text-white" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-scale-in">
          <div className="bg-[#1A1A2E] p-4 text-white">
            <p className="font-semibold text-sm">SOLEMATE Support</p>
            <p className="text-xs text-gray-400">Typically replies in 5min</p>
          </div>
          <div className="h-64 p-4 flex flex-col justify-end space-y-3">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-[#16213E] max-w-[80%] self-start">
              Hi! How can we help you today?
            </div>
          </div>
          <form onSubmit={send} className="p-3 border-t border-gray-100 flex gap-2">
            <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 rounded-xl bg-gray-100 text-sm focus:outline-none" />
            <button type="submit" className="px-4 py-2 rounded-xl bg-[#E94560] text-white text-sm font-medium hover:bg-[#d63851] transition-colors">Send</button>
          </form>
        </div>
      )}
    </>
  );
}
