import { FILE_SIZE_COEFFICIENT } from '@utils/const';
import { UploadedFile } from 'express-fileupload';

const fileSizeLimiter = (uploadedFiles: UploadedFile[], fileSizeLimitMb: number) : string | null => {
  const filesOverLimit: string[] = [];
  const FILE_SIZE_LIMIT = fileSizeLimitMb * FILE_SIZE_COEFFICIENT * FILE_SIZE_COEFFICIENT;

  // Which files are over the limit?
  uploadedFiles.forEach((uploadedFile) => {
    if (uploadedFile.size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(uploadedFile.name);
    }
  });
  
  if (filesOverLimit.length > 0) {
    const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

    const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${fileSizeLimitMb} MB.`.replaceAll(',', ', ');

    const message = filesOverLimit.length < 3
      ? sentence.replace(',', ' and')
      : sentence.replace(/,(?=[^,]*$)/, ' and');

    return message;
  }

  return null;
}

export {
  fileSizeLimiter,
};
