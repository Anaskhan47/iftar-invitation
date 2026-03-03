import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * ConfirmedIftar Page
 * Restoring the exact cinematic visuals from the image while incorporating 
 * the new gathering details and the "Hope to see you there" message.
 */
export default function ConfirmedIftar() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let frame: number;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dpr = window.devicePixelRatio;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.scale(dpr, dpr);

        const particles: { x: number; y: number; r: number; a: number; vy: number; vx: number }[] = [];
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2 + 0.5,
                a: Math.random() * 0.35 + 0.1,
                vy: -(Math.random() * 0.3 + 0.1),
                vx: (Math.random() - 0.5) * 0.2,
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                p.y += p.vy;
                p.x += p.vx;
                if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(40, 70%, 65%, ${p.a})`;
                ctx.fill();
            }
            frame = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <main
            className="relative flex flex-col items-center justify-center min-h-[100dvh] text-center px-6 overflow-hidden"
            style={{
                background: "linear-gradient(180deg, hsl(220,50%,7%) 0%, hsl(25,20%,9%) 50%, hsl(220,40%,8%) 100%)",
            }}
        >
            <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />

            {/* Warm center glow */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse 50% 40% at 50% 45%, hsla(40,70%,50%,0.07) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 space-y-8 max-w-2xl mt-[-40px]">
                <motion.h1
                    className="font-serif text-5xl md:text-8xl font-medium text-foreground tracking-tight"
                    initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                >
                    Good.
                </motion.h1>

                <motion.p
                    className="font-serif text-xl md:text-3xl text-foreground/75 tracking-wide leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                >
                    Hope to see you.
                </motion.p>

                <motion.div
                    className="space-y-3 pt-6"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 2.2 }}
                >
                    <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gold gold-text-glow font-medium">March 04, 2026</p>
                    <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-foreground/50">5:00 PM</p>
                    <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-foreground/50">At office</p>
                </motion.div>

                <motion.p
                    className="pt-16 font-serif text-lg md:text-2xl italic text-foreground/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 3 }}
                >
                    Don't be late.
                </motion.p>
            </div>
        </main>
    );
}
