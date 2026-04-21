import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";

const memories = [
  {
    id: 1,
    icon: "💭",
    title: "اول مره حسيت انك مختلفه",
    text: "بصراحه ومن وقتها وانا حاس بشي غريب، كنا نلعب فري فاير عادي مثل اي حد، بس وجودج كان غير، كلامج غير، وحتى اسلوبج غير، من اول مره كلمتج فيها حسيت انج مو مثل الباقي، حرفيا مختلفه عن الكل.",
    color: "from-pink-500/20 to-rose-500/10",
    borderColor: "border-pink-400/30",
    bow: "pink" as const,
  },
  {
    id: 2,
    icon: "🤍",
    title: "اول مره ضحكت فيها من قلبي معك",
    text: "كانت من نفس البدايه يوم تعرفنا، كنا بس نتمشى في اللعبه ونضحك بدون سبب، وكل مره كنا نقعد نسولف، كنت انسى كل شي حولي، مجرد وجودج كان يخليني افرح بدون ما احس.",
    color: "from-purple-500/20 to-violet-500/10",
    borderColor: "border-purple-400/30",
    bow: "purple" as const,
  },
  {
    id: 3,
    icon: "💌",
    title: "اول موقف خلاني اتعلق فيك",
    text: "كان يوم شفت طيبتج واسلوبج الحلو، ما كان شي كبير، بس كان كافي يدخلج قلبي، ضحكتج وكلامج خلتني احس بشي مختلف، ومن ذاك الوقت بديت اشوفج غير عن اي بنت ثانيه.",
    color: "from-fuchsia-500/20 to-pink-500/10",
    borderColor: "border-fuchsia-400/30",
    bow: "red" as const,
  },
  {
    id: 4,
    icon: "❤️",
    title: "اول مره حسيت انك صرتي الي",
    text: "كان يوم اعترفت لج بحبي في فري فاير، رغم كل الظروف والمشاكل اللي حولنا، حسيت انج قريبه مني بشكل ما يتوصف، كنتي دايما جنبي، تسمعيني وتفهميني بدون ما اشرح، وحسيت اني ما ابي غيرج، وانا من وقتها قررت اكون لج سند دايم، واكون معج في كل شي، يا احلى وحده في حياتي.",
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

  useEffect(() => {
    const timers = memories.map((_, idx) =>
      setTimeout(() => {
        setVisibleCards((prev) => new Set([...prev, idx]));
      }, 300 + idx * 260),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
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
      <div
        className="text-center mb-8 animate-fade-in-up"
        style={{ animationFillMode: "forwards" }}
      >
        <p
          className="text-pink-300/60 text-sm mb-1"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
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
            <span key={i} className="text-pink-400/70 text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Memory cards */}
      <div className="max-w-lg mx-auto space-y-5">
        {memories.map((memory, idx) => (
          <div
            key={memory.id}
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
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: "rgba(255,105,180,0.15)",
                    border: "1px solid rgba(255,105,180,0.3)",
                  }}
                >
                  {memory.icon}
                </div>
              </div>

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
          className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl flex items-center justify-center gap-2"
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
