export interface MessageFormData {
    email: string;
    name: string;
    message: string;
}

export interface StoredMessage extends MessageFormData {
    id: string;
    createdAt: string;
}
