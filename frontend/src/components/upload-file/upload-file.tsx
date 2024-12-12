import {useRef} from 'react';
import {useAppSelector, useUploadFiles,} from '../../hooks';
import {
  selectUploadFilesProgress,
  selectUploadFilesSuccess,
  TUploadFilesProgress,
  TUploadFilesSuccess,
  selectIsUploading,
} from '../../store';
import {UploadIcon} from '../icons';

function UploadFile(): JSX.Element {
  const isUploading: boolean = useAppSelector(selectIsUploading);
  const uploadFilesProgress: TUploadFilesProgress = useAppSelector(selectUploadFilesProgress);
  const uploadedFilesSuccess: TUploadFilesSuccess = useAppSelector(selectUploadFilesSuccess);

  const filesInputRef = useRef<HTMLInputElement>(null);
  const {
    drag,
    isDropZoneTouched,
    handleChangeFiles,
    handleChooseFiles,
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useUploadFiles(filesInputRef);

  return (
    <div className="data-view__form data-view__item data-view__item--edit">
      <form>
        <div className="data-view__filed-group">
          <div className="data-form__row data-form__row--upload-file">
            <div className="field-contain">
              <div className="field-contain__wrap">
                <input
                  className="field-contain__input"
                  type="file"
                  id="destinationImages"
                  name="destinationImages"
                  accept="image/*"
                  multiple
                  onChange={handleChangeFiles}
                  ref={filesInputRef}
                />
                <label
                  className="field-contain__placeholder-text"
                  htmlFor="destinationImages"
                >
                  <div className="field-contain__text field-contain__text--focus">Destination images</div>
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
                  className={`upload-file__file-btn upload-file__file-btn--drag-hover ${isDropZoneTouched && !Object.values(uploadedFilesSuccess).length ? 'upload-file__file-btn--error' : ''}`}
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
                    <p
                      className="upload-file__file-card-loader-text">Uploading... <span>{uploadFilesProgress[Number(keyIdx)]}%</span>
                    </p>
                    <div className="upload-file__progress--bg">
                      <div className="upload-file__progress"
                           style={{width: `${uploadFilesProgress[Number(keyIdx)]}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/*end uploading progress*/}
        </div>
      </form>
    </div>
  );
}

export {
  UploadFile,
};
