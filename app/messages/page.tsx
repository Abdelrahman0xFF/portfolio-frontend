import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MessagesDashboard } from "@/components/messages-dashboard";
import {
    ADMIN_SESSION_COOKIE,
    verifyAdminSessionValue,
} from "@/lib/admin-auth";

export const metadata: Metadata = {
    title: "Sent Messages",
    description: "View saved contact form submissions.",
};

export default async function MessagesPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (!verifyAdminSessionValue(session)) {
        redirect("/messages/login");
    }

    return <MessagesDashboard />;
}
