import { StreamChat } from "stream-chat";

const apiKey = process.env.STREAM_API_KEY 
const apiSecret = process.env.STREAM_API_SECRET 

if (!apiKey || !apiSecret) {
    console.error("Stream API key or secret is not defined in environment variables.");
}

const streamClient = StreamChat.getInstance(apiKey!, apiSecret!);

export const upsertStreamUser = async (userData: { id: string; name?: string; image?: string; [key: string]: any }) => { 
    try {
        await streamClient.upsertUser(userData);
        return userData

    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }
}
export const generateStreamToken=(userId:string) => {
    try {
        const token = streamClient.createToken(userId); 
        return token
    } catch (error) {
        console.error("Error generating Stream token:", error);
    }
}