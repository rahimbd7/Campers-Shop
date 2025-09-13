import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import config from "../../config";
import { CLOUDINARY_BASE_FOLDER } from "./fileName.constant";

cloudinary.config({
  cloud_name: config.cloudinary_name as string,
  api_key: config.cloudinary_api_key as string,
  api_secret: config.cloudinary_api_secret as string,
});

// Upload buffer (unchanged)
export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  filename: string,
  moduleFolder: string
): Promise<{ secure_url: string }> => {
  const folderPath = `${CLOUDINARY_BASE_FOLDER}/${moduleFolder}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { public_id: filename, folder: folderPath },
      (error, result) => {
        if (error) return reject(error);
        if (result?.secure_url) resolve({ secure_url: result.secure_url });
        else reject(new Error("No secure_url returned from Cloudinary"));
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/**
 * Delete any image from Cloudinary using its URL
 */
export const deleteImageFromCloudinary = async (imageUrl: string) => {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/'); // ["", "image", "upload", "v1754314155", "users", "user@cs.com.jpg"]

    // Find index of version folder (starts with "v")
    const uploadIndex = pathParts.findIndex(part => part.startsWith('v'));
    if (uploadIndex === -1 || uploadIndex + 1 >= pathParts.length) throw new Error("Invalid Cloudinary URL");

    // Everything after version folder is public_id
    const publicIdParts = pathParts.slice(uploadIndex + 1); // ["users", "user@cs.com.jpg"]
    const fileWithExt = publicIdParts.join('/');             // "users/user@cs.com.jpg"
    const publicId = fileWithExt.replace(/\.[^/.]+$/, "");   // remove extension

    const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    console.log("Deleted from Cloudinary:", result);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
  }
};


export default uploadBufferToCloudinary;
