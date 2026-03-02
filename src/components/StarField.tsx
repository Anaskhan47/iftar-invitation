import { useEffect, useRef } from "react";

interface StarFieldProps {
  opacity?: number;
}

const StarField = ({ opacity = 1 }: StarFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let w = 0;
    let h = 0;

    interface Star {
      x: number;
      y: number;
      r: number;
      baseAlpha: number;
      phase: number;
      speed: number;
    }

    let stars: Star[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      stars = [];
      const count = Math.floor((w * h) / 8000);
      for (let i = 0; i < Math.min(count, 150); i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.2,
          baseAlpha: Math.random() * 0.6 + 0.15,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.003 + 0.001,
        });
      }
    };

    let t = 0;
    const render = () => {
      t++;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle = Math.sin(t * s.speed + s.phase) * 0.3 + 0.7;
        const alpha = s.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 210, 190, ${alpha})`;
        ctx.fill();
      }
      animFrame = requestAnimationFrame(render);
    };

    init();
    render();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity }}
    />
  );
};

export default StarField;
