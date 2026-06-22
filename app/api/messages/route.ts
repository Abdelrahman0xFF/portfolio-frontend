import { NextResponse } from "next/server";
import type { Collection } from "mongodb";
import { z } from "zod";
import { cookies } from "next/headers";
import {
    messagesCollectionName,
    getMongoClient,
    mongoDatabaseName,
} from "@/lib/mongodb";
import {
    ADMIN_SESSION_COOKIE,
    verifyAdminSessionValue,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

const messageSchema = z.object({
    name: z.preprocess(
        (value) => (typeof value === "string" ? value.trim() : ""),
        z.string().min(1).max(100),
    ),
    email: z.preprocess(
        (value) => (typeof value === "string" ? value.trim() : ""),
        z.string().min(1).max(254),
    ),
    message: z.preprocess(
        (value) => (typeof value === "string" ? value.trim() : ""),
        z.string().min(1).max(4000),
    ),
});

interface MessageDocument {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

async function getMessagesCollection(): Promise<Collection<MessageDocument>> {
    const client = await getMongoClient();
    return client.db(mongoDatabaseName).collection(messagesCollectionName);
}

async function requireAdminAccess() {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (!verifyAdminSessionValue(token)) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return null;
}

function toStoredMessage(doc: MessageDocument) {
    return {
        id: doc.id,
        name: doc.name,
        email: doc.email,
        message: doc.message,
        createdAt: doc.createdAt.toISOString(),
    };
}

export async function GET() {
    const unauthorized = await requireAdminAccess();
    if (unauthorized) {
        return unauthorized;
    }

    const collection = await getMessagesCollection();
    const messages = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    return NextResponse.json(messages.map(toStoredMessage));
}

export async function POST(request: Request) {
    const body = await request.json();
    const result = messageSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            {
                error: "Invalid message payload.",
                fields: result.error.flatten().fieldErrors,
            },
            { status: 400 },
        );
    }

    const collection = await getMessagesCollection();
    const createdAt = new Date();
    const id = crypto.randomUUID();
    await collection.insertOne({
        id,
        ...result.data,
        createdAt,
    });

    return NextResponse.json(
        {
            id,
            ...result.data,
            createdAt: createdAt.toISOString(),
        },
        { status: 201 },
    );
}

export async function DELETE(request: Request) {
    const unauthorized = await requireAdminAccess();
    if (unauthorized) {
        return unauthorized;
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const collection = await getMessagesCollection();

    if (id) {
        await collection.deleteOne({ id });
        return NextResponse.json({ ok: true });
    }

    await collection.deleteMany({});
    return NextResponse.json({ ok: true });
}
