/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadImageToCloudinary = async (filename: string, path: string): Promise<Record<string, unknown>> => {
     // Configuration
     cloudinary.config({ 
        cloud_name: 'dqhf9ljat', 
        api_key: '638569423378198', 
        api_secret: 'sjadm1fcii1NvKrmzFW9494KhLY' // Click 'View API Keys' above to copy your API secret
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
    // console.log(uploadResult);
    
    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
};

export default uploadImageToCloudinary