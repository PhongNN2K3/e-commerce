import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dii1s7a0c",
  api_key: "996819332359427",
  api_secret: "jzTScikCRTV6TZ6-eE5xGjsifiQ",
});

const storage = new multer.memoryStorage();

const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

const upload = multer({ storage });

export { imageUploadUtil, upload };
