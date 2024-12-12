import path from 'path';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer, { FileFilterCallback} from 'multer';

const UPLOAD_DIR: string[] = ['..', '..', 'uploads', 'multer'];
const uploadDirAbsolute = path.resolve(__dirname, ...UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (request: Request, file: Express.Multer.File, cb) {
    cb(null, uploadDirAbsolute);
  },
  filename: async function (request: Request, file: Express.Multer.File, cb) {
    const fileExtension: string = path.extname(file.originalname);
    const safeFileName: string =  uuidv4().concat(fileExtension);
    cb(null, safeFileName);
  },
});

const fileFilter = (request: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
  }

  // cb(new Error('I don\'t have a clue!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
});

export {
  upload as uploadMulter,
};
