import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3";
import { applyTransformations, TransformOptions } from "../lib/transform";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getImages = async (req: Request, res: Response) => {
  try {
    const images = await prisma.image.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const generateImageUrl = await Promise.all(
      images.map(async (img) => {
        const cmd = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: img.thumbnailKey || img.s3Key,
        });

        const url = await getSignedUrl(s3, cmd, { expiresIn: 3600 });

        return {
          ...img,
          url,
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: generateImageUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};

export const getImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(500)
        .json({ stata: false, message: "image id not found" });
    }

    const image = await prisma.image.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (!image) return res.status(404).json({ error: "Image not found" });

    const cmd = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: image.s3Key!,
    });

    const url = await getSignedUrl(s3, cmd, { expiresIn: 3600 });

    return res.status(200).json({
      success: true,
      data: {
        ...image,
        url,
      },
    });

    // const response = await s3.send(cmd);
    // const bodyContents = await response.Body?.transformToByteArray();

    // if (!bodyContents) throw new Error("Empty file body");

    // const transformedBuffer = Buffer.from(bodyContents);

    // res.set("Content-type", image.mimeType);

    // return res.status(200).send(transformedBuffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ stata: false, error });
  }
};

export const transfromImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const options: TransformOptions = req.body;

    if (!id || !options) return res.status(404).json({ error: "id not found" });

    const image = await prisma.image.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (!image) return res.status(404).json({ error: "Image not found" });

    const cmd = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: image.s3Key!,
    });

    const response = await s3.send(cmd);

    const bodyContents = await response.Body?.transformToByteArray();

    if (!bodyContents) throw new Error("Empty file body");

    const transformedBuffer = await applyTransformations(
      Buffer.from(bodyContents),
      options
    );

    const newFormat = options.format || "png";
    const newMimeType = `image/${newFormat}`;

    const newKey = `images-modified/${Date.now()}-${
      image.name
    }-edited.${newFormat}`;

    const cmd_transformed = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: newKey,
      Body: transformedBuffer,
      ContentType: options.format || "png",
    });

    await s3.send(cmd_transformed);

    await prisma.image.update({
      where: {
        id,
        userId: req.user.id,
      },
      data: {
        isEdited: true,
        mimeType: options.format || "png",
        s3Key: newKey,
      },
    });

    res.set("Content-type", newMimeType);
    return res.status(200).send(transformedBuffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
