import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const userId = req.user.id;
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else if (file.fieldname === "mobile") {
      folder = "mobile";
    } else if (file.fieldname === "tablet") {
      folder = "tablet";
    } else if (file.fieldname === "desktop") {
      folder = "desktop";
    } else if (file.fieldname === "documents") {
      folder = "documents";
    } else {
      folder = "misc";
    }

    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg", "gif"],
      public_id: `${path.basename(
        file.originalname,
        path.extname(file.originalname)
      )}_${userId}`,
      transformation: folder === "avatars" ? [{ width: 350, height: 450 }] : [],
    };
  },
});

export const upload = multer({
  storage: storage,
});
