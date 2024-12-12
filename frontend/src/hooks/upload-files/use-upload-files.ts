import {
  useState,
  RefObject,
  DragEvent, ChangeEvent,
} from 'react';
import {asyncUploadFiles} from '../../store'
import {useAppDispatch} from '../state/state.ts';
import type {TAppDispatch} from '../../types';
import {toast} from "react-toastify";

const useFileUpload = (filesInputRef: RefObject<HTMLInputElement>) => {
  const dispatch: TAppDispatch = useAppDispatch();
  const [drag, setDrag] = useState<boolean>(false);
  const [isDropZoneTouched, setIsDropZoneTouched] = useState<boolean>(false);

  const fillInStorageFiles = (filesList: FileList): void => {
    if (filesList) {
      const uploadFiles: File[] = [...filesList];
      // Now we have `File[]` type
      // This only works on es6 version make sure to set your tsconfig.json "target" to "es6"
      setIsDropZoneTouched(true);
      dispatch(asyncUploadFiles(uploadFiles));
    }
  };

  const handleChangeFiles = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (evt.target.files) {
      // This gives us the data on what files are selected
      // However, it's of type `FileList` which is hard to modify.
      const filesList: FileList = evt.target.files;
      // Let's convert `FileList` into a `File[]`
      fillInStorageFiles(filesList);
    } else {
      return toast.warn('No files upload!', {position: toast.POSITION.TOP_CENTER});
    }
  };

  const handleChooseFiles = (): void => {
    if (filesInputRef.current) {
      filesInputRef.current.click();
      setIsDropZoneTouched(true);
    }
  };

  const handleDragStart = (evt: DragEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    setDrag(true);
    setIsDropZoneTouched(false);
  };

  const handleDragLeave = (evt: DragEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    setDrag(false);
    setIsDropZoneTouched(true);
  };

  const handleDragOver = (evt: DragEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    setDrag(true);
  };

  const handleDrop = (evt: DragEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    const filesList: FileList | null = evt.dataTransfer.files;
    if (filesList) {
      fillInStorageFiles(filesList);
    }
    setDrag(false);
    // return toast.warn('No files upload!', {position: toast.POSITION.TOP_CENTER});
  };

  return {
    drag,
    isDropZoneTouched,
    setIsDropZoneTouched,
    handleChangeFiles,
    handleChooseFiles,
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};

export default useFileUpload;
