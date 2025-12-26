import express from "express";
import { uploadImage } from "../controller/upload";
import { ProtectRoute } from "../middleware/auth";
import { upload } from "../middleware/multer";

const uploadRoute = express.Router();

uploadRoute.post("/upload", ProtectRoute, upload.single("image"), uploadImage);

export default uploadRoute 