"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [particles, setParticles] = useState<
        Array<{ left: string; top: string; delay: string; duration: string; x1: string; y1: string; x2: string; y2: string; x3: string; y3: string }>
    >([]);
    const fullText = "Software Engineer";

    useEffect(() => {
        setIsLoaded(true);
        const generated = [...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 2}s`,
            duration: `${2 + Math.random() * 3}s`,
            x1: `${(Math.random() - 0.5) * 60}px`,
            y1: `${(Math.random() - 0.5) * 60}px`,
            x2: `${(Math.random() - 0.5) * 60}px`,
            y2: `${(Math.random() - 0.5) * 60}px`,
            x3: `${(Math.random() - 0.5) * 60}px`,
            y3: `${(Math.random() - 0.5) * 60}px`,
        }));
        setParticles(generated);
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const scrollToContent = () => {
        document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
            {/* Background with animated gradient */}
            <div className="absolute inset-0 bg-linear-to from-background via-background to-secondary">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                {/* Animated city silhouette */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-background to-transparent" />
                <div
                    className="absolute bottom-0 left-0 right-0 h-48 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23d97706' fillOpacity='0.3' d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat-x",
                        backgroundPosition: "bottom",
                    }}
                />
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {particles.map((p, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
                            style={{
                                left: p.left,
                                top: p.top,
                                animationDelay: p.delay,
                                animationDuration: p.duration,
                                "--float-duration": p.duration,
                                "--x1": p.x1,
                                "--y1": p.y1,
                                "--x2": p.x2,
                                "--y2": p.y2,
                                "--x3": p.x3,
                                "--y3": p.y3,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div
                className={`relative z-10 text-center px-4 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                {/* Welcome text */}
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 border border-primary/50 text-primary font-mono text-sm tracking-widest animate-pulse">
                        WELCOME, PLAYER
                    </span>
                </div>

                {/* Character info */}
                <div className="space-y-4 mb-8">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
                        Abdelrahman Ashraf
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-muted-foreground font-mono">
                        <span className="text-primary">CLASS:</span>
                        <span className="text-xl md:text-2xl text-glow">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </div>
                </div>

                {/* Stats preview */}
                <div className="flex justify-center gap-8 mb-12 font-mono text-sm">
                    <div className="text-center">
                        <div className="text-primary text-2xl font-bold">
                            LVL
                        </div>
                        <div className="text-muted-foreground">5+</div>
                    </div>
                    <div className="text-center">
                        <div className="text-primary text-2xl font-bold">
                            XP
                        </div>
                        <div className="text-muted-foreground">∞</div>
                    </div>
                    <div className="text-center">
                        <div className="text-primary text-2xl font-bold">
                            MISSIONS
                        </div>
                        <div className="text-muted-foreground">20+</div>
                    </div>
                </div>

                {/* Start button */}
                <Button
                    onClick={scrollToContent}
                    size="lg"
                    className="group  relative px-12 py-6 text-lg font-bold tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground glow-amber transition-all duration-300 hover:scale-105"
                >
                    <span className="relative z-10">START GAME</span>
                    <div className="absolute inset-0 bg-primary/50 blur-xl group-hover:blur-2xl transition-all" />
                </Button>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-8 h-8 text-primary/50" />
                </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-primary/30" />
            <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-primary/30" />
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-primary/30" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-primary/30" />
        </section>
    );
}
