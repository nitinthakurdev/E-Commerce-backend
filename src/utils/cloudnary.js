import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key:  process.env.CLOUDINARY_API_KEY, 
  api_secret:  process.env.CLOUDINARY_SECRET
});

const UploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        const res = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        return res
    }catch(err){
        fs.unlinkSync(localFilePath)
        return null
    }
}


const DeleteOnCloudinary = async (imageid)=>{
    const res = await cloudinary.uploader.destroy(imageid)
    return res
}
export {UploadOnCloudinary,DeleteOnCloudinary}