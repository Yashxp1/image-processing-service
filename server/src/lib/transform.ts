import sharp from "sharp";

export interface TransformOptions {
  width?: number;
  height?: number;
  rotate?: number;
  format?: "jpeg" | "png" | "webp";
  grayscale?: boolean;
  compress?: number;
  flip?: boolean;
  mirror?: boolean;
  watermarkText?: string;
  blur?: number;
}

export const applyTransformations = async (
  imageBuffer: Buffer,
  options: TransformOptions
) => {
  try {
    let pipeline = sharp(imageBuffer);

    //crop
    if (options.width || options.height) {
      pipeline = pipeline.resize(options.width, options.height, {
        fit: "cover",
      });
    }

    //rotate
    if (options.rotate) {
      pipeline = pipeline.rotate(options.rotate);
    }


    //filter
    if (options.grayscale) pipeline = pipeline.grayscale();

    //blur
    if(options.blur) pipeline = pipeline.blur(options.blur)


    //watermarK
    if (options.watermarkText) {
      const svgWatermark = Buffer.from(
        `<svg><text x="10" y="30" font-size="30" fill="white">${options.watermarkText}</text></svg>`
      );

      pipeline = pipeline.composite([
        { input: svgWatermark, gravity: "southeast" },
      ]);
    }

    //compress nd image-format
    const quality = options.compress || 80;
    if (options.format === "jpeg") pipeline = pipeline.jpeg({ quality });
    if (options.format === "webp") pipeline = pipeline.webp({ quality });
    if (options.format === "png") pipeline = pipeline.png({ quality });

    return await pipeline.toBuffer();
  } catch (error) {
    console.log(error);
  }
};
