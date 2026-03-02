import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lineVariant = {
  hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const ContextSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Warm background glow intensifies as you scroll through
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 0.08]);

  return (
    <section ref={ref} className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 text-center">
      {/* Warming ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsla(35,70%,50%,1) 0%, transparent 70%)",
          opacity: glowOpacity,
        }}
      />

      {/* Horizontal gold line accent */}
      <motion.div
        className="mb-16 h-px w-16"
        style={{ background: "linear-gradient(90deg, transparent, hsl(40,80%,55%), transparent)" }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 0.5, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 max-w-2xl space-y-12">
        <motion.p
          className="font-sans text-lg leading-relaxed text-foreground/70 sm:text-xl md:text-2xl"
          variants={lineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          An evening set aside for good food, calm conversations, and the right company.
        </motion.p>

        <motion.p
          className="font-serif text-xl text-gold sm:text-2xl md:text-3xl gold-text-glow"
          variants={lineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          And you're part of that.
        </motion.p>
      </div>
    </section>
  );
};

export default ContextSection;
