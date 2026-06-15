import { HomeContent } from "@/components/home-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Abdelrahman Asharf",
    description:
        "Portfolio of Abdelrahman Asharf, a Software Engineer from Hurghada, Egypt. Specializing in Computer Engineering at Helwan University and building clean, scalable, high-performance web applications.",
    keywords: [
        "Abdelrahman Asharf",
        "Software Engineer Hurghada",
        "Computer Engineering Helwan University",
        "Full-Stack Developer Egypt",
        "Web Developer Hurghada",
        "React Developer Egypt",
        "Next.js Portfolio",
        "Software Engineer",
        "Clean Code",
        "UI/UX Design",
    ],
    authors: [{ name: "Abdelrahman Asharf" }],
    openGraph: {
        title: "Abdelrahman Asharf",
        description:
            "Explore the work and skills of Abdelrahman Asharf, a passionate Full-Stack Developer.",
        url: "https://abdelrahmanashraf.dev",
        siteName: "Abdelrahman Asharf Portfolio",
        images: [
            {
                url: "/3atef.jpg",
                width: 800,
                height: 800,
                alt: "Abdelrahman Asharf",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Abdelrahman Asharf",
        description:
            "Explore the work and skills of Abdelrahman Asharf, a passionate Full-Stack Developer.",
        images: ["/3atef.jpg"],
    },
    alternates: {
        canonical: "https://abdelrahmanashraf.dev",
    },
};

export default function Home() {
    return <HomeContent />;
}
