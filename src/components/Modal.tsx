"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[80] animate-fade-in" onClick={onClose} />
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-scale-in shadow-2xl" onClick={(e) => e.stopPropagation()}>
          {title && (
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <h2 className="text-lg font-bold text-[#16213E] dark:text-[#F8F9FA]">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:bg-[#2D2D4A] rounded-full transition-colors" aria-label="Close">
                <X size={18} />
              </button>
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
