import React from 'react';
import {TOfferType} from '../../../types';
import {useAppDispatch } from '../../../hooks';
import {deleteAsyncOfferType} from '../../../store';
import {EditOfferType} from '..';
import {EditIcon, DeleteIcon} from '../../icons';

interface IOfferTypeItemProps {
  handleEditTypeToggle: CallableFunction;
  oneOfferType: TOfferType;
  isEditType: boolean;
}

function OfferTypeItem({handleEditTypeToggle, oneOfferType, isEditType}: IOfferTypeItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDeleteType = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const id: string = evt.currentTarget.id;
    dispatch(deleteAsyncOfferType(id));
  };

  return (
    <li
      className={`data-view__item ${isEditType ? 'data-view__item--edit' : ''}`}
    >
      {!isEditType && (
        <div className="data-view__item-wrap data-view__item-wrap-row">
          <p className="data-view__wrapper">
            {oneOfferType.type}
          </p>
          <div className="data-view__action">
            <button
              className="sys-btn"
              onClick={() => handleEditTypeToggle()}
              type="button"
              id={oneOfferType.id} // check id !!! WARNIGN !!!
              aria-label="Edit offer type"
            >
              <EditIcon />
            </button>
            <button
              className="sys-btn sys-btn--warning"
              onClick={handleDeleteType}
              type="button"
              id={oneOfferType.id} // check id !!! WARNIGN !!!
              aria-label="Delete offer type"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}

      {isEditType && (<EditOfferType offerTypeValue={oneOfferType.type} offerTypeId={oneOfferType.id} />)}
    </li>
  );
}

export {
  OfferTypeItem,
}
