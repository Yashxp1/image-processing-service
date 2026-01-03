import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUploadImages, useTransformImage } from "../hooks/api";

export type TransformationInput = {
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

const ImageUpload = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [transform, setTransform] = useState<TransformationInput>({});

  const { mutate: uploadImage, data, isPending, isError } = useUploadImages();

  const {
    mutate: transformImage,
    isPending: isTransformPending,
    isError: isTransformError,
  } = useTransformImage(data?.imageId ?? "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTransform((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : Number(value),
    }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTransform((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleCheckboxChange = (key: keyof TransformationInput) => {
    setTransform((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleUpload = () => {
    if (!image) return alert("Select an image first");
    uploadImage({ image });
  };

  const handleTransform = () => {
    if (!data?.imageId) {
      alert("Upload image first");
      return;
    }

    transformImage(transform);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg border border-zinc-700 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Image Workshop
        </h1>

        <div className="mb-6">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full rounded-lg border"
            />
          ) : (
            <div className="w-full aspect-video border-2 border-dashed flex items-center justify-center">
              No image selected
            </div>
          )}
        </div>

        {data?.imageId && (
          <div className="space-y-4 mb-6">
            <p className="border-b pb-2">Transformations</p>

            <div className="grid grid-cols-2 gap-3">
              <Input
                name="width"
                type="number"
                placeholder="Width"
                onChange={handleNumberChange}
              />
              <Input
                name="height"
                type="number"
                placeholder="Height"
                onChange={handleNumberChange}
              />
              <Input
                name="rotate"
                type="number"
                placeholder="Rotate"
                onChange={handleNumberChange}
              />
              <Input
                name="compress"
                type="number"
                placeholder="Compress"
                onChange={handleNumberChange}
              />
              <Input
                name="blur"
                type="number"
                placeholder="Blur"
                onChange={handleNumberChange}
              />
              <Input
                name="watermarkText"
                type="text"
                placeholder="Watermark"
                onChange={handleTextChange}
              />
            </div>

            <div className="flex gap-4">
              <label className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!transform.grayscale}
                  onChange={() => handleCheckboxChange("grayscale")}
                />
                Grayscale
              </label>

              <label className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!transform.flip}
                  onChange={() => handleCheckboxChange("flip")}
                />
                Flip
              </label>

              <label className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!transform.mirror}
                  onChange={() => handleCheckboxChange("mirror")}
                />
                Mirror
              </label>
            </div>

            <Button
              className="w-full"
              onClick={handleTransform}
              disabled={isTransformPending}
            >
              {isTransformPending ? "Transforming..." : "Transform"}
            </Button>
          </div>
        )}

        <div className="space-y-3 w-full flex flex-col items-center">
          <Input
            type="file"
            onChange={handleFileChange}
            className="w-full py-2"
          />

          <div className="flex w-full gap-2">
            <Button
              onClick={handleUpload}
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Uploading..." : "Upload"}
            </Button>

            <Button onClick={() => navigate("/images")} className="w-full">
              View Gallery
            </Button>
          </div>

          {isError && <p className="text-xs text-center">Upload failed</p>}

          {isTransformError && (
            <p className="text-xs text-center">Transformation failed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
