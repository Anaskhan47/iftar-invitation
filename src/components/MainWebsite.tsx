"use client";

import { motion } from "framer-motion";

/**
 * MainWebsite
 * Placeholder for the primary website content to be revealed after intro.
 */
const MainWebsite = () => {
    return (
        <motion.div
            className="min-h-screen w-full bg-[#0a0c10] flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        >
            <div className="max-w-4xl text-center space-y-6">
                <h1 className="font-serif text-5xl md:text-7xl text-foreground tracking-tight">
                    Welcome to the Core.
                </h1>
                <p className="text-muted-foreground text-lg font-light tracking-wide max-w-xl mx-auto">
                    The intro system has successfully unmounted, clearing the way for the main experience.
                </p>
            </div>
        </motion.div>
    );
};

export default MainWebsite;
