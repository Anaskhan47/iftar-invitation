"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * SpiralAnimation
 * A high-performance canvas-based particle spiral.
 * Developed with architecture-first principles: DPR awareness, resize handling, and memory safety.
 */
export const SpiralAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Internal state management
        let w: number;
        let h: number;
        let dpr: number;
        let animationFrameId: number;
        const particles: Particle[] = [];
        const particleCount = 200;

        /**
         * Particle Class
         * Encapsulates individual particle logic for 60fps rendering.
         */
        class Particle {
            angle: number;
            radius: number;
            speed: number;
            size: number;
            color: string;
            life: number;

            constructor(index: number) {
                const maxDim = Math.min(window.innerWidth, window.innerHeight);
                const isMobile = window.innerWidth < 768;
                this.angle = (index / particleCount) * Math.PI * 20;
                this.radius = (index / particleCount) * (maxDim * 0.8);
                this.speed = (isMobile ? 0.002 : 0.003) + Math.random() * 0.004;
                this.size = Math.random() * 1.5 + 0.5;
                // Thematic gold palette
                this.color = `hsla(${35 + Math.random() * 15}, 80%, 55%, ${0.2 + Math.random() * 0.4})`;
                this.life = Math.random();
            }

            update() {
                this.angle += this.speed;
                // Subtle drift
                this.radius += Math.sin(this.angle * 0.4) * 0.3;
            }

            draw() {
                if (!ctx) return;
                const x = w / 2 + Math.cos(this.angle) * this.radius;
                const y = h / 2 + Math.sin(this.angle) * this.radius;

                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();

                // High-end glow effect
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
            }
        }

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            dpr = window.devicePixelRatio || 1;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            ctx.scale(dpr, dpr);
        };

        const init = () => {
            resize();
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(i));
            }
        };

        const render = () => {
            // Create trailing effect using alpha composite
            ctx.fillStyle = "rgba(10, 12, 16, 0.12)";
            ctx.fillRect(0, 0, w, h);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        init();
        render();

        // GSAP Context for scoped interaction (Premium practice)
        const ctx_gsap = gsap.context(() => {
            gsap.fromTo(canvas,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2.5, ease: "expo.out" }
            );
        }, containerRef);

        const onResize = () => {
            resize();
        };

        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", onResize);
            ctx_gsap.revert(); // GSAP Cleanup
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#0a0c10] overflow-hidden">
            <canvas ref={canvasRef} className="block" />
            {/* Cinematic Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,12,16,0.8)_100%)]" />
        </div>
    );
};
