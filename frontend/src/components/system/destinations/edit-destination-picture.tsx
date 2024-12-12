import {ChangeEvent} from 'react';
import {STATIC_FILES_URL} from '../../../config/app.ts';
import {deleteAsyncOneFile} from '../../../store';
import {TAppDispatch, TUploadFile} from '../../../types';
import {useAppDispatch} from '../../../hooks';
import {readableFileSize} from '../../../utils';
import {DeleteIcon} from '../../icons';

interface IEditDestinationImageProps {
  oneFile: TUploadFile;
  isFocusedPictureDesc: boolean;
  isTouchedPictureDesc: boolean;
  pictureDescription: string;
  pictureDescriptionError: string;
  idx: number;
  keyIdx: number;
  onChangeDescription: (evt: ChangeEvent<HTMLInputElement>) => void;
  onFocusDescription: (isFocused: boolean) => void;
  onBlurDescription: (isFocused: boolean, isTouched: boolean) => void;
  onDeleteNewPicture: (fileId: string, keyIdx: number) => void;
}

function EditDestinationPicture({
                                oneFile,
                                isFocusedPictureDesc,
                                isTouchedPictureDesc,
                                pictureDescription,
                                pictureDescriptionError,
                                idx,
                                keyIdx,
                                onChangeDescription,
                                onFocusDescription,
                                onBlurDescription,
                                onDeleteNewPicture,
                              }: IEditDestinationImageProps): JSX.Element {
  const dispatch: TAppDispatch = useAppDispatch();

  const handleDeleteNewPicture = (fileId: string, keyIdx: number): void => {
    dispatch(deleteAsyncOneFile(fileId));
    onDeleteNewPicture(fileId, keyIdx);
  };

  return (
    <div
      key={oneFile.id}
      className="upload-file__file-card"
    >
      <div className="upload-file__file-card-image">
        <img
          src={`${STATIC_FILES_URL}/${oneFile.safe_file_name}`}
          alt={`Preview of picture for id ${oneFile.id}`}
          width={200}
          height={200}
        />
      </div>
      <div className="upload-file__file-info">
        <div className="upload-file__file-info-wrap">
          <h4 className="upload-file__file-info-title">{oneFile.origin_file_name}</h4>
          <p className="upload-file__file-info-text">{readableFileSize(oneFile.size)}</p>
        </div>
        <div className="upload-file__file-card-desc">
          {/*<CustomInput*/}
          {/*  customInputId={`pictureDescriptions[${Number(keyIdx)}]`}*/}
          {/*  name={`pictureDescriptions[${Number(keyIdx)}]`}*/}
          {/*  type="text"*/}
          {/*  label={`Description for image ${idx + 1}`}*/}
          {/*  value={pictureDescription || ''}*/}
          {/*  isTouched={isTouchedPictureDesc}*/}
          {/*  errorMessage={pictureDescriptionError}*/}
          {/*  onChange={onChangeDescription}*/}
          {/*  onBlur={() => onBlurDescription(false, true)}*/}
          {/*/>*/}

          <div
            className={`field-contain ${isFocusedPictureDesc || pictureDescription ? 'focused' : ''} `}>
            <div className="field-contain__wrap">
              <input
                className="field-contain__input"
                type="text"
                id={`pictureDescriptions[${Number(keyIdx)}]`}
                name={`pictureDescriptions[${Number(keyIdx)}]`}
                value={pictureDescription || ''}
                onChange={onChangeDescription}
                onFocus={() => onFocusDescription(true)}
                onBlur={() => onBlurDescription(false, true)}
              />
              <label
                className="field-contain__placeholder-text"
                htmlFor={`pictureDescriptions[${Number(keyIdx)}]`}
              >
                {`Description for image ${idx + 1}`}
              </label>
            </div>

            {isTouchedPictureDesc && pictureDescriptionError ? (
              <div className="field-contain__message">
                <small>{pictureDescriptionError}</small>
              </div>
            ) : null}
          </div>

        </div>
        <button
          className="upload-file__file-del-btn"
          onClick={() => handleDeleteNewPicture(oneFile.id, keyIdx)}
          type="button"
        >
          <DeleteIcon/>
        </button>
      </div>
    </div>
  )
}

export {
  EditDestinationPicture,
};
