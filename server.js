import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { Server } from 'socket.io';
import chatRoutes from './routes/chatRoutes.js';

import http from 'http';
import Message from './models/Messagemodel.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server , {
    cors : {
        origin : "*",
        methods : ["GET" , "POST"],
    },
});

await connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

io.on('connection' , (socket)=>{
    console.log("User connected to socket.io");

    socket.on("sendMessage" , async (data)=>{
        try{
            const newMessage = new Message({
                sender: data.senderId,
                content: data.content,
            });
            await newMessage.save();

            const populatedMessage = {
                _id : messageSchema._id,
                content : newMessage.content,
                createdAt:newMessage.createdAt,
                sender : {
                    _id : data.senderId,
                    username : data.senderName,
                    photoUrl : data.senderPhoto
                }
            }
            io.emit("receiveMessage" , populatedMessage);
        }catch(error){
            console.log("Error in saving message: ", error);
            
        }
 
    
    });
    socket.on("disconnect" , ()=>{
        console.log("User disconnected from socket.io");
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});