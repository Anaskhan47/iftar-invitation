import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative h-24 w-24">
        {/* Animated rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-gold/20"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-gold/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Central moon or logo placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="h-1.5 w-1.5 rounded-full bg-gold"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      
      <motion.p
        className="mt-8 font-serif text-[10px] uppercase tracking-[0.5em] text-gold/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        NeoMinds
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
