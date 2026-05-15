"use client";

import Image from "next/image";
import { Gamepad2, Code, Coffee, Zap } from "lucide-react";

const traits = [
    {
        icon: Code,
        label: "Clean Code",
        value: "Passionate about writing maintainable, scalable code",
    },
    {
        icon: Gamepad2,
        label: "Gamer",
        value: "Loves open-world games like GTA and Red Dead Redemption",
    },
    {
        icon: Coffee,
        label: "Fuel",
        value: "Coffee-powered development sessions",
    },
    {
        icon: Zap,
        label: "Fast Learner",
        value: "Always exploring new technologies",
    },
];

export function AboutSection() {
    return (
        <section id="about" className="relative py-24 px-4 md:px-6 bg-card/30">
            <div className="max-w-5xl mx-auto">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg mb-4">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="font-mono text-sm text-primary tracking-wider">
                            CHARACTER PROFILE
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        About Me
                    </h2>
                    <p className="text-muted-foreground font-mono">
                        Get to know the player behind the code
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Character avatar */}
                    <div className="relative">
                        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
                            {/* Avatar frame */}
                            <div className="absolute inset-0 border-2 border-primary/50 rounded-lg rotate-3 bg-secondary/20" />
                            <div className="absolute hover:rotate-4 transition-all duration-200 ease-in-out inset-0 border-2 border-primary rounded-lg -rotate-3 bg-card overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
                                {/* Silhouette placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-8xl opacity-50">
                                        <Image
                                            src="/3atef.jpg"
                                            alt="Abdelrahman Asharf - Full-Stack Developer"
                                            className="rounded-full object-cover"
                                            width={128}
                                            height={128}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Level badge */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-primary-foreground font-mono font-bold rounded-full">
                                LVL 5+ DEVELOPER
                            </div>
                        </div>
                    </div>

                    {/* Character info */}
                    <div className="space-y-6">
                        {/* Backstory */}
                        <div className="p-6 bg-card border border-border rounded-lg">
                            <h3 className="font-mono text-sm text-primary mb-3 tracking-wider">
                                BACKSTORY
                            </h3>
                            <p className="text-foreground leading-relaxed">
                                I'm a Software Engineer based in Hurghada, Egypt,
                                with a knack for crafting clean, efficient code.
                                Currently pursuing my degree in Computer Engineering
                                at Helwan University, my journey began
                                with a love for gaming, which sparked my
                                interest in technology and problem solving.
                            </p>
                            <p className="text-muted-foreground mt-4 leading-relaxed">
                                When I'm not coding, you'll find me immersed in
                                open-world games like GTA and Red Dead
                                Redemption, or fueling my creativity with a good
                                cup of coffee. I'm always eager to learn new
                                technologies and take on challenges that push my
                                boundaries.
                            </p>
                        </div>

                        {/* Traits */}
                        <div className="grid grid-cols-2 gap-4">
                            {traits.map((trait) => (
                                <div
                                    key={trait.label}
                                    className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                                >
                                    <trait.icon className="w-6 h-6 text-primary mb-2" />
                                    <div className="font-mono text-sm font-bold text-foreground">
                                        {trait.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {trait.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
