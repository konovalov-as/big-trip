import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../utils';
import {
  // TCity,
  TUploadFile
} from '../../types';
import {getAsyncFilesList} from "./api-actions.ts";

type TUploadFilesProgress = {
  [key: number]: number;
}

type TUploadFilesSuccess = {
  [key: number]: TUploadFile;
}

type TUploadFilesData = {
  isUploading: boolean;
  uploadFilesProgress: TUploadFilesProgress,
  uploadFilesSuccess: TUploadFilesSuccess,
  filesCount: number,
  error: string,
  filesList: TUploadFile[],
  isLoadingFilesList: boolean,
}

const initialState: TUploadFilesData = {
  isUploading: false,
  uploadFilesProgress: {},
  uploadFilesSuccess: {},
  filesCount: 0,
  error: '',
  filesList: [],
  isLoadingFilesList: false,
}

const uploadFilesData = createSlice({
  name: NameSpace.UploadFiles,
  initialState,
  reducers: {
    uploadStart: (state): void => {
      state.isUploading = true;
      state.error = '';
    },
    uploadProgress: (state, action: PayloadAction<{fileKey: number, progress: number}>): void => {
      const {fileKey, progress} = action.payload;
      state.uploadFilesProgress[fileKey] = progress;
    },
    uploadSuccess: (state, action: PayloadAction<{fileKey: number, file: TUploadFile}>): void => {
      const {fileKey, file} = action.payload;
      state.uploadFilesSuccess[fileKey] = file;

      const index: number = state.filesList.findIndex((oneFile: TUploadFile): boolean => oneFile.id === file.id);
      if (index === -1) {
        state.filesList.push(file);
      }
    },
    clearFiles: (state): void => {
      state.uploadFilesSuccess = {};
    },
    uploadFailure: (state, action: PayloadAction<string>): void => {
      state.error = action.payload;
      state.isUploading = false;
      state.uploadFilesProgress = {};
    },
    uploadComplete: (state): void => {
      state.isUploading = false;
      state.uploadFilesProgress = {};
    },
    increaseFilesCount: (state): void => {
      state.filesCount++;
    },
    // decreaseFilesCount: (state): void => {
    //   state.filesCount--;
    // },
    setFilesCount: (state, action: PayloadAction<number>): void => {
      state.filesCount = action.payload;
    },

    deleteOneFileByKeyIdx: (state, action: PayloadAction<number>): void => {
      delete state.uploadFilesSuccess[action.payload];
    },
    deleteOneFile: (state: TUploadFilesData, action: PayloadAction<TUploadFile>): void => {
      state.filesList = state.filesList.filter((oneFile: TUploadFile): boolean => oneFile.id !== action.payload.id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAsyncFilesList.pending, (state): void => {
        state.isLoadingFilesList = true;
      })
      .addCase(getAsyncFilesList.rejected, (state): void => {
        state.isLoadingFilesList = false;
      })
      .addCase(getAsyncFilesList.fulfilled, (state, action: PayloadAction<TUploadFile[]>): void => {
        state.isLoadingFilesList = false;
        state.filesList = action.payload;
      })
  //     .addCase(asyncUploadFiles.pending, (state) => {
  //       state.isUploadingFiles = true;
  //     })
  //     .addCase(asyncUploadFiles.rejected, (state) => {
  //       state.isUploadingFiles = false;
  //     })
  //     .addCase(asyncUploadFiles.fulfilled, (state, action) => {
  //       state.isUploadingFiles = false;
  //       // state.files = action.payload.files;
  //       // state.files = action.payload.files;
  //     })
  }
});

const {
  uploadStart,
  uploadProgress,
  uploadSuccess,
  clearFiles,
  uploadFailure,
  uploadComplete,
  deleteOneFileByKeyIdx,
  increaseFilesCount,
  setFilesCount,
  deleteOneFile,
} = uploadFilesData.actions;

export {
  type TUploadFilesProgress,
  type TUploadFilesSuccess,
  uploadFilesData,
  uploadStart,
  uploadProgress,
  clearFiles,
  uploadSuccess,
  uploadFailure,
  uploadComplete,
  deleteOneFileByKeyIdx,
  increaseFilesCount,
  setFilesCount,
  deleteOneFile,
}
