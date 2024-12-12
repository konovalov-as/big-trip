import { Schema, model } from 'mongoose';
import type { IUploadFileInfo } from '@custom-types/upload-files';
import { transformResponsePlugin } from './transform-response';

const UploadFileSchema = new Schema<IUploadFileInfo>({
  created_date: { type: String, },
  modified_date: { type: String, },
  created_by: { type: String, required: true, default: 'admin', },
  modified_by: { type: String, required: true, default: 'admin', },
  content_type: { type: String, },
  file_path: { type: String, },
  origin_file_name: { type: String, },
  safe_file_name: { type: String, },
  size: { type: Number, },
  extension: { type: String, },
});

UploadFileSchema.plugin(transformResponsePlugin);
const UploadFileModel = model('UploadFile', UploadFileSchema);

export {
  UploadFileModel,
};
