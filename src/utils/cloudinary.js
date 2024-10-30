
import { fs } from "fs";

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath){
            return null;
        }
        // upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto',
        })
        // File has been uploaded successfull
        console.log("File is uploaded on cloudinary",response.url)
        return response;
      
    }
    catch(error){
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operartion got failed
        return null;
    }
}

export {uploadOnCloudinary}
// Here upload something on the cloudinary
