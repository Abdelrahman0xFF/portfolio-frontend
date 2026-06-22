"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Inbox, Trash2, Mail, RefreshCw, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    clearMessages,
    getMessages,
    deleteMessage,
} from "@/services/messages";
import type { StoredMessage } from "@/types/message";

function formatTimestamp(timestamp: string) {
    return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(timestamp));
}

export function MessagesDashboard() {
    const router = useRouter();
    const [messages, setMessages] = useState<StoredMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const handleAuthError = (message: string) => {
        if (message.toLowerCase().includes("unauthorized")) {
            router.replace("/messages/login");
            router.refresh();
        }
    };

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await getMessages();
                setMessages(data);
            } catch (loadError) {
                const message =
                    loadError instanceof Error
                        ? loadError.message
                        : "Failed to load messages.";
                setError(message);
                handleAuthError(message);
            } finally {
                setIsLoading(false);
            }
        };

        loadMessages();
    }, []);

    const refreshMessages = async () => {
        setIsLoading(true);
        setError("");
        try {
            const data = await getMessages();
            setMessages(data);
        } catch (refreshError) {
            const message =
                refreshError instanceof Error
                    ? refreshError.message
                    : "Failed to load messages.";
            setError(message);
            handleAuthError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMessage(id);
            setMessages((prev) => prev.filter((message) => message.id !== id));
        } catch (deleteError) {
            const message =
                deleteError instanceof Error
                    ? deleteError.message
                    : "Failed to delete message.";
            setError(message);
            handleAuthError(message);
        }
    };

    const handleClear = async () => {
        try {
            await clearMessages();
            setMessages([]);
        } catch (clearError) {
            const message =
                clearError instanceof Error
                    ? clearError.message
                    : "Failed to clear messages.";
            setError(message);
            handleAuthError(message);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", {
            method: "POST",
        });
        router.replace("/messages/login");
        router.refresh();
    };

    return (
        <main className="min-h-screen bg-background px-4 py-10 md:px-6">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="font-mono text-sm text-primary">
                            LOCAL TRANSMISSION LOG
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-foreground">
                            Sent Messages
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Messages are stored in this browser only.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button asChild variant="outline">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4" />
                                Back Home
                            </Link>
                        </Button>
                        <Button type="button" variant="outline" onClick={refreshMessages}>
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </Button>
                        <Button type="button" variant="outline" onClick={() => {
                            void handleLogout();
                        }}>
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleClear}
                            disabled={messages.length === 0 || isLoading}
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {error ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Could not load messages</CardTitle>
                                <CardDescription>{error}</CardDescription>
                            </CardHeader>
                        </Card>
                    ) : isLoading ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Loading messages...</CardTitle>
                                <CardDescription>
                                    Fetching data from your MongoDB cluster.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ) : messages.length === 0 ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Inbox className="w-5 h-5" />
                                    No saved messages yet
                                </CardTitle>
                                <CardDescription>
                                    Send a transmission from the contact form to populate this inbox.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ) : (
                        messages.map((message) => (
                            <Card key={message.id}>
                                <CardHeader className="pb-0">
                                    <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <CardTitle>{message.name}</CardTitle>
                                            <CardDescription>{message.email}</CardDescription>
                                        </div>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {formatTimestamp(message.createdAt)}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-4">
                                    <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
                                        {message.message}
                                    </p>
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                void handleDelete(message.id);
                                            }}
                                        >
                                            <Mail className="w-4 h-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
