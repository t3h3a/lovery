import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";

const letterLines = [
  "ولاء حبيبتي ❤️",
  "",
  "يمكن خلينا نقول هذا الموقع نوعا ما بسيط...",
  "بس صدقيني، المشاعر يلي بكنها الك مش بسيطه ولا عاديه 💕",
  "",
  "ليلي بفكر فيك، وبصلاتي بدعي الك...",
  "وبنهاري، وبكل وقتي، سواء بفراغي او بانشغالي، بحبك وبفكر فيك.",
  "",
  "بشوف فيك اشي ما شفته بحياتي،",
  "وما توقعت ممكن بيوم يكون مع حدا.",
  "",
  "من اول مره حكينا مع بعض عند النافوره،",
  "وانا حاسس انو في شي مش طبيعي، زي كأنه سحر اجا علي،",
  "بس كان اجمل سحر ممكن ينوجد ✨",
  "",
  "شوي شوي، ومع الوقت،",
  "صرتي مش بس اقرب انسانه الي...",
  "صرتي كل شي بالنسبه الي، دنيتي، ودنياي، ومسكني، وحبيبتي، ونور عيني.",
  "",
  "صرتي ضحكتي، ووجودي، وراحتي، وحبي،",
  "وصرتي الاشي يلي دايما بفكر فيه، وبكل وقتي.",
  "",
  "مش بس قلبي بدق مشانك،",
  "حتى عقلي بفكر فيك...",
  "اذا انتي بخير، اذا انتي فرحانه، اذا انتي زعلانه،",
  "عن كل شي بخصك، وعن كل شي بتعلق فيك.",
  "",
  "ولاء، مهما حكيت ومهما عبرت،",
  "مستحيل اوفي ولا واحد بالمية من حبي الك...",
  "وقد ما احكي، مستحيل اقدر ابينلك حبي الك قديش كبير.",
  "",
  "ومع الوقت، حبي الك بزيد،",
  "بزيد مع كل لحظه بتمشي، حتى اللحظه يلي ما بتتقدر تنحسب.",
  "ومع كل يوم، وكل لحظه، وكل ثانيه بتمر... حبي الك بزيد معها.",
  "",
  "وشو ما صار، رح اختارك واحبك دايما،",
  "ورح تضلك دايما مسكني، ومأمني الوحيد.",
  "",
  "بحبك كرموشتي ❤️💕",
];

interface LoveLetterPageProps {
  onContinue: () => void;
}

export default function LoveLetterPage({ onContinue }: LoveLetterPageProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setVisibleLines(current);
      if (current >= letterLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setShowGlow(true);
        }, 800);
      }
    }, 380);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Glow background */}
      <div
        className={`fixed inset-0 pointer-events-none transition-all duration-2000 ${
          showGlow ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,50,120,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Top decorations */}
      <div className="flex justify-between mb-4">
        <Ribbon color="pink" />
        <HelloKitty size={80} bow="red" />
        <Ribbon color="purple" />
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <p
          className="text-pink-300/60 text-sm"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          رسالتي الك
        </p>
        <h2
          className="shimmer-text font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
          }}
        >
          💌 من القلب
        </h2>
      </div>

      {/* Letter card */}
      <div
        className={`glass-card glow-border rounded-3xl p-6 max-w-lg mx-auto mb-8 relative overflow-hidden transition-all duration-1000 ${
          showGlow ? "animate-glow-pulse" : ""
        }`}
      >
        <div className="flex justify-center gap-2 mb-4">
          {["🌸", "💖", "🌸"].map((s, i) => (
            <span key={i} className="text-pink-300/60 text-sm">
              {s}
            </span>
          ))}
        </div>

        <div className="space-y-0.5" data-testid="text-letter">
          {letterLines.slice(0, visibleLines).map((line, idx) => (
            <p
              key={idx}
              className={`transition-all duration-500 leading-relaxed ${
                idx < visibleLines - 1 ? "opacity-100" : "opacity-80"
              } ${line === "" ? "h-4" : ""} ${
                line.startsWith("ولاء حبيبتي") ? "text-pink-300 font-bold text-xl" : ""
              } ${
                line.includes("بحبك كرموشتي") ? "text-pink-400 font-bold text-lg" : "text-white/90"
              } ${
                line.includes("رح اختارك") ? "text-pink-300 font-bold" : ""
              }`}
              style={{
                fontFamily: "'Noto Naskh Arabic', sans-serif",
                fontSize: line === "" ? undefined : "clamp(0.95rem, 4vw, 1.1rem)",
                textAlign: "right",
                direction: "rtl",
                animationFillMode: "forwards",
              }}
            >
              {line}
              {idx === visibleLines - 1 && !done && <span className="typing-cursor" />}
            </p>
          ))}
        </div>

        {done && (
          <div
            className="mt-6 text-center animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex justify-center gap-2 mb-2">
              {["💖", "💕", "❤️", "💕", "💖"].map((h, i) => (
                <span
                  key={i}
                  className="animate-pulse-heart text-xl"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {h}
                </span>
              ))}
            </div>
            <p
              className="text-pink-300/70 text-sm"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem" }}
            >
              الك دايما ❤️
            </p>
          </div>
        )}
      </div>

      {done && (
        <div
          className="flex justify-center animate-fade-in-up"
          style={{ animationFillMode: "forwards" }}
        >
          <button
            data-testid="button-continue-letter"
            onClick={onContinue}
            className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl flex items-center justify-center gap-2"
            style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
          >
            <span>واصلي</span>
            <span className="animate-pulse-heart">💖</span>
          </button>
        </div>
      )}
    </div>
  );
}
