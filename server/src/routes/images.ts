import express from "express";
import { uploadImage } from "../controller/upload";
import { ProtectRoute } from "../middleware/auth";
import { upload } from "../middleware/multer";
import { getImageById, getImages, transfromImage } from "../controller/images";

const imageRoute = express.Router();

imageRoute.post("/upload", ProtectRoute, upload.single("image"), uploadImage);
imageRoute.get("/images", ProtectRoute, getImages);
imageRoute.get("/images/:id", ProtectRoute, getImageById);
imageRoute.post("/images/:id/transform", ProtectRoute, transfromImage);

export default imageRoute;
