"use client";

import { useRef, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    chapter: "Chapter 1",
    title: "Computer Engineering Student",
    company: "Faculty of Engineering, Helwan University",
    period: "2023 - 2028",
    description:
      "Pursuing a degree in Computer Engineering with a focus on software development and systems architecture. Engaging in various projects and internships to enhance practical skills.",
    achievements: ["Distinction Grade", "Mentor at FEHU-CPC"],
    status: "CURRENT QUEST",
  },
  {
    chapter: "Chapter 2",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2025 - Currently",
    description:
      "Providing web development services to clients, focusing on building responsive and user-friendly websites using modern technologies.",
    achievements: [
      "Client satisfaction",
      "Diverse project experience",
      "Time management",
    ],
    status: "CURRENT QUEST",
  },
  {
    chapter: "Chapter 3",
    title: "MEAN Stack Developer",
    company: "Natiional Technology Institute (NTI)",
    period: "JUL 2026",
    description:
      "Specializing in the MEAN stack (MongoDB, Express.js, Angular, Node.js) for full-stack web development. Gained experience in building scalable and maintainable web applications.",
    achievements: [
      "Angular development",
      "Freelancing experience",
      "Project deployment",
    ],
    status: "COMPLETED",
  },
  {
    chapter: "Chapter 4",
    title: "React Frontend Developer",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "JUN 2025 - DEC 2025",
    description:
      "Learned about React and frontend development through hands-on projects and mentorship. Contributed to building user interfaces for web applications.",
    achievements: [
      "Team collaboration",
      "UI/UX best practices",
      "Project deployment",
    ],
    status: "COMPLETED",
  },
];

export function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 },
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="relative py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg mb-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-mono text-sm text-primary tracking-wider">
              STORY PROGRESSION
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-muted-foreground font-mono">
            The chapters of my development journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1.75 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-index={index}
              className={cn(
                "relative mb-12 transition-all duration-700",
                visibleItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10",
              )}
            >
              <div
                className={cn(
                  "md:w-1/2",
                  index % 2 === 0 ? "md:pr-12 md:ml-auto" : "md:pl-12",
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-2 bg-background md:-translate-x-1/2",
                    exp.status === "CURRENT QUEST"
                      ? "border-primary bg-primary"
                      : "border-muted-foreground",
                  )}
                />

                {/* Content card */}
                <div className="ml-8 md:ml-0 p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  {/* Chapter badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-primary tracking-wider">
                      {exp.chapter}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-1 text-xs font-mono rounded",
                        exp.status === "CURRENT QUEST"
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {exp.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {exp.title}
                  </h3>
                  <div className="text-muted-foreground font-mono text-sm mt-1">
                    {exp.company} • {exp.period}
                  </div>

                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mt-4 space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
