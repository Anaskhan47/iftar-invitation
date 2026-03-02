"use client";

import { motion } from "framer-motion";
import { SpiralAnimation } from "./ui/spiral-animation";

interface SpiralDemoProps {
    onEnter: () => void;
}

/**
 * SpiralDemo
 * The "Enter Gate" wrapper. Handles the UI overlay and primary CTA.
 */
export const SpiralDemo = ({ onEnter }: SpiralDemoProps) => {
    return (
        <div className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Background Motion Layer */}
            <SpiralAnimation />

            {/* Foreground Interactive Layer */}
            <motion.div
                className="relative z-[110] flex flex-col items-center gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
            >
                <div className="space-y-2 text-center">
                    <motion.h2
                        className="font-serif text-gold text-xs tracking-[0.8em] uppercase opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 2, duration: 2 }}
                    >
                        FOR YOU
                    </motion.h2>
                </div>

                <button
                    onClick={onEnter}
                    className="group relative px-16 py-5 overflow-hidden rounded-sm transition-all duration-700"
                    style={{
                        background: "linear-gradient(135deg, rgba(40,40,40,0.4) 0%, rgba(20,20,20,0.6) 100%)",
                        border: "1px solid rgba(197, 161, 95, 0.2)",
                    }}
                >
                    {/* Button Hover Glow Background */}
                    <div className="absolute inset-0 translate-y-full bg-gold/10 transition-transform duration-700 group-hover:translate-y-0" />

                    <span className="relative z-10 text-gold font-sans text-xs tracking-[0.5em] uppercase group-hover:tracking-[0.7em] transition-all duration-700">
                        Enter
                    </span>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-gold/30" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-gold/30" />
                </button>
            </motion.div>
        </div>
    );
};
