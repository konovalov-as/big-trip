import {MouseEvent} from 'react';
import {TAppDispatch, TDestination, TPicture} from '../../../types';
import {DeleteIcon, EditIcon} from '../../icons';
import {useAppDispatch} from '../../../hooks';
import {deleteAsyncDestination} from '../../../store';
import {DestinationPictureItem, EditDestination} from '..';
import {DestinationPicturesList} from './destination-pictures-list.tsx';

interface IDestinationItemProps {
  handleEditDestinationToggle: CallableFunction,
  oneDestination: TDestination,
  isEditDestination: boolean,
}

function DestinationItem({
                           handleEditDestinationToggle,
                           oneDestination,
                           isEditDestination,
                         }: IDestinationItemProps): JSX.Element {
  const dispatch: TAppDispatch = useAppDispatch();

  const handleDeleteDelete = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    dispatch(deleteAsyncDestination(oneDestination.id));
  };

  return (
    <li
      className={`data-view__item ${isEditDestination ? 'data-view__item--edit' : ''}`}
    >
      {!isEditDestination && (
        <div className="data-view__item-wrap">
          <p className="data-view__item-title">{oneDestination.name}</p>
          <p className="data-view__item-description">{oneDestination.description}</p>

          <DestinationPicturesList>
            {oneDestination.pictures.map((onePicture: TPicture) => (
              <DestinationPictureItem
                key={onePicture.src}
                picture={onePicture}
              />
            ))}
          </DestinationPicturesList>

          <div className="data-view__action">
            <button
              className="sys-btn"
              onClick={() => handleEditDestinationToggle()}
              type="button"
              aria-label="Edit destination"
            >
              <EditIcon/>
            </button>
            <button
              className="sys-btn sys-btn--warning"
              onClick={handleDeleteDelete}
              type="button"
              aria-label="Delete destination"
            >
              <DeleteIcon/>
            </button>
          </div>
        </div>
      )}

      {isEditDestination && (
        <EditDestination
          name={oneDestination.name}
          description={oneDestination.description}
          destinationId={oneDestination.id}
          pictures={oneDestination.pictures}
        />)}
    </li>
  )
}

export {
  DestinationItem,
};
