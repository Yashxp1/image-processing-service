import { Request, Response } from "express";
import { s3 } from "../lib/s3";
import {
  GetObject$,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { prisma } from "../lib/prisma";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const key = `images/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    const signedURL = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
      }),
      {
        expiresIn: 60 * 5,
      }
    );



    const image = await prisma.image.create({
      data: {
        userId: req.user.id ,
        s3Key: key,
        mimeType: file.mimetype,
      },
    });

    return res.status(201).json({
      success: true,
      imageId: image.id,
      url: signedURL,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
