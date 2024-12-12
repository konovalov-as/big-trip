import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { ALLOW_FILE_EXTENSION, AppRoute, FILE_SIZE_LIMIT_MB, HttpStatusCodes, ResponseStatus } from '@utils/const';
import { uploadFilesService } from '@services/upload-files-service';
import { Multer } from 'multer';
import { uploadMulterService } from '@services/upload-multer-service';
import { IUploadFileInfo } from '@custom-types/upload-files';
import { UploadFileModel } from '@models/upload-file-model';
import fs from 'fs';
import * as console from "node:console";

const UPLOAD_DIR: string[] = ['..', '..', 'uploads', 'multer'];
const uploadDirAbsolute = path.resolve(__dirname, ...UPLOAD_DIR);

class UploadMulterController {
  async getListFiles(_request: Request, response: Response, next: NextFunction) {
    try {
      const listFiles: IUploadFileInfo[] = await uploadMulterService.getListFiles();
      return response.json(listFiles);
    } catch (error) {
      next(error);
    }
  };
  async uploadFiles(request: Request, response: Response, next: NextFunction) {
    try {
      const candidateFiles = request.files;
      if (!candidateFiles?.length) {
        return response.status(HttpStatusCodes.BAD_REQUEST).json({ status: ResponseStatus.clientError, message: 'No files uploaded!'});
      }
      const incomeFiles: Express.Multer.File[] = Array.isArray(candidateFiles) ? candidateFiles : candidateFiles.fieldname;
      const {uploadedFiles} = await uploadMulterService.uploadFiles(incomeFiles);
      return response.json({ status: ResponseStatus.success, message: 'Files uploaded successfully', files: uploadedFiles});
    } catch(error) {
      next(error);
    }
  };
  async deleteOneFile(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const deletedOneFile: IUploadFileInfo | null = await uploadMulterService.deleteOneFile(id);

      if (deletedOneFile !== null) {
        const filePath: string = path.join(uploadDirAbsolute, deletedOneFile.safe_file_name);

        console.log('filePath = filePath ===== ', filePath)
        // Check if file exists before attempting to delete
        fs.access(filePath, fs.constants.F_OK, (error: NodeJS.ErrnoException | null) => {
          if (error) {
            return response.status(HttpStatusCodes.NOT_FOUND).json({status: ResponseStatus.clientError, message: 'File is not found on the disk'});
          }

          // Delete the file
          fs.unlink(filePath, (error: NodeJS.ErrnoException | null) => {
            if (error) {
              return response.status(HttpStatusCodes.INTERNAL_SERVER).json( { status: ResponseStatus.serverError, message: 'Error deleting the file' });
            }
            // response.json(deletedOneFile);
          });
        });

        return response.json(deletedOneFile);
      }

      return response.status(HttpStatusCodes.BAD_REQUEST).json({ status: ResponseStatus.clientError, message: 'File is not found in the database' });
    } catch (error) {
      next(error);
    }
  }
}

const uploadMulterController = new UploadMulterController();

export {
  uploadMulterController,
};
