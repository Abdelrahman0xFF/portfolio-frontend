import type { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
    mongoClient?: MongoClient;
    mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("Missing MONGODB_URI environment variable.");
    }

    if (!globalForMongo.mongoClientPromise) {
        globalForMongo.mongoClientPromise = import("mongodb").then(
            ({ MongoClient: MongoClientConstructor }) => {
                const client =
                    globalForMongo.mongoClient ??
                    new MongoClientConstructor(uri);
                globalForMongo.mongoClient = client;
                return client.connect();
            },
        );
    }

    return globalForMongo.mongoClientPromise;
}

export const mongoDatabaseName = process.env.MONGODB_DB ?? "portfolio";
export const messagesCollectionName = "messages";
