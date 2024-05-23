import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYFILEPATH = path.join(__dirname, "../../drive-uplodes.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const uploadImage = async (fileObject) => {
  const filePath = fileObject.path;
  const fileStream = fs.createReadStream(filePath);
  try {
    const driveService = google.drive({ version: "v3", auth });

    // Upload the file
    const { data } = await driveService.files.create({
      media: {
        mimeType: fileObject.mimetype,
        body: fileStream,
      },
      requestBody: {
        name: fileObject.filename,
        parents: ["1zX-8mkKoGLzV3rm5qwhM_MNvpmFv06MX"], // Replace with your folder ID
      },
      fields: "id,name",
    });

    // Optionally, delete the local file after upload
    fs.unlinkSync(filePath);

    // Make the file public
    await driveService.permissions.create({
      fileId: data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Generate the public URL
    const fileUrl = `https://drive.google.com/uc?id=${data.id}&export=view`;

    return { id: data.id, url: fileUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};


const deleteImage = async (fileId) => {
    try {
      const driveService = google.drive({ version: "v3", auth });
      await driveService.files.delete({ fileId });
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  };

export {uploadImage,deleteImage};
