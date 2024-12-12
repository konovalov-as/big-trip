type TFileIdInfo = {
  fileId:string,
  idx: number,
}

type TUploadFile = {
  content_type: string,
  created_by: string,
  created_date: string,
  extension: string,
  file_path: string,
  id: string,
  modified_by: string,
  modified_date: string
  origin_file_name: string,
  safe_file_name: string,
  size: number,
}

type TUploadFiles = {
  status: string,
  message: string,
  files: TUploadFile[],
}

export {
  type TFileIdInfo,
  type TUploadFile,
  type TUploadFiles,
};
