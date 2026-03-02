import { motion } from "framer-motion";

const CrescentMoon = () => {
  return (
    <motion.div
      className="pointer-events-none absolute z-0"
      style={{
        top: "8%",
        right: "18%",
        width: "clamp(60px, 8vw, 120px)",
        height: "clamp(60px, 8vw, 120px)",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsla(40,60%,70%,0.12) 0%, transparent 70%)",
          transform: "scale(3)",
        }}
      />
      {/* Moon body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, hsla(40,50%,85%,0.9) 0%, hsla(40,40%,70%,0.7) 50%, hsla(40,30%,60%,0.3) 100%)",
          boxShadow: "0 0 40px hsla(40,60%,70%,0.2), 0 0 80px hsla(40,60%,70%,0.1)",
        }}
      />
      {/* Crescent shadow */}
      <div
        className="absolute rounded-full"
        style={{
          top: "-8%",
          left: "22%",
          width: "85%",
          height: "85%",
          background: "hsl(220, 50%, 7%)",
          boxShadow: "inset 0 0 20px hsla(220,50%,7%,0.5)",
        }}
      />
    </motion.div>
  );
};

export default CrescentMoon;
