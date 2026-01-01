import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import cookieParser from "cookie-parser";
import imageRoute from "./routes/images";

const app = express();
app.use(cookieParser());

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", imageRoute);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
