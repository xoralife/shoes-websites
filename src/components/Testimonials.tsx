import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    text: "The most comfortable sneakers I have ever worn. Perfect for my daily runs and gym sessions. Highly recommend!",
    rating: 5,
    initials: "SJ",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Michael Chen",
    role: "Fashion Blogger",
    text: "Amazing quality and style. These shoes turn heads everywhere I go. The leather finish is premium.",
    rating: 5,
    initials: "MC",
    color: "from-purple-400 to-purple-600",
  },
  {
    name: "Emily Rodriguez",
    role: "Yoga Instructor",
    text: "Finally found shoes that are both stylish and comfortable. My feet feel supported all day long.",
    rating: 4,
    initials: "ER",
    color: "from-pink-400 to-pink-600",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#F8F9FA] dark:bg-[#0F0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#E94560] dark:text-[#FF6B6B] font-semibold text-sm tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] dark:text-[#F8F9FA] mt-2">What Our Customers Say</h2>
          <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-3 max-w-md mx-auto">
            Real reviews from real customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, text, rating, initials, color }) => (
            <div
              key={name}
              className="bg-white rounded-2xl p-8 card-shadow card-hover relative"
            >
              <Quote size={32} className="text-[#E94560] dark:text-[#FF6B6B]/10 absolute top-6 right-6" />

              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {initials}
                </div>
                <div>
                  <h4 className="font-semibold text-[#16213E] dark:text-[#F8F9FA]">{name}</h4>
                  <p className="text-sm text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{role}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < rating ? "fill-[#FEEFC0] text-[#FEEFC0]" : "text-gray-300 dark:text-gray-600"}
                  />
                ))}
              </div>

              <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 leading-relaxed">&ldquo;{text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
