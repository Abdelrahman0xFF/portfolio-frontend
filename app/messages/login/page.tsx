import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MessageLoginForm } from "@/components/message-login-form";
import {
    ADMIN_SESSION_COOKIE,
    verifyAdminSessionValue,
} from "@/lib/admin-auth";

export const metadata: Metadata = {
    title: "Admin Login",
    description: "Sign in to view sent messages.",
};

export default async function MessagesLoginPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (verifyAdminSessionValue(session)) {
        redirect("/messages");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="flex w-full max-w-md flex-col items-center gap-6">
                <div className="text-center">
                    <p className="font-mono text-sm text-primary">
                        RESTRICTED AREA
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-foreground">
                        Messages Admin
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Authenticate to access sent messages.
                    </p>
                </div>

                <MessageLoginForm />

                <Link
                    href="/"
                    className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    Back home
                </Link>
            </div>
        </main>
    );
}
