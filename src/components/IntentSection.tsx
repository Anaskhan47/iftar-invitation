import { motion } from "framer-motion";

const lineVariant = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const IntentSection = () => {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      {/* Spotlight / focused glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 50% 50%, hsla(40,60%,50%,0.06) 0%, transparent 100%)",
        }}
      />
      {/* Darker vignette edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, hsla(220,50%,4%,0.4) 100%)",
        }}
      />

      <div className="relative z-10 max-w-xl space-y-10">
        <motion.p
          className="font-sans text-lg text-foreground/60 sm:text-xl"
          variants={lineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          I'm not sending this casually.
        </motion.p>

        <motion.p
          className="font-serif text-xl text-gold sm:text-2xl md:text-3xl gold-text-glow"
          variants={lineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          I'm sending it to you.
        </motion.p>

        {/* Scale pulse on the strongest line */}
        <motion.p
          className="font-serif text-2xl font-medium text-foreground sm:text-3xl md:text-4xl"
          variants={lineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <motion.span
            className="inline-block"
            whileInView={{
              scale: [1, 1.03, 1],
            }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1.6, ease: "easeInOut" }}
          >
            Make sure you're there.
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
};

export default IntentSection;
