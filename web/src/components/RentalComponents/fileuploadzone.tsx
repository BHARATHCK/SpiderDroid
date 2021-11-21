import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";

interface uploadprops {
  setImageResponse: React.Dispatch<React.SetStateAction<any[]>>;
}

const Upload: React.FC<uploadprops> = ({ setImageResponse }) => {
  const [files, setFiles] = useState<File[]>([]);

  let preUFile = [];

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = async (_, allFiles) => {
    let imageURL = [];
    allFiles.forEach(async (file) => {
      const uploadURL = process.env.NEXT_PUBLIC_CLOUDINARY_API;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("upload_preset", uploadPreset);
      const response = await fetch(uploadURL, {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      imageURL.push(res.url);
      setImageResponse(imageURL);
      file.remove();
    });
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={10}
      inputContent="Drop 3 Files or click to upload"
      inputWithFilesContent={(files) => `${files.length} uploaded`}
      submitButtonDisabled={(files) => files.length < 3}
    />
  );
};

export default Upload;
