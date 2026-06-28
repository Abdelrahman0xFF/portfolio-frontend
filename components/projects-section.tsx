"use client";

import { useState } from "react";
import { ExternalLink, Github, Star, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
    {
        id: 1,
        name: "Nexus Academy",
        codename: "OPERATION: MANAGER",
        objective:
            "A modern Learning Management System (LMS) designed to deliver structured online courses, manage instructors and students, and track learning progress.",
        tech: ["React.js", "Tailwind CSS", "Express.js", "SQL Server"],
        difficulty: 5,
        status: "COMPLETED",
        xp: 4000,
        github: "https://github.com/Abdelrahman0xFF/nexus-academy",
        live: "https://nexus-academy-ashy.vercel.app/",
    },
    {
        id: 2,
        name: "Maqhaa",
        codename: "PROJECT: BREWMASTER",
        objective:
            "Web and Windowns application for a coffee shop, enabling customers to browse the menu, place orders, and make payments.",
        tech: [
            "React.js",
            "Express.js",
            "Supabase",
            "Electron.js",
            "sqlite3",
            "Tailwind CSS",
        ],
        difficulty: 5,
        status: "IN PROGRESS",
        xp: 5000,
        github: "https://github.com/Abdelrahman0xFF/offline-maqhaa",
    },

    {
        id: 3,
        name: "SpaceX",
        codename: "MISSION: CONNECT",
        objective:
            "A web application designed to manage and enhance workspace experiences for both users and administrators.",
        tech: ["React.js", "Xano API", "Bootstrap", "Vercel", "TypeScript"],
        difficulty: 5,
        status: "COMPLETED",
        xp: 3000,
        github: "https://github.com/abdelrahman0xff/Workspace",
        live: "https://workspace-alpha-sage.vercel.app/",
    },
    {
        id: 4,
        name: "MovieGo",
        codename: "OPERATION: STOREFRONT",
        objective:
            "A React movie app using TMDB API. Browse popular movies, search, view details, and save your favorites. Deployed on Vercel.",
        tech: ["React.js", "Tailwind CSS", "TMDB API"],
        difficulty: 4,
        status: "COMPLETED",
        xp: 2500,
        github: "https://github.com/abdelrahman0xff/movie-go",
        live: "https://movie-go-flame.vercel.app/",
    },
    {
        id: 5,
        name: "FlavorFinds",
        codename: "PROJECT: TASKMASTER",
        objective:
            "Made modern, responsive web application for discovering, organizing, and sharing delicious recipes.",
        tech: ["HTML5", "CSS3", "Bootstrap"],
        difficulty: 3,
        status: "COMPLETED",
        xp: 1200,
        github: "https://github.com/abdelrahman0xff/FlavorFinds",
        live: "https://abdelrahman0xff.github.io/FlavorFinds/",
    },
    {
        id: 6,
        name: "Portfolio",
        codename: "OPERATION: NEURAL",
        objective:
            "A personal portfolio website to showcase my skills, projects, and experience as a developer.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        difficulty: 2,
        status: "COMPLETED",
        xp: 1000,
        github: "https://github.com/abdelrahman0xff/portfolio",
        live: "https://abdelrahman0xff.github.io/portfolio/",
    },
];

export function ProjectsSection() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    return (
        <section id="projects" className="relative py-24 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg mb-4">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="font-mono text-sm text-primary tracking-wider">
                            MISSION LOG
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Projects
                    </h2>
                    <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
                        Select a mission to view objectives and rewards
                    </p>
                </div>

                {/* Projects grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            className={cn(
                                "group relative p-6 bg-card border border-border rounded-lg transition-all duration-300",
                                hoveredProject === project.id &&
                                    "border-primary/50 glow-amber",
                            )}
                        >
                            {/* Status badge */}
                            <div className="absolute top-4 right-4">
                                <span
                                    className={cn(
                                        "px-3 py-1 text-xs font-mono rounded-full",
                                        project.status === "COMPLETED"
                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                            : "bg-accent/20 text-accent border border-accent/30",
                                    )}
                                >
                                    {project.status}
                                </span>
                            </div>

                            {/* Mission info */}
                            <div className="mb-4">
                                <span className="font-mono text-xs text-primary tracking-wider">
                                    {project.codename}
                                </span>
                                <h3 className="text-xl font-bold text-foreground mt-1">
                                    {project.name}
                                </h3>
                            </div>

                            {/* Objective */}
                            <div className="mb-4">
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span>{project.objective}</span>
                                </div>
                            </div>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Stats row */}
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <div className="flex items-center gap-4">
                                    {/* Difficulty */}
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-mono text-muted-foreground mr-1">
                                            DIFF:
                                        </span>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "w-3 h-3",
                                                    i < project.difficulty
                                                        ? "text-primary fill-primary"
                                                        : "text-border",
                                                )}
                                            />
                                        ))}
                                    </div>
                                    {/* XP */}
                                    <div className="flex items-center gap-1 text-xs font-mono">
                                        <span className="text-primary">
                                            +{project.xp}
                                        </span>
                                        <span className="text-muted-foreground">
                                            XP
                                        </span>
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-2">
                                    <a
                                        href={project.github}
                                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label="View on GitHub"
                                    >
                                        <Github className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={project.live}
                                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                        aria-label="View live demo"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
