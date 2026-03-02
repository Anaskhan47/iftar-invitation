import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import CrescentMoon from "./CrescentMoon";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const moonY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Crescent moon with parallax */}
      <motion.div style={{ y: moonY, x: mouseX, rotate: useTransform(mouseX, [-10, 10], [-2, 2]) }} className="absolute inset-0">
        <CrescentMoon />
      </motion.div>

      {/* Radial ambient glow at center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 45%, hsla(220,40%,15%,0.5) 0%, transparent 100%)",
        }}
      />

      <motion.div style={{ y: textY, opacity: heroOpacity }} className="relative z-10">
        {/* Blur-to-focus entrance */}
        <motion.h1
          className="font-serif text-5xl font-medium tracking-tight text-foreground sm:text-7xl md:text-[6.5rem] leading-none"
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          You're Invited.
        </motion.h1>

        <motion.div
          className="mt-10 space-y-3"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="font-serif text-xl tracking-[0.2em] text-gold sm:text-2xl gold-text-glow">
            NeoMinds Iftar
          </p>
          <p className="text-sm tracking-[0.25em] uppercase text-muted-foreground sm:text-base">
            March 04, 2026 . 5:00 PM . At office
          </p>
        </motion.div>

        <motion.p
          className="mt-16 font-serif text-lg italic text-foreground/70 sm:text-xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          I want you there.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.6, delay: 2.8 }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Scroll</span>
        <motion.div
          className="h-10 w-px origin-top bg-gradient-to-b from-muted-foreground/50 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
