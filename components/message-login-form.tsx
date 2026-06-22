"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MessageLoginForm() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const data = (await response.json().catch(() => null)) as
                    | { error?: string }
                    | null;
                throw new Error(data?.error || "Login failed.");
            }

            router.replace("/messages");
            router.refresh();
        } catch (loginError) {
            setError(
                loginError instanceof Error
                    ? loginError.message
                    : "Login failed.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-xl border border-border bg-card p-6"
        >
            <div className="mb-6 flex items-center gap-2">
                <LockKeyhole className="w-5 h-5 text-primary" />
                <h1 className="text-xl font-bold text-foreground">
                    Admin Access
                </h1>
            </div>

            <label className="mb-2 block font-mono text-xs text-muted-foreground">
                ADMIN PASSWORD
            </label>
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 font-mono text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Enter admin password"
            />

            {error ? (
                <p className="mt-3 text-sm text-destructive">{error}</p>
            ) : null}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full"
            >
                <LogIn className="w-4 h-4" />
                {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
        </form>
    );
}
