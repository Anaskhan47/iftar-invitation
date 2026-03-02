import { motion } from "framer-motion";

/**
 * Confirmed Iftar Page
 * For demonstration purposes in Vite before full Next.js migration.
 */
export default function ConfirmedIftar() {
    return (
        <main className="flex items-center justify-center min-h-[100dvh] bg-black text-white px-6">
            <motion.h1
                className="text-3xl md:text-4xl font-light tracking-widest text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                Looking forward to seeing you.
            </motion.h1>
        </main>
    );
}
