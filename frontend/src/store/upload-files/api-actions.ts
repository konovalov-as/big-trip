import axios, {AxiosProgressEvent} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  TState,
  TThunkApiConfig,
  TUploadFile,
  TUploadFiles,
} from '../../types';
import {
  uploadStart,
  uploadProgress,
  uploadSuccess,
  uploadFailure,
  uploadComplete,
  increaseFilesCount,
  deleteOneFile,
} from '../../store';
import {APIRoute, NameSpace} from '../../utils';

const ONE_HUNDRED_PERCENT: number = 100;

const getAsyncFilesList = createAsyncThunk<TUploadFile[], undefined, TThunkApiConfig>(
  `${NameSpace.UploadFiles}/fetchAllFiles`,
  async (_arg, {extra: api}): Promise<TUploadFile[]> => {
    const {data} = await api.get<TUploadFile[]>(APIRoute.UploadFiles);
    return data;
  }
)
const asyncUploadFiles = createAsyncThunk<TUploadFiles[], File[], TThunkApiConfig>(
  `${NameSpace.UploadFiles}/uploadFiles`,
  async(files: File[], {extra: api, dispatch, getState}): Promise<TUploadFiles[]> => {
    try {
      dispatch(uploadStart());
      const uploadFilesState: TState = getState();
      const filesCount: number = uploadFilesState[NameSpace.UploadFiles].filesCount;

      const uploadFilesPromises = files.map(async (oneFile: File, idx: number): Promise<TUploadFiles> => {
        const formData: FormData = new FormData();
        formData.append('files', oneFile);

        try {
          const {data} = await api.post<TUploadFiles>(APIRoute.UploadFiles, formData, {
            onUploadProgress: (progressEvent: AxiosProgressEvent): void => {
              if (progressEvent.total) {
                const progress: number = Math.round((progressEvent.loaded * ONE_HUNDRED_PERCENT) / progressEvent.total);
                dispatch(uploadProgress({ fileKey: filesCount + idx, progress }));
              }
            },
          })

          dispatch(uploadSuccess({fileKey: filesCount +  idx, file: data.files[0]}));
          dispatch(increaseFilesCount());
          return data;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            dispatch(uploadFailure(error.response.data.message));
          }
          throw error;
        }
      })

      const data: TUploadFiles[] = await Promise.all(uploadFilesPromises);
      dispatch(uploadComplete());
      return data;
    } catch (error: any) {
      dispatch(uploadFailure(error.response.data.message));
      throw error;
    }
  }
)

const deleteAsyncOneFile = createAsyncThunk<TUploadFile, string, TThunkApiConfig>(
  `${NameSpace.UploadFiles}/deleteOneFile`,
  async (fileId, {extra: api, dispatch}): Promise<TUploadFile> => {
    const {data} = await api.delete<TUploadFile>(`${APIRoute.UploadFiles}/${fileId}`);
    dispatch(deleteOneFile(data));
    return data;
  }
);

export {
  getAsyncFilesList,
  asyncUploadFiles,
  deleteAsyncOneFile,
};
