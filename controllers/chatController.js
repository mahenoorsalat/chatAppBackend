import Message from "../models/Messagemodel.js";
import User from "../models/userModels.js";
export const getChatHistory = async (req, res) => {
try {
        const messages = await Message.find({})
            .sort({ createdAt: 1 }) 
            .populate('sender', 'username photoUrl') 
            .limit(100); 

        return res.status(200).json(messages);
    } catch (error) {
        console.error("Fetch chat history error:", error);
        return res.status(500).json({ message: "Server error fetching chat history" });
    }
}


