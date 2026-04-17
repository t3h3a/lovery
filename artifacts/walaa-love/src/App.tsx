import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StarField from "@/components/StarField";
import FloatingHearts from "@/components/FloatingHearts";
import LandingPage from "@/pages/LandingPage";
import QuestionsPage from "@/pages/QuestionsPage";
import TransitionPage from "@/pages/TransitionPage";
import MemoriesPage from "@/pages/MemoriesPage";
import SurprisePage from "@/pages/SurprisePage";
import LoveLetterPage from "@/pages/LoveLetterPage";
import EndingPage from "@/pages/EndingPage";

const queryClient = new QueryClient();

type Stage =
  | "landing"
  | "questions"
  | "transition"
  | "memories"
  | "surprise"
  | "letter"
  | "ending";

function App() {
  const [stage, setStage] = useState<Stage>("landing");
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((next: Stage) => {
    setTransitioning(true);
    setTimeout(() => {
      setStage(next);
      setTransitioning(false);
    }, 300);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="night-sky min-h-screen relative"
        style={{ direction: "rtl" }}
      >
        {/* Fixed background elements */}
        <StarField />
        <FloatingHearts />

        {/* Page transition overlay */}
        <div
          className={`fixed inset-0 bg-black z-50 pointer-events-none transition-opacity duration-300 ${
            transitioning ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Page content */}
        <div className={`relative z-10 transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}>
          {stage === "landing" && (
            <LandingPage onStart={() => goTo("questions")} />
          )}
          {stage === "questions" && (
            <QuestionsPage onComplete={() => goTo("transition")} />
          )}
          {stage === "transition" && (
            <TransitionPage onContinue={() => goTo("memories")} />
          )}
          {stage === "memories" && (
            <MemoriesPage onContinue={() => goTo("surprise")} />
          )}
          {stage === "surprise" && (
            <SurprisePage onContinue={() => goTo("letter")} />
          )}
          {stage === "letter" && (
            <LoveLetterPage onContinue={() => goTo("ending")} />
          )}
          {stage === "ending" && (
            <EndingPage onReplay={() => goTo("landing")} />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
