import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
// console.log("'Đường dẫn đến", MessageRouter);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));  // Chỉ cần một lần với giới hạn 5mb
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

global.onlineUsers = new Map();
