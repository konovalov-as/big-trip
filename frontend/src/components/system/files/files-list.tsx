import React, {useRef} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {TAppDispatch, TUploadFile} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import { deleteAsyncOneFile, selectFilesList} from '../../../store';
import {STATIC_FILES_URL} from '../../../config/app.ts';
import {DeleteIcon} from '../../icons';
import {UploadFile} from '../../../components';

function FilesList(): JSX.Element {
  const nodeRefs = useRef<{ [key: string]: React.RefObject<HTMLLIElement> }>({});
  const dispatch: TAppDispatch = useAppDispatch();
  const filesList: TUploadFile[] = useAppSelector(selectFilesList);

  const handleDeletePicture = (fileId: string): void => {
    dispatch(deleteAsyncOneFile(fileId));
  };

  return (
    <div className="data-view">
      <div className="data-view__header">
        <h3 className="data-view__title">Files list</h3>
        <p>Count of files: {filesList.length}</p>
      </div>
      <UploadFile />
      <div className="data-view__images data-view__item">
        <TransitionGroup component="ul" className="data-view__images-list">
          {filesList.map((oneFile: TUploadFile): JSX.Element => {
            if (!nodeRefs.current[oneFile.id]) {
              nodeRefs.current[oneFile.id] = React.createRef<HTMLLIElement>();
            }

            return (
              <CSSTransition
                key={oneFile.id}
                timeout={300}
                classNames="amin-card"
                unmountOnExit
                nodeRef={nodeRefs.current[oneFile.id]}
              >
                <li className="data-view__images-item" ref={nodeRefs.current[oneFile.id]}>
                  <div className="data-view__images-item-wrap">
                    <div className="_data-view__images-image">
                      <img src={`${STATIC_FILES_URL}/${oneFile.safe_file_name}`} alt={oneFile.safe_file_name}/>
                    </div>
                    <button
                      className="upload-file__file-del-btn"
                      type="button"
                      onClick={(): void => handleDeletePicture(oneFile.id)}
                    >
                      <DeleteIcon/>
                    </button>
                  </div>
                </li>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </div>

      {/*{!isDestinationLoading && !!destinations.length && (*/}
      {/*  <div className="data-view__pagination">*/}
      {/*    <p>pagination</p>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export {
  FilesList,
};
