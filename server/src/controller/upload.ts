import { Request, Response } from "express";
import { s3 } from "../lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../lib/prisma";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const timestamp = Date.now();

    const originalKey = `images/${timestamp}-${file.originalname}`;

    const originalFile = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: originalKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(originalFile);

    const image = await prisma.image.create({
      data: {
        userId: req.user.id,
        s3Key: originalKey,
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      },
    });

    return res.status(201).json({ success: true, imageId: image.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
