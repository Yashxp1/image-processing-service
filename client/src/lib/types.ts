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

export interface GetImagesResponse {
  success: boolean;
  data: ImageResource[];
}