"use client";

import type React from "react";

import { useState } from "react";
import { Send, Mail, CheckCircle, Terminal } from "lucide-react";
import { SiReaddotcv } from "react-icons/si";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sendMessage } from "@/services/messages";

export function ContactSection() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [terminalLines, setTerminalLines] = useState<string[]>([
        "> SAFE_HOUSE.connect()",
        "> Establishing secure connection...",
        "> Connection established.",
        "> Ready for incoming transmissions.",
    ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTerminalLines((prev) => [
            ...prev,
            `> Sending message from ${formState.name}...`,
        ]);

        try {
            await sendMessage(formState);
            setTerminalLines((prev) => [
                ...prev,
                "> Message stored in MongoDB cluster...",
                "> Transmission complete!",
            ]);
            setIsSubmitted(true);
            setFormState({ name: "", email: "", message: "" });
        } catch (error) {
            setTerminalLines((prev) => [
                ...prev,
                "> Error: Could not store transmission.",
                error instanceof Error ? `> ${error.message}` : "",
            ]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        {
            icon: FaGithub,
            label: "GitHub",
            href: "https://github.com/abdelrahman0xff",
        },
        {
            icon: FaLinkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/abdelrahman-ashraf-fathey/",
        },
        {
            icon: FaWhatsapp,
            label: "WhatsApp",
            href: "https://wa.me/+201123593773",
        },
        {
            icon: Mail,
            label: "Email",
            href: "mailto:abdelrahmanashraf6000@gmail.com",
        },
        {
            icon: SiReaddotcv,
            label: "Resume",
            href: "https://drive.google.com/file/d/1qlFz9Cpf5D93c3yv2t0GjBQf9Ic6K0J1/view?usp=sharing",
        },
    ];

    return (
        <section id="contact" className="relative pt-24 pb-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg mb-4">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="font-mono text-sm text-primary tracking-wider">
                            SAFE HOUSE
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Contact
                    </h2>
                    <p className="text-muted-foreground font-mono">
                        Send a transmission to get in touch
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Terminal */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-card border border-border rounded-lg overflow-hidden">
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
                                <div className="w-3 h-3 rounded-full bg-accent" />
                                <div className="w-3 h-3 rounded-full bg-primary" />
                                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                                <span className="ml-2 font-mono text-xs text-muted-foreground">
                                    secure_channel.sh
                                </span>
                            </div>
                            {/* Terminal content */}
                            <div className="p-4 h-64 overflow-y-auto font-mono text-sm">
                                {terminalLines.map((line, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "mb-1",
                                            line.includes("complete") ||
                                                line.includes("established")
                                                ? "text-primary"
                                                : "text-muted-foreground",
                                        )}
                                    >
                                        {line}
                                    </div>
                                ))}
                                <div className="flex items-center text-foreground">
                                    <span className="text-primary mr-2">
                                        {">"}
                                    </span>
                                    <span className="animate-pulse">_</span>
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="mt-6 flex items-center justify-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:text-primary transition-all group"
                                    aria-label={link.label}
                                    target="_blank"
                                >
                                    <link.icon
                                        className={cn(
                                            "w-6 h-6 duration-500 transition-transform group-hover:scale-110",
                                            link.label != "Resume"
                                                ? "group-hover:-rotate-20"
                                                : "-rotate-15 group-hover:-rotate-35",
                                        )}
                                    />
                                </a>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Link
                                href="/messages"
                                className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-sm text-primary transition-colors hover:bg-primary/20"
                            >
                                <Mail className="w-4 h-4" />
                                View Sent Messages
                            </Link>
                        </div>
                    </div>

                    {/* Contact form */}
                    <div className="order-1 lg:order-2">
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 bg-card border border-border rounded-lg"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Terminal className="w-5 h-5 text-primary" />
                                <span className="font-mono text-sm text-primary">
                                    NEW_TRANSMISSION
                                </span>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        Transmission Sent!
                                    </h3>
                                    <p className="text-muted-foreground font-mono text-sm">
                                        I&apos;ll respond to your message soon.
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="mt-6 bg-transparent"
                                        onClick={() => setIsSubmitted(false)}
                                    >
                                        Send Another
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-mono text-xs text-muted-foreground mb-2">
                                            CALLSIGN (NAME)
                                        </label>
                                        <input
                                            type="text"
                                            value={formState.name}
                                            onChange={(e) =>
                                                setFormState({
                                                    ...formState,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                            className="w-full  px-4 py-3 bg-secondary border border-border rounded-lg font-mono text-foreground focus:border-primary focus:outline-none transition-colors"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-mono text-xs text-muted-foreground mb-2">
                                            FREQUENCY (EMAIL)
                                        </label>
                                        <input
                                            type="email"
                                            value={formState.email}
                                            onChange={(e) =>
                                                setFormState({
                                                    ...formState,
                                                    email: e.target.value,
                                                })
                                            }
                                            required
                                            className="w-full  px-4 py-3 bg-secondary border border-border rounded-lg font-mono text-foreground focus:border-primary focus:outline-none transition-colors"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block  font-mono text-xs text-muted-foreground mb-2">
                                            MESSAGE
                                        </label>
                                        <textarea
                                            value={formState.message}
                                            onChange={(e) =>
                                                setFormState({
                                                    ...formState,
                                                    message: e.target.value,
                                                })
                                            }
                                            required
                                            rows={4}
                                            className="w-full  px-4 py-3 bg-secondary border border-border rounded-lg font-mono text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                                            placeholder="Enter your message"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-6 font-mono font-bold tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="animate-spin">
                                                    ⏳
                                                </span>
                                                TRANSMITTING...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                SEND TRANSMISSION
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-24 pt-8 border-t border-border text-center">
                    <p
                        className="font-mono text-sm text-muted-foreground"
                        suppressHydrationWarning
                    >
                        {new Date().getFullYear()} • Built with Abdelrahman
                        Ashraf
                    </p>
                    <p className="font-mono text-xs text-muted-foreground/50 mt-2">
                        Inspired by open-world games • All missions available
                    </p>
                </div>
            </div>
        </section>
    );
}
