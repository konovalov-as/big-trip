import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ALLOW_FILE_EXTENSION, FILE_SIZE_LIMIT_MB, HttpStatusCodes, ResponseStatus } from '@utils/const';
import { uploadFilesService } from '@services/upload-files-service';

class UploadFilesController {
  async getListFiles(request: Request, response: Response, next: NextFunction) {
    try {
      const listFiles = await uploadFilesService.getListFiles();
      return response.json(listFiles);
    } catch (error) {
      next(error);
    }
  };
  async uploadFiles(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.files) {
        return response.status(HttpStatusCodes.NOT_FOUND).json({ status: ResponseStatus.clientError, message: 'No files uploaded!'});
      }
      // const files: UploadedFile[] = Array.isArray(request.files.file) ? request.files.file : [request.files.file];
      const files: UploadedFile[] = [];
      const result = await uploadFilesService.uploadFiles(files, ALLOW_FILE_EXTENSION, FILE_SIZE_LIMIT_MB);
      response.status(result.statusCode).json({ status: result.statusMessage, message: result.message, payload: result.payload });
    } catch(error) {
      next(error);
    }
  };
}

const uploadFilesController = new UploadFilesController();

export {
  uploadFilesController,
};
