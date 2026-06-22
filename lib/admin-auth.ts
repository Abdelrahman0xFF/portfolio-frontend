import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "portfolio-admin-session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function requireAuthSecret() {
    const secret = process.env.ADMIN_AUTH_SECRET;

    if (!secret) {
        throw new Error("Missing ADMIN_AUTH_SECRET environment variable.");
    }

    return secret;
}

function requireAdminPassword() {
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
        throw new Error("Missing ADMIN_PASSWORD environment variable.");
    }

    return password;
}

function base64UrlEncode(value: string) {
    return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
    return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string) {
    return createHmac("sha256", requireAuthSecret())
        .update(payload)
        .digest("base64url");
}

export function createAdminSessionValue() {
    const payload = JSON.stringify({
        exp: Date.now() + SESSION_TTL_MS,
    });

    const encodedPayload = base64UrlEncode(payload);
    const signature = signPayload(encodedPayload);

    return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionValue(token?: string | null) {
    if (!token) {
        return false;
    }

    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) {
        return false;
    }

    const expectedSignature = signPayload(encodedPayload);
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const actualBuffer = Buffer.from(signature, "utf8");

    if (
        expectedBuffer.length !== actualBuffer.length ||
        !timingSafeEqual(expectedBuffer, actualBuffer)
    ) {
        return false;
    }

    try {
        const payload = JSON.parse(base64UrlDecode(encodedPayload)) as {
            exp?: number;
        };

        if (!payload.exp || Date.now() > payload.exp) {
            return false;
        }
    } catch {
        return false;
    }

    return true;
}

export function verifyAdminPassword(password: string) {
    return password === requireAdminPassword();
}

export function createAdminCookieOptions() {
    return {
        httpOnly: true,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_TTL_MS / 1000,
    };
}
