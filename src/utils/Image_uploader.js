import { bucket } from "../config/firebase.config.js";
import fs from "fs"


async function uploadImage(file) {
   
    try {
     const response =  await bucket.upload(file.path, {
        destination: `images/${file.filename}`,
        metadata: {
          contentType: file.mimetype, 
        },
      });

      fs.unlinkSync(file.path)
      const fileRef = response[0];
      await fileRef.makePublic();
      const publicUrl = fileRef.publicUrl();
     
      return {url:publicUrl,path:response[1].name}
    } catch (error) {
        fs.unlinkSync(file.path)
      console.error('Error uploading file:', error);
    }
  }


  async function deleteImage(filePath) {
    try {
      const file = bucket.file(filePath);
  
      await file.delete();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  export {uploadImage,deleteImage}


