import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnimatedShaderHero } from "@/components/ui/animated-shader-hero";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
    title: "NeoMinds Gathering 2026",
    description: "A premium invitation to the NeoMinds Iftar gathering.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${playfair.variable} bg-background font-sans antialiased text-foreground overflow-x-hidden`}>
                {/* Layer 0: High-Performance Persistent WebGL Shader */}
                <AnimatedShaderHero />

                {/* Layer 1: Site Content */}
                <div className="relative z-10 w-full min-h-screen selection:bg-gold/30">
                    {children}
                </div>
            </body>
        </html>
    );
}
