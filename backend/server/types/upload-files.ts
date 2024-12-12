
interface IBaseFileInfo {
  created_date: string;
  modified_date: string;
  created_by: string;
  modified_by: string;
}

interface IUploadFileInfo extends IBaseFileInfo {
  content_type: string;
  file_path: string;
  origin_file_name: string;
  safe_file_name: string;
  size: number;
  extension: string;
}

export {
  type IUploadFileInfo,
}
