import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));  // Chỉ cần một lần với giới hạn 5mb
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/auth", AuthRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
