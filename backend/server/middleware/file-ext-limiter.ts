import { UploadedFile } from 'express-fileupload';
import path from 'path';

const fileExtLimiter = (uploadedFiles: UploadedFile[], allowedExtArray: String[]) : string | null => {
  const fileExtensions: string[] = [];

  uploadedFiles.forEach(uploadedFile => {
    fileExtensions.push(path.extname(uploadedFile.name))
  });

  // Are the file extension allowed? 
  const allowed = fileExtensions.every((ext: string) => allowedExtArray.includes(ext))

  if (!allowed) {
    const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(',', ', ');
    return message;
  }

  return null;
}

export {
  fileExtLimiter,
};
