"use client";

import { useEffect, useRef } from "react";

/**
 * ConfirmedPage (Next.js App Router)
 * Replicating the immersive premium look from the original design.
 */
export default function ConfirmedPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let frame: number;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
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
                background: "linear-gradient(180deg, #0a0c10 0%, #151a21 50%, #0a0c10 100%)",
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

            <div className="relative z-10 space-y-10 max-w-2xl animate-in fade-in duration-1000">
                <h1 className="font-serif text-5xl md:text-8xl font-medium text-white tracking-tight animate-in slide-in-from-bottom-8 duration-1000">
                    Good.
                </h1>

                <p className="font-serif text-xl md:text-3xl text-white/75 tracking-wide leading-relaxed animate-in fade-in fill-mode-both duration-1000 delay-500">
                    Hope to see you.
                </p>

                <div className="space-y-3 pt-6 animate-in fade-in fill-mode-both duration-1000 delay-700">
                    <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#c5a15f] font-medium shadow-[#c5a15f]/20 shadow-sm">March 04, 2026</p>
                    <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/40">5:00 PM</p>
                    <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/40">At office</p>
                </div>

                <p className="pt-16 font-serif text-lg md:text-2xl italic text-white/30 animate-in fade-in fill-mode-both duration-1000 delay-1000">
                    Don't be late.
                </p>
            </div>
        </main>
    );
}
