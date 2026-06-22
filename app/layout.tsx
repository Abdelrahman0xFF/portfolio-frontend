import type React from "react";
import type { Metadata } from "next";
import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteCursor } from "@/components/site-cursor";
import "@/app/globals.css";

const _rajdhani = Rajdhani({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const _shareTechMono = Share_Tech_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://abdelrahmanashraf.dev"),
    title: {
        default: "Abdelrahman Ashraf | Software Engineer",
        template: "%s | Abdelrahman Ashraf",
    },
    description:
        "Software Engineer from Hurghada, Egypt, specializing in modern web technologies and Computer Engineering at Helwan University.",
    icons: {
        icon: [
            { url: "/favicon.png" },
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
        ],
        shortcut: "/favicon.png",
        apple: "/apple-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Abdelrahman Ashraf",
        url: "https://abdelrahmanashraf.dev",
        jobTitle: "Software Engineer",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Hurghada",
            addressRegion: "Red Sea",
            addressCountry: "Egypt",
        },
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Faculty of Engineering, Helwan University",
            alternateName: "Helwan Engineering",
        },
        sameAs: [
            "https://github.com/Abdelrahman0xFF",
            "https://www.linkedin.com/in/abdelrahman-ashraf-fathey",
        ],
        description:
            "Software Engineer from Hurghada, Egypt. Currently studying Computer Engineering at Helwan University and specializing in building high-performance web applications.",
    };

    return (
        <html lang="en" className="dark">
            <body className="font-sans antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <SiteCursor />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
