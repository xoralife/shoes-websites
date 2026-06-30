export default function Hero() {
  return (
    <section className="relative min-h-screen gradient-navy flex items-center overflow-hidden pt-16 md:pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E94560] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6B6B] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-[#E94560]/10 border border-[#E94560]/30 rounded-full text-[#E94560] text-sm font-semibold tracking-wider badge-pulse">
              NEW COLLECTION 2026
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="inline-block text-reveal overflow-hidden pr-1">Step Into</span>
              <br />
              <span className="inline-block bg-gradient-to-r from-[#E94560] via-[#FF6B6B] to-[#E94560] bg-clip-text text-transparent animate-gradient text-reveal-delay overflow-hidden pr-1">
                The Future
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-md">
              Premium sneakers crafted for comfort &amp; style. Redefine your stride with every step.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#featured"
                className="group inline-flex items-center px-8 py-3.5 rounded-full text-white font-semibold text-sm bg-[#E94560] hover:bg-[#d63851] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E94560]/30"
              >
                Shop Now
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="#categories"
                className="inline-flex items-center px-8 py-3.5 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white hover:text-[#1A1A2E] transition-all duration-300"
              >
                Explore
              </a>
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center animate-fade-in-up">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E94560]/20 to-transparent rounded-full blur-3xl" />

              <svg viewBox="0 0 400 400" className="w-full h-full floating" fill="none">
                <path
                  d="M120 280 Q100 250 110 210 Q120 170 160 160 L240 150 Q280 145 290 170 Q300 195 280 220 L260 250 Q240 280 220 290 Q180 310 150 300 Q120 290 120 280Z"
                  fill="url(#shoeGradient)" stroke="white" strokeWidth="2"
                />
                <path
                  d="M160 160 L180 130 Q190 115 210 120 L240 125 Q255 130 250 145 L240 155"
                  fill="url(#shoeGradient)" stroke="white" strokeWidth="2"
                />
                <circle cx="140" cy="270" r="20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
                <circle cx="260" cy="250" r="15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
                <defs>
                  <linearGradient id="shoeGradient" x1="100" y1="120" x2="300" y2="300">
                    <stop offset="0%" stopColor="#E94560" />
                    <stop offset="100%" stopColor="#FF6B6B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute top-10 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 floating">
              <p className="text-white font-bold text-lg">50% OFF</p>
              <p className="text-gray-300 text-xs">Limited Time</p>
            </div>

            <div className="absolute bottom-20 left-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 floating-delay">
              <p className="text-white font-bold text-sm">Free Shipping</p>
              <p className="text-gray-300 text-xs">On all orders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
