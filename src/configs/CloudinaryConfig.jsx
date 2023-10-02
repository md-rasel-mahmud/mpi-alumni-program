// cloudinary.config.js
import { CloudinaryContext } from "cloudinary-react";

const cloudinaryConfig = {
  cloud_name: import.meta.env.VITE_cloudinary_name,
  api_key: import.meta.env.VITE_cloudinary_api_key,
};

export default cloudinaryConfig;
