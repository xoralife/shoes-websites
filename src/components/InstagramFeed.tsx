import { Instagram } from "lucide-react";

const posts = [
  { id: 1, tag: "#SOLEMATE", likes: "2.4k" },
  { id: 2, tag: "#StepInStyle", likes: "1.8k" },
  { id: 3, tag: "#SneakerHead", likes: "3.1k" },
  { id: 4, tag: "#ComfortFirst", likes: "1.2k" },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Instagram size={28} className="mx-auto text-[#E94560] dark:text-[#FF6B6B] mb-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] dark:text-[#F8F9FA]">Follow Us on Instagram</h2>
          <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-2">@solemate_official</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center card-hover cursor-pointer">
              <Instagram size={32} className="text-[#1A1A2E]/30 mb-2" />
              <p className="text-xs font-medium text-[#1A1A2E]">{post.tag}</p>
              <p className="text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500">{post.likes} likes</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
