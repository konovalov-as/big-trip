import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
} from 'react';
import {FormikErrors, useFormik} from 'formik';
import {
  TUploadFilesProgress,
  TUploadFilesSuccess,
  createAsyncDestination,
  updateAsyncDestination,
  selectCities,
  selectDestinations,
  selectIsUploading,
  selectUploadFilesProgress,
  selectUploadFilesSuccess,
  selectFilesCount,
  setEditDestinationId,
  clearFiles,
  setFilesCount, deleteAsyncOneFile, deleteOneFileByKeyIdx,
} from '../../../store';
import {
  useAppSelector,
  useAppDispatch,
  useUploadFiles,
} from '../../../hooks';
import {
  CloseIcon,
  UploadIcon,
  SaveIcon,
  DeleteIcon,
} from '../../icons';
import {
  TCity,
  TCities,
  TIsFocusedPictureDescriptions,
  TPictureDescriptions,
  TPictureDescriptionsErrors,
  TNewDestination,
  TPicture,
  TUploadFile,
  TAppDispatch,
  TDestinations,
  TDestination,
} from '../../../types';
import {
  CustomInput,
  CustomSelect,
} from '../../../components';
import {IOneOption} from '../offers/edit-offer.tsx';
import {DestinationPictureItem} from './destination-picture-item.tsx';
import {EditDestinationPicture} from './edit-destination-picture.tsx';
import {DestinationPicturesList} from './destination-pictures-list.tsx';
import {KEY_FOR_DELETE_PICTURE_DESCRIPTION} from '../../../utils';

interface IEditDestinationProps {
   name: string;
   description: string;
   destinationId: string;
   pictures: TPicture[];
 }

const validate = (values: TNewDestination) => {
  const errors: FormikErrors<TNewDestination> = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.description) {
    errors.description = 'Required'
  }

  Object.keys(values.pictureDescriptions).forEach((key: string): void => {
    const description: string = values.pictureDescriptions[parseInt(key)];
    if (!description || description.trim() === '') {
      if (!errors.pictureDescriptions) errors.pictureDescriptions = {};
      errors.pictureDescriptions[parseInt(key)] = 'Required';
    }
  });

  return errors;
};

