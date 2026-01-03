export interface ImageResource {
  id: string;
  name: string | null;
  size: number | null;
  image_Url: string | null;
  mimeType: string;
  s3Key: string;
  thumbnailKey: string | null;
  isEdited: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  cached: boolean;
}

export interface GetImageByIdResponse {
  success: boolean;
  data: ImageResource;
}

export interface GetImagesResponse {
  success: boolean;
  data: ImageResource[];
}

export type TransformPayload = {
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
};

export type TransformResponse = {
  imageUrl: string;
};
