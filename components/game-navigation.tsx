"use client";

import { useState, useEffect } from "react";
import {
    Map,
    Target,
    BarChart3,
    User,
    MessageSquare,
    Menu,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { id: "about", label: "Character", sublabel: "About Me", icon: User },
    { id: "skills", label: "Arsenal", sublabel: "Skills", icon: BarChart3 },
    { id: "experience", label: "Map", sublabel: "Projects", icon: Map },
    {
        id: "projects",
        label: "Missions",
        sublabel: "Experience",
        icon: Target,
    },
    {
        id: "contact",
        label: "Safe House",
        sublabel: "Contact",
        icon: MessageSquare,
    },
];

export function GameNavigation() {
    const [activeSection, setActiveSection] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            // Update active section based on scroll position
            const sections = navItems.map((item) =>
                document.getElementById(item.id),
            );
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            sections.forEach((section, index) => {
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(navItems[index].id);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block",
                    isScrolled
                        ? "bg-background/90 backdrop-blur-md border-b border-border"
                        : "bg-transparent",
                )}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <button
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                            className="font-mono  text-primary font-bold text-xl tracking-wider hover:text-glow transition-all"
                        >
                            {"<3ATEF/>"}
                        </button>

                        {/* Nav items */}
                        <div className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={cn(
                                        "group  relative px-4 py-2 font-mono text-sm tracking-wider transition-all duration-300",
                                        activeSection === item.id
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground",
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </span>
                                    {activeSection === item.id && (
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 bg-card/90 backdrop-blur-md border border-border rounded-lg text-primary"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md">
                    <div className="flex flex-col items-center justify-center h-full gap-6">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    "flex items-center gap-4 px-8 py-4 font-mono text-lg tracking-wider transition-all",
                                    activeSection === item.id
                                        ? "text-primary border border-primary/50 rounded-lg glow-amber"
                                        : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                <item.icon className="w-6 h-6" />
                                <div className="text-left">
                                    <div className="font-bold">
                                        {item.label}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {item.sublabel}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
