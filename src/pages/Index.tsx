import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import HeroSection from "@/components/HeroSection";
import ContextSection from "@/components/ContextSection";
import IntentSection from "@/components/IntentSection";
import DecisionSection from "@/components/DecisionSection";
import ConfirmationSection from "@/components/ConfirmationSection";
import LoadingScreen from "@/components/LoadingScreen";
import SnapInfo from "@/components/SnapInfo";

const Index = () => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      {!confirmed && <StarField />}

      <AnimatePresence mode="wait">
        {confirmed ? (
          <>
            <ConfirmationSection key="confirmed" />
            <SnapInfo />
          </>
        ) : (
          <main key="invitation" className="relative z-10">
            <HeroSection />
            <ContextSection />
            <IntentSection />
            <DecisionSection onConfirm={() => setConfirmed(true)} />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
