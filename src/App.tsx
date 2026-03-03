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
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

const queryClient = new QueryClient();

const AppContent = () => {
  const [entered, setEntered] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we load on any sub-route (like /confirmed-iftar), immediately reset the URL to the root
    // This ensures that after a refresh, the user starts the whole experience from the beginning.
    if (location.pathname !== "/" && !entered) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate, entered]);

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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/confirmed-iftar" element={<ConfirmedIftar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <SmoothScroll />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
