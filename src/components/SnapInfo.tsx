import { motion } from "framer-motion";

const SnapInfo = () => {
    return (
        <motion.div
            className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.8, duration: 1.2, ease: "easeOut" }}
        >
            <div className="flex items-center gap-3">
                <div className="hidden sm:block h-px w-8 bg-gold/30" />
                <p className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gold gold-text-glow whitespace-nowrap">
                    Hope to see you there
                </p>
            </div>
        </motion.div>
    );
};

export default SnapInfo;
