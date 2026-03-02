"use client";

import { useState, useEffect } from "react";
import { SpiralDemo } from "@/components/spiral-demo";
import MainWebsite from "@/components/MainWebsite";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Root Home Page (Next.js App Router)
 * Manages the transition from Intro Gate to Main Content.
 */
export default function Home() {
    const [entered, setEntered] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const handleEnter = () => {
        setIsExiting(true);

        // 2. Pro GSAP Transition Logic
        const tl = gsap.timeline({
            onComplete: () => {
                setEntered(true);
                // Ensure scroll is enabled if it was locked during intro
                document.body.style.overflow = "auto";
            }
        });

        // Fade out and scale down for "shrinking into the core" effect
        tl.to(".intro-container", {
            opacity: 0,
            scale: 0.9,
            filter: "blur(20px)",
            duration: 1.5,
            ease: "expo.inOut"
        });
    };

    // Prevent flash by waiting for hydration/storage check
    if (entered === null) return <div className="min-h-screen bg-black" />;

    return (
        <main className="relative min-h-screen">
            <AnimatePresence mode="wait">
                {!entered ? (
                    <motion.div
                        key="intro"
                        className="intro-container fixed inset-0 z-[200]"
                        exit={{ opacity: 0 }}
                    >
                        <SpiralDemo onEnter={handleEnter} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                    >
                        <MainWebsite />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
