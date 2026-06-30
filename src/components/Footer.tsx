import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerSections = [
  {
    title: "About",
    links: ["Our Story", "Careers", "Press", "Blog"],
  },
  {
    title: "Quick Links",
    links: ["Track Order", "Returns", "FAQ", "Size Guide"],
  },
  {
    title: "Categories",
    links: ["Men", "Women", "Kids", "Sports"],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#E94560] to-[#FF6B6B] bg-clip-text text-transparent">
              SOLEMATE
            </span>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium sneakers crafted for comfort &amp; style. Redefine your stride with every step.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E94560] transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((p) => (
                <span key={p} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-400 font-medium border border-white/5">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SOLEMATE. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
