import type { MessageFormData, StoredMessage } from "@/types/message";

async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || "Failed to process message request.");
    }

    return response.json() as Promise<T>;
}

export async function sendMessage(message: MessageFormData) {
    const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });

    return parseResponse<StoredMessage>(response);
}

export async function getMessages() {
    const response = await fetch("/api/messages", {
        method: "GET",
        cache: "no-store",
    });

    return parseResponse<StoredMessage[]>(response);
}

export async function deleteMessage(id: string) {
    const response = await fetch(`/api/messages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
    });

    return parseResponse<{ ok: boolean }>(response);
}

export async function clearMessages() {
    const response = await fetch("/api/messages", {
        method: "DELETE",
    });

    return parseResponse<{ ok: boolean }>(response);
}
