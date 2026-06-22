import { NextResponse } from "next/server";
import { z } from "zod";
import {
    ADMIN_SESSION_COOKIE,
    createAdminCookieOptions,
    createAdminSessionValue,
    verifyAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

const loginSchema = z.object({
    password: z.string().min(1),
});

export async function POST(request: Request) {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            { error: "Invalid login payload." },
            { status: 400 },
        );
    }

    if (!verifyAdminPassword(result.data.password)) {
        return NextResponse.json(
            { error: "Invalid admin password." },
            { status: 401 },
        );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(
        ADMIN_SESSION_COOKIE,
        createAdminSessionValue(),
        createAdminCookieOptions(),
    );

    return response;
}