function EditDestination({
                           name,
                           description,
                           destinationId,
                           pictures,
}: IEditDestinationProps): JSX.Element {
  const dispatch: TAppDispatch = useAppDispatch();

  const cities: TCities = useAppSelector(selectCities);
  const destinations: TDestinations = useAppSelector(selectDestinations);
  const isUploading: boolean = useAppSelector(selectIsUploading);
  const uploadFilesProgress: TUploadFilesProgress = useAppSelector(selectUploadFilesProgress);
  const uploadedFilesSuccess: TUploadFilesSuccess = useAppSelector(selectUploadFilesSuccess);
  const filesCount: number = useAppSelector(selectFilesCount);

  const [availableCities, setAvailableCities] = useState<TCities>([]);
  const [picturesLocalState, setPicturesLocalState] = useState<TPicture[]>(pictures);
  const [pictureDescriptionEditItem, setPictureDescriptionEditItem] = useState<string[]>(Array.from({ length: pictures.length },(_v: string, k: number): string => pictures[k].description));
  const [isFocusedPicturesDesc, setIsFocusedPicturesDesc] = useState<TIsFocusedPictureDescriptions>({});
  const [isTouchedPicDescEditItem, setIsTouchedPicDescEditItem] = useState<boolean[]>(new Array<boolean>(pictures.length).fill(false));
  const [filesIdForDelete, setFilesIdForDelete] = useState<string[]>([]);

  const filesInputRef = useRef<HTMLInputElement>(null);
  const {
    drag,
    isDropZoneTouched,
    setIsDropZoneTouched,
    handleChangeFiles,
    handleChooseFiles,
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useUploadFiles(filesInputRef);

  const formik = useFormik<TNewDestination>( {
    initialValues: {
      name,
      description,
      pictureDescriptions: {} as TPictureDescriptions,
    },
    validate,
    onSubmit: (values: TNewDestination, {resetForm}): void => {
      // if (!Object.values(uploadedFilesSuccess).length) {
      //   setIsDropZoneTouched(true);
      //   return;
      // }

      for (const valuesKey in values.pictureDescriptions) {
        if (values.pictureDescriptions[valuesKey] === KEY_FOR_DELETE_PICTURE_DESCRIPTION) {
          delete values.pictureDescriptions[valuesKey];
        }
      }

      // update destination
      if (destinationId) {
        const adaptedPictures: TPicture[] = Object.entries(uploadedFilesSuccess).map(([keyIndx, oneFile] : [string, TUploadFile]): TPicture => ({
          src: oneFile.safe_file_name,
          description: values.pictureDescriptions[Number(keyIndx)],
        }))
        dispatch(updateAsyncDestination({
          id: destinationId,
          name: values.name,
          description: values.description,
          pictures: [...picturesLocalState, ...adaptedPictures],
        }))
        dispatch(clearFiles());
        dispatch(setFilesCount(0));
        dispatch(setEditDestinationId(null));

        filesIdForDelete.forEach((fileId: string): void=> {
          console.log('fileId', fileId)
          dispatch(deleteAsyncOneFile(fileId));
        })
        // dispatch(deleteAsyncOneFile(fileId));

        formik.setFieldValue('pictureDescriptions', {});
        formik.setErrors({});
        formik.setTouched({});
        return;
      }

      // updated destination
      const adaptedPictures: TPicture[] = Object.entries(uploadedFilesSuccess).map(([keyIdx, oneFile] : [string, TUploadFile]): TPicture => ({
        src: oneFile.safe_file_name,
        description: values.pictureDescriptions[Number(keyIdx)],
      }));
      dispatch(createAsyncDestination({
        id: destinationId,
        name: values.name,
        description: values.description,
        pictures: adaptedPictures,
      }))
      setIsDropZoneTouched(false);
      dispatch(clearFiles());
      resetForm();
      filesInputRef.current ? filesInputRef.current.value = '' : null;
    },
    // validateOnChange: false,
    // validateOnBlur: false,
  });

  const citiesOptions: IOneOption[] = availableCities.map((oneCity:TCity): IOneOption => ({
    key: oneCity.id,
    value: oneCity.name,
  }));

  const handleCancelChanging = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    dispatch(setEditDestinationId(null));
  };

  const handleChangePictureDescriptionUpdate = (value: string, idx: number): void => {
    setPictureDescriptionEditItem((prevState: string[]) => {
      const newState: string[] = [...prevState];
      newState[idx] = value;
      return newState;
    });

    setPicturesLocalState((prevPictures: TPicture[]) =>
      prevPictures.map((onePicture: TPicture, onePictureIdx: number): TPicture => ({
        ...onePicture,
        description: onePictureIdx === idx ? value : onePicture.description,
      }))
    );
  };

  const handleBlurPictureDescriptionUpdate = (idx: number): void => {
    setIsTouchedPicDescEditItem((prevState: boolean[]) => {
      const newState: boolean[] = [...prevState];
      newState[idx] = true;
      return newState;
    })
  };

  const handleDeletePicture = (idx: number, onePicture: any): void => {

    setFilesIdForDelete((prevState: string[]): string[] => {
      return [...prevState, onePicture.id];
    });

    setPictureDescriptionEditItem((prevState: string[]): string[] => prevState.filter((_: string, stateIdx: number): boolean => stateIdx !== idx));
    setPicturesLocalState((prevState: TPicture[]): TPicture[] => prevState.filter((_: TPicture, stateIdx: number): boolean => stateIdx !== idx));
    setIsTouchedPicDescEditItem((prevState: boolean[]): boolean[] => prevState.filter((_: boolean, stateIdi: number): boolean => stateIdi !== idx));
  };

  useEffect((): void => {
    const startPictureDescriptions: TPictureDescriptions = {}
    for (let index: number = 0; index < filesCount; index++) {
      startPictureDescriptions[index] = formik.values.pictureDescriptions[index] ? formik.values.pictureDescriptions[index] : '';
    }

    formik.setFieldValue('pictureDescriptions', startPictureDescriptions);
  }, [uploadedFilesSuccess, filesCount, formik]);

  useEffect((): void => {
    const filteredCities: TCities = cities.filter((oneCity: TCity) =>
      !destinations.some((oneDestination: TDestination): boolean => oneDestination.name === oneCity.name)
    );
    setAvailableCities(filteredCities);

    if (name) {
      const currentCity: TCity | undefined = cities.find(
        (oneCity: TCity): boolean => oneCity.name.toUpperCase() === name.toUpperCase()
      );
      if (currentCity) {
        setAvailableCities((prevState: TCities) => [currentCity, ...prevState]);
      }
    }
  }, [destinations, cities, name]);

  return (
    <div className="data-view__form">
      <form
        onSubmit={formik.handleSubmit}
      >
        <div className="data-view__filed-group">
          <div className="data-form__row">
            <CustomSelect
              customInputId='name'
              name='name'
              label='City'
              isTouched={formik.touched.name}
              errorMessage={formik.errors.name}
              options={citiesOptions}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="data-form__row">
            <CustomInput
              customInputId='description'
              name='description'
              type="text"
              label='Description'
              value={formik.values.description}
              isTouched={formik.touched.description}
              errorMessage={formik.errors.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="data-form__row data-form__row--upload-file">
            <div className="field-contain">
              <div className="field-contain__wrap">
                <input
                  className="field-contain__input"
                  type="file"
                  id="destinationPictures"
                  name="destinationPictures"
                  accept="image/*"
                  multiple
                  onChange={handleChangeFiles}
                  ref={filesInputRef}
                />
                <label
                  className="field-contain__placeholder-text"
                  htmlFor="destinationPictures"
                >
                  <div className="field-contain__text field-contain__text--focus">Destination pictures</div>
                </label>
              </div>
            </div>
          </div>

          {/*start drag and drop zone*/}
          <div className="data-form__row upload-file">
            {drag
              ? (
                <button
                  onClick={handleChooseFiles}
                  onDragStart={handleDragStart}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`upload-file__file-btn upload-file__file-btn--drag-hover ${isDropZoneTouched && !Object.values(uploadedFilesSuccess).length ? 'upload-file__file-btn--error' : ''} `}
                  type="button"
                >
                  <UploadIcon/>
                  Drag & drop or click to upload. Up to 10 images, 5Mb per file
                </button>
              )
              : (
                <button
                  onClick={handleChooseFiles}
                  onDragStart={handleDragStart}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  className={`upload-file__file-btn ${isDropZoneTouched && !Object.values(uploadedFilesSuccess).length ? 'upload-file__file-btn--error' : ''}`}
                  type="button"
                >
                  <UploadIcon/>
                  Drag & drop or click to upload. Up to 10 images, 5Mb per file
                </button>
              )
            }
          </div>
          {/*end drag and drop zone*/}

          {/*start uploading progress*/}
          {isUploading && (
            <div className="data-form__row data-form__row--file-card">
              {Object.entries(uploadFilesProgress).map(([keyIdx, _value]: [string, number]) => (
                <div
                  key={keyIdx}
                  className="upload-file__file-card upload-file__file-card--loader"
                >
                  <div className="upload-file__file-card-loader">
                    <p className="upload-file__file-card-loader-text">Uploading... <span>{uploadFilesProgress[Number(keyIdx)]}%</span></p>
                    <div className="upload-file__progress--bg">
                      <div className="upload-file__progress" style={{width: `${uploadFilesProgress[Number(keyIdx)]}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/*end uploading progress*/}

          {/*start picture card item*/}
          {!!picturesLocalState.length && (
            <DestinationPicturesList>
              {picturesLocalState.map((onePicture: TPicture, idx: number) => (
                <DestinationPictureItem
                  key={onePicture.src}
                  picture={onePicture}
                  controlElement={
                    <>
                      <CustomInput
                        customInputId={`pictureDescription-${idx}`}
                        name={`pictureDescription-${idx}`}
                        type="text"
                        label="Picture description"
                        value={pictureDescriptionEditItem[idx]}
                        isTouched={isTouchedPicDescEditItem[idx]}
                        errorMessage={!pictureDescriptionEditItem[idx] ? 'Requiresd' : ''}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => handleChangePictureDescriptionUpdate(evt.target.value, idx)}
                        onBlur={(): void => handleBlurPictureDescriptionUpdate(idx)}
                      />
                      {/*delete picture for exist destination*/}
                      <button
                        className="upload-file__file-del-btn"
                        type="button"
                        onClick={(): void => handleDeletePicture(idx, onePicture)}
                      >
                        <DeleteIcon/>
                      </button>
                    </>
                  }
                />
              ))}
            </DestinationPicturesList>
          )}
          {/*end picture card item*/}

          {/*start picture card item edit*/}
          {!isUploading && Object.values(uploadedFilesSuccess) && (
            <div className="data-form__row data-form__row--file-card">
              {Object.entries(uploadedFilesSuccess).map(([keyIdx, oneFile]: [string, TUploadFile], idx: number) => (
                oneFile && (
                  <EditDestinationPicture
                    key={oneFile.id}
                    oneFile={oneFile}
                    isFocusedPictureDesc={isFocusedPicturesDesc[Number(keyIdx)]}
                    isTouchedPictureDesc={formik.touched.pictureDescriptions?.[Number(keyIdx)] || false}
                    pictureDescription={formik.values.pictureDescriptions[Number(keyIdx)] || ''}
                    pictureDescriptionError={formik.errors.pictureDescriptions?.[Number(keyIdx)] || ''}
                    idx={idx}
                    keyIdx={Number(keyIdx)}
                    onChangeDescription={formik.handleChange}
                    onFocusDescription={(isFocused: boolean): void => {
                      setIsFocusedPicturesDesc((prevFocus: TIsFocusedPictureDescriptions): TIsFocusedPictureDescriptions => ({...prevFocus, [keyIdx]: isFocused}));
                    }}
                    onBlurDescription={(isFocused: boolean, isTouched: boolean): void => {
                      setIsFocusedPicturesDesc((prevFocus: TIsFocusedPictureDescriptions): TIsFocusedPictureDescriptions => ({...prevFocus, [Number(keyIdx)]: isFocused}));
                      formik.setFieldTouched(`pictureDescriptions[${Number(keyIdx)}]`, isTouched);
                    }}
                    // delete picture for new destination
                    onDeleteNewPicture={(_fileId: string, keyIdx: number): void => {
                      const updatedPictureDescriptions: TPictureDescriptions = {
                        ...formik.values.pictureDescriptions
                      };
                      updatedPictureDescriptions[keyIdx] = KEY_FOR_DELETE_PICTURE_DESCRIPTION;
                      formik.setFieldValue('pictureDescriptions', updatedPictureDescriptions);

                      const updatedPictureDescriptionsErrors: TPictureDescriptionsErrors = {
                        ...formik.errors.pictureDescriptions,
                      };
                      const { [keyIdx]: _, ...restErrors } = updatedPictureDescriptionsErrors;
                      formik.setErrors({
                        ...formik.errors,
                        pictureDescriptions: restErrors,
                      });

                      setIsFocusedPicturesDesc((prevState: TIsFocusedPictureDescriptions) => {
                        const newState: TIsFocusedPictureDescriptions = {
                          ...prevState
                        }
                        delete newState[keyIdx];
                        return newState;
                      });

                      dispatch(deleteOneFileByKeyIdx(Number(keyIdx)));
                    }}
                  />
                )
              ))}
            </div>
          )}
          {/*end picture card item edit*/}

        </div>

        <div className="data-view__action">
          {destinationId && (
            <button
              onClick={handleCancelChanging}
              className="sys-btn sys-btn--outlined"
              type="button"
              aria-label="Cancel to save destination"
            >
              <CloseIcon/>
            </button>
          )}
          <button
            className="sys-btn"
            type="submit"
            disabled={ (
              !formik.isValid
              ||
              (isTouchedPicDescEditItem.some((_oneIsTouchedItem: boolean, idx: number): boolean => (isTouchedPicDescEditItem[idx] === true && !pictureDescriptionEditItem[idx])))
              )
              &&
              true
            }
            aria-label="Save destination"
          >
            <SaveIcon/>
          </button>
        </div>

      </form>
    </div>
  );
}

export {
  EditDestination,
};
