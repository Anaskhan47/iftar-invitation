import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
    const mouseY = useSpring(0, { stiffness: 400, damping: 40 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "BUTTON" ||
                target.tagName === "A"
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Outer Glow */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[110] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    background: "radial-gradient(circle, hsla(40,80%,55%,0.15) 0%, transparent 70%)",
                    scale: isPointer ? 1.5 : 1,
                }}
            />

            {/* Small dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[110] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    scale: isPointer ? 0 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
