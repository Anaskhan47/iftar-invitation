import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConfirmedIftar from "./pages/ConfirmedIftar";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import { SpiralDemo } from "./components/spiral-demo";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

const queryClient = new QueryClient();

const AppContent = () => {
  const [entered, setEntered] = useState<boolean>(false);

  const handleEnter = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setEntered(true);
      }
    });

    tl.to(".intro-wrapper", {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: "power3.inOut"
    });
  };

  if (entered === null) return null;

  return (
    <AnimatePresence mode="wait">
      {!entered ? (
        <motion.div key="intro" className="intro-wrapper fixed inset-0 z-[200]">
          <SpiralDemo onEnter={handleEnter} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/confirmed-iftar" element={<ConfirmedIftar />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomCursor />
      <SmoothScroll />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
