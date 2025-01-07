import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
    try {
        const uri = process.env.MONGODB || "";
        if (!uri) {
            console.error("MongoDB connection string is missing in the environment variables.");
            throw new Error("Missing MongoDB connection string");
        }

        // Connect to MongoDB
        await mongoose.connect(uri);

        console.log("Connection established to MongoDB");
    } catch (error) {
        console.error("Error in connectToDatabase:", error instanceof Error ? error.message : error);
        throw error;
    }
};

export default connectToDatabase;
