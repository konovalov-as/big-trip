import path from 'path';
import { UploadFileModel } from '@models/upload-file-model';
import { IUploadFileInfo } from '@custom-types/upload-files';
import { AppRoute } from '@utils/const';

class UploadMulterService {
  async getListFiles(): Promise<IUploadFileInfo[]> {
    return await UploadFileModel.find();
  };
  async uploadFiles(incomeFiles: Express.Multer.File[]) {
    const uploadedFiles = [];
    const CREATOR: string = 'admin';
    for (const file of incomeFiles) {
      const filePathStatic: string = path.join(AppRoute.static, file.filename);
      const fileExtension: string = path.extname(file.originalname);

      const fileInfo: IUploadFileInfo = {
        created_date: new Date(Date.now()).toISOString(),
        modified_date: new Date(Date.now()).toISOString(),
        created_by: CREATOR,
        modified_by: CREATOR,
        content_type: file.mimetype,
        file_path: filePathStatic,
        origin_file_name: file.originalname,
        safe_file_name: file.filename,
        size: file.size,
        extension: fileExtension,
      }

      const savedFile = await UploadFileModel.create(fileInfo);
      uploadedFiles.push(savedFile);        
    }
    
    return {
      uploadedFiles,
    }
  };
  async deleteOneFile(id: string): Promise<IUploadFileInfo | null> {
    return UploadFileModel.findByIdAndDelete(id);
  };
}

const uploadMulterService = new UploadMulterService();

export {
  uploadMulterService,
};
