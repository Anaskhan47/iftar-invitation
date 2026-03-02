import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, forwardRef } from "react";

interface DecisionSectionProps {
  onConfirm: () => void;
}

const DecisionSection = forwardRef<HTMLElement, DecisionSectionProps>(({ onConfirm }, ref) => {
  const [attempts, setAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const maxX = Math.min(rect.width / 2 - 50, 200);
    const maxY = 100;

    const angle = Math.random() * Math.PI * 2;
    const dist = 0.6 + Math.random() * 0.4;
    const newX = Math.cos(angle) * maxX * dist;
    const newY = Math.sin(angle) * maxY * dist;

    setNoPos({ x: newX, y: newY });
    setAttempts((p) => p + 1);
  }, []);

  const noOpacity = attempts >= 4 ? 0.35 : attempts >= 2 ? 0.6 : 1;
  const noScale = attempts >= 3 ? 0.82 : 1;

  return (
    <section ref={ref} className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 text-center">
      <motion.h2
        className="font-serif text-3xl font-medium text-foreground sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        I'll be expecting you.
      </motion.h2>

      <div
        ref={containerRef}
        className="relative mt-16 flex min-h-[220px] w-full max-w-md flex-col items-center gap-6"
      >
        <AnimatePresence>
          {attempts >= 3 && (
            <motion.p
              key="not-option"
              className="absolute -top-10 font-sans text-sm tracking-wide text-muted-foreground"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              That's not really an option.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            window.location.href = "/confirmed-iftar";
          }}
          className="relative z-10 rounded-sm px-12 py-4 font-sans text-sm font-medium tracking-[0.25em] uppercase transition-colors"
          style={{
            background: "linear-gradient(135deg, hsla(40,80%,55%,0.15) 0%, hsla(35,90%,45%,0.1) 100%)",
            border: "1px solid hsla(40,80%,55%,0.3)",
            color: "hsl(40,80%,55%)",
          }}
          whileHover={{
            background: "linear-gradient(135deg, hsla(40,80%,55%,0.25) 0%, hsla(35,90%,45%,0.18) 100%)",
            borderColor: "hsla(40,80%,55%,0.5)",
          }}
          animate={
            attempts >= 3
              ? {
                boxShadow: [
                  "0 0 20px hsla(40,80%,55%,0.08)",
                  "0 0 50px hsla(40,80%,55%,0.2)",
                  "0 0 20px hsla(40,80%,55%,0.08)",
                ],
              }
              : {}
          }
          transition={
            attempts >= 3
              ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          I'll Be There
        </motion.button>

        {/* No button */}
        <motion.button
          className="relative z-10 rounded-sm border border-border/50 px-6 py-2.5 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground"
          animate={{
            x: noPos.x,
            y: noPos.y,
            opacity: noOpacity,
            scale: noScale,
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => {
            e.preventDefault();
            moveNoButton();
          }}
          onClick={moveNoButton}
        >
          No
        </motion.button>
      </div>
    </section>
  );
});

DecisionSection.displayName = "DecisionSection";

export default DecisionSection;
