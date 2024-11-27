import { NextRequest } from "next/server";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});


export const parseMultipartForm = async (req: NextRequest) => {
  const formData = await req.formData();
  const files: { [key: string]: Buffer } = {};
  const fields: { [key: string]: string } = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof Blob) {
      const buffer = Buffer.from(await value.arrayBuffer());
      files[key] = buffer;
    } else {
      fields[key] = value.toString();
    }
  }

  return { fields, files };
};