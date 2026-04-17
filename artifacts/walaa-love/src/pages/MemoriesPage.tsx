import { useState, useEffect, useRef } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";

const memories = [
  {
    id: 1,
    icon: "📍",
    title: "أول مرة حسّيت إنك مختلفة",
    text: "كان في شيء في كلامك… ما أدري كيف أوصفه. بس من أول ما حكينا، حسّيت إنك مو زي غيرك.",
    color: "from-pink-500/20 to-rose-500/10",
    borderColor: "border-pink-400/30",
    bow: "pink" as const,
  },
  {
    id: 2,
    icon: "😂",
    title: "أول مرة ضحكت فيها من قلبي معك",
    text: "الضحكة اللي ما قدرت أوقفها… اللي خلتني أحس إن الدنيا أجمل وأنت جنبي.",
    color: "from-purple-500/20 to-violet-500/10",
    borderColor: "border-purple-400/30",
    bow: "purple" as const,
  },
  {
    id: 3,
    icon: "💬",
    title: "أول موقف خلاني أتعلق فيك",
    text: "لحظة صغيرة… بس كانت كافية تخليني أدرك إني ما بقدر أتخيل يومي بدون ضحكتك وكلامك.",
    color: "from-fuchsia-500/20 to-pink-500/10",
    borderColor: "border-fuchsia-400/30",
    bow: "red" as const,
  },
  {
    id: 4,
    icon: "❤️",
    title: "أول مرة حسّيت إنك صرتي إلي",
    text: "ما كنت أعرف متى صارت هاي اللحظة… بس فجأة لقيت حالي أنا بفكر فيك وأنا بتمنى تكوني جنبي دايما.",
    color: "from-rose-500/20 to-pink-500/10",
    borderColor: "border-rose-400/30",
    bow: "pink" as const,
  },
];

interface MemoriesPageProps {
  onContinue: () => void;
}

export default function MemoriesPage({ onContinue }: MemoriesPageProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-idx") || "0");
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-show first card
  useEffect(() => {
    setTimeout(() => setVisibleCards(new Set([0])), 300);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Top decoration */}
      <div className="flex justify-between items-center mb-6">
        <Ribbon color="pink" />
        <div className="text-center">
          <HelloKitty size={80} bow="pink" />
        </div>
        <Ribbon color="purple" />
      </div>

      {/* Section title */}
      <div className="text-center mb-8 animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
        <p className="text-pink-300/60 text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>
          ذكرياتنا
        </p>
        <h2
          className="shimmer-text font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
          }}
        >
          لحظات علقت بقلبي 💕
        </h2>
        <div className="flex justify-center gap-2 mt-2">
          {["✦", "❤️", "✦"].map((s, i) => (
            <span key={i} className="text-pink-400/70 text-sm">{s}</span>
          ))}
        </div>
      </div>

      {/* Memory cards */}
      <div className="max-w-lg mx-auto space-y-5">
        {memories.map((memory, idx) => (
          <div
            key={memory.id}
            ref={(el) => { cardRefs.current[idx] = el; }}
            data-idx={idx}
            data-testid={`card-memory-${memory.id}`}
            className={`memory-card glass-card rounded-3xl p-6 border bg-gradient-to-br ${memory.color} ${memory.borderColor} transition-all duration-700 ${
              visibleCards.has(idx)
                ? "opacity-100 translate-x-0 translate-y-0"
                : idx % 2 === 0
                ? "opacity-0 -translate-x-8"
                : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: "rgba(255,105,180,0.15)", border: "1px solid rgba(255,105,180,0.3)" }}
                >
                  {memory.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-right">
                <h3
                  className="text-white font-bold mb-2"
                  style={{
                    fontFamily: "'Noto Naskh Arabic', sans-serif",
                    fontSize: "clamp(0.95rem, 4vw, 1.1rem)",
                  }}
                >
                  {memory.title}
                </h3>
                <p
                  className="text-pink-200/80 leading-relaxed"
                  style={{
                    fontFamily: "'Noto Naskh Arabic', sans-serif",
                    fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
                  }}
                >
                  {memory.text}
                </p>
              </div>
            </div>

            {/* Small kitty decoration */}
            <div className="flex justify-end mt-3 opacity-60">
              <HelloKitty size={35} bow={memory.bow} />
            </div>
          </div>
        ))}
      </div>

      {/* Continue button */}
      <div className="flex justify-center mt-10">
        <button
          data-testid="button-continue-memories"
          onClick={onContinue}
          className="btn-glow text-white font-bold rounded-full px-8 py-4 text-xl flex items-center gap-2"
          style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
        >
          <span>تابعي معي</span>
          <span className="animate-pulse-heart">💖</span>
        </button>
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center gap-4 mt-8 opacity-40">
        <HelloKitty size={45} bow="pink" />
        <HelloKitty size={45} bow="purple" />
        <HelloKitty size={45} bow="red" />
      </div>
    </div>
  );
}
