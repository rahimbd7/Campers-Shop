/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../../config';

const uploadImageToCloudinary = async (filename: string, path: string): Promise<Record<string, unknown>> => {
     // Configuration
     cloudinary.config({ 
        cloud_name: config.cloudinary_name as string, 
        api_key: config.cloudinary_api_key as string,
        api_secret: config.cloudinary_api_secret as string, // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           path, {
               public_id: filename,
           }
       )
       //unlink file from upload folder
      try {
        await fs.promises.unlink(path);
        // console.log("file has deleted successfully");
      } catch (error) {
        // console.log("failed to delete");
      }
    //    .catch((error) => {
    //        console.log(error);
    //    });
    return uploadResult;  
};



export const deleteImageFromCloudinary = async (imageUrl: string) => {
  const parts = imageUrl.split("/");
  const publicIdWithExt = parts[parts.length - 1];
  const publicId = publicIdWithExt.split(".")[0];

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
  }
};
export default uploadImageToCloudinary