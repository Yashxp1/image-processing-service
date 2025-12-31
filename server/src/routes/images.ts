import express from "express";
import { uploadImage } from "../controller/upload";
import { ProtectRoute } from "../middleware/auth";
import { upload } from "../middleware/multer";
import { getImageById, getImages, transfromImage } from "../controller/images";
import {
  imagesListLimiter,
  imageViewLimiter,
  uploadRateLimiter,
} from "../middleware/rateLimittter";

const imageRoute = express.Router();

imageRoute.post(
  "/upload",
  ProtectRoute,
  uploadRateLimiter,
  upload.single("image"),
  uploadImage
);
imageRoute.get("/images", ProtectRoute, imagesListLimiter, getImages);
imageRoute.get("/images/:id", ProtectRoute, imageViewLimiter, getImageById);
imageRoute.post("/images/:id/transform", ProtectRoute, transfromImage);

export default imageRoute;
