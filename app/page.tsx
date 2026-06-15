import { HomeContent } from "@/components/home-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Abdelrahman Ashraf",
    description:
        "Portfolio of Abdelrahman Ashraf, a Software Engineer from Hurghada, Egypt. Specializing in Computer Engineering at Helwan University and building clean, scalable, high-performance web applications.",
    keywords: [
        "Abdelrahman Ashraf",
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
    authors: [{ name: "Abdelrahman Ashraf" }],
    openGraph: {
        title: "Abdelrahman Ashraf",
        description:
            "Explore the work and skills of Abdelrahman Ashraf, a passionate Full-Stack Developer.",
        url: "https://abdelrahmanashraf.dev",
        siteName: "Abdelrahman Ashraf Portfolio",
        images: [
            {
                url: "/3atef.jpg",
                width: 800,
                height: 800,
                alt: "Abdelrahman Ashraf",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Abdelrahman Ashraf",
        description:
            "Explore the work and skills of Abdelrahman Ashraf, a passionate Full-Stack Developer.",
        images: ["/3atef.jpg"],
    },
    alternates: {
        canonical: "https://abdelrahmanashraf.dev",
    },
};

export default function Home() {
    return <HomeContent />;
}
