import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import { IUploadFileInfo } from '@custom-types/upload-files';
import { fileExtLimiter } from '@middleware/file-ext-limiter';
import { fileSizeLimiter } from '@middleware/file-size-limiter';
import { UploadFileModel } from '@models/upload-file-model';
import { AppRoute, PARENT_PATH_FILES, HttpStatusCodes, ResponseStatus } from '@utils/const';

class UploadFilesService {
  async getListFiles(): Promise<IUploadFileInfo[]> {
    return await UploadFileModel.find();
  };
  async uploadFiles(files: UploadedFile[], allowedExtensionFiles: string[], fileSizeLimitMb: number) {
    const messageExtLimiter: string | null = fileExtLimiter(files, allowedExtensionFiles);
    if (messageExtLimiter) {
      return {
        statusCode: HttpStatusCodes.UNPROCESSABLE_CONTENT,
        statusMessage: ResponseStatus.clientError,
        message: messageExtLimiter,
        payload: [],
      };
    }

    const messageSizeLimiter: string | null = fileSizeLimiter(files, fileSizeLimitMb);
    if (messageSizeLimiter) {
      return {
        statusCode: HttpStatusCodes.CONTENT_TOO_LARGE,
        statusMessage: ResponseStatus.clientError,
        message: messageSizeLimiter,
        payload: [],
      };
    }

    const forClientUrls: string[] = [];
    const staticUrls: string[] = [];

    for (const uploadedFile of files) {
      const fileExtension: string = path.extname(uploadedFile.name);
      const safeFileName: string =  uuidv4().concat(fileExtension);
      const filePathStatic: string = path.join(AppRoute.static, safeFileName);

      const fileInfo: IUploadFileInfo = {
        created_date: new Date(Date.now()).toISOString(),
        modified_date: new Date(Date.now()).toISOString(),
        created_by: 'admin',
        modified_by: 'admin',
        content_type: uploadedFile.mimetype,
        file_path: filePathStatic,
        origin_file_name: uploadedFile.name,
        safe_file_name: safeFileName,
        size: uploadedFile.size,
        extension: fileExtension,
      }

      const savedFile = await UploadFileModel.create(fileInfo);

      const filepath: string = path.join(__dirname, '../..', PARENT_PATH_FILES.join('/'), safeFileName); //  this ../.. to fix
      uploadedFile.mv(filepath, (error: Error) => {
        if (error) {
          return {
            statusCode: HttpStatusCodes.INTERNAL_SERVER,
            statusMessage: ResponseStatus.serverError,
            message: error.message,
            payload: [],
          };
        }
      });

      forClientUrls.push(uploadedFile.name);
      staticUrls.push(savedFile.file_path);
    }

    const messageSuccess = `The files ${forClientUrls.map(clientUrl => clientUrl)} uploaded successfully!`;
    // const urls = files.map(uploadedFile => path.join(AppRoute.static, uploadedFile.name));

    return {
      statusCode: HttpStatusCodes.OK,
      statusMessage: ResponseStatus.success,
      message: messageSuccess.replaceAll(',', ', '),
      payload: staticUrls,
    }
  };
}

const uploadFilesService = new UploadFilesService();

export {
  uploadFilesService,
};
