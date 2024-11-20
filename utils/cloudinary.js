import cloudinary from 'cloudinary'
import { fs } from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided");
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found at path: ${localFilePath}`);
        }

        // Resolve full path
        const fullPath = path.resolve(localFilePath);

        const response = await cloudinary.uploader.upload(fullPath, {
            resource_type: "auto"
        });

        console.log("File uploaded successfully", response.url);
        fstat.unlinkSync(fullPath);
        return response;

    } catch (error) {
        console.error("Error in uploadOnCloudinary:", error.message);
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export { uploadOnCloudinary }