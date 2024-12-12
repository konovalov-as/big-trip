import {TState} from '../../types';
import {NameSpace} from '../../utils';

const selectIsUploading = (state: Pick<TState, NameSpace.UploadFiles>) => state[NameSpace.UploadFiles].isUploading;
const selectUploadFilesProgress = (state: Pick<TState, NameSpace.UploadFiles>) => state[NameSpace.UploadFiles].uploadFilesProgress;
const selectUploadFilesSuccess = (state: Pick<TState, NameSpace.UploadFiles>) => state[NameSpace.UploadFiles].uploadFilesSuccess;
const selectFilesCount = (state: Pick<TState, NameSpace.UploadFiles>) => state[NameSpace.UploadFiles].filesCount;
const selectFilesList = (state: Pick<TState, NameSpace.UploadFiles>) => state[NameSpace.UploadFiles].filesList;

export {
  selectIsUploading,
  selectUploadFilesProgress,
  selectUploadFilesSuccess,
  selectFilesCount,
  selectFilesList,
};
