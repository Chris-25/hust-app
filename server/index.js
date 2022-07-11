
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";

const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use("/chat", chatRouter);

//const CONNECTION_URL = 'mongodb+srv://vietduc:vietduchome@cluster0.oktlocz.mongodb.net/?retryWrites=true&w=majority';
const CONNECTION_URL = 'mongodb+srv://vietduc:vietduc258@cluster0.x0pkd0u.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => httpServer.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {

    console.log(`${socket.id} is connected`);

    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
    });
});
