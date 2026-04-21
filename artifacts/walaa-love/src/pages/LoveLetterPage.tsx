import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";

const letterLines = [
  "إيمان حبيبتي 💖",
  "",
  "يمكن الموقع بسيط، وكلامي يمكن يبين عادي…",
  "بس والله اللي فقلبي لج ما هو بسيط ابد 💕",
  "",
  "كل ليله افكر فيج، وبصلاتي دايم ادعي لج،",
  "وبنهاري، وبكل وقتي، سواء كنت فاضي ولا مشغول…",
  "انتي ببالي، واحبج اكثر كل يوم ❤️",
  "",
  "اشوف فيج شي ما قد شفته بحياتي،",
  "شي ما توقعت بيوم احسه مع حد،",
  "من اول مره دخلتي حياتي، حسيت كل شي تغير ✨",
  "",
  "اتذكر اول مره التقينا فري فاير،",
  "كنت مع صديقي كرم، ومن يومها وانا ضفتج،",
  "وبدينا نسولف شوي شوي، لين صرنا قريبين من بعض اكثر 💫",
  "",
  "ومن بعدها طلبت سنابج،",
  "ويوم ضفتيني وصار اللي صار…",
  "وانكشف الموضوع عند اهلج، وانضربتي…",
  "كنت احس بتأنيب وندم كبير،",
  "لأني ما كنت ابي يصير لج شي بسببي 😔💔",
  "",
  "وحتى يوم شريتي الايباد، وكنتي تكلميني عن طريق ديسكورد،",
  "كنت احس قديش تحاولين عشاني،",
  "وبعدها يوم اخذت رقمج وصار بينا واتساب،",
  "رجع نفس الشي وانكشف الموضوع عند خالتج…",
  "وانضربتي مره ثانيه 💔",
  "",
  "والله يا ايمان هالمواقف ما انسيتها،",
  "بالعكس خلتني احبج اكثر،",
  "واحس بقيمتج فحياتي اكثر واكثر ❤️",
  "",
  "حتى يوم دعيت لج في ليلة القدر،",
  "دعيت من قلبي ربي يجمعني فيج بالحلال،",
  "وتكونين من نصيبي،",
  "لأنج صرتي شي كبير بحياتي 💍✨",
  "",
  "شوي شوي ومع الوقت،",
  "ما صرتي بس انسانه قريبه…",
  "صرتي كل شي، دنيتي، راحتي، ضحكتي، ونور عيني 🥺💖",
  "",
  "انتي اللي افكر فيها بكل لحظه،",
  "مو بس قلبي يدق لج… حتى عقلي ما يوقف يفكر فيج،",
  "افكر اذا انتي بخير، اذا فرحانه، اذا زعلانه…",
  "عن كل شي يخصج ❤️",
  "",
  "ايمان، مهما قلت ومهما عبرت،",
  "مستحيل اوصف لج حتى جزء بسيط من حبي،",
  "لأن اللي فقلبي لج اكبر من الكلام 💕",
  "",
  "ومع كل يوم، وكل لحظه تمر،",
  "حبي لج يكبر اكثر، بدون ما يوقف،",
  "ويزيد لين ما يوصل لشي ما له نهايه 💫",
  "",
  "وشو ما صار، انا اختارج دايم،",
  "واحبج دايم،",
  "وتبقين اغلى انسانه عندي، ومسكني واماني ❤️",
  "",
  "احبج يا عمري، يا اجمل شي صار بحياتي 💖✨",
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
                line.startsWith("إيمان حبيبتي") ? "text-pink-300 font-bold text-xl" : ""
              } ${
                line.includes("احبج يا عمري") ? "text-pink-400 font-bold text-lg" : "text-white/90"
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
