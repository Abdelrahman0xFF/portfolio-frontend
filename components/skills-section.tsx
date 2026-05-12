"use client";

import type React from "react";
import {
    FaReact,
    FaHtml5,
    FaCss3Alt,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaFigma,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { BiLogoTypescript } from "react-icons/bi";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiMongodb } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";


import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = {
    frontend: [
        { name: "HTML5", color: "#FF5722", hover: "#FF8A50" }, // Bright orange
        { name: "CSS3", color: "#1E90FF", hover: "#5EB8FF" }, // Electric blue
        { name: "JavaScript", color: "#FFD700", hover: "#FFFF33" }, // Neon yellow
        { name: "TypeScript", color: "#3B82F6", hover: "#60A5FA" }, // Vivid sky blue
        { name: "React", color: "#61DAFB", hover: "#A2F0FF" }, // Cyan glow
        { name: "Tailwind CSS", color: "#14B8A6", hover: "#4ADE80" }, // Bright teal
    ],
    backend: [
        { name: "Node.js", color: "#39D353", hover: "#6EEB83" }, // Neon green
        { name: "Express", color: "#FFFFFF", hover: "#E0E0E0" }, // White glow
        { name: "MongoDB", color: "#47A248", hover: "#6EEB83" }, // Neon green
        { name: "SQL Server", color: "#CC292B", hover: "#FF5252" } // Microsoft Red
    ],
    tools: [
        { name: "Git", color: "#E84D31", hover: "#FF8C8C" }, // Bright red
        { name: "GitHub", color: "#FFFFFF", hover: "#E0E0E0" }, // White glow
        { name: "Figma", color: "#FF3B30", hover: "#FF6F61" }, // Bright orange-red
    ],
};

function TechIcon({ name, color }: { name: string; color: string }) {
    const icons: Record<string, React.ReactNode> = {
        HTML5: <FaHtml5 className="w-full h-full" style={{ color }} />,
        CSS3: <FaCss3Alt className="w-full h-full" style={{ color }} />,
        JavaScript: (
            <IoLogoJavascript className="w-full h-full" style={{ color }} />
        ),
        TypeScript: (
            <BiLogoTypescript className="w-full h-full" style={{ color }} />
        ),
        React: <FaReact className="w-full h-full" style={{ color }} />,
        "Tailwind CSS": (
            <RiTailwindCssFill className="w-full h-full" style={{ color }} />
        ),
        "Node.js": <FaNodeJs className="w-full h-full" style={{ color }} />,
        "SQL Server": <DiMsqlServer className="w-full h-full" style={{ color }} />,
        Express: <SiExpress className="w-full h-full" style={{ color }} />,
        MongoDB: <SiMongodb className="w-full h-full" style={{ color }} />,
        Git: <FaGitAlt className="w-full h-full" style={{ color }} />,
        GitHub: <FaGithub className="w-full h-full" style={{ color }} />,
        Figma: <FaFigma className="w-full h-full" style={{ color }} />,
    };

    return <>{icons[name] ?? null}</>;
}

const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools & DevOps" },
];

export function SkillsSection() {
    const [activeCategory, setActiveCategory] = useState("frontend");

    return (
        <section id="skills" className="min-h-screen py-20 px-4 relative">
            {/* Background elements */}
            <div className="absolute inset-0 bg-liner-to-b from-background via-background/95 to-background" />
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg mb-4">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="font-mono text-sm text-primary tracking-wider">
                            Arsenal
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Tech Stack
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={cn(
                                "px-6 py-3  rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                                activeCategory === category.id
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50",
                            )}
                        >
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Icon grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {skills[activeCategory as keyof typeof skills].map(
                        (skill, index) => (
                            <div
                                key={skill.name}
                                className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 
                         hover:bg-card/60 hover:border-primary/30 transition-all duration-300
                         hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 text-foreground"
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    color: skill.hover,
                                }}
                            >
                                {/* Icon container */}
                                <div className="w-16 h-16 mx-auto mb-4 relative">
                                    <div
                                        className="absolute inset-0 rounded-xl opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40"
                                        style={{ backgroundColor: skill.hover }}
                                    />
                                    <div className="relative w-full h-full">
                                        <TechIcon
                                            name={skill.name}
                                            color={skill.color} // pass the original color
                                        />
                                    </div>
                                </div>

                                {/* Skill name */}
                                <p
                                    className="text-center text-sm font-medium transition-colors group-hover:text-[skill.hover]"
                                    style={{ color: skill.color }}
                                >
                                    {skill.name}
                                </p>

                                {/* Hover glow effect */}
                                <div
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at 50% 0%, ${skill.color}15 0%, transparent 70%)`,
                                    }}
                                />
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
