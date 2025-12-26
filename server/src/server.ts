import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import authRoute from "./routes/auth";
import uploadRoute from "./routes/upload";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", uploadRoute);

const PORT = 8080;

app.listen(PORT, () => {
  try {
    console.log(`Server started on PORT: ${PORT}`);
  } catch (error) {
    console.log("FAILED to connect to DB", error);
    process.exit(1);
  }
});
