import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }
    console.log("Uploading file to server:", image);
  };

  console.log("image: => ", image);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center m-2">
        <Input
          placeholder="Select an image"
          type="file"
          onChange={handleSetImage}
        />

        <Button onClick={handleUpload}>Upload</Button>
      </div>

      <div className="flex justify-center items-center">
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-40 h-40 object-cover rounded-lg border"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
