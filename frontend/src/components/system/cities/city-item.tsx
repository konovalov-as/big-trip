import React from 'react';
import {EditCity} from '..';
import {useAppDispatch} from '../../../hooks';
import {deleteAsyncCity} from '../../../store';
import {EditIcon, DeleteIcon} from '../../icons';
import {TAppDispatch, TCity} from '../../../types';

interface ICityItemProps {
  handleEditCityToggle: CallableFunction,
  oneCity: TCity,
  isEditCity: boolean,
}

function CityItem({handleEditCityToggle, oneCity, isEditCity}: ICityItemProps): JSX.Element {
  const dispatch: TAppDispatch = useAppDispatch();

  const handleDeleteCity = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    dispatch(deleteAsyncCity(oneCity.id));
  };

  return (
    <li
      className={`data-view__item ${isEditCity ? 'data-view__item--edit' : ''}`}
    >
      {!isEditCity && (
        <div className="data-view__item-wrap data-view__item-wrap-row">
          <p className="data-view__item-title">
            {oneCity.name}
          </p>
          <div className="data-view__action">
            <button
              className="sys-btn"
              onClick={() => handleEditCityToggle()}
              type="button"
              aria-label="Edit city"
            >
             <EditIcon />
            </button>
            <button
              className="sys-btn sys-btn--warning"
              onClick={handleDeleteCity}
              type="button"
              aria-label="Delete city"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}

      {isEditCity && (<EditCity cityValue={oneCity.name} cityId={oneCity.id} />)}
    </li>
  );
}

export {
  CityItem,
};
