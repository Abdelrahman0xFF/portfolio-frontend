"use client";

import { HeroSection } from "@/components/hero-section";
import { GameNavigation } from "@/components/game-navigation";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ExperienceSection } from "@/components/experience-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

export function HomeContent() {
    return (
        <main className="relative min-h-screen bg-background overflow-x-hidden ">
            <GameNavigation />
            <HeroSection />
            <ProjectsSection />
            <SkillsSection />
            <ExperienceSection />
            <AboutSection />
            <ContactSection />
        </main>
    );
}
